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

## 4.8, 9 Saga로 게시글작성 ,삭제적용하기

<br>

### 1. 더미데이터 관련한 라이브러리(shortid, faker)

- 더미데이터로 진행하다보면 id값이 고정되는 귀찮음이 생기는데 `shortid`라는 라이브러리를 사용하면 id생성해줌
  - `shortId.generate()`
- `faker`라이브러리는 각종 더미데이터를 만들어줌!

<br>

#### 1.1 faker

`npm i faker`

`import faker from 'faker'`



<br>



#### 2. 게시글 삭제

```react
//sagas/user.js

case REMOVE_POST_OF_ME:
	return {
		...state,
		me: {
			...state.me,
			Posts: state.me.Posts.filter((v) => v.id !== action.data),
			//게시글을 지우기 위해선 filter을 이용한다
		}
	}
```

불변성을 꼭 지켜야한다.

상태관리에 있어서 state를 변경할 때 `setState`를 통해서만 업데이트 해주어야하고, 업데이트 과정에서 기존 객체값을 절대로 직접 수정해선 안된다.

가상 DOM에서 랜더링을 마치고, `diffing`알고리즘을 통해 변화가 일어나는 부분만 업데이트가 된다.

`setState`를 통해 변경하지 않으면 리랜더링이 되지 않는다.



`...state`를 사용하는 이유임. -> 기존 객체는 나머지 매개변수로 건들이지 않고, 새 객체를 생성하며 `불변을 유지하면서` 값을 `업데이트`할 수 있는 것.

이런 작업을 쉽게 해주는 것이 `immer`! Immutable.js와 비교도 안되게 좋음.



<br>



### 2. immer  

기존 리듀서에서 불변성을 지키는 것과  immer도입의 차이점은

`swtich case`문에서 `...`나머지 매개변수를 사용할 필요가 없다는 것과 새로운 객체 `{ }` 리터럴로 감싸면서 새로운 상태를 반환할 필요가 없어짐. `draft`로만으로 이게 됨

hooks엔 `use-immer`를 사용하면 됨

여기서 다룰건 `immer`



<br>

##### 사용법

`npm i immer`

`import produce from 'immer'`

불변성 지옥에서 우리를 구원해줄 `immer`

애초에 코딩하기전에 `immer`를 도입해버리자.

```react
// reducer- 불변성을 지키면서 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수


//state가 draft로 바뀜, 불변성 상관없이 막 바꿔두됨 immer가 불변성 지켜서 다음상태로 만들어줌
const reducer = (state = initailState, action) => {
	return produce(state, (draft) => {
	switch (action.type){
		case: ADD_POST_REQUEST:
			draft.addPostLoading: true;
			...
	}
	});
}
```



<br>

##### 코드로서의 차이점

`immer 도입 전`

```react
case ADD_COMMENT_SUCCESS: {
    //불변성을 지키기위한 부분//
	const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
	const post = { ...state.mainPosts[postIndex] };
	post.Comments = [dummyComment(action.data.content), ...post.Comments];
	const mainPosts = [...state.mainPosts];
	mainPosts[postIndex] = post;
    //불변성을 지키기위한 부분//
	return {
		...state,
		mainPosts,
		addCommentLoading: false,
		addCommentDone: true,
	};
}
```

<br>

`immer 도입 후`

```react
case ADD_COMMENT_SUCCESS: {
    //알아서 불변성을 유지해주니, 바꿀것만 바꾸면 됨.
	const post = draft.mainPosts.find((v) => v.id === action.data.postId);
	post.Comment.unshift(dummyComment(action.data.content));
	draft.addCommentLoading = false;
	draft.addCommentDone = true;
	break;
}
```



<br>



`redux-toolkit`을 따라가도 좋음

`placeholder.com` <- 크기별로 더미이미지를 제공함



<br>



## 4.12 인피니트 스크롤 적용

<br>

`draft.hasMorePosts = draft.mainPosts.length < 50;`

-> 특정 갯수만큼 게시글을 보여주기 위한 `true, false`설정



```react
useEffect(() => {
	function onScroll(){
        console.log(window.scrollY, document,documentElement.clientHeight, document,documentElement.scrollHeight); // 이 3가지 변수를 많이씀.
        if(window.scrollY + doc...clientHeight > docue...scrollHeight - 300) // 300px이전에 미리로딩하기
            {
                if (hasMorePost) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
	}
	//window의 add-하면 scorll한것 remove-지워주어야함. 메모리에 계속쌓임
	window.addEventListener('scroll', onScroll);
	return() => {
		window.removeEventListener('scroll', onScorll);
	};
}, [])
```



- `clientHeight` : 화면이 보이는 길이 현재화면 위에서 아래까지
- `scrollY` : 제일 위에서부터, 얼마나 내렸는지 -> 옹 퍼센테이지로 볼 수 있겠네.
  - 이게 몇퍼센트면 어떤 컴포넌트를 보여주겠다 하면 팀원소개페이지 생각한대로 구현가능.
- `scrollHeight` : 총 길이 



실무에서는 특정 픽셀이 남았을 때 미리 로딩해주는 방식으로 사용함.

인피니트 스크롤 구현 + 리액트 버추얼라이즈드 구현해보면 좋음



---

## Back단

<br>

### CORS

- 다른 도메인으로 요청을 보내면 **브라우저**가 차단을함.
- CORS에 대한 해결책으로 브라우저를 변조할 수없음
- 브라우저 -> 다른 도메인으로 요청을 보냈을 때만 에러가 생김

<br>

#### CORS 해결방법

- 프록시를 사용하는 방법.

- `ACCESS - CONTROL - Allow - ORIGIN`헤더를 추가하는 방법 

- ```javascript
  res.setHeader('Access-Control-Allow-Origin', '허용할 요청 URL');
  ```

- `cors 미들웨어`로 처리

  - ```javascript
    app.use(cors({
     origin: '요청 URL',
     credential:
    }))
    ```

    

  ---

#### 프론트단에서 redirect

```javascript
import Router from 'next/router';
useEffect(() => {
	if(...)
		Router.push('/');//요청 경로
},[]);
```

<br>

#### 중복되는 주소 제거하기 : axios의 baseURL지정하기

```react
import axios from 'axios';
//sagas/index.js
axios.defaults.baseURL = 'http://....';
```

 <br>

### passport로 로그인하기

<br>

다양한 로그인전략들을 한번에 관리해주는 `passport`미들웨어를 설치



`npm i passport passport-local`

passport-local은 이메일과 비밀번호로 로그인할 수 있도록 도와주는 미들웨어다.



##### passport세팅



app.js, passport/index.js와 local.js 이 세개의 파일에서 연결이 이루어진다.

```react
//passport/index.js

const passport = require('passport');
const local = require('./local')

module.exports = () => {
	passport.serializeUser(() => {
	
	});
	
	passport.deserializeUser(() => {
	
	});
	local();
};
```





```react
//passport/local.js

const passport = require('passport');
//구조분해할 때 가져오는 것 이름변경
const {Strategy : LocalStrategy} = require('passport-local');

//module..은 passport/index.js의 local()에서 실행되는 부분

module.exports = () => {
    passport.use(new LocalStrategy({
               userNameField:'email',
        passwordField:'password';
    }, async (email, password, done) => {
        //req에서 받은email,password가 있는지 확인하는 부분
        const user = await User.findOne({//시퀄라이즈로 진행한 DB에서 데이터 있는지 확인하는 부분
        });
        if (!user){
            //데이터가 없을 때
            done(null, false, {reason : '아이디가 없어요'});
        }
        bcrypt.compare(password, db의 password)//비교
    }));
    
}
```

`done(서버에러, 성공, 클라이언트에러)`

passport는 응답을 해주는 것이 아니라 결과를 알려주는 것.

`done`이 콜백과 비슷한 것. 인자들이 `passport.authenticate(), err, user, info`로 전달되는 것

- 로그인이 잘못되었을 때 `401`상태코드를 사용함

- 401 `unauthorized` 비인증
- `403` Forbidden 허용되지 않은 요청

```javascript
//passport전략을 시행하는 부분

const passport = re...

router.post('/login', passport.authenticate('local'), (err, user, info) =>{
    if(err) console.error(err);
    //next(err); <-이렇게 에러처리가능 (next인자가 있을때)
});

//미들웨어를 확장하는 방법
router.post('/login', (req,res,next) => {
    passport....위와 동일 
})(req,res,next); //위에랑 같은역할, req,res,next를 사용할 수 있도록 미들웨어를 확장한 것

```



```react
//app.js
const passportConfig = require('./passport');
//app.js에서 passport설정 불러오기

passportConfig();
```



---

