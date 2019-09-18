const mysql = require('mysql');

const mysqlConnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tinashewasmolly@LOVE1',
  database: 'afroorig_db',
  multipleStatements: true
});

mysqlConnect.connect(err => {
  if (!err) console.log('DB connection succeeded');
  else console.log('Connection Failed' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnect;
