## React #10 리덕스 설명



리덕스는??

가장 사용률이 높은 **상태관리 라이브러리**.

컴포넌트들의 상태 관련 로직을 다른 파일로 분리시켜 관리할 수 있고, 컴포넌트간 상태를 공유할 때 컴포넌트들을 거치지 않고 쉽게 상태값을 전달 할 수 있다.



props를 전달하기 위해 실제 props를 사용하지 않는 곳을 거쳐야 하는 것은 비효율적이고 귀찮은 작업..

따라서 앱이 갖고 있는 상태, 상태변화 로직을 **스토어**라는 곳을 통해 원하는 컴포넌트에 직접 상태값과 함수를 주입할 수 있게 된다.





### 액션 타입 정의

프로젝트에서 상태변화를 일으키는 것을 하나의 액션으로 본다.

액션에 대한 이름을 정해줌. 주로 대문자로 작성

`const TOGGLE_SWITCH = 'TOGGLE_SWITCH';`

### 액션 생성함수 정의

액션 객체를 만드는 함수 = 액션 생성 함수

type 값을 필수로 가져야 함.

`const toggleSwitch = () => ({ type: TOGGLE_SWITCH });`

### 초기값 설정

```javascript
const initialState = {light : false, counter : 0}
```



### 리듀서 함수 정의

리듀서는 변화를 일으키느 함수. 파라미터로 `state`, `action`을 받음

```javascript
function reducer(state = initialState, action){
//action객체에 type이 들어있음.
	switch(action.type)
		case TOGGLE_SWITCH:...
}
```

스토어 만들기 `const store = createStore(reducer);`

### render함수 만들기

```javascript
const render () => {
	const state = store.getState();
	...//상태변화를 직접 작성
    lightDiv.style.background = 'green';...
}
```

`render()`

### 구독하기

스토어의 상태가 바뀔 때 마다 render함수 호출해야함.

그러기 위해서 스토어를 `구독`해주어야 변화를 감지.

스토어의 내장함수 `subscribe`를 사용

```javascript
const listener = () => console.log('업데이트 됐어요!')
const unsubscribe = store.subscribe(listener);
// 나중에 unsubscribe();
```



### 이벤트 달기, 액션 발생

액션을 발생시키는 것을 dispatch라 함.

이를 수행할 떄 스토어의 내장함수 `dispatch`를 사용

파라미터로는 `액션 객체` 전달.

```javascript
myButton.onClick = () => {
	store.dispatch(toogleSwitch());
}
```

[참고]([https://velog.io/@velopert/Redux-1-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EA%B0%9C%EB%85%90%EC%A0%95%EB%A6%AC-zxjlta8ywt](https://velog.io/@velopert/Redux-1-소개-및-개념정리-zxjlta8ywt))





리덕스를 쓰기전 axios부터 배워야겠네..ㅎㅎ!

api를 호출해서 비동기방식으로 HTTP데이터 요청을 실행하는 것이기 때문.

"AJAX호출이 가능"

