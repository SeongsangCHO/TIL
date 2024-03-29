# Chapter 5 문법

---



4장에서 && 또는 ||연산자의 반환은 true, false가 아니었다



앞 또는 뒤의 결과를 반환하는데 만약 `a && b || c`면 반환값이 무엇일까



이는 `연산자 우선순위`에 따라 달라지게 된다.



> 연산자 우선순위는 && > || > ?, : 순으로 높다.
>
> , 연산자는 최하위다.

##### 예제 1

```javascript
var a = 42, b;
b = ( a++, a ); //a++의 결과를 a에 할당 하므로 43
b = a++ ,a; // a값을 ++하기 전에 할당해서 b에 42를 할당함. (b = a++), a 로 해석함. 연산자 우선순위 때문.

a;	// 43
b;	// 43
```



##### 예제 2

```javascript
(false && true) || true;	// true
false && (true || true);	// false
```

이 둘은 다른연산이고,, 

```javascript
true || false && false;		// true

(true || false) && false;	// false -- nope
true || (false && false);	// true -- winner, winner!
```

위 예제는 1과 3번째라인이 같다는 것을 의미함.

따라서 &&는 ||보다 우선순위가 높다.





### 1. 단락평가

`&&, ||` 연산자는 좌측 피연산자만 보고 `falsy`면 뒤에걸 확인도 안해보는데 다음과 같이 응용할 수 있다.

```javascript
function doSomething(opts) {
	if (opts && opts.cool) {
		// ..
	}
}

function doSomething(opts) {
	if (opts.cache || primeCache()) {
		// ..
	}
}
```

위의 &&는 `opts`가 있어야 뒤에 `cool`을 확인할 수 있으므로 에러를 발생시키지 않을 수 있다.

밑의 `||`은 앞의 `opts.cache`만 있으면 뒤에 함수를 호출하지 않아도 되므로 불필요한 작업을 줄일 수 있다.



### 2. 결합성

> &&, ||는 연산자 우선순위가 같을 때는 좌측부터 묶인다.

`a && b && c`는 `(a && b) && c`로 묶인다.



그러나 삼항연산자( ?, : )는 우측 결합성 연산자여서 우측부터 묶인다

```javascript
a ? b : c ? d : e; //어떻게 묶일까
a ? b : (c ? d : e); //이렇게 묶인다
```





이 책의 저자는 이 부분에 대해서 적절히 혼합하여 ()로 묶거나 묶지 말라고 한다.

예를 들어 `a && b && c`는 어떻게 묶는 동일하니 그냥 안묶고 사용하고, 복잡한 삼항연산자는 묶으라고 하는데,,난 다 묶을듯.,.,



### 3. 세미콜론 자동삽입

JS는 ASI(Autimatic Semicolon Insection)이라는 프로그램이 세미콜론 누락을 자동으로 삽입시켜준다.

알아서 해주긴 하지만 꼭 붙여서 괜한 일을 만들지 말도록 한다.



### 4. 에러

변수가 초기화되기 전에 참조하면 에러를 발생시키는데 ES6에서는 TDZ(Temporal Dead Zone)이라는 개념을 도입했다.



#### TDZ?

TDZ란, 아직 초기화를 하지 않아 변수를 참조할 수 없는 코드 영역이다.. 즉, 접근할 수 없는 영역인 것.

`let, const, class` 구문의 유효성을 관리한다.



![](https://images.velog.io/images/secho/post/491cc04e-e392-40a2-8a02-f94cd9066cd3/image.png)





![](https://images.velog.io/images/secho/post/7ccce8ca-f424-4455-8cfb-dcb302d19229/image.png)



`const, let, class`는 선언 전 줄까지 TDZ의 영향을 받는다.

위의 예제에서는 `B2;`는 `let B2`로 선언전에 있기에 TDZ의 영향을 받아 TDZ존에 남아있어서 에러가 발생하는 것.

3가지에 해당하는 부분은 선언 이후에 사용해야한다.



```javascript
const a = 2;
//질문 - 우측의 a는 좌측 매개변수로 받는 a와 다르고, 선언되지 않아서 발생하는 에러같은데 이렇게 쓰는 경우가 있나..? => 질문타파
function square(a = a) {
  return a * a;
}
// Does not work!
square(); // throws `ReferenceError`

//아래처럼 다른 변수로 선언하고 사용
const init = 2;
function square(a = init) {
  return a * a;
}
// Works!
square(); // => 4
```

`(a = a)` 이 부분이 이해가 가지 않았는데 함수의 디폴트값은 좌측->우측으로 `let` 선언한 것과 같다고 한다. 따라서 `let a = a`와 동일한데, a의 값은 초기화되지 않았으므로 TDZ에 있어서 에러가 발생하는 것.

추가적인 예제는

```javascript
var b = 3;
//let b = a + b + 5 이므로 b는 TDZ에 있어서 에러 발생. ReferenceError: Cannot access 'b' before initialization
function foo( a = 42, b = a + b + 5 ) {
	// ..
}
```





let 블록 스코핑이 대표적인 예시인데,

```javascript
{
	a = 2; // RefereceError
	let a;
}
//초기화되기 전, TDZ에 있는 a가 할당되었으므로 에러가 발생한 것.
```



```javascript
{
	typeof a; //undefiend
	typeof b; //ReffrenceError (TDZ)
	let b;
}
```

위의 예제는 a는 아직 선언되지 않았는데 b와 달리 에러가 발생하지 않는다.

TDZ 참조시에는 `typeof`에 대한 안전장치가 없어서 발생하는 것이라한다.

`typeof` 연산자는 변수가 현재 스코프 안에 선언되었는지 확인할 때 유용하다.



이 예제를 보면 이해에 도움이 될 듯 하다.

```javascript
function doSomething(someVal) {
  // Function scope
  typeof variable; // => undefined
  if (someVal) {
    // Inner block scope
    typeof variable; // throws `ReferenceError`
    let variable;
  }
}
doSomething(true);
```

함수와 `if`문의 내부 스코프가 존재한다.

함수 스코프에서 typeof에서 에러가 발생하지 않지만 내부에서는 발생하는데 이는 같은 스코프내에 변수선언전, TDZ에 접근했기 때문이라고 이해했다.







#### 4.1 TDZ에 영향을 받지 않는 것들

`var, function`,`import`은 영향을 받지 않는다.

현재 스코프에서 호이스팅된다.



함수를 선언전에 호출해도 에러가 발생하지 않는 이유는 호이스팅 때문이다.

```javascript
// Works!
myFunction();
import { myFunction } from './myModule';
```

import 모듈 역시 호이스팅.





### 5. try...finally

try, catch 문은 자주 사용한다. finally문도 있는데 이는 에러가 발생했든 안했든 무조건 실행되는 부분이다.



단, finally는 try문에서 값이 반환되면 자기 내용을 수행하고 값을 반환한다.

만약 finally에서 예외가 `throw`되면 이전의 결과들은 모두 무시된다. 

finally에 `return`이 있으면 try의 반환값은 무시된 채로 finally의 값이 반환된다.



```javascript
function foo() {
	try {
		return 42;
	}
	finally {
        //throw "hi"; //밑의 결과들 모두 무시된 채로
        //Uncaught Exception : hi
		console.log( "Hello" );
        return '11';//이면 밑의 42라는 반환이 아니라 11이 반환된다.
	}

	console.log( "never runs" );
}

console.log( foo() );
// Hello
// 42
```





### 6. Switch

```javascript
switch (a){
	case 2:
}
```

위의 예제에서 a와 2는 어떻게 매치할까?

바로 `===`문과 같다.

강제변환이 이뤄지는 `==`를 사용하고 싶으면 다음과 같이 작성하면 된다.

```javascript
switch(true){
	case a == 10;
}
```



`==`을 써도 switch는 엄격히 매치하는데 다음을 보자

```javascript
var a = "hellol";
var b = 10;
swtich(true){
	case (a || b == 10); //false
}
```

원래 `if`면 ||의 연산으로 a값이 반환되도 truthy한 값으로  true처리가 되는데 switch에선 그렇지 않다.따라서 논리연산자 쓰는게 문제가 된다..





#### 참고 및 출처

- [TDZ ui toast](https://ui.toast.com/weekly-pick/ko_20191014)