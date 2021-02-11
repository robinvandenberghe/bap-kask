module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/messages.controller.js');
  app.post('/api/messages', checkToken, controller.create);
  app.get('/api/messages', checkToken, controller.findAll);
  app.put('/api/messages', checkToken, controller.update);
  app.delete('/api/messages/:messageId', checkToken, controller.delete);
};
