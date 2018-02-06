angular.module("lojatotvs").controller("carrinhoController", function($scope,localStorageService,config,$location,pedidoAPI,tokenAPI,$cookies,usuarioAPI,$filter){
   
    $scope.app ="Loja virtual";
    $scope.carrinho = [];
    $scope.carrinho.quantidadeItemsCarrinho = 0;
    $scope.carrinho.somaItensCarrinho = 0;
    $scope.quantidades = [1,2,3,4,5,6,7,8,9,10];
    $scope.carrinho.totalDesconto = 0;

    $scope.AdicionarCarrinho = function (produto){
        let carrinhoAtual = $scope.listaItensCarrinho();
        
        if (carrinhoAtual == null)
            carrinhoAtual = [];

        let produtoCarrinho = false;
        angular.forEach(carrinhoAtual, function (item, key) 
        {         
            if(item.IdProduto === produto.IdProduto) 
            {
                produtoCarrinho = true;
            }
        });
  
        if (!produtoCarrinho)
        {
            produto.quantidade= 1;     
            carrinhoAtual.push(produto);
            $scope.carrinho =  carrinhoAtual;
            localStorageService.clearAll(config.chaveCarrinho);
            localStorageService.set(config.chaveCarrinho, $scope.carrinho) ;
        }
        carregaCarrinho();
        $location.path('/carrinho');
    };

    $scope.atualizaCarrinho = function (produto,index){
        $scope.removeProdutoCarrinho(index);
        let carrinhoAtualAtualizacao = $scope.listaItensCarrinho();
        carrinhoAtualAtualizacao.push(produto);
        $scope.carrinho =  carrinhoAtualAtualizacao;
        localStorageService.set(config.chaveCarrinho, $scope.carrinho) ;
        carregaCarrinho();
    }

    $scope.removeProdutoCarrinho = function (index){
        $scope.carrinho = $scope.listaItensCarrinho();    
        $scope.carrinho.splice(index, 1);
        localStorageService.clearAll(config.chaveCarrinho);
        localStorageService.set(config.chaveCarrinho, $scope.carrinho);
       
        $scope.carrinho.quantidadeItemsCarrinho = $scope.listaItensCarrinho().length;
        carregaCarrinho();
    };

    $scope.listaItensCarrinho = function (){
        let itemsCarrinho = localStorageService.get(config.chaveCarrinho);
        if (itemsCarrinho == null)
            itemsCarrinho = [];

        return itemsCarrinho;
    };

    $scope.calculaDesconto = function (){

        let valorTotal = $scope.retornaValorTotalCarrinho();
        let valorDesconto30 = (valorTotal * 30) / 100 ; 
        let descontoFatorA = 0;
        let descontoFatorB = 0;
        let descontoFatorC = 0;
        let valorDesconto = 0 ;

        angular.forEach($scope.listaItensCarrinho(), function (item, key) 
        {   
            for (i = 0; i < item.quantidade; i++) { 
               
                switch (item.Fator) {
                    case "A":
                       
                        if (descontoFatorA < 5)
                        {
                            descontoFatorA = descontoFatorA + 1;
                            if ((valorDesconto + (item.Valor * descontoFatorA)/100) < valorDesconto30)
                                valorDesconto += ((item.Valor * descontoFatorA)/100);
                        }
                    break;

                    case "B":
                        if (descontoFatorB < 15)
                        {
                            descontoFatorB = descontoFatorB + 5;
                            if ((valorDesconto + (item.Valor * descontoFatorB)/100) < valorDesconto30)
                                valorDesconto += ((item.Valor * descontoFatorB)/100);   
                        }
                    break;

                    case "C":
                        if (descontoFatorC < 30)
                        {          
                            descontoFatorC = descontoFatorC + 10;
                            if ((valorDesconto + (item.Valor * descontoFatorC)/100) < valorDesconto30)
                                valorDesconto += ((item.Valor * descontoFatorC)/100);                         
                        }
                    break;
                    default:
                     
                    break;
                  }
            
            }
        });

       return valorDesconto;
    }

    $scope.fecharPedido = function (carrinho){

        if ($cookies.get('HASHLOJA') != null)
        {
            $scope.sucesso = false;
            $scope.erro = false;
            tokenAPI.geraNovoToken().then(function (responseToken){
                usuarioAPI.getUsuarioToken(responseToken.data.token,JSON.parse($cookies.get('HASHLOJA')).token).then(function (response){

                    if (response.data.length > 0)
                    {
                        let jsonPedido = {};
                        jsonPedido.Itens = carrinho;                
                        jsonPedido.CodigoUsuario = response.data[0].CodigoUsuario;
                        jsonPedido.ValorTotal = $scope.retornaValorTotalCarrinho();
                        jsonPedido.ValorDesconto = $scope.calculaDesconto();

                        pedidoAPI.inserePedido(responseToken.data.token,JSON.stringify(jsonPedido)).then(function (res){
                            localStorageService.remove(config.chaveCarrinho);
                            $scope.sucesso = true;
                            $scope.message = res.data;
                        },
                        function (error){ 
                            $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
                            $scope.sucesso = false;
                        });
                    }
                    else
                    {
                        $location.path('/login');
                    }
                },
                function (error){ 
                    $scope.message = "Token inválido";
                    $scope.sucesso = false;
                });
            },
            function (error){ 
                $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
                $scope.sucesso = false;
            });  
        }
        else
        {
            $location.path('/login');
        }
        carregaCarrinho();
    };

    $scope.retornaValorTotalCarrinho = function(){

        let total = 0.00;
        angular.forEach($scope.listaItensCarrinho(), function (item) 
        {
            total = total + (item.Valor * item.quantidade);
        });
        return total;
    };

    var carregaCarrinho = function (){
        $scope.carrinho = $scope.listaItensCarrinho();
        $scope.carrinho.quantidadeItemsCarrinho = $scope.listaItensCarrinho().length;      
        $scope.carrinho.totalDesconto= $scope.calculaDesconto();
        $scope.carrinho.somaItensCarrinho =  $scope.retornaValorTotalCarrinho();      
        $scope.carrinho.totalDesconto = $scope.calculaDesconto();
    };

    carregaCarrinho();

});