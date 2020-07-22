## nodejs #08 무중단배포하기 (pm2)



## nextJS 무중단배포하기



<br>

기존의 nextJS를 이용한 프로젝트를 배포하는 방법으로 `next build, start`해서 `.next`정적파일을 배포하는 방식을 사용했다.

그러나 이 방법은 VM을 종료하면 배포가 중단되는 이슈가 있었다.

현재 Back서버를 배포하는 방법으로 `PM2`를 이용하고 있는데 이를 front서버에도 적용시켜야 VM을 종료시켜도 서버가 중단되지 않을 것 같다고 회의를 통해서 결정했다.



#### PM2?

nodeJS는 단일 쓰레드로 실행된다.

따라서 예외를 처리하지 않으면 앱이 죽는다라는 말이 있다..

예외처리를 라이브러리를 통해 수행할 수 있지만 처리할 수 없는 오류가 있기에 PM2와 같은 `테스크 러너`를 이용해 해결한다.

`pm2 start app.js -i 3`와 같은 명령어로 멀티코어 CPU의 혜택을 누릴 수 있다.

세 개의 작업프로세스가 켜지며, 이 사이에서 `라운드로빈`방식으로 동시에 3개의 요청에 대응할 수 있다.

`pm2 scale app 2` 와 같은 명령어로 작업 프로세스의 수를 줄이거나 늘릴 수 있다.



#### 코드 수정

기존의 배포방법은 위에서 언급했다시피 `next`를 이용해서 진행했다.

그러나 PM2를 사용하기 위해서 변경해야했다.

`node`나 `npm`명령어를 통해 `start`해야하는데 정적파일 배포로는 이를 할 수 없는 것 같았다.

따라서 `package.json`의 스크립트를 변경하고, 기존에 없었던 `server.js`를 추가해 서버 구동하는 코드를 작성했다.

```json
  "scripts": {
    "dev": "node server.js",
    "start": "NODE_ENV=production node server.js",
    "build": "next build"...
```

server.js 의 내용은 공식문서와 [예제](https://github.com/stepanowon/nextjs_https)를 참고해서 작성했다.



#### PM2 사용하기

`pm2 start server.js` 를 수행하면 `server.js`에 명시한 port번호에 따라 localhost포트에 접근할 수 있다.

현재 80포트는 http로, 443포트는 https로 open한 상태이다. 



#### 할일

인증서 발급 받기.(어느 포맷인지, 유료인지 무료인지 check)

로컬에서 테스트해보기

VM상에서 인증서 업로드하여 테스트.