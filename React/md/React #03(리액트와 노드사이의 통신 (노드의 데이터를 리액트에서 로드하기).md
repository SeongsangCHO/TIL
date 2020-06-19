## React #03리액트와 노드사이의 통신 _노드의 데이터를 리액트에서 로드하기



<br>

### 1. 서버의 데이터를 리액트로 로드하기

<br>

서버(노드)에 존재하는 데이터를 리액트의 js파일로 로드하는 방법에 대해서..

#### 1.1 데이터 전달방식

**리액트**와 **노드**사이에 **통신**하려면, 먼저 두개의 포트를 각각 클라이언트사이드, 서버 사이드로 할당하여 동시에 서버구동을 해야한다.

[#02]([https://github.com/SeongsangCHO/TIL/blob/master/React/md/React%20%2302%20(Life%20Cycle%2C%20node%20%2B%20react%20%ED%99%98%EA%B2%BD%EA%B5%AC%EC%B6%95).md](https://github.com/SeongsangCHO/TIL/blob/master/React/md/React %2302 (Life Cycle%2C node %2B react 환경구축).md)의 링크과 글을 함께 참고해서 동시서버구동을 진행해본다.

<br>

서버구동이 완료되었으면  서버에서 어떤 방식으로 클라이언트에 데이터를 응답하는지 알아보자.

서버는 send라는 메소드로 클라이언트에 정보를 전달한다. [참고](https://backback.tistory.com/278)

여기서 정보는 주로 json형태로 이루어져있다.

json이란 무엇일까?

<br>

#### 1.2 json?

자바스크립트에서는 json형태로 데이터를 전송한다.

가볍고, 언어에 종속되지 않고, 데이터핸들링 라이브러리를 제공하기 때문이다.

name-value의 pair로 이루어져있다. 아래 코드에선 {name : 'secho'}를 클라이언트에 json으로 전송하는 것이다.

```js
 res.send('문자열');
 res.send({ name : 'secho'});//json 객체
 res.json(arr or object);//send와 동일, 객체 or 배열 전송시 사용
```

[res.send를 사용해 json데이터를 보내는 방법]([https://www.it-swarm.dev/ko/javascript/js%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-json-%ED%8C%8C%EC%9D%BC%EC%9D%84-express-%EC%84%9C%EB%B2%84%EB%A1%9C-%EB%B3%B4%EB%82%B4%EA%B8%B0/833686194/](https://www.it-swarm.dev/ko/javascript/js를-사용하여-json-파일을-express-서버로-보내기/833686194/))

<br>



서버에서 /api/customers라는 요청을 받으면, json데이터를 응답하는 코드는 다음과 같다.

```javascript
app.get('/api/customers', (req, res) => {
    res.send([
            {
              'id' : 1,
              'image' :'https://placeimg.com/64/64/1'
            }.....
    	]);
});

```

/api/customers에 서버에서 응답(send)한 json이 보여지게 될 것이다.

서버-클라이언트간 통신을 위해서 동시서버를 구동해야하고, 정보는 json형태로 전달된다는 것을 알았다. 그리고 요청받은 URI에 데이터가 응답된다. 

<br>

그렇다면 해당 클라이언트(/api/customers)에 전달된 데이터를 어떻게 React에서 로드할 수 있을까?



#### 1.3 proxy

<br>

현재 서버 사이드에는 json데이터가 존재한다.(port3000:/api/customer)

클라이언트(리액트)에서 서버사이드로 데이터를 요청해야한다.

이 요청을 수행하는 것이 proxy이다. 

그렇다면 이 proxy란 무엇일까

프록시 서버는 가장 간단하게는 클라이언트와 서버의 중개 서버로서 캐싱을 통해 서비스의 성능을 향상 시키는 기능을 가지고 있고, 이외에도 다양한 클라이언트의 아이피 주소를 숨긴다던지, 아니면 실제 서버의 실체를 숨긴 다던지, 아니면 이 프록시 서버를 통해 각종 안좋은 해킹 들도 일어나는 서버라고 한다.[출처]([https://medium.com/@jin3378s/codestates-imersive-7%EA%B8%B0-%EC%88%98%EA%B0%95%EC%83%9D-%EB%B8%94%EB%A1%9C%EA%B9%85-%EC%8B%9C%EC%9E%91-5b1cfd6ef338](https://medium.com/@jin3378s/codestates-imersive-7기-수강생-블로깅-시작-5b1cfd6ef338))

이해한 바로는 이렇다..

이용자에게 요청이 들어오면 먼저 서버사이드에서 데이터를 json형태로 응답하고, 클라이언트에서 해당 데이터를 서버에서 요청받아 클라이언트서버 내부적으로 해당 데이터를 이용하여 컴포넌트를 생성한다음, 이용자에게 view를 보여주는 것이군?

둘의 포트가 다르므로 둘 간의 통신을 이루게 해주는 것이 proxy이고?!~

<br>

그렇다면 리액트에서 서버사이드로의 프록시설정은 어떻게하나요?

=> 리액트의 package.json에 

```json
  "proxy": "http://localhost:포트번호/"
```

을 추가하면 됩니다! ~~엥~~?

다른 방법도 있지만 현재 강의에선 이 방법을 사용합니다.

<br>

해당 강의에서 비동기작업을 진행하는데 **async-await**를 사용합니다..

해당 문법은 [참고](https://joshua1988.github.io/web-development/javascript/js-async-await/)해주세요 ! ~~이따 읽어봐야지~~

<br>

프록시설정도 마쳤다면 App.js에서 데이터를 받는 코드를 작성합니다.

```react
class App extends Component{
	state = {
		customers : ""
	}
componentDidMount(){
	console.log('didMount');
	this.callApi()
		.then(res => this.setState({customers: res}))
		.catch(err => console.log(err));
}
//react -> 해당 URI(node)에 접근해서, json형태(customers)의 값을
//body로 받아온다.
callApi = async() =>{
	console.log('callApi');
	const response = await fetch('/api/customers');
	const body = await response.json();
	return body;
}

render(){...
    	{
this.state.customers ? this.state.customers.map(c => {
return (...) : null} ...};
```

함수설명

- render()가 마무리되고 수행되는 라이프사이클이벤트중 componentDidMount()은 ajax 등의 함수를 주로 사용합니다.  
- 맨 처음 render()에서는 서버에서 값을 불러오기 **전**이므로 해당 state를 먼저 null로 초기화시켜준 다음,  조건부랜더링을 수행합니다. (랜더링에 state를 전달하기때문에 null값으로 초기화하지않으면 컴파일에러가 발생함)
- null값으로 랜더링이되면 componentDidMount()내용을 수행합니다.해당 메소드에서 callApi()를 호출합니다.
- callApi에선 await-async문법으로 해당 uri에서 json으로 데이터를 받아오고, 이를 반환합니다.
- 반환받은 응답을 customers로 setState하고 컴포넌트에서 데이터를 보여줄 수 있습니다.



