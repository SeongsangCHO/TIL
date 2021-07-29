# [1. Scope](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/ch1.md)

## 컴파일러이론

자바스크립트는 실행 되기전 컴파일하는 과정이있다.

### 1. Tokenizing / Lexing

문자열을 토큰이라는 덩어리로 나눈다.

```javascript
var a= 2;
```
위의 코드를 예를 들면 var, a, =, 2, ; 로 tokenizing된다.

> lexing은 구문 분석에 사용되는 문법을 단순화 하는데 사용한다고 한다.
>
> 주석제거, 이스케이프 문자 교체와 같은 작업을 한다.
> 
> [참고: Javascript evaluator part 1: Lexing
](https://medium.com/@retep007/javascript-lexing-for-high-performance-f9a800ec930d)

### 2. Parsing
토큰 스트림(배열)을 가져와서 언어구문을 검증하고 프로그램의 AST(Abstract Syntax Tree, 트리구조)를 만듭니다.

### 3. code-generation
AST를 가져와 실행 가능한 코드로 바꿉니다.

## 스코프의 이해
프로세가 어떻게 동작할까

- 엔진: 자바스크립트의 프로그램 시작부터 끝까지 컴파일과 실행을 담당
- 컴파일러: 파싱 및 코드생성의 일을 처리
- 범위(scope): 식별자의 엑세스 할수있는 방법에 대한 규칙 적용

### 엔진이 var a = 2; 를 처리하는 방법

```javascript
var a = 2;
```
위의 코드를 일반적으로 생각하면
> 변수에 메모리를 할당하고 레이블을 a지정한 다음 2해당 변수에 값 을 붙입니다.

라고 생각하게된다.

컴파일러는 다른방식으로 작동한다.
1. 컴파일러는 var a를 만나면 스코프에 a가 존재하는지 확인한다. 존재하면 패스, 존재하지 않으면 엔진에게 a를 생성하라고 요청한다.

2. 컴파일러는 a = 2 를 엔진이 처리할수 있는 코드를 생성한다.

스코프에 a라 부르는 변수가 현재 스코프에서 접근할수 있는지 확인하고 찾으면 변수에 대입, 없으면 에러를 발생시킨다.

## Compiler Speak
컴파일러는 변수가 선언된 위치에 따라 LHS,RHS 검색을 한다.

L,R은 Left, Right를 뜻한다.

LHS는 = 왼쪽에 변수가 있을때 사용되고 
```javascript
a = 2
```

RHS는 LHS외로 사용된다.
```javascript
console.log(a)
```
console, log, a를 RHS 방식을 찾는다.

### 왜 RHS와 LHS를 구분하는게 중요한가?

RHS검색방식으로 찾았을때 스코프의 변수를 찾지 못하면 ReferenceError을 발생시킨다.

또는 그 값을 가지고 불가능한 일을 하려고 할 경우 (숫자를 함수처럼 호출하는경우) TypeError을 일으킨다.

LHS는 새로운 변수를 생성해서 엔진에게 넘겨준다.

---
### 참고

https://velog.io/@geuni1013/You-Dont-Know-JS-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-%EC%A0%95%EB%A6%AC