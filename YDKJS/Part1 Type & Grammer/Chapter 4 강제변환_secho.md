# Chapter 4 강제변환

---

- Object의 인스턴스라는 말은 그 object가 무엇이 되었든 간에 `prototype`프로퍼티를 갖고 있어 체이닝을 통해 `Object.prototype`까지 도달할 수 있다는 뜻. null, undefined를 제외한 나머지 타입들이 전부 object의 인스턴스.

- 타입을 바꾸는 과정이 명시적이면 타입캐스팅
- 암시적이면 강제변환이라한다.

```javascript
let a = 42;
let b = a + ""; //암시적
let c = String(a); //명시적

let d = "42";
+d; //42 <-이것도 암시적이겠지.
```

뭐, 어떻든 간에 그렇게 중요하지 않다고 한다. 의견이 분분하다고 함.







## 1. toString [object Object]..란?





문자가 아닌 값에서 문자열의 변환 작업은 `toString` 메소드로 한다.

```javascript
let a = 42;

a.toString(); //"42"
```



숫자인데 어떻게 toString 메소드를 써요?

toString 호출 당시 Number의 래퍼 객체로 프로토타입체인을 통한 상위 프로토타입이 `Object`를 가리키기 때문에 `Object`의 `toString`메소드를 사용할 수 있다.



#### [object Object]는 뭔가요..?

- `Object.prototype.toString`부터 알아보자
  - 인자로 들어온 값이 어떤 클래스 타입인지 알려준다.

- `func.call(thisArg,...)`. call()메소드는 함수의 메소드. call을 호출하는 주체가 인자로 들어온 객체처럼 동작하는 것.

```javascript
let a = {
	name : "hh",
	hi : function ()  {return this.name;}
}
let b = {
	name : "ccc",
}
console.log(a.hi()); //hh
console.log(a.hi.call(b)); // ccc
```

- `call`은 b가 주체로 hi를 호출한 것 `hi`는 b 객체의 메소드로 동작하게 해주는 것이다.



그럼 알고싶은건 언제나오냐고..? 다음을 봐보자

```javascript
Object.prototype.toString.call('12'); // [object String]
Object.prototype.toString.call(12);  // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(Symbol('hihi')); //[object Symbol]
Object.prototype.toString.call([]); 		// [object Array]
Object.prototype.toString.call({});			// [object Object]
Object.prototype.toString.call(null);		// [object Null]
Object.prototype.toString.call(undefined);	// [object Undefined]
```

`call`을 통해 인자로 들어온 객체들을 `Object`의 `toString` 으로 출력했더니 다음과 같은 결과를 출력한다.

인자로 들어온 객체(this)이 어떤 클래스인지 알려주는 것이다. 

'12'는 String 객체. 즉, `object String`을 통해 만들어진 것 . 객체를 문자열로 표현하면 [object ...]가 출력됨.







## 2.JSON 문자열화



### 2.1 toJSON은 안전한 값으로 만들기 위한 함수.

- `JSON.stringify`는 객체를 JSON 문자열로 변환하는 것.
- 객체의 `toJSON()`을 호출해서 문자열화하기 안전한 값으로 반환하는 것이고 stringify로 문자열화를 진행함

- 환형참조객체와 같은 구조를 해결하기 위해 `toJSON()`을 사용함

  - 프로퍼티 참조가 무한 순환되는 구조의 객체,

     마지막 객체가 첫 번째 객체를 참조하는 등 순환 참조가 발생하여 결국 메모리 누수를 유발하는 객체. 

```javascript
// 환형참조객체 예시
let o = {};

let a ={
  b:42,
  c:o,
  d: function(){}
};

o.e = a;

// JSON.stringify(a); -> 환형참조객체 문자열화 시 에러 발생

a.toJSON = function(){
    //직렬화에는 b만 포함시켜서 진행 -> 안전한 형태로 반환
  return {b : this.b};
};

console.log(JSON.stringify(a));
```



### 2.2 stringify의 두번째 인자 replacer, 세번째인자 space

`JSON.stringify`의 두번째 인자로 배열,함수를 전달할 수 있는데 이를 이용해서 필터링할 수 있다. 예제는 다음과 같다.



```javascript
let AA = {
  b: 42,
  c :"42",
  d :[1,2,3]
};
//b, c 프로퍼티에 대해서만 필터링 한다.
console.log(JSON.stringify(AA, ["b","c"]));

//프로퍼티 키가 c가 아닐때, b,d에서만 값을 반환한다
console.log(JSON.stringify(AA, function(key, value) {
  if (key !== "c") return value;
}));
//{"b":42, "d":[1, 2, 3]}

//이쁘게 잘 들여써줌.
console.log(JSON.stringify(AA, ["b","c"],"-"));

```



null이나 undefined 처리할 떄 유용할 듯하다.



세번째 선택인자는 space라 하며 지정한 문자를 추가해 읽기 쉽도록 들여쓰기가 가능.





## 3. 명시적 강제변환



### 3.1 문자열 <-> 숫자



문자열 <-> 숫자 변환은 `String(), Number()`을 이용한다.

```javascript
let a = 42;
let b = String(a); // "42";

let c = "3.14";
// +c => 3.14
let d = Number(c); // 3.14
```

`+c` 이런식으로 Number로 변환하는건 별로 일관되지 못함. 연산자가 들어가면 헷갈릴 수 있음 `5+ +c` 이런 케이스



### 3.2 날짜 -> 숫자

`+`는 Date 객체 -> 숫자 용도로 쓰임.

```javascript
let date = new Date("날짜입력");
+date // 1408...

let timeStamp = +new Date();// 현재 시각을 타임스탬프로 바꾸는 관용적 표현..이지만 ES5부터 Date.now()를 쓰셈
```





---

## 4. 암시적 강제변환



암시적 변환의 목적은 중요한 내용으로부터 주의를 분산시켜버리는 것들, 불필요한 상세구현을 줄이는 것임.



> y를 AnotherType으로, 그리고 SomeType으로 변환시키는 단계를 거친다.
>
> SomeType x = SomeType (AnotherType(y));
>
> 이 anotherType -> some 으로 거쳐가는 중간단계를 암시적으로 감출 수 있다. 항상이 아닌 어떤 상황에서는 말이다. 지저분함을 줄일 수 있다.
>
> SomeType x= SomeType(y);





### 4.1 문자열 <-> 숫자

`+` 연산자는 숫자의 덧셈, 문자열 접합할 수 있다.

```javascript
let a = "42";
let b = "0";
a + b // "420"

let c = 42;
let d = 0
c + d // 42

let a =[1, 2];
let b =[3, 4];

a + b; // "1,23,4" //??
```

위의 두 예제는 OK, 그런데 맨 밑은?

배열끼리 더했는데 문자열이 되었다. 왜그럴까

피 연산자중 하나가 객체면 toNumber()을 호출, 해당 메소드는 valueOf, toString을 호출한다. valueOf는 배열을 받으면 원시값을 반환할 수 없으므로 toString을 호출하게 되어서 두 배열은 각각 "1,2", "3,4"가 된다. 이 둘을 더하면 "1,23,4"가 되는 것이다.



toNumber을 호출을 어떻게 하냐는 `ToPrimitive`라는 형변환조절 메소드에 의해 형태가 바뀌는데.. 명세서 설명은 참고란에 추가해놓았다.



간략하게 이해해보면 비교연산이나 `+`연산에 따라서 피연산자가 어떤 형태냐에 따라서 수행되는 메소드(valueOf, toString)가 달라지게 되고 그에 따른 형변환이 일어나는 것이라고 이해했다.



위의 예시에서는 객체를 반환할 수 없는 `valueOf` 이기 때문에 toString이 호출되어서 배열이 문자열형태로 변하는 것 처럼 말이다.



따라서 평범한 원시 값이 아니라 객체면 연산으로 인한 결과값이 달라질 수 있다는 것..



```javascript
let a = {
	valueOf : function() { return 42;}
	toString : function() { return 4;}
}
a + ""; //"42" //42 + "" => "42"
String(a); // 4
```

`String(a)`는 그저 toString을 호출할 뿐이지만, `ToPrimitive`연산 과정에서 a + ""는 a를 valueOf()에 전달해 호출하고, 반환값이 원시값(42)이기 때문에 toString을 호출해서 문자열인 "42"가 출력되는 것.



### 4.2 불리언 -> 숫자

불리언을 숫자로 표현하면 로직구성이 간단해진다.

```javascript
//3개중 하나만 true일 때 true
// !!은 not not. -> 불리언으로 강제 변환
function onlyOne (a, b, c){
	return !!(a && !b && !c) ||...
}

function onlyOne(...args){
    let sum = 0;
    args.forEach((value, idx) => {
        //여기서 value는 true, false
		if (value) sum += value
        //sum += value에서 변환이 일어남
    });
    return sum == 1;
}
```

위의 예제처럼 불리언->숫자로 변환하면 코드가 간결해지고 보기 쉬워진다.

sum += value에서 변환이 일어난다.





### 4.3 ||, &&은 논리 __ 연산자다



|| ,&&연산자는 다른 언어에서 true 또는 false의 결과값이지만 JS는 아니다. 피 연산자 중 한 쪽이다.

```javascript
let a = 42;
let b = "abc";
let c = null;

a || b; //42 truthy // 앞에거
a && b; //"abc" //truthy // 뒤에거
c || b; //"abc" //falsy // 뒤에거 
c && b; //null //falsy // 앞에거
```



요약해서 `||`에서 true면 첫번째 피연산자, false면 두번째 피연산자를 반환한다.

a ? a : b 와 같음

&&은 그와 반대인 true면 두번째, false면 첫번째

a ? b : a와 같다.



#### || 활용 예제

```javascript
function foo(a,b){
    a = a || "hello";
    b = b || "world";
    console.log(a + b);
}
foo(); // hello world
foo("hi","boy") // hi boy
```

이런 방식으로 디폴트 값을 할당할 수 있다.



#### && 활용예제

&&은 가드 연산자라고도 불리우는데 다음과 같다

```javascript
function foo(){
    console.log(a);
}
let a = 42;
a && foo(); // truthy 여야 두번째인자 수행
```

a를 사용하는 foo함수가 안전하게 호출되려면 `&&`연산자를 활용한다. if(a) foo()와 같지만 이렇게 해석하는 법을 알아두면 좋다.



#### 답은 뭘까요

```javascript
let a = 42;
let b = null;
let c = "foo";

if (a && (b || c)) 
	console.log("hh");
```

상기 예제에서 `(a && (b || c))`의 반환값은 뭘까?

바로 c, "foo"다.

먼저 a를 보고 true니깐 그 뒤 피연산자를 선택한다.

이것(`b || c`) 또한 수행하며 falsy여서 2번째 피연산자인 "foo"가 반환되는 것





## 5. ==, === 느슨한 / 엄격한 동등 비교

> ==와 ===는 동등함을 비교하지만 차이점이 존재함.
>
> ==는 값을, ===는 값, 타입의 동등을 비교한다. 라고 하지만 이는 틀렸다.
>
> ==는 강제변환을 허용하지만 ===는 허용하지 않는다가 맞다.

따라서 강제변환이 필요하면 ==를, 아니면 ===를 사용하자.



```javascript
let a = 42;
let b = "42";

a === b ;//false
a == b ; //true
```

타입이 달라서 `===`연산에서 false나는건 OK

그러나 42가 문자열로 바뀌는건가 아니면 문자열이 숫자로 바뀌는건가?

이는 명세를 봐야한다.

순서대로 a가 number, b가 string이면 `a == ToNumber(b)`비교결과 반환

a가 string, b가 number면 ToNumber(a) == b 결과 반환이다.

즉, `a === b`는 a가 number이라 문자열인 b가 `ToNumber`로 반환되는 것.



**다시말해 문자열이 숫자로 바뀐다는 것!!**





### 5.1 불리언 비교하기

```javascript
let a = 42;
let b = true;

a == b ; //false
```

명세에 따르면 피연산자중 불리언값이 `ToNumber`로 변환된다고 한다. 따라서 b가 1로 변환되어 `42 == 1`의 결과인 false.



```javascript
let a = "42";
let b = true;

a == b ; //false
```

여기선 `"42" == 1` 을 비교하는데 한번 더 변환을 수행하므로(위에서 문자열, 숫자에서. 문자열이 숫자로 변함) `42 == 1` false.



> 책에 따르면, == 에서 true, false를 지양하라 한다.



### 5.2 null -> undefined 비교하기



> 명세에 따르면
>
> null == undefiend => true
>
> undefined == null => true

따라서 강제변환이 이뤄지는 느슨한 동등비교에서 null, undefined는 같다. 라고 생각하면 되고

다음과 같이 사용하면 될 듯 하다.

```javascript
let a = doSomethin();
if (a == null){...}
```

doSomethin()이 null, undefined를 반환할 경우 true이므로`a == null`는 가독성 좋고 안전한 암시적 변환이다.



### 5.3 객체, 비객체 비교하기

> x가 String 또는 Number, y가 객체면, x == ToPrimitive(y);
>
> x가 객체, ToPrimitive(x) == y

```javascript
let a = 42;
let b = [42];

a == b; //true
```

b는 추상연산결과"42"가 되고 "42" == 42 => 42 == 42가 되므로 true이다..

후,,





### 출처 및 참고

- [[object object?]](https://flowarc.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8Javascript-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)

- [toPrimitive 튜토리얼](https://ko.javascript.info/object-toprimitive)

- [toPrimitive 설명](https://kjwsx23.tistory.com/123)