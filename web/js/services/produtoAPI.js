angular.module("lojatotvs").factory("produtoAPI", function ($http,config)
{
    var _getProdutos = function (token){
        return $http.get(config.baseUrlBack + "/api/produto", {headers: { 'Authorization': token}});
    };

    var _getProduto = function (id){
        return $http.get(config.baseUrlBack + "/api/produto?id=" + id);
    }

     var _saveCarrinho = function (produto){
        return $http.post(config.baseUrlBack+ "/api/produto", produto);
    }; 

    var _getProdutosCarrinho = function (){
        return $http.get(config.baseUrlBack + "/api/produto");
    };

    var _saveNovoProduto = function (token,produto){
        return $http.post(config.baseUrlBack+ "/api/produto", produto, {headers: { 'Authorization': token}, data:{produto}});
    };

    return {
        getProdutosCarrinho : _getProdutosCarrinho,
        getProdutos:_getProdutos,
        getProduto: _getProduto,
        saveCarrinho: _saveCarrinho,
        saveNovoProduto:_saveNovoProduto
    };
});