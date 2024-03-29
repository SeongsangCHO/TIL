# React Props, State, pureComponent

---



컴포넌트에서 다루는 데이터 2가지.



부모에서 자식으로 전달하는 props, 자식은 props를 수정할 수 없다.

컴포넌트 내부에서 선언하고 변경할 수 있는 state



### state 관련 Hook, useState

```js
 setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
```

객체를 state에 넣을 때 spread연산자로 이 전값들을 대체할 수 있다.





### 리랜더링 시점

1. state 변경시
2. 부모컴포넌트 랜더링시
3. 새로운 props가 들어왔을 때
4. shouldComponentUpdate()
5. forceUpdate() .. etc



아무것도 작성하지 않고 기존의 React.component를 상속받아 작성한 컴포넌트라면 state값이 1로 계속 업데이트 되어도 계속해서 리랜더링을 수행하게 될 것이다.

그렇다면 pureComponent를 상속받아 작성한 컴포넌트는 어떻게 될까

#### React.pureComponent  = React.Component + shouldComponentUpdate

- `shouldComponentUpdate` 가 이미 적용된 React.Component이다.
- `shouldComponentUpdate` 수행시 얕은 비교를 수행.



React.PureComponent는 state, prop이 불변일 때 (객체- 객체는 const로 선언되어도 내부의 프로퍼티는 변경될 수 있기에 spread를 사용한다) 사용할 수 있다.

그러나 object는 레퍼런스로 비교하기에 적절치 못하게 사용될 수 있다고 한다.  다음 예제를 보자

```js
pureComponent...
{this.setState({test:1})} => 얕은 비교로 변경되지 않음을 확인함

{this.setState({test: {testValue : 1}})}; => 레퍼런스는 계속 다르다고 체크해 리랜더링은 계속 일어남.
```





### 테스트

`npm run build -- --profile` 로 빌드하고 `npm i -g serve`, `serve - s build`  로 배포할 로컬서버생성후 react- dev tools로 리랜더링되는 컴포넌트 확인





```js
function App() {
  return (
    <>
      <div className="App">
        <div>IS rendering?</div>
        <Number/>
      </div>
      <div>section 2</div>
    </>
  );
}

//Number.js
import React, { useState } from "react";

function Number() {
  const [value, setValue] = useState(0);
  const onIncrease = () => {
    setValue(value + 1);
  };
  return (
    <>
      <button onClick={onIncrease}>increase</button>
      <div>{value}</div>
    </>
  );
}

export default Number;

//export default React.memo(Number);
```

- Number의 button, value태그 리랜더링됨.
- React.memo추가시 profile에 변경되는 요소가 달라짐, (보이지 않음)