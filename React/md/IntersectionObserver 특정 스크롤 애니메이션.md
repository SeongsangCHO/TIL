# 리액트 스크롤 애니메이션

> 페이지 스크롤시 특정시점에 액션 수행 OR 컴포넌트 브라우저 위치에 따라 액션 수행



무한스크롤이 아닌 이상, 페이지 전체 길이 구할 수 있고. 각 노드들의 위치를 구할 수 있으니

현재 스크롤 위치와 노드 위치에 따라 액션수행할 수 있지 않을까?



리액트에서 스크롤에 따른 애니메이션을 추가하려한다.

먼저 알아야할 것

- `scroll Event`, `scroll관련 메소드`
- `scroll 디바운싱`
- `transform`, `translate3D`
- `Ref`
- `IntersectionObserver`



### IntersectionObserver

> JS API
>
> [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

무한 스크롤을 구현할 때 많이 쓰는 것 같음.

element가 viewport, 다른 엘리먼트와의 관계에서 보일지, 안보일지를 정하는 API

- callback : 관측 대상이 `threshold` 만큼 보일 때 호출되는 함수
  - 관측대상을 ref로 정함
- root : 대상이 보임을 확인하기 위한 뷰포트로 사용되는 요소. 관측대상의 조상이어야함
  - 문서 내 스크롤이 가능한 요소 내에 관측대상이 있으면 root가 그 요소로 가게됨 => 관측대상이 스크롤가능한 조상에 있는지, 그 조상이 root인지 정함
- rootMargin : root요소를 감싸는 마진이 들어감
- threshold : 관측 대상이 root와 몇 % 교차했을 때 `callback` 실행할지를 결정하는 값. 요소가 10%보일때 콜백을 수행한다면 해당 값은 0.1



### Ref

> DOM에 직접 접근해야할 때,
>
> "어떤 일이 일어나게"할 때 사용될 수 있다.
>
> React [문서 ](https://ko.reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs)에 따르면, *ref* 를 쓰는 경우는:
>
> - DOM 노드에 접근해서 포커스, 미디어 재생 등을 제어하거나, 사이즈를 얻어올 때
> - 애니메이션을 직접 실행시킬 때
> - 서드 파티 라이브러리를 사용할 때



DOM의 특정 노드에 접근해야할 때 DOM노드 또는 컴포넌트 인스턴스에 reference를 걸어서

해당 요소에 접근해 값을 얻거나 수정할 수 있다. 

애니메이션을 스크롤 시점에 따라 수행시킬 것이므로 ref를 써야한다

**DOM에 ref 속성을 추가하면 됨** `<div ref = {...} >` hooks에서는 `const nameRef = createRef()`로 사용



#### 예제

```react
const useScrollFadeIn = () => {
  const dom = useRef();
  
  const handleScroll = useCallback(([entry]) => {
      const { current } = dom;
    	//구독한 target Element을 entry배열에 넣음
    //target element가 교차되고 있는지 확인하여
    //교차상황이면 액션추가
    	if(entry.isIntersecting) {
        current.style.transitionProperty = 'opacity transform';
        current.style.transitionDuration = '1s';
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = '0s';
        current.style.opacity = 1;
        current.style.transform = 'translate3d(0, 0, 0)';
      }
    }, []);
  
  useEffect(() => {
    //관측을 추적하는 부분
    let observer;
    const { current } = dom;
    
    if (current) {
      //콜백함수 수행하면서 관측시작
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);
      
      return () => observer && observer.disconnect();
    };
  }, [handleScroll]);
  
  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: 'translate3d(0, 50%, 0)',
    }
  };
}
```





### 쓰로틀링

> 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
>
> 스크롤이벤트에 보통 사용됨



### 디바운싱

> 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것
>
> 로그인, 검색에 사용됨

검색했을 때 밑에 연관검색어가 자동으로 보여지는 것을 예를 들면,

ㅅ, 수, 수ㅂ,수바, 수박 -> 이렇게 두글자입력하는데 API를 글자수 마다 호출하게 되므로, 다 쳤을 때 요청을 보내도록 하는 것

입력이 다 끝난 후에 요청을 보내면 되므로 특정 시간동안 입력이 없으면 입력이 끝난 것으로 치고 타이머 이전에 발생하면 새로운 타이머를 설정하도록 한다.



### 정리

리액트에서 특정 노드에 대한 포커스, 애니메이션, 무한스크롤을 구현하기 위해서 `IntersectionObserver` API를 사용해서 구현하는데, 일반적인 scroll 이벤트리스너를 등록해서 구현하면 스크롤이 일어날 때 마다 이벤트, 계산을 진행하므로 `쓰로틀링, 디바운싱` 등의 핸들링이 필요하게 되기에 이 대안으로 사용함.

사용법은 직관적인편. 타겟 요소가 루트로 지정된 곳 기준으로 몇퍼센트 보이는지 정하고, 콜백함수를 인자로 넘겨 관측수행.



출처

- [리액트 커스텀 훅스로 스크롤 애니메이션 만들기](https://shylog.com/react-custom-hooks-scroll-animation-fadein/)
- [IntersectionObserver 설명 및 무한스크롤 예제](https://kentakang.com/163)
- [IntersectionObeserver 레이지로드 구현](https://medium.com/@pks2974/intersection-observer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-fc24789799a3)

- [쓰로틀링, 디바운싱](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)



