'use strict';

angular.module('Pessoa')

.controller('PessoaController',
    ['$scope', '$location', '$routeParams', 'cadastroDePessoas', 'recursoPessoa',
    function($scope, $location, $routeParams, cadastroDePessoas, recursoPessoa) {
    
        $scope.pessoa = {};
        $scope.mensagem = '';

        if($routeParams.pessoaId) {
            recursoPessoa.get({pessoaId: $routeParams.pessoaId}, function(pessoa) {
                $scope.pessoa = pessoa; 
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a pessoa'
            });
        }

        $scope.submeter = function() {
        	if ($scope.formulario.$valid) {
                cadastroDePessoas.cadastrar($scope.pessoa)
                .then(function(dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) $scope.pessoa = {};
                    $location.path('/pessoas');
                })
                .catch(function(erro) {
                    $scope.mensagem = erro.mensagem;
                });
        	}
        };

}])

.controller('PessoaListController', ['$scope', '$location', 'recursoPessoa', '$http',
    function($scope, $location, recursoPessoa, $http) {
    
        $scope.pessoas = [];
        $scope.locatarios = [];
        $scope.proprietarios = [];
        $scope.mensagem = '';

		recursoPessoa.query(function(pessoas) {
	        $scope.pessoas = pessoas;
        }, function(erro) {
	        console.log(erro);
	    });

        $scope.remover = function(pessoa) {
            recursoPessoa.delete({pessoaId: pessoa._id}, function() {
                var indice = $scope.pessoas.indexOf(pessoa);
                $scope.pessoas.splice(indice, 1);
                $scope.mensagem = 'Pessoa ' + pessoa.nome + ' removida com sucesso!';
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível apagar a pessoa ' + pessoa.nome;
            });
        };

        $http.get('/v1/locatarios')
            .success(function(pessoas) {
                $scope.locatarios = pessoas;
            })
            .error(function(erro) {
                console.log(erro);
            });
        
        $http.get('/v1/proprietarios')
            .success(function(pessoas) {
                $scope.proprietarios = pessoas;
            })
            .error(function(erro) {
                console.log(erro);
            });

}]);