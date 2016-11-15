angular.module('Reserva', ['ngResource'])

.factory('recursoReserva', ['$resource', function($resource) {
    return $resource('/v1/reservas/:reservaId', null, {
        'update' : { 
            method: 'PUT'
        }
    });
}])

.factory("cadastroDeReservas", ['recursoReserva', '$q', '$rootScope', 
    function(recursoReserva, $q, $rootScope) {
    var evento = 'reservaCadastrado';
    var service = {};
    service.cadastrar = function(reserva) {
        return $q(function(resolve, reject) {

            if(reserva._id) {
                recursoReserva.update({reservaId: reserva._id}, reserva, function() {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Reserva ' + reserva._id + ' atualizada com sucesso',
                        inclusao: false
                    });
                }, function(erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível atualizar a reserva ' + reserva._id
                    });
                });

            } else {
                 recursoReserva.save(reserva, function() {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Reserva ' + reserva._id + ' incluída com sucesso',
                        inclusao: true
                    });
                }, function(erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível incluir a reserva' + reserva._id
                    });
                });
            }
        });
    };
    return service;
}]);
