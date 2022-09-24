# MSW



## 설치

```sh
npm install msw --save-dev
npx msw init <로컬환경 public directory> --save
```



## 세팅

> node환경에서 테스트하거나 browser에서 하기 위해서는 다음과 같은 세팅이 필요합니다.
>
> 작성해야하는 파일은 총 4개입니다.
>
> `mock` 하위에 다음의 4파일을 만들어주세요.
>
> - browser.ts
> - server.ts
> - handlers.ts
> - worker.ts
>
> 그리고 App에서 작성한 worker를 호출해오면 세팅이 끝납니다.



### 1. browser.ts

```tsx
import { setupWorker } from "msw";
import handlers from "./handlers"; // mocking될 response를 정의해놓는 곳

export const worker = setupWorker(...handlers);

```

### 2. server.ts

```tsx
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

### 3. worker.ts

```tsx
const isServer = typeof window !== undefined ? false : true;
if (isServer) {
  (async () => {
    const { server } = await import("_mocks/server");
    server.listen();
  })();
} else {
  (async () => {
    const { worker } = await import("_mocks/browser");
    worker.start();
  })();
}
export {};
```

> node, broswer에서 사용할 수 있도록 세팅, 브라우저에서는 Web Worker를 사용해서 req를 가로챈다.

### 4. handlers.ts

```tsx
import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:8080/todos/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: "hello" }));
  }),

  rest.post("/", (req, res, ctx) => res(ctx.json({}))),
];

export default handlers;

```

> mocking할 req들의 응답을 작성해놓는 곳



### _app.tsx

```tsx
if (process.env.NODE_ENV === "development") {
  const MockServer = () => import("_mocks/worker");
  MockServer();
}
```



> 여기까지 작성했으면 세팅은 끝났습니다.

### 결과

![스크린샷 2022-09-20 오후 6 02 39](https://user-images.githubusercontent.com/93111601/191216135-5e5c6c8c-4596-4560-9bb2-0a79755a37e4.png)



> 고민되는 부분은 handlers가 배열형태로 들어가기 때문에 테스트할 API들을 관리할 폴더가 필요한데 , 이 handlers들을 api 요청코드와 같은 폴더내에 위치시킬지 아니면 아예 따로 관리할지인데 사실 테스트하고 이후에는 사용될 가능성이 적으니 따로 관리하는 편이 좋아보이긴 합니다.



### 🧐 MSW 모킹코드가 백엔드 하나 만들어서 해놓는거랑 다를게 없는데 뭐하러 이걸 세팅해서 쓰나요 ?

> 혼자서 작업하는거면 그렇게 해도 되지만 여럿이서 작업하는 상황에서 백엔드 레포를 공유하고, 팀원 모두 백엔드 지식이 부족한 상태에서 이를 작성하기엔 공수가 든다. ~~크진 않겠지만 그것도 공수~~
>
> 모킹을 위해 백엔드레포에 push하는 작업들이 비효율적으로 돌아갈 것으로 생각된다. 한 레포에서 하는게 좋다.
>
> jest나  Cypress에서 사용하는 동일한 handler를 사용할 수 있다. -> api 모킹을 위한 코드가 줄어든다.