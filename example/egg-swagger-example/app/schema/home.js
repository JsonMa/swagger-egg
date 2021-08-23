'use strict';

module.exports = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    no: {
      $ref: '#/definitions/no',
    },
  },
  required: [ 'name', 'address', 'no' ],
  additionalProperties: false,
};
