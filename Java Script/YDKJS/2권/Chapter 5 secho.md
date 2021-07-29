# Chapter 5 프로토타입

---

프로토타입에 대해 학습한다.



## 5.1 [[Prototype]]

객체에는 `prototype` 이라는 프로퍼티가 존재한다.

이는 다른 객체를 참조하는 단순 레퍼런스로써 사용한다.



```js
let orgObj = {
  a : 2
}

let newObj = Object.create(orgObj);

newObj.a; // 2
```

위는 `orgObj`에 연결된 객체를 생성한 예제이다.

새로 생성된 객체에는 프로퍼티가 없으나 참조할 때, 프로토타입으로 연결된 객체를 연쇄적으로 타고 올라가서 찾는다.

제일 상단에는 `orgObj` 를 생성한 `Object` 가 있으며 해당 객체역시 프로토타입 프로퍼티를 가진다.

연쇄는 해당 객체에서 종료된다.



### 5.1.2 프로퍼티 세팅과 가려짐

만약 어떠한 객체와 이를 연결되어 생성된 객체 둘 다 같은 이름의 프로퍼티를 가진다면 어떻게 될까?

프로토타입의 연쇄로 타고 올라가다가 먼저 만난 프로퍼티를 찾게된다.

상위에 있는 프로퍼티는 `가려진다` 라고 표현한다.



책에서 나오는 가려짐의 3가지 경우의 수를 보자



#### 가려짐(Shadowing)

1. 상위에 `foo` 가 존재하지만, `writable : true` 일 때, 하위에서 프로퍼티가 추가되어 상위는 가려진다. --책에 오타난 것 같음.
2. 상위의 `foo` 가 `writable: false` 이면 하위 객체에서 프로퍼티는 생성되지 않는다.
3. 상위의 `foo`가 세터일 경우 항상 세터가 호출되고, 하위에서 추가되거나 재정의되는 일은 없다.

```js
let orgObj = {
}

Object.defineProperty(orgObj, "foo",{
  value:'orgObj',
  writable:true
})

let newObj = Object.create(orgObj);

newObj.foo = 'newObj'
console.log(orgObj.foo); //orgObj  //writable이 true일 때
console.log(newObj.foo); //newObj //상위 가려짐

console.log(orgObj.foo); //orgObj  //writable이 false일 때
console.log(newObj.foo); //orgObj //생성되지 않음
```





가려짐은 암시적으로도 발생한다.

```js
let orgObj = {
  a:2
}

let newObj = Object.create(orgObj);
newObj.a++;


orgObj.a; // 2
newObj.a; // 3  => newObj.a = newObj.a + 1;과 같으므로 새로 생성됨
```





## 5.2 클래스

계속나오지만 자스는 클래스가 클래스가 아니다.

왜 자꾸 헷갈리게 만들어 ! 클래스랑 비슷한 역할을 하는 기능이 있는데 그걸 클래스라 한다.

그럼 자스는 클래스를 어떻게 흉내내었나.

좀 더 알아보자



먼저, 모든 함수는 기본적으로 프로토타입이라는 프로퍼티를 갖는다

```js
function Foo(){}

Foo.prototype; // {} <- 객체이다.
```

Foo의 prototype은 객체다.

연결점이라고 생각하면된다.

`new Foo()` 를 통해 만들어진 객체들은 저 prototype에 연결된다.



`new` 는 두가지 기능을 하는데 첫째는

새로운 객체가 생성되는 것이고 프로토타입에 연결해준다.

이에 대한 자세한 부분은 다음 생성자에서 다룬다.



무튼, 어떤 클래스의 인스턴스를 생성하면 (지스는 이렇게 표현하면 안되겠지만 아무튼간,,)연결이라는게 중요한 것 같다.

내가 이해한 것을 글로 풀어보겠다.



> 프로토타입 객체 안에 프로토타입 프로퍼티가 있고, 새로 생성된 객체의 프로토타입프로퍼티는  상위 프로토타입 객체안의 프로토타입과 연결된다.
>
> 그 상위 프로토타입의 프로퍼티에는 원래 객체를 가리키는 constructor과 최상단으로 계속 이어지는 프로토타입프로퍼티가 존재한다.

ㅋㅋ. ㅋㅋㅋ뭐 P객체안에 상위를 가리키는 프로퍼티가 존재하고 인스턴스가 생성될 때마다 상위를 가리키는게 하나씩 더 생긴다고 생각하면 될 것 같다.

기존의 클래스와는 다른점이다. 멤버변수, 메소드의 복사가 아닌 그냥 두 객체를 연결하여 그 자식들도 사용할 수 있게 끔 상위를 가리키게 만든 것이다.



#### 5.2.2 생성자

`new` 를 사용해 생성자역할을 하게 한다.

생성자는 인스턴스를 생성할 때 사용하는 것이다.

책에서 정말 **누누히** 말하듯, 그게 그게 아니다.



prototype이라는 객체는 이제 위에서 말했듯 기본적으로 갖는 객체라고 했다.

이 객체안에는 공통적으로 constructor이 세팅된다.

그럼 어떤 객체로부터 생성된 객체도 갖고 있을까?

ㄴㄴ. 그렇지 않음. 그냥 자기를 만든 객체에만 해당 속성이 존재함.



`new` 가 생성자인지 그냥 함수 호출인지 따지자면, 함수호출이다.

```js
function Foo(){
  console.log('hi')
}
let a = new Foo();//hi
a; // {}
```

new Foo()로 함수가 호출되었고, a라는 새로운 객체를 생성했다.

new는 단지 함수호출에 새로운 객체를 생성해주는 기능이다.



#### 5.2.3 체계

```js
function Foo(name){
  this.name = name;
}

Foo.prototype.myName = function(){
  return this.name;
};

let a = new Foo("a");
let b = new Foo("b");

a.myName(); // a
b.myName(); // b

```

125page를 보면, Foo의 프로토타입객체에 myName 함수를 a, b가 공유하고 있다.

절대 프로퍼티 복사는 되지 않는다.

`this` 바인딩으로 !



```js
function Foo(){

}

Foo.prototype; //  a1.constructor === Foo)
Foo.prototype = {}; // a1.constructor === Object)
Foo.prototype.myName = function(name){
  console.log(this.name);  
};

let a1 = new Foo();
console.log(a1.constructor === Foo);
console.log(a1.constructor === Object);

```

prototype을 새로 만들지 않으면 a1에 constructor은 Foo를 가리키지만, 새로 생성하면 최상단을 가리킨다.(Foo가 Object에 의해 만들어 진 것.)

=> 하위 constructor은 직접 사용하지 말자. 전혀 다른 객체를 가리킬 수도 있기 때문이다.