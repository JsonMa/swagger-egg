'use strict';

const mock = require('egg-mock');

describe('test/swagger-egg.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/swagger-egg-test',
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

  it('should GET /swagger/index.js', () => {
    return app.httpRequest()
      .get('/swagger/index.js')
      .expect('Content-Type', 'application/javascript; charset=utf-8')
      .expect(200);
  });
});
