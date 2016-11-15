var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservaSchema = new Schema({
	dataInicial	: Date,
	dataFinal	: Date,
	imovel		: [{type: Schema.Types.ObjectId, ref: 'Imovel'}],
	locatario	: [{type: Schema.Types.ObjectId, ref: 'Pessoa'}]
});

var Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
