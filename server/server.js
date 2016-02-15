  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/flash-memory');


// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;


