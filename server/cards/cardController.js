var Card = require('./cardModel.js'),
    Q    = require('q');


module.exports = {

  create: function(req, res, next){
    var front  = req.body.front, back  =  req.body.back;
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

  index: function(req, res, next){
  	var findAll = Q.nbind(Card.find, Card);
  	findAll({})
      .then(function (cards) {
        if (!cards) {
          next(new Error('Cards cannot be retrieved.'));
        } else {
        	console.log("Successful query", cards);
    			res.json(cards);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  read: function(req, res, next){
  	var front = req.url.slice(1);
    var findCard = Q.nbind(Card.findOne, Card);

    findCard({front: front})
      .then(function (card) {
        if (!card) {
          next(new Error('Card cannot be retrieved.'));
        } else {
    			res.json(card);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  update: function(req, res, next){
  	
    var id = req.params.card_id, front = req.body.front, back  = req.body.back;
    console.log(req.body);

    var findCard = Q.nbind(Card.findOne, Card);

    /*
    findCard({_id: id})
    	.then(function(card){
        if (!card) {
          next(new Error('Card cannot be retrieved.'));
        } else {
        	console.log('First console', card)
        	var save = Q.nbind(Card.save, Card);
    			card.front = front;
    			card.back = back;
    			console.log("Second console", card);
    			save(card);
        }
      })
      .then(function(card){
      	if (!card) {
          next(new Error('Card cannot be modified.'));
        } else {
        	res.json(card);
        }
      })
      .fail(function (error) {
        next(error);
      });*/

    
    var findOneAndUpdate = Q.nbind(Card.findOneAndUpdate, Card);

   findOneAndUpdate({"_id": id}, {"front": front, "back": back}, {"new": true})
    .then(function(card) {
      res.json(card);
    })
    .fail(function (error) {
      next(error);
    });
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