/**
 *
 * Created by higor on 16/06/15.
 */

var desafioControllers = angular.module('desafioControllers', []);

desafioControllers.controller('AppCtrl', ['$scope', function($scope) {
    $scope.onClick = function(obj)
    {
        alert('click haha');
    }
}])

