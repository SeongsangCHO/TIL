## nodejs #10 nextJS build된 정적파일 무중단 서비스하기, nginx SSL적용 및 리버스프록시설정



nextJS를 배포하기 위해 `.next`라는 정적파일로 `build`하고 이를 배포하는 방법으로 기존에 진행했었다.

`무중단서비스`를 위해 `PM2`로 서버가 크래시나도 재시작을 할 수 있도록 도와주거나 VM이 종료되어도 서버를 계속 배포할 수 있는 도구를 사용했었다.

**하지만** 이 방식은 **정적 파일**배포가 아니었기 때문에 매우매우매우매우 느렸다.

나와 같은 팀원분은 이 문제를 해결하기 위해 많은 고민을 했다..~~가이드 없이 하기란 정말 어려운 일이다.~~





기존 서버 배포방식은 [공식문서의 가이드](https://nextjs.org/docs/advanced-features/custom-server)와 여러 블로그 및 게시글들을 참고하며 SSL인증서의 발급과 적용을 진행했었다.

앞서 말했듯 파일배포가 아닌 서버 구동은 적절치 않은 배포방법이었기 때문에

최종적으로 nextJS로 정적파일을 build해 서버를 따로 만들지 않고 nginx의 리버스프록시 설정을 통해 SSL도 적용하고 도메인에 대한 요청을 https로 리디렉션하는 방법을 적용, 완료했다. 



같은 팀원인 `taelee`님께서 SSL인증서 적용을 하셔서 해당 방법을 링크한다.

[nginx https적용]([https://velog.io/@taelee/https-nginx-%EC%A0%81%EC%9A%A9](https://velog.io/@taelee/https-nginx-적용))



- 참고글

  [next build참고](https://jcon.tistory.com/133)
  [nextJS에서 SSL인증서 적용](https://stackoverflow.com/questions/55304101/https-on-localhost-using-nextjs-express)
  [nextJS HTTPS적용한 깃헙예제](https://github.com/stepanowon/nextjs_https)
  [SSL인증서발급](https://devlog.jwgo.kr/2019/04/16/get-ssl-cert-from-letsencrypt/)
  [GCP 로드밸런서 ~ SSL인증서 적용](https://web-inf.tistory.com/47?category=857039)
  [nodejs에서의 SSL인증서 적용 포맷](https://www.securesign.kr/guides/Node-js-SSL-Certificates-Install)

<br>



### 도중에 발생했던 에러들

포트가 이미 사용중이었던에러

<img width="600" alt="포트사용중에러" src="https://user-images.githubusercontent.com/55486644/88131908-0f3b1380-cc19-11ea-8d5a-368e6b190b9b.PNG">



<img width="419" alt="포트사용프로세스" src="https://user-images.githubusercontent.com/55486644/88131911-106c4080-cc19-11ea-9d43-73c8aaf435bd.PNG">

npx next build를 하면, server.js에서 작성한 port1에 따라서 포트가 열린다.

그러나 어떤이유에서였는지 3000포트가 계속해서 살아있었고 인스턴스를 재시작함으로 해당 이슈는 해결되었다. nginx를 stop한 적이 없었는데 아마 이전에 이것저것 건드리다가 포트가 계속해서 열렸던 것 같다.



<br>

기존의 리디렉션 설정 nginx.conf

<img width="412" alt="기존nginx설정" src="https://user-images.githubusercontent.com/55486644/88131912-1104d700-cc19-11ea-8254-3a72c6d7deeb.PNG">



리버스 프록시를 이용하지 않고, customserver에서 적용한 SSL을 적용하여 바로 https로 리디렉션하게 했었다. (정적파일 배포 아니었음)



nginx에 대해서 잠깐 알아보자면..



#### virtual host

가상호스트 => nginx.conf파일에 server블록을 사용하면 가상호스트를 지정할 수 있다.

가상호스트란 한대의 컴퓨터로 여러대 컴퓨터가 존재하는 것처럼 하는 것. 

한 IP에 접속했을 때 각각 다른 페이지를 서비스할 수 있도록 해주는 것.

현재 우리가 하는 것은 nginx를 맨 앞에 두고, 이를 서버의 포트(3000 or 443)으로 리디렉션해주게 하려고 한다.

이를 리버스 프록시라고 한다.

#### 리버스 프록시서버

서버 앞단에 웹 서버를 이용해 사용자가 서버에 바로 접근하지 않고, 웹 서버에 요청해 리버스 프록시서버(앞단의 웹서버)가 서버의 포트, 디렉토리에 연결

=> 분산처리가 가능.

- server_name : (도메인)호스트 명
- $host = 도메인네임을 가리키는 환경변수
- $uri = 도메인 네임 뒤, uri를 가리키는 환경 변수

```
# TCP 소켓을 사용할 때의 구문

proxy_pass http://hostname:port;

proxy_pass http://localhost:8080;

proxy_pass http://127.0.0.1:8080;

proxy_pass http://unix:/tmp/nginx.sock;

proxy_pass https://192.168.0.1;

proxy_pass http://localhost:8080/uri/;

proxy_pass http://unix:/tmp/nginx.sock:/uri/;

proxy_pass http://$server_name:8080;


# 유닉스 도메인 소켓을 사용할 때의 구문

proxy_pass http://unx:/path/to/file.socket;



# 업스트림 블록을 사용해도 좋다.

proxy_pass http://myblock;



# 보안 통신용으로 http:// 대신에 https:// 를 사용할 수 있다.

# 변수뿐만 아니라 추가적인 URI 부분을 사용해도 좋다.



```

[출처](https://12bme.tistory.com/367 [길은 가면, 뒤에 있다.])



<img width="412" alt="참고그림" src="https://user-images.githubusercontent.com/55486644/88131951-20842000-cc19-11ea-8d2d-659a550ab7a2.PNG">



[출처](https://akal.co.kr/?p=1781)

리버스 프록시를 앞단에 두고, 뒤에 back, front서버를 두어 하나의 서버로 SSL을 적용할 수 있다는..정보를 알게 되었다.

기존에 front에서 적용했던 SSL인증서가 아예 필요없게 된 것 같다.=> 필요없었음

정리하자면 nginx에서 80, 443포트를 열어두고, 80포트로 받은 브라우저의 요청을 nginx의 443포트로 넘겨주고 이 443포트는 back, front서버의 3000,5000번 포트와 연결되어있어 프록시해준다고 생각하면 될 것 같다. => 맞음

현재 next 배포는 custom서버로 server.js를 작성해서 SSL인증서도 적용하고 3000번 포트도 열어 nginx의 80포트랑 연결해두었는데,  server.js가 없어도 될 것 같다. => 필요없었음.

그 이유는 next의 기본 명령어(build, start)를 사용하면  3000번으로 포트가 열리기 때문에  이 포트를 nginx와 연결하면 될 것 같다. => 맞음.



#### 할일

server.js없이 build한 후 리버스프록시가 제대로 되는지 확인하기. (체크)

- server없이, `next start`로 리버스프록시가 됨, https도 적용됨(왜죠) => nginx에서 SSL을 적용하기 때문에.

확인이 되었다면 nginx에서 SSL인증서를 발급받고 nginx info page에서 https가 적용되는지 확인하기.=> 확인.

https가 적용되었으면 https로 redirection하기 => 완료





<img width="591" alt="nginx설정변경" src="https://user-images.githubusercontent.com/55486644/88131913-119d6d80-cc19-11ea-9afc-839ebad303e1.PNG">

