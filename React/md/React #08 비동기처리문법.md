## React #08 비동기처리문법



JS에서 비동기 처리를 진행합니다.

서버에 데이터요청을 했는데, 언제 완료될지도 모르고 기다릴 수 없기 때문에 나머지 코드를 먼저 실행하는 것이 비동기 처리입니다.

<br>

setTimeout으로 생각대로 코드 호출이 되지 않는 것을 알 수 있었습니다.

이를 해결하는 방법은 콜백함수를 사용하는 것입니다.

[참고](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

<br>

### Promise

JS 비동기 처리에 사용되는 객체.

데이터를 받아오기 전에 다 받은 것 처럼 화면에 표시하려고 하면 오류 또는 빈화면이 생기는 등의 문제점을 해결하기 위한 방법



#### 3가지 상태

- Pending (대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfiled (이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected (실패) : 비동기 처리가 실패, 오류가 발생한 상태



대기 상태에서 resolve(), reject()를 호출할 수 있따. resolve를 호출하면, 이행 상태가 되고 then()을 이용해 결과 값을 받을 수 있다.

reject()를 호출하면 실패 상태가 되고, 실패한 오류문을 catch()로 받을 수 있다.

<img width="653" alt="promiseFlowChart" src="https://user-images.githubusercontent.com/55486644/86306298-e691b080-bc4e-11ea-8c95-40bf5f480ce4.PNG">





<br>



### async & await?

JS 비동기 처리 패턴의 문법, 콜백, 프로미스의 단점을 보완.



예제를 봅시다.

```javascript
function logName(){
	var user = fetchUser('localhost:80/user/1');
	if (user.id === 1)
		console.log(user.name);
}
```

fetchUser가 객체를 반환한다고 생각하고, async와 await만 추가하면 됩니다.



```javascript
async function logName(){
	var user = await fetchUser('localhost:80/user/1');
	if (user.id === 1)
		console.log(user.name);
}
```



콜백, promise를 사용한 것 보다 훨씬 간결해지는 것을 확인할 수 있습니다.

*fetch() API는 크롬과 같은 최신 브라우저에만 동작합니다. [브라우저 지원표](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)



[참고](https://joshua1988.github.io/web-development/javascript/js-async-await/)

