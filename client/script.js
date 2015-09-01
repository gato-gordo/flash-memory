var cardsServerUrl = 'http://localhost:3000/api/cards';

var javascriptDeck = {
	currentCard: 0,
	$el: 	$('.existing-cards'),
	initialize: function(){
		var deck = this;
		return this.cardsFromStorage().then(function(cards){
			cards.forEach(function(card){
				card = {id: card._id, front: card.front, back: card.back };
				deck.addCard(card);
			});
			deck.shuffle();
			deck.currentCard = 0;
		});
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
	cardsFromStorage: function(){
		return $.ajax({
			url: cardsServerUrl
		});
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

  	$('#form-card').prepend('<input type="hidden" name="id" value="' + card.id +  '">');
  	$('#form-card').prepend('<input type="hidden" name="index" value="' + index +  '">');
  	$('#form-card [type="submit"]').text('Edit');
		$('#form-card-front').val(card.front);
	  $('#form-card-back').val(card.back);
	},
	loadCardContent: function(index){
		var index = index || this.currentCard;
		$('.front p').text(this.cards[index]["front"]);
		$('.back p').text(this.cards[index]["back"]);
	},
	postCard: function(card){
		var deck = this;
		$.ajax({
			url: cardsServerUrl,
			method: 'POST',
			data: JSON.stringify(card),
			contentType: "application/json",
			dataType: 'json'
		})
		.then(function(card){
			deck.addCard({id: card._id, front: card.front, back: card.back });
		});
	},
	addCard: function(card){
		this.cards.push(card);
		this.renderTable();
	},
	putCard: function(card, index, id){
		var deck = this;
		var url = cardsServerUrl + '/' + id;

		$.ajax({
			url: url,
			method: 'PUT',
			data: JSON.stringify(card),
			contentType: "application/json",
			dataType: 'json'
		}).
		then(function(data){
			deck.updateCard(data[0], index);
		});
	},
	updateCard: function(card, index){
		this.cards[index] = card;
		this.renderTable();
	},
	getCard: function(index){
		return this.cards[Number(index)];
	},
	deleteCard: function(index){
		var card = this.cards[index];
		var id = card.id;
		var deck = this;
		var url = cardsServerUrl + '/' + id;
		$.ajax({
			url: url,
			method: 'DELETE',
			data: JSON.stringify(card),
			contentType: "application/json",
			dataType: 'json'
		}).
		then(function(data){
			deck.removeCard(index);
		});
	},
	removeCard: function(index){
		this.cards.splice(index, 1)[0];
		this.renderTable();
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
	renderTable: function($el){
		$el = $el || this.$el;
		$el.html('');
		var $table = $('<table class="table"><tbody></tbody></table>');
		this.cards.forEach(function(card, index){
			$table.append(
				'<tr>' +
					'<td>' + card.front +'</td>' +
					'<td><a class="edit" href="' + index + '">Edit</a></td>' +
					'<td><a class="delete" href="' + index + '">Delete</a></td>' +
				'</tr>'
			);
		});
		$el.append($table);
	},
	cards: []
};

$(document).on('ready', function(){

	javascriptDeck.initialize().then(function(){
		if(javascriptDeck.$el.length){
			javascriptDeck.renderTable();
		} else {
			javascriptDeck.loadCardContent();
		}
	});


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
  		javascriptDeck.postCard(card);
  	} else if (action === 'Edit'){
  		var index = values[0]['value'];
  		var id = values[1]['value'];
  		var card = javascriptDeck.parseCardForm(values.slice(2));
  		javascriptDeck.putCard(card, index, id);
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
  	var cardIndex = $(this).attr('href');
  	javascriptDeck.populateCardForm(cardIndex);
  });

  $('body').on('click', '.delete', function(e){
  	e.preventDefault();
  	e.stopPropagation();
  	var cardIndex = $(this).attr('href');
  	javascriptDeck.deleteCard(cardIndex);
  	javascriptDeck.renderTable();
  });

  $('body').on('mouseover', '.card', function() {
  	$(this).addClass('card-highlight');
	});

	$('body').on('mouseleave', '.card', function() {
  	$(this).removeClass('card-highlight');
	});

});
