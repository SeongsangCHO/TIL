const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db_config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/api/customers', (req, res) => {
    db.query('SELECT * FROM CUSTOMER', function(err, results){
        if(err)
            throws(err);
        res.send(results);
    });
});

app.listen(port, ()=> console.log(`Listening on port${port}`));