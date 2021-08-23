'use strict';

const fs = require('fs');
const assert = require('assert');
const path = require('path');
const Router = require('./router_loader');
const fileLoader = require('./file_loader');
const commentLoader = require('./comment/comment_loader');
const commentParser = require('./comment/comment_parser');
const schemaLoader = require('./schema_loader');
const utils = require('./utils');

class Swagger {
  constructor(app, pathToSwaggerUi) {
    this.app = app;
    this.swaggerUiPath = pathToSwaggerUi;
    this.baseDir = app.config.baseDir;
    this.config = app.config.swaggerEgg;
    this.build();
  }

  build() {
    // Prepare swagger default object
    this.swaggerObject = utils.prepareSwaggerObject(this.app, utils.prepareDefaultOptions(this.config));

    // Load router file
    const routerPath = path.join(this.baseDir, '/app/router.js');
    this.router = new Router(routerPath, this.config.routerType);
    this.router.getRouter();

    // Load schema file
    const schemaPath = path.join(this.baseDir, this.config.schema.path);
    const schemaObject = schemaLoader(schemaPath);
    if (schemaObject.definitions) this.swaggerObject.definitions = schemaObject.definitions;
    this.schema = schemaObject;

    // Scanner controller directory
    const controllerDirectory = path.join(this.baseDir, '/app/controller');
    const files = fileLoader(controllerDirectory);
    for (const file of files) {
      const fileName = file.replace(/\.(js|ts)$/, '').replace('/', '.');
      const filePath = path.join(this.baseDir, `/app/controller/${file}`);
      const comments = commentLoader(filePath);
      let functionName = null;
      if (!comments.length) continue;
      for (const comment of comments) {
        if (!comment.tags.length) continue;
        const { tags, description: rawDescription } = comment;
        const description = rawDescription.replace(/\s{0,}#swagger-api$/g, '');
        let functionIndex = null;

        // Get action from jsdoc function tag
        tags.forEach((tag, index) => {
          if (tag.title === 'function') {
            assert(!functionIndex, `Duplex function tag of ${JSON.stringify(tag)}`);
            functionIndex = index;
          }
        });
        if (functionIndex === null) continue;
        const tag = tags.splice(functionIndex, 1);
        functionName = tag[0].name;
        const action = `controller\.${fileName}\.${functionName}`;
        const operationId = `${fileName}/${functionName}`;

        // Get method and path from routerMap
        const routerObject = this.router.routerMap.get(action);
        if (routerObject) {
          const { path, method } = routerObject;
          if (!this.swaggerObject.paths[path]) this.swaggerObject.paths[path] = {};
          this.swaggerObject.paths[path][method] = {
            description,
            operationId,
            parameters: [],
            responses: {},
          };

          // Deail with other swagger tags
          for (const tag of tags) {
            const { title, description } = tag;
            if (title === 'description' && description.length) {
              const types = description.match(/#(parameters|responses|consumes|produces|tags)/g);
              if (!types) continue;
              const type = types.shift();
              const params = description.replace(`#${type}`, '');
              switch (type) {
                case '#parameters':
                  this.getParameter(path, method, params);
                  break;
                case '#responses':
                  this.getResponnseParser(path, method, params);
                  break;
                case '#consumes':
                  this.getCommonParser(path, method, params, 'consumes');
                  break;
                case '#produces':
                  this.getCommonParser(path, method, params, 'produces');
                  break;
                default:
                  this.getCommonParser(path, method, params, 'tags');
                  break;
              }
            } else if (title === 'summary' && description.length) {
              this.swaggerObject.paths[path][method].summary = description;
            }
          }
        }
      }
    }

    // Generate swagger.json file
    this.generateDocument();

    // Change swagger-ui-dist's default api url config
    const swaggerUiBundlePath = path.join(this.swaggerUiPath, './index.html');
    const prefix = this.app.config.static.prefix || '/public';
    const bundleFileString = utils.prepareSwaggerUi(fs.readFileSync(swaggerUiBundlePath).toString(), `"${prefix}${/\/$/.test(prefix) ? '' : '/'}swagger.json"`);
    fs.unlinkSync(swaggerUiBundlePath);
    fs.appendFileSync(swaggerUiBundlePath, bundleFileString);
  }

  /**
   * Generate swagger.json file
   *
   * @memberof Swagger
   */
  generateDocument() {
    const swaggerDocString = utils.finalize(this.swaggerObject);
    const filePath = path.join(this.app.baseDir, 'app/public/swagger.json');
    const dirPath = path.join(this.app.baseDir, 'app/public');
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    fs.appendFileSync(filePath, swaggerDocString);
  }

  getCommonParser(path, method, commomParams, type) {
    if (!this.tags && type === 'tags') this.tags = this.swaggerObject.tags.map(tagObject => tagObject.name);
    const params = commomParams.match(/\s+(\S)+/g) || [];
    const trimParams = params.map(param => {
      const trimParams = param.trim();
      if (type === 'tags') assert(this.tags.includes(trimParams), `${param} tag is not defined in swagger config`);
      return trimParams;
    });
    this.swaggerObject.paths[path][method][type] = trimParams;
  }

  getParameter(path, method, parameterComments) {
    const parameter = commentParser.parameterParser(parameterComments);
    const schema = this.getSchema(parameter.schemaArray);
    // delete temporary field
    delete parameter.schemaArray;
    if (parameter.in === 'body') parameter.schema = schema;
    else Object.assign(parameter, schema);
    this.swaggerObject.paths[path][method].parameters.push(parameter);
  }

  getResponnseParser(path, method, responseComments) {
    const parameter = commentParser.responnseParser(responseComments);
    const { status, description, schemaArray } = parameter;
    const schema = this.getSchema(schemaArray);
    this.swaggerObject.paths[path][method].responses[status] = {
      description,
      schema,
    };
  }

  getSchema(parameter) {
    const schemaObject = parameter.reduce((acc, item) => {
      assert(acc && typeof acc === 'object', `${item} schema is not defined`);
      return acc[item];
    }, this);
    return schemaObject;
  }
}

module.exports = Swagger;

