## Let`s encrypt로 SSL인증서 발급받기



#### SSL?

Secure Sockets Layer. 

SSL은 OSI의 특정 계층에 속해있지 않고 전송-응용계층 사이에 독립적인 계층을 만들어 동작한다.

이를 SSL Layer라고 한다



#### HTTPS?

HTTP는 www상에서 정보를 주고 받는 프로토콜.

HTTP는 클라이언트 - 서버간  웹 페이지 같은 자원을 주고 받을 때 쓰는 **통신 규약**

HTTP는 텍스트 교환. HTML도 텍스트 => 암호화가 되어있는 것도 아니라 누군가 가로채면 그대로 내용이 노출되는 위험이 존재한다.

이런 보안상 문제를 해결해주는 프로토콜이 바로 **HTTPS**

`HTTPS`는 정보를 암호화하는 `SSL`프로토콜을 이용해 클라이언트 - 서버간 데이터를 주고받는 **통신 규약**


[HTTPS에 대한 설명](https://jeong-pro.tistory.com/89)

HTTPS의 암호화 원리는 **공개키 암호화**

#### 공개키암호화

암, 복호화시킬 수 있는 서로 다른 키 2개가 존재한다.

이 키는 서로 1번으로 암호화하면 반드시 2번으로만 복호화, 그리고 그 반대로하는 룰이 존재한다.

공개키는 공개키 저장소에 등록하고, 서버는 개인키를 소유한다.

1번키로 암호화된 http요청 , 즉 https요청이 오면 서버는 2번(개인)키로 이를 복호화해서 해독한다.

서버는 응답을 2번(개인)키로 암호화하고, 클라이언트는 1번(공개)키를 이용해 2번을 해독하는 것이다.

그렇다면 공개키는 저장소에 있는데 어떻게 가져올지?

#### CA

Certificate Authority라고 불리는 공개키저장소에 공개키가 저장되어있으며 검증된 기업만 CA를 운영할 수 있다.



#### 인증서 발급 방식

Let`s Encrypt에서 인증서 발급하는 방식은 3가지,

주로 [CertBot](https://certbot.eff.org/)을 통해 발급받는다.

```
1. 서트봇 홈페이지로 들어가서 자신의 서버 사양을 선택하면 설명 화면이 나온다.
2. 문서를 읽으면서 터미널에 명령어를 친다.
3. 몇몇 정보를 입력하면 알아서 설정해주고, 3개월 마다 갱신도 자동으로 해준다.
```





#### 인증서 발급받아 적용하기

<br>

먼저 인증서를 발급받기 전에 구동중인 서버를 stop시킨다.

현재 VM상에서 `/home` 경로로 이동하여 

`sudo git clone https://github.com/letsencrypt/letsencrypt` git  clone받는다.

`cd letencrypt` 경로로 이동한 후, `./letsencrypt-auto certonly` 명령어를 실행시킨다.

`standalone`방식으로 발급받으며, 이어서 도메인네임을 입력한다.

그 다음 [코드참고]([https://velog.io/@alskt0419/Node.js-%EC%89%BD%EA%B2%8C-https-%EC%A0%81%EC%9A%A9-%EC%8B%9C%ED%82%A4%EB%8A%94-%EB%B2%95](https://velog.io/@alskt0419/Node.js-쉽게-https-적용-시키는-법))에 나온 것 대로 ca, key, cert를 경로를 지정해준다.

다시 서버를 구동시키면 https로 접속이 가능하다!


![](https://images.velog.io/images/secho/post/cb5fdebe-e0f1-4753-b1a5-8a8dbec04280/https%EC%A0%81%EC%9A%A9%EC%99%84%EB%A3%8C.png)
![](https://images.velog.io/images/secho/post/a03b64d9-f706-41f5-8ef1-5f72bdd35393/%EC%9E%90%EB%AC%BC%EC%87%A0.png)
### To do 

http로 접속되는 것을 https로 모두 리다이렉트해야함.



경로 - 

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/www.yebalja.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/www.yebalja.com/privkey.pem
   Your cert will expire on 2020-10-15. To obtain a new or tweaked
   version of this certificate in the future, simply run
   letsencrypt-auto again. To non-interactively renew *all* of your
   certificates, run "letsencrypt-auto renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```