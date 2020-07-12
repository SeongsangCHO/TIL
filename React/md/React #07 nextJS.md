## React #07 nextJS

깃헙링크 예제구현하고 정리하기

<br>

리액트 SPA에서 SSR을 수행할 수 있도록하는 프레임워크인 nextJS에 대해서 정리합니다.

## 목표

- nextJS를 이용해 페이지 구성을 합니다.
- nextJS로 페이지 라우팅을 사용합니다.
- nextJS에서 공용 컴포넌트를 생성합니다.
- express서버와 통신을 수행합니다.

  

<br>

next는 코드스플리팅을 지원합니다.

### 코드스플리팅?

리액트 SPA는 초기 랜더링때 모든 컴포넌트를 내려받습니다. 하지만 규모가 커지면 로딩이 지연될 수 있습니다.

이 점을 보완하여 필요에 따라 파일을 불러올 수 있도록 파일을 분리하는 코드스플리팅을 사용합니다.

nextJS를 사용하지 않고도 코드스플리팅적용은 가능합니다.[참고](https://velog.io/@velopert/react-code-splitting)~~많이 복잡해보인다..~~

SSR, 코드스플리팅을 지원하는 nextJS사용하기 위해서는 정형화된 구조를 따라야하는데, 각 라우트에 해당하는 파일들을 소문자로 pages 디렉토리에 넣어야합니다.

<br>

이제 시작해봐요 같이..

<br>

### 프로젝트 설정 

[참고](https://velopert.com/3293)

nextJS를 위한 설치를 진행합니다.

```shell
mkdir next-project
cd next-project
mkdir pages
yarn init -y
yarn add react react-dom next
```

package.json에 스크립트를 추가합니다.

```
"scripts": {
    "dev":"next",
    "build": "next build",
    "start": "next start"
 }
```

그리고 pages에 첫 페이지를 작성합니다.

```react
pages/index.js
const Index = () => (
    <div>
        <h1>
            안녕하세요 next.JS
        </h1>
    </div>
);

export default Index;
```

react를 import할 필요없습니다.

<br>



### 페이지 라우팅

페이지라우팅하는법도 간단합니다.

Index에서 about로 라우팅하는 코드를 작성해봅니다.

```react
pages/about.js
const About = () => (
    <div>
        <h2>저는 secho 입니다.</h2>
    </div>
)

export default About;

```

```react
pages/index.js
import Link from 'next/link'

const Index = () => (
    <div>
        <h1>
            안녕하세요 next.JS
        </h1>
        <h2>
            <Link href="/about">
            <div style={{background: 'black', color: 'white'}}>소개</div>
            </Link>
        </h2>
    </div>
);

export default Index;
```

Link 컴포넌트안에 **문자열이 아닌 컴포넌트, 엘리먼트**가 들어가야합니다.

스타일링은 className 또는 태그안에서 style로 지정할 수 있습니다.

<br>

### 공용 컴포넌트 생성

components 디렉토리에서 여러 곳에서 공용으로 사용할 수 있는 컴포넌트를 생성합니다.

```react
components/Header.js
import Link from 'next/link';

const linkStyle ={
    marginRight: '1rem'
}

const Header = () => {
    return(
        <div>
            <Link href="/"><a style={linkStyle}>홈</a></Link>
            <Link href="/about"><a style={linkStyle}></a></Link>
        </div>
    )
}

export default Header;
```

해당 컴포넌트를 이제 pages에서 불러올 수 있습니다?

어떻게요? import로 상대경로를 지정해서요!

`import Header from '../components/Header';` 

`<Header/>` <= 사용가능합니다

<br>

그러나 해더 컴포넌트를 매번 불러오지않고 Layout이란 컴포넌트를 만들어서 감싸보겠습니다.

```react
components/Layout.js
import Header from './Header';

const Layout = ({children}) => (
    <div>
        <Header/>
        {children}
    </div>
);

export default Layout;
```

이제 Header컴포넌트 대신 Layout으로 감싸줍니다.

children에 대한 내용은 [여기서 참고](https://codingmania.tistory.com/325)

```react
const Index = () => (
    <Layout>
        ...내용
    </Layout>
);

```

편해졌습니다.

<br>

### 쿼리 파라미터로 라우트하기

쿼리파라미터는  `/search?keyword=something`의 형태입니다.

/search는 라우팅되는 파일입니다.

```react
pages/search.js

import React from 'react';
import Layout from '../components/Layout';

const Search = ({url}) => {
    return (
        <Layout>
            당신이 검색한 키워드는 "{url.query.keyword}" 입니다.
        </Layout>
    );
};

export default Search;
```

이렇게 작성하고, `localhost:3000/search?keyword=세초` 를 입력하게 되면, 

![nextJS query](https://user-images.githubusercontent.com/55486644/85943114-d638b780-b968-11ea-984e-5123335509a3.PNG)

다음과 같은 결과를 얻을 수 있습니다.

그러나.. url이란 프로퍼티는 더이상 지원하지 않는다고 합니다.

withRouter를 사용하라는데.. 더 알아봐야겠습니다.

<br>

```react
import React from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';

const Search = (props) => {
    const {router} = props;
    console.log(router);
    return (
    
        <Layout>
            당신이 검색한 키워드는 "{router.query.keyword}" 입니다

        </Layout>
    );
};

export default withRouter(Search);
```

withRouter를 사용하면 해당 문제가 해결되는데, 아직 이 개념에 대해서 이해하긴 어려운 것 같습니다.

<br>



### getInitialProps

<br>

`getInitialProps` enables [server-side rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) in a page and allows you to do **initial data population**, it means sending the [page](https://nextjs.org/docs/basic-features/pages) with the data already populated from the server. This is especially useful for [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization).

[공식문서](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)를 꼭 읽어보자.

[참고](https://min9nim.github.io/2018/11/nextjs-getInitialProps/)

[next 구동방식 : 알아야 할 것]([https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps](https://velog.io/@cyranocoding/Next-js-구동방식-과-getInitialProps))

[nextJS 초기세팅: 알아야 할 것]([https://velog.io/@hwang-eunji/NEXT.js-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EB%AA%85-2](https://velog.io/@hwang-eunji/NEXT.js-초기세팅-기본-설명-2))

nextJS에서 SSR을 가능하게 하는 것은 getInitialProps에 있습니다.

해당 함수는 서버, 클라이언트중 한군데에서만 실행됩니다.

URL 주소를 이용해 특정 페이지에 접근시 server에서 호출됨.

SPA로 화면 이동시 브라우저환경에서 호출됨.

![getInitialProps](https://user-images.githubusercontent.com/55486644/85945335-118eb280-b978-11ea-859f-4efeb5ecd7bc.gif)

[출처](https://velopert.com/3293)

이를 통해 웹 API에서 데이터를 받아오는 코드를 작성했습니다.

[동영상참고](https://www.youtube.com/watch?v=WzE08kNG4mg)