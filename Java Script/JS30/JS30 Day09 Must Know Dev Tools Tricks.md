## JS30 Day09 Must Know Dev Tools Tricks



### 디버그

- 속성 우클릭, `break on`에서 중단점을 생성할 수 있음-

- `console.log('%s', string); ` 스트링 출력

- `console.log(${var})` 템플릿 리터럴 사용

- `console.log('%c ', 'font-size:50px');` 스타일 지정가능

- `console.warn('경고 발생');`

- `console.error('에러 발생');`

- `console.info('info 발생');`

- `console.assert(1 === 1, 'wrong');` 테스팅

- `console.dir(elem)` : 요소의 프로퍼티를 출력

- `console.group(var)` .....console.log...`console.groupEnd(var)`  :변수로 그룹지어져서 콘솔을 리스트화할 수 있음

- `console.time('fetching data');` : 요청에 걸린 시간을 측정할 수 있음

  - ```javascript
    console.time('fetching data');
    fetch('https://...')
    	.then(data => data.json())
    	.then(data => {
    		console.timeEnd('fetching data');
    		console.log(data);
    	})
    ```

    -> fetching data .. 160ms..

