# Prototype

---

Prototype은.. 어떤 객체의 메소드와 유사한 기능을 하는 객체를 만들고 싶을 때  메소드를 새로 생성하지 않고 약간의 기능을 얹은 다른 객체를 만들 때 사용한다.



### [[Prototype]]

객체가 갖는 숨김 프로퍼티, 다른 객체를 참조할 때 그 참조 대상을 `프로토타입` 이라고 한다.

"숨김"프로퍼티란 외부코드에서 접근 불가능하고, 값도 덮어 쓸 수 없는 프로퍼티다.

개발자가 이에 접근할 수 있는 방법이 있는데 바로 `__proto__` 를 사용해 접근하는 것이다.





```js
let rabbit = {
  name: 'toki',
}

let animal = {
  field: 'ground'
}

rabbit.__proto__ = animal;
```

`rabbit` 이 참조하는 대상이 `animal` 이고, 원래 접근할 수 없는 숨김프로퍼티인 `[[Prototype]]` 을 `__proto__` 를 사용해 접근해 참조대상을 직접 설정한 것이다.

그림으로 나타내면 다음과 같다.

![스크린샷 2021-05-16 오후 4 15 48](https://user-images.githubusercontent.com/55486644/118388881-fbf2ac00-b661-11eb-8586-4b43381c414e.png)

`animal`에 프로토타입을 지정하면  rabbit - animal - 다른obj로 참조대상이 쭉 연결된다. 이를 프로토타입 체이닝이라고 한다.

체이닝은 순환참조 허용 X, `__proto__` 의 값은 `null, obj`만 가능하다.



> `__proto__` 는 getter이자, setter이다.





### 함수의 prototype 프로퍼티

> `F.prototype`은 `new F`를 호출할 때만 사용된다.

`new F()`, 생성자함수를 사용하면 새로운 객체를 만들 수 있다.

위에서 사용된 프로토타입과는 다르다. 이름만 같은 프로퍼티이다.

해당 프로퍼티는 다음과 같은 기능을 한다.

`F.prototype`이 가리키는 대상이 객체면(null이 아니면) `new` 연산자는 `F.prototype` 을 사용해 새로 만들어지는 객체의 `[[Prototype]]` 을 설정한다.



정리하면, new 연산자로 새로 생성되는 객체가 가리키는 참조대상이 `F`의 프로퍼티인 `prototype`에 따라 지정된다는 것이다.



```js
function Rabbit(){
  this.name = 'toki';
}

let animal = {
  field: 'ground'
}

Rabbit.prototype = animal; // animal을 참조대상으로 해라 === 상속받아라.

let labbit = new Rabbit();
```



그림은 다음과 같다.

![스크린샷 2021-05-16 오후 4 25 01](https://user-images.githubusercontent.com/55486644/118389099-44f73000-b663-11eb-936d-87dc12d629d5.png)





### 함수의 protoype + constructor 프로퍼티

모든 함수는 `prototype` 프로퍼티를 갖고, 해당 프로퍼티는 `constructor` 프로퍼티 하나만을 갖는 객체를 가리킨다. `constructor` 는 함수 자기 자신을 가리킨다.

그림은 다음과 같다.

![스크린샷 2021-05-16 오후 4 42 48](https://user-images.githubusercontent.com/55486644/118389644-c18b0e00-b665-11eb-815f-8407611b4d61.png)



이 `constructor` 을 이용해 새로운 객체를 만들 수 있다.

```js
function Rabbit(){
  //Rabbit.prototype = {constructor : Rabbit }
}
let rabbit = new Rabbit();
// {Rabbit.prototype이 가리키는 객체를 참조하게 된다.} => {constructor : Rabbit }
let rabbit2 = new rabbit.contructor();

console.log(rabbit.constructor == Rabbit); // true
```



> 주의할점으로는 prototype이 가리키는 객체의 프로퍼티를 추가할 때, `Rabbit.prototype.jumps` 와 같이 추가하는 방법을 사용해야한다는 것. why? 객체를 생성할 때 constructor이 있음을 보장해주지 않기에, 객체를 직접 만든다면 일일히 이를 달아주어야한다.





##### 참고

- https://ko.javascript.info/function-prototype



##### next

- https://ko.javascript.info/class

