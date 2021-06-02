'use strict'

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    let staticDirs = this.app.config.static.dir
    if(Array.isArray(staticDirs)) staticDirs.unshift(pathToSwaggerUi)
    else staticDirs = [pathToSwaggerUi, staticDirs]
    this.app.config.static.dir = staticDirs
  }
}
  
module.exports = AppBootHook;