# React 기초질문



---





### 컴포넌트란?

앱을 다루는 최소단위로써 데이터(state, props)를 입력받아 DOM노드를 출력하는 함수.



컴포넌트의 종류 (7종류)

- 함수형 컴포넌트

  - 함수형 컴포넌트 == 자바스크립트 함수
  - 다른 컴포넌트와 interact할 필요가 없을 때 사용

  ```react
  function Title () {
  	return <h1> I am Title </h1>
  }
  ```

  - Hooks와 같이 state 상태관리를 지원하는 API를 이용해 클래스형 컴포넌트처럼 life cycle에 맞춰서 사용할 수 있음.

- 클래스형 컴포넌트

  - props, state, 생명주기 함수가 들어있음

  - ```react
    class Title extends React.Component 
    { 
        render () { 
              return <h1> I am Title </ h1>; 
        } 
    }
    export default Title;
    ```

    

- Higher-Order 컴포넌트 (HOC)

  - 컴포넌트를 인자로 받고, 이를 반환하는 컴포넌트

  - ```react
    const hoc = (MyComponent) => (props) => { 
      return ( 
        <div> 
          <MyComponent {... props}> 
            {props.children.toUpperCase ()} 
          </ MyComponent> 
        </ div> 
      ) 
    }
    ```

  - `MyComponent`를 인자로 받고 해당 컴포넌트의 props를 전달받아서 재사용한다.

  - [예제 2](https://darrengwon.tistory.com/499)

    - 각 url에 대한 비동기요청의 응답을 받아오는 작업을 Post 컴포넌트와 분리할 수 있다.
    - url과 반환될 컴포넌트만 변경시키면 비동기요청에 대한 전용 컴포넌트를 생성할 수 있다.

- Dumb 컴포넌트

  - 상태없는 함수형컴포넌트. 랜더에 필요한 어떤 컴퓨팅자원을 사용하지 않음.

  - 오직 render 메소드만 있고 일종의 JS함수일 뿐이다.

  - 상태가 없기에 감시하지 않고 사용하면 출력되는 컴포넌트

  - 일종의 presentational component

  - ```react
    export default Title => () => (
        <h1>I am Title</h1>
    );
    ```

    

  

- Smart 컴포넌트

  - 컴포넌트 상태를 관리하는 "클래스 컴포넌트"

  - 상태를 추적한다 == 스마트하다. => 상태를 갖는 클래스 컴포넌트는 스마트컴포넌트다.

  - 상태를 갖지않고 render함수만 정의된 컴포넌트는 Dumb컴포넌트다.

  - 상태가 있기에 추적당함.

    ```react
    export default title => class MyComponent extends Other.Component { 
      render () { 
        return ( 
          <h1> I am Title </ h1> 
        ); 
      } 
    }
    ```

  - 클래스형과 다른점은 export

- Presentational 컴포넌트

  - UI만 랜더링하는 상태를 갖지않는 컴포넌트 === JS함수

  - ```react
    const List = props =>   
          (<ul>     
             {props.list.map (user =>   
                (<li> {items} </ li>)) 
             } 
          </ ul>)
    ```

    

- Container 컴포넌트

  - Presentaional 컴포넌트에 데이터 및 동작을 제공하는 클래스컴포넌트.

  - 컨테이너는 데이터를 가져오고, 하위 구성요소를 랜더링한다.

  - ```react
    class ListContainer extends React.Component { 
    constructor ()   
       {   this.state 
        = {     
           items : []      
        } 
      }   
    componentDidMount () {     
        axios.get ( '/ list'). then ( 
           items => this.setState ({list : items} ))      
        )   
    } 
    render () { 
      return <Usersusers = {this.state.items} />    
      }}
    ```

  - 상태가 생성되고, 마운트가 완료되면 비동기요청을 보내 데이터를 받는다.

  - 상태가 변경되었으므로 리랜더링이 실행되고 해당 state로 하위 `Userusers` 컴포넌트에 props를 전달한다. (표현 컴포넌트에 전달)

  - 하위 컴포넌트는 이 데이터를 받아 그리기만한다.(렌더링만 수행)

  - 여기서 비동기요청을 Pure Component화 하여 비동기요청만을 수행하는 HOC로 감싸줄 수 있다.

  

- Pure 컴포넌트

  - Component 클래스를 상속받음.(항상 render() 호출되는 반면, PureComponent클래스를 상속받아 작성된 컴포넌트는 아래의 함수를 통해 render 수행)
  - `shouldComponentUpdate()` 함수를 얕은 비교하도록 재정의하여 얕은 비교를 통해 데이터 변경된 경우에만 render함수 호출.



[리액트 7가지 컴포넌트 종류 출처](https://medium.com/wesionary-team/types-of-react-components-you-should-know-251cceacd8ac)

[Children은 props의 종류일뿐 공식문서](https://reactjs-kr.firebaseapp.com/docs/composition-vs-inheritance.html)



### State, Props?

컴포넌트에서 다루는 데이터.

state는 컴포넌트 내부에서 선언하고 이를 변경할 수 있다.

props는 부모가 자식에게 전달하는 값이다.





### 불변성이란?

기존의 값을 그대로 유지하면서 새로운 값을 추가하는 것으로 객체생성 이후 그 상태를 변경할 수 없는 디자인 패턴.



원시타입은 함수의 인자로 넣었을 때 메모리에 새로 할당해 이를 전달하는 `call by value`이지만, 객체나 배열의 경우 레퍼런스를 전달하는 `call by reference` 방식이 사용된다.



어떤 함수가 객체의 프로퍼티의 값을 변경했다고 해보자.

나중에 사이즈가 커졌을 때 어디서 어떤 함수로 인해 이 프로퍼티값이 변경되었는지 디버깅하기 어렵다. 또 리액트에서는 상태변화를 통해 리랜더링하는 과정을 사용하는데, 프로퍼티값이 변경되었음에도 불구하고 동일한 레퍼런스이기 때문에 값이 변경되도 리랜더링되지 않는다.



간략하게 줄이면, 디버깅하기 어렵고, 상태변화를 추적할 수 없다.

언제? 배열이나 객체처럼 `call by reference` 에서 값을 변경했을 때.

왜? 같은 레퍼런스이므로 값이 변경되어도 변화를 감지할 수 없어서.



리액트에서 불변성을 지킨다는 것은 값이 변경되었을 때, 원본 상태를 훼손시키지 않고, 배열, 객체의 레퍼런스를 새로 반환하는 것과 같다고 생각한다.

그러나 흔히 사용하는 `spread, object.assgin`은 얕은 복사를 통해 1depth만큼의 복사만 되고 프로퍼티내 객체가 존재하면 이를 같은 레퍼런스로 보기에 2depth 비교는 할 수 없다.



불변을 지키면서 2depth구조의 객체 상태를 변화시키기 위해서는

```js
let state = {
	...state,
	name:{...name}
}
```

위와 같은 방식으로 중첩해서 사용해야한다.

이와 같이 얕은 비교를 spread연산자로 할 수 있다.

만약 10depth면 저 과정을 9번 더 해야한다. (끔찍스)



그래서 `Immer`와 같은 불변성 유지를 편하게 해주는 라이브러리를 사용한다.

[참고](https://evan-moon.github.io/2020/01/05/what-is-immutable/)



### 순수컴포넌트

컴포넌트는 항상 render를 다시 실행하지만, 동일한 props, state에 대해 동일한 결과를 랜더링한다면 render를 다시 실행하지 않아 성능향상을 누릴 수 있다.

HOC로써 props, state의 변경을 확인하는 `shouldComponentUpdate`를 구현하지 않고 내부에서 수행한다.

얕은비교를 하므로 깊은 차이가 있을 때 사용에 주의해야한다.



잘못 사용하는 예시(컴포넌트보다 성능이 더 나빠질 수 있다.)

- 인라인함수를 render메소드 내에 쓰면 매 렌더링마다 함수인스턴스가 새로 생성된다.

- 매 render실행마다 props로 넘어오는 함수가 모두 다르다는 것이고 얕은 비교를 통해 항상 다르다는 결과를 반환한다.

- ```js
  <Input onChange={()=>setState()}/>
  - 함수 인스턴스가 매 랜더링마다 생성.
  - props.onChange가 이전 레퍼런스와 다름
  - 매 랜더링마다 리랜더링됨.
  ```







### Portal Component

컴포넌트는 계층적으로 부모 하위에 있다.

모달과 같은 창은 부모 위에서 출력되어야 하는데 계층구조상 하위에 있기 때문에 position, z-index를 사용해도 위로 덮어씌우며 출력될 수 없다.

이때 사용되는 것이 Portal Component다.

논리적으로 하위컴포넌트여야 하는데 시각적으론 상위 컴포넌트를 덮어야할 상황일 때 사용한다.

[pure, portal Component 참고](https://hyunseob.github.io/2019/06/02/react-component-the-right-way/)