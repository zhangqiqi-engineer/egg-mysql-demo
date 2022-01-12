'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const check = app.middleware.checktoken();
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.post('/api/login', controller.register.loginIndex);
  router.post('/api/register', controller.register.registerIndex);
  router.post('/api/employee/list', check, controller.employee.employeeIndex);
  router.post('/api/employee/add', check, controller.employee.add);
  router.post('/api/employee/delete', check, controller.employee.delete);
  router.post('/api/employee/update', check, controller.employee.update);

};
