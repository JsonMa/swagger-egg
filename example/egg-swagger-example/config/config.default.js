/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624498627486_7869';

  // add your middleware config here
  config.middleware = [];

  config.static = {
    prefix: '/asdf',
  };

  // add your user config here
  // myAppName: 'egg',
  // {app_root}/config/config.default.js
  config.swaggerEgg = {
    schema: {
      path: '/app/schema', // JSON Schema directory
    },
    swagger: {
      info: {
        title: 'Egg Example swagger',
        description: 'Testing the egg example swagger API',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost',
      schemes: [ 'http', 'https' ],
      consumes: [ 'application/json' ],
      produces: [ 'application/json' ],
      tags: [
        { name: 'home', description: 'Home related end-points' },
      ],
    },
  };

  return config;
};
