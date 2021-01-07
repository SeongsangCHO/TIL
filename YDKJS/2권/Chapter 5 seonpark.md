# Chapter 5 프로토타입

## [[prototype]]
[[prototype]]이라는 내부 프로퍼티가 있고, 다른 객체를 참조하는 단순 레퍼런스

```javascript
var otherObj = {
    a: 2
};

var myObj = Object.create(otherObj);

myObj.a // 2
```

[[Get]], [[Put]] 프로퍼티가 없는경우 [[Prototype]] 링크를 따라가게 된다.

1. myObj의 a [[Get]] 을 찾는다.
2. myObj의 a [[prototype]] 을 찾는다.
3. 연결되있는 otherObj의 a [[prototype]] 을 찾는다 => 발견
4. 상위 Object에서 a [[prototype]] 을 찾는다.
5. 발견되지 않으면 [[Get]]의 결과값으로 undefined를 리턴한다.

### Object.prototype

[MDN Object.prototype](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

### 프로퍼티 세팅과 가려짐

```javascript
myObject.foo = "bar"
```

위의 코드는 myObject의 foo프로퍼티의 값을 수정할 뿐이다.

myOjbect에 foo라는 프로퍼티가 없다면 세가지 동작중 한가지를 한다.
1. [[Prototype]] 연쇄 상위의 foo라는 일반 데이터 접근 프로퍼티가 있지만 writable이 false가 아닌경우 myObject에 foo를 새로 추가하여 **가려짐 프로퍼티** 가 된다.

2. [[Prototype]] 연쇄 상위 수준에 foo가 읽기전용(writable: false)이면 가려짐이 발생하지 않는다.

3. [[Prototype]] 연쇄 상위에서 foo 세터가 발견되면 항상 이 세터가 호출된다.

### 가려짐은 암시적으로도 발생한다.
```javascript
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty( "a" ); // true
```

myObject.a = myObject.a + 1 이기 때문에 가려짐발생

## 클래스

### 클래스함수
```javascript
function Foo() {}

var a = new Foo();
Object.getPrototypeOf(a) === Foo.prototype // true
```
new키워드 기능중 하나가 prototype연결이다.

### 프로토타입 상속?

이 단어때문에 자바스크립트 체계에 혼란을 주었다.

상속은 기본적으로 복사를 수반하지만 자바스크립트는 복사가 아닌 링크를 하여 접근할수있도록 위임한다.

자바스크립트의 객체-연결 체계를 상속보단 **위임**이라 말하는게 더 명확하다.

### 생성자
```javascript
function Foo () {console.log('Foo')}
let a = new Foo();
```

Foo.prototype 객체에 기본적으로 .constructor가 세팅된다.

그 세팅된 값은 자신을 생성한 함수를 가리킨다고 한다.

new 를 붙여 Foo함수를 호출하고 객체가 생성되는걸 볼수있다.

그럼 Foo는 생성자라고 봐야할까??

책에서는 Foo는 그저 함수이고 **부수적인 효과**로 Foo 객체가 생성하는것이라 한다.


[나머지내용](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch5.md#constructor-redux)

나머지내용은 constructor의 연쇄작용에 대한 내용이다.

**자바스크립트에스 생성자는 생성됨을 의미하는게 아닌 prototype 레퍼런스를 가진 함수를 임의로 가리킨다는 뜻**

constructor 또한 prototype안에 함수이기 때문에 순회검색을 하게되어 임의로 가르킬수 있다는것 같다.




