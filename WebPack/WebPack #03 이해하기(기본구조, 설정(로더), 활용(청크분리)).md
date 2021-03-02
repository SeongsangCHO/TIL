# WebPack #03 이해하기(기본구조, 설정(로더), 활용(청크분리))



---



웹팩은 모듈 번들러다.





### 1. 기본구조

프로젝트에서 어떤 것들이 필요한지 복붙이 아닌 스스로 추가할 수 있다.



Entry

- 모듈 의존관계를 이해하기 위한 시작지점을 설정
- 참조관계에서 상위에 있는 모듈을 엔트리로 작성해야함.
  - A가 B, C모듈을 참조할 때 A가 엔트리

Output

- 웹팩이 만드는 번들 파일에 대한 정보 설정(이름, 위치 등)





##### 예제

- npm init -y로 초기화한다.

- `npm i webpack webpack-cli --save--dev`

  - cli는 웹팩을 명령어로 실행할 수 있는 패키지.

- `npx webpack` + entry, output에 대한 설정해주어야함

  - src, dist파일을 만들어서 엔트리와 참조하는 파일들을 src에 넣어준다. dist는 번들결과가 생성되는 디렉토리이다.
  - 자동으로 해준다.

  - 웹팩이 어떤 환경에서 돌아가는지 `target`이라는 키로 지정해준다.
    - `npx webpack --target=node`



---

### 2. 설정



웹팩에 대한 설정은 `webpack.config.js`에서 지정할 수 있다.

```js
const path = require('path');

module.exports ={
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js';
  }} => 절대경로로 해야함 node환경에서 path, __dirname으로 작성
  ,
    target: 'node'
}
```





#### Package.json

해당 파일에는 두가지 모듈을 포함한다.

이 둘을 관리하는 [dev]dependencies의 값으로 모듈들을 기록된다.

npm 명령어로 기록된 모듈들을 설치할 수 있다.

dev가 2번째 모듈이다.

- 앱 내부에 직접 포함되는 모듈 `--save`
- 개발과정에 필요한 모듈 `--save-dev` 



#### Loader

다양한 모듈들을 입력받아 처리하는 역할

js파일, json의 모듈은 기본적으로 번들할 수 있지만 다른 파일들은 로더설정을 해야한다.

Test : 모듈을 인식하기 위한 패턴

use : 사용할 로더, 옵션을 설정해 모듈을 처리할 때 어떻게 할지 정함

style(처리하는 css파일별로 css태그를 만든다)과 css로더를 설치해야 사용할 수 있다.

**css-loader**는 css 파일들을 읽어주고 **style-loader**는 읽은 css 파일들을 style 태그로 만들어 head 태그 안에 넣어줍니다

- https://www.zerocho.com/category/Webpack/post/58ac2d6f2e437800181c1657

- `npm i style-loader css-loader --save-dev`
- `npm i normalize.css --save`  http://designbase.co.kr/webcoding-10/ => reset.css도 있다, 브라우저 기본 스타일을 초기화하는 방법이다. import해서 불러오면 초기화가 된다.

```json

module.exports = {
	module: {
    entry: './index.js',
    output: {
      filename: 'bundle.js'
      path : path.resolve(__dirname, 'dist'),
    },
    rules: [{ //로더를 지정하는 부분
      test: /\.css$/i, //로더의 대상이 되는 파일을 정규표현식으로.
      use:[
        // 'style-loader',
        {
          loader: 'style-loader',
          options:{
            injectType: 'singletonStyleTag'
          }
        },
        {
          loader: 'css-loader', //css를 모듈로 사용할 수 있도록 함. import styles from './.css'
          options: {
            modules:true, 
          }
        }
      ]
    }]
	}
}
```

options의 modules를 설정하면 css파일도 모듈로써 사용할 수 있다.





#### Plugin

내부, 외부저장소에서 관리되는 플러그인으로 나눔

웹팩동작의 구체적과정에 개입

번들파일 변환, 프로덕션에서 코드 최적화 등

```
modules.exports = {
	plugins: [new Plugin({...options}...)]
}
```

HTML webpack Plugin

- 번들러를 위한 html파일을 자동으로 만들고 설정
- 외부저장소 플러그인



설치

`npm i html-webpack-plugin -D`





---

### 3. 활용



#### 캐싱

브라우저는 url의 이름을 기준으로 캐싱한다. 요청한 번들파일명이 이전과 같다면 캐싱이 되는데 만약 수정이 되었을 때 문제가 발생할 수 있다.

번들파일은 파일이 번들링 되었을 때마다 뒤에 다른 해싱값이 붙어서 나오므로 겹치는 일이 없어진다.

번들파일에 해싱값을 추가해보자





##### 해시

- 해시 : 빌드될 때마다 부여되는 값
- 빌드될 때마다 다른이름의 파일이 생성되므로 불필요한 것들을 지워줘야함
  - `npm i clean-webpack-plugin -D` : 불필요 파일을 지워주는 플러그인 : 플러그인 추가해야함

```js
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
output: {
      filename: 'bundle.[hash].js'
      path : path.resolve(__dirname, 'dist'),
    },
      
    ...
    plugins: {[
      ...
      ,
      new CleanWebpackPlugin()
      ],
    }
```



##### 

#### 컨텐츠해시

css내용을 html문서 내에 포함시키지 않고 별도로 분리

- css자원은 캐싱될 수 있고 Html자원은 줄어드는 효과가 있음.
- 디폴트로 고정된 이름으로 설정되어있음. => hash추가
- 수정되지 않아도 불필요하게 재생성하게됨
  - 캐싱이 되지 않음
  - css를 위한 컨텐츠 해시를 추가해서 해결 가능

`npm i mini-css-extract-plugin -D`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



use: [
	{
	...//style-loader 주석처리
		loader: MiniCssExtractPlugin.loader,
	}
],
...
plugins:{
	new MiniCssExtractPlugin({
		filename: '[hash].css'//파일이름 해시값 적용
		filename: '[contenthash].css'//컨텐츠 해시 적용

	});
}
```



#### 청크해시

번들파일이 커지면 제공되는 시간이 길어질 수 있음 

그래서 번들파일을 청크(번들이 분리된 형태)파일로 나눈다.



2가지 청크파일 종류가 존재

- 런타임  청크파일 : 런타임환경에서 초기화코드가 있다. 이 초기화코드를 모듈과 분리해 놓은 파일
- 벤더 청크 : 외부패키지에 해당하는 모듈을 의미 (제이쿼리는 버전업을 하지 않는 이상 변하지 않는다), 캐시의 효율을 높일 수 있다.



번들파일 = 번들파일 + 런타임 청크(초기화 코드) + 벤더 청크(외부패키지)



런타임 청크파일로 분리하기

```js
output: {
  //1. output의 파일 네임을 name + chunkhash로 변경
  //name은 웹팩 설정파일, 엔트리파일 이름의 name 값임.
  filename: '[name].[chunkhash].js',
  ...
}
  
  //2. 웹팩의 번들을 최적화시키는 옵티마이제이션
  //런타임 청크 분리 완료
 optimization: {
   runtimeChunk : {
     name : 'runtime',
   },
 }
```



벤더파일 청크 분리

- 예시로 jquery 설치
- `npm i jquery -S`

```js
 optimization: {
   runtimeChunk : {
     name : 'runtime',
   },
   splitChunks: {
   	cacheGroups: {
   		commons: {
   			test: /[//\]node_modules[\\/]/,
   			name : 'venders',
   			chunks: 'all'
   		}
   }
}
```

- jQuery 파일이 벤더파일로 생성되서 캐싱가능해짐

