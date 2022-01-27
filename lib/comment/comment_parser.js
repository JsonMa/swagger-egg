'use strict';

const assert = require('assert');

/**
 * Parameter comment parser
 *
 * @param {string} parameterString - Parameter string
 * @example id path parameterSchema true - desc
 * @return {object} parameter object
 * @example
 * ```javascript
 * {
 *  "name": "id",
 *  "in": "path",
 *  "description": "id parameter in path",
 *  "required": true,
 *  "schema": {
 *    "type": "integer",
 *    "format": "int64"
 *   }
 * }
 * ```
 */
function parameterParser(parameterString) {
  const parameterObj = {};
  // Description is optional
  const splitedParams = parameterString.match(/\s*-\s+[\s\S]+/g);
  const description = splitedParams.pop().replace('-', '').trim() || '';
  // Match string which begin with one or more whitespace
  const result = parameterString.replace(/\s*-\s+[\s\S]+/g, '').match(/\s+(\S)+/g);
  assert(result.length === 4, `Parameter comment format error: ${parameterString}`);
  const name = result.shift().trim();
  // Deal with key word "in"
  const _in = result.shift().trim();
  assert(['query', 'header', 'path', 'formData', 'body'].includes(_in), `Unknown parameter field in: ${_in}`);
  parameterObj.in = _in;
  // Deal with key word "required"
  const schemaArray = result.shift().trim().split('.');
  let required = result.shift().trim();
  assert(['true', 'false'].includes(required), `parameter's required field should be boolean type, got: ${_in}`);
  required = _in === 'path' ? true : required === 'true'; // force set required to true when path is 'in'
  return Object.assign(
    {
      name,
      required,
      description,
      schemaArray,
    },
    parameterObj
  );
}

/**
 * Response comment parser
 *
 * @param {string} responseString - Response string
 * @example 200 responseSchema - desc
 * @return {object} Response object
 * @example
 * ```javascript
 *  {
 *    "status": "200",
 *    "description": "Response description",
 *    "schema": "responseSchema"
 * }
 * ```
 */
function responnseParser(responseString) {
  // Description is optional
  const splitedParams = responseString.match(/\s*-\s+[\s\S]+/g);
  const description = splitedParams.pop().replace('-', '').trim() || '';
  // Match string which begin with one or more whitespace
  const result = responseString.replace(/\s*-\s+[\s\S]+/g, '').match(/\s+(\S)+/g);
  assert(result.length === 2, `Response comment format error: ${responseString}`);
  const status = result.shift().trim();
  const schemaArray = result.shift().trim().split('.');
  return {
    status,
    description,
    schemaArray,
  };
}

module.exports = {
  parameterParser,
  responnseParser,
};
