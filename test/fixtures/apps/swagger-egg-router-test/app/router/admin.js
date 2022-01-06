'use strict';

module.exports = (app) => {
  const { router, controller } = app;

  // Common style router
  router.get('/admin', controller.admin.index);
  router.get('newAdmin', '/admin/new', controller.admin.new);
  router.get('newShow', '/admin/:id', controller.admin.show);
  router.get('/admin/:id/edit', controller.admin.edit);
  router.post('/admin', controller.admin.create);
  router.put('/admin/:id', controller.admin.update);
  router.delete('/admin/:id', controller.admin.destory);
};
