angular.module('flash-memory.view-deck', [])

.controller('ViewDeckController', function ($scope, Deck) {
	$scope.currentCard = 0;
	$scope.cards = [];
	$scope.showFront = true;
	$scope.shaking = false;

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
		$scope.showFront = true;
	}

	$scope.backward = function(){
		if($scope.currentCard !== 0 ){
			$scope.currentCard -= 1;
		} else {
			this.currentCard = $scope.cards.length - 1;
		}
		$scope.showFront = true;
	}

	$scope.shuffle = 	function(){
		$scope.shaking = true;
		setTimeout(function(){
			$scope.shaking = false;
		}, 300);
		var shuffled = [];
		var cards = $scope.cards.slice();
		var el;
		while(el = cards.pop()){
			var randIndex = Math.floor(Math.random() * shuffled.length);
			shuffled.splice(randIndex, 0, el);
		}
		$scope.cards = shuffled;
		$scope.currentCard = 0;
		$scope.showFront = true;
	}

})

.directive('shake-that', ['animate', function($animate){
	 return {
    require: '^form',
    link: function(scope, element, attrs, form) {
    }
}]);