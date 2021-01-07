# Chapter 1 : 타입

---

- JS는 타입이 있다.
- 타입이란 어떤 값을 다른 값과 분별할 수 있는 고유한 내부 특성의 집합이다.



## 1. 내장타입

JS에는 7가지 내장 타입이 존재한다.

- undefined
- null
- Boolean
- Object
- String
- Number
- Symbol

UNBOSNS으로 외우자 ㅎㅎ

Object를 제외한 나머지를 원시 타입이라 한다.



### 1.1 Typeof 로 알아보는 내장타입

값에 대한 타입은 `typeof` 연산자로 알 수 있는데 연산자를 통해 반환된 타입은 문자열로 표현된다.

- `typeof typeof 13` => 13은 "Number"  이것은 문자열 => String

- null을 제외한 나머지 6개는 반환값과 매칭된다. `typeof undefined === "undefined"`.. 

  - `typeof null`은 object로 반환된다.

  - null을 정확히 확인하려면 조건 하나를 더 추가해야한다.

  - ```javascript
    let a = null;
    (!a && typeof a === "object"); //true
    ```

  - null은 `falsy`한 유일한 원시값이지만 타입은 `object`인 특별한 존재..

    - `0, -0, 0n, "", null, undefined, NaN` 도 falsy한 값

- `typeof function a(){...}`의 반환은 `function`이다

  - `function`타입은 실제로 `Object`의 하위 타입이다.

  - 즉, 함수는 객체여서 함수에 프로퍼티를 둘 수 있다.

  - ```javascript
    function a(var1, var2){...}
    a.length; //2
    // a의 인자는 2개이므로 함수 객체의 length 프로퍼티로 알 수 있는 것.
    ```

- `typeof [1, 2, 3]` 의 반환은 `object`이다.

  - 즉 배열도 그냥 객체다.





### 1.2 값은 타입을 가진다.



값에는 타입이 있지만 변수에는 없다. 무슨말일까?

```javascript
let a = 42;
typeof a; // number
```

위의 결과는 당연하다. typeof는 a라는 "변수"의 타입이 아닌 42라는 "값"의 타입을 나타낸 것이다.

즉, JS에서 타입이란 변수의 타입이 아닌 변수에 들어간 "값"의 타입을 뜻한다. 



### 1.3 값이 없는 VS 선언되지 않은



값이 없는 변수는 `undefined` typeof도 이와 같다.

그러나 선언되지 않은 변수의 타입도 `undefined`지만 이 둘은 다르다.

?

```javascript
let a;
typeof a; // "undefined"
typeof b; // "undefined"
```



![](https://images.velog.io/images/secho/post/f9c3c6f2-117e-46c9-b9bd-0fda234dcc50/image.png)



선언되지 않은 변수를 체크하면 `ReferenceError`이 발생한다.

따라서 (잘 쓰진 않겠지만) 전역 변수의 선언여부를 확인할 때 에러가 발생하지 않도록  3번째 방식과 같은 안전하게 체크해야한다.



