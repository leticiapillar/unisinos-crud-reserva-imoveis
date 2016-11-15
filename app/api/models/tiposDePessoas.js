var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tiposSchema = new Schema({
	_id		: Number,
	nome	: String
});

var TiposDePessoas = mongoose.model('TiposDePessoas', tiposSchema);

module.exports = TiposDePessoas;
