'use strict';

const mock = require('egg-mock');
const globby = require('globby');
const path = require('path');

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

  it('should GET /index.html', () => {
    return app.httpRequest().get('/index.html').expect('Content-Type', 'text/html; charset=utf-8').expect(200);
  });

  it('should GET /swagger.json', () => {
    const targetPath = path.join(app.config.baseDir, 'app/public/swagger');
    const targetFileName = globby.sync('**/*.(json)', {cwd: targetPath});
    return app
      .httpRequest()
      .get(`/swagger/${targetFileName[0]}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });
});
