var db = require('../../config/database');

var Pessoa = require('./models/pessoa');
var Imovel = require('./models/imovel');
var Reserva = require('./models/reserva');

var api = {}

//Pessoas

api.addPessoa = function(req, res) {
  Pessoa.create(req.body, function(err, doc) {
    if(err) return console.log(err);
    console.log('Pessoa adicionada com sucesso: ' + doc._id);
    res.json(doc._id);
  });  
};

api.findPessoa = function(req, res) {
  Pessoa.findOne({_id : req.params.pessoaId}, function(err, doc) {
    if (err) return console.log(err);
    res.json(doc);
  });
};

api.updatePessoa = function(req, res) {
  Pessoa.update({_id : req.params.pessoaId}, req.body, function(err, numReplaced) {
    if (err) return console.log(err);
    if(numReplaced) res.status(200).end();
    res.status(500).end();
    console.log('Pessoa atualizada com sucesso: ' + req.body._id);
    res.status(200).end();
  });  
};

api.listPessoas = function(req, res) {
  Pessoa.find({}).sort({nome: 1}).exec(function(err, doc) {
    if (err) return console.log(err);
    res.json(doc);
  });
};

api.deletePessoa = function(req, res) {
  Pessoa.findByIdAndRemove({ _id: req.params.pessoaId }, {}, function (err, numRemoved) {
    if (err) return console.log(err);
    console.log('Pessoa removida com sucesso: ' + numRemoved._id);
    if(numRemoved) res.status(200).end();
    res.status(500).end();
  });
};

api.listLocatarios = function(req, res) {
  Pessoa.find({tipo: 1}).sort({nome: 1}).exec(function(err, doc) {
    if (err) return console.log(err);
    res.json(doc);
  });
};

api.listProprietarios = function(req, res) {
  Pessoa.find({tipo: 2}).sort({nome: 1}).exec(function(err, doc) {
    if (err) return console.log(err);
    res.json(doc);
  });
};


//Imoveis

api.addImovel = function(req, res) {
  Imovel.create(req.body, function(err, doc) {
    if(err) return console.log(err);
    console.log('Imovel adicionado com sucesso: ' + doc._id);
    res.json(doc._id);
  });  
};

api.findImovel = function(req, res) {
  Imovel.findOne({_id : req.params.imovelId})
      .populate('proprietario')
      .exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
  });
};

api.updateImovel = function(req, res) {
  Imovel.update({_id : req.params.imovelId }, req.body, function(err, numReplaced) {
    if (err) return console.log(err);
    if(numReplaced) res.status(200).end();
    res.status(500).end();
    console.log('Imovel atualizado com sucesso: ' + req.body._id);
    res.status(200).end();
  });  
};

api.listImoveis = function(req, res) {
  Imovel.find({})
    .populate('proprietario')
    .sort({descricao: 1}).exec(function(err, doc) {
      if (err) return console.log(err);
      res.json(doc);
  });
};

api.deleteImovel = function(req, res) {
  Imovel.findByIdAndRemove({ _id: req.params.imovelId }, {}, function (err, numRemoved) {
    if (err) return console.log(err);
    console.log('Imovel removido com sucesso: ' + numRemoved._id);
    if(numRemoved) res.status(200).end();
    res.status(500).end();
  });
};


// Resservas

api.addReserva = function(req, res) {
  Reserva.create(req.body, function(err, doc) {
    if(err) return console.log(err);
    console.log('Reserva adicionada com sucesso: ' + doc._id);
    res.json(doc._id);
  });  
};

api.findReserva = function(req, res) {
  Reserva.findOne({_id : req.params.reservaId})
      .populate('locatario')
      .populate('imovel')
      .exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
  });
};

api.updateReserva = function(req, res) {
  Reserva.update({_id : req.params.reservaId }, req.body, function(err, numReplaced) {
    if (err) return console.log(err);
    if(numReplaced) res.status(200).end();
    res.status(500).end();
    console.log('Reserva atualizada com sucesso: ' + req.body._id);
    res.status(200).end();
  });  
};

api.listReservas = function(req, res) {
  Reserva.find({})
    .populate('locatario')
    .populate('imovel')
    .sort({dataInicio: 1}).exec(function(err, doc) {
      if (err) return console.log(err);
      res.json(doc);
  });
};

api.deleteReserva = function(req, res) {
  Reserva.findByIdAndRemove({ _id: req.params.reservaId }, {}, function (err, numRemoved) {
    if (err) return console.log(err);
    console.log('Reserva removida com sucesso: ' + numRemoved._id);
    if(numRemoved) res.status(200).end();
    res.status(500).end();
  });
};


//Tipos

api.tiposDePessoas = function(req, res) {
    res.json([
        {
            _id: 1, 
            nome: 'Locatário'
        }, 
        { 
            _id: 2, 
            nome: 'Proprietário', 
        } 
    ]);        
};

api.tiposDeImoveis = function(req, res) {
    res.json([
        {
            _id: 1, 
            nome: 'Apartamento'
        }, 
        { 
            _id: 2, 
            nome: 'Casa', 
        }, 
        { 
            _id: 3, 
            nome: 'Loja', 
        }, 
        { 
            _id: 4, 
            nome: 'Sala', 
        }, 
        { 
            _id: 5, 
            nome: 'Outro', 
        } 
    ]);        
};


module.exports = api;
