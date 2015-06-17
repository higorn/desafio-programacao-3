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
            /*
            if ((!fld.val || fld.val == '') && key != 'foto')
            {
                $('#'+key).addClass('error-msg');
                $scope.user[key] = {'error': 'O campo '+key+' é requerido'};
                ret = false;
            }
            */
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

    $scope.validate = function(obj, event)
    {
        var fieldName = event.target.attributes.name.value;
        var id = event.target.attributes.id.value;
        isValid(id);

/*
        var inpObj = document.getElementById(id);
        console.log('obj: '+fieldName);
        if (inpObj.checkValidity() == false)
        {
            $scope.user[fieldName] = {'error': inpObj.validationMessage};
        }
        else
        {
            $('#'+fieldName).removeClass('error-msg');
            delete $scope.user[fieldName]['error'];
        }

        if (obj.$dirty && obj.$invalid)
        {
            console.log('invalid: '+fieldName);
            //$scope.user[fieldName] = {'error': 'Campo obrigatório'};
            if (obj.$error.required)
                $scope.user[fieldName] = {'error': 'Campo obrigatório'};
            else if (obj.$error.email)
                $scope.user[fieldName] = {'error': 'E-mail inválido'};
            else if (obj.$error.pattern && fieldName == 'cpf')
                $scope.user[fieldName] = {'error': 'CPF deve conter 11 digitos'};
            else
                $scope.user[fieldName] = {'error': obj.$error};
        }
        else
        {
            $('#'+fieldName).removeClass('error-msg');
            delete $scope.user[fieldName]['error'];
        }
*/

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
            quality: 25,
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

