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

  it('should GET /homes', () => {
    return app.httpRequest()
      .get('/homes')
      .expect('hi, index action' + app.plugins.swaggerEgg.name)
      .expect(200);
  });
});
