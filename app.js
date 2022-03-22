'use strict';

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const Swagger = require('./lib/swagger');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    let staticDirs = this.app.config.static.dir;
    // CAUTION: index.html under 'app/public' directory will be overwrite by 'swagger-ui-dist'
    if (Array.isArray(staticDirs)) staticDirs.unshift(pathToSwaggerUi);
    else staticDirs = [pathToSwaggerUi, staticDirs];
    this.app.config.static.dir = staticDirs;
  }

  didLoad() {
    try {
      new Swagger(this.app, pathToSwaggerUi);
      this.app.logger.info(`[swagger-egg] Swagger document initing succeed!`);
    } catch (error) {
      this.app.logger.error(`[swagger-egg] ${error.message}`);
    }
  }
}

module.exports = AppBootHook;
