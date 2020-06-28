
var mysql      = require('mysql');
module.exports= mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'nodejs'
});

// connection.connect();

// connection.query('SELECT * FROM my_table', function(err, results, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });

// connection.end();
