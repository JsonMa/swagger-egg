'use strict';

const fs = require('fs');
const assert = require('assert');
const path = require('path');
const {globbyFile} = require('./file_loader');
const TJS = require('typescript-json-schema');

/**
 * Load ts and transform to schema object from target directory
 *
 * @param {string} dirPath shcema directory path
 * @param {string} baseDir baseDir path
 * @return {object} - schema object
 */
function contactLoader(dirPath, baseDir) {
  assert(fs.existsSync(dirPath), `shcema directory not exists: ${dirPath}`);

  const files = globbyFile(dirPath) || [];
  const schemaObj = {};
  files.forEach((file) => {
    const extname = path.extname(file);
    if (extname === '.js' || extname === '.ts') {
      const program = TJS.programFromConfig(path.join(baseDir, '/tsconfig.json'), [path.join(dirPath, file)]);
      const schema = TJS.generateSchema(program, '*', {
        required: true,
      });
      const keys = file.replace(extname, '').split('/');
      const rootKey = keys.shift();
      let value = schema;
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

module.exports = contactLoader;
