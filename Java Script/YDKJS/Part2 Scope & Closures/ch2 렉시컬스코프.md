# [Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md)




- 렉시컬 스코프에 대해 알아보기
- Undefined의 혼란

## Lexical Scope

1장에서 자바스크립트의 스코프는 컴파일타임때 결정되는걸 알 수 있다.

그 스코프를 결정하는 방식이 두가지가 있다.

- Lexical Scope
- dynamic scope

둘의 차이점은 부모에 선언된 변수를 어떤걸 쓰느냐에 따라 결정된다.

그에 대한 설명으로 아래의 코드를 많이 쓰는것 같다.
```javascript
var x = 1;

function foo(){
  var x = 10;
  bar();
}

function bar(){
  console.log(x);
}

foo(); //?
bar(); //?
```

foo() 안에서 bar을 호출했을때 출력되는 x값은 어느 스코프의 x값인지 확인해보면

결과는 1이 나오는걸 알 수 있다.

이유는 lexing(구문분석) 단계에서 스코프 처리를 먼저 하기 때문이다.

예를 들면 아래와 같이 렉싱이 이루어진다.

```javascript
// x에 1을 할당합니다.
var x = 1;

// 함수 foo를 선언합니다.
function foo(){
  // foo 안에 x 변수를 선언합니다. 10을 넣습니다.
  var x = 10;
  // bar을 호출합니다
  bar();
}
// foo의 선언은 끝납니다.

// bar 을 호출합니다
function bar(){
  // x가 할당되어있는지 찾습니다. 최상단에 x=1이 선언된걸 확인합니다.
  // x의 값을 출력합니다. => 1
  console.log(x);
}

foo(); // 1
bar(); // 1
```

다이나믹 스코프는 간단하게 알아보면 아래와 같다.
```javascript
var x = 1;

function foo(){
  var x = 10;
  function bar() {
	console.log(x);
  }
  bar();
}


function bar(){
  console.log(x);
}

foo(); // 10
bar(); // 1
```

foo안의 bar 함수는 x의 값을 글로벌스코프가 아닌 로컬스코프에서 가져온다.

컴파일러는 bar 안의 x의값을 자신을 감싼 스코프를 찾아가며 글로벌스코프까지 찾아가기 때문이다.

이 방법은 버블이라고 부르는듯 한

## Lookup Failures

### Undefined Mess

자바스크립트를 사용하다보면 ReferenceError 오류가 보인다.
```
Uncaught ReferenceError: ... is not defined
```
영어로 읽으면 변수가 정의되지 않음 이라는 문구인데 다르게 혼동할수도 있다.

```javascript
var  studentName ; 
typeof  studentName ;      // "undefiend" 

typeof  doesntExist ;      // "undefiend"
```

doesntExist는 변수도 아닌데 typeof로 체크하게되면 undefined가 뜬다.

undefined가 뜨는 경우가 두가지라는 뜻으로 조심히 사용해야한다.

### 놀라운 글로벌 처리

엄격모드(strict-mode)를 적용하지않고 아래의 코드를 실행하면 놀라운 일이 일어난다.

```javascript
function  getStudentName ( )  { 
    // 선언되지 않은 변수에 할당 :( 
    nextStudent = "Suzy" ; 
} 

getStudentName( ) ; 

console.log( nextStudent ) ; 
// "Suzy"-우연한 전역 변수입니다!
```

nextStudent값은 getStudentName에 선언되어있다.

console.log에서 nextStudent를 찾을 때 글로벌스코프에서 var로 할당한 nextStudent를 가져다 쓴다는것.

엄격모드를 사용하게 되면 위와같은 놀라운일이 생기지 않고 ReferenceError를 반환합니다.


> let, const에 대해 알아볼것 추천.
>
> 엄격모드가 아닌 es6의 let, const로 해결이 가능하다.
>
> 그럼에도 엄격모드는 사용하는걸 추천한다.

---
## 참고

- Lexical Scope in Javascript

https://olaf-go.medium.com/%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-ef3c8e8584d4

- 스코프

https://poiemaweb.com/js-scope