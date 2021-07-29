# Chapter 4 호아스팅

---

```javascript
a = 2;

var a;

console.log( a );
```

var a 가 a = 2보다 아래 선언되었으니 console.log에는 undefined라는 결과가 니올것을 예상하는데 **호이스팅** 에 의해 2가 나온다.

이전 1장에서 사용했던 예제를 보면

```javascript
var a = 2;
```

컴파일러는 두가지를 처리한다고 얘기했었다.
- var a
	- a가 선언되어있는지 확인하고 선언되있지 않으면 엔진에 선언을 요청한다.
- a = 2
	- a에 2를 대입하는 코드를 생성하여 엔진에 넘겨준다.


처음 코드는 컴파일러에 의해 아래와 같이 바뀐다.

```javascript
var a;

a = 2;

console.log( a );
``` 

이렇게 선언문이 가장 상단으로 끌어올려지는것을 **호이스팅** 이라고 한다.

### 호이스팅은 스코프 내에서도 일어납니다.

```javascript
function a (){
	b() // bbb
	function b () {
		console.log('bbb')
	}
}
a()
```

- 함수와 변수선언문 중 함수가 가장 먼저 위로올라간다.
- 중복으로 정의된 것은 가장 마지막에 선언된것이 실행된다.