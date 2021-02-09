module.exports = app => {
  const {checkToken, isAdmin, isAdminOrStudent} = require('../middleware');
  const controller = require('../controllers/projects.controller.js');
  app.post('/api/projects', checkToken, isAdmin, controller.create);
  app.get('/api/projects', controller.findAll);
  app.get('/api/subjects', controller.findAllSubjects);
  app.get('/api/studies', controller.findAllStudies);
  app.get('/api/projects/:projectId', controller.findOne);
  app.put('/api/projects/:projectId', checkToken, isAdminOrStudent, controller.update);
  app.delete('/api/projects/:projectId', checkToken, isAdmin, controller.delete);
  app.post('/api/projects/upload-file', checkToken, isAdminOrStudent, controller.uploadFile);
};
