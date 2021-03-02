# WebPack #01 기본구조

---



모듈이란 프로그램을 구성하는 코드가 기능별로 나뉜 형태.

모듈화한다는 말은 파일을 나눠서 쪼갠다라고 한다.

- 코드 재사용성 ++
- 코드관리 편해짐
- 모듈화하는 기준이 명확해야함.





모듈로 사용하기 위해선 **모듈 시스템, 모듈을 다루는 키워드가** 있어야한다.



모듈 시스템의 표준으로 CommonJS, ESM가 있다.



### 키워드

내보내기, 가져오기 두가지가 있다.



내보낼 값을 객체에 넣고 전부 보내든지, 하나씩 보내든지 하는 방법이 존재한다.

가져오는 건 모듈 객체를 참조하는 형태로 가져온다.



#### 가져오기 내보내기 예제

CommonJS

- 가져오기 : require(모듈의 경로)를 사용한다.

- 내보내기 : module.exports = {...}
- Exports.키_이름 = 값

```js
//pi.js
const pi = 3.14;
const getArea = r => r * r * pi;

module.exports = {
	pi,
	getArea
}
// 위, 아래 둘 다 같이 사용가능.
exports.pi = pi;
exports.getArea = getArea;

//index.js
const { util } = require('./pi');
const result = getArea(2);
```





ESM

- 가져오기 : import
- 내보내기 : export, export default



```js
//노드환경에서는 npm i esm 설치
//node -r esm 실행파일 로 실행함.

//pi.js
const pi = 3.14;
const getArea = r => r * r * pi;

export {
	pi,
  getArea
}
//default로 하면 import할 때 객체 이름을 받아서 접근해야함
export default {
  pi,
  getArea
}

//index.js
import { getArea } from './pi';
import util from './pi'; // default로 접근시
const result = getArea(2);
const result = util.getArea(2) // default로 접근시
```

