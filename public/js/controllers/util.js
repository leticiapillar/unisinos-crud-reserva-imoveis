'use strict';

angular.module('Util')

.controller('TiposPessoaController', ['$scope', '$http', function($scope, $http) {

    $scope.tiposPessoa = [];    

    $http.get('/v1/tiposDePessoas')
    .success(function(tiposPessoa) {
        $scope.tiposPessoa = tiposPessoa;
    })
    .error(function(erro) {
        console.log(erro);
    });

}])

.controller('TiposImovelController', ['$scope', '$http', function($scope, $http) {

    $scope.tiposImovel = [];    

    $http.get('/v1/tiposDeImoveis')
    .success(function(tiposImovel) {
        $scope.tiposImovel = tiposImovel;
    })
    .error(function(erro) {
        console.log(erro);
    });

}])

.controller('EstadosController', ['$scope', '$http', function($scope, $http) {

    $scope.states = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA',
					'MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR',
					'RS','SC','SE','SP','TO'];    
}]);

