## React #12 UseSelector, useEffect, useReducer, useCallback 

<br>

### useSelector

`useSelector`로 스토어의 상태에 접근할 수 있다.

기존에 connect로 사용할 때 `mapStateToProps`와 비슷하다

`const myData = useSelector(selector: Function, deps: any[]);`

`deps`배열은 어떤 값이 변경되었을 때 `selector`을 재정의할 지 설정.

생략하면 매번 랜더링 될 때마다 `selector`함수도 새로 정의됨.

스토어에 정의된 초기 State를 가져오고 싶다면

`const myData = useSelector((state) => state);` 로 사용하며,

이 `state`는 `combineReducer`로 묶인 모든 리듀서의 state이므로 모든 초기값을 호출한다.

특정 리듀서의 state를 가져오고 싶다면 `state.등록된 리듀서 명`으로 호출하며

우리 프로젝트에는 

```javascript
  const store = createStore(
    combineReducers({
      reducer,
      faqReducer}), enhancer);
```

로 두가지 리듀서만 현재 사용하고 있기에 선택해서 사용하면 된다.



`reducer, faqReducer` 의 `initialState`가 `store`에 저장되어 있으므로

특정 state를 불러올 땐 리듀서의 이름을 명시해주면 불러올 수 있다.

컴포넌트에서 useSelector으로 faqReducer의 state를 가져오는 코드

```javascript
  const myData = useSelector((state) => state.faqReducer);
```



## Side Effect

컴포넌트가 랜더링된 이후 **비동기로 처리되어야하는 효과들**을 Side Effect라함.

어떤 데이터를 가져오기 위해 외부 API호출시 랜더링을 먼저하고 실제 데이터를 비동기로 가져오는 것이 권장된다.

=> Json API에 있는 데이터를 가져오기 위해서 FAQ컴포넌트를 랜더링하고 실제 데이터를 axios를 통해 가져왔다.

그런데 처음 랜더링될 때 데이터를 가져오기 전이므로 **undefined**값이었기 때문에 존재하지 않는 값에 인덱스로 접근했기 때문에 에러가 발생한다. 이 에러를 처리하기 위해서  최신문법을 참고했다.

[ES11 추가문법](https://avengersrhydon1121.tistory.com/264)

- Optional Chaining : `?.`으로 사용하며, `?.`왼쪽 연산자 값이 `null`또는 `undefined`이면 실행을 멈추고 `undefined`를 return`한다.
  - 존재하지 않을 수 있는 값에 대해 예외처리가 쉽게 가능하다.



## useEffect

랜더링 완료이후에 실행되거나 어떤 값이 변경됐을 때에도 실행할 수 있음.

랜더링 결과가 돔에 반영된 뒤에 호출된다.



useEffect를 사용하면 데이터를 불러오는 방법을 파악하는데 도움이 된다고 한다.

useEffect에서 두번째 인자인 `[]`은 버그를 일으키는 주된 원인이라고 한다.

의존성을 필요로 하는 상황을 제거하는 `useReducer, useCallback`을 알아두자.



<br>

## useReducer

리듀서는 현재 상태 + 액션값을 전달 받아 새로운 상태를 반환함.

**불변성**을 지키면서 새로운 상태를 반환.

`useReducer`에서의 액션 객체는 꼭 `type`를 지닐 필요가 없음



<br>



## useCallback

메모이제이션과 비슷한 기능을 하는 `useMemo`와 비슷한 함수.

컴포넌트가 리랜더링될 때마다 수행되는 함수들의 반복때문에 생기는 이슈들을 최적화하기 위해 사용한다.

