module.exports = app => {
  const {checkToken, isAdmin} = require('../middleware');
  const controller = require('../controllers/events.controller.js');
  app.post('/api/events', checkToken, isAdmin, controller.create);
  app.get('/api/events', controller.findAll);
  app.get('/api/events/:eventId', controller.findOne);
  app.put('/api/events/:eventId', checkToken, isAdmin, controller.update);
  app.delete('/api/events/:eventId', checkToken, isAdmin, controller.delete);
  app.get('/api/topics', controller.findAllTopics);
};
