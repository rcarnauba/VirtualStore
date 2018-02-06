# Desafio FullStack Developer
A Totvs está criando um aplicativo de e-commerce, foi feita uma planning com o Time o qual você é integrante e a Sprint começou. Suas tarefas são as seguintes: 


##### Criação do Login ###
Criar uma página de login/cadastro com o Facebook

##### Criação de Produtos na loja ###
Criar tela com os produtos e endpoints para adicionar e listar os produtos da loja. O produto deve ter os seguintes atributos: Nome, Descrição, Imagem, Valor e Fator. Existem três fatores A, B e C.  
##### Criação do Carrinho de Compras ###
Criar tela do carrinho com as funções de consulta e remoção dos produtos. A consulta do carrinho deve conter além da lista, a quantidade e valor total dos produtos adicionados seguindo a seguinte regra de fator

 - Os produtos de fator A tem um desconto progressivo de 1% a cada item adicionado no carrinho limitado a 5% de desconto. 
 - Os produtos de fator B tem um desconto progressivo de 5% a cada item adicionado no carrinho limitado a 15% de desconto.
 - Os produtos de fator C tem um desconto progressivo de 10% a cada item adicionado no carrinho limitado a 30% de desconto.
 - Um detalhe importante, o total de desconto do carrinho de compras não pode superar 30%.

##### Checkout pagar.me ###
Para finalizar, crie uma tela com o resumo da compra e o botão para fazer o checkout do carrinho através do pagar.me

#### Requisitos:
 - Utilizar o bootstrap 4.0 no desenvolvimento das telas.
 - Utilizar Angular, React ou Ember
 - Utilizar Python, Node JS ou Java.
 - Gestão de dependências via gerenciador de pacotes.
 - Persistir os dados.
 - Descreva no README os passos para execução do seu projeto.
 - Deixe seu repositório público para analise do Pull Request.

#### Ganha mais pontos:
 - Criação testes unitários e instrumentados
 - Garantia da segurança dos dados
 - Criação de uma estrutura de deploy da aplicação
 - Garantia a escalabilidade da aplicação (Pessoas | Infraestrutura)
 - Fique a vontade para adicionar mais features na loja desde que esteja dentro do contexto.

#### Submissão
 - Criar um fork desse projeto e entregar via Pull Request

#### Prazo de Entrega
 - 4 Dias

#### Dados de acesso a api do pagar.me
 - Documentação: https://docs.pagar.me/reference
 - Endpoint para o Checkout: https://api.pagar.me/1/transactions
 - ApiKey: ak_test_Fdo1KyqBTdnTFeLgBhkgRcgm9hwdzd
###Json de Envio:
```js
{
    "amount": 21000,
    "card_number": "4111111111111111",
    "card_cvv": "123",
    "card_expiration_date": "0922",
    "card_holder_name": "João das Neves",
    "customer": {
      "external_id": "#3311",
      "name": "João das Neves Braulio",
      "type": "individual",
      "country": "br",
      "email": "joaodasneves@got.com",
      "documents": [
        {
          "type": "cpf",
          "number": "00000000000"
        }
      ],
      "phone_numbers": ["+5511999998888", "+5511888889999"],
      "birthday": "1965-01-01"
    },
    "billing": {
      "name": "João das Neves",
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "shipping": {
      "name": "Neo Reeves",
      "fee": 1000,
      "delivery_date": "2000-12-21",
      "expedited": true,
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "items": [
   ITEMS_DO_SEU_CARRINHO
    ]
}
```
# Boa Sorte


# Loja Virtual - Por Ricardo Carnauba

Esse projeto tem como objetivo apresentar ao avaliador da vaga de fullstackdeveloper, os conhecimentos técnicos 
do candidado Ricardo Carnauba

# Tecnologias utilizadas

AngularJS + modulos ,Bootstrap, NodeJs + modulos e SQLITE.

# Executando o projeto BackEnd NodeJS

Pasta: api 
Tecnologia:  NodeJS e banco de dados sqlite.

Aqui estão as apis usuário(Cadastro e autenticação), produto (listagem e cadastro), pedido (realiza o check out e comunica com o PagarMe) e autenticação (fornece tokens para autenticar as demais apis.)

Este móduto possui o seu proprio arquivo de gerenciamento de pacotes. package.json

Por favor seguir os passos abaixo para executar o projeto

** Instalar o nodeJS. Versão mais recente. **

1 - ) No prompt de comando, ir até a pasta API
2 - ) Executar o comando npm install. Irá instalar as dependencias do backend.
3 - ) Executar o comando node server.js para iniciar o servidor backend feito em nodeJS

O projeto será executado no no endereço http://localhost:3412/api/{APIS}

#Explicando um pouco do funcionamento das apis BackEnd

Autentica
http://localhost:3412/api/autentica
Ao executar o método post, passando as credenciais abaixo. Api irá fornecer um token de autorização para ser utilizado nas apis de pedido, produto e usuário. Para esse projeto, deixei as credenciais fixas no código, porém em um ambiente de produção seriam colocadas em variaveis de ambiente. 

	"usuario":"UserAPI",
	"senha":"TestForEcho!@#1234"

Usuário 
http://localhost:3412/api/usuario
O token de autorização é colocado na tag authorization dentro de header
Método post cadastra um usuário novo e retorna o seu ID

Método get, mostra um usuário especifico por email

Usuário Autenticação
http://localhost:3412/api/usuario/autentica
Método post recebe o login e senha (criptografada) e se as credenciais estiverem corretas, a api retorna um token de autenticação que é armazenado na sessão do browser e no banco de dados para ser verificado.

Pedido
http://localhost:3412/api/pedido
O token de autorização é colocado na tag authorization dentro de header
Método post cadastra um pedido no banco de dados, faz o checkout no pagarMe e retorna o id do pedido da loja 
e o id do pedido do pagarMe

Produto
http://localhost:3412/api/produto
O token de autorização é colocado na tag authorization dentro de header
Método post cadastra um produto novo e retorna o seu ID

Get lista todos os produto ou um em especial

# Executando o projeto FrontEnd AngularJS

Pasta: web
Tecnologias: AngularJS e bootstrap.
WEB - Frontend Bootstrap + AngularJS

Pré requisitos para executar esse projeto

Servidor web
npm install http-server -g

Após a instalação do servidor web, seguir os passos abaixo:

1 - ) No prompt de comando, ir até a pasta WEB
2 - ) Executar o comando npm install. Irá instalar as dependencias do frontend.
3 - ) Executar o comando http-server. Irá iniciar o servidor web.
4 - ) Acessar o endereço http://localhost:8080 no seu browser.

Na tela inicial, você verá um aviso em vermelho com a mensagem abaixo:

Seja bem vindo, não existem produtos cadastrados Por favor clique no link cadastrar produto! 

Para cadastrar um produto, vá até a barra de navegação e clique na opção Cadastrar produto.

Deverá ser exibida uma tela onde derem ser preenchidos os campos obrigatórios abaixo:

- Nome produto
- Descrição produto
- Fator produto
- Id produto  (Digitar um número correspondente o produto que você está cadastrando. EX: Nome: bola de futebol, ID produto: 789554152)
  Esse número é o código de referencia do produto, não é a chave primária do banco de dados. Caso você cadastre outro produto com o mesmo código, o sistema não irá permitir.
- Valor produto
- Imagem do produto. Clicar em selecionar arquivo e escolher uma imagem de sua preferencia. Essa imagem será armazenada no banco de dados e exibida na tela inicial após o cadastro do produto.

Após preencher todos os campos e clicar em cadastrar produto, a seguinte mensagem será exibida:

Produto ID: XXXX  Inserido com sucesso 

Agora se você voltar para a tela inicial, irá ver o produto cadastrado e a imagem do mesmo.
Cadastre outros para ver o funcionamento melhor da tela.

Para adicionar um produto no carrinho, basta clicar no botão "Adicionar ao carrinho". O sistema irá direcionar para a tela do carrinho de compras e você irá visualizar o item que acabou de selecionar. Nessa tela você irá ver o calculo do desconto baseado na quantidade de itens por fator. Para adicioanr outros itens, basta voltar a tela iniciar e escolher outro produto.

Para fechar o pedido, basta ir ao carrinho de comprar e clicar em comprar. Como é a primeira vez que você provavelmente estará acessando esse sistema, será exibira a tela de login pois não foi encontrada uma sessão válida. Clique no link para cadastrar o seu usuário. Na tela de cadastro de usuários, todos os campos são obrigatórios, sendo que se o email escolhido já estiver sendo usado o sistema irá exibir uma mensagem.

Caso o cadastro ocorra com sucesso, você será enviado de volta para a tela de login. Entre com as credenciais que você acabou de criar e se as mesmas estiverem corretas, você será direcionado para a tela do carrinho de compras novamente. Repare que o seu nome deve aparecer no banco superior direito junto ao icone do carrinho de compras.

Na tela do carrinho de comprar e devidamente autenticado, basta clicar em comprar. O sistema irá invocar as devidas funções e apis para fazer o checkout do seu produto e se tudo correr bem, você irá ver uma mensagem indicando que o pedido foi emitido com sucesso e foi gerado o número do pedido do sistema e o número da autorização do Pagarme.


# Escalabilidade.

Escalabilidade para mim é um assunto extenso e complexo.

A plataforma NodeJS foi escolhida pela sua natureza de i/o por evento não bloqueante não criando uma thread para cada conexão de usuário. Como se trata de uma loja virtual, o número de conexões pode bem intensa e essa caracterista de não criar uma thread para cada conexão passa a ser interessante em termos de consumo de hardware. O NodeJs vai muito bem quando as requisições são rápidas sem muito uso de CPU, que é o caso de uma loja virtual/ecommerce.

Não vou abordar aqui se vamos precisar de x servidores para front-end e x para backend com y de processador e Z de memória, acho que não é isso que vocês querem ouvir.

Podemos dividir em duas partes essa questão de arquitetura.

1 - ) Dar prioridade colocando servidores e um balanceador de carga para atender as solicitações de busca e e pesquisa de produtos na loja. Ao meu ver, em todo ecommerce, existem muito mais pesquisas do que pedidos e responder rápido a essas pesquisas é essencial.

Fiz o projeto com sqlite que é um banco de dados bem limitado somente para efeitos de demonstração da aplicação. Para ganharmos escalabilidade, podemos partir para algo mais potente como SQL Azure ou Oracle Rac e também colocar o banco de dados com balanceamento de carga.

Existe a opção de usar o cache do oracle ou do SQL para trazer a busca dos produtos muito mais rápida. Esse cache pode ser atualizado de tempos em tempos de acordo com a frequencia que a compania altera o preço dos produto ou se o produto se esgota no estoque.

Também é possivel utilizar um storage SSD

O NodeJs nos permite aumentar a quantidade de threads que processa os eventos dentro do seu theardPool na sua variavel de ambiente.


2 - ) Checkout do pedido e verificação de preço e estoque

No momento do fechamento do pedido, o sistema deve consultar a base de dados para checar o preço e o estoque do produto escolhido.

Podemos aqui ter uma outra estrutura de infra de servidores, não precisando usar cache e muitos balanceadores de cargas. Algumas estatisticar conseguem estimar quantas buscas temos no eccomerce para cada pedido fechado, isso pode ajudar a definir a arquitetura.


Todos os itens acima são baseados nas experiências que tive. Devem ser definidos e estudados em conjunto com o time de arquitetura de sistema e infra estrutura. 

As areas do comercial,vendas e marketing devem ser envolvidas também pois são eles que normalmente criam e divulgam promoções e estrategias para vender determinados produtos em determinadas épocas.














