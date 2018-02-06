var pedido = require('./pedido.js');
var checkout = require('./checkout.js');

exports.listaPedidos = function (callback,req) {  
 pedido.listaPedidos(function(pedidoObjsList) 
  {
      return callback(pedidoObjsList); 
  },req);
};

exports.inserePedido = function (callback,inserir ){
  checkout.checkOut(function(retorno) 
  {
    if(retorno.status)
    {
      inserir.idPedidoPagar = retorno.idPedidoPagar;

      pedido.inserePedido(function(retorno) 
      {
          return callback(retorno);
      },inserir);
    }
    else{
    } 
  },inserir);
};
