### 과제 1





### 1. API Request



#### 1.1 Making Http Request

스크롤 구현전, api호출을 위한 http request를 만들어야 했다.

이를 위한 방법에는 크게 2가지, `fetch, axios` 가 있다.

이 둘의 차이점을 먼저 확인해보자

- fetch : `window` object의 method로, URL이라는 하나의 인자만을 받는다.

- axios: 환경에 따라, node.js or XMLHttpRequests로 만들어지는 HTTP request library다. 반환되는 response가 자동으로 JSON데이터로 변환된다. 또, `XSRF` 보호기능이 내장되어 있다.(라고 하는데 인지만 해놓기로.)

  > XSRF란, Cross-site Request Forgery ( 사이트간 요청 위조 )
  >
  > 옥션 개인정보 유출사건에서 관리자 계정 탈취할 때 사용된 공격방법이라 한다.
  >
  > img를 가져올 때, get요청을 통해 가져오게 되는데 `<img src="https://namu.wiki/logout">` 과 같이 해두면 해당 문서를 볼 때 로그아웃 되는 경우가 존재한다고 한다.
  >
  > 이외에도 다양하게 활용되어 요청을 변경해 정보를 해킹하는 공격 방법 중 하나다.
  >
  > 방어는 referer를 check하는 방법이 있다고 함. (http header, 이전에 어느 페이지에서 해당 페이지로 요청을 보냈는지에 대한 정보)



지금 체감할 수 있는 가장 큰 차이점은 response를 `자동으로 JSON data`로 변환해주는 점이다.

이외에도 request config를 쉽게 설정할 수 있어 사용하기로 결정했다.



과제에서 주어진 API는 총 두개의 parameter를 통해 데이터를 받아온다.

2개의 parameter에 대한 value를 request url로 전달해야하므로 쿼리스트링을 사용한다.



#### 1.2 쿼리스트링 ?

웹 앱 또는 백엔드 DB에 데이터를 전달코자할 때 사용되는 URL의 부분



왜쓰냐면,,

> HTTP Protocol은 stateless로 디자인 되어서 쿼리스트링이 필요하다.
>
> 단순한 브로셔 이상의 기능을 하기 위해 상태를 저장해야할 필요성이 있어서, 쿠키, 세션과 같이 상태를 저장하거나 Query String을 사용해 데이터를 저장하기 위해서.

- api의 end_point 이후, 파라미터를 전달할 때 사용하고 parameter이 여러 개일 경우, `&`를 붙여 사용한다.



#### 1.3 axios에서 쿼리스트링 전달방법

axios의 2번째 인자 (config)는 Request config로,

Request를 만들면서 이용가능한 설정들을 넣을 수 있다.

요청설정을 갖는 `options` 은 객체인데 headers, baseURL, data, withCredential 등, 요청관련 헤더설정을 지정해줄 수 있다.

그중 쿼리스트링을 전달하기 위한 property는  `params` 이고, parameter, value를 쌍으로 갖는 객체를 전달한다.

```react
axios.get(URL, {
// `params` == request에 보낼 URL 파라미터
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
    foo:[1,2,3,4,5]
  },  
})
```

배열로 넣을 수 있지만 상기 방식으로 작성하면 

```apl
http://example.com/?foo[]=5&foo[]=2&foo[]=11
```

이런 식으로 나온다. 그 이유는 plain object로 배열인자를 전달할 때 발생하는 이슈라고 한다.

`[ ]` 없이 배열인자를 전달할 땐 `URLSearchParams object` 를 사용해 전달한다.

URLSearchParams 예시)

```js
const params = new URLSearchParams();
params.append("foo", 5);
params.append("foo", 2);
params.append("foo", 7);
const request = {
  params: params, // 배열로 쿼리스트링 전달
};
axios.get(URL, request);
// http://example.com/?foo=5&foo=2&foo=11
// good !
```



#### 1.4 API 호출함수

위의 params 전달 방법으로 2개의 parameter, value를 전달하는 함수를 작성했다.

```js
export const getCommentData = async (page) => {
  try {
    const res = await axios.get(`${API_ENDPOINT}`, {
      params: {
        _page: page,
        _limit: LIMIT,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

```

들어가는 config가 하나만 있으면 된다고 생각해 배열로 만들어 단축시키는 방법은 사용하지 않았다.



> 에러에 대한 return문을 작성하지 않았는데, 어떤 것이 적절할지 고민 중이다. error에 대해서 로그만 남길지, return 값을 추가해 다룰지.
>
> saga의 경우, 비동기요청의 성공, 실패에 대해 분기하고 이에 대해 처리를 할 수 있는데 단일 요청함수에 대한 에러 처리는 고민된다.
>
> 요청이 실패해 "다시 시도 or 재 요청"이라는 유저에게 보여줄 요소가 있다면 추가해야한다고 생각하지만, 주어진 과제엔 없으므로 이대로 진행해도 무방하다고 결론 내렸다..!





### 2. 기능 구현

Infinite scroll에 대한 글은 이전에 작성해뒀었다. [React로 infinite scroll 구현하기](https://watermelonlike.tistory.com/153)

scroll event로 height를 계산해 구현해보았던 것과 쓰로틀링을 간단하게 예제로 작성한 적이 있어 scroll event를 이용한 구현은 하지 않았다.

이전 게시글에서 자세히 다루지 않았던 부분을 추가해서 다루면 될 것 같다.

~~두번일하네.,,,~~



#### 2.1 Intersection Observer

해당 API는 대상요소와 관찰요소가 교차될 때를 `비동기 방법`으로 제공한다.

다시 말해, A(대상), B(관찰)라는 요소가 있을 때 A와 B가 교차되는지를 확인하기 위한 수단이고 A는 options로 지정할 수 있는데 따로 지정해두지 않으면 그 대상이 `document의 viewport`로 지정된다.



지금까지 (역사적으로) 두 요소들의 교차점을 확인하는 솔루션은 느린 경향이 존재했었다.

따라서 무한스크롤, 광고의 가시성보고(광고 몇번봤는지 체크용인듯) 등, 해당 API가 필요로해졌다고 공식문서에서는 소개하고 있다.



기존의 교차감지 구현은 `getBoundingClientRect()` 으로 영향을 받는(교차검증 대상인지 확인하는.) 모든 요소에 대해서 정보를 만들어야 했기에 메소드, 핸들러, loop 등이 필요했었고 이 과정들은 main thread에서 실행되어서 여러 개 중에서 하나가 성능문제를 일으킬 수 있었다고 한다.

> 스크롤 이벤트에서 쓰로틀링을 걸면 연산이 줄어드는데 속도이외의 문제점이 존재하는지 ?

이러한 방법으로 infinite scroll을 구현한다고 했을 때 교차감지는 thread에서 수행되기에 개발자는 내부 작동이 어떻게 일어나는지 알지못하여 성능문제에 대해서도 인지하지 못하는 경우가 되어 User의 사이트 경험이 매우 안좋아질 수 있다.



이와 다르게, `Intersection Observer API` 를 사용한다면 두 요소의 교차를 감지하며 교차될 때, out될 때마다 콜백을 수행한다.

교차감시를 위해 main thread에서 아무 것도 할 필요가 없다.

다만, 해당 방법은 겹치는 정확한 pixel수를 알 수 없지만, `N%` 정도 교차한다는 일반적인 use case를 다룬다.





이전 글에서 다루지 않았던, 그리고 과제구현의 핵심이었던 `rootMargin`에 대해 알아보자



##### Options : rootMargin

먼저, `root`는 지정하지 않으면 viewPort가 된다. 지정한다면, 대상의 상위항목이어야한다.

`rootMargin`은 말 그대로 `root` 의 여백을 뜻하는데, `px, %`로 css margin과 같이 등록할 수 있다.

이를 사용해 viewPort에 margin을 주게 되면 그만큼 viewPort의 확장 또는 축소되어 감시대상이 viewPort에 보이지 않을 때에도 교차여부를 확인할 수 있다. 이를 통해 교차여부를 유연하게 설정할 수 있다.



##### callback

callback 수행시점은 2가지다

- 교차대상이 교차점에서 벗어날 때,

- 교차대상이 교차될 때

  

options에 지정한 margin, threshold를 가지고 callback의 인자를 사용해 교차되었는지를 확인할 수 있고 그에 따른 처리를 진행할 수 있다.







#### 2.2 IntersectObserver Hook

이전 예제에서는 분리하지않고 몰아서 작성했었는데,

교차되었는지에 대한 여부를 state로 갖는 hook을 생성하여

교차대상을 지정하는 ref를 인자로 넘기면 viewPort와 대상이 교차되는지에 대한 여부를 bool으로 반환하는 hook을 생성했다.



```react
import React, { useState, useEffect, useCallback } from "react";

const useIntersectObserver = (intersectRef) => {
  const [isIntersect, setIsIntersect] = useState(false);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsIntersect(true);
    } else {
      setIsIntersect(false);
    }
  };
  const options = {
    root: null,
    rootMargin: "200px",
    threshold: 0.01,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (intersectRef.current) observer.observe(intersectRef.current);
    return () => observer.disconnect();
  }, []);
  return {
    isIntersect,
  };
};

export default useIntersectObserver;

```

> `options` 인자를 추가로 붙여서 여러 군데에서도 재사용할 수 있도록 변경하는 것이 좋다고 생각한다.



##### 코드설명

- 해당 함수가 호출되면 state, callback, options를 메모리에 올리고, 이후 observe method를 이용해 관찰을 시작한다
- `observer.observe(#target)` : 호출시 지정한 콜백이 호출된다. 아후 `threshold`를 충족할 때마다 콜백이 호출된다.

- `handleObserver` : 교차, out될 때 수행되는 callback으로 해당 함수는 main thread에서 도므로 시간이 오래걸리지 않도록 유의한다. -> 오래걸리는 경우 `Window.requestIdleCallback()`을 사용한다.

  - callback의 매개변수 `entries`는 교차 감시대상을 가지는 array형태로, 현재 1개의 타겟(ref)을 갖는 길이 1인 배열이다.

  - 다른 구현코드에서는 비구조화 할당을 사용해 콜백을 따로 작성하지 않고 arrow function으로 한번에 작성한 코드도 있었다.

    ```react
        const observer = new IntersectionObserver(([ { isIntersecting }]) => if(isIntersecting) { /*
        logic..*/
    }, options);
    
    ```

    

- `isIntersecting` : 교차대상이 교차되었는지를 나타내는 bool, 교차시 state를 true로 set해 반환









### 고민

page, data, etc의 state를 `InfiniteScroll` 컴포넌트안에서 관리해야하는지 ?

- Loading을 나타내는 요소의 랜더를 결정짓는 lastPage의 state만 상위에서 관리하고 나머지는 전부 `InfiniteScroll`에서 관리해도 된다고 생각한다. 그러나 이렇게 한다면, `isLastPage`를 상위로부터 의존하므로 해당 state를 handle하는 함수를 따로 작성하고, props로 전달해야한다. 바라보았을 때 어느 것이 직관적인가

1. page, data, isLastPage State를 전부 갖는 상위컴포넌트 
2. page, data를 state를 갖고 isLastPage를 handle하는 함수를 props로 전달받은 하위 컴포넌트



> 1의 경우, 파일이동없이 한 눈에 보기는 좋다, 그러나 다른 컴포넌트까지 출력하는 경우, state변경이 상위에서 일어나 연관된 모든 하위컴포넌트까지 불필요한 랜더링이 되므로 낭비가 있을 것 같다.



> 2의 경우, 자신과 연관된 state만 가지고 있다. 따라서 다른 컴포넌트 랜더에 영향을 미치지 않는다. 다만 isLastPage의 의미를 보기위해 파일 하나를 추가로 살펴보아야 한다.





현재 구현한, 1의 경우 단점이 존재하나 단일컴포넌트이므로 해당 단점은 발생하지 않는다.

따라서, 다른 컴포넌트가 존재할 시 2의 방법인, 코드분리를 고려해보는 것이 좋다고 생각했다.



` + `

commit convention을 정했고 이를 지키고자 노력했다.

![스크린샷 2021-07-27 오후 7 28 58](https://user-images.githubusercontent.com/55486644/127139422-e6d2f0db-7d21-43d7-bc57-4a3169140eec.png)



가급적 한 줄로 명료하게 표현하려고 했고, 그에 따라 커밋단위를 세세하게 진행했다.

커밋은 내가 보기에도 중요하나 남이 보는 것이 더 중요하다.

다시 살펴보니 불필요한 주석, 그리고 습관처럼 굳어진 `git add .`을 남발하여 커밋했다.

이보다 파일단위로 수정사항이 있었던 파일만 정확히 커밋에 포함될 수 있도록 지키는 것이 중요하다고 생각되었고, 메시지에 맞는 커밋을 할 수 있도록 신경써야겠다.





### 번외: 페이지네이션, 인피니티스크롤 무엇이 옳은가

팀원분께서 생각지도 못한 훌륭한 ! 주제를 말씀해주셨다.

![스크린샷 2021-07-27 오후 5 48 44](https://user-images.githubusercontent.com/55486644/127125140-f6746eba-5934-4daf-928f-e1cc10be54cd.png)

해당 주제에 대한 훌륭한 글이 있어 정독했다 ㅎㅎ[페이지네이션 VS 무한스크롤](https://www.hellodigital.kr/blog/dmkt-general-pagination-vs-infinite-scroll-02/)

SEO부분에서 페이지네이션이면 크롤러봇이 더욱 올바르게 색인할 수 있다고 한다. 그러나 너무 많은 페이지는 SEO문제가 발생할 수 있으므로 콘텐츠를 정확하고 필요한 페이지만큼 사용해야한다고 한다.

> 검색엔진이 색인을 하는 컨텐츠 수가 제한되어있다고 한다.
>
> 너무 많은 페이지네이션의 SEO는 필요한 페이지를 노출시킬 수 없는 문제점이 존재한다.

따라서 무한스크롤은 UX적 측면, 페이지네이션은 SEO측면에서 장점을 가지며, 자사 서비스에 특화된 쪽 또는 사용자의 요구로 기능을 구현하는 것이 좋다. 라고 결론을 지었다.





, 마지막으로 `useCallback, memo`와 관련된 최적화 부분은 확실한 이해가 (메모리적으로, 시간적으로) 부족하다고 생각되어 작성하지 않았다.

함수의 경우 랜더시(컴포넌트 호출) 새로 생성되어 이전과 다른 주소값을 갖게되어 useCallback(함수 메모이제이션)을 하게된다면 useEffect의 의존성배열에 추가하는 패턴으로 메모리적으로 성능이 좋아진다고 알고 있는데 무조건적으로 좋다고 할 수 없다는 글을 보았고 상위에서 하위로 전달하는 함수가 없기에 적용을 지양했다.

간단한 예제를 통해 확실히 이해하고 적용해보도록 하기로 결정하며 이대로 제출하기로,, ? ㅎㅎ;!

🔗 배포 주소: https://seongsangcho.github.io/wanted-preonboarding-subject-1

레포 주소 : https://github.com/SeongsangCHO/wanted-preonboarding-subject-1



##### 참고



##### 참고

- [query string array](https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request)
- [axios paramters](https://github.com/axios/axios#axiosgeturl-config)
- [What does query string mean ?](https://www.techopedia.com/definition/1228/query-string)

- [CSRF ?](https://brownbears.tistory.com/251)

- [axios vs fetch](https://www.geeksforgeeks.org/difference-between-fetch-and-axios-js-for-making-http-requests/)

