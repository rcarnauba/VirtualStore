var produto = require('./produto.js');
  
exports.listaProdutos = function (callback,req) {  
    produto.listaProdutos(function(produtoObjsList) 
    {
        return callback(produtoObjsList); 
    },req);
};

exports.insereProduto = function (callback,inserir ){
    produto.insereProduto(
        function(retorno) 
        {
          return callback(retorno);
        },inserir
    );
};






