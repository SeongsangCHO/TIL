const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/api/customers', (req, res) => {
    res.send([
            {
              'id' : 1,
              'image' :'https://placeimg.com/64/64/1',
              'name' : 'secho',
              'birthday' : '1125',
              'gender' : 'man',
              'job' : 'TT'
            },
            {
              'id' : 2,
              'image' :'https://placeimg.com/64/64/2',
              'name' : 'who',
              'birthday' : '1225',
              'gender' : 'man',
              'job' : 'TUT'
            },
            {
              'id' : 3,
              'image' :'https://placeimg.com/64/64/3',
              'name' : 'you',
              'birthday' : '0125',
              'gender' : 'girl',
              'job' : 'TOT'
            }
    ]);
});

app.listen(port, ()=> console.log(`Listening on port${port}`));