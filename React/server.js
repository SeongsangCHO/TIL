const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db_config');
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// app.get('/api/customers', (req, res) => {
//     db.query('SELECT * FROM CUSTOMER', function(err, results){
//         if(err)
//             throws(err);
//         res.send(results);
//     });
// });


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});



app.listen(port, ()=> console.log(`Listening on port${port}`));