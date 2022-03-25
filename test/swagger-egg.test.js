'use strict';

const mock = require('egg-mock');
const fs = require('fs');
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

  it('should GET /homes', () => {
    return app
      .httpRequest()
      .get('/api/v1/homes')
      .expect('hi, index action' + app.plugins.swaggerEgg.name)
      .expect(200);
  });

  it('should GET swagger info', () => {
    const filePath = path.join(app.config.baseDir, './app/schema/user.js');
    const userSchemaString = require(filePath);
    return app.httpRequest().get('/api/v1/users').expect(JSON.stringify(userSchemaString)).expect(200);
  });
});
