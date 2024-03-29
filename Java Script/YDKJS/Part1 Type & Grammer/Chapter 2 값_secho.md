# Chapter 2 값

------

- 배열, 유사배열, 문자열, 숫자, 특수 값에 대해 알아본다.

## 1. 배열

JS 배열에는 어떤 타입이라도 담을 수 있다.

```
let a = [1, "2", [3]];
```

`delete`연산을 사용해서 원소를 제거할 수 있지만 해당 자리에는 `undefined`가 남고 length도 줄지 않는다.

```javascript
let a = [];
a[0] = 1;
a[2] = 3;

// a[1]을 건너 뜀
a[1]; //undefiend
a.length; // 3
```

이렇게 중간에 구멍난 배열이 생길 수 있다.

배열은 키, 프로퍼티를 추가할 수 있는데 권장하지 않는다.

```javascript
let a = [];
a["foobar"] = 2;
a.foobar; // 2
```

### 1.1 유사배열

유사배열을 진짜 배열로 바꾸고 싶을땐 다음과 같은 방법을 사용한다.

```javascript
function foo() {
	let arr = Array.prototype.slice.call(arguments);
	arr.push("bam");
	console.log(arr);
}
foo("bar","bar","booo") // ["bar", "bar", "booo"]
```

함수에서 `argument`를 가져오는건 ES6에서 deprecated..

그래서 다음 방법을 사용

```javascript
let arr = Array.from(argument)
```

## 2. 문자열

문자열은 불변값, 배열은 가변값이다.

let a = "abcd"에서 "abcd"값은 변경하지 못한다.

대표적인 예시로 `reverse`가 있다

```javascript
let arr = "abcde"; //이것을 거꾸로 만든다고 해보자
//근데 문자열을 바꿀 수 없으므로 배열로 변환해 다시 문자열로 반환한다.
arr.split('').reverse().join('');
```

**그러나 복잡한 특수문자가 섞여있는 경우 이는 통하지 않는다,**

Esrever이라는 라이브러리를 사용하도록 하자.

## 3. 숫자

숫자타입 `Number`은 정수와 부동소수점을 아우른다.

`toFixed()`는 지정한 소수점 이하 자릿수까지 나타낸다.

`toPrecision`은 기능이 비슷하고 유효숫자 갯수를 지정할 수 있음.

```javascript
let a = 42.59;
// 문자열로 반환함.
a.toFixed(0); // 43 
a.toFixed(1); // 42.6
a.toFixed(2); // 42.59
a.toFixed(3); // 42.590
a.toFixed(4); // 42.5900

a.toPrecision(1); //4e+1
a.toPrecision(2); //43
a.toPrecision(3); //42.6
a.toPrecision(4); //42.59
a.toPrecision(5); //42.590
```

- 같은 기능이지만 fixed는 소수점 갯수, precision은 소수점+정수의 갯수.

8, 16진수 역시 표현할 수 있는데 다음과 같다.

```javascript
0xf3; //243의 16진수
0o363; //243의 8진수
0b11110011; //243의 2진수
```

### 3.1 작은 소수값

0.1 + 0.2는 0.3이다?

아니다.

0.30000....4이다.

이런 이슈가 있는데 이를 머신 입실론으로 처리할 수 있다. 머신 입실론은 컴퓨터가 다룰 수 있는 가장 작은 수라고한다. (2^-52)

이를 사용해서 처리할 수 있다.

```javascript
return Math.abs(n1 - n2) < Number.EPSILON;

n1 = 0.1 + 0.2; 
n2 = 0.3;
// 결과 => true
```

이외에 표현할 수 있는 수는 `Number.MAX_VALUE`인데 2^52. 즉 9천조가 넘는 수이다.

문제가 발생할 수 있는 부분은 DB의 64비트 ID를 처리할 때 발생한다.

JS에서 이를 숫자타입으로 표시할 수 없기에 String으로 처리해야한다.

더 큰 수를 다뤄야 한다면 `BigInt`를 사용하자.

## 4. 특수 값

void 연산자는 어떤 값이든 무효로 만들어 항상 `undefined`로 만든다. 실제로 자주 사용했다.

```javascript
let a = 42;
console.log(void a, a); // undefined 42

if(){...
	return ;
}
```

`return ;`이 비슷하게 활용하는 예시이다.

예시로 `setTimeout`의 반환은 이 함수를 식별하는 키값인데 `void setTimeout`하면 반환을 undefined 처리할 수 있다.

### 4.1 NaN

Not a Number로 숫자 타입에 존재하는 값이다.

두 피연산자가 숫자가 아닐 경우에 나오는 결과값이다.

```javascript
let a = 2 / "foo"; //NaN

typeof a; // Number

//NaN의 타입은 Number이다.. 그럼 이를 어떻게 체크할까?

let b = "foo";


ES6부터 등장한 Number.isNaN을 사용한다.
Number.isNaN(a); // true
Number.isNaN(b); // false
```

### 4.2 +0, -0

JS엔 +0, -0이 있다. 그냥 어떤 애플리케이션에 부호값을 비교하기 위해 존재한다고 한다.

## 5. 값 vs 레퍼런스

이 부분이 은근 헷갈리는 부분이다.

JS에는 포인터라는 개념이 없고 참조하는 방법도 다르다.

책에 따르면 어떤 변수가 다른 변수를 참조할 수 없다한다.

"그냥 안된다." (실제 쓰여있는 말)

값의 타입에 따라 값-복사, 레퍼런스-복사가 이루어진다.

값 복사는 Object를 제외한 UNBNSS가 이루어지고

레퍼런스 복사는 Object이다. (객체, 함수, 배열 등)

```javascript
let a = 2;
let b = a;
b++;
a; // 2
b; // 3

a는 Number이다 따라서 값-복사가 이루어지므로 b를 더해도 a는 변하지 않는다.

let c = [1,2,3];
let d = c;
d.push(4);

c; // [1,2,3,4]
d; // [1,2,3,4]

//c는 배열이다. 즉 object다. 레퍼런스복사가 이루어지므로 d가 변하면 같은 레퍼런스를 가진 c도 변경된다.
```

다음 예제를 보자

```javascript
let a = [1,2,3]
let b = a;

b = [4,5,6];

a; // [1,2,3]
b; // [4,5,6]
```

b는 레퍼런스 복사가 이루어졌지만 `[4,5,6]`이라는 새로운 배열을 할당받았으므로 a에 대한 레퍼런스 대신 `[4,5,6]`에 대한 레퍼런스 복사가 이루어진다. 따라서 a랑 b랑 다른 레퍼런스를 가진다.