## React #05 (함수형컴포넌트 useEffect, useState)



<br>

먼저 Hooks에 대해서 알 필요가 있습니다.

리액트 v16.8부터 도입되었고, 클래스형 컴포넌트에서 제공하는 라이프사이클이벤트, State와 비슷한 기능을 함수형컴포넌트에서도 수행할 수 있게 한 기능입니다.

<br>

[참고](https://velog.io/@velopert/react-hooks)

### 1. useState

<br>

상단 참고페이지에서 가져온 소스코드입니다.

```react
import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b> 입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};
```

useState는 반환값 두개를 갖습니다. 따라서 value, setValue이외의 변수를 더 선언할 수 없습니다.

그럼 반환되는 내용은??

state변수와, 해당 변수를 갱신할 수 있는 **함수**를 반환합니다.

setValue(변수를 갱신할 내용) <= 위의 코드에선 Value+1이므로, 클릭될 때마다 setValue함수가 수행되고 state에 + 1이 수행됩니다.

<br>

### 2. useEffect

<br>

랜더링 될 때마다 특정 작업을 수행할 수 있습니다.

라이프사이클의 혼합형입니다(componentDidMount, DidUpdate) =>컴포넌트 생성 및 갱신때 수행



```react
useEffect(()=>{
        console.log('btn create');
    });
```



해당 코드를 작성하고 리액트 페이지를 새로고침하면 컴포넌트 생성 갯수만큼 콘솔이 호출된다는 것을 알 수 있습니다.

<br>

#### 2.1 마운트 될 때만 실행

컴포넌트에 처음 랜더링될 때만 실행되고 업데이트 할 경우에 실행될 필요가 없을땐, 두번째 파라미터에 빈 배열을 작성합니다.

```react
 useEffect(() => {
    console.log('btn create');
  }, []);
```

<br>

#### 2.2 업데이트 될 때만 실행

업데이트시만 실행되게 하려면 두번째 파라미터에 갱신되는 파라미터를 넣어주면됩니다.

```react
 useEffect(() => {
    console.log('btn create');
  }, [name]);
```

