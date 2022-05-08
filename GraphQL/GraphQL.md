## GraphQL
> Runtime으로 데이터 불러오는 API를 위한 쿼리언어
여러 요청을 single req로 받아온다.
[dev tools](https://github.com/graphql/graphiql)도 지원함


RestAPI endpoint대신 스키마를 보고 원하는 필드를 query할 수 있음.
- single enpoint, queries를 respond
- 빠른 개발속도, 빠른 변화에 강함.

- Schema - GQL의 코어 서버구현체, client app이 사용가능한 함수를 설명
- Query- request to read or fetch values
- Mutation - data 수정 쿼리
- Resolver - GQL 쿼리에 대한 응답을 생성하는 함수들의 collections

---
### Rest vs GraphQL
오버, 언더페칭을 해결할 수 있음.
블로깅 app을 예시로 들 면,
RestAPI는 하나의 블로그글에 3개의 api가 필요하다
- user data
- post data
- followers data

GraphQL은 하나로 끝난다.그리고 화면에 꼭 필요한 데이터만 받아올 수 있다.
(클라이언트에서 쏘는 QL)
```
query{
  User(id: "2dvxc1234") {
    name
    posts: {
      title
    }
    followers(last:3) {
      name
    }
  }
}
```