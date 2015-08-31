


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
	parseCardForm: function(values){
		
		var card = { 
			front: values[0]["value"], 
			back: values[1]["value"] 
		};

		return card;
	},
	populateCardForm: function(index){
		var card = this.getCard(index);
		$('#form-card-front').val(card.front);
	  $('#form-card-back').val(card.back);
	},
	loadCardContent: function(index){
		var index = index || this.currentCard;
		$('.front p').text(this.cards[index]["front"]);
		$('.back p').text(this.cards[index]["back"]);
	},
	addCard: function(card){
		this.cards.push(card);
	},
	updateCard: function(card, index){
		console.log("Before assignment", this.cards[index]);
		this.cards[index] = card;
		console.log("After assignment", this.cards[index]);
	},
	getCard: function(index){
		return this.cards[Number(index)];
	},
	removeCard: function(index){
		return this.cards.splice(index, 1)[0];
	}
	,
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
	renderTable: function($el){
		$el.html('');
		var $table = $('<table class="table"><tbody></tbody></table>');
		this.cards.forEach(function(card, index){
			$table.append(
				'<tr>' +
					'<td>' + card.front +'</td>' +
					'<td><a class="edit" href="' + index + ' ">Edit</a></td>' +
					'<td><a class="delete" href="' + index + ' ">Delete</a></td>' +
				'</tr>'
			);
		});
		$el.append($table);
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
	javascriptDeck.renderTable($('.existing-cards'));

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

  $('#form-card').on('submit', function(e){
  	e.preventDefault();
  	e.stopPropagation();
  	var values = $(this).serializeArray();
  	var action = $(this).find('[type="submit"]').text();
  	if(action === 'Create'){
  		var card = javascriptDeck.parseCardForm(values);
  		javascriptDeck.addCard(card);
  	} else if (action === 'Edit'){
  		var card = javascriptDeck.parseCardForm(values.slice(1));
  		var index = parseInt(values[0]['value']);
  		console.log(index);
  		javascriptDeck.updateCard(card, index);
  	}
  	javascriptDeck.renderTable($('.existing-cards'));
  	$('input[type="hidden"]', this).remove();
  	$('input, textarea', this).each(function (){
    	$(this).val("");
		});
		$(this).find('[type="submit"]').text('Create');
  });

  $('body').on('click', '.edit', function(e){
  	e.preventDefault();
  	e.stopPropagation();
  	$('input[type="hidden"]', this).each(function(){
  		$(this).remove();
  	});
  	var cardIndex = $(this).attr('href');
  	$('#form-card').prepend('<input type="hidden" name="index" value="' + cardIndex +  '">');
  	$('#form-card [type="submit"]').text('Edit');
  	javascriptDeck.populateCardForm(cardIndex);
  });

  $('body').on('click', '.delete', function(e){
  	e.preventDefault();
  	e.stopPropagation();
  	var cardIndex = parseInt($(this).attr('href'));
  	javascriptDeck.removeCard(cardIndex);
  	javascriptDeck.renderTable($('.existing-cards'));
  });

  $('body').on('mouseover', '.card', function() {
  	$(this).addClass('card-highlight');
	});

	$('body').on('mouseleave', '.card', function() {
  	$(this).removeClass('card-highlight');
	});

});
