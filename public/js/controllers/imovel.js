'use strict';

angular.module('Imovel')

.controller('ImovelController', 
    ['$scope', '$location', '$routeParams', 'cadastroDeImoveis', 'recursoImovel',
    function($scope, $location, $routeParams, cadastroDeImoveis, recursoImovel) {
    
        $scope.imovel = {};
        $scope.proprietarioSelecionado = {}
        $scope.mensagem = '';

        if($routeParams.imovelId) {
            recursoImovel.get({imovelId: $routeParams.imovelId}, function(imovel) {
                $scope.imovel = imovel; 
                $scope.proprietarioSelecionado = imovel.proprietario[0];
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter o imovel'
            });
        }

        $scope.submeter = function() {
        	if ($scope.formulario.$valid) {
                $scope.imovel.proprietario = $scope.proprietarioSelecionado
                cadastroDeImoveis.cadastrar($scope.imovel)
                .then(function(dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) $scope.imovel = {};
                    $location.path('/imoveis');
                })
                .catch(function(erro) {
                    $scope.mensagem = erro.mensagem;
                });
        	}
        };

}])

.controller('ImovelListController', ['$scope', '$location', 'recursoImovel',
    function($scope, $location, recursoImovel) {
    
        $scope.imoveis = [];
        $scope.mensagem = '';

		recursoImovel.query(function(imoveis) {
	        $scope.imoveis = imoveis;
	    }, function(erro) {
	        console.log(erro);
	    });

        $scope.remover = function(imovel) {
            recursoImovel.delete({imovelId: imovel._id}, function() {
                var indice = $scope.imoveis.indexOf(imovel);
                $scope.imoveis.splice(indice, 1);
                $scope.mensagem = 'Imovel ' + imovel.descricao + ' removido com sucesso!';
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível apagar o imovel ' + imovel.descricao;
            });
        };

}]);