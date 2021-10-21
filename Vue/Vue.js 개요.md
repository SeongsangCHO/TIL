# Vue.js에 간단히 알아보자

---

> Angular를 가볍게 쓰고 싶어 만든 Front-end Framework
>
> Angular의 데이터 바인딩 특성 + React의 가상DOM기반 렌더링 특징을 갖음



## 특징

- Angular와 Vue는 데이터가 양방향 바인딩되어있어 컴포넌트끼리 데이터를 공유할 수 있음
  - Vue는 컴포넌트 간 단방향 데이터 흐름을 따른다.

- MVVM패턴을 따르는 UI 라이브러리
  - Model - View - View Model - Model로 구조화하여 개발하는 방식
  - 화면 요소들을 제어하는 코드와 데이터 제어 로직을 분리해 직관적, 유지보수가 편하게 할 수 있음

### 1. 데이터 바인딩 ?

>  데이터 바인딩은 화면에 보이는 데이터와 브라우저 메모리(js파일 내의 객체같은 값)을 일치시키는 것을 말한다.

#### 1.1. 양방향 데이터 바인딩

화면에서 데이터가 변경되면 js에 갱신시키는 것, js에서 갱신되면 화면에 갱신시키는 것으로 view나 controller에서 데이터 변경이 일어나면 화면에 반영시키는 것을 뜻한다.

이런 변화를 프레임워크가 감지하여 변경시점에 render를 해준다.

코드량이 적은 것이 장점이다.

Vue에서는 v-model이라는 디렉티브가 이를 가능하게 해준다.

디렉티브란 Vue엘리먼트의 속성인데 해당 엘리먼트에게 ~~하도록 해라 라는 지시문을 뜻한다.

종류는 총 13개 있고 앞에 v-라는 prefix가 붙는다.

[공식문서 디렉티브 ch](https://v3.vuejs.org/api/directives.html)

v-model로 전달받는 data의 prop을 연결하면 엘리먼트에서 해당 prop변경시 데이터가 반영된다.

- React에서 부모 state를 변경하는 set Func을 전달해 연결해주어야했지만 해당 코드 작성이 필요없어짐.



#### 1.2 단방향 데이터 바인딩

JS -> HTML의 방향으로만 데이터 갱신을 통한 화면 생성이 가능하다.

React는 변경되는 내용을 부모 -> 자식으로만 전달할 수 있다.



### 2. MVVM 패턴 ?

MVC패턴에서 비롯된 패턴으로 MVC에서 C대신 View Model인 것

View와 View Model간 데이터 바인딩을 통해 View Model은 Model로 받은 데이터를 View에 전달하는 역할

View Model의 설계가 쉽지 않음.

## 비교

### 1. 퍼포먼스

React, Vue 모두 비슷하게 빠르므로 속도가 요인이 되지 못함

대신 DOM 조작에 가능한 적은 오버헤드(순수 JS계산)만 하는 것이 Vue, React의 차이.

Vue, React 둘다 가상 DOM을 사용하고 있지만 Vue의 가상DOM 구현이 훨씬 가벼우므로 React보다 적은 오버헤드가 발생함.

React는 상태변경시 루트로부터 시작해 하위 트리를 리랜더링하고 불필요한 리랜더링을 피하기 위해선 shouldComponentUpdate를 구현하거나 해야하지만 Vue는 실제로 랜더링해야하는 컴포넌트를 정확히 알고 있음

- React.memo를 통해서 메모이제이션하면 굳이 구현하지 않아도 되지 않은가 ?

데이터 시각화, 애니메이션을 "프로토타이핑"할 때 vue는 초당 10프레임, React는 초당 1프레임의 경우가 존재함. 개발모드에서 React의 무분별한 검사 때문에 발생하는 것임

- 실제 배포환경이 아닌 개발환경에서 발생하는 이슈- 개발경험에서 Vue가 더 좋은 "경우"가 있다는 설명

### 2. HTML & CSS

JSX로 UI를 표현하는 React와 달리 Vue에서는 JSX도 사용할 수 있고 템플릿을 사용할 수 있음

이를 통해 FE경험이 적은 개발자가 코드를 분석, 개발하기 용이하다는 장점

Vue는 기본 스타일링 방식으로 컴포넌트안에서 style을 입힐 수 있음





## 시작하기

### 1. 설치

```
npm install --global @vue/cli
```

### 2. 프로젝트 생성

```
vue 프로젝트명 생성할 디렉토리명
```

이 후 lint, version에 대한 설정을 진행하면 됨

### 3. 필요한 패키지, 코드정리 설정

```
Vetur - 문법 하이라이팅, 스니펫, 디버깅, 린팅, 에러체크 등을 도와주는 패키지
```

- 코드 정리 설정은 settings.json에 해당 라인을 추가하자

- ```json
    "[vue]": { 
      "editor.defaultFormatter": "esbenp.prettier-vscode", 
      "editor.formatOnSave": true 
    },
  ```

  



## Vue 인스턴스

화면개발에 필요한 기본 단위

```vue
var data = { a : 1 };

var vm = new Vue({
//instance options
	template: "",
	el: "",
	data: data,
	...
	computed: {
		reversedMsg: function () {
			return ...
		}
	}
})
```



### 1. Options

Vue 객체 생성시 인스턴스의 옵션 속성을 포함해 생성할 수 있다.

다만, 주의사항은 vm.a = 5처럼 `data` 의 값을 변경했을 때 data.a도 변경되어 리랜더링되지만 vm.b = 10 처럼 새로운 속성을 추가했을 때는 변경되지 않는다는 점이다. 따라서 이처럼 새로운 속성이 추가될 가능성이 있다면 미리 속성을 작성해두고 초기값을 지정해두어야한다.



### 2. Life Cycle

인스턴스가 생성될 때 라이프사이클에 따라 초기화되는데 커스텀한 로직을 포함할 수 있다.

라이프사이클 훅을 사용할 땐 화살표함수를 지양해야한다. this를 가지고 있지 않기에 this 바인딩 오류가 발생하게 되기 때문이다.

[공식문서 Vue 라이프사이클 hook](https://v3.ko.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)

[Vue 라이프사이클](https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html)

### 3. computed

템플릿 문법으로 JS연산을 할 수 있지만 길어지면 유지보수가 힘들어지므로 복잡한 로직일 때  `computed` 속성을 사용해야한다.

해당 속성에서 참조하고 있는 데이터의 변화가 생길 때 업데이트 됨을 명심.

생성한 인스턴스의 vm.reversedMsg는 getter 함수로 테스트코드를 작성하기 쉽다.



### 4. method

> computed 속성 대신 메소드와 같이 함수 정의를 할 수 있다.
>
> 차이점은 computed는 종속된 대상이 변경되지 않으면 실행되지 않는다는 점으로 결과값을 캐싱하여 두기 때문에 React의 useCallback과 같은 기능을 한다.
>
> method는 랜더마다 매번 계산을 수행한다.

### 5. watch

> 감시할 데이터를 지정하여 해당 데이터가 변경되면 해당 함수를 실행하는 방식이다.
>
> 데이터 변경에 대해 반응하므로 비동기식 또는 시간이 많이 소요되는 조작시 사용하는 것이 유용하다.





## 템플릿 문법

> JSX문법이 아닌 Vue 인스턴스의 데이터에 바인딩할 수 있는 HTML기반 템플릿 구문을 사용한다.
>
> 템플릿이란 View로 화면조작을 위해 제공되는 문법
>
> 템플릿을 내부적으로 가상 DOM 랜더링 함수로 컴파일한다.
>
> JSX도 지원하기도 하여 선택적으로 사용하면 됨
>
> 데이터바인딩과 디렉티브로 나뉜다.

### 1. Data binding

데이터 바인딩 형태는 `Mustache` 구문 (이중 중괄호)을 사용한다. 또한 Mustache안에서 JS식을 사용할 수 있다.

```html
<span> {{ msg }} </span>
{{ msg.split('').reverse() }}
```



### 2. Directive

> 13개의 Directive속성이 있으므로 따로 정리 예정

Directive는 v- prefix가 붙은 속성임.

Directive의 표현식 값이 변경될 때 사이드 이펙트를 DOM에 적용하는 것.

```vue
<p v-if="seen">You can see me</p>
```

v-if의 값에 따라 p 요소를 제거 또는 출력할 수 있음







## Vue 컴포넌트

>  화면의 영역을 단위로 쪼개어 재활용 가능한 형태로 관리하는 컴포넌트
>
> HTML, CSS, JS를 한 파일에서 관리할 수 있는 방법이다.
>
> 확장자는 `vue`

뼈대는 다음과 같은 형태를 띈다.

```vue
<template>
<!-- HTML -->
</template>

<script>
// JS
</script>

<style>
/* CSS */
</style>
```

이러한 컴포넌트를 JS로 변환해주는 로더를 Vue Loader라고 하며 다음과 같은 장점이 있음.

- ES 6 지원

- <style> <template>에 대한 웹팩로더 지원

- vue 컴포넌트의 스코프에 대한 css 스타일링 지원

