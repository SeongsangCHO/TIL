## React nodeBird



## 4.1 ~ 4.4강의



실무에선 thunk보단 saga(제로초피셜)



미들웨어 = 리액트 기능 ++

비동기액션을 `dispath`할 수 있도록 도와주는 `thunk`

이를 사용하면 하나의 액션에서 `dispatch`를 여러번할 수 있음.



`npm i redux-thunk`로 다운로드



### 1. 커스텀 미들웨어

미들웨어는 3단 고차함수이기 때문에 우리의 요구사항에 맞게 작성할 수도있다.

```react
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
	console.log(action);
	return next(action);
};
```

미들웨어의 틀은 3단으로 이어지는 함수. 



---



---

로그인 request -> success / failure 요청의 3단계가 존재함.



thunk를 사용한다면 비동기 액션 크리에이터(loginAction)를 추가.

```react
export const loginAction = (data) => {
	return (dispatch, getState) => {
        const state = getState();
		dispatch(loginRequestAction());
		axios.post('/api/login')
			.then((res) => {
				dispatch(loginSuccessAction(res.data));
			})
			.catch((err) => {
				dispatch(loginFailureAction(err));
			})
	}
}
```

이 예제가 `thunk`의 끝 => 한번에 `dispatch`를 여러번할 수있게 해준다.



### 2. saga

thunk는 delay같은 것을 `js`으로부터 구현해야하는데,  saga는 몇초뒤에 Action이 실행되게 하는 것과 같은걸 지원해줌.

 thunk에서는 클릭2번하면 요청이 두번이감

saga는 takelatest라는 것으로 첫번째꺼는 무시함

스크롤내릴 때 서버의 요청에 수백개가 갈수도 있게됨. 이를 잘못처리하면 내 사이트에 dos공격을 하게되는 꼴. 배포하면 ddos가 됨., `Saga`의 쓰로틀, 디바운스를 적용하면 1초에 액션을 몇번 허용할지 명시가능.



<br>



#### 2.1 saga설치, generator 이해하기

`npm i redux-saga`

`npm i next-redux-saga`



##### - saga의 설정방법

`store.sagaTask = sagaMiddleware.run(rootSaga);`

-> store에 리듀서처럼 등록해주어야함.



`_app.js`에서 withReduxSaga로 감싸주어야함.

<br>

#### 2.2 generator

제너레이터는 function뒤에 `*`이 붙음.

`.next()`로 실행할 수 있음

```react
const gen = function* () {
	console.log(1);
	yield;
	console.log(2);
	yield;
	console.log(3);
	yield 4;
}

const generator = gen();

generator.next();
// 1이 출력되면서 멈춤.
generator.next();
// 2가 출력됨.
generator.next();
// 3이 출력됨
generator.next();
// undefined, done

//generator => (yield) = 중단점이 있는 함수다.
//yield (value의 리턴값);

```



<br>

saga에서는 멈추지 않는 제너레이터가 있음

```react
const gen = function* (){
	while(true)
		yield '무한';
}

gen().next();
//done이 true가 되지않고 계속해서 반복됨
//이벤트 리스너랑 비슷함.
//클릭이벤트에 gen().next()를 하게되면 클릭리스너랑 같은 기능.
```



```react
//sagas/index.js

import { all, fork, take, call, takeEvery} from 'redux-saga/effects'
//saga의 이펙트들

function logInAPI(data){
    return axios.post('/api/login', data);
}

function* logIn(){
    //요청이 실패할 수도 있기 때문에 try,catch로 감싸며, 성공결과는 result.data, 실패는 err.response.data에 담겨있음.
    //요청의 결과를 받음.
    try{
    yield put({
        type: 'LOG_IN_REQUEST'
    });
    const result = yield call(loginAPI, action.data);
    yield put({//put == dispatch
        type: 'LOG_IN_SUCCESS',
        data: result.data
    });
} catch(err){
    yield put({
        type: 'LOG_IN_FAULUE',
        data: err.response.data,
    })
	}
}

function* watchLogIn(){
    //Log액션이 실행될 때까지 기다리겠다.
    while (true){
    	yield take('LOG_IN', logIn);
    }
}
...

export default function* rootSaga(){
 yield all([//배열을 받는 all, 한번에 다 실행해줌.
     fork(watchLogIn),//함수를 실행해주는 fork
     fork(watchLogOut),
     fork(watchAddPosts)
     //fork대신 call(watchLogin)을 사용
     //fork와 차이점이 존재함.
 ])   
}
```

- fork = 비동기함수호출

-axios와 같은 요청을 기다리지 않음 = non-blocking

수행해버리고, 다음 내용을 수행함.



- call = 동기함수호출

-> 순서대로 진행되어야하는 API요청할 때 사용함.

<br>



**yield, take의 치명적 단점은 1회용이라는 것.**



##### 해결방법 -> while로 감싸기

- 직관적이지 않은 방법이므로, `take`대신 `takeEvery`를 사용한다.

- 근데 이 방법은 버튼 두번클릭시 요청이 두번가버리게 된다.

- 이렇게 반복문을 감쌀 필요없이 `effect`를 이용하자.

<br>



#### 2.3 saga 이펙트



##### takeLatest, throttle

- `takeLatest`는 응답을 취소하는 것임. 요청취소를 하는 것이 아님.

- 두개의 요청을 그대로 보내되, 같은 응답을 받으면 마지막 받은 요청을 처리함. 이것만 사용해서는 안됨

- `throttle`를 사용해서 , `ms`를 지정해서 2초제한을 두어서 그 시간동안 한번의 요청만 보낼 수 있도록 지정해주는 effect.

- `takeLeading`은 첫번째 요청만  수행됨.

- 서버구현전까지 비동기적인 효과를 위해 `yield.delay`를 사용한다.

- 검색창 실시간 검색과 같은 효과는 디바운싱을 사용함

  - 연이어 호출되는 함수중 마지막 함수만 호출하도록 함.
  - 어떤 단어가 완성되었을 때 검색함수 호출.

  

<br>



## 4.5 ~ 4.7 강의

### 1. Saga쪼개기 



```react
//sagas/user.js
import { ... } from 'redux-saga/effects';

//관련된 함수들 모으기
function* ...(){
...
}

export default function* userSaga() {
	yield all([
	fork(watchLogIn),
	fork(watchLogOut)
	])
}
```



```react
//sagas/index.js

import { all, fork } ...
import postSaga from './post';
import userSaga from './user';

export default function* rootSaga(){
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}
```

이와 같은 방법으로 `saga`도 쪼개는 과정이 필요하다.

<br>



### 2. 로그인 액션 수정 

비동기는 항상 `REQUEST, SUCCESS, FAILURE`로 만듦

로그인할 때 REQUEST 상태에  `isLoggingIn, Out`액션을 만들어서 로딩중이면 버튼에 isLoding prop를 추가해 로딩으로 변하게 추가함.

로그인 성공/실패상태-> LoggingIn/Out :false

로그인 인, 아웃 요청 -> LoggingIn/Out : true





1. 로그인폼에서 로그인을 한다.
2. ID, PW를 적고 로그인을 누름
3. `dispatch(loginRequestAction({id,pw}));`수행
4. `sagas/user.js`의 `takeLatest(...,login)` 실행
5.  `sagas/user.js`의 `function* login(action)`실행하면서 , `yield put`으로 액션실행과 함께 `reducer`에서 `LOG_IN_REQUEST`가 실행됨

6. `isLoggedIn` state에 따라, 출력되는 컴포넌트를 삼항연산자로 지정
7. reducer, saga가 잘 적용되어있는지 확인해볼 것

<br>

#### 2.1 액션과 상태정리

- 액션과 상태 변수명이 헷갈릴 수 있기에 다르게 할 필요가 있음.



```react
//서버쪽 주소구조할 때 사용할 API function
return axios.post(`/api/post/${data.postId}/comment`); 
```

<br>

### 3.바뀐 상태 적용, eslint 점검

[vs코드에서 eslint 설정하기 링크](https://steadyzest.tistory.com/20)

eslint 엄격하게 하기

- `npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import`
- `npm i -D eslint-plugin-react-hooks`
- `"parser":"babel-eslint` : babel이 해석해서 최신문법도 에러발생을 안하도록 설정
- `"extends" : [ "airbnb"]` 코드를 빡세게 잡는 에어비앤비로 적용
- `npm i -D eslint-plugin-jsx-a11y` - 시각장애인, 색맹 대상으로하는 스크린리더관련을 평가하는 플러그인

- `"rules" : { "끄고싶은것들 ": off 또는 0 }`으로 제거.

![image](https://user-images.githubusercontent.com/55486644/91981560-ff5c3680-ed63-11ea-8969-766423eecb62.png)

- 꺼도되는 것들 (제로초 피셜)

<br>

## 4.8 Saga로 게시글작성 적용하기

<br>

### 1. 더미데이터 관련한 라이브러리(shortid, faker)

- 더미데이터로 진행하다보면 id값이 고정되는 귀찮음이 생기는데 `shortid`라는 라이브러리를 사용하면 id생성해줌
  - `shortId.generate()`
- `faker`라이브러리는 각종 더미데이터를 만들어줌!





