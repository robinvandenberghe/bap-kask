module.exports = (app, connection) => {
  const controller = require('../controllers/auth.controller.js');
  app.post('/auth/login', (req, res) => controller.login(req, res, connection));
  app.post('/auth/logout', controller.logout);
  app.post('/auth/register', (req, res) => controller.register(req, res, connection));
  app.post('/auth/save-work', (req, res) => controller.saveWork(req, res, connection));
};
