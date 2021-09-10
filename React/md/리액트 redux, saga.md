# 리액트에서의 전역상태관리_1 Redux

---



## Redux

> 직접 작성한 예제를 기반으로 작성
>
> [코드와 같이 보시면 더욱 도움될 것 같습니다](https://github.dev/SeongsangCHO/ts-context-api/tree/feature/redux-saga)



### 0. flow

> [이전 글](https://watermelonlike.tistory.com/178) 에서 크게 달라지는 것이 없다.
>
> Action, Reducer은 완전하게 동일하다.
>
> 달라지는 점은, Context API에선 전역 데이터에 접근하기 위해 Provider에 등록했고 Reducer를 호출하기 위한 Context도 생성해주었다면 Redux에선 `useDispatch` 를 통해 reducer에 action을 전달해줄 수 있다.
>
> 또한 `useSelector` 를 사용해 `useContext` 를 사용하지 않고 바로  전역 데이터를 가져올 수 있다.
>
> Flow는 다음과 같다.
>
> 1. Store(전역 데이터 저장공간)생성
> 2. 하위 컴포넌트에서 접근할 수 있도록 Provider로 전역 데이터 내려주기
> 3. 하위데이터에서 전역데이터 수정시 dispatch를 통해 Reducer로 전달할 Action 작성
> 4. 전달된 Action에 따라 전역데이터 갱신을 분기하는 Reducer작성
> 5. 하위 컴포넌트에서 전역데이터 접근 및 갱신 dispatch호출





### 1. store만들기

```js
//store.ts
import { combineReducers } from "redux";
import movie from "./Movie/Reducer";
import { createStore } from "redux";

const rootReducer = combineReducers({ movie });
const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

- 여러개의 Reducer를 사용하는 redux에서는 이를 하나의 store로 묶어준다. 이때 사용되는 것이 `combineReducers`이다.
- 하나로 묶인 Reducer를 `createStore` 의 파라미터로 전달해 반환되는 store를 Provider로 내려주면 된다.

```jsx
<Provider store={store}>
	<App/>
</Provider>
```

- 사용 준비 끝



### 2. state update, 값 가져오기

`redux` 에서 제공되는 `useDispatch` 로 등록된 Reducer를 호출할 수 있고 초기 State를 `useSelector` 로 가져올 수 있다.

```js
import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();
const state = useSelector((state: RootState) => state.movie);
```



액션은 다음과 같이 Reducer로 전달된다.

```js
dispatch(requestMovieData(state.page));
```







## Redux에서의 비동기요청

Redux내에서 비동기처리를 진행할 수 없다.[예시](https://changhoi.github.io/posts/etc/redux-async-demo/)

처리를 하게된다면 전역 state가 update되는 Reducer에서 진행되어야하는데, 이는 순수함수로서 side-effect가 없어야한다. 따라서 오류발생이 있을 수 있는 비동기처리는 해당 부분에서 진행되면 안된다. 라고 이해했다. (구현상 Promise가 반환되는 이유도 있는 것 같다.)

따라서 Redux를 사용하면서 비동기처리를 하기 위해서는 따로 비동기 요청을 보내고 그 응답을 action에 담아 reducer로 전달하는 방법이 있다. 해당 방법은 개인적으로 흐름상 이해가 조금 복잡해진다고 생각한다.

이렇게만 보았을 때 처음엔 "괜찮잖아"라고 생각했었다.

```js
useEffect(async ()={
  const res = await getData();
	dispatch(addData(res));
})
```

그러나 redux내에서 action을 통해 reducer로 전달되기 이전 비동기요청 또는 동기요청을 처리할 수 있도록 해주는 미들웨어가 있다.

바로 saga 또는 thunk이다.

saga를 도입한다면 해당 요청을 중간에서 어떻게 처리할 수 있는지 살펴보자



### 1. redux-saga?

saga는 리덕스의 미들웨어이다.

미들웨어 사전적으로 중개역할을 하 중간 소프트웨어다.

redux의 미들웨어는 action이 발생해 Reducer에 반영되기 전, 그 중간에서 특정한 요청을 처리하고 Reducer로 전달하는 역할을 한다.

<img width="605" alt="스크린샷 2021-09-10 오후 9 55 34" src="https://user-images.githubusercontent.com/55486644/132856489-b173878e-92b0-4eb6-b95b-99aaf153506a.png">

- 그림처럼 action이 dispatch되면 saga가 요청을 처리한 후, Reducer로 결과를 포함한 action을 전달한다. (dispatch를 한번 더 한다고 생각하면 된다.)

saga는 `제너레이터`의 문법으로 사용되는데 이는 [해당글](https://meetup.toast.com/posts/140)을 읽어보면 좋다.



### 2. redux-saga 적용하기

Redux-1.store만들기 부분에서 몇줄만 추가해주면 된다.

```js
import { combineReducers } from "redux";
import movie from "./Movie/Reducer";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";

const rootReducer = combineReducers({ movie });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

```

- 라이브러리 사용이므로 복잡한 것은 없다. middleware를 사용할 것이라고 store를 생성할 때 옵션으로 추가해주면 된다.
- 추가로 saga함수와 요청을 처리하는 함수도 생성해주어야한다.
- saga는 제네레이터 함수다.  saga는 yield값만을 반환하는 것이고 `effect`라고 불리는 것이 실행을 처리한다.
- effect로는 select, put, take, call, fork, join이 있다.





### 3. saga함수

saga는 하나의 스레드라고 생각하면 된다. (실제는 아니다 그렇게 생각하면 이해하는데 좋다). 

이 제너레이터함수를 미들웨어가 끊임없이 동작시킨다.

해당 함수가 계속 돌고있다가 특정 요청이 들어오면 구독하고있는 제너레이터함수(사가함수)기 요청에 대한 처리를 한다. 라고 이해하자.[글에 관련 내용이 상당히 자세히 작성되어있다.](https://min9nim.vercel.app/2020-04-23-redux-saga/)

```js
function* 워커함수(action: ReturnType<typeof movieAsync.request>) {
  console.log(action);

  try {
    const res: IMovieListData[] = yield call(비동기함수, action.payload);
    console.log(res);
    yield put(movieAsync.success(res));
    // yield put({ type: "ADD_MOVIE_DATA", payload: res });
  } catch (e) {
    yield put({ type: "실패" });
  }
}

function* movieSaga() {
  yield takeLatest(movieAsync.request, 워커함수);
}
```

- movieSaga는 request가 들어올 때 워커함수를 실행할 수 있도록"구독"하고 있다.
- `takeLatest`는 action type이 dispatch되기까지 감시하는 기능을 한다.
- 요청이 들어오면 비동기요청을 처리하며,그에 대한 결과를 `put` == dispatch을 통해 reducer로 전달한다.

`put, call`이라는 것은 이펙트 생성자라고 불리는데, 명령을 만들어주기만 하는 역할이다.

`call`은 (fn, parameter)의 형태로 사용되는데, `fn(paramter)`의 함수호출과 같다. 이런 호출을 미들웨어가 담당해서 처리를 해준다.

이렇기에 테스트가 간단해지고 비동기처리를 간단한 코드만으로 구현할 수 있다고 한다.

정리해보면



원래라면 컴포넌트에서 비동기처리를 한 후 그에 대한 결과를 Reducer로 전달했는데, `movieAsync.request`라는 타입을 가진 액션이 dispatch되면 이 요청을 구독하고 있던 saga가 워커함수를 실행한다.

워커함수에선 비동기요청을 처리한 후, 그 결과를 reducer로 반영한다.







> action -> dispatch -> reducer -> 상태가 업데이트되는 flow만 이해하면 redux, redux-toolkit, saga를 쉽게 이해할 수 있었다.
>
> redux에서 비동기처리를 하기위해서 saga라는 미들웨어를 사용하는데 이는 제너레이터 함수로 동작한다.
>
> 비동기처리나 dispatch는 이펙트생성함수로 동작하며 이로 생성되는 이펙트는 미들웨어가 처리한다.
>
> action, reducer로 분리되어서 코드량이 상당히 길어지거나 하나를 수정하기 위해서 여러 파일을 들어가야하는 단점이 있는데, 이를 해결하고자 등장한게 Ducks 패턴이라고 한다.
>
> Action, Reducer을 모아 한 파일에 작성해두는 것을 뜻한다.
>
> 🤔 제너레이터를 이용함으로서 무엇 때문에 비동기처리코드가 간단해지는지는 완벽히는 모르겠다. 해당 문법+ 이를 활용한 비동기처리 예제를 자세히 볼 필요가 있다.