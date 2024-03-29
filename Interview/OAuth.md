# OAuth

---

based on [naver d2](https://d2.naver.com/helloworld/24942)

### What is OAuth ?

> Authentication + Authorization

다양한 플랫폼 환경에서 권한을 부여를 위한 프로토콜.

비밀번호를 공유하지 않고 인증 토큰을 사용해 User - Servie Provider간의 ID를 증명한다.

OAuth는 타 App에 구글 비밀번호를 제공하지 않고 다른 App이 구글에 있는 내 정보, 기능을 사용할 수 있도록 한다.

타 App이 털려도 구글 pw를 제공하지 않았으므로 관계없어진다.



### Why OAuth ?

페이스북, google, kakao, naver 등 사용자가 필요한 일부 기능을 다른 서비스에서도 사용할 수 있도록 한 것.

타 App에 유저의 ID, PW가 노출되지 않도록하기 위해 여러 방식을 고안했고 10년도에 OAuth 1.0이 표준안으로 발표되었다.



대표적으로 소셜로그인을 예로 들 수 있겠다.

사람인, 피그마 등 여러 서비스에서 소셜로그인을 지원한다 ~~심지어 게임에서도~~

외부 서비스에서 다른 서비스의 기능을 이용하기 위해서 "반드시" 다른 서비스에 "로그인"하는 것이 아니라 "별도의 인증 절차"를 거치면 타 서비스의 기능을 이용할 수 있다.

이 "인증 절차"가 **OAuth** 다.







### Version

대부분 서비스기업은 OAuth 2.0 버전을 쓰지만 아직 1.0을 사용하는 기업들도 있다.



### OAuth VS Login

실제 서비스에 로그인하는 것과 OAuth를 통하는 방식은 차이가 존재한다.

"로그인"을 하면 그 서비스의 DB에 내 정보들이 저장되어있다. id, pw를 통해 내가 해당 서비스 유저라는 걸 서버는 알 수 있다.

A서비스를 사용하고 있을 때 "Google OAuth"를 통해  로그인한다고 해보자.



A서비스는 내가 구글유저가 맞고, 이름은 누구누구고 이메일이 뭐인지 알고싶다. 근데 데이터는 구글에 있다. 

구글은 얘가 구글 유저고, 이름은 아무개라는 걸 A서비스에게 알려주어야한다. 

먼저 구글 OAuth 창을 통해 로그인을 한다.

로그인이 되면 동의창이 나올 것이다.

무엇을 동의하는가 ?

A서비스에게 내 구글 정보를 제공할 것인지에 대한 동의다.

 지금 내가 접속을 시도한 곳은 구글이 아니다. A서비스에서 OAuth를 시도한 것이다.



나는 내 구글 정보를 A에게 줄 것인지 말 것인지 결정한다. 한 번쯤 본 창일 것이다

![스크린샷 2021-04-27 오후 9 01 10](https://user-images.githubusercontent.com/55486644/116237880-b433df80-a79b-11eb-83be-13c445c463bd.png)



맨 위에서 OAuth는 Authentication(인증)과 Authorization(허가)를 포함하고 있는 단어이다.

위 단계는 "허가"이다.

한 마디로 `제 3자(A서비스)가 어떤 정보(내 정보)나 서비스에 사용자의 권한으로 접근하려 하는데 허용하겠느냐` 라고 표현이 된다.

허가를 하면 화면이 껌뻑거리고 소셜로그인으로 확인된 우리 정보를 A서비스에게 제공해줌으로써 타 서비스의 정보를 A가 이용하면서 우리는 서비스를 사용할 수 있게 된다.

---







### OAuth 2.0  Flows

> 그림으로 과정을 자세히 보자

![스크린샷 2021-04-27 오후 9 07 12](https://user-images.githubusercontent.com/55486644/116238617-8b601a00-a79c-11eb-858d-f555873b6656.png)

 [이미지 출처](https://docs.oracle.com/cd/E39820_01/doc.11121/gateway_docs/content/oauth_flows.html)

위 그림은 요청부터 유저가 권한에 대한 허가, 토큰 발급까지 나타낸 flow다.



1. 유저가 로그인버튼을 클릭한다.
2. 로그인버튼은 특정 URL(예시 ) OAuth 로그인화면)을 open한다.
3. 해당 팝업창에서 로그인 과정을 수행한다.
4. 로그인이 성공하면 Web Server는 브라우저를 특정 URL로 Redirect 시킨다.
5. 유저가 정보를 제공할지 말지에 대한 동의여부를 제출한다.
6. 동의했다면 Authorization 서버는 이를 확인하고 Authorization code를 생성한다.
7. 해당 code와 함께 Redirect 시킨다.
8. 해당 code를 가지고 access Token을 Authorization 서버로부터 발급받기 위해 요청한다.
9. Access Token을 발급한다.
10. Access Token을 갖고 유저의 정보가 있는 Resource 서버에 유저 정보를 요청한다.
11. 유저 정보를 반환받는다.



대략적으로 OAuth의 절차는 비슷비슷하다. payco의 인증과정도 보자.



#### Payco의 인증방식

[출처](https://developers.payco.com/guide/development/start)

![스크린샷 2021-04-27 오후 10 06 49](https://user-images.githubusercontent.com/55486644/116246342-df6efc80-a7a4-11eb-9284-0d2ab313e7d9.png)

> 1~5 단계는 Authorization Code 발급 요청 URL을 통해 진행할 수 있습니다.
>
> 7~8 단계는 서비스에서 callback URL 을 통해 전달받은 Authorization Code를 사용하여 Access Token 요청 API를 통해 진행할 수 있습니다.
>
> 8 단계에서 발급받은 Access Token은 서비스에서 자체적으로 저장, 관리해야 합니다.
>
> 10~11 사용자의 서비스 요청 시 회원정보가 필요하다면 Access Token을 사용해 API를 호출할 수 있습니다.





정리해보자면 OAuth는 third party App에게 다른 서비스의 비밀번호를 제공하지 않고도 타 서비스의 기능을 이용할 수 있도록 Authorization해서 Authentication을 획득하는 프로토콜이다.









> 이하는 42API를 사용하기 위한 정리본

##### Access Token 받기

User는 OAuth authorization server (API Provider, 이하 서버)로부터 redirected된다.

서버는 유저가 active session을 갖고 있는지(로그인 되어있는지)에 대해 check한다.

그렇다면, 서버는 요청된 data에 대한 access 여부를 알려준다.

User가 access를 받으면, 지정한 url로 redirected된다. 그리고 authorization 코드가 쿼리 파라미터가 Redirected URL에 포함된다. 

- Redirected URL을 `localhost:3000/login` 으로 지정하면 `.../login?code=CodeValue` 쿼리값으로 값이 넘어와서 해당 값으로 token을 요청해야한다.

코드가 쿼리 파라미터로 전달되기 때문에 웹 브라우저는 이를 OAuth 클라이언트 역할을 하는 웹 서버로 보낸다. -> front서버가 해당 쿼리 param을 받을 수 있도록 한다.



이 코드는 앱에서 서버로 서버 간 호출을 통해 액세스토큰으로 교환된다. 이 엑세스토큰은 클라이언트가 API를 호출하는데 사용된다. (코드를 얻은 front가 back서버로 전달해 back서버는 해당 코드, uid, secret 등을 가진 정보들을 가지고 api서버에서 access token을 얻는 과정을 수행하고 front에 해당 토큰을 전달함, 그 다음 요청에 대해서 access token을 갖고 수행)



### 순서

1. 프론트에서 로그인 버튼을 클릭한다.
2. 42의 로그인 여부를 확인하는 페이지로 이동된다.
3. 로그인을 마치면 지정한 redirected url로 code가 쿼리 파라미터로 전달된다.
4. Front 또는 Back side가 해당 쿼리를 받고 access token을 받기위한 요청을 전달한다.
5. access token을 반환받고나면, 이 다음의 api 호출은 헤더에 `Authorization : Bearer code value` 를 삽입해 API요청을 보낼 수 있다.



4번에서 내가 했던 방식은 다음과 같다.

Front side에서 Route를 이용해 쿼리스트링으로 넘겨지는 code의 값을 받는다.

이 code값을 back에 전달한다.

back은 이를 받고 access token을 받기위한 요청을 전달, 발급받는다.





## API

---

### User 정보 가져오기

`https://api.intra.42.fr/v2/users/userName`

- Authorization : bearer accessToken 으로 헤더설정후 요청보내면 받을 수 있음.
- 얻을 수 있는 정보, 이름, 메일, image Url.. etc...



이렇게 access token 갖고 userName으로 요청 보내면 유저에 대한 상세정보들을 받아올 수 있는데, access token만으로 userName은 어떻게 확인할 것인지?

- `https://api.intra.42.fr/v2/me` 로 보내면 됨

  - Content-Type : application/json; charset=utf-8

  - ```bash
    curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.intra.42.fr/oauth/token/info
    
    # 여기서 resource_owner_id가 있어야 해당 요청에 대한 결과를 받을 수 있는데
    # 왜 null로 받아올까; ?
    # {"resource_owner_id":74,"scopes":["public"],"expires_in_seconds":7174,"application":{"uid":"3089cd94d72cc9109800a5eea5218ed4c3e891ec1784874944225878b95867f9"},"created_at":1439460680}%
    ```

  - `rescue_owner_id`가 받아지지 않는 문제 -> post 요청 내 전송하는 데이터 타입 중 `grant-type` 이 `authorization_code`로 되어야 refresh_token과 해당 정보를 받아올 수 있었음.

    - 공식문서에는 access_token 요청을 보낼 때,  token에 대한 엔드포인트에 `application/x-www-form-urlencoded` 를 추가해야한다고 적혀있다.
    - Grant_type은 MUST be password로 set되어야 한다고 적혀있는데 42 api엔 `authorization_code` 를 사용하라고 되어있다.

  ```http
  # RFC 예제
  
  POST /token HTTP/1.1
       Host: server.example.com
       Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
       Content-Type: application/x-www-form-urlencoded
  
       grant_type=password&username=johndoe&password=A3ddj3w
  ```

  

### 발행된 토큰 정보 확인하기

`curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.intra.42.fr/oauth/token/info`







### 비동기요청

```react
axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        // const res = await axios.get(`http://localhost:8000/token`);
```

- axios로 비동기처리할 때 공통적으로 사용할 header 설정

- baseURL도 사용