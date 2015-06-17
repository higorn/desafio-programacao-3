/**
 *
 * Created by higor on 16/06/15.
 */

var desafioControllers = angular.module('desafioControllers', []);

desafioControllers.controller('AppCtrl', ['$scope', function($scope) {
    $scope.users = [{'nome': 'Nicanor'}, {'nome': 'Lauterio'}, {'nome': 'Faca'}];
    $scope.user = {};
    console.log('coco');
    $scope.onClick = function(obj)
    {
        $scope.users.push({
            'nome': $scope.user.nome,
            'sobrenome': $scope.user.sobrenome,
            'email': $scope.user.email,
            'cpf': $scope.user.cpf,
            'telfone': $scope.user.telefone,
            'foto': $scope.user.foto
        });
    }
}])

