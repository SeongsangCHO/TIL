# HTTP 1.0, 1.1 그리고 2.0

---



### What is HTTP?

Hyper Text Transfer Protocol : www상에서 정보를 주고 받을 수 있는 프로토콜.

HTTP를 통해 HTML문서를 전달





### 0.9

- HTTP의 첫 버전 번호로 이전에는 버전번호가 없었다.

- 요청과 응답은 매우 단순했고 오로지 `GET` 메소드로만 요청을 수행했다.

- 요청 :  `GET /mypage.html`

- 응답 : `<HTML> hello </HTML>`



### 1.0

- 하나의 TCP연결 당 한번의 데이터 전송만 이루어진다.(3way-handshake)
  - 연결하자(syn)
  - 연결 오케이(syn + ack)
  - 연결 수립(ack)
  - 통신
- 데이터 전송이 끝나면 TCP연결을 끊는다. (4way-handshake)

- 버전 정보가 요청 내에 전송되기 시작

- `Status code`가 응답의 시작에 붙어 전송되어 성공, 실패를 알 수 있고 이 결과에 대한 동작을 할 수 있게 되었다. -> 200, 404에 따른 분기처리
- HTTP 헤더가 요청, 응답에 도입되어 프로토콜 확장 가능하도록 만듦
  - `Content-Type` 으로 HTML 파일 외 다른 문서 전송 가능 
    - 응답에서 반환된 content유형을 클라이언트에게 알려줌
    - Example ) json을 반환할 때 이를 하면 json object로 auto casting된다. 이는 간편하나 보안에 취약하다고 한다.
    - `X-Content-Type-Options: nosniff` 를 통해 auto casting을 제지하고 사용자가 이에 따라 동작을 정의할 수 있다.

#### 요청 (start Line + Headers + body)

```http
GET /mypage.html HTTP/1.0									//start line
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1) //Header
HOST: developer.mozilla.org

//요청의 실제 메시지/내용
```

#### 응답(startLine + Headers + body)

```http
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html //headers
<HTML> //body
A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```





### 1.1 (표준 프로토콜)

>대표적으로 추가된 것
>
>- Persistent Connection(Keep-alive) 도입
>- Pipelining 기법 도입(HTTP요청, 응답 병렬처리)



웹에 있는 컨텐츠의 양이 많아지면서 기존의 1콘텐츠 1TCP connect, disconnect의 방법이 부담이 커졌다.

그래서 TCP연결 재사용이 필요해졌는데 이때 등장한 것이 Persistent Connection기술이다. (짧게 keep-alive라고도 한다)

HTTP요청, 응답을 병렬로 처리하는 파이프라이닝을 사용하기 위해선 "반드시" 지원되어야함.

#### 이점은 ?

- 기존 한번의 데이터전송이 끝나면 닫던 커넥션을 "재사용될 수 있게" 했다. 따라서 "단일시간 내 " TCP 연결 수가 적어지므로 CPU, 메모리, 네트워크 혼잡, 지연의 수를 줄일 수 있다.

- 파이프라이닝을 추가해 첫 요청에 대한 응답이 완전히 전송되기 이전에 두번째 요청 전송을 가능하게 했다. -> 병렬처리

  

#### 언제 사용 ?

- 사용은 요청헤더 내에 `Connection: keep-alive` 를 추가한다.

~~1.1에서는 기본적으로 지원하기에 굳이 추가하지 않아도 된다.~~

- `keep-alive` 속성에 기록된 timeout에 따라 일정시간 연결을 유지한다.

- `Connection`헤더를 1.1에서 사용할 때는 `keep-alive` 하지 않을때이다.
  - 클라이언트 접속이 잦은 메인 페이지에서 커넥션 유지를 고려해봐야한다.



### 문제점

`HOL`문제가 발생할 수 있다. (Head-Of-Line)

- 클라이언트-서버간 ""동시에" 6개정도로 TCP 커넥션이 제한되어 있다. 제한된 요청을 각각 순차적으로 응답하기 때문에  현재 요청은 이전 응답에 대한 처리를 기다려야한다. 이 지연을 HOL이라고 한다.
- 1.1의 사양상 제한(TCP 동시 연결 수)으로 요청-응답 순서가 동기화될 수 있다.

=> 파이프라이닝, keep-alive를 사용해도 사양상 한계로 인해 HOL blocking이 발생한다.



이를 방지하는 개념이 2.0에서 등장.



### 2.0

HOL Blocking 방지

- 동일한 커넥션상에서 병렬요청이 다루어짐 => 연결 하나로 요청, 응답을 병렬로 처리 => 로딩이 빨라짐

중복제거, 헤더압축

- 전송된 데이터의 중복을 제거
- 기존 Header는 평문이었으나 헤더압축방식으로 데아터 전송효율을 높임 ->45 ~ 1142ms감소

Server Push

- 서버가 단일 요청에 대해 여러 응답을 보낼 수 있게되었다.
- 따라서 client가 요청하지 않았지만, 필요하게 될 리소스들을 다른 응답으로 서버에서 전송할 수 있다.



> 1.1이랑 효율성 90%이상 차이난다.





### HTTP 3.0 QUIC (Quick UDP Internet Connections)



기존 TCP연결방식의 성능을 개선하고자 UDP방식을 채택했다.

- TCP를 사용하지 않으므로 3way handshake 과정 X
  - HTTP+TCP+TLS는 3RTT(Round Trip Time) : 요청-응답 사이클
  - QUIC은 첫 연결설정에 1RTT 소요 => 연결에 필요한 정보와 데이터를 함께 보내버림

속도개선, 커넥션 수 최소화, 패킷혼잡을 피하는 것이 주요 특징

암호화가 프로토콜 기능으로 포함.

CDN들은 HTTP/3를 지원하고 있음.

### 참고

- [X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- [HTTP1.1 / 파이프라이닝, keep-alive](https://brunch.co.kr/@sangjinkang/4)

- [HTTP2.0](https://velog.io/@taesunny/HTTP2HTTP-2.0-%EC%A0%95%EB%A6%AC)
- [Persistent Connection](https://brunch.co.kr/@sangjinkang/4)
- [HOL](https://letitkang.tistory.com/79)
- [http2.0 효율성](https://www.popit.kr/%EB%82%98%EB%A7%8C-%EB%AA%A8%EB%A5%B4%EA%B3%A0-%EC%9E%88%EB%8D%98-http2/)
- [http2.0 docs](https://developers.google.com/web/fundamentals/performance/http2)
- [http3.0 QUIC](https://evan-moon.github.io/2019/10/08/what-is-http3/)



