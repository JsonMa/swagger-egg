'use strict';

/**
 * egg-swagger-egg default config
 * @member Config#swaggerEgg
 * @property {String} SOME_KEY - some description
 */
exports.swaggerEgg = {
  schema: {
    type: 'ajv', // validation tool
    path: '/app/schema', // shema path
  },
  swagger: {
    host: '',
    basePath: '/',
    schemes: [
      'https',
      'http',
    ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    tags: [{
      name: 'admin',
      description: 'Everything about your admin',
    }, {
      name: 'user',
      description: 'Everything about your user',
    }, {
      name: 'home',
      description: 'Everything about your home',
    }],
  },
};
