var database = require('./../database');
const sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');
var verificaToken = require('./verificaToken.js');

  exports.autenticaUsuarioAPI = function (callback,req) {

     let db = new sqlite3.Database(database.dbPath, sqlite3.OPEN_READONLY);
     let sql = `
        SELECT 
            CODIGOUSUARIOAPI,
            NOME,
            USUARIO,
            ATIVO,
            DATACADASTRO,
            SENHA
        FROM USUARIOAPI
        WHERE USUARIO =  ?  
        `;      
        db.get(sql, [req.body.usuario], (err, row) =>
        {
          if (err) {
            return callback({status: false, token: "", mensagem: err});
        }

        if (row != null){
          if (bcrypt.compareSync(req.body.senha, row["Senha"]))
          {
            var token = jwt.sign({ id: row["codigousuarioapi"] }, config.key, {
              expiresIn: 86400 
            });
              return callback({status: true, token: token, mensagem: "Usuário autenticado. Token gerado, válido por 24 horas"});
          }
          else{
            return callback({status: false, token: "", mensagem: "Usuário não autenticado, por favor checar as credenciais novamente. Token não gerado!"});
          }
        }
        else{
          return callback({status: false, token: "", mensagem: "Usuário não autenticado, por favor checar as credenciais novamente. Token não gerado!"});
        }
     });
  
     db.close();
     
  };

 exports.insereUsuarioAPI = function (callback,inserir) {
       var password = bcrypt.hashSync(inserir["Senha"], 8);
       let db = new sqlite3.Database(database.dbPath, sqlite3.SQLITE_OPEN_READWRITE);
       let sql = `
            INSERT INTO USUARIOAPI 
            (
                NOME,
                USUARIO,
                SENHA,
                ATIVO,
                DATACADASTRO
            )
            VALUES 
            (?,?,?,?,strftime('%Y-%m-%d %H:%M:%S'));`;
    
            db.run(sql, 
              [
                inserir["Nome"], 
                inserir["Usuario"], 
                password,
                "1"
              ], 
              function(err) {
                if (err) {
                  return console.log(err.message);
              }
    
              callback(`Linha inserida com sucesso:  ${this.lastID}`);
            });
    
       db.close();
       
};