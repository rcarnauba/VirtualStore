angular.module("lojatotvs").factory("pedidoAPI", function ($http,config)
{   
    var _inserePedido = function (token,carrinho){      
        return $http.post(config.baseUrlBack+ "/api/pedido", carrinho, {headers: { 'Authorization': token}, data:{carrinho}});
    };

    return {
        inserePedido : _inserePedido
    };
});