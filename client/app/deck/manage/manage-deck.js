angular.module('flash-memory.manage-deck', [])

.controller('ManageDeckController', function ($scope, Deck) {

	$scope.getCards =  function(){
		return Deck.getCards();
  };

  $scope.addCard = function(card){
  	Deck.addCard(card).then(function(card){
  		$scope.cards.push(card);
  		$scope.setDefaultForm();
  	});
  };

  $scope.removeCard = function(id, index){
  	Deck.removeCard(id).then(function(card){
  		$scope.cards.splice(index, 1);
  		$scope.setDefaultForm();
  	});
  }

  $scope.editCard = function(index){
  	$scope.formCard = $scope.cards[index];
  	$scope.formHandler = $scope.updateCard;
  	$scope.currentCard = index;
  	$scope.formAction = "Edit";
  }

  $scope.updateCard = function(card, index){
  	Deck.updateCard(card).then(function(cards){
  		$scope.cards[index] = cards[0];
			$scope.setDefaultForm();
  	});
  }

  $scope.setDefaultForm = function(){
  		$scope.currentCard = 0;
  		$scope.formCard = {};
			$scope.formAction = "Create";
			$scope.formHandler = $scope.addCard;
  }
  
	$scope.cards = [];
  $scope.getCards().then(function(cards){
  	$scope.cards = cards;
  });

  $scope.setDefaultForm();


});