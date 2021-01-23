module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/projects.controller.js');
  app.post('/projects', checkToken, controller.create);
  app.get('/projects', checkToken, controller.findAll);
  app.get('/projects/:projectId', checkToken, controller.findOne);
  app.put('/projects/:projectId', checkToken, controller.update);
  app.delete('/projects/:projectId', checkToken, controller.delete);
};
