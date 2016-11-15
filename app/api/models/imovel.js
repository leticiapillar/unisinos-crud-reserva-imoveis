var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imovelSchema = new Schema({
	tipo			: Number,
	descricao		: String,
	qtdDormitorios	: Number,
	qtdBanheiros	: Number,
	tamanho			: Number,
	endereco		: String,
	bairro			: String,
	cidade			: String,
	cep				: String,
	estado			: String,
	proprietario	: [{type: Schema.Types.ObjectId, ref: 'Pessoa'}]
});

var Imovel = mongoose.model('Imovel', imovelSchema);

module.exports = Imovel;
