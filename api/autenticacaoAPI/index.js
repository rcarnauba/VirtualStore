
var usuarioAPI = require('./usuarioAPI.js');

exports.autenticaUsuarioAPI = function (callback,req) {  
    usuarioAPI.autenticaUsuarioAPI(function(usuarioAPIObjsList) 
    {
        return callback(usuarioAPIObjsList); 
    },req);
};




