'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/homes/new', controller.home.new);
  router.get('/homes/:id', controller.home.show);
  router.get('/homes/:id/edit', controller.home.edit);
  router.post('/homes', controller.home.create);
  router.put('/homes/:id', controller.home.update);
  router.delete('/homes/:id', controller.home.destory);
};
