# swagger-egg

![swagger-egg](https://socialify.git.ci/JsonMa/swagger-egg/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Light)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[英文文档](https://github.com/JsonMa/swagger-egg/blob/master/README.md)

[npm-image]: https://img.shields.io/npm/v/swagger-egg.svg?style=flat-square
[npm-url]: https://npmjs.org/package/swagger-egg
[travis-image]: https://travis-ci.com/JsonMa/swagger-egg.svg?branch=master
[travis-url]: https://travis-ci.org/jsonma/swagger-egg
[codecov-image]: https://img.shields.io/codecov/c/github/jsonma/swagger-egg.svg?style=flat-square
[codecov-url]: https://codecov.io/github/jsonma/swagger-egg?branch=master
[david-image]: https://img.shields.io/david/jsonma/swagger-egg.svg?style=flat-square
[david-url]: https://david-dm.org/jsonma/swagger-egg
[snyk-image]: https://snyk.io/test/npm/swagger-egg/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/swagger-egg
[download-image]: https://img.shields.io/npm/dm/swagger-egg.svg?style=flat-square
[download-url]: https://npmjs.org/package/swagger-egg

<!--
Description here.
-->
Eggjs [Swagger UI](https://swagger.io/tools/swagger-ui/) API文档自动生成插件（支持Typescript），请求及响应参数需通过[JSON Schema](http://json-schema.org/specification.html)（推荐使用[Ajv](https://github.com/ajv-validator/ajv)）定义，并遵循 [Swagger (OpenAPI v2)](https://swagger.io/specification/v2/) 规范，`swagger.json` 由插件通过Controller中的 JSDoc 注释自动生成。

**注意**: Node.js版本需要>=10.x！

## 插件安装

```bash
$ npm i swagger-egg --save
```

## 插件使用
Swagger-UI 以 [egg-static](https://github.com/eggjs/egg-static) 静态资源的形式进行访问，若`static.prefix`为默认值，则只需要打开`http://localhost:7001/public/index.html`即可获取到 Swagger-UI 页面。关于插件在项目中的使用，请参考下面的示例:
 
- [JS 项目示例](https://github.com/JsonMa/swagger-egg/tree/master/example/egg-swagger-example)
- [TS 项目示例](https://github.com/JsonMa/swagger-egg/tree/master/example/egg-swagger-ts-example)
- [TS Schema 项目示例 ](https://github.com/JsonMa/swagger-egg/tree/master/example/egg-swagger-ts-schema-example)

```js
// {app_root}/config/plugin.js
exports.swaggerEgg = {
  enable: true,
  package: "swagger-egg",
};
```

## 插件配置
+ `swagger.info` 是可选的，若不存在，则插件将会依据根目录下的`package.json`信息自动生成。
+ `swagger.tags` 是必选的，如果在JSDoc注释中使用了`#tags`标签。
+ 更多Swagger配置请参考[OpenAPI V2](https://swagger.io/specification/v2/)。

```js
// {app_root}/config/config.default.js
exports.swaggerEgg = {
  schema: {
    path: '/app/schema', // JSON Schema directory
  },
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: '127.0.0.1:7001', // 应当与egg server host保持一致，否则会有跨域的问题
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' }
    ],
    securityDefinitions: {
      api_key: {
        type: 'apiKey', // basic/apiKey/oauth2
        name: 'Authorization', // 自定义的鉴权参数，通常为'Authorization'
        in: 'header', // 鉴权参数放置的位置，query 或者 header
      },
      swagger_auth: {
        type: 'oauth2',
        authorizationUrl: 'http://swagger.io/api/oauth/dialog',
        flow: 'implicit',
        scopes: {
          'write:homes': 'modify home info',
          'read:homes': 'read home info',
        },
      },
    },
    security: [
      {
        api_key: [], // 鉴权方式（securityDefinitions中定义的内容）
      },
    ], // 注意: security为数组类型
  },
};
```

访问 [config/config.default.js](config/config.default.js) 查看更多默认配置。

## 插件语法

### #swagger-api
JSDoc注释中的`#swagger-api`标签是必须的，插件将以该标签为标识进行注释的自动扫描。

```js
  /**
   * #swagger-api
   *
   * @function index
   */
  async index() {
    this.ctx.body = 'hi, #swagger-api example'
  }
```

### @function {Name}
JSDoc注释的 `@function` 标签也是必须的，插件通过函数名去 `app/router.js`中进行扫描，以获取API的`Http Method、Http Url`信息。

```js
  /**
   * Function example #swagger-api
   *
   * @function index
   */
  async index() {
    this.ctx.body = 'hi, function example'
  }
```
### @summary {functionSummary}
JSDoc `@summary` 用于声明函数的简介.

```js
  /**
   * Function example #swagger-api
   *
   * @function index
   * @summary This is function's summary.
   */
  async index() {
    this.ctx.body = 'hi, summary example'
  }
```
### @description #tags {Tag1} {Tag2} ...
JSDoc `@description`内容中的`#tags`标签用于声明该API用到的Swagger tag。

注意: 多个Swagger tags 间应当使用空格进行分隔。

```js
  /**
   * Tags example #swagger-api
   *
   * @function index
   * @description #tags user admin
   */
  async index() {
    this.ctx.body = 'hi, tags example' 
  }
```
### @description #produces {Mimetype1} {Mimetype2} ...
JSDoc `@description`内容中的`#produces` 用于声明API Response MIMEtype.

注意: 多个MIMEtype使用空格进行分隔。

```js
  /**
   * Produces example #swagger-api
   *
   * @function index
   * @description #produces application/json
   */
  async index() {
    this.ctx.body = 'hi, produces example' 
  }
```

### @description #consumes {Mimetype1} {Mimetype1} ...

JSDoc `@description`内容中的`#consumes`用于声明API Request MIMEtype.

注意: 多个MIMEtype使用空格进行分隔。

```js
  /**
   * Consumes example #swagger-api
   *
   * @function index
   * @description #consumes application/json
   */
  async index() {
    this.ctx.body = 'hi, consumes example' 
  }
```

### @description #parameters {PrameterName} {In} {ParameterSchema|Type} {Required} - {Description}
JSDoc `@description`内容中的`#parameters`用于声明API Request Parameters.

注意: description需单独使用` - `分隔开（遵循JSDoc写法）其它参数使用空格进行分隔。

注意: 
- 按照Swagger规范，变量`In`的取值范围只能为`'query', 'header', 'path', 'formData', 'body'`
- 变量`Required`的值只能为`true`或者`false`。
- 变量`Type`的取值范围只能为`['string', 'number', 'integer', 'boolean', 'array', 'file']`。

```js
  /**
   * Parameters example #swagger-api
   *
   * @function index
   * @description #parameters id path schema.id true - id parameter
   */
  async index() {
    this.ctx.body = 'hi, parameters example' 
  }
```

### #responses {HttpStatus} {ResponseSchema} - {Description}

JSDoc `@description`内容中的`#responses` 用于声明API Response。

注意: description需单独使用` - `分隔开（遵循JSDoc写法）其它参数使用空格进行分隔。

```js
  /**
   * Responses example #swagger-api
   *
   * @function index
   * @description #responses schema.user - user responses
   */
  async index() {
    this.ctx.body = 'hi, responses example' 
  }
```

## Schema Example

Schema的写法需遵循 [JSON Schema](http://json-schema.org/) 规范，推荐使用[Ajv](https://ajv.js.org/guide/getting-started.html) 进行参数校验。

更改 `swaggerEgg.schema.path` 字段可制定待扫描的Schema文件路径。

```js
// {app_root}/app/schema/users.js

module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'user id'
    },
    name: {
      type: 'string',
      description: 'user name'
    },
    age: {
      type: 'number',
      description: 'user age'
    },
  },
  required: [ 'id', 'name', 'age' ],
  additionalProperties: false,
};
```

## Controller 示例

```js
// {app_root}/app/controller/users.js

const Controller = require('egg').Controller;

class UserController extends Controller {

  /**
   * Index action #swagger-api
   *
   * @function index
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters index query schema.definitions.index true - parameter index
   * @description #responses 200 schema.user - index response
   */
  async index() {
    this.ctx.body = 'hi, index action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * New action #swagger-api
   *
   * @function new
   * @memberof UserController
   * @description #tags user
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters userInfo body schema.user true - parameter userInfo
   * @description #responses 200 schema.user - new response
   */
  async new() {
    this.ctx.body = 'hi, new action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Show action #swagger-api
   *
   * @function show
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - parameter id
   * @description #responses 200 schema.user - show response
   */
  async show() {
    this.ctx.body = 'hi, show action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Edit action #swagger-api
   *
   * @function edit
   * @memberof UserController
   * @description #tags user
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - parameter id
   * @description #parameters userInfo body schema.user true - parameter userInfo 
   * @description #responses 200 schema.user - edit response
   */
  async edit() {
    this.ctx.body = 'hi, edit action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Create action #swagger-api
   *
   * @function create
   * @memberof UserController
   * @description #tags user
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters userInfo body schema.user true - parameter userInfo
   * @description #responses 200 schema.user - create response
   */
  async create() {
    this.ctx.body = 'hi, create action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Update action #swagger-api
   *
   * @function update
   * @memberof UserController
   * @description #tags user
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - parameter id
   * @description #parameters userInfo body schema.user true - parameter userInfo
   * @description #responses 200 schema.user - update response
   */
  async update() {
    this.ctx.body = 'hi, update action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Destory action #swagger-api
   *
   * @function destory
   * @memberof UserController
   * @description #tags user
   * @description #consumes application/json
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id false - parameter id 
   * @description #responses 200 schema.user - destory response
   */
  async destory() {
    this.ctx.body = 'hi, destory action ' + this.app.plugins.swaggerEgg.name;
  }
}

module.exports = UserController;

```

## 问题及建议

请创建 [issue](https://github.com/JsonMa/swagger-egg/issues) 来反馈您的问题及建议。同时欢迎更多的小伙伴能奉献一款swagger-egg vscode插件，供大家使用。

## License

[MIT](LICENSE)
