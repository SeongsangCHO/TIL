# React Hooks



---

Hook : class없이 state를 사용할 수 있는 새로운 기능.

Hooks는 오직 최상위에서만 호출해야한다.

반복, 조건, 중첩된 함수 내에서 호출하면안된다.

이 규칙을 따라야 컴포넌트가 랜더링될 때마다 항상 동일한 순서로 Hook이 호출되는 것을 보장하기 때문이다. 

useState, useEffect가 여러번 호출되어도 Hook상태를 올바르게 유지할 수 있기 떄문이다.



만약 조건문안에 Hook을 작성했다고 하자.

첫째 랜더링에선 true로 4개의 hook이 전부 실행되었지만 조건이 변경되고 리랜더링되면서 2번째 hook이 실행되지 않았다.

그럼 에러가 발생한다.

React는 호출"순서"로 Hook를 사용한다.

예제를 보자

```react
// ------------
// 첫 번째 렌더링
// ------------
useState('Mary')           // 1. 'Mary'라는 name state 변수를 선언합니다.
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
useState('Poppins')        // 3. 'Poppins'라는 surname state 변수를 선언합니다.
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect를 추가합니다.

// -------------
// 두 번째 렌더링
// -------------
useState('Mary')           // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
useState('Poppins')        // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.
```

첫 번째 랜더링에서  각 state에 값을 할당하고, useEffect안에 각 내용을 수행한다.

useEffect는 어떤 내용을 수행해야하는지 기억하고 있다.

두 번째 랜더링에서 `Mary, Poppins` 의 인자가 무시된다. 즉, 이미 state에 해당인자를 기억하고 있다. => 호출순서를 통해서.



만약 두 번째 랜더링때 아래와 같이 호출되면 어떻게 될까?

```react
useState('Mary')           // 1. name state 변수를 읽습니다. (인자는 무시됩니다)
// useEffect(persistForm)  // 🔴 Hook을 건너뛰었습니다!
useState('Poppins')        // 🔴 2 (3이었던). surname state 변수를 읽는 데 실패했습니다.
useEffect(updateTitle)     // 🔴 3 (4였던). 제목을 업데이트하기 위한 effect가 대체되는 데 실패했습니다.
```

State,Effect,State,Effect 순서로 기억하고 있었지만, State,State,Effect로 실행되어 순서가 한칸씩 밀려 버그가 발생하게 된다.

Hook를 호출할 때 최상단에서 호출하라는 의미가 위와 같다.

반복이나 조건문에 의하여 호출순서가 달라지면 버그가 발생할 수 있다. 그래서 반드시 hook은 최상단에 위치하며 호출순서를 변경되면 안된다.



# UseState

```react
const [state, setState] = useState(initalState);
setState(newState)
//state === initalState로 초기화 된다. 이는 초기랜더링에만 수행된다.
//initalState가 고비용이라면 한번만 수행될 수 있도록 함수를 작성할 수 있다.

const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});


```

다음 리랜더링 시 `useState`를 통해 반환받은 첫 번째 값은 항상 최신 state가 된다.

```typescript
type SetStateAction<S> = S | ((prevState: S) => S);
```

setState의 액션은 위와 같다. 콜백으로 prevState를 받고 이를 반환한다.

함수의 사용자는 상태를 직접 설정하거나 이전 상태를 인수로 사용하여 함수를 사용할 수 있습니다. => setState를 오버로드할 수 있다.

이렇게 오버로드하여 사용되거나, 재사용되는 것을 묶어서 사용하는 것을 커스텀 훅스라고 표현하는 것 같음.

[useState TS 참고](https://medium.com/ableneo/typing-of-react-hooks-in-typescript-947b200fa0b0)



함수적 갱신

```react
setState(prev => !prev);
```

이전 state를 사용해 새로운 state를 계산할 때 `setState`를 사용할 수 있다.

setState는 이전 state를 인자로 받는 콜백함수를 사용해 상태를 갱신하는건가?



# UseEffect

기본동작은 화면이 랜더링완료된 다음 수행되는 함수이지만 "어떤 값"이 "변경"되었을때만 실행되게 할 수 있다.

구독이나 타이머 ID와 같은, 화면에서 제거될 때 정리해야하는 리소스를 만들고 `useEffect`로 전달된 함수는 이를 "정리"하는 함수를 반환할 수 있다.

```react
useEffect(() => {
  const subscription = props.source.subscribe(); //구독생성
  return () => {
    // Clean up the subscription
    subscription.unsubscribe(); //구독정리 반환함수 => 컴포넌트 제거 이전에 수행됨.
  };
}[props.source]);
```

`useEffect(()=>{}`  effect로 구독을 생성하는 함수

`return () => {} ` 이를 정리하는 함수를 반환. => 메모리누수를 방지하기 위해서 컴포넌트를 제거하기 "이전"에 수행된다.

`[props.source]` 해당 값이 변경될 때만 `useEffect` 수행





# useReducer

useState의 "대체"함수

`(state, action) => newState` 형태로 리듀서를 받고 `dispatch` 메소드와 짝 형태로 state를 반환한다.

```react
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

다음 state가 이전 state에 의존적인 경우 `useState < useReducer` 선호한다.

```react
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

1. `reducer`의 초기 `initialState` 인 `{count: 0}`을 `Counter()`의 `state`에 반환한다.
2. 버튼이 클릭될 때 `dispatch`메소드가 호출되며 type을 프로퍼티로 갖는 객체를 `reducer`로 전달한다.
3. 조건문을 통해 해당하는 state를 갱신한다.
4. `Counter`의 state가 변경되었으므로 리랜더링되고 갱신된 값이 출력된다.





# useCallback

의존하는 값이 변경되지 않는 이상 함수를 반복생성을 메모이제이션을 통해 막는 hook

```react
const memoizedCallback = useCallback(() =>
  {
    doSomething(a, b);
	},
  [a, b],
);
```

메모이제이션된 콜백을 반환

컴포넌트안에 함수가 선언되어있을 때, 이 함수는 랜더링될 때마다 새로 생성되게 된다.

이 함수안에서 사용되는 값 즉, 함수가 의존하고 있는 값이 변경되지 않는다면 다음 랜더링에도 이 함수를 생성하지 않고 재사용할 수 있다.

의존하고 있는 값을 추적하기 위해서 `useCallback`의 2번째인자 배열안에 useEffect와 같이 인자를 넣는다.



[useCallback 설명](https://www.daleseo.com/react-hooks-use-callback/#:~:text=useCallback()%20%EC%9D%80%20%ED%95%A8%EC%88%98%EB%A5%BC,%EC%9E%AC%EC%82%AC%EC%9A%A9%ED%95%A0%20%EC%88%98%20%EC%9E%88%EA%B2%8C%20%ED%95%B4%EC%A4%8D%EB%8B%88%EB%8B%A4.)

# UseRef

애니메이션, 포커스 등 특정 DOM에 접근해야할 때 사용되는 Hooks.

`.current` 프로퍼티가 initValue에 의해 초기화된 mutable한 객체를 반환한다.

이 객체는 컴포넌트의 라이프타임에 관해 지속된다.

- 컴포넌트가 마운트되었을 때. 랜더링이 완료되었을 때 DOM에 접근가능하다.

```react
const ref = useRef(initValue);
```



예제

```react
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

- React는 `ref={myRef}` 를 통해  ref객체를 받게되면, React는 노드가 변경될 때마다 `.current` 속성을 해당하는 DOM노드로 설정한다.
  - 다시말해 useRef로 생성된 객체를 `return` 안에 있는 DOM노드에 `ref={myRef}` 를 통해서 React로 전달하게 되면 이에 해당하는 DOM노드로 `.current`를 설정하게 해준다. 즉, 전달이 되면 `.current` 는 그에 해당하는 DOM노드를 가리키게 된다. => DOM핸들링 가능하다.





## Forwarding Refs



ref 전달은 컴포넌트를 통해 자식 중 하나에 ref를 자동적으로 전달하는 기법.



공식문서 예제

```react
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 이제 DOM 버튼으로 ref를 작접 받을 수 있습니다.
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

예제1

```react
// EmailInput wraps an HTML `input` and adds some app-specific styling.
const EmailInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} type="email" className="AppEmailInput" />
));

class App extends Component {
  emailRef = React.createRef();

  render() {
    return (
      <div>
        <EmailInput ref={this.emailRef} />
        <button onClick={() => this.onClickButton()}>
          Click me to focus email
        </button>
      </div>
    );
  }

  // `this.emailRef.current` points to the `input` component inside of EmailInput,
  // because EmailInput is forwarding its ref via the `React.forwardRef` callback.
  onClickButton() {
    this.emailRef.current.focus();
  }
}
```

사견

Hooks인 useRef는 해당 컴포넌트에서 사용되는 특정 DOM을 조작하기 위해 사용했지만, 부모컴포넌트에서 생성한 ref를 하위 컴포넌트로 전달하기 위해 forwardingRef를 사용한다.

전달함으로써 부모에서 하위컴포넌트의 특정 DOM을 조작할 수 있다.

[참고](https://gist.github.com/jamesreggio/142215754ad06f375bd87657c6227ed8)