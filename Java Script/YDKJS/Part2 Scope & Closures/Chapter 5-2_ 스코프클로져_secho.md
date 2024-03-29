# Chapter 5-2_ 스코프클로져

---

- 5.5장 모듈



먼저 렉시컬 스코프에 대해 다시 정리해보자



JS는 코드를 실행할 때 컴파일 단계에서 토크나이징, 렉싱이 발생한다.

`var num = 42;` 라는 문자열을 잘게 쪼개 `토큰`이라는 조각으로 만드는 과정을 토크나이징이라 한다

(var, num, =, 5, ; 으로 쪼개어진다.)



렉싱은 토큰을 분석해 토큰에게 의미를 부여하는 과정인데, 개발자가 **변수를 어디에 작성하는지에 따라** 토큰이 분석되고, 스코프가 결정된다.

이때 구성된 스코프를 렉시컬 스코프라고 한다.

스코프는 함수, 블록, 렉시컬 스코프가 있는데 함수는 말그대로 함수내의 스코프, 블록은 `{}`내의 스코프, 렉시컬은 어디에 작성되어있는지에 따라 구성되는 스코프를 뜻한다.

- 렉시컬 스코프 : 컴파일 단계의 렉싱과정에서 변수, 함수들이 어디서 선언되어있는지에 따라 구성되는 스코프



```javascript
var a = 42;
function foo(){
    var b = 10;
    function bar(){
        var c = 10;
        console.log(a,b,c); // 42,10,10
    }
    bar();
}
foo();
```

이런식으로 작성할 때 실행단계에서 스코프는 결정이 된다.

위의 예제에서 전역스코프에는 `a, foo()`가 존재하고 `foo()`의 함수스코프에는 `b, bar()`가 존재하며, `bar()`의 함수 스코프에는 `c`가 존재한다.





### 클로저

클로저는 함수가 속한 렉시컬스코프를 기억해 이 함수가 밖에서 실행될 때 스코프에 접근할 수 있는 '기능'을 말한다



```javascript
function foo(){
    var a = 2;
    function bar(){
        console.log(a);
    }
    return bar;
}

var baz = foo();
baz(); // 2
```

대표적인 예제이다.

`baz`는 `foo()`의 반환값인 `bar`함수의 참조를 반환한다.

baz = bar이며, baz를 스코프 밖에서 실행해도 `bar`가 선언된 스코프내의 변수인 `a`를 참조하여 출력할 수 있는 것이다.

`foo()`는 `bar()`가 참조할 수 있도록 해당 스코프를 살려두어서  `bar()`는 이 스코프에대한 참조를 가진다.

이 참조가 바로 클로저이다.



### 반복문과 클로저

```javascript
for(var i = 0; i <= 5; i++){
    setTimeout(function timer(){
        console.log(i);
    }, i * 1000);
}
```

`setTimeout`과 같은 비동기함수는 Web API이다. Call Stack에서 실행된 비동기함수는 WebAPI를 호출하고 WebAPI는 콜백함수를 Callback Queue에 넣는다.

위의 예제에서 for문이 수행과정은 다음과 같다.

1. 함수스코프에 해당하는 `var i`가 1 더해진다.
2.  비동기함수인 `setTimeout`이  호출스택에 쌓인다.
3.  WebAPI를 호출해 `setTimeout`이 지정한 시간만큼 `대기`한다.
4. 대기가 끝나고 `timer()`라는 콜백함수를 Callback Queue에 넣는다. 
5. 호출스택이 비워질 때까지 과정을 반복한다

5단계에서 반복하지만, 호출스택은 이미 `i++`의 수행으로 다시 채워지기 때문에 호출스택이 비워지는 시점은 `for`문이 종료되고 난 후, 즉 `i = 6`일때다.

현재 콜백 큐에는 `timer()`가 5개 쌓여있고 for문이 종료된 시점부터 하나씩 수행하게 된다.

그러나 `var`는 함수 스코프이므로 i는 6인 스코프에 timer의 console이 참조하게 되고 큐에있는 모든 `i`는 6을 출력하게 된다.



정상적으로 ,1,2,3,4,5가 출력되기 위해선 다음과 방법을 사용한다.

```javascript
for(var i = 1; i<=5; i++){
    (function(){
        var j = i;
        setTimeout(function timer(){
            console.log(i);
        }, j * 1000);
    })
}
```

- 즉시 실행함수를 사용하고, 해당 함수스코프내에 `j`라는 변수를 매번 생성해 `setTimeout`의 콜백함수의 스코프를 생성한다.

```javascript
for(let i = 0; i <= 5; i++){
    setTimeout(function timer(){
        console.log(i);
    }, i * 1000);
}
```

- for문안의 `let`은 반복할 때마다 매번 선언된다.
- `timer`가 참조할 i는 매번 생성되는 해당 블록스코프의 `i`값이므로 0,1,2,3,4,5로 순서대로 출력될 수 있다.

> 호출스택이 빌 때까지 기다리며 비게되면 큐는 이벤트 루프를 통해 호출 스택에 들어가서 콜백이 실행된다. 
>
> 콜백 큐란 비동기적으로 실행된 콜백함수가 보관되는 영역이다.
>
> 이벤트루프는 콜스택, 콜백큐 상태를 체크하면서 콜스택이 빈 상태가 되면 콜백 큐의 첫번째를 콜 스택으로 넣는다.



## 5.5 모듈



> **모듈**이란  전체 어플리케이션의 일부를 독립된 코드로 분리하여 만들어 놓은 것이다.
>
> 모듈화의 장점은 다음과 같다.
>
> - 자주 사용되는 코드를 별도의 파일로 만들어서 필요할 때마다 활용할 수 있다.
> - 코드를 개선하면 이를 사용하고 있는 모든 애플리케이션의 동작이 개선된다.
> - 코드 수정 시에 필요한 로직을 빠르게 찾을 수 있다.
> - 필요한 로직만을 로드해서 메모리의 낭비를 줄일 수 있다.
> - 한번 다운로드된 모듈은 웹브라우저에 의해서 저장되기 때문에 동일한 로직을 로드할 때 시간과 네트워크 트래픽을 절약할 수 있다.(브라우저에서만 해당)



클로저를 사용하지만 표면적으로 콜백과 상관없는 코드패턴 중 가장 강력한 모듈을 알아보자



모듈 패턴 구현은 두가지 방식이 있다.



### 객체리터럴을 사용한 모듈 패턴

```javascript
var module = {
    key : '배고파',
    publicMethod: function(){
        return this.key;
    }
}
console.log(module.key); //배고파
console.log(module.publicMethod()); //배고파
```



### 클로저를 활용한 모듈패턴

```javascript
var module = (function() {

    /**
        * -----------------------
        * 모듈 패턴을 구현할 클로저 코드
        * -----------------------
        */

    // 은닉될 멤버 정의
    var privateKey = 0;
    function privateMethod() {
        return privateKey++;
    }

    // 공개될 멤버(특권 메소드) 정의
    return {
        publicKey: privateKey,
        publicMethod: function() {
            return privateMethod();
        }
    }

})()

console.log(module.publicMethod()); // 0
console.log(module.publicMethod()); // 1
```

- 즉시 실행함수로 모듈이 생성되고 반환된 값이 module에 할당된다.
- 이를 통해 메소드를 호출할 수 있다.



```javascript
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

위 코드패턴을 모듈이라한다.

모듈패턴의 조건은 다음과 같다.

첫째, 최외곽 함수인 `CoolModule`이 실행되지 않으면 내부 스코프와 클로저는 생성되지 않는다.

- `return 객체`를 하지 않으면 내부스코프에 참조할 수 있는 방법이 없으므로 인스턴스 생성을 해주어야한다.



둘째, 객체를 반환한다.

- 객체는 내장함수에 대한 참조를 가지만 변수는 갖지 않아 비공개이다. 객체의 반환값을 공개 API라고 생각할 수 있다..(?)





### 싱글톤 패턴

**객체를 하나만 생성해,** 생성된 객체를 어디서든 참조할 수 있도록 하는 패턴

```javascript
var singleton = (function() {

    var instance;
    var private = 0;
    function init() {
        return {
            publicKey: private,
            publicMethod: function() {
                return publicKey;
            }
        }
    }
    return function() {

        // 싱글톤 패턴은 아래 조건문에서 처음 인스턴스가 선언되면 다시 인스턴스를 만들지 않고 기존의 인스턴스를 리턴한다.
        if (!instance) {
            instance = init(); //publicKey, Method를 가진 객체
        }
        return instance;
    }
})()

var singleton1 = singleton();
var singleton2 = singleton();
console.log(singleton1 === singleton2); // true
```



### 클로져, 싱글톤의 차이

- 함수를 정의하는 클로저의 경우 인스턴스를 여러개 만들어 낼 수 있다.
- 싱글톤은 하나의 객체만 생성한다.



### 모듈패턴과 네임 스페이스 패턴으로 깔끔한 코드 작성

- 네임스페이스: 구분이 가능하도록 정해놓은 범위나 영역

- 네임스페이스 패턴 : 전역 변수의 단점을 보완, 

- 전역변수를 줄이기 위해 IIFE사용하므로 전역변수를 생성하지 않음. IIFE는 모듈 패턴의 기반이 됨.

  

```javascript
var app = app || {};
//app의 module을 즉시실행함수로 바로 모듈을 생성함
app.module = (function() {

    var privateKey = 0;
    function privateMethod() {
        return privateKey++;
    }

    return {
        publicKey: privateKey,
        publicMethod: function() {
            return privateMethod();
        }
    }
})();

console.log(app.module.publicMethod()); // 0
console.log(app.module.publicMethod()); // 1
```



- 모듈패턴은 아직 내 단계에서 어떤것이 더 좋은지 모르겠다. 디자인 패턴중 하나인데 직접 써봐야 이해가 빨리갈 듯하다.

- 각 환경에 따라 다양한 패턴을 사용할 것 같다. 

- JS에선 싱글톤패턴이 유용하지 않다고 하네? 

  

##### 출처

- [자바스크립트 모듈패턴](https://velog.io/@recordboy/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%ED%8C%A8%ED%84%B4)
- [네임스페이스 패턴](http://www.nextree.co.kr/p7650/)

- [싱글톤 패턴 예제](https://ideveloper2.tistory.com/160)

