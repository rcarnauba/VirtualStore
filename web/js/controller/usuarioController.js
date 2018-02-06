angular.module("lojatotvs").controller("usuarioController", function($scope,usuarioAPI,$location,tokenAPI,$cookies)
{
    $scope.app ="Loja virtual";
    
    $scope.login = function (usuario){
        $scope.sucesso = false;
        $scope.erro = false;

        tokenAPI.geraNovoToken().then(function (response){

            usuarioAPI.getUsuarioEmail(response.data.token,usuario.email).then(function (res){

                if (res.data.length == 1)
                {
                    usuario.senha = CryptoJS.MD5(usuario.senha).toString();
                    usuarioAPI.login(response.data.token,usuario).then(function (res){
                        if (res.data.status)
                        {
                            var dataExpiracao = new Date();
                            dataExpiracao.setDate(dataExpiracao.getDate() + 1);                          
                            $cookies.putObject('HASHLOJA', res.data, {'expires': dataExpiracao });
                            $location.path("/carrinho");
                        }
                        else
                        {
                            $scope.message = "Usuário ou senha incorreto(s)!";
                            $scope.erro = true;
                        }                       
                    },
                    function (error){ 
                        $scope.message = "Ocorreu um erro ao autenticar o usuário!";
                        $scope.erro = true;
                    }); 
                }
                else{
                    $scope.message = "Usuário não encontrado, por favor faça o seu cadastro!";
                    $scope.erro = true;
                }
            },
            function (error){ 
                $scope.message = "Ocorreu um erro ao autenticar o usuário!";
                $scope.erro = true;
            });    

               
            },
        function (error){ 
            $scope.message = "Ocorreu um erro ao autenticar o usuário!";
            $scope.erro = true;
        });  
    };


    $scope.logoff = function (){
        $cookies.remove('HASHLOJA');
    };

    
});