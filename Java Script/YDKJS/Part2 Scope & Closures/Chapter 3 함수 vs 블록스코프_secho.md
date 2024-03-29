# Chapter 3 함수 vs 블록스코프

---

- 함수, 블록스코프에 대해 알아본다.



## 3.1 함수 기반 스코프



JS는 함수 기반 스코프를 사용한다.

함수가 자체적인 스코프를 갖는다는 것이다.

```javascript
function foo(a){
    var b = 2;
    function bar() {
        var c = 3;
    }
}
bar();//ReferenceError
console.log(a,b,c); //ReferenceError
```

위의 예제에서 `foo()`는 `a, b, bar, c`를 포함한 스코프를 갖고 있다.

`bar()`도 자체스코프를 가진다.

글로벌 스코프는 `foo()`라는 확인자를 갖는다.

 각 스코프안에서 접근할 수 있다. 글로벌 스코프에는 `foo()`만 있으므로 위 예제처럼 참조하면 에러가 발생한다.





### 3.2 일반 스코프에 숨기



스코프를 사용해 변수, 함수를 숨길 수 있다.(밖에서 접근할 수 없다는 의미)

코드를 노출시키지 않기 위함인데 예제는 다음과 같다.

```javascript
function doSomething(a) {
    b = a + doSomethingElse(a*2);
    console.log(b * 3);
}
function doSomethingElse(a) {
    return a - 1;
}
var b;
doSomething(2); // 15
```

해당 예제처럼 작성하면 b나 doSomethingElse는 doSomething()이 어떤 작업을 하는지에 대해 '비공개'된 부분이다.

따라서 의도적 또는 그렇지 않더라도 잘못된 방식으로 사용될 수 있기에 스코프에 숨긴다.

```javascript
function doSomething(a) {
	function doSomethingElse(a) {
    	return a - 1;
	}
	var b;
    b = a + doSomethingElse(a*2);
    console.log(b * 3);
}
doSomething(2); // 15
```





#### 3.2.1 충돌회피

위처럼 변수, 함수를 스코프내에 숨김으로 확인자끼리의 충돌을 피할 수 있다.

```javascript
function foo(){
    function bar(a) {
        i = 3; // var i = 3;으로 충돌 회피
        console.log(a + i);
    }
    for (var i = 0; i < 10; i++) {
        bar(i * 2);
    }
}
foo();
```

위의 예제에서 `bar()`내부에서 i값이 `for`에 영향을 미친다. 따라서 해당 예제는 `i = 3`인채로 무한 루프에 빠진다.

`i = 3`을 `var i = 3`으로 둠으로써 `bar()`스코프에 i변수를 추가하거나 `var j =3`으로 다른 변수를 추가한다면 충돌회피를 할 수 있다.



##### 글로벌 네임스페이스, 모듈 관리

라이브러리를 불러오면 글로벌 스코프에 객체 선언문을 생성하는데, 이후 이 객체는 `네임스페이스`로 이용된다.

```javascript
var aLibrary = {
	awesome : function(){...},
};
var bLibrary = {
	awesome : function(){...},
}
 //aLibrary.awesome()
//bLibrary.awesome() =>이렇게 구분하는 네임스페이스를 뜻하는 건가.
```



좀 더 현대적인 충돌방지 옵션으로 모듈접근법이 있다고 한다.

```javascript
import a from '../...';
import b from '../...';
import c as dd from '../../';

a.awesome();
b.awesome();
```

이렇게 충돌 회피를 뜻하는건가.. 싶다. 자세한 정보는 2부 5장 스코프 클로저를 참고하라 한다.



### 즉시 호출함수 표현식 (IIFE)

- 함수는 선언문과 표현식으로 나뉜다. 둘의 가장 큰 차이는 함수 이름이 어디에 묶이냐이다.

```javascript
function 함수선언문foo() {
	...
};
foo();
(function 함수표현식foo() { ...})(); //IIFE
```

위의 예제에서 첫번째는 함수 선언문이다.

두번째는 함수 표현식이다.



첫째는 `foo`는 함수를 둘러싼 스코프(전역스코프를 의미하는 듯)에 묶이고 `foo()`를 이용해 호출. 

두번째는 `foo`를 둘러싼 스코프에 묶이는 대신, 함수 자신의 내부 스코프에 묶였다. 즉, `foo`는 foo함수 내인 `{...}`스코프에서만 찾을 수 있고 바깥 스코프에서 발견되지 않는다.



- 함수에 접근할 수 있는 스코프에 따라 선언문, 표현식으로 나누는 듯함



### 익명 vs 기명

표현식을 콜백인자로 사용한다. 익명, 기명으로 표현식을 나타낼 수 있다.

```javascript
setTimeout (function()){
	console.log('hi');
},1000);
```

위의 예제는 `익명`이다. 그러나 익명으로 사용하면 디버깅이 어려울 수 있다.

표현식을 쓸땐 이름을 **항상** 쓰는것이 좋다고 책에 기술되어 있다.

```javascript
setTimeout (function timeoutHandler()){
	console.log('hi');
},1000);
```

위 방식이 좀 더 알아보기 쉽다.





## 3.4 스코프역할을 하는 블록



함수가 가장 일반적인 스코프 단위이지만 `{}` 블록스코프 단위도 존재한다.

```javascript
for(let i = 0; i < 10; i++){
	console.log(i);
}
```

- 위는 블록스코프. 블록스코프의 목적은 최대한 작은 유효범위를 갖게함에 있다.



```javascript
try {
    ...
} catch(err){   
	console.log(err); //it works
}
console.log(err); //error
```

- `try..catch`에서 `catch` 부분에 선언된 변수는 블록스코프에 속한다.



### ES6에 추가된 let. const



스코프를 통해 유효범위를 지정해왔지만 새로운 키워드 `let`의 등장으로 블록스코프를 이용할 수 있게되었다.

`let`는 선언된 변수를 둘러싸고있는 아무 블록의 스코프에 붙인다.

- let로 선언된 변수를 감싸고 있는 블록스코프에 해당 변수를 추가한다라는 의미 같음.

```javascript
var foo = true;

if (foo){
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}
console.log(bar); //ReferenceError

if (foo){
    { // <- explicit block
	    let bar = foo * 2;
    	bar = something(bar);
    	console.log(bar);
    }
}

```

- 위의 예제처럼 `let`을 사용했지만 명시적이지 않을 수 있기에 `{}`를 사용해 명시적으로 사용하도록 하자 (음,,)
- 리팩토링하면서 `if`문의 위치, 의미를 변화시키지 않고 전체 블록을 옮기기 쉬워진다. 라고 한다.



`let`은 호이스팅의 영향을 받지 않는다.

```javascript
{
	console.log(bar);//ReferenceError
	let bar = 'hi';
}
```

앞에서 배운 내용인데, TDZ에 의해 변수가 선언되기전에 참조하면 `let, const, class`에서는 참조에러가 발생한다. `var, function`과 달리 호이스팅되지않아서 선언문 전에는 존재하지 않는 상태라고한다.



#### 가비지 콜렉션

블록스코프는 메모리회수를 위한 클로져, 가비지콜렉션과 관련있다.

```javascript
function process(data){
    //do Something
}

var someReallyBigData = {
    a:'42',
};
process(someReallyBigData);

var btn = document.getElementById("button");
btn.addEventListener("click", function onClick(evt) {
    console.log("button Clicked");
});
                         
```

- 위의 예제에서 블록스코프가 없기에 전역객체는 메모리를 많이잡아먹는 `someReallyBigData` 데이터를 남겨둘 것.
- 밑에서는 위의 데이터를 사용하지 않으므로 필요없는 부분이다 따라서 블록으로 묶어 가비지컬렉션이 수거해갈 수 있도록 해주는게 좋다고함.(뇌.. 책에 쓰여있지 않음)



```javascript
function process(data){
    //do Something
}
// 블록안에 무엇을 명시해도 can go away after.
{ 
	let someReallyBigData = {
  	  a:'42',
	};
	process(someReallyBigData);
}

var btn = document.getElementById("button");
btn.addEventListener("click", function onClick(evt) {
    console.log("button Clicked");
});
```



#### const

const 상수는 변경하려하면 에러발생.

