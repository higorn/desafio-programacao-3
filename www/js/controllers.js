/**
 *
 * Created by higor on 16/06/15.
 */

var desafioControllers = angular.module('desafioControllers', []);

desafioControllers.controller('AppCtrl', ['$scope', function($scope) {
    $scope.users = [{'nome': {'val': 'Nicanor'}}, {'nome': {'val': 'Lauterio'}}, {'nome': {'val': 'Faca'}}];

    ($scope.reset = function()
    {
        $scope.user = {
            'nome': {'val': ''},
            'sobrenome': {'val': ''},
            'email': {'val': ''},
            'cpf': {'val': ''},
            'telefone': {'val': ''},
            'foto': {'val': ''}
        };
    })();

    var validateAll = function()
    {
        var ret = true;
        var retSv = true;
        $.each($scope.user, function(key, fld) {
            console.log('key: '+key+' val: '+fld.val);
            if (key != 'foto')
            {
                ret = isValid(key);
                if (!ret)
                    retSv = ret;
            }
        });
        return retSv;
    }

    var isValid = function(id)
    {
        var ret = true;
        var obj = document.getElementById(id);
        if (obj.checkValidity() == false)
        {
            $('#'+id).addClass('error-msg');
            console.log('id: '+id);
            $scope.user[id] = {'error': obj.validationMessage};
            if (obj.validity.typeMismatch && id == 'email')
                $scope.user[id] = {'error': 'E-mail inválido'};
            if (obj.validity.patternMismatch && id == 'cpf')
                $scope.user[id] = {'error': 'Mínimo 11 dígitos'};
            ret = false;
        }
        else
        {
            $('#'+id).removeClass('error-msg');
            delete $scope.user[id]['error'];
        }
        console.log('ret: '+ret);
        return ret;
    }

    $scope.validate = function(event)
    {
        var id = event.target.attributes.id.value;
        isValid(id);
    }

    $scope.add = function()
    {
        if (form.nome.$dirty && form.nome.$invalid)
        {
            console.log('coco');
            return;
        }

        if (!validateAll())
            return;


        $scope.users.push($scope.user);
        $scope.reset();
    }

    $scope.del = function(user)
    {
        console.log('deleting: '+$scope.users.indexOf(user));
        $scope.users.splice($scope.users.indexOf(user), 1);
        delete $scope.users[user];
    }

    $scope.dialogs = {};
    $scope.show = function(dlg, user)
    {
        $scope.user = user;
        if (!$scope.dialogs[dlg])
        {
        console.log('user: '+$scope.user.nome+' dlg: '+dlg);
            ons.createDialog(dlg).then(function(dialog) {
                $scope.dialogs[dlg] = dialog;
                dialog.show();
            });
        }
        else
        {
            $scope.dialogs[dlg].show();
        }
    }

    $scope.takePic = function()
    {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 10,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    var onSuccess = function(imageData)
    {
        //$scope.user.foto.val = "data:image/jpeg;base64,"+imageData;
        $scope.user.foto.val = "data:image/jpeg;base64,"+imageData;
    }

    var onFail = function(message)
    {
        alert('Falha ao tirar foto: '+message);
    }

}])

