# Chapter 2 `this` All Makes Sense Now!

---

## 명시적 바인딩

this를 명시적으로 바인딩을 하는 적당한 유틸리티함수가 있다.
- apply
- call

```javascript
function foo () {
  console.log(this.a);
}

var obj = {
  a: 42
};

foo.call(obj); // 42
```

### 하드바인딩

```javascript
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

// bar 안에 foo는 obj로 바인딩되어있다.
var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
// bar을 window로 바인딩을 해도 안에 foo는 obj로 바인딩 되어있기 때문에
// window로 바인딩되지 않는다. (하지만 bar 내부는 window로 바인딩되어있음)
bar.call( window ); // 2
```

하드바인딩은 자주 쓰는 패턴이여서 ES5에는 Function.prototype.bind 함수를 지원한다.

```javascript
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

### call, apply

```javascript
// 파라미터가 인자형태로 전달됨
function foo(args1, args2 ...) {
  // ...
}
foo.call(obj, args1, args2 ...);

// 파라미터가 배열형태로 전달됨
function foo(array) {
  // ...
}
foo.apply(obj, [args1, args2, ...])
```

- [MDN call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN apply](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)


### API 호출 context

forEach, map 같은 함수에 bind함수를 사용할 수 없다.

API 호출 context는 call, apply 함수대신 바인딩을 해준다.

[MDN forEach](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## 2.2.4 New 바인딩
new는 자바같은 클래스지향 언어의 생성자 역할을 한다.

하지면 자스에서는 동작이 완전히 다르다.

```javascript
something = new MyClass();
```
자바스크립트의 생성자는 그저 함수이다.

처음 실행할 함수를 실행한다고 보면 될것같다.

키워드 new를 붙이면 아래와 같은 일이 일어난다.

1. 자동 객체 생성
2. prototype 연결 (5장)
3. 객체 자기자신을 this로 바인딩
4. 함수가 다른 객체를 반환하는게 아니라면 자동생성된 객체 반환


### 바인딩 우선순위

암시적 < new < 명시적

```javascript
function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};

var obj2 = {};

// 암시적
obj1.foo( 2 );
console.log( obj1.a ); // 2

// 명시적
obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

// new
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

### this 확정규칙
new : 새로 생성된 객체가 this

call, apply : 바인드한 객체가 this다

var bar = obj.foo() : 암시적 바인딩한 객체가 this다

var bar = foo() : 전역이 this다 (기본값이 this다)

## 2.4 바인딩예외

call, apply에 null을 넘기면 null로 바인딩된다.

다른 의미로는 어떤것을 바인딩은 별 상관없다? 라는 뜻이다.

단 이 방법은 위험한 방법인데 내부적으로 this를 참조하면 기본바인딩이 적용되어 전역변수를 참조 할 수도 있음.

그래서 Object.create(null) 로 생성한 객체를 바인딩한다.

Object.create(null) 을 DMZ 객체라고 부른다.

### curying(커링)

아래와 같이 동작하는걸 커링이라 한다.

[JavaScript에서 커링 currying 함수 작성하기](https://edykim.com/ko/post/writing-a-curling-currying-function-in-javascript/)
```javascript
function foo(p1,p2) {
	this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" ); // foo ("p1", arg);

var baz = new bar( "p2" ); // foo("p1", "p2")

baz.val; // p1p2
```

### 소프트바인딩

임의로 this를 바인딩 할수 있고 동시에 전역/undefined 가 바인딩 되는게 아닌 기본값을 바인딩 하기 위함.

```javascript
function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

// 기본 바인딩 적용할때 전역이 아닌 softBind로 할당안 obj가 실행됨을 볼수있음.
setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding
```

### 어휘적 this

Arrow 함수에 대해 설명함.

```javascript
function foo () {
  return (a) => {
    console.log(this.a) // foo.a
  }
}

var obj = {
  a: 10
}

foo.bind(obj)()(20) // 10
```

