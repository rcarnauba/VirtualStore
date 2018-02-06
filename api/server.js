var express = require('express');
var produto = require('./produto');
var autenticacao = require('./autenticacaoAPI');
var pedido = require('./pedido');
var usuario = require('./usuario');
var app = express();
var bodyParser = require('body-parser');
const querystring = require('querystring');
var VerificaToken = require('./autenticacaoAPI/verificaToken.js');


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3412);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });


app.get("/api/produto",VerificaToken, (req, res) => {
  produto.listaProdutos(function(produtoObjsList) 
  {
    res.json(produtoObjsList);
  },req);
});

app.post("/api/produto",VerificaToken, function(req, res) {
  produto.insereProduto(function (retorno)
  {
    res.json(retorno);
  },req)
 
});

app.post("/api/autentica", function(req, res) {
  autenticacao.autenticaUsuarioAPI(function (retorno)
  {
    if (retorno["status"]){
      res.status(200).send(retorno);}
    else{
      res.status(401).send(retorno);}
  },req)
 
});

app.get("/api/autentica",VerificaToken,(req, res) => {
  autenticacao.listaUsuariosAPIByid(function(usuarioObjsList) 
  {
    res.json(usuarioObjsList);
  },req);
});

app.get("/api/usuario",VerificaToken, (req, res) => {
  usuario.listaUsuarios(function(usuarioObjsList) 
  {
    res.json(usuarioObjsList);
  },req);
});

app.post("/api/usuario", VerificaToken,function(req, res) {
  usuario.insereUsuario(function (retorno)
  {
    res.json(retorno);
  },req)
 
});

app.post("/api/usuario/autentica",VerificaToken, function(req, res) {
  usuario.autenticaUsuario(function (retorno)
  {
    res.json(retorno);
  },req)
});

app.get("/api/pedido",VerificaToken, (req, res) => {
  pedido.listaPedidos(function(pedidoObjsList) 
  {
    res.json(pedidoObjsList);
  },req);
});

app.post("/api/pedido", VerificaToken,function(req, res) {
  pedido.inserePedido(function (retorno)
  {
    res.json(retorno);
  },req.body)
 
});

console.log('API iniciada ');
