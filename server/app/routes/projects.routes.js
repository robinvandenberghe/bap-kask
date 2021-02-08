module.exports = (app, connection) => {
  const {checkToken, hasRole} = require('../middleware');
  const {ADMIN, STUDENT} = require('../roles');
  const controller = require('../controllers/projects.controller.js');
  app.post('/api/projects',  checkToken, (req, res) => hasRole(req, res, connection, ADMIN),  (req, res) => controller.create(req, res, connection));
  app.get('/api/projects', (req, res) => controller.findAll(req, res, connection));
  app.get('/api/projects/:projectId', (req, res) => controller.findOne(req, res, connection));
  app.put('/api/projects/:projectId', checkToken, (req, res) => hasRole(req, res, connection, [ADMIN, STUDENT]), (req, res) => controller.update(req, res, connection));
  app.delete('/api/projects/:projectId', checkToken, (req, res) => hasRole(req, res, connection, ADMIN), (req, res) => controller.delete(req, res, connection));
  app.post('/api/projects/upload-file',  checkToken, (req, res) => hasRole(req, res, connection, [ADMIN, STUDENT]), controller.uploadFile);
};
