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
      type: 'string',
    },
  },
  required: [ 'name', 'address', 'no' ],
  additionalProperties: false,
};
