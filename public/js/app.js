'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Util', []);
angular.module('Pessoa', []);
angular.module('Imovel', []);
angular.module('Reserva', []);

angular.module('appReservas', [
    'Authentication',
    'Home',
    'Util',
    'Pessoa',
    'Imovel',
    'Reserva',
    'ngRoute',
    'ngCookies',
    'ui.utils.masks'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
	$locationProvider.html5Mode(true);

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html'
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
    
        //Pessoas
        .when('/pessoas', {
            controller: 'PessoaListController',
            templateUrl: 'views/pessoa-list.html'
        })
        .when('/pessoas/new', {
            controller: 'PessoaController',
            templateUrl: 'views/pessoa-edit.html'
        })
        .when('/pessoas/edit/:pessoaId', {
            controller: 'PessoaController',
            templateUrl: 'views/pessoa-edit.html'
        })
    
        //Imoveis
        .when('/imoveis', {
            controller: 'ImovelListController',
            templateUrl: 'views/imovel-list.html'
        })
        .when('/imoveis/new', {
            controller: 'ImovelController',
            templateUrl: 'views/imovel-edit.html'
        })
        .when('/imoveis/edit/:imovelId', {
            controller: 'ImovelController',
            templateUrl: 'views/imovel-edit.html'
        })
    
        //Reservas
        .when('/reservas', {
            controller: 'ReservaListController',
            templateUrl: 'views/reserva-list.html'
        })
        .when('/reservas/new', {
            controller: 'ReservaController',
            templateUrl: 'views/reserva-edit.html'
        })
        .when('/reservas/edit/:reservaId', {
            controller: 'ReservaController',
            templateUrl: 'views/reserva-edit.html'
        })
    
        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
}]);
