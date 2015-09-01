angular.module('flash-memory.view-deck', [])

.controller('ViewDeckController', function ($scope, Deck) {
	$scope.currentCard = 0;
	$scope.cards = [];

	$scope.getCards =  function(){
		return Deck.getCards();
  };

  $scope.getCards().then(function(cards){
  	$scope.cards = cards;
  });;

  $scope.forward =  function(){
		if($scope.currentCard !== $scope.cards.length - 1 ){
			$scope.currentCard += 1;
		} else {
			$scope.currentCard = 0;
		}
	}

	$scope.backward = function(){
		if($scope.currentCard !== 0 ){
			$scope.currentCard -= 1;
		} else {
			this.currentCard = $scope.cards.length - 1;
		}
	}

	$scope.shuffle = 	function(){
		console.log('in shuffle');
		var shuffled = [];
		var cards = $scope.cards.slice();
		var el;
		while(el = cards.pop()){
			var randIndex = Math.floor(Math.random() * shuffled.length);
			shuffled.splice(randIndex, 0, el);
		}
		$scope.cards = shuffled;
		$scope.currentCard = 0;
	}

});