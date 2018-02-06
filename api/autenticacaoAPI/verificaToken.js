var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');

function verificaToken(req, res, next) {
  var token = req.headers['authorization'];
  if (!token)
    return res.status(404).send({ auth: false, message: 'Token não informado' });
  jwt.verify(token, config.key, function(err, decoded) {
    if (err)
    return res.status(401).send({ auth: false, message: 'Falha ao autenticar o token.' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = verificaToken;
