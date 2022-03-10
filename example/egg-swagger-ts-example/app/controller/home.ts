import { Controller } from 'egg';

export default class HomeController extends Controller {
   /**
   * Index action #swagger-api
   *
   * @function index
   * @memberof HomeController
   * @description #tags home
   * @description #produces application/json
   * @description #parameters index query schema.definitions.id true - index query parameter
   * @description #responses 200 schema.home - index response
   */
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
