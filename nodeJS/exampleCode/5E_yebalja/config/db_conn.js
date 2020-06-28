
var mysql      = require('mysql');
module.exports= mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'yebalja_sc'
});
