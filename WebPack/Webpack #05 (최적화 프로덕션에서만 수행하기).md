# Webpack #05 (최적화 프로덕션에서만 수행하기)



---



개발하는 과정에서는 빌드시간이 길어지면 효율이 떨어지므로, 최적화 관련설정을 프로덕션에서만 할 수 있도록 설정할 것이다.



파일 3개 작성

- 환경설정 부분 담당
- 프로덕션 모드 부분 담당
- 개발 모드 부분 담당



`npm i webpack-merge -D`

`webpack-common.js` 파일 작성

- 공통적으로 사용되는 것만 작성
- 최적화관련 코드 제거(optimization)



`webpack-dev.js` 파일 작성

- mode만 개발로 설정, 

```js
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = {
	mode: 'development',
}

module.exports = merge(common, config)
```





`webpack-prod.js` 파일 작성

- 최적화 관련부분만 config로, 그리고 merge

- mode `production`

```js
const config = {
  plugins: [],
  optimization:{}
  minimize: true,
  minimizer:[]..,
  mode 'production'
}

module.exports = merge(common, config);
```





각 빌드 모드마다 다른 웹팩설정을 이용할 수 있도록 package.json 수정



```json
scripts: {
	dev: "NODE_ENV= DEVELOPMENT webpack --config webpoack.dev.js",
	build : "NODE_ENV= PRODUCTION webpack --config webpack.prod.js"
}
```





Define Plugin

- 현재 빌드모드를 확인

```js
const webpack = require('webpack');

plugins:[
  new webpack.DefinePlugin({
    IS_PRODUCTION: true, //현재 프로덕션 모드
  })
]
```



NODE_ENV 환경변수에 따라서 `webpack.common.js`의 minify값을 제어할 수 있다

```js
const isProduction = process.env.NODE_ENV;

minify : isProduction ? {
	...
} : false,
```







개발모드 관련 설정

- 웹팩은 개발모드를 위한 로컬서버 지원 `webpack dev server`

- 빌드결과가 파일로 쓰이지 않음. dev server상 빌드된 결과물은 메모리상에 있게 됨. 

  - 파일 수정 삭제가 아닌 메모리상에서 수행됨 => 속도가 빠름
  - Cross origin 문제도 확인 가능
  - 파일변화시 다시 빌드를 수행해줌, 라이브로딩 기능 => 개발편의성 ++

- `npm i -D webpack-dev-server`

- 그냥 실행하면 에러발생 => 어떤 웹팩파일을 지정할 건지 설정해주어야함

- `./node_modules/.bin/webpack-dev-server --config webpack.dev.js` => 스크립트 등록

  ```js
  "scripts": {
    "start" : "NODE_ENV=DEVELOPMENT webpack-dev-server --config webpack.dev.js"
  }
  ```

  

- Define Plugin 수정

```js
//webpack.common.js
plugins:[
  new webpack.DefinePlugin({
    IS_PRODUCTION: isProduction, //현재 프로덕션 모드
  })
]
```





historyAPI fallback

라우팅관련 키

제공하지 않는 라우터로 이동시 예외처리

- /hello와 같은 작성하지 않는 곳으로 이동시 원래 404 에러 발생하지만 true로 설정하면 루트 파일을 보여줌
- 개발모드에서 라우터기능 할 때 사용

Dev-server키 추가로 사용가능

```js
//webpack-dev.js
const config = {
	...
  open: true, //기본브라우저 새 탭 오픈
  overlay: true, //에러발생시 브라우저상에 출력
  port: 5000, //포트번호 수정
  historyApiFallback: true,
  historyApiFallback: {
    rewrites:[//특정 경로를 특정 지점으로 이동시킴
      {from: /정규표현식/, to: '이동지점 명시'},      					{from: /./, to: '404.html'},//지정하지 않은 것을 지정할 때.
      {from: /^\/subpage$/, to: 'subpage.html'}
      
    ]
  },//객체로도 옵션 설정


}
```

