'use strict';

/**
 * egg-swagger-egg default config
 * @member Config#swaggerEgg
 * @property {String} SOME_KEY - some description
 */
exports.swaggerEgg = {
  schema: {
    path: '/app/schema', // JSON Schema directory
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
    tags: [],
  },
};
