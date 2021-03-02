# Webpack #04 최적화시키기



---



주석과 콘솔을 줄이고 코드의 량(공백)을 줄임.

변수, 함수, 클래스 이름을 알파벳 한 두글자로 치환해버림 (코드 분석 어렵게, 코드량 최소화)

=> 소스코드 압축

이 두가지 기능을 하는 설정을 진행해본다

- Minification : 공백 제거
- mangling : 난독화





### Minification

HTML 최적화

- Html-webpack-plugin에 있는 기능
  - 공식문서에 옵션들이 나열되어 있으므로 확인하면서 사용

```js
plugins:[
  new HtmlWebpackPlugin({
    ...
    minify: {
      collapseWhitespace: true,
      useShortDoctype: true,
      removeScriptTypeAttribute: true,
    }
  }),
],
```

- html파일의 공백제거







CSS 최적화

- 컴프레서 : `cssnano` 를 이용해 적용
- `npm i cssnano`

- `npm i optimize-css-assets-webpack-plugin`
  - cssnano를 웹팩설정으로 사용할 수 있도록 함.

```js
const OptimizeCssAssetsPlugin = requre('optimze-css-assets-webpack-plugin');
plugins:[
  new OptimizeCssAssetPlugin({
    assetNameRegExp: /\.css$/g, //대상 파일명
    cssProcessor: require('cssnano'),//cssnano사용
    cssProcessorPluginOptions:{ 
      preset: ['default', { discardComment: {removeAll : true}}],
      canPrint: true //콘솔메시지 출력
    }
  })
]
```





Js 최적화

- 컴프레서 필요 : 웹팩이 기본적으로 채택한 terser 컴프레서

  - 웹팩 내에 기본적으로 설치됨

  - 이를 사용할 수 있도록 하는 플러그인만 설치 : `npm i terser-webpack-plugin`

```js
const TerserWebpackPlugin = require('terser-webpack-plugin');

optimization:{
  minimize: true, //terser를 이용햐 압축을 하게 함.
  minimizer: [new TerserWebpackPlugin({
    cache: true, //빌드되는 시간 단축
  })],//terser옵션을 사용해서 압축
}
```

