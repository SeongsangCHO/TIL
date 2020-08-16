## React #13 리덕스 + Axios로 상태관리하기



<br>

앞서 정리했던 리덕스를 실제로 프로젝트에 적용해보고 사용해보도록 하겠다.

여러 글을 참고하고 진행하였으며 어떤 형식이 옳은지, 어떻게 사용해야 정답인지는 아직 잘 모르겠다.

글만보면서 이해하려하는 것 보다 직접 자료를 찾아가면서 실제 코드에 적용을 해보는 과정을 통해 이해하는데 많은 도움이 되었다.



<br>

직접 작성하며 동작하는 순서대로 정리함.

<br>

총 단계는 다음과 같다.

1. 스토어 생성
2. 리덕스 래퍼 적용
3. 리듀서 생성
4. 액션 생성함수 작성
5. Dispatch로 생성한 action을 리듀서로 전달
6. 반환받은 새로운 상태로 데이터 출력

<br>

폴더구조는 다음과 같다.

- redux
  - actions
  - reducers
  - store

<br>

### 1,2단계 : 스토어 생성, 리덕스 래퍼 적용하기

상태관리를 해주는 스토어를 생성한다.

스토어를 딸랑 생성하는 것보다 도움이 되는 라이브러리를 추가해주는 것이 좋다.

현재 사용하고 있는 라이브러리는 **비동기 작업**을 돕는 **Redux-thunk**와 State, Props등을 콘솔에서 보여주는 **Logger** 그리고 크롬 익스텐션인 **Redux-devtools**를 사용할 수 있도록 하는 **composeWithDevTools**를 사용하도록 하겠다.



next에서 Redux를 쉽게 사용할 수 있도록 도와주는 `redux-wrapper`을 설치한다.

`npm i next-redux-wrapper`

미들웨어도 설치한다.

`npm i redux-logger`

`npm i redux-thunk`

`npm i reudx-devtools-extension`



```javascript
const configureStore = () => {
  const logger = createLogger();
  const middlewares = [thunk, logger]; //thunk (비동기작업을 돕는 라이브러리)를 넣음
  //배포용과 개발용의 미들웨어 차이를 두기 위함
  const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware([]))
  : composeWithDevTools(applyMiddleware(...middlewares))//middlewares배열을 여기다가 넣음.
  
  const store = createStore(
    combineReducers({
      reducer,
      faqReducer,
      programsReducer}), enhancer);
  return store;

};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
```





- 스토어를 생성할 때 여러 리듀서를 한꺼번에 통합해주는 `combineReducers`. => 사용할 리듀서를 인자로 받는다.

  combine을 해주면 스토어에서 합쳐진 리듀서들의 상태를 하나로 관리할 수 있다.

- `enhancer`은 리덕스에 미들웨어를 추가하기 위한 인자이다.

- 추가된 기능을 가진 스토어를 생성하고 이를 이용해서 `_app.js`에서 wrapper로 감싸줌으로써 리덕스 적용이 완료된다.

  - ```javascript
    
    export default wrapper.withRedux(MyApp);
    
    ```

    

기존의 방식은 `<Provider/>`으로 감싸주어야 하는 것. 이 부분이 `next Redux`에서 사용하는 `리덕스 래퍼`와 차이점이다.



<br>



### 3단계 : 리듀서 생성

<br>

변화를 일으키는 함수. 즉, 상태를 받아와서 새로운 상태로 반환하는 기능을 하는 함수이다.

여기서 변화될 상태는 데이터가 없던 상태에서 API를 호출해 받아온 데이터를 넣은 새로운 상태를 의미한다.

```javascript
import { HYDRATE } from 'next-redux-wrapper';
//faq리듀서의 초기 State지정
const initialState = {
  data: {}
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case 'GET_FAQ_DATA':
      return { ...state, data: {...action.payload} };

    default:
      return state;
  }
};
export default faqReducer;
```

<br>

- `initialState`는 리듀서의 초기 상태를 의미한다.
- `faqReducer`의 동작은 `action.type`에 따라 기존상테(`initialState`)에서 새로운 상태 `{ }`로 반환한다는 의미이다. `{ }`로 감싸어져서 반환된다는건 새로운 객체를 생성해 반환함을 의미한다.
- `{...state}`의 `...`은 변화된 상태만을 받는다는 의미이다. `state`에 변화가 없다면 기존값 그대로 반환한다.

- `GET_FAQ_DATA`의 값을 가지는 `action`이 수행되면 `return {...}`을 한다는 의미.

<br>

### 4단계 : 액션생성함수 작성

<br>

이전에 `type`을 필수로 가지는 객체를 `액션`이라고 했다.

이 `액션`에 따라 리듀서에 정의된 동작을 분기하게 되는데 `액션생성함수`란 이 `액션`객체를 생성하는 함수를 의미한다.

```javascript
//actions/faqAction.js
import axios from 'axios';
//액션(type을 가진 객체) 생성함수
//API를 호출해서 JSON데이터를 가져오고 리듀서에 해당 상태를 변화시키기 위한 TYPE을 지정해줌
export const getFaqData =  async () => {
  //API 호출
  const faqData = await axios.get('http://localhost:5000/api/json/faq');
  return {
    type: 'GET_FAQ_DATA',
    payload : faqData.data
  }
}

```

<br>

비동기처리를 위해 `async, await`로 axios 라이브러리를 통해 API를 호출하여 `faqData`로 데이터를 반환받았다.

변화된 상태를 반환할 액션타입을 지정해주고, `payload`에 반환받은 데이터를 할당해주었다.

<br>

### 5단계 : Dispatch로 action 전달.

<br>

4단계를 통해 생성한 액션안에는 새로운 상태로 만들수 있는 데이터, 그리고 type을 갖고 있다.

이 액션을 리듀서로 전달해 새로운 상태를 반환받아보자!

<br>

그럼 먼저 3단계에서 지정한 `initialState`를 불러와보자. 왜? 변화된 상태를 받아오기 위해서 먼저 상태를 받아오는 작업이 있어야하기 때문.

상태를 가져오기 위해서는 앞 장에서 설명한 `useSelector`을 사용하면 된다.

```javascript

  const faqData = useSelector((state) => state.faqReducer);
```

`state`란 스토어의 상태이고 콘솔 찍어보면 combine된 모든 리듀서들의 상태가 전부 나오게 된다

우리는 faqReducer의 상태만 받아올 것이므로 위와 같이 작성한다.



그럼 다 된거아냐? 여기다가 액션생성함수로 액션 생성해서 바로 dispatch로 반환된 새로운 상태(데이터)를 가지고 컴포넌트를 랜더링하면 되잖아?

응, 안된다.



<br>

### 5.5단계 랜더링-리랜더링, 비동기처리

초기랜더링에서 새로운 상태를 반환받아서 바로 사용할 수 없다. 처음엔 `빈 데이터`를 가지고 랜더링을 수행해야한다.

나는 액션생성함수를 비동기로 처리하였다. 그리고 비동기로 처리하지 않아도 상태가 변화되는 상황이라면 `리랜더링`이라는 과정을 거쳐야한다.

리액트가 랜더링을 실행하는 과정은 다음과 같다.

1. Props가 변경되었을 때
2. State가 변경되었을 때
3. `*forceUp*date()`[ ](https://reactjs.org/docs/react-component.html#forceupdate)를 실행하였을 때
4. **부모 컴포넌트가 렌더링되었을 때**

우린 2번에 해당한다. 따라서 `리랜더링`을 수행한다.



현재 우리는 `hooks`를 사용하고 있으므로 `componentDidMount`와 같은 라이프사이클메소드를 사용할 수 없다.

대신 `useEffect`라는 메소드가 존재한다.

이는 컴포넌트가 랜더링되거나 업데이트될 때마다 수행되는 함수이다.

우린 랜더링되었을 때 수행되도록 하고, 새로운 상태로 변화하게 해서 컴포넌트를 리랜더링하도록하게 작성할 것이다.

<br>

### 5.99 단계 : useEffect에서 액션생성 및 리듀서 호출

<br>

컴포넌트가 초기에 빈 값으로 랜더링된다는 것을 알았다.

그럼 빈 값일 때 예외를 처리하도록 해야한다.

이 때 사용한 것이 ECMAScript추가문법에 Optional Chaining, Nullish coalescing Operator이다.

`?.` 연산자를 통해서 앞의 값이 Null 또는 Undefined이라면 undefined로 반환하고, 

`??`는 const a = data ?? [] ; - 앞의 값이 Null또는 Undefined라면, 뒤의 값을 할당하는 문법이다.

이를 이용해 초기 랜더링시 예외처리를 진행하고, 리랜더링에서 `useEffect`내에서 데이터를 불러온다. 이 때 `??`연산자를 이용하여 빈 값이 아닌 불러온 데이터를 할당해 랜더링하도록 하였다.

```javascript
  const faqData = useSelector((state) => state.faqReducer);
  const dispatch = useDispatch(); // 디스패치 사용하도록하기

  useEffect(()=>{
    getFaqData().then(function(result){
      dispatch(result) 
    });
  },[]);
  const dataList = faqData.data[program] ?? [];
```

`getFaqData`는 액션생성함수이고 이에 대한 결과는 `result`로 액션을 반환하는 콜백함수 내에서 리듀서를 호출하도록 했다.

비동기함수를 호출하는데 `async, await`를 사용했다. 그런데 `then`이라는 메소드와 콜백함수를 거치지 않고는 바로 얻어온 데이터를 사용할 수 없었다. 이는 `promise`라는 비동기 처리를 위한 객체와 연관이 있었다.

`promise`는 비동기 처리 후 반환되는 객체인데 상태값이 존재한다. `대기, 이행, 거절` . 

axios로 통신을 진행한 후 반환된 `promise`의 상태는 `이행` 상태였다. 이를 그냥 사용하려고 하자 , 데이터에 접근할 수가 없었는데 then, 콜백함수를 사용해 해결할 수 있었다. [promise에 대한 설명](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

**응답을 받아오면, then이나 catch로 분기하여 결과나 오류를 반환하도록 해야한다는 것을 알게되었다.**





<br>

### 6단계 : 반환받은 새로운 상태로 데이터 출력

<br>

지금까지 한 과정으로 데이터 출력까지 마무리되었다.

디스패치에서 액션을 리듀서로 전달해 type에 따른 분기로 해당하는 상태값을 반환하여 이 값으로 리랜더링을 진행해 새로운 상태값을 기반으로 컴포넌트들을 그려준다.

상태값이 변화할 때마다 state는 변할 것이며 그 때마다 re-rendering이 발생할 것이다.









### 배포시 에러발생

리덕스를 적용하고 `npx next build`로 배포파일을 생성하는데 다음과 같은 에러가 발생했다.

```
Automatically optimizing pages ..root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/about". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/boostcamp". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/ftseoul". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/likelion". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/soma". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/ssafy". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/woowa". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function
root Reducer
root Reducer
root Reducer

Error occurred prerendering page "/404". Read more: https://err.sh/next.js/prerender-error
TypeError: middleware is not a function

> Build error occurred
Error: Export encountered errors on following paths:
        /
        /404
        /about
        /boostcamp
        /ftseoul
        /likelion
        /soma
        /ssafy
        /woowa
    at exportApp (/home/liasqui31/yebalja.com/front/node_modules/next/dist/export/index.js:22:1166)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async build (/home/liasqui31/yebalja.com/front/node_modules/next/dist/build/index.js:36:218)

```

- store에 사용하지 않는 리듀서를 명시해놓음
- index.js라는걸 초기에 찾아서 들어가는 것 같음 따라서 기존의 index.js 삭제
- index.js를 참조했던 store에서 import 삭제
- => 해결!