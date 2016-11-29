'use strict';

angular.module('Util')

.directive('menuApp', function() {

    var ddo = {};

    ddo.restrict = "AE";
    ddo.transclude = true;
    ddo.templateUrl = 'js/directives/menu.html';

    return ddo;

})

.directive('minDate', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {
            
            var minDate = scope.$eval(attrs.minDate) || new Date(new Date().setHours(0, 0, 0, 0));
            
            ngModelController.$validators.minDate = function(value) {
                return value >= minDate;
            };
        }
    };
});
