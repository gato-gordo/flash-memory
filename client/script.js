


var javascriptDeck = {
	currentCard: 0,
	initialize: function(){
		this.shuffle();
		this.currentCard = 0;
		this.loadCardContent();
	},
	shuffle: function(){
		var shuffled = [];
		var cards = this.cards.slice();
		var el;
		while(el = cards.pop()){
			var randIndex = Math.floor(Math.random() * shuffled.length);
			shuffled.splice(randIndex, 0, el);
		}
		this.cards = shuffled;
	},
	loadCardContent: function(){
		$('.front p').text(javascriptDeck.cards[javascriptDeck.currentCard]["front"]);
		$('.back p').text(javascriptDeck.cards[javascriptDeck.currentCard]["back"]);
	},
	forward: function(){
		if(this.currentCard !== this.cards.length - 1 ){
			this.currentCard += 1;
		} else {
			this.currentCard = 0;
		}
		return this.currentCard;
	},
	backward: function(){
		if(this.currentCard !== 0 ){
			this.currentCard -= 1;
		} else {
			this.currentCard = this.cards.length - 1;
		}
		return this.currentCard;
	},
	cards: [
		{
			front: "Closure",
			back: "A function that retains ongoing access to the variables of the context in which it was created (even after the outer function calls it was created within have returned).",
		},
			{
			front: "Non-blocking i/o",
			back: "In non-blocking i/o, the function that initiates the i/o returns immediately, allowing other code to execute while the i/o operations run in the background.  Operations that depend on the result of the i/o operations are handled by either callbacks, promises, or some other asynchronous form of execution that are registered with the non-blocking function.",
		},
		{
			front: "Higher-order Function",
			back: "A function that operates on other functions by either taking them as input or returning them when invoked.",
		},
		{
			front: "Immutable value (Def and JS examples)",
			back: "A value that cannot be changed once it is created.  Examples in JavaScript includes Numbers, Strings, and Booleans",
		},
			{
			front: "Lexical Scope",
			back: "The regions in your source code where you can refer to a variable by name, without getting access errors.  The rules of lexical scope can be understood without running code, since it only concerns the areas of code where variable names will have meaning.",
		},
			{
			front: "Keyword 'this' (What does it mean?)",
			back: "In support of O.O. language features, the auto-bound identifier 'this' is intended to refer to some likely-focal object during method or constructor invocation.",
		}
	]
};



$(document).on('ready', function(){

	javascriptDeck.initialize();

	$('.forward button').on('click', function(){
		javascriptDeck.forward();
		javascriptDeck.loadCardContent();
	});

	$('.backward button').on('click', function(){
		javascriptDeck.backward()
		javascriptDeck.loadCardContent();
	});

  $('.card').on('click', function(){
    $('.back, .front').toggle();
  });

  $('.shuffle').on('click', function(){
  	javascriptDeck.initialize();
  });

});
