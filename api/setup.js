var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var token = jwt.sign({ id:1234 }, 'teste123', {
    expiresIn: 86400 // expires in 24 hours
  });

