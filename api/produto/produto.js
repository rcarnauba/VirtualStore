var database = require('./../database');
const sqlite3 = require('sqlite3').verbose();

exports.listaProdutos = function (callback,req) {
  
   let db = new sqlite3.Database(database.dbPath, sqlite3.OPEN_READONLY);
   let sql = `
      SELECT 
        CODIGOPRODUTO,
        IDPRODUTO,
        NOMEPRODUTO,
        DESCRICAO,
        VALOR,
        FATOR,
        DATACADASTRO,
        IMAGEMPRODUTO
      FROM PRODUTO 
      WHERE IDPRODUTO = ifnull( ? , IDPRODUTO) `;

      db.all(sql,[req.query["id"]], (err, rows) => {
      if (err) {
        throw err;
      }
      return callback(rows);
   });

   db.close();
   
};

exports.insereProduto = function (callback,inserir) {


   let db = new sqlite3.Database(database.dbPath, sqlite3.SQLITE_OPEN_READWRITE);
   let sql = `
        INSERT INTO PRODUTO
        (
          IDPRODUTO,
          NOMEPRODUTO,
          DESCRICAO,
          VALOR,
          FATOR,
          IMAGEMPRODUTO,
          DATACADASTRO      
        )
        VALUES 
        (?,?,?,?,?,?,strftime('%Y-%m-%d %H:%M:%S'));`;

        db.run(sql, 
          [
            inserir.body["idproduto"], 
            inserir.body["nome"], 
            inserir.body["descricao"], 
            inserir.body["valor"], 
            inserir.body["fator"],
            inserir.body["imagemproduto"]
            
          ], 
          function(err) {
            if (err) {
               callback(`Erro ao inserir produto` + err);
          }

          callback(`Produto ID: ${this.lastID}`+ ` Inserido com sucesso`);
        });

   db.close();
   
};

