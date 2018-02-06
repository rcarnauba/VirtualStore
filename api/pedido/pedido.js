var database = require('./../database');
const sqlite3 = require('sqlite3').verbose();
var checkout = require('./checkout.js');

var sys = require('util');//(node:7988) [DEP0025] DeprecationWarning: sys is deprecated. Use util instead.
  
exports.listaPedidos = function (callback,req) {

    let db = new sqlite3.Database(database.dbPath, sqlite3.OPEN_READONLY);
    let sql = `
    SELECT PEDIDO.CODIGOPEDIDO, 
        PEDIDO.VALORTOTAL,
        PEDIDO.VALORDESCONTO,
        PEDIDO.DATACADASTRO,
        ITEMPEDIDO.QUANTIDADE,
        PRODUTO.CODIGOPRODUTO,
        PRODUTO.DESCRICAO
    FROM PEDIDO PEDIDO
        INNER JOIN ITEMPEDIDO ITEMPEDIDO ON ITEMPEDIDO.CODIGOPEDIDO = PEDIDO.CODIGOPEDIDO
        INNER JOIN PRODUTO PRODUTO ON PRODUTO.CODIGOPRODUTO = ITEMPEDIDO.CODIGOPRODUTO
    WHERE PEDIDO.CODIGOUSUARIO = ? 
        AND PEDIDO.CODIGOPEDIDO = ifnull( ? ,PEDIDO.CODIGOPEDIDO )  `;

    db.all(sql, [req.query["usuario"],req.query["numeroPedido"]], (err, rows) => {
    if (err) {
        throw err;
    }
    return callback(rows);
    });

    db.close();
    
};

exports.inserePedido = function (callback,inserir) {
    var codigoPedido = 0;
    let db = new sqlite3.Database(database.dbPath, sqlite3.SQLITE_OPEN_READWRITE);
 
        db.serialize(function() {
            
            db.exec("PRAGMA foreign_keys = ON;");
            db.exec("BEGIN");
            let sqlPedido = `

                INSERT INTO PEDIDO 
                (
                    CODIGOUSUARIO,
                    VALORTOTAL,
                    VALORDESCONTO, 
                    IDPEDIDOPAGAR,
                    DATACADASTRO         
                )
                VALUES 
                (?,?,?,?,strftime('%Y-%m-%d %H:%M:%S'));`;
        
                db.run(sqlPedido, 
                [
                        inserir.CodigoUsuario, 
                        inserir.ValorTotal, 
                        inserir.ValorDesconto, 
                        inserir.idPedidoPagar,
                ], 
                function(err) {
                    if (err) {
                        db.exec("ROLLBACK");
                        callback(`Ocorreu um erro ao inserir o pedido`);
                    }

                    codigoPedido = this.lastID;

                    for (i in inserir.Itens)
                    {
                        let sqlitemPedido = `
                        INSERT INTO ITEMPEDIDO 
                        (
                            CODIGOPEDIDO,
                            CODIGOPRODUTO,
                            QUANTIDADE, 
                            VALOR,
                            DATACADASTRO
                        )
                        VALUES 
                        (?,?,?,?,strftime('%Y-%m-%d %H:%M:%S'));`;
                        
                        db.run(sqlitemPedido, 
                            [
                                codigoPedido, 
                                inserir.Itens[i].CodigoProduto, 
                                inserir.Itens[i].quantidade,              
                                inserir.Itens[i].Valor 
                            ], 
                            function(err) {                            
                                if (err){
                                    db.exec("ROLLBACK");
                                    callback(`Ocorreu um erro ao inserir os itens do pedido`);
                                }
                            }
                        );
                    }
                              
                db.exec("COMMIT");
                db.close();
                callback(`Produto ID :` +codigoPedido + ` Inserido com sucesso. Ref Pagar :` + inserir.idPedidoPagar);  
            });
               
        });
    };
