# swagger-egg

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/swagger-egg.svg?style=flat-square
[npm-url]: https://npmjs.org/package/swagger-egg
[travis-image]: https://img.shields.io/travis/eggjs/swagger-egg.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/swagger-egg
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/swagger-egg.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/swagger-egg?branch=master
[david-image]: https://img.shields.io/david/eggjs/swagger-egg.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/swagger-egg
[snyk-image]: https://snyk.io/test/npm/swagger-egg/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/swagger-egg
[download-image]: https://img.shields.io/npm/dm/swagger-egg.svg?style=flat-square
[download-url]: https://npmjs.org/package/swagger-egg

<!--
Description here.
-->

## Install

```bash
$ npm i swagger-egg --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.swaggerEgg = {
  enable: true,
  package: 'swagger-egg',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.swaggerEgg = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/JsonMa/swagger-egg/issues).
## License

[MIT](LICENSE)
