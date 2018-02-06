angular.module("lojatotvs").controller("navBarController", function($scope,localStorageService,config, usuarioAPI,tokenAPI,$cookies){    

    $scope.$on('$locationChangeStart', function(event) {
        atualizaCarrinho();
        usuarioLogado();
    });

    function atualizaCarrinho() {
        if (localStorageService.get(config.chaveCarrinho)!= null)
            $scope.itensCarrinho = localStorageService.get(config.chaveCarrinho).length;
        else
            $scope.itensCarrinho = 0;
    }

    function usuarioLogado()
    {
        if ($cookies.get('HASHLOJA') != null)
            {
                $scope.logado = true;
                $scope.usuario ="Olá , " + JSON.parse($cookies.get('HASHLOJA')).usuario;
            }
        else
        {
            $scope.logado = false;
            $scope.usuario = "Faça seu login!";
        }
    };

    $scope.logoff = function ()
    {
        $cookies.remove('HASHLOJA');
        $scope.logado = false;
        $scope.usuario = "Faça seu login!";
    };

});