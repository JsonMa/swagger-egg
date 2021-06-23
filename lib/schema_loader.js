'use strict';

const fs = require('fs');
const assert = require('assert');
const path = require('path');
const fileLoader = require('./file_loader');

/**
 * Load schema object from target directory
 *
 * @param {string} dirPath shcema directory path
 * @return {object} - schema object
 */
function schemaLoader(dirPath) {
  assert(fs.existsSync(dirPath), `schema directory not exists: ${dirPath}`);

  const schemaFiles = fileLoader(dirPath) || [];
  const schemaObj = {};
  schemaFiles.forEach(file => {
    const extname = path.extname(file);
    if (extname === '.js') {
      const keys = file.replace(extname, '').split('/');
      let value = require(path.join(dirPath, file));
      // it's es module
      if (value.__esModule && 'default' in value) value = value.default;
      const rootKey = keys.shift();
      if (keys.length) {
        value = keys.reduce((acc, key) => {
          const emptyObj = {};
          if (typeof acc !== 'object') acc = value;
          emptyObj[key] = acc;
          return emptyObj;
        }, value);
      }
      if (!schemaObj[rootKey]) schemaObj[rootKey] = value;
      else Object.assign(schemaObj[rootKey], value);
    }
  });
  return schemaObj;
}

module.exports = schemaLoader;
