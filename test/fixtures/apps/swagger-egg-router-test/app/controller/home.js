'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  /**
   * Index action #swagger-api
   *
   * @function index
   * @memberof HomeController
   * @description #tag home
   * @description #produces application/json
   * @description #parameters index query schema.definitions.id true - index query parameter
   * @description #responses 200 schema.home - index response
   */
  async index() {
    this.ctx.body = 'hi, index action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * New action #swagger-api
   *
   * @function new
   * @memberof HomeController
   * @description #tag home
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters in body schema.home true - new body parameter
   * @description #responses 200 schema.home - new response
   */
  async new() {
    this.ctx.body = 'hi, new action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Show action #swagger-api
   *
   * @function show
   * @memberof HomeController
   * @description #tag home
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - show path parameter
   * @description #responses 200 schema.home - show response
   */
  async show() {
    this.ctx.body = 'hi, show action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Edit action #swagger-api
   *
   * @function edit
   * @memberof HomeController
   * @description #tag home
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - edit path parameter
   * @description #parameters in body schema.home true - edit body parameter
   * @description #responses 200 schema.home - edit response
   */
  async edit() {
    this.ctx.body = 'hi, edit action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Create action #swagger-api
   *
   * @function create
   * @memberof HomeController
   * @description #tag home
   * @description #consumes application/x-www-form-urlencoded
   * @description #consumes application/json
   * @description #parameters in body schema.home true - create body parameter
   * @description #responses 200 schema.home - create response
   */
  async create() {
    this.ctx.body = 'hi, create action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Update action #swagger-api
   *
   * @function update
   * @memberof HomeController
   * @description #tag home
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - update path parameter
   * @description #parameters id body schema.home true - update body parameter
   * @description #responses 200 schema.home - update response
   */
  async update() {
    this.ctx.body = 'hi, update action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Destory action #swagger-api
   *
   * @function destory
   * @memberof HomeController
   * @description #tag home
   * @description #consumes application/json
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id false - destory path parameter
   * @description #responses 200 schema.home - destory response
   */
  async destory() {
    this.ctx.body = 'hi, destory action ' + this.app.plugins.swaggerEgg.name;
  }
}

module.exports = HomeController;
