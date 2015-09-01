angular.module('flash-memory.factories', [])

.factory('Deck', function ($http, $location, $window) {
  var getCards = function(){
    return $http({
      method: 'GET',
      url: '/api/cards'
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var addCard = function(card){
    return $http({
      method: 'POST',
      url: '/api/cards',
      data: card
    })
    .then(function(resp){
       return resp.data;
    });
  }

  var removeCard = function(id){
    var url = '/api/cards/' + id;
    return $http({
      method: 'DELETE',
      url: url,
    })
    .then(function(resp){
       return resp.data;
    });
  };

  var updateCard = function(card){
    var url = '/api/cards/' + card._id;
    return $http({
      method: 'PUT',
      url: url,
      data: {front: card.front, back: card.back }
    })
    .then(function(resp){
       return resp.data;
    });
  };

  return {
    getCards: getCards,
    addCard: addCard,
    removeCard: removeCard,
    updateCard: updateCard
  };
});