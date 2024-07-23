'use strict';

const path = require('path');
const {loadFile} = require('./file_loader');
const {detectProjectLanguage} = require('./utils');
class RouterLoader {
  /** RouterLoader Class constructor
   *
   * @param  {object} app          - Application
   * @param  {string} filePath     - Router file path
   */
  constructor(app, filePath) {
    this.prefix = app.router.opts.prefix || '';
    this.filePath = filePath;
    this.routerMap = new Map();
    this.routerFileString = loadFile(filePath);
    this.config = app.config.swaggerEgg;
    this.fileExtend = detectProjectLanguage(app);
  }

  /**
   * Get router infomation from common router file string
   *
   * @param {string} fileString - File string
   */
  getCommonRouter(fileString) {
    const routers = fileString.match(/(head|options|get|put|post|patch|delete|del|redirect)\((\s|\S)*?\)/g);
    if (routers) {
      routers.forEach((router) => {
        const methodResult = router.match(/^(head|options|get|put|post|patch|delete|del|redirect)/g);
        const method = methodResult && methodResult[0];
        const actionResult = router.match(/\((\s|\S)*?\)$/g);
        const actionStr = actionResult && actionResult[0];
        const actionArray = actionStr.replace(/(\(|\)|\s)/g, '').split(',');
        const action = actionArray.pop();
        const stringReg = /\'|`/g;
        const pathNameArray = actionArray.filter((item) => {
          return stringReg.test(item);
        });
        const path = `${this.prefix}${pathNameArray.length ? pathNameArray.pop().replace(/\'|`/g, '') : ''}`;
        const name = pathNameArray.length ? pathNameArray.pop().replace(/\'|`/g, '') : null;
        this.routerMap.set(action, {
          method,
          path,
          name,
        });
      });
    }
  }

  /**
   * Get router infomation from RESTful style router file string
   *
   * @param {string} fileString - File string
   */
  getRESTfulRouter(fileString) {
    const routers = fileString.match(/resources\((.*)\)/g);
    if (routers) {
      routers.forEach((router) => {
        let routerResource = router.replace(/(resources|\s|\(|\)|')/g, '');
        if (routerResource) routerResource = routerResource.split(',');
        routerResource.shift();
        const path = `${this.prefix}${routerResource.shift()}`;
        const action = routerResource.pop();
        [
          {
            action: `${action}.index`,
            method: 'get',
            path,
          },
          {
            action: `${action}.new`,
            method: 'get',
            path: `${path}/new`,
          },
          {
            action: `${action}.show`,
            method: 'get',
            path: `${path}/:id`,
          },
          {
            action: `${action}.edit`,
            method: 'get',
            path: `${path}/:id/edit`,
          },
          {
            action: `${action}.create`,
            method: 'post',
            path,
          },
          {
            action: `${action}.update`,
            method: 'put',
            path: `${path}/:id`,
          },
          {
            action: `${action}.destroy`,
            method: 'delete',
            path: `${path}/:id`,
          },
        ].forEach((item) => {
          this.routerMap.set(item.action, {
            method: item.method,
            path: item.path.replace(/\'|`/g, ''),
          });
        });
      });
    }
  }

  /**
   * Get router infomation from mixin style router file string
   * @param {string} routerFileString - Router file string
   */
  getMixinRouter(routerFileString) {
    this.getRESTfulRouter(routerFileString);
    this.getCommonRouter(routerFileString);
  }

  /**
   * Get router infomation from target file or folder
   *
   */
  getRouter() {
    const dependencies = this.routerFileString.match(/require\((\s|\S)*?\)/g);
    if (dependencies) {
      dependencies
        .map((item) => item.replace(/(require|\(|\)|\s|')/g, ''))
        .filter((dependency) => dependency.includes('/router/') || dependency.includes('/routers/'))
        .forEach((dependencyPath) => {
          const dependencyFileString = loadFile(
            path.join(path.dirname(this.filePath), `${dependencyPath}.${this.fileExtend}`)
          );
          this.getMixinRouter(dependencyFileString);
        });
    }
    this.getMixinRouter(this.routerFileString);
  }
}

module.exports = RouterLoader;
