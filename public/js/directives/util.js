'use strict';

angular.module('Util')

.directive('menuApp', function() {

    var ddo = {};

    ddo.restrict = "AE";
    ddo.transclude = true;
    ddo.templateUrl = 'js/directives/menu.html';

    return ddo;

});
