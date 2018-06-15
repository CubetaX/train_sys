const config = require('../config');
let mysql = require('mysql');
let pool = mysql.createPool(config.database)

let query = function (sql) {
  console.log("sql loading")
  return new Promise(((resolve, reject) => {
    pool.getConnection(function (err,connection) {
      if (err){
        console.log("Sql wrong")
        reject(err);
      }else {
        connection.query(sql,(err,rows) => {
          if (err) reject(err)
          else{
            resolve(rows)
            console.log('sql-done!')
          }
        })
      }
      connection.release();//请求后需要断开连接！！
    }
    )
  }))
}
module.exports = query;
