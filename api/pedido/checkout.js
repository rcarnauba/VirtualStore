var https = require('https');

exports.checkOut = function (callback,reqItens) {
    
var json = `{"api_key":"ak_test_Fdo1KyqBTdnTFeLgBhkgRcgm9hwdzd","amount":21000,"card_number":"4111111111111111","card_cvv":"123","card_expiration_date":"0922","card_holder_name":"Morpheus Fishburne","customer":{"external_id":"#3311","name":"Morpheus Fishburne","type":"individual","country":"br","email":"mopheus@nabucodonozor.com","documents":[{"type":"cpf","number":"00000000000"}],"phone_numbers":["+5511999998888","+5511888889999"],"birthday":"1965-01-01"},"billing":{"name":"Trinity Moss","address":{"country":"br","state":"sp","city":"Cotia","neighborhood":"Rio Cotia","street":"Rua Matrix","street_number":"9999","zipcode":"06714360"}},"shipping":{"name":"Neo Reeves","fee":1000,"delivery_date":"2000-12-21","expedited":true,"address":{"country":"br","state":"sp","city":"Cotia","neighborhood":"Rio Cotia","street":"Rua Matrix","street_number":"9999","zipcode":"06714360"}}}`;
var arrayItens = [];
var obj = {};

for (item in reqItens.Itens)
{
    obj = {};

    obj["id"] = reqItens.Itens[item].IdProduto.toString();
    obj["title"] = reqItens.Itens[item].NomeProduto;
    obj["unit_price"] = parseInt(reqItens.Itens[item].Valor);
    obj["quantity"] = parseInt(reqItens.Itens[item].quantidade);
    obj["tangible"] = true;

    arrayItens.push(obj);
}

var jsonObj = JSON.parse(json);
jsonObj.items = arrayItens;

var header = { 
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(jsonObj))};

var config = {
    host : 'api.pagar.me',
    port : 443,
    path : '/1/transactions',
    method : 'POST',
    headers : header
};

const req = https.request(config, (res) => {

    var statusCode = res.statusCode;
    res.setEncoding('utf8'); 
     res.on('data', (res) => {
        if (statusCode === 200)
        {
            return callback({status:true, statusCode: statusCode, idPedidoPagar: JSON.parse(res).id, mensagem: "Operação efetuada com sucesso!"});
        }
        else
            return callback({status:false, statusCode: statusCode, idPedidoPagar: 0, mensagem: "Ocorreu um erro ao processar seu pedido"});
     }); 
   });
  
  req.on('error', (e) => {
    return callback({status:false, statusCode: statusCode, idPedidoPagar: 0, mensagem: e.message});
  });

  req.write(JSON.stringify(jsonObj));
  req.end();   

} 