module.exports = (app, connection) => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/projects.controller.js');
  app.post('/api/projects',  checkToken, (req, res) => controller.create(req, res, connection));
  app.get('/api/projects', (req, res) => controller.findAll(req, res, connection));
  app.get('/api/projects/:projectId', (req, res) => controller.findOne(req, res, connection));
  app.put('/api/projects/:projectId', checkToken, (req, res) => controller.update(req, res, connection));
  app.delete('/api/projects/:projectId', checkToken, (req, res) => controller.delete(req, res, connection));
};
