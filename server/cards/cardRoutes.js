var cardController = require('./cardController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/', cardController.create);
  app.get('/:front', cardController.read)
  app.get('/', cardController.index);
  app.put('/:front', cardController.update);
  app.delete('/:front', cardController.destroy);
  
};
