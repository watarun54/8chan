var mysql = require("mysql");
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'mysql',
  user: 'root',
  password: 'wataru0224',
  database: '8chan',
});
exports.pool = pool;
