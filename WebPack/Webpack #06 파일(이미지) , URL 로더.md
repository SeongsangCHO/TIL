# Webpack #06 파일(이미지) , URL 로더

---





### File-loader

파일을 import, require로 모듈로써 읽어들일 수 있게 해주는 로더

- 빌드 될 때 output으로 카피됨

- `npm i file-loader -D`
- 공통 설정파일에서 추가

```js
rules:[
	{
    test: /\.(png|jpe?g|gif)$/i, //정규표현식으로 특정 파일 지칭하도록 설정
    use: [{
      loader: 'file-loader',
      options: {
        name:'[contenthast].[ext]',//ext는 확장자
        publicPath : 'assets/', //빌드 시 assets에 생성되도록 경로 설정
       	outputPath : 'assets/', //dist폴더 내 assets/아웃풋생성
      }
    }]
	}
]
```

설정 후 이제 이미지를 `import` 키워드를 통해 불러올 수 있다.

개발모드일 때 name을 해쉬로하면 확인하기 어려우므로 함수형태로 사용해 분기처리할 수 있음 - file-loader 문서 읽기



```js
options:{
  name(file){
    if (process.env.NODE_ENV === 'DEVELOPMENT'){
      return '[path][name].[ext]';
    }
    return '[contenthash].[ext]';
  }
}
```





### URL Loader

작은 이미지와 같은 리소스들을 문자열로 표현함.

파일로더는 모듈로 파일을 입력받는 반면 이는 파일 입력시 데이터 uri의 문자열 형태로 반환함. => 출력의 결과가 다름

이미지가 base64형태의 문자열로 인코딩되서 나옴

- `npm i -D url-loader`

- `svg` 파일 적용

```js
{
  test: /\.svg$/i,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192, //바이트 크기 단위(파일크기제한)까지만 url로더 적용, 크기가 크면 문자열이 커지므로 적당히 조절
      }
    }]
}
```

- 리소스 요청수를 줄일 수 있다. 문자열형태로 변환되어 문서 안에서 변환되기에 요청이 줄어듦.





### SCSS Loader

- Node-sass, sass-loader설치
- scss (scss-loader)-> css (컴파일) -> css-loader에 의해 번들됨
  - 로더 체이닝이라고 표현
  - **인덱스번호가 큰 순서**에 따라 처리됨. 3=>2=>1
- 글로벌, 로컬 스타일파일을 각각 분기처리되도록
  - filename.module.scss => css modules
  - Filename.scss => global

```js
rules: [{ //로더를 지정하는 부분
  test: /\.s?css$/i,
  oneOf: [ //여러 룰 중 하나의 룰이 동작되도록 조건을 검
    {
      //첫째 룰
      test: /\.modlue\.s?css$/,//module+scss, css감지
      use: [ // 배열형태 => 체이닝 인덱스 큰 순서대로 적용
        {
          //3. css를 외부 파일로 뽑히는 형태로 변환.
	        loader: MiniCssExtractPlugin.lodaer
      	},
      	{
          //2. css => 모듈로 적용
        	loader: 'css-loader',
          options: {
            modules: true
          }
      	},
        {
          //1. sass => css 작업이 일어남
          loader: 'sass-loader',
        }
			]
    },
  {
    //둘째 룰
    use:[
      MiniCss.ExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ]
  }]
 
      
    }]
```





PostCSS

- JS 플러그인을 사용하여 CSS를 변환시키는 툴.
- `autoprefixer` 으로 -webkit- 등 prefix없이 스타일을 지정할 수 있게 도와줌.

- 브라우저마다  prefix가 필요한 css가 있는데 이 플러그인은 그걸 자동으로 붙여줌.

- 브라우저 지원범위를 지정하면 벤더프리픽스 들어감.

  - 브라우저리스트(지원하고자하는 브라우저의 리스트)가 추가되어야함

  - package.json에 추가하도록 권장됨

  - ```json
    "browersList" : [
      "last 2 versions", //최신 + 직전버전 
      "IE 10", // 특정버전
      "Firefox > 20" // 특정브라우저 20이상버전으로 범위지정
    ]
    ```

    

  - 브라우저리스트 깃허브확인.

`postcss.config.js`를 루트경로에 작성

postCss 적용

```js
//postcss.config.js
module.exports = {
  plugins:[
    require('autoprefixer'),
  ]
}
//webpack.common.js

const postcssLoader = {
  lodaer: 'postcss-loader',
  options:{
    config: {
      path: 'postcss.config.js'
    }
  }
}


..testL /\.s?css$/,
  oneOf:[
  {
    ...
  },
    use: [
//      MiniCss.ExtractPlugin.loader,
//      'css-loader',
      postcssLoader,
      'sass-loader',
    ]
]
```





stylelint

스타일 작성 컨벤션 사용할 수 있도록 웹팩설정 진행해볼 것.

깃허브에 표준설정 존재

- `npm i -D stylelint`
- `npm i -D stylelint-webpack-plugin`
- `npm i -D style lint-config-standard`
- `npm i -D style lint-scss`





```js
//webpack.dev.js
const StyleLintPlugin = require('stylelint-webpack-plugin');

...
{
  ...
  plugins:{
    new StyleLintPlugin()
  }
}
//.stylelintrc
{
  "extends": "stylelint-config-standard"
}
```

