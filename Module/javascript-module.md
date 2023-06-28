# 모듈

> 스크립트 기능과 양이 복잡해지자 모듈단위로 분리하는 방법이 필요해짐.
> 그 중하나로 **CommonJS**가 있음.
> 모듈은 단지 파일 하나에 불과함. 1스크립트 === 1모듈
> js에서 모듈은 표준이 없어서 AMD니 commonjs니 등등 있었는데 ESM이 표준이 되었다.

## commonjs (CJS)
Node.js용 js코드를 패키징하는 original 방식. 모듈을 동기적으로 로드, 내보내기 위해 `require`, `module.exports` 키워드 제공
동기방식이므로 모듈이 완전로드되기 전까지 코드실행이 차단됨
초기부터 사용되었기에 esm방식대신 대부분 node기반 라이브러리는 이 방식을 사용하고 있다. (ESM의 확대로 앞으로 점차 줄어갈듯)
모듈은 [module-wrapper](https://nodejs.org/api/modules.html#the-module-wrapper)이라는 함수로 감싸져서 실행되는데, 다음과 같은 기능을 수행한다.
- 전역객체가 아닌, 모듈로 변수의 스코프를 유지한다.
  - 모듈간 변수충돌, 스코프오염을 방지하며 모듈을 정의하기 위함

```js
//node의 cjs는 실제 코드가 써있진 않지만, 다음과 같이 모듈래퍼가 함수를 감싸며 실행된다.
(function (exports, require, module, __filename, __dirname) {
  // 실제 작성한 코드부분
  module.exports = {
    greet: function(name) {
      console.log('Hello, ' + name + '!');
    }
  };
  console.log(__dirname); // 에러가 발생하지 않는다
  // 실제 작성한 코드부분  
});
```

제공하는 것
- `__filename` :파일 절대경로 (파일포함) eg) /usr/test/a.js
- `__dirname` : 현재 파일 위치 디렉토리 절대경로 (디렉토리까지) eg) /usr/test
- node에서 `const filePath = __dirname + '/data.txt'; 이렇게 쓸 때 dirname이 모듈래퍼에서 제공하는 것이었다..

// todo
- [ ] CJS는 동기방식인데, 이를 해결하는 방법에 대해 알아보기
- [ ] AMD, CJS에 대한 차이
- [ ] ESM은 비동기인데, CJS - ESM에 대한 비교
- [ ] 위에 대한 내용은 거의 nodejs.org에 나와있음





# ESM (MJS)
ESM은 EcmaScript Module의 약자로, ES6에서 표준으로 정의한 모듈방식이다.
- 비동기방식으로 모듈을 로드한다. (동기방식은 CJS)
- `import`, `export` 키워드를 제공한다.
- 브라우저에서도 사용가능하다. (CJS는 브라우저에서 사용불가)
- 웹팩같은 번들링도구가 트리쉐이킹 등 최적화를 해주는 반면 CJS는 그렇지 않다.


## 모듈의 기능
- 모듈은 항상 [엄격모드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)로 실행됨. 에러유발코드가 있으면 에러를 뱉음.


- 자신만의 독립적인 scope를 가지고 있음 eg)A.js에서 B.js에 있는 import없이 변수를 호출할 수 없음

- 최초 호출시 단 한번만 평가됨.

```ts
//root.js
import { user } from "./user.js"
user.name = "CSS";

//child.js
import { user } from "./user.js"
console.log(user.name); // CSS

```

- 모듈 최상위 레벨의 this는 undefined다.

- `type="module"` script는 항상 지연실행(defer)되므로 페이지 로드가 완전히 된 이후 실행된다.
  - 실행과 다운은 별개임. 다운은 동시에,여러파일이 병렬로 진행되지만 실행은 페이지로드 이후에, 순차적으로 진행된다.
- `async`를 붙이면 페이지로드를 기다리지 않고 다운이 완료되면 바로 실행된다.

## import, export 더 알아보기

> `export`는 모듈에서 내보내는 것을 의미한다. `import`는 모듈에서 가져오는 것을 의미한다.

### export
- 클래스, 함수를 export할 때 **; (세미콜론)을 붙이지 않는다** - 스타일가이드이므로 앞으로 신경쓸 것.
- `export { hi }` (named export)
- `export { hi as sayHi }` 이름 변경하여 export할 수 있다. (named export)

- `export default`
  - 해당 모듈엔 내보낼 개체가 하나가 있다는 것을 명시적으로 나타낼 수 있다.

- `export { sayHi as default }`
  - named export가 아닌 default로 바꿔서 내보낼 수 있다.

- 다시 내보내기
  - `export { sayHi } from "./say.js"` sayHi를 다시 내보낸다.
    - 외부에 공개할 때, 코드를 노출시키고 싶지 않을 때 헬퍼같은 곳에서 내보내어 내부 구조를 숨길 수 있음.

### import
- `import * as A from "./A.js"` : A.js의 모든 export를 A객체에 담는다.
  - `A.sum`, `A.name` 이런 식으로 가능함.
  - 이 방식을 쓰면 코드가 짧아오지만, 구체적으로 명시하는게 더 좋다.
  - 트리쉐이킹으로 쓰는것만 남기고 지워주는 최적화를 웹팩같은 번들러가 해주긴 하지만 
    구성요소가 뭔지 파악하기 어렵다는 단점이 있으므로 특별한 이유가 없다면, 구체적으로 명시해서 import하자.

- `import { hi as sayHi } from "./say.js"` 처럼 이름을 바꿔서 import할 수 있다.
- `import { default as User, sayHi } from "./user.js"` 로 default 내보낸 것과 named export를 import할 수 있다.


#### 동적 import
- `import` 는 모듈이 내보내는 것을 모두 포함하는 객체를 담은 resolved promise를 반환한다.


다음과 같이 코드 내 어디서든 사용가능하다.
```js
let modulePath = prompt("모듈의 경로를 입력해주세요.");
import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

async await조합으로도 불러올 수 있음
```js
async function say () {
  let say = await import('./say.js');
  say.hi();
  say.bye();
  say.default(); //export default module
}
```


#### 참고
- [모듈](https://ko.javascript.info/modules-intro)
- [모듈_내보내고가져오기](https://ko.javascript.info/import-export)
- [dynamic-imports](https://ko.javascript.info/modules-dynamic-imports)
- [ecma-script-module](https://nodejs.org/api/esm.html#modules-ecmascript-modules)
- [module-wrapper](https://nodejs.org/api/modules.html#the-module-wrapper)