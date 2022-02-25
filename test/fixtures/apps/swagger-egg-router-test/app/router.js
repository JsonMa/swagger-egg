'use strict';

module.exports = (app) => {
  const {router, controller} = app;

  router.prefix('/api/v1');

  // Require style router
  require('./router/admin')(app);

  // RESTful style router
  router.resources('posts', '/api/posts', controller.posts);
  router.resources('users', '/api/v1/users', controller.v1.users);

  // Common style router
  router.get('/homes', controller.homeTest.index);
  router.get('/homes/new', controller.homeTest.new);
  router.get('/homes/:id', controller.homeTest.show);
  router.get('/homes/:id/edit', controller.homeTest.edit);
  router.post('/homes', controller.homeTest.create);
  router.put('/homes/:id', controller.homeTest.update);
  router.delete('/homes/:id', controller.homeTest.destory);
};
