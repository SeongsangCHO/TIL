# Reusable Modal with React Hooks and portals

---



### Portals

UI를 어디에 랜더링시킬지 DOM을 사전에 선택.

부모 컴포넌트 DOM 계층 밖에 있는 DOM 노드로 자식을 렌더링하는 방법.

react의 app 컴포넌트 하위에 모달을 작성하지 않고 부모에 종속되지않고 같은 레벨로서 컴포넌트를 정의해 어디서든지 해당 모달을 랜더링할 수 있도록 함. => 계층구조에 종속되지 않으면서 컴포넌트 랜더링

부모컴포넌트의 하위로써가 아닌 시각적으로 바깥에 출력하고 싶을 때 사용됨



- Modal
- Tooltips
- Hovercards
- Loaders



포탈은 다음과 같은 방법으로 생성한다.

`ReactDOM.createPortal(child, container)`

예제는 다음과 같음.

```react
const Modal =({ message, isOpen, onClose, children })=> {
  if (!isOpen) return null
  return ReactDOM.createPortal(    
    <div className="modal">
      <span className="message">{message}</span>
      <button onClick={onClose}>Close</button>
    </div>,
    domNode) //document.body,, etc.. (container)
}

```

부모 밖에 있음에도 불구하고 일반적인 컴포넌트와 유사하게 동작한다

Portal이 react tree 구조에 있기에 Props, context API로 접근가능하다.



모달을 특정 요소안에서 사용할 때 모달의 높이, 길이가 그 상위 컴포넌트에 한정, 상속된다.

그래서 모달이 잘리거나 제대로 표시되지 않을 수 있다.

전통적인 해결법은 `overflow-hidden, z-index`로 해왔다.







### 고려사항

- 보통 이벤트버블링이 발생 - 포탈 노드 위치상관없이 발생할 수 있음.
- 리액트 라이프사이클  제어 - 포탈을 통해 child 요소가 랜더링 될 때 리액트는 여전히 라이프사이클을 제어
- 포탈은 오직 DOM구조에만 영향을 미침. - React component tree에 영향을주지 않고 오직 HTML DOM에만 영향
- HTML 마운트 지점 미리 정의 - 포탈을 사용할 때 포탈컴포넌트의 마우느 지점으로써 HTML DOM요소를 정의해야한다.









##### 참고

- https://sandstorm.de/de/blog/post/reusable-modal-with-react-hooks-and-portals.html
- https://blog.bitsrc.io/understanding-react-portals-ab79827732c7





