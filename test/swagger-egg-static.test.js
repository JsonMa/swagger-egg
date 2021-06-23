'use strict';

const mock = require('egg-mock');

describe('test/swagger-egg.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/swagger-egg-router-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /swagger/index.html', () => {
    return app.httpRequest()
      .get('/swagger/index.html')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200);
  });

  it('should GET /swagger/swagger.json', () => {
    return app.httpRequest()
      .get('/swagger/swagger.json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });
});
