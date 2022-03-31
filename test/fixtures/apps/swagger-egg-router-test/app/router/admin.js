'use strict';

module.exports = (app) => {
  const {router, controller} = app;

  // Common style router
  app.router.get('/admin', app.controller.adminTest.index);
  router.get('newAdmin', '/admin/new', controller.adminTest.new);
  router.get('newShow', '/admin/:id', controller.adminTest.show);
  router.get('/admin/:id/edit', controller.adminTest.edit);
  router.post('/admin', controller.adminTest.create);
  router.put('/admin/:id', controller.adminTest.update);
  router.delete('/admin/:id', controller.adminTest.destory);
};
