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

  // add your user config here
  // myAppName: 'egg',
  // {app_root}/config/config.default.js
  config.swaggerEgg = {
    schema: {
      path: '/app/schema', // JSON Schema directory
    },
    swagger: {
      info: {
        title: 'Egg Example Swagger Document',
        description: 'Testing the egg example swagger API',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: '127.0.0.1:7001', // catution: 'localhost:7001' will result in cross origin error
      schemes: [ 'http', 'https' ],
      consumes: [ 'application/json' ],
      produces: [ 'application/json' ],
      tags: [
        { name: 'home', description: 'Home related end-points' },
      ],
      securityDefinitions: {
        api_key: {
          type: 'apiKey', // basic/apiKey/oauth2
          name: 'Authorization', // selfdefined parameter, usually use 'Authorization'
          in: 'header', // query or header, usually use 'header'
        },
        github_auth: {
          type: 'oauth2',
          authorizationUrl: 'http://swagger.io/api/oauth/dialog',
          flow: 'implicit',
          scopes: {
            'write:homes': 'modify home info',
            'read:homes': 'read home info',
          },
        },
      },
      security: [
        {
          api_key: [], // use api key to security
        },
      ], // Cacution: security is array type
    },
  };

  return config;
};
