# React 랜더링 테스트

---



props는 부모로부터 받아온 것

state는 컴포넌트 내부의 값이라고 했다. 이 둘이 변경되었을 때 컴포넌트는 리랜더링된다고 한다.

또한 부모 컴포넌트가 변경되었을 때 이에 대한 자식도 변경된다고 한다. 여기서 이 3가지 예제의 코드를 작성해보며 렌더링에 관련한 테스트를 해본다.





### props가 변경되었을 때

- 부모로부터 받은 props가 변경되었을 때 어떻게 되는지 알아본다.

```js
function App() {
  const [value, setValue] = useState(0);
  const onIncrese = () => {
    setValue(value + 1);
  };
  return (
    <>
      <div className="App">
        <Props value={value}></Props>
        <button onClick={onIncrese}>App.js: Props변화</button>
        <br></br>

      </div>
    </>
  );
}

//Props.js
const Props = ({value}) => {
  return (
    <h1>Props.js : {value}</h1>
  );
}

```

- App.js와 Props 컴포넌트 둘 다 랜더링됨.

- 부모의 props가 변했기 때문에 부모컴포넌트가 리랜더링됨.



### State가 변경되었을 때

```js
const State = () => {
  const [value, setValue] = useState(100);

  const onDecrese = () => {
    setValue(value - 1);
  }
  return (
    <div>State.js
      <h1>{value}</h1>
      <button onClick={onDecrese}>State.js Decrese btn</button>
    </div>    
  );
}
```

State를 가지고 있는 컴포넌트내 모든 요소가 리랜더링됨





### 부모가 변경되었을 때

이를 모두 담고있는 App.js의 상태가 변경되었을때, 즉 리랜더링될때 하위에 있는 자식컴포넌트 모두 리랜더링됨

App.js의 상태를 Props로 받는 Props 컴포넌트가 출력하는 데이터 {value} 하나 변화했을 뿐인데 모든 컴포넌트가 리랜더링된다. => 정말 비효율적.

그럼 어떻게 Props 컴포넌트만 랜더링시킬 수 있을까?

할 수 없다. Props는 부모의 value를 받아오므로 이가 변경되면 같이 리랜더링된다.



그럼 자식이지만 props도 받지않고 state도 변경되지 않는 컴포넌트는 어떻게 리랜더링을 막을 수 있을까? 예제는 다음과 같다.



```js
const Parent = () => {
  console.log('Parent 시작');

  const [value, setValue] = useState(66);
  useEffect(() => {
    console.log("Parent Component");
  });
  const onIncrease = () => {
    setValue(value + 1);
  };
  return (
    <>
      <div>
        Parent Section
        <button onClick={onIncrease}>Parent.js Increse</button>
        <Child></Child>
        <Child2></Child2>
      </div>
    </>
  );
};

//Child.js
const Child = () => {
  console.log('Child1 시작');
  
  useEffect(() =>{
    console.log('Child 1 Component')
  })
  return (
    <>
    <h4>memo로 감싸여진 I'm child 1-1</h4>    
    <h4>memo로 감싸여진 ₩I'm child 1-2</h4>    
    </>
  );
}
export default React.memo(Child);
//Child2.js
const Child2 = () => {
  console.log('Child2 시작');

  useEffect(() =>{
    console.log('Child 2 Component')
  })
  return (
    <>
    <h4>I'm child 2-1</h4>    
    <h4>I'm child 2-2</h4>    
    </>
  );
}
export default Child2;
```

부모 컴포넌트가 Child컴포넌트를 갖고 있다.

Child1은 React.memo를, 2는 아무것도 씌우지 않은 상태이다.

부모컴포넌트의 state를 변화시켰을 때 원래대로라면 Child1, 2둘다 리랜더링이 되었으나 React.memo로 감싸준 Child1은 랜더링되지 않았다.





그렇다면 현재 App.js의 State가 변경될 때 **모든** 컴포넌트가 리랜더링되는 현상이 발생하고 있는데 props도 받지 않고 사용하지도 않는 컴포넌트들에게 React.memo를 씌우면 리랜더링이 안되지 않을까?

- 맞다. Props를 받는 Props.컴포넌트는 씌워도 상관없을 것이라고 예상했지만 예상이 맞았고 나머지 컴포넌트들은 예상대로 리랜더링 되지 않았다.
- React.memo에 대해서 자세히 알아보고 HOC라는데 이에 대해서도 자세히 알아봐야겠다.

