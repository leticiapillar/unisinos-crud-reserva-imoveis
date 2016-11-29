'use strict';

angular.module('Reserva')

.controller('ReservaController', 
    ['$scope', '$location', '$routeParams', 'cadastroDeReservas', 'recursoReserva', 
    function($scope, $location, $routeParams, cadastroDeReservas, recursoReserva) {
    
        $scope.reserva = {};
        $scope.locatarioSelecionado = {};
        $scope.imovelSelecionado = {};
        $scope.mensagem = '';
        
        var today = new Date();
        today.setHours(0,0,0,0);
        
        var tomorrow = new Date();
        tomorrow.setHours(0,0,0,0);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        $scope.startDate = today;
        $scope.endDate = tomorrow;

        if($routeParams.reservaId) {
            recursoReserva.get({reservaId: $routeParams.reservaId}, function(reserva) {
                $scope.reserva = reserva;
                $scope.locatarioSelecionado = reserva.locatario[0];
                $scope.imovelSelecionado = reserva.imovel[0];
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a reserva'
            });
        }

        $scope.submeter = function() {
        	if ($scope.formulario.$valid) {
                $scope.reserva.locatario = $scope.locatarioSelecionado;
                $scope.reserva.imovel = $scope.imovelSelecionado;
                cadastroDeReservas.cadastrar($scope.reserva)
                .then(function(dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) $scope.reserva = {};
                    $location.path('/reservas');
                })
                .catch(function(erro) {
                    $scope.mensagem = erro.mensagem;
                });
        	}
        };

        $scope.changeDataInicial = function() {
            var dt = $scope.reserva.dataInicial;
            if (dt >= today) {
                dt.setDate(dt.getDate() + 1);
                $scope.endDate = dt;
                $scope.reserva.dataFinal = dt;
            }
        }

}])

.controller('ReservaListController', ['$scope', '$location', 'recursoReserva', 'recursoPessoa',
    function($scope, $location, recursoReserva, recursoPessoa) {
    
        $scope.reservas = [];
        $scope.mensagem = '';

		recursoReserva.query(function(reservas) {
            $scope.reservas = reservas;
	    }, function(erro) {
	        console.log(erro);
	    });

        $scope.remover = function(reserva) {
            recursoReserva.delete({reservaId: reserva._id}, function() {
                var indice = $scope.reservas.indexOf(reserva);
                $scope.reservas.splice(indice, 1);
                $scope.mensagem = 'Reserva ' + reserva.nome + ' removida com sucesso!';
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível apagar a reserva ' + reserva.nome;
            });
        };
}]);