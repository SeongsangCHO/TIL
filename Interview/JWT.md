# JWT

---



Json 객체를 사용해 가볍고, self-contained 방식으로 정보를 안전성있게 전달해주기 위한 토큰.

### 1. JWT ?

JSON Web Token (JWT) is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and `self-contained` way for `securely transmitting information` between parties as a `JSON object.` 



여기서 keyword는 `compact, self-contained, JSON, securely` 다.

- `self-contained` : 다른 매개를 이용하지 않고 JWT안에 필요한 정보를 담고 있다.
- `JSON` : JWT는 JSON형식으로 이루어져 있다.
- `securely` : 암호화하여 정보가 위변조되지 않았는지 검증하는 단계가 존재함.

- `compact` : 크기가 작아 http header에 담아 전송 가능.



JWT는 다른 저장소나 변수 등을 사용하지 않고 그 자체로써 표현할 정보들을 담는다.

정보들을 표현하는 방법은 JSON형태다.

전달되는 정보들이 위변조되지 않았는지 검증하는 단계가 존재한다.



##### JWT 한줄 요약

JWT는 개방형 표준이다. 그리고 컴팩트하며 정보를 안전하게 전달하기 위해 자체적으로 JSON object형태로 정보를 담고 위변조가 있었는지 검증하는 단계가 있는 두 당사자간의 `claims 표현 방법`. (claim : key:value로 표현된 정보의 한 조각)





### 2. 언제 사용할까 ?



`Authorzation` :  유저가 로그인하고나면 각 요청에 대해서 JWT가 포함되어 전송된다. 서버는 JWT를 검증해  유저가 routes, service, resources에 액세스할 수 있도록 제공한다.

`Infomation Exchange`:  JWT는 공개키, 개인키쌍을 사용해 signed될 수 있기 때문에 전달되는 데이터가 위,변조되었는지 검증할 수 있기에 전달에 있어서 안전하다. 





### 3. 구조는?

Header, Payload, Signature로 이루어져있으며 각각 `.`으로 구분된다.

`xxxxx.yyyyy.zzzzz`의 형태다.

Header, Payload는 `Base64Url`로 인코딩된다.

#### 3.1 Header

```json
{
  "alg" : "HS256",// 암호화에 사용될 알고리즘을 작성
  "typ" : "JWT"  //토큰의 형태를 작성
}
```

### 3.2 Payload

claims를 포함한다.

필수는 아니나 권장되는 `Registered(Reserved) claims`(발행자, 만료시간 등)

충돌방지가 필요하여 UUID, URL, 이메일형태로 작성 `Public claims`

충돌방지가 필요하지 않고 두 당사자간 정보를 공유하기 위해 사용되는 `Private claims`



```json
{
  "sub": "1234567", //Registered
  "http://secho.com" : true, // Public
  "name": "secho", // Private
  "admin": true,
}
```



#### 3.3 Signature

encoded header, payload, 비밀키를 가지고 헤더에 지정된 알고리즘을 이용해 생성하는 부분

예를들어 HMAC SHA256알고리즘을 사용한다면 signature는 다음과 같이 생성된다

```js
HMACSHA256(base64UrlEncode(header) + "." +
          base64UrlEncode(payload), secret)
```



signature는 메시지가 변경되지 않음을 검증하기 위해 사용된다.



#### 3.4 정리



JWT는 자체적인 정보를 JSON형식으로 header, payload에 담고 encode되므로 compact하며 signature를 이용해 정보의 위변조를 검증하므로 안전하게 전달할 수 있다.



##### 어떻게 signature로 검증하는데?

다음의 정보로 JWT를 발급한다고 해보자.

HS256의 알고리즘을 사용하고, JWT방식이며 담을 정보는 user가 secho인 클레임 하나, 그리고 비밀키는 watch인 토큰의 구조는 다음과 같다.

```json
{
  "alg" :"HS256",
  "typ" :"JWT"
}
{
  "user" :"secho"
}
256(encode(header)+"."+encode(payload), watch)
```

이를 `(header)xxxx.(payload)yyyy.(signature)zzzz`로 인코딩해서 표현하면 이렇게 될 것이다.

`eyjgjasdjasTdsfvcx.eySDKFSNVXCsfs.TGJVJcxxsdfsdfewr`

서버측에서 인코딩된 `signature`를 디코딩, 비밀키로 복호화하여 header, payload를 확인하고 전달된 payload를 디코딩해 `signature과 payload`를 비교하여 변조되지 않았는지 확인한다.

만약 클라이언트측에서 payload를 변경했다면 복호화된 signature에 담긴 payload와  값이 다를 것이므로 위변조가 있음을 확인할 수 있다.





### 4. 어떻게 동작?

민감한 데이터를 브라우저스토리지에 저장해선 안되기 때문에 http헤더인 `Authorization`에 담아 전달한다.

`Authorization: Bearer <token>` 의 방식으로 Bearer를 붙이는게 표준이다.

해당 헤더로 전달하면 쿠키방식에서 발생했던 `CORS`이슈가 발생하지 않는다.



JWT는 토큰 유형, OAuth는 토큰 발급, 인증 방법을 설명하는 일종의 프레임워크다.

따라서 JWT를 이용한 인증 flow는 기본적으로 OAuth와 유사하다고 생각하면 된다.



##### 참고

- [JWT 공식문서](https://jwt.io/introduction)

- [JWT, OAuth 관계](https://swalloow.github.io/implement-jwt/#:~:text=JWT%EC%99%80%20%EA%B8%B0%EC%A1%B4%EC%9D%98%20OAuth,%ED%95%98%EB%8A%94%20%EC%9D%BC%EC%A2%85%EC%9D%98%20%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC%EC%9E%85%EB%8B%88%EB%8B%A4.)

