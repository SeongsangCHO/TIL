# React  HOC, React.memo

---





### HOC?



Higher Order - Component로 컴포넌트를 인자로 받아 새로운 컴포넌트를 다시 return해주는 **함수**

코드의 반복을 줄이고, 로직과 뷰를 분리하기 위한 목적으로 사용됨.





### 예제

- 로그인 되어있을 때 로그아웃 버튼만 출력하고 반대의 경우 로그인, 회원가입 버튼을 출력하고자 한다.

```react
//app.js
<NavItem to="/" show={true} text="root"></NavItem>
<NavItem to="login" show={!user} text="로그인하기"></NavItem>
<NavItem to="resgister" show={!user} text="회원가입하기"></NavItem>
<NavItem to="logout" show={user} text="로그아웃"></NavItem>
```

- NavItem의 내부는 다음과 같다

```react
//NavItem.js
const NavItem = ({ to, show, text }) => {
  return (
    <li>
      {show && <a href={to}>{text}</a>} or {show ?  <a></a> : false;}
    </li>
  );
};
```

- 두가지 방법으로 조건부렌더링을 수행할 수 있다. 원래 예상한대로 로그인 여부에 따라 a태그가 조건이 걸려 렌더링됨을 확인할 수 있었다.

- HOC는 컴포넌트를 인자로 받아 새로운 컴포넌트를 리턴하는 함수라고 했다.
- NavItem 자체를 인자로 넘겨 새로운 컴포넌트로 반환해서 사용해보자

```react
//NavItemShowHOC.js
function NavItemShowHOC(WrapperedComponent){
  return function showWrapped(props){
    return props.show && <WrapperedComponent {...props}/>
  }
}

export default NavItemShowHOC;

//NavItem.js
export default NavItemShowHOC(NavItem); // 인자로 컴포넌트를 넘겨준다

```



- 인자로 컴포넌트를 받는 함수를 작성하고, props를 그대로 갖는 컴포넌트를 반환할 수 있도록 작성한다
- 이 예제로 컴포넌트 단위의 조건부렌더링을 수행할 수 있다.
- `{show && <NavItem ...props>...</NavItem>}` 이 된 것..



사실 이 예제로 코드가 줄었느니.,,라고 할 순 없는 것 같다.

이 글이 반복코드를 줄여주는 예제다 [예제](https://velopert.com/3537)



### React.memo 

- 사용법

```js
const MyComponent = React.memo((props) => {
	return (/*컴포넌트 렌더링 코드*/)}
);

export default React.memo(타겟컴포넌트, [함수]);

두 번째 매개변수에는 함수를 넣어주거나, 아무것도 전달하지 않으면 된다.

 

전달하지 않으면(null), 해당 컴포넌트는 props의 변화로는 업데이트되지 않는다.

(클래스 컴포넌트에서 shouldComponentUpdate의 바로 아래에 return false를 입력한것과 비슷하다고 보면 된다.)


함수를 전달할 경우, 해당 함수에는 이전 Props와 다음 Props가 전달되고 해당 값을 비교하여 리렌더링이 필요한지 아닌지를 나타내주면 된다.

따라서, prop의 원하는 값을 비교하여, 업데이트가 필요한 값을 비교해주면 된다.

(해당 함수가 true를 리턴하면 리렌더링하지 않고, false를 리턴하면 리렌더링한다)

출처: https://satisfactoryplace.tistory.com/122 [만족]
```

컴포넌트의 **Props가 바뀌지 않았다면** 불필요한 리랜더링을 방지해준다.

만약 컴포넌트가 같은 props를 받을 때 같은 결과를 렌더링한다면 React.memo를 사용하여 불필요한 컴포넌트 렌더링을 방지할 수 있다.

React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.



React.memo는 오직 props가 변경됐는지 아닌지만 체크한다. 오직!

- State가 변경되면 그때마다 리랜더링됨.

- Props로 들어온 값은 얕은 비교로 비교된다.





##### 참고

- https://developer-alle.tistory.com/301#:~:text=HOC%EB%9E%80,%EC%9C%84%ED%95%9C%20%EB%AA%A9%EC%A0%81%EC%9C%BC%EB%A1%9C%EB%8F%84%20%EC%93%B0%EC%9D%B8%EB%8B%A4.

- https://sustainable-dev.tistory.com/137

- https://ui.toast.com/weekly-pick/ko_20190725
- https://code-masterjung.tistory.com/67
- https://xiubindev.tistory.com/103#:~:text=%EB%94%B0%EB%9D%BC%EC%84%9C%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98%20%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81,%EA%B0%80%20%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81%20%EB%90%A0%20%EA%B2%83%EC%9D%B4%EB%8B%A4.





