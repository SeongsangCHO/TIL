# Chapter 2 `this` All Makes Sense Now!

---

- call site, call stack에 대해 이해한다.



## 1. call Site

- 함수가 호출된 지점을 의미
- call Stack: 함수가 호출될 때 call Stack에 push되며, 반환값을 가져올 때 pop됨. 
  - 개발자도구에서 `debugger`찍어보면 콜스택을 볼 수 있음, 예외발생시에도 볼 수 있음.

```javascript
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```





```javascript
var obj1 = {
  item: 'item from obj1',
  mtd: function() {
    console.log(this.item);
  }
}

var obj2 = {
  item: 'item from obj2',
  mtd: obj1.mtd
}

obj2.mtd();		// 'item from obj2' 를 출력한다.
```

- call Site는 함수가 호출된 지점이라 했음.
- 위의 예제에서 `mtd()` 메소드는 누가 호출했는가? - `obj2`
  - 레퍼런스에 따라가서  `obj1`에 있는 `mtd`의 `this`는 이 함수를 호출한 지점. `obj2`를 가리키게 되는 것.

```js
var item = 'global item!';

var obj = {
  item: 'item from obj',
  mtd: function() {
    console.log(this.item);
  }
}

var mtd = obj.mtd;

mtd();			// 'global item!' 을 출력한다.
```

- `mtd()`를 호출한 지점은 `global` 따라서, this는 글로벌 이므로, 글로벌의 `item`을 출력한다.

```javascript
function func1() {
  console.log(this.item);
}

function func2(fn) {
  fn();
}

var obj = {
  item: 'item from obj',
  mtd: func1
};

var item = 'global item!';

func2(obj.mtd);	 // 'global item!'을 출력한다.
```

- func2의 함수를 호출한 지점은 `global` 따라서 타고들어가서 어떻게 연결이 되었든, 글로벌의 item을 출력한다.



### this 예시 1

`Only the top/last level of an object property reference chain matters to the call-site.`

=> 객체 프로퍼티 참조체인에서 마지막 레벨이 중요함.

```javascript
function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42
```

- obj1의 프로퍼티인 obj2의 키값(함수 레퍼런스)을 실행하면 this가 `obj2`를 가리킴. (마지막 레벨)



### this 예시 2

```javascript
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

- `bar`는 `obj.foo`의 레퍼런스처럼 보이지만 사실 `foo` 그자체의 레퍼런스임.
- 따라서 전역에 선언된 `foo`의 `this`는 전역변수 `a`임.

```javascript
function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

- call site 예시.





### 비동기함수에서도 마찬가지

콜백을 전달하는 함수가 자신의 것이 아니라 언어에 내장되어 있다면 어떻게 될까요? 차이는없고 동일한 결과입니다.

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

setTimeout( obj.foo, 100 ); // "oops, global"
```

- `obj.foo`를 호출하는 함수가 개발자 작성함수가 아닌 빌트인된 함수여도 글로벌 `this`를 가진다.



이런식으로 함수 콜백이 바인딩을 잃는 것은 일반적이다.

그러나 이 `this`바인딩을 의도적으로 바꿀 수 있다. 바로 `call, bind, apply`로 말이다.



