'use strict';

const swagerParser = require('swagger-parser');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

/**
 * Checks if there is any properties of the input object which are an empty
 *
 * @param {object} obj - the object to check
 * @return {boolean}   - result
 */
function noEmptyProperty(obj) {
  const keys = Object.keys(obj);
  return !!keys.length && keys
    .map(key => obj[key])
    .every(
      value => {
        if (typeof value === 'object') {
          if (!Object.keys(value).length) return false;
          return noEmptyProperty(value);
        }
        return true;
      }
    );
}

/**
 * Parse the swagger object and remove useless properties if necessary
 *
 * @param {object} swaggerObject - Swagger object from parsing the api files
 * @param {object} ext - Swagger object from parsing the api files
 * @return {object} The specification.
 */
function finalize(swaggerObject, ext) {
  swagerParser.parse(swaggerObject, (err, api) => {
    if (err) throw err;
    swaggerObject = api;
  });
  if (ext === '.yml' || ext === '.yaml') return YAML.stringify(swaggerObject);
  return JSON.stringify(swaggerObject);
}

/**
 * Prepare default options
 * @param {object} opts  - swagger option
 * @return {object} -default options
 */
function prepareDefaultOptions(opts) {
  const swagger = opts.swagger;
  const info = swagger.info || null;
  const host = swagger.host || null;
  const schemes = swagger.schemes || null;
  const consumes = swagger.consumes || null;
  const produces = swagger.produces || null;
  const definitions = swagger.definitions || null;
  const basePath = swagger.basePath || null;
  const securityDefinitions = swagger.securityDefinitions || null;
  const security = swagger.security || null;
  const tags = swagger.tags || null;
  const externalDocs = swagger.externalDocs || null;
  const stripBasePath = opts.stripBasePath;
  const transform = opts.transform;
  const hiddenTag = opts.hiddenTag;
  const hideUntagged = opts.hideUntagged;
  const extensions = [];

  for (const [ key, value ] of Object.entries(opts.swagger)) {
    if (key.startsWith('x-')) {
      extensions.push([ key, value ]);
    }
  }

  return {
    info,
    host,
    schemes,
    consumes,
    produces,
    definitions,
    basePath,
    securityDefinitions,
    security,
    tags,
    externalDocs,
    stripBasePath,
    transform,
    hiddenTag,
    extensions,
    hideUntagged,
  };
}

function readPackageJson(app) {
  const baseDir = app.config.baseDir;
  return JSON.parse(fs.readFileSync(path.join(baseDir, 'package.json')));
}

function prepareSwaggerObject(app, opts) {
  const pkg = readPackageJson(app);
  const swaggerObject = {
    swagger: '2.0',
    info: {
      version: pkg.version || '1.0.0',
      title: pkg.name || '',
      description: `${pkg.description || ''} API document`,
    },
    tags: [],
    definitions: {},
    paths: {},
  };

  if (opts.info) swaggerObject.info = opts.info;
  if (opts.host) swaggerObject.host = opts.host;
  if (opts.schemes) swaggerObject.schemes = opts.schemes;
  if (opts.basePath) swaggerObject.basePath = opts.basePath;
  if (opts.consumes) swaggerObject.consumes = opts.consumes;
  if (opts.produces) swaggerObject.produces = opts.produces;
  if (opts.definitions) swaggerObject.definitions = opts.definitions;
  if (opts.securityDefinitions) swaggerObject.securityDefinitions = opts.securityDefinitions;
  if (opts.security) swaggerObject.security = opts.security;
  if (opts.tags) swaggerObject.tags = opts.tags;
  if (opts.externalDocs) swaggerObject.externalDocs = opts.externalDocs;

  for (const [ key, value ] of opts.extensions) {
    // "x-" extension can not be typed
    swaggerObject[key] = value;
  }

  return swaggerObject;
}

module.exports = {
  noEmptyProperty,
  finalize,
  prepareDefaultOptions,
  prepareSwaggerObject,
};
