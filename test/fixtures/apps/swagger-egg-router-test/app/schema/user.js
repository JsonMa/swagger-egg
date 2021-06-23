'use strict';

const User = {
  type: 'object',
  properties: {
    id: {
      $ref: 'schema.definition#/int',
    },
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: [ 'name', 'password', 'id' ],
  $async: true,
  additionalProperties: false,
};

module.exports = User;
