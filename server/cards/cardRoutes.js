var cardController = require('./cardController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/', cardController.create);
  app.get('/:card_id', cardController.read)
  app.get('/', cardController.index);
  app.put('/:card_id', cardController.update);
  app.delete('/:card_id', cardController.destroy);
  
};
