## nodejs #05

<br>

### 1. 프로젝트 생성

프로젝트 환경 : vscode



#### 1.1 디자인패턴을 위한 폴더 생성

효율적이고 유지보수가 쉽도록 디자인패턴을 적용해 프로젝트 파일을 생성할 것입니다.

이를 위해서 express-generator를 설치해 사용하면, 자동으로 프로젝트 파일을 생성해줍니다.

```
$ npm install -g express-generator
```

명령어를 이용해 generatot을 설치하고 설치가 완료되었을 때 다음 명령어를 사용하면 파일 생성이 완료됩니다.

```
$ express
```



- 생성된 파일 구조

<img width="173" alt="파일 구조" src="https://user-images.githubusercontent.com/55486644/84584268-1b26ff00-ae3d-11ea-9115-b2b84c66434d.PNG">



저는 여기서 쿼리문을 사용할 model폴더를 추가로 생성할 예정입니다.



<br>

#### 1.2 각 폴더의 역할

<br>

각 폴더의 역할을 ~~제가 이해한대로~~ 설명하자면,

public : 이미지파일, 등 정적파일들이 위치할 곳.

routes : 다양한 URI를 구분지어 라우팅할 수 있도록 모듈화된 파일들이 위치할 곳.

views : HTML,CSS, ejs, pug등 사용자에게 보여줄 view관련 파일이 위치하는 곳

controller : 사용자에게 받은 요청을 최초로 받는 곳, URI에 따라 route의 파일을 호출하고, model에서 데이터를 받아, view로 전달할 중간다리역할

model : 컨트롤로에서 요청한 데이터에 접근하기 위한, db에 관련된 쿼리문, 이에 대한 데이터들을 조작- 관리할 클래스등이 위치할 곳

config : db 설정등이 들어갈 폴더

<br>



### 2. main문 작성

<br>

express를 사용할 것입니다.

모듈을 설치하고 ,,

```
npm install express
```

설치가 되었다면, main에서 불러와봅시다

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.send('Hello Express')
});

app.listen(port, function () {
    console.log(`listening ${port}`);
})
```

<br>

#### 2.1 ejs의 사용

<br>

HTML을 그대로 따르며, 자바스크립트도 사용할 수 있는 템플릿엔진인 ejs를 사용합니다.

```
npm install ejs
```

설치한 후, main.ejs을 생성하고 예제를 만들어봅니다.

```

...HTML코드
<body>
    <h1><%- list %></h1>
...HTML코드
```

일단 요렇게 작성해봅니다.

<br>

#### 2.2 main에서 ejs파일 로드하기(출력해보기)

<br>

main에서 ejs의 HTML을 로드해보겠습니다.

```javascript
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('ejs파일명', {ejs에 넘길 name : 데이터});
})
```

express에서, view engine인 ejs를 사용하겠다는 코드를 작성하고,

단순히 페이지만을 출력할 것이므로 get방식으로 호출하는 코드를 작성합니다.

ejs파일명은 2,1에서 main으로 작성했으니 'main'으로 하고, 
넘길 데이터이름은 list, 데이터를 문자열인 'Hello'로 작성합니다.

<br>

ejs파일은 다음과 같습니다.

```html

<%- include ("./header") %>
<body>
    <h1><%- list %></h1>

<%- include ("./footer") %>
```

여기서 header와 footer를 include했는데, 기존 HTML파일에서 다른 부분은 수정하지말고 h1태그만 추가해서 테스트해보면 됩니다.



node main.js으로 구동해보면 페이지가 나오는 것을 확인할 수 있습니다.

<br>



#### 2.2.1 라우팅 모듈화

<br>

효율적인 코드관리를 위한 라우팅모듈화를 해봅니다.

기존에는 main 한 파일내에서 app.get, app.post 등등 여러가지를 한꺼번에 작성했었습니다.

이제부터는 routes폴더에 해당 URI에 맞게 파일을 만들고, 그에 대한 URI를 처리하는 파일을 작성합니다.

<br>

예시를 하나 들어보겠습니다..

/user이라는 경로의 하위에 /user/register, /user/update, /user/delete가 존재하고

/post에 /post/register, /post/update, /post/delete를 작성했다고 해봅시다.

그렇다면 이 많은 URI를 한 파일에서 관리한다면 코드 수가 장난이 아니게 되고 읽기 어려울 것입니다.

그래서 상위의 URI를 딴 폴더를 나누어 작성합니다.

위의 예시에선 user, post가 되겠네욥.

<br>

##### 그렇다면 어떻게하는데요?

routes에 user.js, post.js를 생성합니다.

```javascript
const express = require('express');
const router = express.Router();
```

라우팅모듈화니까 라우터를 만들어줍니다.

```javascript
//user.js
router.get('/register', function (req, res) {
    res.render('admin');
});
```

기존에 사용했던 app = express() <- 대신에 router.get을 사용합니다.

```javascript
module.exports = router;
```

만들어진 라우터 객체를 외부에서 사용할 수 있도록 exports해줍니다.

<br>

라우터를 만들었습니다! 그렇다면 main에서 라우터를 사용해볼까요?

<br>

```javascript
var userRouter = require('./routes/user'); //라우터js 경로

app.use('/user', userRouter);//상위경로 지정, 라우터 사용
```

끝!

<br>

라우터를 사용하여 라우터코드에서 '/register'은 이제 /user/register이 된 것입니다.

즉, user.js에 있는 모든 경로는 앞에 /user가 붙습니다.

라우팅별로 모듈을 나누는 것, 라우팅 모듈화입니다.

<br>



#### 2.3 post로 넘어온 데이터 삽입하기

그렇다면, ejs에서 post로 받은 데이터를 출력하는 방법을 해보겠습니다.

```html
        <form action="/admin/register" method="post">
            <input type="text" name="program_title" placeholder="program_title">
            <input type="submit">
        </form>
```

ejs에서 post방식으로 데이터를 보낼 것이므로, 이에 대응되는 app.post를 작성해야한다. [get post참고페이지](https://mommoo.tistory.com/60)

<br>

```javascript
app.post('/register', function (req, res) {
    var reqBody = req.body;
    var insertData = [
        reqBody.program_title, reqBody.program_ageTarget,
        reqBody.program_Benefits, reqBody.program_languages,
        reqBody.program_content
    ];
    var sql = 'INSERT INTO program_table (program_title, program_ageTarget, program_Benefits, program_languages,' +
        ' program_content) VALUES (?,?,?,?,?)';
    db.query(sql, insertData, function (err, results) {
        if(err)
            console.log(err);
        console.log("input id is... " + results.insertId);
        });
    res.redirect('/admin');
    //res.render('admin');
});

```

/admin/register으로 post요청을 받았으니, 전송된 데이터를 저장하는 객체(insertData)를 생성합니다.

form의 데이터는 req의 body에 있습니다. body-parser를 이용하면 쉽게 사용할 수 있습니다.

form에서 전송받은 데이터를 데이터베이스에 삽입하는 sql을 작성하고, 나머지 쿼리문도 작성해줍니다.

데이터베이스 처리가 완료되면, /admin페이지로 redirect합니다.

- redirect말고 ajax로 비동기처리 할 수 있지 않을까요?
- nodejs는 비동기처리를 기본으로 하는데 방법이 있을까요?

<br>

#### 2.4 현재 Database내의 데이터들을 출력하기

<br>

데이터베이스내의 데이터들을 table형식으로 출력하기 위해 코드를 작성합니다.

페이지를 보여줄 것이므로 get방식으로 작성합니다.

```javascript
router.get('/list', function (req, res) {
    var sql = 'SELECT * FROM program_table';
    db.query(sql, function (err, results) {
        if(err)
            console.log(err);
        res.render('list', {program_list : results});
    })
});
```

/list라는 요청이 들어오면 수행되며, db의 데이터를 가져오는 select문을 사용합니다.

results는 db결과의 객체입니다. program_list라는 이름으로 'list.ejs'로 던져줍니다.

<br>

list.ejs는 program_list라는 객체를 테이블로 출력하기 위해 forEach문을 사용합니다. 코드는 다음과 같습니다.

```javascript
        <table class="list_table">
            <thead>
                <th>id</th>
                <th>title</th>
                <th>age_target</th>
                <th>benefits</th>
                <th>languages</th>
                <th>content</th>
            </thead>

            <tbody>
            <% program_list.forEach(function(lists) { %>
                <tr>
                    <td><%- lists.program_id%></td>
                    <td><%- lists.program_title%></td>
                    <td><%- lists.program_ageTarget%></td>
                    <td><%- lists.program_Benefits%></td>
                    <td><%- lists.program_languages%></td>
                    <td><%- lists.program_content%></td>
                    <td><a href="/admin/update?id=<%- lists.program_id %>">update</a></td>
                    <td><a href="/admin/delete?id=<%- lists.program_id %>">delete</a></td>
                </tr>
            <% }) %>
            </tbody>
        </table>
```

program_list의 갯수만큼 반복하며, 그에 대한 객체는 lists로 사용됩니다.

각 lists객체의 멤버들은 select된 객체의 멤버명과 같습니다.

<br>

#### 2.5 데이터 삭제하기

<br>

데이터를 삭제해보겠습니다.

데이터를 삭제하기 위해선 현재 id값이 필요합니다.

위에서 a태그로 묶어, id값을 get으로 던집니다.

```javascript
router.get('/delete', function (req, res) {
    var deleteId = url.parse(req.url, true).query.id;
    var sql = 'delete from program_table where program_id = ?';
    db.query(sql, deleteId, function (err, result) {
        if(err)
            console.log(err);
        res.redirect('/admin/list');
    })
});
```

get으로 던진 데이터를 parse하여, deleteId에 넣습니다.

url.parse.query.던진 데이터의 쿼리스트링 (id)입니다.

sql을 수행하고, where절에 들어가는 deleteId를 가지고 해당하는 id를 삭제합니다.

<br>

### 2.6 데이터 수정하기

<br>

마찬가지로, id를 querystring으로 받는 코드를 작성합니다.

```javascript
router.get('/update', function (req, res) {
    var updateId = url.parse(req.url, true).query.id;
   res.render('updatePost',{updateId : updateId});
})

```

update는 수정할 데이터를 post로 전송하기때문에 먼저 수정할 데이터를 담는 화면을 구성합니다.

화면은 게시글을 작성할 때와 같은 form태그로 이루어져있습니다. (2.3절과 같음)

수정이 필요한 부분이라면, form의 action에서 경로를 수정합니다.

/admin/register -> /admin/update

그리고 id로 구분지어야되므로,  update버튼을 누를 때 id값인 querystring을 받는 updateId, 이를 화면에 전달하는 {updateId : updateId}를 선언합니다.

<br>

/update화면으로 이동이 되었을 때 전달받은 updateId를 hidden으로 가려서 form태그에 추가해줍니다.

```javascript
<%- include ("./header")%>

<body>
<div>
    <form action="/admin/update" method="post">
        <input type="text" name="program_title" placeholder="program_title">
        <input type="text" name="program_ageTarget" placeholder="program_ageTarget">
        <input type="text" name="program_Benefits" placeholder="program_Benefits">
        <input type="text" name="program_languages" placeholder="program_languages">
        <textarea name="program_content" placeholder="program_content" rows="3"></textarea>
        <input name="program_id" type="hidden" value="<%- updateId%>">
        <input type="submit">
    </form>
</div>
<a href="/admin/list">데이터 리스트 보기</a>
</body>
<%- include ("./footer")%>
```

마지막으로 post문을 작성해주면.. 

```javascript

router.post('/update', function (req,res) {
    var reqBody = req.body;
    var updateData = [
        reqBody.program_title, reqBody.program_ageTarget,
        reqBody.program_Benefits, reqBody.program_languages,
        reqBody.program_content, reqBody.program_id];
    var sql = 'UPDATE program_table ' +
                'SET program_title = ?,' +
                'program_ageTarget = ?,' +
                'program_Benefits = ?,' +
                'program_languages = ?,' +
                'program_content =?' +
                'where program_id = ?';
    db.query(sql, updateData, function (err, results) {
        if(err)
            console.log(err);
        console.log(results);
    });
    res.redirect('/admin/list');
})
```

수정 성공!

