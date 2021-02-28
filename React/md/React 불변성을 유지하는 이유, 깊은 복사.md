# React 불변성을 유지하는 이유, 깊은 복사

---



리액트의 가상DOM을 이용해도 최적화해주지 않는다면 퍼포먼스는 하늘, 땅차이만큼 난다고 한다.

최적화 해주기 위해 먼저 불변성을 지켜야한다.



### 불변성

불변성을 지켜야하는 이유는 먼저 객 체나 배열에서 의도하지 않는 특정 객체가 변경되면, 참조하고 있던 객체도 변경되기 때문이고 무엇보다 **변경이 일어난 프로퍼티만** 비교해 최적화할 수 있기 때문이다.

리액트에서 최적화를 위해 사용되는 함수인 `shouldComponentUpdate()` 는 비교연산자를 통해서 이 컴포넌트를 리랜더링할지 말지에 대해 결정한다.

객체나 배열은 원시값과 다르게 `=` 을 사용하면 레퍼런스를 참조하게 된다.  만약 다음과 같은 코드가 있다고 해보자.

```js
let obj1 = {
	name: 'cho',
}

let obj2 = obj1;
obj2.name = 'seong';
obj1.name;// 'seong';
```

 이럴 때 obj2를 변경했음에도 obj1이 같이 변경된다. 같은 레퍼런스를 갖고 있기 때문이다.

그럼 obj1에 새로운 요소나 name이 변경되었다고 해보자. 그 때 `shouldComponentUpdate()` 는 단순히 비교연산으로 변경된 값을 확인할 수 있을까?



할 수는 있다 그러나 비교식이 엄청나게 길어질 것이다. 그리고 `=` 는 얕은 비교를 하기 때문에 1단계깊이만큼 밖에 확인하지 못한다. 따라서 어떤 값이나 요소가 추가되었다면 아예 새로운 레퍼런스를 만들어 내서 단순 비교를 하는 것이 좋다. 코드가 짧아지기 때문에.



```js
let obj2 = {
	...obj1,
	name: 'seong';
}
shouldComponentUpdate()...{
	obj1 !== obj2 //true
}
```





### 리랜더링은 shouldComponentUpdate()가 true일 때도 하고 다른 때일 때도 할텐데?



1. state 변경시
2. 부모컴포넌트 랜더링시
3. 새로운 props가 들어왔을 때
4. shouldComponentUpdate()
5. forceUpdate() .. etc



1,2번은 얕은 비교를 통해 새로운 값일 때 리랜더링을 수행한다고 한다. 이는 다음 state, pureComponent 정리 파일에서 확인해보자







- 한줄 요약 : 객체 레퍼런스 참조로 인한 사이드이펙트를 예방하고 값 변경이 일어났을 때 새로운 레퍼런스를 생성해서 레퍼런스 비교만으로 리랜더링의 여부를 결정지을 수 있기 때문에.





##### 클래스형 컴포넌트는 라이프사이클API인 shouldComponentUpdate를 사용하지만 hooks에서는 어떻게 사용하나?

```js
// Class
class Example extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }
}

// Hook
const Example = React.memo(() => {
    ...
}, (prevProps, nextProps) => {
    return nextProps.value === prevProps.value;
})

주의!
class 컴포넌트의 shouldComponentUpdate() 메서드와 달리, areEqual 함수는 props들이 서로 같으면 true를 반환하고, props들이 서로 다르면 false를 반환합니다. 이것은 shouldComponentUpdate와 정반대의 동작입니다.
```

- React.memo가 있네요.
- [클래스, 훅스 라이프사이클 비교 정리](https://salgum1114.github.io/reactjs/2019-11-28-react-class-equivalents/)







