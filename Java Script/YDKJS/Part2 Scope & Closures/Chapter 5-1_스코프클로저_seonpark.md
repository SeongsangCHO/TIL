# Chapter 5-1_ 스코프클로져

---

## 핵심

```javascript
function foo () {
	var a = 2;
	function bar() {
		console.log(a);
	}
	bar();
}
```
a를 참조하는 bar()의 정확한 설명은 렉시컬 스코프의 검색규칙에 따라 a가 2가 출력된다고 볼수있다.

이건 클로저의 일부다.

```javascript
function foo () {
	var a = 2;
	function bar() {
		console.log(a);
	}
	return bar;
}

var baz = foo()
baz() // 2
```

foo() 함수를 실행했으므로 가비지컬렉터가 제거했을거라 생각하지만 foo는 아직 살아있다.

이유는 foo내부스코프를 아직 사용중이기 때문에 => bar을 사용중임

이로인해 foo로 리턴한 bar함수는 foo의 내부스코프를 그대로 사용할 수 있다.

클로저와 스코프의 개념을 정확히 이해했다면 콜백함수 또한 어렵지 않게 이해할 수 있다.

```javascript
function wait(message) {
	setTimeout(() => {console.log(message)}, 1000)
}

wait('hello')
```

익명함수의 내부에서 message를 1초뒤에 출력하는 코드이다.

스코프를 벗어났으나 1초뒤에 hello가 출력되는것을 볼수있다.

이것 또한 내부 클로저에 의해 일어난 일이다.

```javascript
for (var i = 1; i < 5; i++) {
	(function (j) {
		setTimeout(function timer() {
			console.log(j)
		}, j * 1000);
	})(i)
}
```

클로저를 이용해 1초마다 1,2,3,4,5 순으로 실행되도록 만들어보자