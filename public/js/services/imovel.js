'use strict';

angular.module('Imovel', ['ngResource'])

.factory('recursoImovel', ['$resource', function($resource) {
    return $resource('/v1/imoveis/:imovelId', null, {
        'update' : { 
            method: 'PUT'
        }
    });
}])

.factory("cadastroDeImoveis", ['recursoImovel', '$q', '$rootScope', 
    function(recursoImovel, $q, $rootScope) {
    var evento = 'imovelCadastrado';
    var service = {};
    service.cadastrar = function(imovel) {
        return $q(function(resolve, reject) {

            if(imovel._id) {
                recursoImovel.update({imovelId: imovel._id}, imovel, function() {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Imovel ' + imovel.descricao + ' atualizado com sucesso',
                        inclusao: false
                    });
                }, function(erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível atualizar o imovel ' + imovel.descricao
                    });
                });

            } else {
                 recursoImovel.save(imovel, function() {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Imovel ' + imovel.descricao + ' incluído com sucesso',
                        inclusao: true
                    });
                }, function(erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível incluir o imovel' + imovel.desc
                    });
                });
            }
        });
    };
    return service;
}]);
