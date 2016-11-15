var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
	tipo		: Number,
	nome		: String,
	cpf			: String,
	telefone	: String,
	email		: String,
	endereco	: String,
	bairro		: String,
	cidade		: String,
	cep			: String,
	estado		: String
});

var Pessoa = mongoose.model('Pessoa', pessoaSchema);

module.exports = Pessoa;
