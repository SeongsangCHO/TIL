## node.js #03 express



### 1 .익스프레스

HTTP, Connect 컴포넌트를 기반으로하는 웹 프레임워크입니다.

<br>

#### 1-1 익스프레스 설치

<br>

```
npm install express --save
```

로컬에 익스프레스 모듈을 설치합니다.

<br>

#### 1-2 예제 코드

설치가 완료되면 expressjs의 hello world를 작성해봅니다.

해당 코드내의 app.get은 라우팅을 뜻합니다.

```javascript
app.get('/', (req, res) => res.send('Hello World!')) // '/'경로에서 hello world! 출력

app.get('/page', (req, res) => res.send('page')) // '/page'경로에서 page 출력
```

get메소드의 첫번째 인자인 '/'은 해당 URL에 따라 라우팅을 진행합니다.



<br>

```javascript
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

```

listen이 실행될 때 3000번 포트에 listen을 하게되고, listen이 성공하면, 뒤의 function을 수행하게 됩니다.



### 2. 홈페이지 구현

<br>

##### 쿼리스트링대신 순수 스트링(path방식)으로 파일을 읽어오기(라우팅)

라우트 파라미터 사용

app.get메소드의 path를 다음과 같이 지정하면 콜백함수의 response request인자의 params 객체 안에 매핑이 되는 것을 확인할 수 있습니다.

```javascript
app.get('/page/:pageId', function(request,response){
  response.send(request.params);
});
// /page/hello로 호출했을 때,
{"pageId":"hello"}
```

pageId에는 hello의 값이 매핑되고, 여러개도 사용 가능합니다.



### 3. 미들웨어

요청과 응답 중간에 껴서 어떤 동작을 해주는 프로그램.

<br>



#### 3.0 미들웨어 실행순서

지금까지는 get, post로 등록한 미들웨어를 사용했고

3.1,2에서는 thidy-part 미들웨어를 사용합니다.

<br>

app.get,use,post등으로 선언하며 인자에는(path, function(request, response, next))를 가집니다.

안에있는 function의 내용이 행동이고, 이를 미들웨어라고 합니다.

미들웨어는 여러개를 이어붙일 수 있습니다.

(function(...,...,...{next();}), function(...,...,...),...)

첫번째 미들웨어의 next는 그 다음 미들웨어를 실행하도록 지시합니다. 하나의 함수만 존재할 때는 현재 함수의 내용을 가리키지만, 2개이상일땐 그 다음 함수를 수행하도록 합니다.

[미들웨어 동작예제](http://expressjs.com/en/guide/using-middleware.html)

#### 3.1 body-parse

body-parser라는 미들웨어를 사용해봅시다.



```javascript
app.use(bodyParser.urlencoded({extended: false}));

```

main.js가 실행될 때마다, app.use안에 있는 미들웨어가 실행됩니다.

사용자가 전송한 post데이터를 가져온 다음에 '내부적'으로 분석해서 app.post의 콜백함수를 호출합니다.그리고 콜백의 request인자에 body라는 프로퍼티를 추가해줍니다.

코드로 보겠습니다.



body-parser 적용 전

```javascript
app.post('/create_process', function(request, response){
  var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
      });
});
```



<br>

적용 후

```javascript
app.post('/create_process', function(request, response){
      var post = request.body;
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      })
});
```

- body-parser를 통해 기존에 body에 post방식으로 넘겨준 데이터를 추가하고, parse(가공)하는 절차가 생략이 되고 , request인자에 body프로퍼티가 추가됨으로써, 미들웨어를 통해 해당과정을 간결하게 처리할 수 있습니다.



<br>

#### 3.2 데이터 압축

<br>

텍스트만으로 이루어진 게시글도 수십 KB가 훨씬 넘어갑니다.

많은 사람들이 접속하게 된다면 데이터는 너무 커질 것이므로 압축이 필요합니다.

compression미들웨어를 사용해 데이터 압축이 간단해집니다.

```javascript
npm install compression --save
```

설치를 진행하고, 모듈 require를 한 다음,

```js
app.use(compression());
```

미들웨어 사용코드를 작성해주고 개발자도구에서 기존의 데이터를 확인해보면 확연하게 줄어든 것을 확인할 수 있습니다.

<br>

#### 3.3 미들웨어 만들기

<br>

만들어진 미들웨어를 사용하는 방법이 아닌 직접 미들웨어를 만들어 사용해보겠습니다.

<br>

```javascript
app.use(function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

```

미들웨어는 request, response, next의 인자를 가진 함수형태로 수행됩니다.

페이지를 요청했을때 마다 미들웨어 함수는 수행이 될 것이고 그에 대한 내용은 현재 디렉토리의 data폴더에 있는 file의 list를 request.list객체에 넣습니다.

그리고 next()를 수행하면서 다음 미들웨어 함수를 호출합니다.

현재 페이지에 대한 request의 객체에는 모든 파일리스트가 담겨있으므로 파일목록을 출력하는 페이지들은(home, create, update) readdir메소드를 수행할 필요없이 미들웨어로 매번 처리해줄 수 있으므로 코드를 반복하는 일이 없어집니다.

<br>

그러나 post로 처리되는 페이지에서는 이에 대한 행위가 필요없으므로 app.use대신

```
app.get('*', function(request, response, next)
```

을 사용해 get으로 받아오는 모든 요청에 대해서만 미들웨어를 호출할 수 있도록 변경해줍니다.



<br>



#### 3.4 정적파일서비스

<br>

이미지와 같은 파일을 페이지에 올리는 방법을 알아보겠습니다.

express가 내장하는 static모듈을 사용합니다.

```
app.use(express.static('디렉토리명'));
```

디렉토리명에 있는 정적인 파일(jpg 등)을 읽어오는 구문입니다.

작성하지 않으면 경로를 명시해서 적어도 파일이 불러와지지 않습니다.



#### 3.5 에러처리

<br>

요청한 URL이 존재하지 않을 때 404 에러가 발생합니다.

미들웨어를 사용해 처리할 수 있습니다.

```
app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
});
```

위에서 처리할 수 있는 URL이 없을 때 처리하는 부분이기 때문에 해당 코드의 위치는 하단에 작성합니다.

[에러 핸들링](http://expressjs.com/en/guide/error-handling.html)

에러가 존재할 때 next를 호출하고, 인자는 err로 사용합니다.

nodejs에서는 인자가 4개가 등록되어있는 미들웨어는 에러를 호출하도록 약속되어있습니다.

```
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('somtin broke');
})
```

해당 코드를 하단에 작성해 에러를 출력할 수 있도록 합니다.

