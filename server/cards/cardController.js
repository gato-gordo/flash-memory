var Card = require('./cardModel.js'),
    Q    = require('q');


module.exports = {

  create: function(req, res, next){
  	
    var front  = req.body.front, 
    		back  =  req.body.back,
    		create = Q.nbind(Card.create, Card),
    		newCard = {
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

  	var index = Q.nbind(Card.find, Card);

  	index({})
      .then(function (cards) {
    		res.json(cards);
      })
      .fail(function (error) {
        next(error);
      });
  },

  read: function(req, res, next){

  	var id = req.params.card_id,
  			read = Q.nbind(Card.findById, Card);

    read(id)
      .then(function (card) {
    			res.json(card);
      })
      .fail(function (error) {
        next(error);
      });
  },

  update: function(req, res, next){
	  var id = req.params.card_id, 
	  		front = req.body.front, 
	  		back  = req.body.back,
	  		update = Q.nbind(Card.findByIdAndUpdate, Card);

	  update(id, {"front": front, "back": back}, {"new": true})
	    .then(function(card) {
	      res.json(card);
	    })
	    .fail(function (error) {
	      next(error);
	    });
  },

  destroy: function(req, res, next){

    var id = req.params.card_id,
    		destroy = Q.nbind(Card.findByIdAndRemove, Card);
  
    destroy(id)
      .then(function (card) {
        res.json(card);
      })
      .fail(function (error) {
       next(error);
    	});
   }
};