## 자바스크립트 #10 null 병합연산자 '??'



<br>

최신문법이다!

nullish coalescing operator ->`??`를 사용하면 짧은 문법으로 여러 피연산자중 그 값이 확정되어있는 변수를 찾을 수 있다.

=> ??확정되어있는 변수라는 것이 좀 와닿지 않는다.

일단 진행해보자

<br>

## null 병합연산자



### 1. ??연산자로 코드 간결

`a ?? b`는 다음과 같다.

- a가 null도 아니고 undefined도 아니면 a
- 그 외의 경우는 b

해당 연산자를 사용하지 않고 이와 같은 기능을 하는 코드는 다음과 같다,

```javascript
x = (a !== null && a !== undefined) ? a:b;
```

 `x = a ?? b`로 끝나는데 이건 엄청길다!

<br>

### 2. 확정되어있는 변수찾기

<br>

앞서 말했던 확정되어있는 변수를 찾는다는 표현이 와닿지 않았는데 다음 코드로 이해할 수 있었다.

```javascript
let firstname = null;
let lastname = null;
let nickname = "secho";

alert(fisrtname ?? lastname ?? nickname);
```

`??`연산자로 값이 존재하는 변수를 찾을 수 있다.



<br>

### 3. '??'와 '||'의 차이



- `||`은 첫째 truthy값을 반환
- `??`은 첫 번째 정의된 값을 반환

이것도 코드를 보면 이해가 빠르다

```javascript
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

`||`은 첫번째 `0`을 `falsy`로 판단했기 때문에 `null 또는 undefined`을 할당한 것과 동일하게 하여 100을 반환한다.

`??`은 `0`이라는 값이 첫번째로 정의되어 있으므로 `0`을 반환한다.

`0`이 할당될 수 있는 변수를 사용한 기능 개발시 `||`보다 `??`사용이 적합하다.



+

`??`의 연산자 우선순위는 **5**로  `=`, `?`보다는 먼저지만 대부분 연산자보다는 나중에 평가된다.



<br>

## break, continue 레이블

항상 2중 반복문을 들어갈 때 원하는 시점에서 반복문을 종료할 수 있는게 있으면 좋겠다.. 라고 생각을 했었는데

`레이블`이라는 것으로 js에서는 가능했다.

`label`은 반복문 앞에 콜론과 함께 쓰이는 식별자.

```javascript
labelName: for(...){...}
```

다음과 같이 사용할 수 있다.

```javascript
secho: for(...){
	for(...){
		break secho;
	}
}
```

break에서 secho라는 레이블이 붙은 반복문을 찾고 해당 반복문을 빠져나오게 해준다.

`continue`로 마찬가지로 사용할 수 있다.

주의점은 `break, continue`는 레이블 아래에 있어야하며, 반복문 안에서 사용해야한다.