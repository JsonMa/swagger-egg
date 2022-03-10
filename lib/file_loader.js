'use strict';

const fs = require('fs');
const globby = require('globby');

module.exports = {
  globbyFile(directory) {
    const files = '**/*.(js|ts)';
    return globby.sync(files, {cwd: directory});
  },
  loadFile(filepath, module = false) {
    try {
      if (module) {
        // require js module
        const obj = require(filepath);
        if (!obj) return obj;
        // it's es module
        if (obj.__esModule) return 'default' in obj ? obj.default : obj;
        return obj;
      }
      return fs.readFileSync(filepath).toString();
    } catch (err) {
      err.message = `[egg-core] load file: ${filepath}, error: ${err.message}`;
      throw err;
    }
  },
};
