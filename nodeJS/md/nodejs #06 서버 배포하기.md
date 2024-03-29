## nodejs 서버 배포하기



<br>

### 1. 서버배포를 위한 테스트프로젝트 생성

<br>

[express 패키지 생성](https://developer-mistive.tistory.com/5)

먼저 생성할 프로젝트 폴더를 엽니다.

해당 폴더의 경로에서

```
$ npm init
```

을 사용하면 package.json파일이 생성이됩니다.

해당 패키지에서 사용할 라이브러리를 지정해주는 설정파일이라고 생각하시면됩니다.

<br>

```
$ npm install -i express-generator
```

익스프레스를 사용할 것이므로, express의 구조를 자동으로 설정해주는 generator을 설치해줍니다.

설치가 완료되면, express명령어로 구조를 설정합니다.

```
$ express -ejs
```

저는 ejs템플릿엔진을 사용할 것이므로, 해당옵션을 지정해줍니다.

<br>

완료가 되면 bin, public, routes, views폴더가 자동으로 생성이 되는데 module설치는 되지않은 상태입니다.

```
$ npm install
```

package.json파일에 있는 의존성들을 찾아 설치해주는 명령어입니다. 라이브러리를 담은 node_module폴더를 생성합니다.



기본적인 폴더구조 및 라이브러리 설치가 완료되었으므로, 

```
$ npm start
```

로컬 서버를 구동시켜주면 테스트프로젝트 생성 및 서버테스트가 마무리 됩니다.

<br>

### 2. GCP 시작하기

<br>

Google Cloud Platform은 구글에서 제공하는 클라우드 플랫폼서비스입니다.

사용자는 크게 두가지를 이용할 수 있는데, App engine과 Compute Engine입니다.



#### 2.1 App engine

App engine은 코드만 추가하면 자동으로 도메인연결로 진행이됩니다. 사용해본 결과 방법은 매우 간단하지만, 코드를 수정할 때 마다 다시 수정사항을 구글 클라우드에 반영해야하므로, 시간이 오래걸린다는 점이 있습니다. [GCP 앱엔진으로 nodejs 배포하기](https://bcho.tistory.com/1125)

해당 링크에서 vm: true로 되어있는데, env: flex로 변경하시면 됩니다.

engine은 node 버전에 맞게 작성하시면 됩니다.



<br>

#### 2.2 compute engine

Compute Engine은 VM을 제공받아, 해당 VM에서 서버를 구동시키면, 외부IP로 배포가 됩니다.~~외부 IP와 도메인네임을 연결하면 도메인네임으로 접속가능~~

VM에서 해당 프로젝트서버를 구동시켜야하기 때문에 개발환경에 대해 세팅해줘야 합니다. 

예를 들어 현재 진행하고 있는 프로젝트는 nodejs, express, mysql을 사용하고 있는데, 이를 구동시키기 위한 패키지들을 설치하고, VM에서 코딩하거나, 로컬(내컴퓨터)에서 작성한 코드를 git에서 pull한 다음에 코드에서 사용했던 데이터베이스에 대한 계정설정, DB, 테이블 구성까지 완료해야합니다. 즉, 로컬과 동일한 환경을 세팅해주어야하는 과정이 필요합니다. 

<br>

#### 2.3 VM머신 인스턴스생성

<br>

GCP페이지에서 가상머신을 만듭니다.

![인스턴스만들기](https://user-images.githubusercontent.com/55486644/84857179-69d5d280-b0a3-11ea-9001-2653e581bd5a.JPG)

만들기를 누르면 다음과 같은 창이 나옵니다.

![인스턴스 생성창](https://user-images.githubusercontent.com/55486644/84857176-680c0f00-b0a3-11ea-8ddf-8256e35e6d5f.JPG)

먼저, 리전, 영역을 지역에 맞게 설정합니다.

머신 유형은 과금이 적도록 낮은 사양으로 준비합니다. f1-micro로 설정했습니다.

부팅디스크는 우분투 LTS로 설정했습니다.

![인스턴스생성창 2](https://user-images.githubusercontent.com/55486644/84857182-69d5d280-b0a3-11ea-8c7a-a1d8402974b9.JPG)

Id, API엑세스는 모든 cloud API에 대한 전체 액세서 허용을 해주고, HTTP, HTTPS트래픽 허용을 체크합니다.

**만들기**를 누르면 VM인스턴스가 생성이 되고 SSH로 접속할 수 있습니다.

<br>

이제 가상머신에 접속해 개발환경세팅을 진행하고, 서버를 구동시키면 외부에서 접속이 가능합니다.

![SSH접속](https://user-images.githubusercontent.com/55486644/84857311-b3262200-b0a3-11ea-84d0-a11b1b03aa3a.JPG)

해당 버튼을 눌러 SSH에 접속합니다.

다음 링크에 설치방법이 자세하게 설명되어있습니다.

 [nodejs, mysql | SSH 개발환경설치]([https://velog.io/@taelee/gcp-%EC%B2%98%EC%9D%8C%EB%93%A4%EC%96%B4%EA%B0%80%EC%84%9C-%ED%95%B4%EC%95%BC%ED%95%A0%EC%9D%BC](https://velog.io/@taelee/gcp-처음들어가서-해야할일))<br>



서버 구동까지의 일련의 순서는 다음과 같습니다.

1. GCP 계정생성
2. 프로젝트 생성
3. VM 머신 스펙설정
4. VPC네트워크에서 방화벽규칙설정 (VM에서 구동할 포트번호를 방화벽규칙에 설정해주어야 외부에서 접근 가능)
5. VM생성, SSH연결
6. DB구성 및 개발환경 설치 [SSH 개발환경설치]([https://velog.io/@taelee/gcp-%EC%B2%98%EC%9D%8C%EB%93%A4%EC%96%B4%EA%B0%80%EC%84%9C-%ED%95%B4%EC%95%BC%ED%95%A0%EC%9D%BC](https://velog.io/@taelee/gcp-처음들어가서-해야할일)) (현재 위치)
7. 작성된 코드 clone

<br>



SSH내에서 서버를 구동하기 위한 기초 세팅인 6번까지 따라하셨으면, 이제 작성한 코드를 clone받습니다.

clone한 코드를 바로 실행하는 것이 아니라 hostname을 추가해줘야합니다. 이는 아래 참고에 작성했습니다.

그리고 프로젝트의 루트경로에서 사용할 라이브러리를 다운받고, start를 해줍니다.

```
$ sudo npm i
$ sudo npm start
```

에러가 없다면 로컬(SSH)에서 구동이 완료되었고, 외부 IP에서 접속할 수 있습니다.(http로)

<br>

### 3. mysql

<br>

해당 내용은 debian운영체제로 했을 때 발생했던 오류들입니다. ubuntu로 진행하니 해결되었습니다. 참고용입니다.

#### [3.1 mysql 외부접속설정](http://dveamer.github.io/database/RemoteMariaDB.html)

<br>

#### 3.2 mysql 루트 계정이 틀릴 때

<br>

- [비밀번호 없이 mysql에 접속하기](https://stackoverflow.com/questions/1712806/how-to-get-all-privileges-back-to-the-root-user-in-mysql)

```
$ killall mysqld
$ service mysqld stop; mysqld_safe --skip-grant-tables &
$ mysql -u root
```

<br>

#### 3.3 계정생성하기

```mysql
$ create user '계정명'@'호스트네임' identified by '비밀번호';

```

- [mysql 계정 생성 및 삭제 수정](https://gocoder.tistory.com/725)

<br>

#### 3.4 mysql 에러

[The MariaDB server is running with the --skip-grant-tables option so it cannot execute this statement](http://egloos.zum.com/animator/v/7081765)

- create 계정생성이 안되는 에러

- my.cnf파일 내용변경 (해결x)

- ```
  flush privileges; //한 후 실행하니 해결
  ```

  



###  4. 참고

#### 4.1 주의사항

- VM내 사용할 포트가 열렸는지 확인하고 열린상태가 아니라면 open해야합니다.

- ```
  $ iptables -L
  $ iptables -I INPUT -p tcp --dport '포트번호' -j ACCEPT
  ```

   

- 코드 내 포트번호를 process.env.PORT로도 설정해주어야합니다.

- 코드 내 hostname을 GCP내장IP로 선언하고, listen할 때 인자로 받아야합니다.

- 서버 구동을 진행하고, 외부 IP로 접속할 때 SSL 인증발급전이기 때문에 http로 접속해야합니다..!

<br>



#### 4.2 시도했는데 안됐던 사항

- 코드 내 port를 3000번, 8080번으로 수정하고 GCP방화벽 규칙에 추가해두었지만 되지않음





## 참고페이지

[GCP의 APP Engine 배포방법](https://bcho.tistory.com/1125)

[GCP 자체 도움말](https://cloud.google.com/solutions/setup-mysql?hl=ko)

[GCP 초기설정](https://velog.io/@taelee/gcp-처음들어가서-해야할일)

[웹보안](https://m.blog.naver.com/PostView.nhn?blogId=cck223&logNo=221019399455&proxyReferer=https:%2F%2Fwww.google.com%2F)

## 각종에러

[gcloud 설치시 파이썬 오류](https://orcacode.tistory.com/entry/Windows-pip에서-UnicodeDecodeError-해결하는법)

- 2.7버전이 아닌 최신버전으로 설치하여 해결

[mysql 설치오류 no installation candidate](https://cloud.google.com/solutions/setup-mysql?hl=ko) 

- debian환경에서 mysql패키지네임이 존재하지 않아서 ubuntu로 환경 변경

[content-security-policy](https://gobig.tistory.com/entry/Web-Content-Security-Policy-Chrome-오류)

[content-security-policy - 2](https://stackoverflow.com/questions/31211359/refused-to-load-the-script-because-it-violates-the-following-content-security-po)

[content-security-policy - 3](https://stackoverflow.com/questions/45366744/refused-to-load-the-font-datafont-woff-it-violates-the-following-content)

- App engine 배포시, favicon.ico를 로드할 수 없는 문제점이 있었음.프로젝트 초기설정에 문제가 있었던 것으로 파악, 프로젝트 초기설정을 express-generator로 진행하니 해결