# Chapter 2: Values

array, string number은 프로그램의 기본적인 요소지만

자바스크립트에서는 혼란스럽게 만드는 특성이 있다고한다.

몇가지 유형을 살펴보고 좀더 완벽하게 이해해보자

## 배열

자바스크립트의 배열에는 모든 유형의 값을 담을 수 있다.

```javascript
var a = [1,"2",[3]];
```

배열의 크기는 C언어처럼 미리 선언할 필요가 없다. 필요하다면 선언하고 값을 넣으면 된다.

```javascript

var a = [];
a[0] = 1;
a[1] = "2";
a[2] = [3];
console.log(a, a.length) // [1, empty, Array(1)], 3

var b = []
b[0] = 1
b[2] = 2
console.log(b, b.length) // [1, empty, 2], 3
```

### Array에서 delete 사용할 때 주의

delete를 사용해서 배열의 요소를 삭제시키면 뒤의 요소가 앞으로 당겨지는게 아닌
해당 위치가 undefind로 정의된다.

```javascript
var a = [1,"2",[3]];
delete a[2]
console.log(a) //  [1, empty, Array(1)]
console.log(a[1]) //  undefined
```

### 배열에도 키값을 저장할 수 있다. - 권장하지않는다.

```javascript
var a = [];
a[0] = 1
a['foo'] = 10
console.log(a, a.length) // [1, foo: 10], 1
```
foo라는 키값으로 배열에 저장은 가능하다.

length값은 1이 출력된다

까다로운건 아래와 같은 상황은 숫자로 저장된다.

(base-10으로 변환가능한 키는 index number로 저장한다.)

```javascript
<<<<<<< HEAD
let a = [];
a["foobar"] = 2;
a.foobar; // 2
// [foobar:2]
=======
var a = [];
a["13"] = 42;
console.log(a, a.length) // [empty × 13, 4], 14
>>>>>>> 37978a5dfa280801a8e458dab7c3775744689677
```
문자열 13을 숫자로 바꿔서 저장한다는 것.

배열에 키값을 string타입으로 하는걸 추천하지않는다.


### Array-likes

Array유틸리티 함수를 이용해 Array 객체를 만들 수 있다.

<<<<<<< HEAD
유사배열이란, 배열이 아닌데 배열인척. 유사배열 객체 혹은 유사 배열이라 부른다.

예제를 보자



```html
<div id = "outer">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

<script>
	let outer = document.querySelector(`#outer`).children;
    console.log(outer); // 배열처럼 인덱스와 length 프로퍼티를 가진다.
    console.log(Array.isArray(outer)); //false
    console.log(outer instanceof Array); //false
</script>
```

여기서 outer이 배열인가?

아니다. 유사 배열이다.



이를 다음과 같은 형태로 직접 만들어볼 수 있다. 반드시 length를 가져야한다. 그리고 index가 0부터 시작하며 1씩 증가해야한다.

```javascript
let arr = {
	0:'hey',
	1:'hi',
	length:2,
};
```

이 방법은 프로퍼티가 추가될 때마다 length를 갱신해주어야하므로, 비효율적. 따라서 유사배열을 만들지 않는게 좋다.



이 유사배열은 `dom`에서 사용하고 있고 `arguments` (가변인자를 담는 유사배열 객체) - 이는 권장하지 않고 (...arg)와 같은 spread 연산자를 쓰면 된다.

 또 다른 특징이 있는데, 바로 배열 메소드를 사용할 수 없는 것이다.  `call`을 통해 `this`바인드해서 사용할 수 있지만.. 방법은 알아두자

```javascript
const 꼼수 = (...args) => {
	[].forEach.call(args, (value, key) => {
		console.log(value, key);
	})
}
꼼수(1,2,3,4,5)
1 0
2 1
3 2
4 3
5 4
```



유사배열을 진짜 배열로 바꾸고 싶을땐 다음과 같은 방법을 사용한다.
=======
iterator라고도 부르는것같다.
>>>>>>> 37978a5dfa280801a8e458dab7c3775744689677

```javascript
function foo() {
	var arr = Array.prototype.slice.call( arguments );
	arr.push( "bam" );
	console.log( arr );
}

foo( "bar", "baz" ); // ["bar","baz","bam"]
```

## String

문자열과 배열은 동일하지 않다.

```javascript
var  a  =  "foo" ; 
var  b  =  [ "f" , "o" , "o" ] ;

a.length;							// 3
b.length;							// 3

a.indexOf( "o" );					// 1
b.indexOf( "o" );					// 1

var c = a.concat( "bar" );			// "foobar"
var d = b.concat( ["b","a","r"] );	// ["f","o","o","b","a","r"]

a === c;							// false
b === d;							// false

a;									// "foo"
b;									// ["f","o","o"]
```

위의 특징을 보면 같아보이지만 아래의 코드에서 차이를 보인다.
```javascript
c = a.toUpperCase();
a === c;	// false
a;			// "foo"
c;			// "FOO"

b.push( "!" );
b;			// ["f","O","o","!"]


a.reverse;		// undefined

b.reverse();	// ["!","o","O","f"]
b;				// ["!","o","O","f"]



<<<<<<< HEAD
Esrever이라는 라이브러리를 사용하도록 하자. reverse의 역순.. ㅋㅋ.. 센스 ..
=======
```
String은 변할수 없는 immutable이고 문자배열(array)는 바뀔수 있다.
>>>>>>> 37978a5dfa280801a8e458dab7c3775744689677

문자열을 반전시킬때도 차이를 보인다.

문자열을 반전시키기 위해선 아래와 같이 split후 reverse후 join을 해줘야한다.
```javascript
var c = a
	// split `a` into an array of characters
	.split( "" )
	// reverse the array of characters
	.reverse()
	// join the array of characters back to a string
	.join( "" );

c; // "oof"
```
- 위의코드를 주의할점은 아스키코드를 벗어난 값이 있을땐 따로 다른 라이브러리를 사용해야 한다는것..

## Numbers

코드로 간단하게 볼수있다.

```javascript
var a = 42;
var b = 42.3;

<<<<<<< HEAD
숫자타입 `Number`은 정수와 부동소수점(Floating Point)을 아우른다.



##### 부동소수?

- 컴퓨터는 2진수로 값을 저장한다. 정수는 나눠 떨어지지만, 소수점 같은 경우 무한 반복이 일어난다.
  - 0.3 = 0.010011..... (0.25 + 0.xx ....)처럼 고정된 값이 되지 못한다. 그래서 가장 근사한 값이 컴퓨터에 저장된다.

이 **근사값을 저장하는 방법이 두가지**가 있는데 고정소수점과 부동소수점이다.



##### 고정소수점. 트레이드오프.

고정소수점은 말 그대로, 정수를 표현하는 비트 + 소수 표현 비트를 고정해놓고 숫자를 표현하는 방식이다.

예를들어 32비트로 실수를 표현한다고 했을 때 1비트는 부호, 16비트는 정수, 15비트는 소수를 표현한다고 하자.

정수표현은 최대 16비트, 소수는 15비트로 고정되어 있으므로 어느 한쪽을 늘리면 다른 한쪽이 줄고, 이런 것 때문에 범위를 늘릴 순 있지만 정밀도가 떨어지는 등의 트레이드오프가 발생한다.



##### 부동소수점

IEEE 754 표준으로 제안된 방식.

부호비트 + 지수비트 + 가수비트로 나누어서 숫자를 표현함.



**m X r^e ( m : 가수 r : 밑수 e : 지수 )**

 

예를 들어 57.23 X 10^1에서 가수는 57.23, 밑수는 10, 지수는 1

이를 정규화과정을 진행하면 부동소수점표현이 가능해진다.

장점, 단점역시 존재하는데 다음과 같다.

**부동소수점의 장단점**

정수에 비해 2가지 장점을 가진다.

1) 정수와 정수 사이에 있는 값을 나타낼 수 있다.

2) 스케일을 사용하여 매우 큰 범위의 값을 나타낼 수 있다.

 

**단점**

1) 부동 소수점수 연산은 수치 연산 보조 프로세서(math coprocessor) 가 없는 컴퓨터에서

정수 연산보다 속도가 느리다. (결국 남용하면 전체적인 속도 저하를 가져온다)

2) 정밀도를 잃을수 있다.

정수형은 최대값에 1을 더하거나 최소값에 1을 빼게 되면 overflow 가 일어나

완전 다른 값이 나오는데 반해

부동 소수형 최대값에 값을 더하거나 최소값에 값을 뺏을때

**아무런 효과를 갖지 못한다.**

 

=> JS에는 double형 하나만 존재하고 부동소수점표현으로 실수를 표현하고 있다.

=> 부호 1비트 + 지수 11비트, 가수 52비트

JS에서 가장 작은수는 Number.EPSILON = 2^-52 = 가수부는 소수점 이하를 표현하기 때문에 이보다 작은 수는 존재할 수 없음.
=======
// 동일
var a = 0.42;
var b = .42;
>>>>>>> 37978a5dfa280801a8e458dab7c3775744689677

// 동일
var a = 42.0;
var b = 42.;

```
### toExponential

[MDN Number.toExponential()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)

소수점 이하로 표현할 자릿수입니다.

```javascript

var a = 5E10;
a;					// 50000000000
a.toExponential();	// "5e+10"


```


### toFixed

[MDN Number.toFixed()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)


고정소수점 표기법을 사용하여 나타낸 수

반올림해서 보여준다.


```javascript
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```

### toPrecision

정밀도로 나타내는 문자열을 반환한다.

[MDN Number.toPrecision()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)

```javascript
var a = 42.59;

a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"
a.toPrecision( 6 ); // "42.5900"
```

### 주의!

정수형에서 사용할때 .을 소수점으로 인식한다.

그래서 Number prototype함수에 접근할때는 ..을 이용하거나 아래와같은 방법을 사용해야한다.
```javascript
// invalid syntax:
42.toFixed( 3 );	// SyntaxError

// these are all valid:
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"
```

### 8진수, 16진수표현
```javascript
0xf3 // 243 16진수

0363 // 243 8진수, strict-mode에서 걸리므로 비권장
0o363 // 243 8진수 권장방법

// 그 외로는 0b를 이용하면 2진수표현가능
```

### 작은수
부동소수점 연산시IEEE 754를 이용해 계산한다.

```javascript
0.1 + 0.2 === 0.3 // false
```

[wikipedia IEEE754](https://ko.wikipedia.org/wiki/IEEE_754)

부호비트를 가장 앞에, 지수부분과 가수부분을 나눠 표현한다.

부동소수점 연산을 하게되면 반올림오차값이 존재하는데 그 허용되는 오차범위를 머신엡실론(machine epsilon) 이라 부른다.

그 차이때문에 위의 결과가 false가 나온것이다.

그 엡실론값은 javascript에 Number.EPSILON으로 정의되어있다. (또는 정의할수도 있다.)

오차값을 이용해 비교를 하고싶다면 아래와같은 폴리필(polyfill)을 만들어 사용하면된다.

하지만 보통 toFixed 또는 toPrecision으로 비교할수있다.

```javascript
function numbersCloseEnoughToEqual(n1,n2) {
	return Math.abs( n1 - n2 ) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual( a, b );					// true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 );	// false
```

### 안전한 정수범위

int범위가 한정되어있다.

최대값은 2^53 - 1, 즉 9007199254740991정도이다.

Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER로 최대, 최저값을 확인할 수 있다.

매우 큰 숫자를 사용할때는 Bigint를 사용하거나 큰수를 처리하는 유틸리티를 추천한다.

[MDN Bigint](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

### isInteger

갑이 정수인지 테스트합니다.

[MDN Number.isInteger()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
```javascript
Number.isInteger( 42 );		// true
Number.isInteger( 42.000 );	// true
Number.isInteger( 42.3 );	// false
```

## 특별한 값

- undefined 정의되지않음
- null 아무것도없음

undefined를 변수로 선언하거나 그런짓은 하면안된다...

### void

void는 모든값을 무효화시키고 undefined를 리턴하게 한다.

```javascript
void 1 // undefined
void setTimeout(() => {}, 100) // undefined
void new Number() // undefined
```

자주 보는 이 함수도 같은 원리로 undefined를 리턴한다.

```javascript
function test() {
	return ;
}

test() // undefined
```

### NaN

Not a Number이란 의미로 숫자가 아니란 뜻.

```javascript

var a = 2 / "foo"

a == NaN // false
a === NaN // false
```

NaN끼리 비교하면 false가 나온다.

그래서 체크할때는 isNaN 함수를 사용한다.

[MDN isNaN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

ES6이전에는 window객체의 isNaN을 사용했다고 한다.

그래서 isNaN을 사용할때는 Number.isNaN을 붙여서 사용하는게 안전하다.

### Infinity, -Infinity

```javascript
var a = 1 / 0 // Infinity
var a = -1 / 0 // -Infinity
```

### 0, -0

JS에서는 0과 -0이 표현된다.

다행스럽게도 둘의 값은 동일하다고 연산한다.

```javascript
var a = 0;
var b = 0 / -3;

a == b;		// true
-0 == 0;	// true

a === b;	// true
-0 === 0;	// true

0 > -0;		// false
a > b;		// false
```

확인이 필요하다면 아래와같은 함수를 정의하여 사용하면 된다.

```javascript
function isNegZero(n) {
	n = Number( n );
	return (n === 0) && (1 / n === -Infinity);
}

isNegZero( -0 );		// true
isNegZero( 0 / -3 );	// true
isNegZero( 0 );			// false
```


-0은 애니메이션에 사용되기도 한다.

플레이어의 방향? 등을 이용할때 쓴다고 한다.

### 특별한 비교

0이나 -1, NaN비교를 위해 Object.is를 사용할수있다.

```javascript
var a = 2 / "foo";	// NaN
var b = -3 * 0;		// -0

Object.is( a, NaN );	// true
Object.is( b, -0 );		// true
Object.is( b, 0 );		// false
```

비교할때는 보통 === 또는 == 을 사용하지만 특별한 값(-0같은..) 은 Object.is로 비교한다.

## Value vs. Reference

<<<<<<< HEAD




##### 참고

- [부동소수점](https://steemit.com/kr/@modolee/floating-point)

- [부동소수점 계산](https://ndb796.tistory.com/5)

- [부동소수점 장, 단점](http://blog.naver.com/PostView.nhn?blogId=ydk928&logNo=60052927810#:~:text=%EB%B6%80%EB%8F%99%EC%86%8C%EC%88%98%EC%A0%90%EC%9D%98%20%EC%9E%A5%EB%8B%A8%EC%A0%90,%EA%B0%92%EC%9D%84%20%EB%82%98%ED%83%80%EB%82%BC%20%EC%88%98%20%EC%9E%88%EB%8B%A4.)
=======
-- 설명 차후 작성
>>>>>>> 37978a5dfa280801a8e458dab7c3775744689677
