angular.module("lojatotvs").config(function ($routeProvider,$locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'view/produtosLoja.html',
            controller : 'produtoController'
        });
        
        $routeProvider.when('/loja', {
            templateUrl: 'view/produtosLoja.html',
            controller : 'produtoController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'view/login.html',
            controller: "usuarioController"
        });

        $routeProvider.when('/novousuario', {
            templateUrl: 'view/novousuario.html',
            controller: "registroController"
        });

        $routeProvider.when('/cadastroproduto', {
            templateUrl: 'view/novoproduto.html',
            controller: "produtoController"
        });

        $routeProvider.when('/carrinho', {
            templateUrl: 'view/carrinho.html',
            controller : 'carrinhoController'
        });

        $routeProvider.when('/resumoPedido', {
            templateUrl: 'view/resumoPedido.html',
            controller : 'pedidoController'
        });

        $routeProvider.when('/fecharPedido', {
            templateUrl: 'view/fecharPedido.html',
            controller : 'pedidoController'
        });

        $locationProvider.html5Mode(true);
});