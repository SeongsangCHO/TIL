먼저 redux의 배경이되는 Flux패턴을 알아보자.

> Facebook에서는 알림기능에서 에러가 반복되어 양방향 데이터흐름의 MVC패턴에서 예측되지 않는 문제점을 해결하기 위해 Flux패턴을 도입했다고 한다.

## What is Flux ?

> [시작하기전 읽어보면 좋은 글 - flux패턴](https://www.huskyhoochu.com/flux-architecture/)
>
> [시작하기전 보면 좋은 만화 - flux 패턴](https://bestalign.github.io/translation/cartoon-guide-to-flux/)

**MVC**

![스크린샷 2021-08-08 오후 6 16 05](https://user-images.githubusercontent.com/55486644/128627154-d01efc8d-7ec8-4a88-a31e-891906ef0fb0.png)

Facebook에서 사용했던 해당 패턴은 새로운 기능이 추가될 때 복잡도를 증가시키고 예측하지 못할 버그가 존재했다. 구체적으로는 알림기능이었는데, 양방향 데이터흐름이 만들어낸 **예측하지못할 버그가 계속 존재해서 이를 해결하기 위해 flux패턴을 도입**했다고 한다.

**Flux**

![스크린샷 2021-08-08 오후 6 16 21](https://user-images.githubusercontent.com/55486644/128627158-66ef4456-2703-4b21-a43d-72a8dcf77f5f.png)

flux는 클라이언트 Web App을 만드는데 사용하는 아키텍쳐다.

MVC와 차이는 `단방향으로 데이터가 흐른다`는 점이다.

사용자가 view에서 특정 행위를 통해 `Action`을 발생시키면 `Dispatcher`가 `Store`로 이를 전파하고 `Store`에선 `Action`에 영향이 있는(의존적인) 모든 `View`를 갱신한다.

따라서 `View`는 데이터가 어떻게 바뀌었는지 직접 model을 참조할 필요가 없어지며 **그저 `Store`가 주는 데이터를 그대로 렌더링 하면된다.**

> 전역상태관리 라이브러리인 Redux가 해당 패턴을 "비슷하게" 적용했다는 것이다.
>
> 차이점은 Redux는 스토어가 하나, dispatcher가 없으며 불변의 성격을 띄는 것이다.

### **Redux의 등장, Flux deprecated**

Reducer 라는 개념을 가져와 Flux를 대체하는 Redux가 발표되었고 머지않아 Flux는 deprecated가 되었다.

그러나 둘 간의 커다란 차이는 없다.

-   Flux는 store가 여러개지만 redux는 store가 하나다.
-   redux에선 이 store를 변경하는 여러개의 reducer로 이루어져있다.
-   flux에 비해 미들웨어 생태계가 구축되었다(thunk, saga, logging...)

이러한 흐름에 따라 **redux 생태계의 확장으로 인해 개발자의 편의성(time travlel, 디버깅)이 증가**되어 flux는 deprecated 라이브러리가 되었고**redux는 상태관리 라이브러리의 대세**가 되었다.

## 개념이해

> Flux가 deprecated되었다곤 하나 Redux에서 사용되는 것과 크게 다르지 않다. Redux에서의 역할을 서술했다.

### 1\. Action

type과 변화될 데이터\[optional\]를 갖는 상태 변화를 일으키는 객체다.

type은 문자열, data는 어떤 형태든지 관계없다. state를 update할 데이터가 들어가면 된다.

이 객체(Action)는dispatch를 통해 Store의 내장함수인 Reducer로 전달된다.

```
//creator
function addNumber(number){
  return {
    type: ADD_NUM,
    payload: number
  }
}
```

### 2\. Dispatcher

Action발생이 감지되는 순간 Store(Reducer)로 전달한다. -> dispatch함수를 통해 action이 파라미터로 들어갔을 때를 뜻한다.

redux에선 dispatch함수에 전달되는 action이 Reducer로 전달되어 Store의 전역 State에 반영된다.

### 3\. Store

상태변화가 있을 때 Action은 dispatcher로의 pipeline을 거쳐야한다.

즉, 바로 **Action이 Store로 보내지는 것이 아니라 dispatcher가 reducer함수를 실행시켜서 새로운 상태를 store에 반영하는 것**이다.

Store를 통해 상태가 변경되면 view에게 새로운 상태를 보내주고 view가 업데이트된다.

이전 상태와 들어오는 액션을 기반으로 update할 state를 계산하는 pure reducer함수를 작성해야한다.

이 개념들이 활용되는 전역상태관리 라이브러리를 사용하기전(도입 전)에 염두에 두어야할 점들을 정리해보았다.

## 전역상태관리

> 전역상태라는 개념이 등장 전, 리액트는 데이터가 부모->자식으로 단방향으로만 흘렀다.
>
> 이런 부자관계가 깊어지면 깊어질수록 그저 데이터를 전달해주기 위한 기계적인 코드의 반복과 복잡도가 늘어난다.
>
> 그래서 구조적으로 깊이 내려주는 상태값들을 중앙에서 관리하고, 어느 레벨의 컴포넌트이든지 이 중앙상태에만 접근해서 값을 가져오거나 갱신할 수 있도록 하는 전역상태의 개념이 등장했다.

### 1\. 전역상태관리의 방법

> 이외에도 여러가지 방법이있고 가장 많이 사용되고 있는 것은 Redux다.

-   mobx
-   context API
-   react-redux
-   Recoil

### 2\. 왜 필요할까 ?

**전역상태관리가 필요한 이유**는 부모-자식관계로 이루어진 트리구조에서 데이터 전달을 할 때 상-하로 접근해야하는데 다른 가지에서 멀리 있는 데이터가 필요할 때 기계적인 props전달을 무수히 해야하고 그만큼 코드량이 증가해진다.

그러므로 중앙에 state를 관리하는 store를 두어 계층에 관계없이 direct하게 접근하기 위함이다.

### 3\. 어떻게 써야할까 ?

**prop drilling이 심화되어 기계적 코드가 반복될 때 도입을 고민**해야한다.

프로젝트의 규모에 따라 context를 사용할지, redux, redux-toolkit을 사용할지에 대한 고민이 필요하다.

규모가 작다면 비교적 쉽게 적용할 수 있는 context API, 규모가 크고 확장성이 있고 비동기처리가 필요하다면 redux, thunk, saga까지 고려가 필요하다.

전역state도 하나의 state이기에 해당 값이 변경되면 이를 의존하고 있는 컴포넌트도 렌더링이 일어난다.

편하게 짜고자 분리없이 모든 지역상태를 하나의 전역상태에서 관리하게되면 이를 사용하지 않더라도 의도치않게 랜더가 일어날 수 있다.

그러나 분리를 해도 적절하게 이루어지지 않으면 action, reducer가 그만큼 늘어나므로 유지보수나 확장이 어려워질 수 있다.

따라서 **전역state는 관심사에 따른 적절한 분리가 필요하다.**

> **도입 전 고민, 도입 후 고민**

다음 글에서는 전역상태관리 라이브러리를 사용해보며 간단한 사용법이나 차이점을 정리해보려한다.

##### 참고

-   [flux docs](https://haruair.github.io/flux/docs/overview.html)
-   [flux-architecture](https://www.huskyhoochu.com/flux-architecture/))