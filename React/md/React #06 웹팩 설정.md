## React #06 웹팩 설정

<br>

[참고]([https://velog.io/@padakim/Webpack4-for-React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%9B%B9%ED%8C%A94-1-](https://velog.io/@padakim/Webpack4-for-React-리액트를-위한-웹팩4-1-))

웹 개발은 JS 비중이 매우 크다. 따라서 페이지 로딩시 많은 스크립트를 로드할 경우 http 병목현상이 생길 수 있다.

웹 팩은 많은 JS파일을 하나의 Bundle파일로 만들어서 이런 현상을 없애기 위함이다.

그러나, 모든 파일을 하나로 합치면서 파일의 크기가 커진다. 그렇다면 첫 페이지 로딩시 화면이 늦게 로딩되는 단점이 존재한다.

이를 해소하기 위해 **코드스플리팅**을 적용한다.

<br>

CRA는 이미 웹팩 설정이 되어있다는 것을 참고하자.

<br>

웹팩의 주요 키워드는 Babel, Webpack, Code Splitting, Hot Module Replcaement, 배포설정이다.

<br>

### 프로젝트 환경 설정

<br>

본격적으로 시작하기 전에 디펜던시를 설치한다.

```shell
yarn init -y
yarn add react react-dom react-router-dom
yarn add @babel/core babel-loader @babel/polyfill @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties html-webpack-plugin css-loader style-loader url-loader webpack webpack-cli webpack-dev-server -D
```

각 디펜던시에 대한 설명은 상단 참고페이지에 자세하게 작성되어있다.

크게 리액트, 라우팅기능, DOM메소드, 바벨, 웹팩라이브러리들을 설치한다.



#### Babel 세팅

바벨은 간단하게 자바스크립트 컴파일러라고 공식문서에 기술되어있다. 

위에서 설치한 바벨을 어플리케이션에 적용해보자.

`touch .babelrc` 해당 파일안에 다음 내용을 추가한다.

```
/.babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

<br>

#### Webpack 세팅

웹팩설정을 위해 파일을 생성한다.

`touch webpack.config.js`

내용에 들어갈 옵션 키워드를 보자.

- mode : 개발, 배포모드를 지정
- entry, output : 번들링 과정 시작지점, 번들링파일 저장지정
- module: 번들링의 규칙을 정의
- plugins
- devtool
- devServer

<br>

내용은 다음과 같다.

- mode

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 8080;

module.exports = {
    mode:'development'
  // webpack 설정 코드 작성. 작성된 코드는 module.export로 내보냅니다.
  //development 모드는 개발자 경험에 초점이 맞춰진 모드이며 
  //production모드는 배포에 초점이 맞춰진 모드입니다.
};

```

먼저, 개발용모드인지, 배포모드인지 설정을 해준다.

그리고, 번들링 과정이 시작되는 entry옵션과 번들링 파일을 저장할 장소와 이름을 지정하는 output옵션을 작성해주어야한다.

<br>

- entry, output

```javascript
./webpack.config.js
module.exports= {
	...
  	entry:'./src/index.js',
  	output:{
      path: __dirname + '/dist',
      filename: 'bundle.[hash].js'
    }
}
```

번들링된 파일name을 path ./dist에 저장하라는 의미이다.

[hash]는 컴파일될 때마다, 웹팩에서 생성된 해시로 변경해주어 캐싱에 도움된다.

그리고 번들링과정에서 진행할 규칙을 정하는 module옵션을 지정한다.<br>

- module

```javascript
module.exports = {
  	...
  	module:{
      	rules:[
          { // 첫번째 룰
            test:/\.js$/,
            exclude:/node_modules/,
            use:['babel-loader']
          },
          { // 두번째 룰
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  camelCase: true,
                  sourceMap: true
                }
              }
            ]
          }
        ]
    }
}
```

첫째, JS에 대한 룰은 node_modules을 제외한 모든 js파일에 babel-loader을 적용한다는 규칙이다. 

둘째, JS에서 import, require로 CSS를 가져올 수 있게 하는 css-loader와, .css를 style태그로 변환해 head안에 선언해주는 style-loader을 적용한다.

카멜케이스, css Module, Sourcemaps을 사용한다는 추가 옵션을 작성한다.

옵션을 적용하면, `import { style } from /style/my.css;` 으로 불러와 사용할 수 있다.

해당 부분은 CRA에서 기본으로 있는 웹팩설정과 동일한 것 같다.

<br>

- plugins

웹팩 번들과정에 적용할 플러그인들이다.

```javascript
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ],
};
```

<br>

- devtool

```javascript
module.exports = {
  ...
    //소스맵을 생성해 디버깅을 도와준다.
  devtool: 'inline-source-map',
};
```

<br>

- devServer

```javascript
module.exports = {
  ...
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    historyApiFallback: true
  }
};
```

개발 서버를 정의한다.

호스트네임, 포트번호, 서버실행시 브라우저를 자동으로 열어주는 옵션, 브라우저에서 URL을 변경할 수 있도록 하는 옵션.



<br>

일련의 코드를 작성하고, package.json에서 start스크립트를 `  "start": "webpack-dev-server"`으로 작성해주고 yarn start를 하면 프로젝트가 실행된다.



+ 참고페이지를 보고 작성했으나, Home.js에 react를 import하는 코드와, export하는 부분이 빠져있어서 에러가 발생했었습니다. 하단 링크에 이를 포함한 코드를 작성했습니다.

[소스코드](https://github.com/SeongsangCHO/TIL/tree/master/React/exampleCode/webpack-basic)