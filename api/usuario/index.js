var usuario = require('./usuario.js');

exports.listaUsuarios = function (callback,req) {  
    usuario.listaUsuarios(function(usuarioObjsList) 
    {
        return callback(usuarioObjsList); 
    },req);
};  

exports.insereUsuario = function (callback,inserir ){
    usuario.insereUsuario(
        function(retorno) 
        {
          return callback(retorno);
        },inserir
    );
};

exports.autenticaUsuario = function (callback,req) {  
    usuario.autenticaUsuario(function(usuarioObjsList) 
    {
        return callback(usuarioObjsList); 
    },req);
};