'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  /**
   * Index action #swagger-api
   *
   * @function index
   * @memberof AdminController
   * @description #tag admin
   * @description #produces application/json
   * @description #parameters index query schema.definitions.id true - index query parameter
   * @description #responses 200 schema.admin - index response
   */
  async index() {
    this.ctx.body = 'hi, index action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * New action #swagger-api
   *
   * @function new
   * @memberof AdminController
   * @description #tag admin
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters in body schema.admin true - new body parameter
   * @description #responses 200 schema.admin - new response
   */
  async new() {
    this.ctx.body = 'hi, new action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Show action #swagger-api
   *
   * @function show
   * @memberof AdminController
   * @description #tag admin
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - show path parameter
   * @description #responses 200 schema.admin - show response
   */
  async show() {
    this.ctx.body = 'hi, show action' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Edit action #swagger-api
   *
   * @function edit
   * @memberof AdminController
   * @description #tag admin
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - edit path parameter
   * @description #parameters in body schema.admin true - edit body parameter
   * @description #responses 200 schema.admin - edit response
   */
  async edit() {
    this.ctx.body = 'hi, edit action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Create action #swagger-api
   *
   * @function create
   * @memberof AdminController
   * @description #tag admin
   * @description #consumes application/x-www-form-urlencoded
   * @description #consumes application/json
   * @description #parameters in body schema.admin true - create body parameter
   * @description #responses 200 schema.admin - create response
   */
  async create() {
    this.ctx.body = 'hi, create action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Update action #swagger-api
   *
   * @function update
   * @memberof AdminController
   * @description #tag admin
   * @description #consumes application/x-www-form-urlencoded
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id true - update path parameter
   * @description #parameters id body schema.admin true - update body parameter
   * @description #responses 200 schema.admin - update response
   */
  async update() {
    this.ctx.body = 'hi, update action ' + this.app.plugins.swaggerEgg.name;
  }

  /**
   * Destory action #swagger-api
   *
   * @function destory
   * @memberof AdminController
   * @description #tag admin
   * @description #consumes application/json
   * @description #produces application/json
   * @description #parameters id path schema.definitions.id false - destory path parameter
   * @description #responses 200 schema.admin - destory response
   */
  async destory() {
    this.ctx.body = 'hi, destory action ' + this.app.plugins.swaggerEgg.name;
  }
}

module.exports = AdminController;
