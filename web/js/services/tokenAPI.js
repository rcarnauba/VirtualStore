angular.module("lojatotvs").factory("tokenAPI", function ($http,config)
{ 
    var _geraNovoToken = function (){
       return $http.post(config.baseUrlBack+ "/api/autentica",{usuario: "UserAPI", senha:"TestForEcho!@#1234"});
    }

    return {
        geraNovoToken : _geraNovoToken
    };
});
