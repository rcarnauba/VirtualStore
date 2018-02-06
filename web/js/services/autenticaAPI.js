angular.module("lojatotvs").factory("autenticaAPI", function ($http, $rootScope,config,$sessionStorage)
{    
    var autenticaUsuario = {};
    autenticaUsuario.Login = login;
    autenticaUsuario.ConfiguraCredencial = configuraCredencial;
    autenticaUsuario.LimpaDadosCredencial = limpaDadosCredencial;  
    autenticaUsuario.UsuarioLogado = usuarioLogado;  
    return autenticaUsuario;
    
    function login(usuario,callback)
    {
        var response;

        $http.post(config.baseUrlBack + "/usuario/autentica", {email : usuario.email, senha: usuario.senha})
        .then(function(response) 
        {
            if (response.data)
            {
                response = { success: true, message: 'Autenticado com sucesso!'};
            }
            else
                response = { success: false, message: 'Usuário ou senha incorretos!' };

            callback(response);
        })
        .catch(function(response) {
            response = { success: false, message: 'Ocorreu um erro ao chamar o serviço de autenticação!' };
            callback(response);
        })
     
    };

    function configuraCredencial (usuario) 
    {
        $sessionStorage.put('userSession', usuario.email)
    }

    function limpaDadosCredencial() 
    {
        var favourite = $sessionStorage.removeItem('userSession');

        //$rootScope.globals = {};
        //$cookies.remove('globals');
        //$http.defaults.headers.common.Authorization = 'Basic';
    }

    function usuarioLogado()
    {
        return $sessionStorage.get('userSession');
    }

   
});
