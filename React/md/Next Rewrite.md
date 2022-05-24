### Rewrites

---

> request Path를 다른 destination path로 매핑시켜주는 것
>
> 클라이언트사이드에서 프록시요청이 필요할 때 react-proxy 이런거 대신 사용하기 위한 옵션



### Case 1. Request URL에 숨기고 싶은 정보가 있을 때,

- 블로그에 가장 많은 예제로, API Key를 request url param으로 같이 던지는 경우가 있는데 이를 브라우저단에서 표시하지 않게하기 위해 사용



### Case 2. COR proxy

> 도메인이 다른 서버로부터 Set 쿠키도 되는지는 확인이 안되는데, [예제가 있는 것으로 보아 ](https://soulcactus.dev/react/set-next-proxy/),,

- 백엔드에서 응답하는 응답 헤더의 `Set-Cookie` 은 `domain` 이라는 속성을 갖는데, 여기에 기술된 도메인의 요청에만 쿠키를 set할 수 있다.
  - 명시하지 않으면 쿠키를 발행한 서버도메인으로 default set
- SameStie는 크로스사이트 요청에 대한 속성인데 항상 크로스사이트의 요청에도 쿠키를 설정하려면 None으로 되어야하며, secure쿠키여야함.

도메인이 다를 때 위와 같은 점을 염두에 두며 개발해야한다.

개발환경에서 쿠키가 의도대로 저장되지 않다면 백엔드 설정을 계속해서 건드려야하므로 리소스낭비가 은근 크다.

따라서 개발환경에서는 최대한 빠르게 하는 것이 중요하다고 생각되는데, 백엔드 설정보다 클라이언트에서 관련설정을 하는게 빠르다고 생각된다. 그 방법 중의 하나가 proxy 설정인데, `rewrite` 기능으로 대체할 수 있다.



### [Case3. I18n](https://nextjs.org/docs/api-reference/next.config.js/rewrites#rewrites-with-i18n-support)





### 설명

- nextjs의 서버사이드메소드에서 호출하는 request는 브라우저가 아닌, 서버에서 호출하므로 CORS가 발생하지 않는다.(보안상 의미가 없다.) (CORS는 브라우저가 서버에게 검증요청을 먼저 보내서 서버가 보내는 에러다.)  + [프론트엔드 기술만으로 CORS 우회시 취약점인 것이다.](https://koras02.tistory.com/96)
- destination에 보내는 request를 source 주소에서의 요청으로 한 것처럼 보여지게 rewrite한다는 의미



### 설정

`next.config.ts`

```tsx
module.exports = {
  async rewrites() {
    return [
      {
        source: '/get',//api request path
        destination: 'https://random-d.uk/api/random',//목적 path
      },
    ]
  },
}
// 실제 브라우저의 network의 request url을 보면 localhost:3000/get으로 찍혀있는데, 실제로는 destination으로 요청을 보낸 것.
```

