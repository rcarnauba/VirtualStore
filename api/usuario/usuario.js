var database = require('./../database');
const sqlite3 = require('sqlite3').verbose();
var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');

  exports.listaUsuarios = function (callback,req) {
    
     let db = new sqlite3.Database(database.dbPath, sqlite3.OPEN_READONLY);
     let sql = `
        SELECT 
            CODIGOUSUARIO,
            NOMEUSUARIO,
            CPF,
            ENDERECO,
            DATACADASTRO,
            EMAIL,
            TOKEN
        FROM USUARIO
        WHERE EMAIL = ifnull( ? ,EMAIL) 
        AND  CPF = ifnull( ? ,CPF)
        AND  TOKEN = ifnull( ? ,TOKEN)`;      
   
        db.all(sql, [req.query["email"],req.query["cpf"],req.query["token"]], (err, rows) =>
        {
          if (err) {
            throw err;
        }
            
        return callback(rows);
     });
  
     db.close();
     
  };

  exports.insereUsuario = function (callback,inserir) {
       let db = new sqlite3.Database(database.dbPath, sqlite3.SQLITE_OPEN_READWRITE);
       let sql = `
            INSERT INTO USUARIO 
            (
                NOMEUSUARIO,
                CPF,
                ENDERECO,
                EMAIL,
                SENHA,
                DATACADASTRO
            )
            VALUES 
            (?,?,?,?,?,strftime('%Y-%m-%d %H:%M:%S'));`;
    
            db.run(sql, 
              [
                inserir.body["nome"], 
                inserir.body["cpf"], 
                inserir.body["endereco"],
                inserir.body["email"],
                inserir.body["senha"]
              ], 
              function(err) {
                if (err) {
                  callback(`Erro ao inserir usuário` + err);
              }
    
              callback(`Usuário ID: ${this.lastID}`+ ` Inserido com sucesso`);
            });
    
       db.close();
       
  };

  exports.autenticaUsuario = function (callback,req) {
    
         let db = new sqlite3.Database(database.dbPath, sqlite3.OPEN_READONLY);
         let sql = `
            SELECT 
                CODIGOUSUARIO,
                NOMEUSUARIO,
                CPF,
                DATACADASTRO,
                EMAIL
            FROM USUARIO
            WHERE EMAIL =  ? 
            AND SENHA = ? 
            `;      

            db.get(sql, [req.body.email,req.body.senha], (err, row) =>
            {
              if (err) {
                return callback({status: false, token: "", mensagem: err});
              }
    
            if (row != null){
                var token = jwt.sign({ id: row["CodigoUsuario"] }, config.key, {
                  expiresIn: 86400 
                });
                 AtualizaUsuarioToken(token,row["CodigoUsuario"] );
                  return callback({status: true, token: token, usuario: row["NomeUsuario"] , mensagem: "Usuário autenticado. Token gerado, válido por 24 horas"});
            }
            else{
              return callback({status: false, token: "", usuario: "", mensagem: "Usuário não autenticado, por favor checar as credenciais novamente. Token não gerado!"});
            }
         });
      
         db.close();
         
      };

      function AtualizaUsuarioToken (token, codigousuario) {
        
        let db = new sqlite3.Database(database.dbPath, sqlite3.SQLITE_OPEN_READWRITE);
        let sql = `
            UPDATE USUARIO SET TOKEN = ? WHERE CODIGOUSUARIO = ? `;
              db.run(sql, 
               [token,codigousuario]
             );
        db.close();
        
      }