'use strict';

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const Swagger = require('./lib/swagger');
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    const { swaggerEgg } = this.app.config;
    if (swaggerEgg.ui && swaggerEgg.ui.enable) {
      let staticDirs = this.app.config.static.dir;
      // CAUTION: index.html under 'app/public' directory will be overwrite by 'swagger-ui-dist'
      if (Array.isArray(staticDirs)) staticDirs.unshift(pathToSwaggerUi);
      else staticDirs = [ pathToSwaggerUi, staticDirs ];
      this.app.config.static.dir = staticDirs;
    }
  }

  didLoad() {
    try {
      new Swagger(this.app, pathToSwaggerUi);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AppBootHook;
