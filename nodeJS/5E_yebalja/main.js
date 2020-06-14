const express = require('express');
const app = express();
const port = 3000;


app.get('/', function (req, res) {
    res.send('Yebalja');
});

app.listen(port, function () {
    console.log(`listening ${port}`);
})