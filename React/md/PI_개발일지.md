### 개발일지

10.07

- 프론트 서버 배포
  - https://kooku.netlify.app/cloud/(gcp)-vm-인스턴스-생성-&-react-배포/
  - node-sass가 설치가 안됐는데, yarn add node-sass로 설치함.
  - npm run build로 빌드파일 생성
  - build파일을 배포하기 위해서 nginx의 sites-availbles/default에서 root파일을 react build파일로 설정해서 배포하고 있음. → 리다이렉트도 알아서 됨.
  - back서버를 다른 IP로 지정해야하나?
- mysql 원격접속
  - taelee님 블로그보고 참고하며 진행했음.   https://velog.io/@taelee/gcp에-mysql-원격접속하기

10.06

- Back서버구축

  - ejs, express, mysql, path, mysql, dotenv모듈설치

- GCP세팅

  - 한줄로 세팅하기-

  - mysql root계정 비밀번호 1234

  - ```
    sudo apt-get update && sudo apt-get install -y build-essential && sudo curl -sL [<https://deb.nodesource.com/setup_12.x>](<https://deb.nodesource.com/setup_12.x>) | sudo -E bash - && sudo apt-get install -y nodejs && sudo npm i -g npm && sudo apt-get install -y mysql-server
    ```

    - docker 환경구축
      - docker안에서 nginx ssl을 해야하나봐 - ;ㅠ;
      - 도커 설치방법 https://hiseon.me/linux/ubuntu/install-docker/
      - 도커로 nodeJS 배포중
      - 3000번포트로 접속이 안됐던 이유
        - 방화벽규칙에 없었음, 추가함.
    - nginx
      - 80번포트로 진입하고, SSL적용한 뒤, 리버스프록싱으로 3000→5000번포트로 진입하도록
      - sites-availbles/default에서 root파일을 react build파일로 설정해서 배포하고 있음. → 리다이렉트도 알아서 됨.
    - SSL적용
      - cert-bot, 디폴트 domain남아있어서 안되는것같음. 2.57 머시기
    - SSH접속 putty 개인키 생성
      - putty 설치
      - GCP 메타데이터 - SSH 키생성

10.05

- 리액트 layout
- back단 개발 node 시작
  - pm2 설치
  - express 설치
  - 템플릿엔진은 ejs로
  - DB구축부터해야함
  - 서버에서 크롤러도 돌려봐야하는데, openAPI or 크롤러 돌린 데이터 화면에 출력해보기