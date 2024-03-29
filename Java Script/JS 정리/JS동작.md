JS동작스



## JS동작

JS는 컴파일언어? 인터프리터언어?

인터프리터언어이다. 그러나 실행중 컴파일이 필요한 경우에만  엔진 내부에서 컴파일 과정을 거친다



컴파일이란 작성된 코드를 기계어로 변환하는 것을 말한다.

인터프리터는 번역과 동시에 실행이 이루어짐



동작과정은 js파일 파싱 => AST 생성, 인터프리터가 코드를 실행, 바이트코드 생성, 바이트코드는 인터프리터 모드일 때 바이트코드를 실행하고, JIT모드일때 컴파일러에게 보내고 이를 기반으로 기계어를 생성.



바이트코드 : 실행프로그램의 이진표현법

JIT컴파일 (just-in-time) 프로그램을 실제 실행하는 시점에 기계어로 번역하는 컴파일기법.



#### 1. JS 특징

JS는 단일 쓰레드기반언어인 이유는 JS엔진이 **단일 호출스택**을 사용한다는 관점에서만 OK

JS가 구동되는 환경(브라우저, nodejs)에서는 주로 여러개의 스레드가 사용, **JS엔진과 상호 연동을 위한 장치가 이벤트루프인 것**

- 한번에 하나씩 작업을 처리
- 그러나 웹을 보면 동시에 처리되는 것 처럼 보인다.
- Node.js기반 서버는 동시에 다수의 HTTP요청을 처리하기도 함
- 어떻게 JS는 쓰레드가 하나인데 **동시성**을 지원할까?
  - 이벤트루프를 통해 **비동기방식**으로 **동시성**을 지원

- 블록킹 I / O

  - 파일을 읽기위해 시스템콜을 OS에게 보냄
  - 커널은 I / O처리를 하고 어플리케이션은 다 읽을 때까지 기다리는데 이를 **Blocked**되었다고 함

- 단일 쓰레드가 아닌 멀티쓰레드

  - 멀티스레드 : 여러 쓰레드가 동시에 실행되어 요청을 처리
  - 쓰레드기반 동작발생에 대한 문제는 2가지가 있음
    - 블록킹 I  / O 자체 문제 : I / O 요청하고 **응답올때 까지 아무것도 하지 않고 시간을 낭비**
    - 문맥교환 비용 : 쓰레드가 많아질수록 문맥교환에 따른 성능저하 발생
  - 이러한 문제를 **싱글 쓰레드, 이벤트기반 비동기 I/O처리**로 해결가능

  - 싱글 쓰레드 노드는 I/O작업이 시작되면 응답을 기다리지 않고 **바로 다음 작업을 실행**함
    - I/O작업이 종료되면 **이벤트 발생**하고 해당 프로세스의 **이벤트큐**에 등록함

#### 2. 동시성을 지원하는 이벤트루프

이벤트루프는 자바스크립트 엔진(V8)이 아닌 **브라우저, nodejs**에서 지원한다,

**nodejs**는 비동기 입출력을 지원하기 위해 `libuv`라이브러리를 사용하고 이 라이브러리가 `이벤트루프를 지원`한다.

1. 클라이언트가 웹서버에 HTTP 요청
2. 서버에서 **이벤트루프가 계속 돌다가** 이를 감지한다.
3. 알맞은 작업을 워커 쓰레드를 생성해 실행함
4. 이벤트루프는 해당 워커쓰레드의 작업이 완료되기까지 기다리지 않고 바로 복귀하여 다른 요청을 기다림

=> **요청 발생시 그 작업에 대한 쓰레드만 실행하고 다시 복귀함**

=> **쓰레드가 작업을 마치면 미리 전달받은 콜백함수를 실행하도록 이벤트루프에 전달하고 이벤트루프는 이를 실행해 클라이언트에 결과를 응답**

=> 요청 -> 이벤트루프가 알맞은 작업을 워커쓰레드를 통해 실행 -> 복귀 -> 작업완료시 이벤트루프가 콜백함수 실행 -> 응답

이때 워커쓰레드는 쓰레드풀의 **넌 블럭킹 워커**라고 함 -> 내부적으로 멀티 쓰레드풀을 사용하기도 함 [참고](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174356/node-js%EC%9D%98-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90)





![image](https://user-images.githubusercontent.com/55486644/96998509-85c81400-156e-11eb-82bb-570ae218cedd.png)

1. 코드가 실행되면 엔진은 전역 실행컨텍스트, 콜스택, 글로벌 메모리를 생성한다.

2. 코드를 읽으면서 글로벌 메모리에 코드 상의 변수, 함수를 저장한다.

3. 함수가 실행되면 콜스택에 push한다

4. 함수가 실행되면 엔진은 **지역 메모리를 갖는 지역 컨텍스트를 생성한다**
5. 

이를 다루기전에 먼저 실행컨텍스트에 대해서 알아야함

[이미지 출처](https://medium.com/@valentinog/javascript-what-is-the-execution-context-what-is-the-call-stack-bd23c78f10d1)

#### 3. 실행컨텍스트?

스코프 호이스팅 this, 클로저 등의 동작원리를 담는 JS의 핵심원리이며

**ECMAScript 스펙**에선 "실행 가능한 코드를 형상화하고 구분하는 추상적인 개념"이라고 정의함.

**실행 가능한 코드가 실행되기 위해 필요한 "환경"**이라고 풀어쓸 수 있음.



##### 3. 컨텍스트 생성순서

컨텍스트 종류는 다음과 같다

- 함수가 실행될때마다 생성되는 함수컨텍스트
- 코드가 실행되면 생기는 전역컨텍스트

<br>

코드가 실행되는 순간 컨텍스트가 생성이 되는데  종류에는 `전역`, `함수` 컨텍스트가 있음. 이 컨텍스트가 생성되면 그 안에 생기는 것들도 있는데 다음과 같다.

**컨텍스트 생성시 생성되는 것들**

- 변수객체
- scope chain
- this

컨텍스트가 생성되고 함수가 실행되면 함수안에 사용되는 변수들은 첫번째로, **변수객체**안에서 값을 찾고, 없으면 **스코프체인**을 따라 올라가면서 변수를 찾는다.

함수가 끝나면 해당 컨텍스트는 사라진다 (클로저 제외)

페이지가 종료되면 전역 컨텍스트는 사라진다.

<br>

```javascript
var name = 'zero'; // (1)변수 선언 (6)변수 대입
function wow(word) { // (2)변수 선언 (3)변수 대입
  console.log(word + ' ' + name); // (11)
}
function say () { // (4)변수 선언 (5)변수 대입
  var name = 'nero'; // (8)
  console.log(name); // (9)
  wow('hello'); // (10)
}
say(); // (7)
```

10번에서 `wow()`가 호출되었을 때 스코프체인이 `say()`가 아닌 `전역객체`인이유?

- 함수가 중첩된 경우가 아니다 (함수안에 함수선언이 아님)
- `wow()`는 전역에 선언되어있으므로 선언 당시에 이미 전역에 스코프체이닝이 되어있음

- 함수가 **어디서 호출** 되었는지, **어디서 선언** 되었는지에 따라 상위 스코프를 결정할 수 있음
  - **어디서 호출** : 동적 스코프
  - **어디서 선언** : 렉시컬 스코프

<br>

#### 4. 클로저?

함수를 리턴하고 리턴하는 함수가 클로저를 형성

JS는 함수안에 정의된 변수는 밖으로 빠져나갈 수 없는 유효범위(스코프)가 있다..

클로저 : 함수와 함수가 선언된 어휘적 환경의 조합...

- setTimeout의 예시

```javascript
for (var i=0; i<100; i++){
    setTimeout(function(){
        console.log(i);
    }, i*100);
}
```

0, 9900ms까지 100ms가 증가하면서 i가 콘솔로 찍힐 것 같은가요?

- 아니요 `100`만  `100`번찍혀요
- 왜요?

`setTimeout`은 비동기함수니까 콜스택에 가지 않고  웹 API에서 처리하고 콜백함수가 `이벤트큐`에 가거든요

동기작업이 `콜스택`에서 작업이 완료되어 pop된 순간 (콜스택에 비어있어야) `이벤트큐`에 있는 작업(콜백 내용인 console)을 콜스택에 push하여 실행시키거든요. 그 말은 for 동기함수가 이미 완료된 직후 비동기함수를 실행시킨다는 거죠?

스코프문제네, for문의 i는 0~100까지 돌아가고 이제 비동기함수가 i를 사용할 때 변수객체의 i를 참조해서 콘솔이 찍히는데 이때 i는 100이라서 100만찍히는거네.



=> 그럼 어떻게 해결해여;



문제가 되는 부분은 비동기함수가 동기함수의 변수를 사용한다는 것이에여 그 변수를 비동기에서의 스코프로써  쓸 수 있도록 `함수`로 감싸줘요 `함수로 변수를 고정한다고 해서` **클로져**라고 부르는 거에여



함수인자로 전달된 j가 setTimeout이 참조할 대상이 되므로, call(0~100)까지 호출된 함수의 내용인 setTimeout의 콜백이 이벤트큐에서 각 함수의 변수를 참조해서 호출되므로 원하는 결과를 얻을 수 있다.

```javascript
for (var i = 0; i < 100; i++) {
    function call(j) {
        setTimeout(function () {
            console.log(j);
        }, j * 100);
    }
    call(i);
}
```

dispatch호출할때랑 똑같이 생겼넹 useEffect안에 async함수 못써서 이렇게 했던 기억이.



이 방법보다 **즉시 실행**하는 형식을 더 많이 사용

```javascript
for (var i = 0; i < 100; i++) {
    (function call(j) {
        setTimeout(function () {
            console.log(j);
        }, j * 100);
    })(i); //()로 감싸고 인자전달하면 그 함수 실행
}
```



[참고자료](https://medium.com/@chrisjune_13837/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80%EB%9E%80-d0150952b9df)

[mozilla docs 클로져](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

<br>

#### 5. 함수 표현식과 선언식 그리고 화살표함수

일단 이 둘 간의 생김새부터 확인해보자.



##### 5.1 함수 선언문 -> 호이스팅 영향 O

일반적으로 많이쓰는 함수 선언방식과 유사하다.

컨텍스트 생성 후 바로 대입되기때문에 어디에 선언, 호출을 하여도 에러발생하지 않음

```javascript
function 함수명(){
	...
}
```



##### 5.2 함수 표현식 -> 호이스팅 영향 X

JS의 특징을 활용한 선언방식

표현식 = **값을 반환**하는 식 또는 코드

함수의 참조값을 변수에 저장하는 것임.

함수 선언식 보다 유용하게 쓰이는 경우가 있음

- 클로져 (함수 실행 전 함수에 변수를 전달하고 싶을 때)
- 콜백

```javascript
const 함수명 = function(){
	...
}
```

둘 다 많이 사용했고 많이 봐왔던 것이다.



계속해서 내용이 연결되어 등장하게 되는데,, 호이스팅은 또 뭔가

<br>

#### 6. 호이스팅?

변수를 선언하고 초기화했을 때 선언 부분이 **최상단으로 끌어올려지는 현상**  ~~뭔솔스~~ -> 코드를 구현한 위치와 관계없이 **호이스팅**에 따라 브라우저가 JS를 해석할 땐 맨 위로 끌어올려지는 것.

실제로 코드가 올라가는건 아니다. `parser`내부적으로 끌어올려 처리하는 것이다.

##### 6.1 대상

- var 변수 선언
- 함수 선언식
- let / const, 함수표현식은 호이스팅 발생 X



즉, 함수를 맨 밑에 선언했다면 맨 위로 끌어 올려지는 것

```javascript
//함수 선언식
say();
good();

function say(){
...
}

var good = function(){
...
}
```

상기 코드를 수행한다면,

```javascript
function say(){
...
}

var good; // 호이스팅이 적용되 위로 끌어올려짐

say();
good(); // good is not a function으로 에러가 발생

good = function(){ //대입되기전 함수가 수행됨
...
}
```



JS엔진이 JS파일을 쭉 읽으면서 **선언된 변수, 함수**를 **메모리**에 저장.

위의 예시로는 `say()`함수 전체, `good`변수를 메모리에 저장.

`say()`는 전부 메모리에 있어서 수행가능한데, `good`은 변수만 저장되어있으므로 실행에러가 발생한다.

따라서 **호이스팅**은 함수를 사용하기 전에 함수를 **선언**해야한다는 ~~절차적~~인 규칙을 무시하므로 코드구조를 엉성하게 만들 수 있기에 **함수 표현식을 권장**한다고 [에어비엔비 JS 스타일가이드](https://github.com/imacoolgirlyo/javascript#functions--declarations)에 언급되어있다고 한다.

추가로, **함수 표현식에서는 세미콜론을 사용, 선언에서는 ; 사용 X**

```javascript
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// lexical name distinguished from the variable-referenced invocation(s)
//함수 이름이 있는 표현식이 좋다! 에어비앤비피셜
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```







