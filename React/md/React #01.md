## React #01 

<br>

## 0. 리액트??

<br>

리액트는 프론트엔드 라이브러리.

정적 웹을 위해선 HTML + CSS로만으로 만들 수 있음.

사용자의 행동에 따른 동적 웹은 JS를 더해 구현함.

규모가 커진다면, DOM에 접근해야하고, 관리, 코드 정리하기에는 매우 힘들고 복잡해짐.

이런 작업을 최소화하고 오직 개발에만 집중할 수 있도록 하는것이 라이브러리, 프레임워크

리액트는 **컴포넌트**에 집중된 라이브러리









## 1. 개발환경구축

<br>

node.js설치, npm설치 후 react-app 설치합니다.

```
$ npx create-react-app 생성할프로젝트네임
$ create-react-app -v // 버전확인
```

<br>

### 1.1 디렉토리에 세팅하기

리액트에서는 디렉토리이름을 맞춰주어야합니다.

'react-app'이름의 디렉토리를 만들고해당 폴더 내에서 다음 명령을 작성하면 세팅이 완료됩니다.

```
$ create-react-app .
$ npm run start // 프로젝트 실행
```





+ npx을 사용하면, 로컬에 설치하지 않고도 항상 최신버전으로 create-react-app을 사용할 수 있습니다.



### 1.2 설치없이 웹에서 사용 - code sandbox

별도의 설치없이 리액트를 사용할 수 있습니다.

- [웹환경 리액트 실습](https://codesandbox.io/s/y2lrywpk21)

<br>

## 2. 용량을 축소시켜 배포하는 법

<br>

npm run start로 서버를 구동했을 때 전송되는 용량은 생각보다 큽니다.

개발할때는 상관없지만, 배포할때는 npm run build로 수행합니다. 

build폴더가 생기고 하위에 html파일이 생깁니다. 공백없이 불필요한 용량을 제거한 파일입니다.

```
$ npx server -s build
```

를 수행하면 용량이 압축된 상태로 배포가 진행되고 접속할 수 있는 URI를 출력해줍니다.

결과물은 같습니다.

<br>



## 3. 컴포넌트

<br>

컴포넌트란? 

UI를 구성하는 작은 단위. 이 컴포넌트들이 모여 사용자에게 하나의 UI를 제공함.

컴포넌트는 하나의 최상위 태그만 존재해야합니다.



```react
 return (  
<div className="App">
        {/* 주석 사용방법 */}
        <Subject></Subject>
        <TOC></TOC>
        <Content></Content>
 </div>
	
  <div>
	이렇게하면 에러
 </div>
 );
```

<div>의 최상위 태그만 존재할 수 있습니다.



<br>

#### 3.1 props, state

부모컴포넌트에서 자식으로 값을 주는 것이 props입니다.

```react
///App.js
class App extends Component {
  render() {
    return (
      <MyName name="secho" />
    );
  }
}
/// index.js
class MyName extends Component {
  render() {
    return (
      <div>
        my name is <b>{this.props.name}</b>
      </div>
    );
  }
}
```

App.js에서 name을 secho로 설정하고 MyName이라는 컴포넌트를 사용합니다.

해당 컴포넌트가 선언된 index.js에서는 this.props의 name속성의 값을 받아올 수 있습니다.

즉, App이라는 부모 컴포넌트가 MyName 컴포넌트를 사용할 때, secho라는 값을 자식에게 주고, 자식은 props의 name속성에 해당하는 secho값을 받아 render하는 것입니다.



<br>

state는 데이터를 동적으로 이용할 때 사용합니다.

state의 값을 바꾸기 위해선 무조건 setState메소드를 거쳐야합니다.

구조는 다음과 같습니다.

```react
class Counter extends Component {
  state = { 
    number: 0
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}
```

현재 클래스에 선언된 handle *이벤트를 버튼의 onClick이벤트에 설정하고, 수행합니다.

해당 함수를 호출하게 되고, state값을 바꾸기위해 setState 메소드를 호출하게 됩니다.

해당 내용은 각각 number라는 속성의 값에다가 현재 state의 number값을 더하거나 빼주는 기능을 정의합니다.

state, props는 값이 바뀌게 되면 페이지내용을 리랜더링하므로, state의 name속성을 ''으로 초기화해주는 내용까지 수행하게됩니다.

<br>

#### 3.2 함수형 컴포넌트

단순하게 props만 받아와서 보여주는 코드는 간편하게 작성할 수 있습니다.

클래스로 작성하는 컴포넌트방식과 아래에 해당하는 함수컴포넌트방식이 존재합니다.

```react
const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 {name} 입니다.
    </div>
  );
};
```

두가지방식에는 차이가 존재하지만 ~~아직 이해하기 어렵..~~ 학습을 진행하면서 이해하도록...



<br>

#### 3.3 컴포넌트 분할



작성한 컴포넌트들은 src폴더의 하위에 component폴더를 생성하여 파일별로 분할해줍니다.

컴포넌트를 상속받기 위한 import와 컴포넌트를 외부에서 사용할 수 있도록 하는 export를 명시해주고 해당 컴포넌트를 불러올 파일에서 import "컴포넌트명" from "경로";를 지정하면 사용할 수 있습니다.

```
import React, {Component} from 'react';

export default "컴포넌트명";
```





[참고페이지](https://velopert.com/3629)
