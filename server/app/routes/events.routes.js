module.exports = (app, connection) => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/events.controller.js');
  app.post('/api/events', checkToken, (req, res) => controller.create(req, res, connection));
  app.get('/api/events', (req, res) => controller.findAll(req, res, connection));
  app.get('/api/events/:eventId', (req, res) => controller.findOne(req, res, connection));
  app.put('/api/events/:eventId', checkToken, (req, res) => controller.update(req, res, connection));
  app.delete('/api/events/:eventId', checkToken, (req, res) => controller.delete(req, res, connection));
};
