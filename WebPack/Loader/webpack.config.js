
module.exports = {
	module: {
    entry: './index.js',
    output: {
      filename: '[name].[hash].js',
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
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './template.html' //해당 파일을 템플릿으로 html을 번들링함
    })
  ],
  mode: 'none' //빌드환경을 구분지을 수 있음.
}