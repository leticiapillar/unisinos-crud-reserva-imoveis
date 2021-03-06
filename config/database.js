var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds153657.mlab.com:53657/dbreservas');
//mongoose.connect('mongodb://admin:admin@ds157487.mlab.com:57487/dbreservas-test');

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('Database connection successful');
});

module.exports = db;
