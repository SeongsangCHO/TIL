# [Coercion 값 변환](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)



## 값 변환

자바스크립트의 값 변환하는 방식은 두가지가있다.

- 암시적 변환 (implicit coercion)
- 명시적 변환 (explicit coercion)

### 암시적변환 (암묵적)

값이 어떻게 변환될지 예상할수있다.

```javascript
a = 42
var b = a + "";			// implicit coercion
```
b는 string타입이 될거라고 암시하고있다.

### 명시적변환

```javascript
a = 42
var c = String(a) ; 
```
c는 string타입이 될거라고 명시하고있다.

둘 다 동일하게 "42"라는 문자열을 얻지만 방법의 차이가 있다.

## 내부 추상작업?

자바스크립트에선 내부적으로 값 변환 규칙이 있다.

toString, toNumber, toBoolean, toPrimitive가 있다.

## toString

String으로 강제변환할때 내부적으로 반환하는 값이다.

```javascript

var a = {
	value: 10,
	toString: () => 'hello'
}

a // { value: 10, toString: function}
a + "" // "hello"

```

명시적으로 호출하거나 암시적으로 호출하면 toString()의 결과를 반환합니다.

### JSON의 문자열화

JSON 유틸리티에 stringify() 함수가 있습니다.

이 함수는 JSON객체를 string으로 바꿔주는 함수인데 내부적으로는 각 요소의 toString을 실행시켜 반환된 값을 합쳐서 string을 만듭니다.

만약 반환되는 값을 정의하고싶다면 toJSON 함수를 객체 내부에서 정의합니다.

```javascript
var o = { };

var a = {
	b: 42,
	c: o,
	d: function(){}
};

// create a circular reference inside `a`
o.e = a;

// would throw an error on the circular reference
// JSON.stringify( a );

// define a custom JSON value serialization
a.toJSON = function() {
	// only include the `b` property for serialization
	return { b: this.b };
};

JSON.stringify( a ); // "{"b":42}"
```

> JSON.stringify가 문자열을 반환하지만 toJSON 함수에서는 문자열을 반환할 필요는 없습니다. (배열, Object ..)
>
> 문자열을 반환하게 되면 그 문자열을 저장합니다.

```javascript
var a = {
	val: [1,2,3],

	// probably correct!
	toJSON: function(){
		return this.val.slice( 1 );
	}
};

var b = {
	val: [1,2,3],

	// probably incorrect!
	toJSON: function(){
		return "[" +
			this.val.slice( 1 ).join() +
		"]";
	}
};

JSON.stringify( a ); // "[2,3]"

JSON.stringify( b ); // ""[2,3]""
```

### JSON.stringify 더 알아보기

> JSON.stringify(value[, replacer[, space]])

[MDN JSON.stringify](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)


## toNumber

수학연산을 할땐 valueOf의 리턴값을 이용한다.

## toBoolean

boolean은 Falsy한 값과 Truthly한 값이 있다.

### Falsy한값
- undefined
- null
- false
- +0, -0및NaN
- ""

위를 제외한 나머지는 Truthly한 값이다.

> new를 이용해 생성한 객체는 Falsy하지 않다.

빈배열, 빈 오브젝트, function .. 다 Truthly함.

```javascript
var a = new Boolean( false );
var b = new Number( 0 );
var c = new String( "" );
```

# 명시적 강제 변환

다른 언어와 같이 타입캐스팅을 하는것이다.

중요한건 앞에 New를 붙이지 않는다는것.

```javascript
var a = 42
var b = String(a)
```

아래코드는 명시적으로 암시적 변환이라 부른다.

```javascript
var c = "3.14"
var d = + c
d // 3.14
```

저 + c 라는 문장은 Number형으로 강제변환을 하겠다는 의미이다.

앞에붙는 단항 +나 -는 뒤의 값을 Number로 타입캐스팅을 하겠다는 의미인데

사용하는건 혼란을 초래할수도있다.

```javascript
1  +  -  +  +  +  -  +  1 ; 	// 2
```

다른연산자와 인접할때는 +(또는 -) 강제변환을 피하는게 좋다.

### Date and Number

날짜를 숫자값으로 바꾸는 방법도 있다.
```javascript
var d = new Date( "Mon, 18 Aug 2014 08:53:06 CDT" );
+ d // 1408369986000

var today = + new Date();
```

+연산을 이용해 숫자로 바꿔주면 timestamp값을 가져올수있다.

하지만 가독성에 좋지 않기때문에 timestamp가 필요하다면 ES5의 getTime()을 이용하길 권장한다.

```javascript

var d = new Date( "Mon, 18 Aug 2014 08:53:06 CDT" ).getTIme();

// 오늘날짜 timestamp
var today = Date.now()
```

## not 연산자의 흥미로운 사용법

~ 연산자는 비트 NOT 연산자이다.

indexOf에서 0번째에 매칭이 될 경우 0을 리턴한다.

0은 Falsy한 값이므로 if indexof를 그대로 사용한다면 첫번째가 매칭되더라도 if문이 실행이 안된다.

indexOf에서 틀린값은 -1을 리턴하는데 보통 체크할때는 아래와 같이 체크한다.
```javascript
if ('hello'.indexOf('h') != -1) { /* ... */} 
if ('hello'.indexOf('h') < 0) { /* ... */} 
```
~ 연산자를 사용하면 더 깔끔하게 해결이 가능하다.
```javascript
if (~ 'hello'.indexof('h')) { /* ... */}
```

-1을 NOT연산을 하면 0이 나오는 특징을 이용한다.

### 비트 자르기



# 암시적 강제 변환
