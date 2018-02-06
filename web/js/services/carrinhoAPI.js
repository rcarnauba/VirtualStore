angular.module("lojatotvs").factory("carrinhoAPI", function ($http,config,localStorageService)
{   
    var _getCarrinho = function(){
        return localStorageService.get(config.chaveCarrinho);
    };

    return {
        getCarrinho : _getCarrinho
    };
});


