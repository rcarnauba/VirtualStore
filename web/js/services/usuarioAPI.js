angular.module("lojatotvs").factory("usuarioAPI", function ($http,config)
{
    var _saveNovoUsuario = function (token,usuario){
        return $http.post(config.baseUrlBack+ "/api/usuario", usuario, {headers: { 'Authorization': token}, data:{usuario}});
    };

    var _getUsuarioEmail = function (token,email){
        return $http.get(config.baseUrlBack + "/api/usuario?email=" + email, {headers: { 'Authorization': token}});
    };

    var _getUsuarioToken = function (token,tokenUsuario){
        return $http.get(config.baseUrlBack + "/api/usuario?token=" + tokenUsuario, {headers: { 'Authorization': token}});
    };

    var _login = function (token,usuario){   
        return $http.post(config.baseUrlBack+ "/api/usuario/autentica", usuario, {headers: { 'Authorization': token}, data:{usuario}});
    };

    return {
        saveNovoUsuario:_saveNovoUsuario,
        getUsuarioEmail: _getUsuarioEmail,
        getUsuarioToken: _getUsuarioToken,
        login:_login
    };
});