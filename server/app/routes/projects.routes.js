module.exports = (app, connection) => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/projects.controller.js');
  app.post('/api/projects', checkToken, controller.create);
  app.get('/api/projects', checkToken, controller.findAll);
  app.get('/api/projects/:projectId', checkToken, controller.findOne);
  app.put('/api/projects/:projectId', checkToken, controller.update);
  app.delete('/api/projects/:projectId', checkToken, controller.delete);
};
