'use strict';

const globby = require('globby');

module.exports = directory => {
  const files = '**/*.(js|ts)';
  return globby.sync(files, { cwd: directory });
};
