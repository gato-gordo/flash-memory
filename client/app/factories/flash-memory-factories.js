angular.module('flash-memory.factories', [])

.factory('ViewDeck', function ($http, $location, $window) {
  // Your code here
  var getCards = function(){
    return $http({
      method: 'GET',
      url: '/api/cards'
    })
    .then(function(resp){
      return resp.data;
    });
  }

  return {
    getCards: getCards
  };
});

/*
.factory('ManageDeck', function ($http, $location, $window) {
  // Your code here
  var addLink = function(link){
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link ///JSON.stringify?
    })
    .then(function(resp){
       return resp.data; //??? nothing right ?
    });
  }

  return {
    addLink: addLink
  };
})*/