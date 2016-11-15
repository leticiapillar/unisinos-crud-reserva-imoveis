'use strict';

angular.module('Pessoa', ['ngResource'])

.factory('recursoPessoa', ['$resource', function($resource) {
    return $resource('/v1/pessoas/:pessoaId', null, {
        'update' : { 
            method: 'PUT'
        }
    });
}])

.factory("cadastroDePessoas", ['recursoPessoa', '$q', '$rootScope', 
    function(recursoPessoa, $q, $rootScope) {
    var evento = 'pessoaCadastrado';
    var service = {};
    service.cadastrar = function(pessoa) {
        return $q(function(resolve, reject) {

            if(pessoa._id) {
                recursoPessoa.update({pessoaId: pessoa._id}, pessoa, function() {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Pessoa ' + pessoa.nome + ' atualizada com sucesso',
                        inclusao: false
                    });
                }, function(erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível atualizar o pessoa ' + pessoa.nome
                    });
                });

            } else {
                 recursoPessoa.save(pessoa, function() {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Pessoa ' + pessoa.nome + ' incluído com sucesso',
                        inclusao: true
                    });
                }, function(erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível incluir o pessoa' + pessoa.nome
                    });
                });
            }
        });
    };
    return service;
}]);
