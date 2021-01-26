module.exports = (app, connection) => {
  const { checkToken } = require('../middleware');
  const controller = require('../controllers/messages.controller.js');
  app.post('/api/messages', checkToken, ( req, res ) => controller.create(req, res, connection));
  app.get('/api/messages', checkToken, ( req, res ) => controller.findAll(req, res, connection));
  app.put('/api/messages', checkToken, ( req, res ) => controller.update(req, res, connection));
  app.delete('/api/messages/:messageId', checkToken, ( req, res ) => controller.delete(req, res, connection));
};
