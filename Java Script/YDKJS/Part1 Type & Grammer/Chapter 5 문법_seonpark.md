# Chapter 5 문법

---

## 설명문과 표현식

번역을 봐야할듯.. 영어 번역을 

## 문 완료값

모든 명령문에는 완료값이 있다. (대부분 undefined)

왜 이 콘솔에 아래 코드를 입력하면 undefined값이 나올까
```javascript
var a = 42
//undefined
```
ES5명세에서 빈 리턴값을 강제하고있다.

아래의 코드는 리턴값이 42이다.
```javascript
var b

if (true) {
	b = 4 + 38;
}
// 42
```

블록의 마지막 완료값을 암시적으로 반환하기 때문이다.

하지만 아직 아래와 같은 코드는 동작하지않는다.
```javascript
var a, b;

a = if (true){
    b = 4 + 38
}
// VM1447:3 Uncaught SyntaxError: Unexpected token 'if'
```
문장의 리턴값을 다른변수에 할당할수 없다.

넣고싶다면 eval() 함수를 이용할 수 있다.

**하지만 악의적인 사용이 가능한 함수라 사용을 권장하지않는다.**

```javascript
var a, b;
a = eval("if(true) {b = 4 + 38}")
a;
// 42
```

ES7에서는 do 표현식으로 리턴값을 가져올수 있다.
```javascript
var a, b;

a = do {
	if (true){
    	b = 4 + 38
	}
}
// 42
```

자세한 활용이나 내용은 아래 링크를 참조

JSX같은 템플릿언어에 좋음

[tc39/proposal-do-expressions](https://github.com/tc39/proposal-do-expressions)

## Expression Side Effects (부수적인효과?)

표현식에 의한 sideEffect라고 봐야하려나..

아래와 같은 식은 side effect는 없다.
```javascript
var a = 2;
var b = a + 3
```

a의 값이 변하지 않는다.

아래는 side effect가 있는 함수표현식이다.

```javascript
function foo() {
	a = a + 1;
}

var a = 1;
foo();		// result: `undefined`, side effect: changed `a`
a // 2
```

다른 표현식으로는 ++를 예로 들수있다.
```javascript
var a = 42;
var b = a++;

a;	// 43
b;	// 42

// 괄호로 감싸고 대입해도 결과는 변하지않음
var a = 42;
var b = (a++);

a;	// 43
b;	// 42
```

b를 a가 증가한 값을 넣는방법은 ++를 앞에다 붙이는 방법도 있지만

콤마연산자로도 가능하다.

```javascript
var a = 42, b;
b = ( a++, a );

a;	// 43
b;	// 43
```

delete 연산자의 리턴값은 true/false로
true면 값을 제거하고 undefined를 할당한다.

```javascript
var obj = {
	a: 42
};

obj.a;			// 42
delete obj.a;	// true
obj.a;			// undefined
```

delete 후 obj.a는 undefined가 할당되는 side effect가 생긴다.

= 연산또한 side effect가 발생한다.

```javascript
var a = 42;
```

42란 연산을 한 후 a에 대입을 하였으니 a값이 42가 할당되는 side effect가 생긴다.


연결할당을 이용해 리펙토링
```javascript
function vowels(str) {
	var matches;

	if (str) {
		// pull out all the vowels
		matches = str.match( /[aeiou]/g );

		if (matches) {
			return matches;
		}
	}
}

vowels( "Hello World" ); // ["e","o","o"]
```

```javascript
function vowels(str) {
	var matches;

	// pull out all the vowels
	if (str && (matches = str.match( /[aeiou]/g ))) {
		return matches;
	}
}

vowels( "Hello World" ); // ["e","o","o"]
```

## 상활별 규칙

### { ... } 중괄호

### 1. 객체리터럴

```javascript
var a = {
	foo: bar()
}
```

### 2. 라벨
```javascript
{
	foo: bar()
}
```

javascript의 goto문으로 보면 될것같다.

예를들면 아래와 같은코드

```javascript
// `foo` labeled-loop
foo: for (var i=0; i<4; i++) {
	for (var j=0; j<4; j++) {
		// whenever the loops meet, continue outer loop
		if (j == i) {
			// jump to the next iteration of
			// the `foo` labeled-loop
			continue foo;
		}

		// skip odd multiples
		if ((j * i) % 2 == 1) {
			// normal (non-labeled) `continue` of inner loop
			continue;
		}

		console.log( i, j );
	}
}
// 1 0
// 2 0
// 2 1
// 3 0
// 3 2
```

추가로 break <goto문>도 있다.

foo를 break를 하고싶다면 **break foo**를 하면된다

### 3. 블록

```javascript
[] + {}; // "[object Object]"
{} + []; // 0
```

\+ 연산자의 피연산자가 [], {} 에 따라 다른 결과를 줍니다.

\+ [] => 0

\+ {} => NaN

### 4. 객체 해체

```javscript
function foo({ a, b, c }) {
	// no need for:
	// var a = obj.a, b = obj.b, c = obj.c
	console.log( a, b, c );
}

foo( {
	c: [1,2,3],
	a: 42,
	b: "foo"
} );	// 42 "foo" [1, 2, 3]
```
### 5. if, else if, else 블록

```javascript
if (a) {
	// ..
}
else {
	if (b) {
		// ..
	}
	else {
		// ..
	}
}
```