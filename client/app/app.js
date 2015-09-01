angular.module('flash-memory', 
	[
	'ngRoute', 
	'ngResource',
	'flash-memory.factories',
	'flash-memory.view-deck',
	'flash-memory.manage-deck'
	])
	.config(function($routeProvider, $httpProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'app/deck/view/view-deck.html',
     	 	controller: 'ViewDeckController'
			}).
			when('/manage', {
				templateUrl: 'app/deck/manage/manage-deck.html',
				controller: 'ManageDeckController'
			})
	});