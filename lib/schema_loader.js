'use strict';

const fs = require('fs');
const assert = require('assert');
const path = require('path');
const {globbyFile, loadFile} = require('./file_loader');
const utils = require('./utils');

/**
 * Load schema object from target directory
 *
 * @param {string} dirPath shcema directory path
 * @return {object} - schema object
 */
function schemaLoader(dirPath) {
  assert(fs.existsSync(dirPath), `schema directory not exists: ${dirPath}`);

  const schemaFiles = globbyFile(dirPath) || [];
  const schemaObj = {};
  schemaFiles.forEach((file) => {
    const extname = path.extname(file);
    if (extname === '.js' || extname === '.ts') {
      const keys = utils.camelCase(file.replace(extname, '')).split('/');
      let value = loadFile(path.join(dirPath, file), true);
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
