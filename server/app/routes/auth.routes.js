module.exports = app => {
  const {checkToken, isAdmin} = require('../middleware');
  const controller = require('../controllers/auth.controller.js');
  app.post('/auth/login', controller.login);
  app.post('/auth/logout', checkToken, controller.logout);
  app.post('/auth/register', controller.register);
  app.post('/auth/save-work', checkToken, controller.saveWork);
  app.get('/auth/saved-works', checkToken, controller.getAllSavedWorks);
  app.post('/auth/create-student', checkToken, isAdmin, controller.createStudent);
  app.get('/auth/user/:userId', controller.getUser);

};
