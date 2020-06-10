## node.js #01

<br>

서버사이드 개발에 사용되는 SW플랫폼

자바스크립트를 활용

내장 HTTP가 포함되어, 아파치 등 SW없이 동작 가능.

<br>

node는 단일 쓰레드 비동기방식이다.

<br>

#### 쓰레드 기반 동기방식은?

- 하나의 쓰레드가 요청을 받으면 처리가 완료될 때까지 기다리다가, 결과가 완료되면 다시 응답을 보낸다.
- 기존 업무 처리가 완료될때까지 다른 요청이 있으면 새로운 쓰레드가 업무를 처리한다.
- 동시 요청이 많으면 그만큼 많은 쓰레드가 필요하게되어 서버가 과부하.<br>

#### 단일쓰레드 이벤트루프기반 비동기방식

- 하나의 쓰레드가 요청받으면 바로 다음 처리에 요청을 보내놓고, 다른 작업처리를 하다가 먼저 요청한 작업이 끝나면 이벤트를 받아 응답을 보냄.
- 동시 요청이 오더라도 완료될떄까지 기다리지 않아도 되므로 서버 부하가 적다.

<br>

-- 노드의 장점을 살리는 비동기방식으로 구현하는 것이 좋다.

그러나 어렵다..

<br>

##### 동기와 비동기의 차이를 readFile메소드를 사용해서 알아보자.<br>

```javascript
var fs = require('fs');

//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
```

실행결과  A, sample, C

<br>

동기방식은 순서대로 처리된다는 것을 알 수 있다.

비동기메소드인 readFile은 콜백(function)이 추가되며 반환값이 없다.

readFile에서 파일 읽는 작업이 종료되면, 콜백함수를 호출한다. 두번째 파라미터인 result은 앞에서 읽은 파일의 내용을 받는다.

```javascript
var fs = require('fs');

//readFileSync
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});

console.log('C');
```

실행결과 A C sample<br>

A를 출력하면서, readFile을 호출을 하는데 해당 결과를 반환하기 전에 C가먼저 출력된다.

간단하게 비동기와 동기의 차이를 알아보았다.

<br>

노드의 성능을 끌어올리기 위해서 반드시 비동기적으로 처리하는 것이 중요하다.

<br>

### PM2 설치<br>

node를 통해 만든 실행중인 프로그램을 동작할 때 원하지 않는 순간에 종료될 수 있다. 

PM은 이를 관리하고 파일의 수정사항을 자동으로 프로그램을 재시작 해주기 때문에 기존의 수정, 종료, 재시작이라는 불필요한 행위를 없애준다.<br>

##### bash에서 다음 명령어로 설치가 된다.

```
npm install pm2 -g
```

##### <br>실행방법

```
pm2 start [실행할 js파일] --watch
```

- --watch옵션으로 수정시 자동으로 반영해준다.

```
pm2 monit //현재 실행중인 프로그램을 보여준다
pm2 list // 리스트 형식으로 보여준다.
```

<br>

```
pm2 log
```

- start되는 동안에 발생하는 에러메세지들을 보여준다.

<br>

pm2 start를 통해 js를 관리하고, watch옵션으로 재시작행위없이 해주며 log옵션을 통해 구동되는동안 에러메세지를 볼 수 있도록 해준다.

