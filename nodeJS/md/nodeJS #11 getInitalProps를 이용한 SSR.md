## nodeJS #11 getInitalProps를 이용한 SSR



nextJS를 빌드할 때 

<img width="497" alt="getInitalProps" src="https://user-images.githubusercontent.com/55486644/88262833-e8a5d700-cd03-11ea-8c8c-05f7af18e16d.PNG">

해당문구가 나왔다.

사진에서 잘안보이는데.. `getInitalProps` 라는 단어가 등장하고 해석하면 `server side 랜더가 getInitialProps, getServerSideProps를 사용`해서 되었다는 의미이다.



<br>

해당 함수를 일전에 본 적이 있었는데 왜 쓰이지는지 제대로 이해하지 못하고 넘어간 적이 있었다.

이 글을 통해 정리해보고자 한다.



### getInitialProps를 이용한 SSR

nextJS에서 SSR을 가능하게 하는것이 getInitialProps라고 한다.

해당 함수의 호출시점은 두가지로 존재하는데

첫번째는 URL을 이용해 특정 페이지로 접근할 때는 nodeJS환경에서 호출하고,

두번째로는 클라이언트에서 다른 화면(SPA)으로 이동할 때 브라우저 환경에서 호출된다고 한다.

클래스, 함수형 컴포넌트에서 사용이 가능하지만, 해당 예제는 fetch를 사용한다. fetch는 다음과 같은 문제가 있으므로 Axios를 사용한다.



### 먼저 fetch()로 서버의 JSON데이터 받아오기



일단 getInitialProsp을 이용해 서버 데이터를 받아오는 코드를 작성해본다.



```javascript
Home.getInitialProps = async ( {req} ) => {
	const res = await fetch('https://api.yebalja.com/api/json/program');
	const json =await res.json();
	console.log(json);
	return { json };
}

```

결과

```
  {
    program_id: 2,
    program_title: 'SSAFY',
    program_benefit: '월 100만원 지급',
    program_content: '알고리즘 중심 교육으로 .. 하는 프로그램',     
    program_summary_content: '요약메세지2',
    program_language: '자바, 파이썬'
  },
```

async, await, fetch를 이용해서 잘받아온다!

[async, await가 뭔데?]([https://velog.io/@secho/React-08-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC%EB%AC%B8%EB%B2%95](https://velog.io/@secho/React-08-비동기처리문법))

이전에는 주로 프로미스, 콜백으로 처리를 했다. 프로미스가 뭐냐면.. 비동기 처리에 사용되는 객체이고, **주로 서버에서 받아온 데이터를 화면에 표시할 때 사용**된다.

[여기 정말 정리가 잘되어있다]([https://joshua1988.github.io/web-development/javascript/promise-for-beginners/#:~:text=%ED%94%84%EB%A1%9C%EB%AF%B8%EC%8A%A4%EB%8A%94%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8,%EC%9D%98%20%ED%8A%B9%EC%84%B1'%EC%9D%84%20%EC%9D%98%EB%AF%B8%ED%95%A9%EB%8B%88%EB%8B%A4.](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/#:~:text=프로미스는 자바스크립트,의 특성'을 의미합니다.))

그래서 async, await, fetch()를 같이 쓰는데 Fetch의 단점이 있어서 Axios로 사용해야한다.





단점은 다음과 같다.

```
Fetch API보다 Axios가 더 좋은 장점은 아래와 같습니다.

구형브라우저를 지원합니다.(Fetch API의 경우는 폴리필이 필요합니다.)
요청을 중단시킬 수 있습니다.
응답 시간 초과를 설정하는 방법이 있습니다.
CSRF 보호 기능이 내장되어있다.
JSON 데이터 자동변환
Node.js에서의 사용
```



<br>

### 발생한 문제 , CORS?

<br>

첫 페이지가 로딩되었을 때 JSON데이터가 잘 받아와졌다.

새로고침 했을 때도 정상적으로 동작한다.

그러나, 예발자닷컴 로고를 클릭한 순간 Failed to fetch라 하면서 오류가 발생한다.

```
localhost/:1 Access to fetch at 'https://api.yebalja.com/api/json/program' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

해당 오류에 대해 찾아보니 CORS라는 키워드가 자주 언급되었다.

해당 키워드부터 학습해본다.

위의 에러는 **보안상의 이유로 브라우저들이 다른 도메인에게 XHR 요청을 보내는 것을 제한한 것입니다.** 다행히 피해갈 수 있는 방법이 있습니다. 하지만 클라이언트 쪽에서는 힘들고 **응답을 받는 서버쪽에서 해결해야 합니다**.. by [제로초](https://www.zerocho.com/category/NodeJS/post/5a6c347382ee09001b91fb6a)



### CORS

CORS란 `Cross Origin Resource Sharing`, 현재 웹 페이지가 다른 서버의 자원을 호출하는 것을 의미한다.

현재 프론트서버에서 백서버의 자원을 호출하고 있는 상황이긴 하다.

개발자가 악의적인 목적으로 악용할 경우가 존재한다.

보안에 취약하다.

우리가 마음먹고 악성코드가 심어져있는 웹사이트로 링크를 걸 수 있기 때문에 브라우저는 CORS상황이 발생했을 때와 일반적인 절차를 알아보자.

- 일반적인 요청에 대해서는 아무런 처리도 하지 않음, 일반적인 요청이라고 하면 다음 사항에 부합되는 요청을 의미함
  - GET, HEAD, POST
  - Request Header에는 다음 속성만 허용:
    - Accept, Accept-Language, Content-Language, Content-Type
  - Content-Type은 다음만 허용
    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`
- 이런 일반적인 요청이 아닌 경우 브라우저는 접근할 리소스를 가지고 있는 서버에 preflighted 요청을 보냄
  - preflighted 요청은 특별한 목적을 가지는 요청으로 method = OPTIONS 으로 전송
  - OPTIONS 요청을 받은 서버는 Response Header에 서버가 허용할 옵션을 설정하여 브라우저에게 전달.
  - 브라우저는 서버가 보낸 Response 정보를 이용하여 허용되지 않은 요청인 경우 405 Method Not Allowed 에러를 발생시키고, 실제 페이지의 요청은 서버로 전송하지 않음
  - 허용된 요청인 경우 전송



위에서 서버쪽에서 해결해야한다고 하니, 글을 참고하며 해결해나가보자!



### json.js

먼저, `npm i cors`로 cors 패키지를 설치한다.



```java
const cors = require('cors');
...
router.get('/program', cors({origin:'허용할 주소'}), (req, res) => {...});
```



모든 라우터에 적용하고 싶다면, 다른 미들웨어가 있는 부분에 `app.use(cors())`작성



참고 - [CORS?]([https://www.popit.kr/cors-preflight-%EC%9D%B8%EC%A6%9D-%EC%B2%98%EB%A6%AC-%EA%B4%80%EB%A0%A8-%EC%82%BD%EC%A7%88/](https://www.popit.kr/cors-preflight-인증-처리-관련-삽질/))









#### 개인적인 생각 a.k.a 뇌피셜

index.js에서 모든 컴포넌트가 존재한다. 여기서 getInitalProps로 서버의 데이터를 받아와 하위의 컴포넌트들로 props로 전달해주거나 redux로 해당 상태들을 관리해주면 될 것 같다?!

데이터를 한번만 받아오고 다른 페이지에서 props를 통해 전달하면 추가적인 서버요청없이 화면을 다시 그리면 된다! 가공하거나 그런것은 내부적으로 처리 할 문제.

