

# Chapter 3 네이티브

---

- 네이티브 객체는 브라우저, nodeJS 등에 종속되지 않은 에크마 스크립트 명세의 내장 객체를 뜻한다.
- 즉 에크마스크립트만의 내장 객체인 것.





## 0. 네이티브



- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

여기 나온 값들은 모두 Object의 인스턴스이다.

Object의 인스턴스라는 말은 위에 나온 것들 중 종류가 무엇이 되었든 [[prototpye]] 프로퍼티를 가지고 있어서 프로토타입 체이닝을 통해 `Object.prototype`까지 도달할 수 있다는 것

[[prototype]]은 브라우저의 `__proto__` 를 의미함

![](https://images.velog.io/images/secho/post/81b0b4ac-f092-4499-9845-5a0605bf84fb/image.png)



모든 프로토타입 체인의 끝은 항상 `Object.prototype` 이다. 그래서 `Object.prototype` 은 `__proto__` 속성이 없다.

이 네이티브를 생성자처럼 쓸 수 있다.

래퍼객체와 네이티브랑 조금 차이가 있다.

생성자처럼 쓸 수 있다 했는데 다음을 보자

- 생성자란 객체를 생성하는 함수. `Date`는 객체인데 `new Date()`로 객체 생성하는 것.
- 생성자는 대문자로 시작
- new 키워드로 호출
  - 함수를 new로 호출하지 않으면 함수안의 `this`는 항상 `전역객체`를 가리킨다!
  - 아래의 예제에서 Person(...)해버리면 전역객체 `window`에 프로퍼티가 추가되는 것. 새로 생성되지 않음.

```javascript
function Person(name, gender) {
    // new키워드를 빼먹고 생성했을 때의 방법
    if(this instanceof Person === false) {
    console.log(this); //window 전역객체
	return new Person(name, gender);
}

  this.name = name;
  this.gender = gender;
   
    //이 둘이 다른가?//
  this.sayHello = function() {
    alert(this.name + ' said "hello"');
  }
  Person.prototype.getName = function(){
      return this.name;
  }
}

let hi = Person('hihi', 'man');
var zero = new Person('Zero', 'm'); // Person {name: 'Zero', gender: 'm'}

/* this는 자기 자신 '마다' 갖고 있고
prototype은 부모 객체에만 갖고 있어서
이를 만들기 위해서 메모리를 덜 할당할 수 있는 방법인가?
*/
```

![](https://images.velog.io/images/secho/post/f60c0740-0d8a-4f40-babf-0f0a8dc0c3fb/image.png)



- 메모리에서 차이가 나는 것인가? prototype에만 선언된 함수를 '재이용'하는 것인지 (한번만 선언) this는 각 객체마다 함수를 가지고 있는 것인지 <- 둘이 차이점이 맞는지 궁금





```javascript
let a = new String("hello");
let b = "hello"
console.log(a.toString()); // "hello"

typeof a; //"object"
typeof b; //"string"
// a가 String의 인스턴스가 맞는지를 확인함
//인스턴스는 어떤 객체를 프로토타입으로 하는 다른 객체
a instanceof String // true
b instanceof String // false
```

new는 객체를 생성하는 것.

네이티브로 객체를 생성해 이를 반환함.

a의 타입은 객체인 것이고 String을 프로토타입으로 만들어진 객체이므로 `instanceof` 의 결과는 true인 것

b는 객체가 아닌 원시타입 따라서 `instanceof` 는 false값 이 나오는 것





### 0.1. 래퍼객체

- 래퍼객체는 원시타입에 대응하며 원시 타입임에도 불구하고 메소드를 호출할 수 있도록 **임시적으로 객체로 감싸주는 것을 얘기한다.**
- 프로퍼티 참조가 끝나면 객체는 소멸된다.



```javascript
"Hello".toUpperCase();
```

원래 "Hello"와 같은 String타입은 메소드가 없다. 그런데 위의 결과는 메소드를 수행한 결과를 얻을 수 있다.

왜? 해당 시점에 래퍼객체로 감싸져서 메소드를 사용할 수 있기 때문이다.

```javascript
var a = "hello";
a.someProperty = 111; // new String(a).someProperty = 111
a.someProperty; // undefined

```

이 래퍼객체는 임시객체라서 참조가 끝나면 바로 소멸한다.







## 1. 내부 [[Class]]



typeof가 object인 값은 [[Class]]라는 내부 프로퍼티가 추가로 붙는다.

`Object.prototype.toString()`으로 값을 볼 수 있다.



*Object.prototype.toString* 은 여러분이 인자로 넘겨준 object 의 클래스 이름을 반환해주는 메소드다. *toString* 을 통해서 얻을 수 있는 값은 제법 다양하게 있는데, 기본적으로 ECAMScript Edition 에 기재된 스펙을 기준으로 삼는다. 이 메소드는 object 의 클래스 타입이 무엇인지 확인할 때 유용하다



라고 한다. 인자로 넘긴 object의 클래스 이름을 보기 위해서 사용하는 것이다

```javascript
Object.prototype.toString.call([1,2,3]);
// [object Array]

Object.prototype.toString.call(/regex-literal/i);
// [object RegExp]
```



null과 undefined를 제외한 단순 원시값은 `박싱`이라는 과정을 통해 객체 래퍼로 감싸진다.





## 2. 객체래퍼의 함정



주의해야할 점이 있다.

```javascript
let a = new Boolean(false);

if (!a)
	console.log('hi');
```

위의 예제는 실행되지 않는다.

그 이유는 a는 객체 래퍼로 감싸졌기 때문이다.

객체는 truthy하다.



## 3. 언박싱



객체 래퍼의 원시값은 `valueOf()`로 추출한다.

원시값으로 벗기는게 아니라 그냥 원시 값으로 "추출"하는 것이다

`valueOf()`의 결과로 a의 타입이 변하진 않는다.

b에는 언박싱된 값이 대입된다.

```javascript
let a = new String("abc");
let b = a + "";
typeof a; "object"
typeof b; "string"
a.valueOf(); //"abc"
```





## 4. 네이티브, 나는 생성자다..



생성자는 가급적 쓰지말자..



```javascript
let a = new Array(3);
let b = [undefined, undefined, undefined];
let c = [];

c.length = 3;
console.log(a); //[empty x 3]
console.log(b); //[undefined, undefined, undefined]
console.log(c); //[empty x 3]
```

a랑 b는 결과값으로 보듯이 다르다.

무엇이 다를까?

![](https://images.velog.io/images/secho/post/7f307cbd-a8b6-4703-9301-d8412b6c2af1/image.png)

다르다!

a에는 슬롯이 없어서 `map()`이 순회할 원소 자체가 없다.



뭐, 결론은 `new Array(n)`과 같은 생성자로 배열을 만들면 순회할 원소가 없어서 메소드가 뜻하는 대로 동작하지 않는 경우가 있으니 하지말라는 것같다.



`Object(), Function(), RegExp()`도 마찬가지 선택사항임..

단, 정규표현식은 권장.

```javascript
new RegExp("패턴", "플래그"); // 이 형식으로 사용하자
```



`Date()와 Error()`은 리터럴 형식이 없어 유용하다

- 리터럴 = 소스코드의 고정된 값을 뜻함
- 숫자는 123, 배열은 [1,2,3], 객체는 {...}, bool은 true,false 등 정해진 값을 뜻함





### 4.1 심볼



앞에 new 붙이면 에러가 남.

`Symbol`은 충돌 염려없이 객체 프로퍼티로 사용 가능한 특별한 유일 값.

Symbol은 Symbol() 함수로 생성한다.

Symbol() 함수는 호출될 때마다 Symbol 값을 생성한다. 이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시 타입의 값. 즉, 프로퍼티로 사용하면 다른 "어떠한 프로퍼티와도 충돌하지 않는다."

```javascript
const obj = {};

const mySymbol = Symbol('mySymbol');
obj[mySymbol] = 123;

console.log(obj); // { [Symbol(mySymbol)]: 123 }
//Symbol()은 매번 호출되어서 새로운 Symbol값을 호출하기 때문에 유일한 값이라고 하는 걸까?
console.log(obj[mySymbol]); // 123
```

특별한 프로퍼티로 심볼이 사용된다고 한다.



### 4.2 프로토타입



내장 네이티브 생성자는 각자의 `prototype` 객체를 가진다.

- prototpye 객체에는 해당 객체의 하위 타입별로 고유한 로직이 담김

- String.prototype.XYZ은 String#XYZ로 줄여쓴다. 다른 것도 마찬가지.

- 예로, 모든 String객체는 String.prototype 객체에 정의된 메서드에 접근할 수 있다.

- 프로토타입 위임에 의해 모든 문자열이 메소드를 같이 쓸 수 있다.



### 알아야할 것

- 프로토타입



### 출처 및 참고

- [네이티브, 래퍼객체](https://m.blog.naver.com/PostView.nhn?blogId=tk2rush90&logNo=221065400439&proxyReferer=https:%2F%2Fwww.google.com%2F)

- [Object.prototype.toString](https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-object-object-%EA%B0%80-%EB%8C%80%EC%B2%B4-%EB%AD%98%EA%B9%8C-fe55b754e709)

- [symbol](https://poiemaweb.com/es6-symbol)

- [생성자](https://www.zerocho.com/category/JavaScript/post/573c2acf91575c17008ad2fc)