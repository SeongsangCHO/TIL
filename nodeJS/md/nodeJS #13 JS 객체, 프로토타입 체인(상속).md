## JS 객체, 프로토타입 체인(상속)



객체는 `{ }` 로 구분되며 키와 값의 쌍을 갖는다.

객체를 초기화하는 방법은 빈 `{ }`을 할당하는 것과 직접 명시해주는

`var obj = { car : 'porshe', model : '911' }`로 할당할 수 있다.

 <br>

##### 객체에 접근하기 위해선 `key`값이 필요하다.

`obj`객체의 `car`에 접근하려면 여러 방법이 존재한다.

- 먼저, `obj.car`로 접근할 수 있으며 반환은 `porshe`이다.

- 대괄호로도 접근할 수 있다. `obj['car']` => 반환은 같다.
- str로 접근할 수 있다. `str = car` , `obj[str]` => 같다.





##### 객체의 모든 속성을 열거하기

```javascript
function listAllProperties(o) {
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = o; objectToInspect !== null; 
           objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
        result = result.concat(
            Object.getOwnPropertyNames(objectToInspect)
        );  
    }
	
	return result; 
}
```

이 함수를 사용하면 모든 속성을 열거할 수 있다.





##### 속성 삭제

`delete`연산자를 이용해 속성을 삭제할 수 있다.

`delete obj.key`





### hasOwnProperty

객체가 특정 프로퍼티에 대한 소유여부를 반환한다고 한다.

~~??~~

어느 객체가 어떤 프로퍼티를 갖고있는지에 대해 반환.

```javascript
let obj = {
	car : 'porshe'
}
obj.hasOwnProperty("car"); // true
obj.hasOwnProperty("horse"); // false
```

 

**프로토타입 체인은 확인하지 않는다.** 어떤의미일까.



##### 프로토타입

프로토타입을 이용하면 객체-객체를 연결하고 한쪽 방향으로 상속받는 형태로 만들 수 있다.

**상속**은 멤버 함수, 변수를 **공유**한다는 뜻이다.

밑에 참고링크에서 가져온 예제를 보자.

```javascript
var a = {
    attr1: 'a1'
}

var b = {
    attr2: 'a2'
}

b.__proto__ = a;

b.attr1 // 'a1'
```

객체가 지닌 `__proto__`속성을 이용하면 객체가 갖고 있지 않은 멤버변수나 함수를 다른객체에서 상속받아 사용할 수 있다.



[쉽게 이해하는 자바스크립트 프로토타입 체인](https://meetup.toast.com/posts/104)





정리하자면, `hasOwnProperty`는 현재 객체가 다른 객체의 프로퍼티를 상속(공유)하고 있어도 이에 대한 것은 확인하지 않고 오직 자신의 프로퍼티만 확인한다는 의미이다.

`hasOwnProperty`는 가독성을 향상시켜준다.

프로토타입 체인을 고려하지 않고 해당 객체의 프로퍼티만을 고려한다는 것을 암시한다.



```javascript
const me = {
    firstName: "Lee", 
    lastName: "JungHyun",
    toString() {
        return this.firstName + this.lastName;
    }
};
let text = "The author name is "; 
// Bad - 프로토타입 체인을 통해 Object.toString 접근 
if (me.toString) { text += me; } 
// Good - 직접 정의 or 오버라이딩한 프로퍼티가 있는지 확인 
if (me.hasOwnProperty("toString")) { text += me; }

출처: https://mygumi.tistory.com/330 [마이구미의 HelloWorld]
```

`hasOwnProperty`를 이용해 직접 정의하거나 오버라이딩한 프로퍼티를 사용해 내가 원하는 것을 이용하는지에 대해 확인하며 예상치 못한 버그를 대비할 수 있다고 한다.

만약 bad의 예시처럼 프로토타입 체인을 통해 Object의 메소드인 toString을 호출하면 내가 원하지 않는 에러가 발생할 수 있기 때문이다.

