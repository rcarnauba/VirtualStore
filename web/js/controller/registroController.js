angular.module("lojatotvs").controller("registroController", function($scope,usuarioAPI,$location,tokenAPI)
{
    $scope.app ="Loja virtual";
    $scope.usuario;

    $scope.registraUsuario = function (usuario){
        $scope.sucesso = false;
        $scope.erro = false;

        tokenAPI.geraNovoToken().then(function (response){

            usuarioAPI.getUsuarioEmail(response.data.token,usuario.email).then(function (res){

                if (res.data.length == 0)
                {
                    usuario.senha = CryptoJS.MD5(usuario.senha).toString();
                    usuarioAPI.saveNovoUsuario(response.data.token,usuario).then(function (res){
                        $scope.message = res.data;
                        $scope.sucesso = true;
                        delete $scope.usuario;
                        $scope.cadastroNovoUsuarioForm.$setPristine(); 
                        $location.path("/login");
                    },
                    function (error){ 
                        $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
                        $scope.erro = true;
                    }); 
                }
                else{
                    $scope.message = "Email já utilizado cadastro, por favor escolha outro!";
                    $scope.erro = true;
                }
            },
            function (error){ 
                $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
                $scope.erro = true;
            });    

               
            },
        function (error){ 
            $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
            $scope.erro = true;
        });  
    };
});