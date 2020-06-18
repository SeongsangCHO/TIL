## React #02 (Life Cycle, node + react 환경구축)



<br>

### 1. Life Cycle

<br>

컴포넌트의 생명 - 소멸까지의 과정을 생명주기라고 한다. 

생명주기에서 **특정 시점**에 자동으로 호출되는 메소드를 라이프사이클이벤트라고 한다.

컴포넌트가 생성, 변경, 제거될 때 (특정 시점) 호출되는 메소드(라이프사이클 이벤트)

컴포넌트의 특정시점에는 크게 3가지가 있다.

1. 마운팅
2. props의 변화
3. state의 변화

그렇다면 이에 해당하는 이벤트들을 알아보자~

<br>

#### 1.1 Mounting

<br>

React 컴포넌트가 DOM에 삽입될 때의 과정을 마운팅이라고 한다.

<br>

해당 과정은 다음과 같은 함수호출순서를 가진다.

1. constructor() (초기화과정, set props and state)
   - 단 한번 수행
   - state 설정
2. componentWillMount()
   - 컴포넌트를 실제 DOM에 추가하기 직전에 호출
3. render()
   - 렌더링
4. componentDidMount()
   - Ajax, 타이머생성코드, 서버통신

[참고 - 리액트의 라이프사이클]([https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%EB%B2%A4%ED%8A%B8](https://velog.io/@kyusung/리액트-교과서-컴포넌트와-라이프사이클-이벤트))

1,2,3번 과정을 수행하면 컴포넌트가 모두 구성되어지고 **서버와 통신할 때 DidMount()함수에서 호출**한다

<br>

#### 1.2 props, state

<br>

특정 객체를 렌더링하기 위해서 props, state를 사용한다.

대략 순서는 다음과 같다.

1. shouldComponentUpdate()

   - props, state변경시 재 랜더링여부를 return으로 결정한다.

2. componentWillUpdate()

   - 1번호출 이후에 재랜더링직전에 호출되는 메소드
   - 새로운 props, state가 반영되기 직전 새로운 값을 받는다.

3. render()

4. componentDidUpdate()

   - 출력되는 화면 구성을 변경하고자 할때 많이 사용.

   <br>

   

#### 1.3 컴포넌트 해제

<br>

컴포넌트 마운팅이 해제될 때 **componentWillUnmount()**이 호출된다.

컴포넌트동작을 위해 사용한 메소드들의 리소스를 제거한다.

<br>

[라이프사이클 REST API 개념 이해](https://jsonplaceholder.typicode.com)









<br>

### 2. node + react환경구축

<br>

[node와 react서버 같이 수행하기](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/)

1. 필요한 패키지 설치

```
$ npm install yarn
$ npm install nodemon // 재로드없이 자동 반영
```

2. react에 해당하는 전체 폴더를 client폴더 하위에 이동

3. node_modules에서 에러발생시, 삭제 후 다시 npm install

4. 루트경로에서 package.json파일 생성

5. package.json 내용

   ```json
   {
       "name": "프로젝트 name",
       "version": "1.0.0",
       "scripts": {
           "client": "cd "client경로" && yarn start",
           "server": "nodemon server.js",
           "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
       },
       "dependencies": {
           "yarn": "^1.13.0",
           "body-parser": "^1.18.3",
           "express": "^4.16.4"
       },
       "devDependencies": {
           "concurrently": "^4.0.1"
       }
   }
   
   ```

6. npm i -g로 의존라이브러리 추가

7. server.js 파일 작성

8. package.json에 설정된 스크립트 수행

   ```
   $ yarn dev
   ```

---

```json
"concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
```

- concurrently: React app and Server을 동시에 수행하기 위함.

- --kill-others-on-fail : 하나의 프로세스가 종료되면 다른 프로세스도 같이 종료되도록 설정하는 플래그.

  