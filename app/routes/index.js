var api = require('../api'),
    path = require('path');

module.exports  = function(app) {
	
    //Pessoas
    app.route('/v1/pessoas')
        .post(api.addPessoa)
        .get(api.listPessoas);
    app.route('/v1/pessoas/:pessoaId')
        .delete(api.deletePessoa)
        .get(api.findPessoa)
        .put(api.updatePessoa);

    app.get('/v1/locatarios', api.listLocatarios);
    app.get('/v1/proprietarios', api.listProprietarios);

    //Imoveis
    app.route('/v1/imoveis')
        .post(api.addImovel)
        .get(api.listImoveis);
    app.route('/v1/imoveis/:imovelId')
        .delete(api.deleteImovel)
        .get(api.findImovel)
        .put(api.updateImovel);

    //Reservas
    app.route('/v1/reservas')
        .post(api.addReserva)
        .get(api.listReservas);
    app.route('/v1/reservas/:reservaId')
        .delete(api.deleteReserva)
        .get(api.findReserva)
        .put(api.updateReserva);


    //Tipos
    app.get('/v1/tiposDePessoas', api.tiposDePessoas)
    app.get('/v1/tiposDeImoveis', api.tiposDeImoveis)

    // habilitando HTML5MODE
    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
};
