let express = require('express');
let path = require('path');

const app = express();
const port = process.env.PORT || 80;
//템플릿엔진 ejs 설정 __dirname +'views'랑 같음
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.send("hello World");
});


app.get('/api', (req, res) => { 
  res.render('../views/index', { title: 'api page' });
})
app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

