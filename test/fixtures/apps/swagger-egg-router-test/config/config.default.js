'use strict';

exports.keys = '123456';

exports.static = {
  prefix: '/',
};

exports.swaggerEgg = {
  swagger: {
    host: '',
    basePath: '/',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'admin',
        description: 'Everything about your admin',
      },
      {
        name: 'user',
        description: 'Everything about your user',
      },
      {
        name: 'home',
        description: 'Everything about your home',
      },
    ],
  },
};
