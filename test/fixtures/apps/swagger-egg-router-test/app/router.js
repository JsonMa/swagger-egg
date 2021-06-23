'use strict';

module.exports = app => {
  const { router, controller } = app;

  // Require style router
  require('./router/admin')(app);

  // RESTful style router
  router.resources('posts', '/api/posts', controller.posts);
  router.resources('users', '/api/v1/users', controller.v1.users);

  // Common style router
  router.get('/homes', controller.home.index);
  router.get('/homes/new', controller.home.new);
  router.get('/homes/:id', controller.home.show);
  router.get('/homes/:id/edit', controller.home.edit);
  router.post('/homes', controller.home.create);
  router.put('/homes/:id', controller.home.update);
  router.delete('/homes/:id', controller.home.destory);
};
