## React #14Thunk, saga + effects

실무에선 thunk보단 saga(제로초피셜)



미들웨어 = 리액트 기능 ++

비동기액션을 `dispath`할 수 있도록 도와주는 `thunk`

이를 사용하면 하나의 액션에서 `dispatch`를 여러번할 수 있음.



`npm i redux-thunk`로 다운로드



### 커스텀 미들웨어

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



### saga

thunk는 delay같은 것을 `js`으로부터 구현해야하는데,  saga는 몇초뒤에 Action이 실행되게 하는 것과 같은걸 지원해줌.

 thunk에서는 클릭2번하면 요청이 두번이감

saga는 takelatest라는 것으로 첫번째꺼는 무시함

스크롤내릴 때 서버의 요청에 수백개가 갈수도 있게됨. 이를 잘못처리하면 내 사이트에 dos공격을 하게되는 꼴. 배포하면 ddos가 됨., `Saga`의 쓰로틀, 디바운스를 적용하면 1초에 액션을 몇번 허용할지 명시가능.



<br>



#### saga설치, generator 이해하기

`npm i redux-saga`

`npm i next-redux-saga`



##### saga의 설정방법

`store.sagaTask = sagaMiddleware.run(rootSaga);`

-> store에 리듀서처럼 등록해주어야함.



`_app.js`에서 withReduxSaga로 감싸주어야함.

<br>

#### generator

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



#### saga 이펙트



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

