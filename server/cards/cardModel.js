var mongoose = require('mongoose'),
		Q        = require('q');


var CardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
    unique: true
  },

  back: {
    type: String,
    required: true
  },

  creat_at: {
  	type: Date,
  },

  deck: {
  	
  }
});

module.exports = mongoose.model('cards', CardSchema);