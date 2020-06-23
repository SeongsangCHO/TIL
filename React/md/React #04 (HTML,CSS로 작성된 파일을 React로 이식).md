## React #04 페이지 만들기



5E프로젝트의 시안을 만들면서 정리한 글입니다.

노드는 따로 구축하지 않고 view만을 위한 프로젝트입니다.

<br>

### 1. 환경구축

<br>

React의 CRA를 사용합니다.

```shell
$ npx create-react-app '프로젝트명'
```

초기세팅은 매우 간단합니다. npx명령어를 사용하면 로컬에 설치된 CRA로 프로젝트명의 폴더를 자동으로 만들어줍니다.

폴더 세팅이 완료되면 다음 명령으로 리액트화면을 출력합니다.

```shell
$ npm run start
```



<br>

material-ui를 사용할 것이므로 설치를 해줍니다.

```shell
$ npm install @material-ui/core	
```

설치가 완료되면 미리 제작했던 코드를 리액트로 이식합니다.

<br>

### 2. 기존 파일 리액트로 이식하기.

<br>

기존에 HTML, CSS로 만들었던 내용들을 리액트로 이식합니다.

현재 작성했던 것까지 크게 헤더, 콘텐츠로 나누고 그 하위에 또 컴포넌트를 나눌 것 입니다.

![예비시안](https://user-images.githubusercontent.com/55486644/85351004-a1c69500-b53d-11ea-84df-d63f2ec23d62.PNG)

헤더, 컨텐츠를 중앙의 "컨텐츠"기준으로 나눕니다.

<br>



#### 2.1 헤더 컴포넌트 분리

현재 헤더는 로고, 검색인풋, 검색, 로그인, 회원가입 버튼과

일정을 선택할 수 있는 bar로 구성됩니다.

이 전체를 담는 PageHeader

로고를 갖는 Logo

우측 상단 인풋,버튼들을 담는 RightUpside

그리고 SchduleBar로 구성합니다.

<br>

스케쥴바를 예를 들겠습니다. 나머지들은 비슷한 과정입니다.

다른 데이터를 조정할 필요가 없으므로 간단한 함수형컴포넌트로 구성합니다.

```react
//ScheduleBar.js
import React from 'react';
import '../css/header.css'

function ScheduleBar(){
    return(
        <div className="ScheduleBar">
            <button>부트캠프일정</button>
            <button>해커톤 일정</button>
            <button>컨퍼런스 일정</button>
            <button>감자튀김</button>
            <button>참여자후기</button>
        </div>
    );
}

export default ScheduleBar;
```

+지금 안 사실인데 css를 import해주지 않아도 되네요?..ㅋ

아무튼 요런방법으로 다른 컴포넌트들도 똑같이 구성해줍니다.

![컴포넌트](https://user-images.githubusercontent.com/55486644/85351428-af304f00-b53e-11ea-9cc0-9777acbeb2df.PNG)

버튼도 컴포넌트로 구성하려했는데, 이는 나중에 리팩토링을 통해서 하면될것 같아서 하나만 만들어보았습니다.

컴포넌트를 잘게잘게 쪼갤 수록 좋은 것 같습니다. 이렇게 어디에 종속되지않고 딱 그 UI만 불러올 수 있기 때문인 것 같습니다.

<br>

#### 2.2 CSS X => SCSS

<br>

material-ui를 사용하면서 makeStyles라는 함수를 많이 사용해서 찾아보니까 .. useStyles이란 react Hook이라고 합니다.

함수형 컴포넌트에만 사용할 수 있고 그내용은 SCSS로 작성됩니다. SCSS란 CSS의 전처리문입니다.

따라서 SCSS는 **전처리기** 문으로 코딩하고 CSS로 컴파일 합니다.  ->CSS파일 작성이 필요없고, 해당 컴포넌트에 해당하는 style을 지정해줄 수 있습니다. ..단점은..아직 모르겠습니다.

<br>

버튼을 해당 구문에 맞게 작성해보았습니다.

```react
import React,{useState, useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root:  {
        backgroundColor: 'white',
        color: '#49b3ef',
        border: 0,
        outline: 0,
        cursor: 'pointer',
        '&:hover': {color: 'salmon', },
    },

});

function BtnDefault(props){
    const classes = useStyles();
    const [value] = useState('');

    useEffect(()=>{
        console.log('btn create');
    });

    return(
    <button className={classes.root}>{props.value}</button>
    );
}

export default BtnDefault;
```

classes에 useStyle를 매핑시켜서 해당 멤버를 호출하는 방식으로 CSS를 지정할 수 있습니다. 여러개중에서 **선택**할 수 있는 것입니다~

<br>

엄 저 props랑 useState는 뭔가요? -> 이건 #05에서 정리해보겠습니다.

<br>

