# Chapter 3 객체

---

> 객체에 대해서 자세히 다룬다.



### 3.1 구문

객체는 선언적, 생성자형식으로 정의할 수 있다.

```js
let obj = {
  //선언적
  a: 2,
}

let obj = new Object(); // 생성자
obj.a = 2;

```



생성자처럼 정의하면 프로퍼티를 일일히 나열해야하므로 비추천.



### 3.2, 3.3 타입과 내장객체

JS에는 7가지 원시타입이 존재한다. Unbonss 

언디파인드, 널, 불리언, 오브젝트, 넘버, 스트링, 심볼

이 타입들은 메소드를 가질 수 없는 것이다.



내장 객체로 위의 원시타입과 대응되어보이지만 실제는 그렇지 않다.

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

이 객체들은 클래스처럼보이지만 각각 생성자로 사용되어 하위타입의 새 객체를 생성하는 역할을 한다.

```js
let strPrim = "hi";
typeof strPrim' // "string"
strPrim instanceof String; // false

let strObj = new String("hi");
typeof StrObj; // "Object"
strObj instanceof String; //true

Object.prototype.toString.call(strObj); // [object String]
```

원시타입에서 메소드를 사용할 수 있는 것은 그때 래퍼객체로 감싸여져서 사용할 수 있는 것이고, 내장 객체로 아예 새로운 객체를 선언하면 메소드로 사용할 수 있다. 

객체 래퍼로 (new String())으로 형변환되어 사용 가능 => 래퍼객체

new연산자기능인  생성자호출로 인해 생성된 인스턴스이기 때문에 메소드를 사용할 수 있다.



래퍼객체 형식이 없는  null, undefined가 그 자체로 유일한 값.



### 3.3 내용

객체에는 프로퍼티로 내용이 채워진다.

프로퍼티명은 값이 있는 곳을 가리키는 포인터 역할을 한다.

```js
let obj = {
  a : 2,
}
obj.a;
obj["a"];
```

`.`이나 `[]`으로 프로퍼티 접근할 수 있다.

`[]`는 좀 생소한데. 유니코드문자면 안에 뭘 쓰든 접근할 수 있다.

예를들어, 프로퍼티명이 data-item이면 기본적인 `.`으로 접근할 수 없지만 `[]`은 가능하다.

따라서 앞에 prefix를 붙여서 프로퍼티 접근을 유용하게 사용할 수 있다.

```js
const prefix = "data";
let obj = {
  [prefix + "item"] : 'he',
  [prefix + "category"] : 'cl',
}
```

접근하는 프로퍼티명은 모두 문자열로 변환되니 숫자를 쓰는것은 조심할것.



### 3.3.3 배열

배열에도 프로퍼티를 추가할 수 있으나 길이에는 영향을 미치지 않는다.

```js
let array = [1,2,3]
array.length; // 3
array.foo = "baz";
array.length; // 3
```



### 3.3.4 객체복사

객체복사에는 얕은, 깊은복사가 있다.

```js
let obj = {
  a:2,
  b:anotherObj,
  c:anotherArray,
}
anotherArray.push(anotherObject, obj);
```

위의 객체를 얕은복사를 진행한다면, a값과 나머지 b,c의 값도 복사하는데 이때 레퍼런스만을 복사한다.



그러나 깊은복사를 하면,  obj뿐만이 아니라 anotherArray, Obj를 모두 복사한다.

현재 anotherArray이 anotherObject, obj를 가리키는 레퍼런스가 있으므로, 이들까지 함꼐 복사되어 환형참조 형태로 무한복사로 빠져버린다.



해결법으로 JSON으로 복사할 수 있지만 표준은 아니다.

```js
let newObj = JSON.parse(JSON.stringify(someObj))
```

그리고 직렬화 <- -> 역직렬화가 가능한 안전한 객체여야 한다.



얕은 복사로는 ES6부터 `Object.assign()` 메소드를 제공한다.

```js
let obj = Object.assign({}, myObj); //복사될 객체, 복사소스객체
obj.a; // 2
obj.b; === anotherObj; // true
```



### 3.3.5 프로퍼티 서술자

프로퍼티에는 각 특성이 있다. 이를 확인할 수 있는데 이는 프로퍼티 서술자로 표현된다.



- writable : 쓰기가능
- enumerable :열거가능
- configurable : 설정가능

`Object.defineProperty()` 로 특성 추가 및 수정할 수 있다.



#### writable

해당 특성이 false이면 프로퍼티 값을 쓸 수 없다

```js
let obj = {};
Object.defineProperty(obj, "a",{
  value:2,
  writable: false,
  configurable:true,
  enumerable: true,
});

obj.a = 3; // 쓸 수 없음
obj.a; // 2
```





### configurable

true면 프로퍼티 서술자를 변경할 수 있다.

false면 두번다시 변경할 수 없으며 변경시도시 타입에러 발생하고 `delete` 연산자도 사용할 수 없다.

```js
Object.defineProperty(....
	writable:true;
	configurable:false...;);

obj.a ; //2
obj.a = 5;
obj.a; //5 쓰기가능

Object.defineProperty(....
	writable:false;...);
//typeError
```



### enumerable

for in과 같은 열거구문에서 프로퍼티가 보여질지를 결정한다.

false로 지정하면 열거구문에서 접근할 수는 있지만 해당 구문에서는 감춰진다.



---

### 3.3.6 불변성

프로퍼티/객체가 우연, 의도적이든 변경되지 않게 할 경우가 있다.

그러나 타 객체를 가리키는 레퍼런스에 대해서 해당 객체까지 불변으로 만들지는 못한다.

```js
obj.foo; //[1,2,3]
obj.foo.push(4);
obj.foo; //[1,2,3,4]
```

obj는 불변이더라도 foo까지 불변이 아니기 때문에 변한다.



#### 객체상수

writable, configurable 를 false하면 프로퍼티를 상수처럼 쓸 수 있다.

```js
let obj = {};
Object.defineProperty( obj, "FAVORITE_NUMBER" ,{
  value:42,
  writable: false,
  configurable: false,
});
```





#### 확장 금지

객체에 프로퍼티를 더 추가할 수 없게 하고 현재 프로퍼티를 그대로 놔두고 싶을 때 `Object.preventExtensions` 을 호출한다.



```js
let obj = {
  a:2,
}
Object.preventExtensions(obj);
obj.b = 3;
obj.b; //undefined
```



`Object.seal()` 은 봉인된 객체를 생성한다. 위와 같지만, 객체를 생성하는 점에서 다르다 = preventExtensions + configurable false

`Object.freeze()` 는 seal과 동일하게 객체를 생성하나 writable을 false처리해서 값도 변경할 수 없게 한다. + 해당 객체가 참조하는 모든객체를 전부 동결하기때문에 주의하자.





### 3.3.7 Get

프로퍼티에 접근할 때 get연산을 수행한다. (`[[Get]]() ()같은 함수호출.`)

get연산은 프로토타입을 따라가서 찾는다.

해당 객체 내에 해당 프로퍼티가 없다면 상위로 올라가서 계속 찾는 연산이 수행되고 마지막에도 없으면 undefined를 반환한다.



### 3.3.8 Put

프로퍼티에 값을 할당하는 연산이다.

먼저 객체에 프로퍼티가 있는지 확인한다.

그리고 세터를 호출한다.

writable가 false이면 실패하고 끝난다.



### 3.3.9 게터와 세터

게터와 세터는 오버라이드할 수 있다.

```js
let obj = {
  get a(){
    return 2;
  }
};

//이렇게도 오버라이드할 수 있다.
Object.defineProperty(
	obj,
	"b",
{
  get: function(){return this.a * 2;}
  enumerbable:true,
});

obj.a; //2
obj.b; //4
```





Put연산은 세터가 정의되어있어야한다. 게터, 세터중 한쪽만 선언하면 예상 외의 결과를 가져올 수 있으니 항상. 둘 다 선언하는 것이 좋다.

```js
let obj ={
  get a() {
    return this._a_;
  }
  set a(val){
    this._a_= val * 2;
  }
}
obj.a = 2; // Put연산, 세터호출
obj.a; //4 게터 호출
```





### 3.3.10 존재 확인

객체에 프로퍼티가 존재하는지 확인한다.

`in` , `hasOwnProperty()` 를 사용한다.

```js
let obj = {
  a:2,
};
"a" in obj;//true
"b" in obj;//false

obj.hasOwnProperty("a");//true
obj.hasOwnProperty("b");//false
```

- in은 해당 객체 + 프로토타입따라 상위에 있는지 까지 확인한다
- hasOwnProperty는 해당 객체내에 있는지만 확인한다.
  - `Object.prototype.hasOwnProperty.call(obj, "a")`로 바인딩해서 사용할 수 있다.



### 3.4 순회

`some()` , `every()` 등으로 배열순회할 수 있다.

`for in` 루프는 열거 가능한 프로퍼티만 순회하고, 그 값을 얻으려면 일일히 프로퍼티에 접근해야한다.

배열 인덱스, 프로퍼티가 아닌 값을 직접 순회하는 것은 `for of` 로 할 수 있다.



이터레이터에서 정리를 어떤 파일에서 한 것 같은데.. 어디갔지



### 이터러블, 이터레이터

- 이터러블 : 반복될 수 있는 객체
- 이터레이터: 배열 또는 유사한 자료구조 내부를 순회하는 객체



객체가 이터러블하기 위해서 객체에 @@iterator메소드가 구현되어야 한다.



#### 이터레이터

객체를 `next()`메소드로 순환할 수 있는 객체.

`next()`는 done과 value를 포함해 반환해야한다.



### 이터러블과 이터레이터의 구분

객체가 @@iterator를 갖고 있다면 이터러블이다.

객체가 next메소드로 done, value를 반환하면 이터레이터다.



### 제너레이터

제너레이터는 이터러블이면서 이터레이터 객체이다

이터레이터를 쉽게 구현하는 방법으로 제너레이터 객체가 있다.

구현은 `function*, GeneratorFunction` 으로 할 수 있다.

제너레이터는 `next()`를 갖고 있기 떄문에 이터레이터 객체이다.

```js
function* counter() {
  console.log('첫번째 호출');
  yield 1;                  // 첫번째 호출 시에 이 지점까지 실행된다.
  console.log('두번째 호출');
  yield 2;                  // 두번째 호출 시에 이 지점까지 실행된다.
  console.log('세번째 호출');  // 세번째 호출 시에 이 지점까지 실행된다.
}

const generatorObj = counter();

console.log(generatorObj.next()); // 첫번째 호출 {value: 1, done: false}
console.log(generatorObj.next()); // 두번째 호출 {value: 2, done: false}
console.log(generatorObj.next()); // 세번째 호출 {value: undefined, done: true}

```



제너레이터를 이용해 비동기처리를 동기처리처럼 구현할 수 있다.

```js
const fetch = require('node-fetch');

function getUser(genObj, username) {
  fetch(`https://api.github.com/users/${usernamername}`)
    .then(res => res.json())
    // ① 제너레이터 객체에 비동기 처리 결과를 전달한다.
    .then(user => genObj.next(user.name));
}

// 제너레이터 객체 생성
const g = (function* () {
  let user;
  // ② 비동기 처리 함수가 결과를 반환한다.
  // 비동기 처리의 순서가 보장된다.
  user = yield getUser(g, 'jeresig');
  console.log(user); // John Resig

  user = yield getUser(g, 'ahejlsberg');
  console.log(user); // Anders Hejlsberg

  user = yield getUser(g, 'ungmo2');
  console.log(user); // Ungmo Lee
}());

// 제너레이터 함수 시작
g.next();
```



##### 출처

- [제너레이터](https://poiemaweb.com/es6-generator)