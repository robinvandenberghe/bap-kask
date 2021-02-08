module.exports = (app, connection) => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/auth.controller.js');
  app.post('/auth/login', (req, res) => controller.login(req, res, connection));
  app.post('/auth/logout', checkToken, controller.logout);
  app.post('/auth/register', (req, res) => controller.register(req, res, connection));
  app.post('/auth/save-work', checkToken, (req, res) => controller.saveWork(req, res, connection));
  app.get('/auth/saved-works', checkToken, (req, res) => controller.getAllSavedWorks(req, res, connection));
  app.get('/auth/user/:userId', (req, res) => controller.getUser(req, res, connection));

};
