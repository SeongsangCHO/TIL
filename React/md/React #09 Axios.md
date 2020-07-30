## React #09 Axios



이전에 getInitialProps와 fetch()API를 이용해서 서버의 데이터를 받아오는 작업을 진행했다.

그러나 fetch에는 여러 단점~~체감은 못해봤지만~~이 존재한다고 하여 axios를 통해 서버와의 HTTP통신을 진행하여 원하는 데이터를 받아오는 코드를 작성한다.



<br>

### axios

HTTP 클라이언트 **라이브러리**로 비동기 방식으로 HTTP 데이터 요청을 진행한다.

비동기이기 때문에 이를 처리할 수 있는 async, await를 같이 쓴다.

axios는 내부적으로 XMLHttpRequest를 다루지 않고 AJAX 호출이 가능.



다운로드 및 Load

`npm i axios -g`로 패키지를 다운로드 받는다.

`import axios from 'axios'`로 라이브러리를 import한다.

사용한다.



#### axios 적용하여 서버 데이터 받아오기

예제를 찾아보니 클래스형 컴포넌트가 대부분이었다.

현재 프로젝트는 hooks로 작성되어있어서 이에 맞게 작성해야했다.

함수형과 클래스형 컴포넌트의 차이는 props와 state의 유무지만, hooks에선 이를 지원한다. 바로 useEffect와 useState로 말이다.

생명주기에 따라 원하는 시점에 데이터를 받아올 수 있도록 해보자.



<br>

먼저 구체적인 설계가 없으므로, 업데이트될 때 실행되지 않도록 `useEffect`의 두번째 인자에 빈 배열을 넣어준다.

처음에 만들었던 함수를 작성해보겠다.

```javascript
useEffect(async() =>{
		const result = await axios.get('https://api.yebalja.com/api/json/program'
		,);
		console.log(result.data);
		}
	},[]);
```

async await를 사용하겠다는 것을 알리고, axios를 비동기처리하여 json데이터를 result에 불러오도록 작성했다.

 그러나...!

```
Warning: An effect function must not return anything besides a function, which is used for clean-up.

It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

```



effect함수는 다른 함수를 반환해선 안된다고 한다. effect안에 비동기함수를 따로 작성하고 즉시 호출하도록 하라고 친절하게 알려준다. 따라서 요구사항에 맞게 코드를 변경했다.



```javascript
	useEffect(() =>{
		async function fetchData(){
		const result = await axios.get('https://api.yebalja.com/api/json/program'
		,);
		console.log(result.data);
		}
		fetchData();
	},[]);
```



해당 함수의 결과로 다음을 얻을 수 있었다.

<img width="257" alt="useEffect AXIOS" src="https://user-images.githubusercontent.com/55486644/88366178-6bda3200-cdc3-11ea-91be-45882b3566eb.PNG">

성공적으로 서버데이터를 클라이언트로 불러온 것!

냐호~



[참고예제](https://www.robinwieruch.de/react-hooks-fetch-data)

