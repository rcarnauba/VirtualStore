angular.module("lojatotvs").controller("produtoController", function ($scope,produtoAPI,config,tokenAPI,$timeout)
{
    $scope.app ="Loja virtual";
    $scope.produtos = [];
   
    $scope.cadastraNovoProduto = function (produto){
        produto.imagemproduto = $scope.thumbnail.dataUrl;
        $scope.sucesso = false;
        tokenAPI.geraNovoToken().then(function (response){
            produto.valor = produto.valor.replace(',','.');
            produtoAPI.saveNovoProduto(response.data.token,produto).then(function (res){
                delete $scope.produto;
                $scope.cadastroNovoProdutoForm.$setPristine();
                $scope.message = res.data;
                $scope.sucesso = true;
            },
            function (error){ 
                $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
                $scope.sucesso = false;
            });   
        },
        function (error){ 
            $scope.message = "Ocorreu um erro ao cadastrar um novo produto!";
            $scope.sucesso = false;
        });   
    };

    var carregarProdutos = function(){
      
        tokenAPI.geraNovoToken().then(function (response){
            produtoAPI.getProdutos(response.data.token).then(function (res){
               $scope.produtos = res.data;

               if ($scope.produtos.length <= 0)
               {
                console.log("Entrou")
                $scope.SemItensCadastrados = true;
                $scope.message = "Seja bem vindo, não existem produtos cadastrados Por favor clique no link cadastrar produto!";
  
               }
            },
            function (error){ 
                $scope.message = "Ocorreu um erro ao buscar os produtos!";
            });   
        },
        function (error){ 
            $scope.message = "Ocorreu um erro ao buscar os produtos!" + error;
        });
    };

    var carregarProdutosCarrinho = function (){
        produtoAPI.getProdutosCarrinho().then(function (response){
        $scope.produtosCarrinho = response.data;
        },
        function (error){
            $scope.message = "Ocorreu um erro ao buscar os produtos do carrinho de compras.";
            })
    };
    
    carregarProdutos();  

    $scope.thumbnail = [];
    $scope.fileReaderSupported = window.FileReader != null;

    $scope.photoChanged = function(files) {
        if (files != null) {
        var file = files[0];
        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
            $timeout(function() {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file); 
            fileReader.onload = function(e) {
                $timeout(function() {
                $scope.thumbnail.dataUrl = e.target.result; 
                
                });
            }
            });
        }
        }
    }; 
});