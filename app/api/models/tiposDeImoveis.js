var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tiposSchema = new Schema({
	_id		: Number,
	nome	: String
});

var TiposDeImoveis = mongoose.model('TiposDeImoveis', tiposSchema);

module.exports = TiposDeImoveis;
