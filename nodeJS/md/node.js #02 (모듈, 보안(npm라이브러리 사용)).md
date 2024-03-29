## node.js #02 (모듈)





## 1. 모듈

<br>

node js에서 모듈을 사용하고 있습니다.

<br>

모듈이란 독립된 기능을 갖는 함수, 파일들의 모임입니다.

- 외장모듈 : 라이브러리 (npm 사용)
- 내장모듈 : nodejs에 내장된 모듈



어느 객체를 만들고, 이를 모듈화 한 다음 다른 파일에서 가져와 객체에 접근할 수 있습니다.

코드로 진행해보겠습니다.



```javascript
var M = {
	v = 'v',
	f : function(){
		console.log(this.v);
	}
}
module.exports = M;
```

- module.exports = M; 은 M객체를 외부에서도 사용할 수 있도록 모듈화 하는 것입니다.

<br>

모듈화된 M객체를 다른 파일에서 가져오기 위해서는 모듈로 등록된 파일의 경로를 require을 해야합니다.

```javascript
var part = require('./mpart.js');
console.log(part);
```

<br>

mpart.js에는 M이란 객체가 존재하고, 현재 파일에서 part에 모듈로 등록된 M객체를 받아옵니다.

part가 M으로 매핑된 것입니다.

```javascript
part.f();
```

따라서, part에서도 M에 선언된 프로퍼티에 접근할 수 있습니다.









## 2. 보안

<br>

### 2-1. 오염된 정보가 들어왔을 때

<br>pathname으로 호출했을 때 사용자가 queryString을 상위디렉토리, 그 상위의 디렉토리로 조작한다면 로컬파일에 대해 누구나 접근할 수 있는 보안문제가 발생합니다.

 <br>

그렇다면 내부(서버)에서 가리키는 경로를 제외하고 외부에서 조작할 수 있는 쿼리스트링에 대해 상위 디렉토리로 넘어갈 수 없도록, 내부에서 순수 파일명으로 데이터를 수정합니다.

<br>

코드와 함께 정리하겠습니다.

```javascript
 fs.readFile(`../data/${queryData.id}`
```

현재 readFile로 로컬의 파일을 경로에 따라 읽고 있습니다.

queryData.id는 쿼리스트링의 id값으로 url에서 ?id=값

으로, 사용자가 값을 조작하면 ../data에 있는 파일로 접근할 수 있는 것입니다.

<br>

![보안1](https://user-images.githubusercontent.com/55486644/84349780-05be9480-abf3-11ea-9208-79eeb9ab257b.JPG)

값을 변경해 fileread.js에 접근하여 데이터를 출력하고 있습니다.

쿼리스트링에 ../와 같은 경로때문에 문제가 발생하는 것입니다.

<br>

그래서 ../경로를 없앤, 순수 파일명으로 쿼리스트링을 내부에서 변경합니다.

```javascript
var filterdId = path.parse(queryData.id).base;
fs.readFile(`../data/${filterdId}`, 'utf8',
```

queryData.id의 경로 중 ,../와 같은 경로를 제외한 순수 파일명이 추출된 filteredId를 readFile이 읽어오는 파일 경로를 수정합니다.

<br>

![보안후](https://user-images.githubusercontent.com/55486644/84349782-06efc180-abf3-11ea-9d31-9a46e83c4879.JPG)

filteredId는 "fileread.js"값을 갖고 있기 때문에 ../와 같은 상위디렉토리로 접근할 수 없게 되는 것입니다.

<br>

<br>



### 2-2 오염된 정보가 나갈 때

<br>

웹 브라우저는 <script>태그에 속한 내용을 수행합니다.

create를 해서 XSS란 제목의

```javascript
<script>
	alert('merong');
</script>
```

내용을 작성하면, HTML내 스크립트가 생성되며 해당 내용을 웹브라우저가 수행합니다.

<br>

만약 이 스크립트내용이 alert가 심각한 내용이 작성된다면 문제가 발생할 수 밖에 없습니다.

이를 해결해봅시다.

<br>

스크립트의 <를 HTML이 문자 그대로 해석하도록 만들어 봅니다.

```scr
&lt;script&gt;
alert('merong');
&lt/script&gt;
```

이렇게 수동으로 <, >를 문자 그대로 표현하는 방법이 있습니다. 그러나 이는 효율적이지 않습니다.

<br>

다른 많은 방법이 있겠지만 npm을 사용해 다른 모듈을 불러오는 방법을 사용해봅니다.

<br>

#### 모듈 설치하기

[npm 모듈 사이트](www.npmjs.com)

해당 사이트에서 모듈을 찾아 사용하는 방법입니다.



먼저, npm 사용을 위해 초기화해줍니다.

```
npm init
```

나오는 입력창에 대해서 일단, 엔터로 모두 진행합니다.

모든 초기화가 진행되면 package.json이란 파일이 생성되며, 이제 npm을 이용해 모듈을 다운받기 위한 준비가 끝납니다!

<br>

```
npm install -S sanitze-html // 현재 패키지에 설치
npm install -g //컴퓨터 전역에 설치
```



<br>

설치가 끝나고 package.json을 열어보면 dependency에 라이브러리가 추가된 것을 확인할 수 있습니다.

<br>

#### 모듈 사용하기

<br>

설치가 완료된 sanitize-html은 모듈이기 때문에 위에서 한 모듈을 불러옵니다.

```javascript
var sanitizeHtml = require('sanitize-html');
```

<br>

해당 모듈 사용법은 npm 사이트에 명시되어 있으니 그대로 사용해줍니다.

```javascript
var clean = sanitizeHtml(dirty);
```

우리가 변경해야할 오염데이터는 상세보기페이지의 title, description이기때문에 해당 데이터를 clean하게 적용합니다.

```javascript
 var sanitizedTitle = sanitizeHtml(title);
var sanitizedDescription = sanitizeHtml(description);
```

<br>

적용 후 실행해보면 스크립트 태그가 적용되지 않는 것을 확인할 수 있습니다.



모든 태그를 적용시키지 않을 수도 있고 옵션을 사용하면 적용시킬 수 있습니다.

