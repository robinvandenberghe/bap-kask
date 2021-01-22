module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/drinks.controller.js');
  app.post('/drinks', checkToken, controller.create);
  app.get('/drinks', checkToken, controller.findAll);
  app.get('/drinks/:bookId', checkToken, controller.findOne);
  app.put('/drinks/:bookId', checkToken, controller.update);
  app.delete('/drinks/:bookId', checkToken, controller.delete);
};
