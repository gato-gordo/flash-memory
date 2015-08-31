var Card = require('./cardModel.js'),
    Q    = require('q');


module.exports = {

  create: function(req, res, next){
    var front  = req.body.front, back  = req.body.back;
    var create = Q.nbind(Card.create, Card);
    var newCard = {
      front: front,
      back: back
    };
    
    create(newCard).then(function (card) {
        res.json(card);
      })
      .fail(function (error) {
        next(error);
      });
  },

  index: function(){

  },

  read: function(req, res, next){
  	/*
  	var id = req.body.id;
    var findCard = Q.nbind(Card.findOne, Card);

    findCard({id: id})
      .then(function (card) {
        if (!card) {
          next(new Error('Card cannot be retrieved.'));
        } else {
    			res.json(card);
        }
      })
      .fail(function (error) {
        next(error);
      });*/
  },

  update: function(id){
  	/*
    var id = req.url.id, front = req.body.front, back  = req.body.back;

    var findOne = Q.nbind(Card.findOne, Card);

   findOne({id: id})
    .then(function(card) {
      if (!card) {
        next(new Error('Card cannot be retrieved!'));
      } else {
     		var update = Q.nbind(Card.update, Card);
    		var updatedCard = {
      		front: front,
      		back: back
    		};
      	update.(updatedCard);
      }
    })
    .then(function (card) {
      res.json({card});
    })
    .fail(function (error) {
      next(error);
    });*/
  },

  destroy: function(id){
  	/*
  	var id = req.url.id;

  	var findOne = Q.nbind(Card.findOne, Card);
   findOne({id: id})
    .then(function(card) {
      if (!card) {
        next(new Error('Card cannot be retrieved!'));
      } else {
     		var destroy = Q.nbind(Card.destroy, Card);
      	destroy({id: id});
      }
    })
    .then(function (card) {
      res.json({card});
    })
    .fail(function (error) {
      next(error);
    });*/
  }

};