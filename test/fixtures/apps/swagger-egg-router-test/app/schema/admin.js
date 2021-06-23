'use strict';

module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      $ref: 'schema.definition#/int',
    },
    telephone: {
      type: 'string',
    },
  },
  required: [ 'name', 'telephone', 'id' ],
  additionalProperties: false,
};
