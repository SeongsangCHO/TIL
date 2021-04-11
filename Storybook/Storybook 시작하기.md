# Storybook

---



UI 컴포넌트 개발도구.

"isolated"환경에서 앱 외부의 UI 컴포넌트를 개발하고, 디자인하는데 도움을 준다.





### 설치하기

cra로 환경을 세팅하고 다음 명령어로 storybook을 추가한다.



```shell
npx create-react-app "pj_name"

cd pj_name

npx -p @storybook/cli sb init
```

cli로 관리할 수 있어서 앱의 동작을 빠르게 확인 가능.

```shell
# Run the test runner (Jest) in a terminal:
yarn test --watchAll

# Start the component explorer on port 6006:
yarn storybook

# Run the frontend app proper on port 3000:
yarn start
```









### CDD?

storybook 가이드는 Component Driven Development 컴포넌트 기반 개발로 시작된다.

컴포넌트로부터 시작해 bottom up으로 UI를 개발하는 과정.

CDD는 UI를 구축할 때 규모의 복잡성을 해결하는데 도움이 된다.

[CDD 이점](https://velog.io/@yesdoing/%EB%B2%88%EC%97%AD-Component-Driven-Development-udjzqwqgay)







### 구성

Storybook = 컴포넌트 + 그 하위 스토리

각 스토리는 해당 컴포넌트에 대응된다.

A 컴포넌트

- 스토리
- 스토리
- 스토리

A컴포넌트에 따른 여러 스토리를 작성할 수 있다.



Storybook에게 다음 사항들을 전달할 수 있다. 꼭 필요한 부분이다.

```js
export default{
  component: 컴포넌트명,
  title: "Storybook 사이드 컴포넌트제목",
  excludeStories: 스토리를 내보낼 때 랜더링에서 제외되는 것,
  argTypes: 각각 스토리에서 args의 행동 방식을 명시
}
```



#### ArgTypes

컴포넌트에 필요한 인수, 타입을 작성하는 것.

해당 컴포넌트에 label을 붙이거나, 더보기 설명 같은 자잘한 것들을 추가할 수 있다.

```js
  argTypes: {
    label: {
      description: 'overwritten description',
      table: {
        type: { 
            summary: 'something short', 
            detail: 'something really really long' 
        },
      },
      control: {
        type: null,
      },
    },
  },
```

[argTypes 테이블](https://storybook.js.org/docs/react/writing-docs/doc-blocks#argstable)에서 추가할 인자들을 살펴보고 필요한 건 넣자.

control이라는 인자는 `addon`을 사용해서 추가한다 [addon-github](https://github.com/storybookjs/storybook/tree/next/addons/controls)

control은 그래픽 UI로 상호작용할 수 있도록 해주는 addon

설치방법은 다음과 같다. [공식문서](https://storybook.js.org/docs/react/essentials/controls)

```js
npm i -D @storybook/addon-controls

//.storybook/main.js;
module.exports = {
  addons: ['@storybook/addon-controls'],
};
```



backgroundColor 속성에 대한 argType을 선언해 storybook에서 색을 변경하는 등 컨트롤을 할 수 있다.



<img width="967" alt="스크린샷 2021-03-23 오전 12 09 16" src="https://user-images.githubusercontent.com/55486644/112011855-031ea180-8b6c-11eb-97a3-653b37474a2a.png">

