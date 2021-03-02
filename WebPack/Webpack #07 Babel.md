# Webpack #07 Babel



---





JS의 ES6는 하위브라우저에서 지원되지 않을 수 있다.

바벨은 웹팩이 JS를 번들로 만들 때 바벨로더를 통해 하위브라우저에서도 돌아갈 수 있도록 es6로 작성된 코드를 es5로 변환해준다.

지원하지않는 것들이 있을 수 있기에 폴리필을 추가해주어야한다.





설치

- `npm i @babel/cli @babel/core @babel/preset-env bable-loader -D`

- `npm i @babel/polyfill -D`
  - app에서 한번만 로드되어야함 `index.js 또는 루트 js`  에서 `import @babel/polyfill`



babel.config.js 작성

```js
module.exports = {
  presets : ["@babel/preset-env"]
}
```





로더 추가

```js
//webpack.common.js
use :[{}...,
     {
      	test: /.js/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      }]
```

