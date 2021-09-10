# 리액트에서의 전역상태관리 Context API



> context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다. - [공식문서](https://ko.reactjs.org/docs/context.html)
>
> 위의 말처럼 기계적인 props전달 코드를 없앨 수 있는 방법 중 하나다.
>
> 전역데이터를 공유하는 방법이며 로그인 유저, 테마 등의 데이터를 관리한다.



## Context API란

- 전역상태관리의 방법 중 하나이며 redux, react-router, styled-components이 이를 기반으로 구현되어있다.

- React패키지에서 제공하는 기능이다. (써드파티 라이브러리 X)





## Context API 시작 전, 알아야할 것



### 1. Context

객체의 형태이다.

- 전역 데이터를 담는 store라고 생각할 수 있다.

- ```js
  const MyContext = React.createContext(defaultValue);
  ```

  `defaultValue` 는 적절한 Provider짝을 찾지 못할 때 사용되는 value이다.

### 2. Provider

- 컴포넌트를 `Provider`로 감싸주면 그 하위의 모든 컴포넌트들이 Context에 있는 전역 데이터에 접근할 수 있다.
- `value` 속성을 지정해주어야하며 이를 하지 않을 경우 defaultValue가 사용된다.
- value의 값이 바뀔 때마다 `Provider`에 속해있는 컴포넌트들이 모두 렌더링된다.



### 3. Consumer

- Context의 변화를 구독하는 컴포넌트이며, 이를 사용하면 함수형 컴포넌트에서 context를 구독할 수 있다.

- ```js
  //이전에 생성한 MyContext import
  import MyContext from './MyContext';
  
  const child = () => {
    return (
    <MyContext.Consumer>
    	{(data) => {
      return <h1>{data.text}</h1>
  	  }}
    </MyContext.Consumer>
    )
  }
  ```

  등록되어있는 Context를 사용하기 위해선 Consumer로 감싸주어야한다.

  매 컴포넌트마다 전역 데이터에 접근하기 위해서 Consumer로 감싸주어야 하므로 규모가 크지 않다면, 최상단레벨에 묶어주기도 한다.

  그러나 전역데이터를 사용하지 않는 컴포넌트마저도 상태업데이트가 일어나면 랜더가 되기에 유용하지는 않다.



### 4. useContext

매번 Consumer로 감싸주는 것 대신 `useContext` 함수를 사용해 Context를 가져와 데이터를 받아올 수 있다.

```js
import { useContext } from 'react';
//const user = {count: 3}
//<UserContext.Provider value={user}/>로 감싸져있다고 생각
const child = () => {
  const user = useContext(UserContext);
  //여기서 받아온 user는 Provider에서 props로 전달된 value값
  return (
  	<h1>{user.count}</h1>
  )
}
```



### 5. useReducer

useState의 대안이며, 복잡한 state logic을 가지고 있을 때 사용할 수 있다.

초기상태와  action을 가지고 reducer함수를 실행할 dispatch함수를 반환한다.

```js
const initialState = {count : 0};

const reducer = (state, action) =>{
  switch (action.type)
    ...
}

const [state, dispatch] = useReducer(reducer, initialState);
```

dispatch에 action을 전달하면 reducer가 실행되며 해당하는 action.type에 의해 state가 update된다.

한마디로 useState는 state를 update하기 위해선 그저 값만 전달해주었지만, 

useReducer은 state를 update하는 여러 분기(action.type)를 통해 state update를 적절히 의도에 따라해줄 수 있다.





## 예제 코드

> Context API를 이해해보기 위해 직접 예제코드를 작성해보았다.
>
> TMDB의 영화 API를 사용했으며 구현사항은 영화에 대해 봤던 영화를 등록, 취소, 한줄 평 남기기의 기능이다.



### 1. 초기 세팅 -  Context생성 

> 하위 컴포넌트에서 전역 state를 update하기 위해서는 두 가지 방법이 있다.
>
> 1. 하나의 context에 전역 state의 값을 변경해주는 함수를 같이 작성해주는 방법
> 2. 전역state를 update하는 함수만을 갖는 context를 생성하는 방법
>
> 1번, 2번 둘 다 큰 차이는 없으나 1번의 경우 전달되는 전역state안에 state와 메소드가 공존하므로 분리가 필요하다고 생각해 2번의 방식으로 진행했다.

```tsx
export const MovieContext = createContext<IMovieContext | null>(null);
export const MovieDispatchContext = createContext<MovieDispatch | null>(null);

const initState: IMovieContext = {
  movieData: [],
  watchedList: [],
};

const MovieStore: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initState);
  return (
    <MovieContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatch}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieContext.Provider>
  );
};

export function useMovieState() {
  const state = useContext(MovieContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
}

export function useMovieDispatch() {
  const dispatch = useContext(MovieDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
}

```

코드설명

- State, Dispatch라는 2가지 Context를 생성했고 그 이유는 상기 서술된 바와 같다.
- useReducer를 통해 반환된 dispatch를 전역에서도 사용할 수 있도록 Context로 생성했다.
- 따로 작성한 `movieReducer`로 전역 state를 update할 것이다.
- state와 dispatch를 전역으로 사용하기 위해 `Provider`로 묶어주었다.
- `useMovieState, Dispatch` 는 `useContext` 를 사용해 Context를 반환하는 hooks이다.



### 2. useReducer로 등록된 state Update하기 위한 Reducer함수 작성

```tsx
export const movieReducer = (
  state = initState,
  action: Action
): IMovieContext => {
  console.log("reducer", state);

  switch (action.type) {
    case "ADD_MOVIE_DATA":
      return {
        ...state,
        movieData: state.movieData.concat(action.payload),
      };
    case "ADD_WATCHED_DATA":
      return {
        ...state,
        watchedList: state.watchedList.concat(action.payload),
      };
    case "DELETE_WATCHED_DATA":
      return {
        ...state,
        watchedList: state.watchedList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "UPDATE_COMMENT_DATA":
      return {
        ...state,
        watchedList: state.watchedList.map((item) =>
          item.id === action.payload.id ? { ...action.payload } : item
        ),
      };
    default:
      return state;
  }
};

```

 `useReducer` 를 사용하면  전달되는 action의 type에 따라 update될 state를 분기할 수 있어서 복잡한 state로직을 대신할 수 있다.



### 3. 액션생성함수

```tsx
import { IMovieListData, IBookmarkListData, Action } from "../";

export const addMovieData = (data: IMovieListData): Action => {
  return {
    type: "ADD_MOVIE_DATA",
    payload: data,
  };
};

export const addWatchedData = (data: IMovieListData): Action => {
  return {
    type: "ADD_WATCHED_DATA",
    payload: { ...data, comment: "" },
  };
};

export const deleteWatchedData = (id: number): Action => {
  return {
    type: "DELETE_WATCHED_DATA",
    payload: id,
  };
};

export const updateCommentData = (
  data: IMovieListData,
  comment: string
): Action => {
  return {
    type: "UPDATE_COMMENT_DATA",
    payload: { ...data, comment: comment },
  };
};

```

dispatch를 통해 전달되는 action객체를 반환하는 action들이다.

이를 통해 기본적인 세팅이 완료되었다.



이제 Context의 전역 데이터를 사용하고, dispatch하여 상태가 update되기 까지의 flow를 알아보자



### Flow

### 1. Context Provider로 감싸기

```tsx
//index.ts
<MovieStore>
  <App/>
</MovieStore>
```

- 진입점에서 2가지 컨텍스트를 내려주는 `MovieStore` 로 App을 묶어 하위 모든 컴포넌트에서 전역 데이터에 접근할 수 있도록 작성한다.



### 2. useContext로 전역 데이터 가져오기

```tsx
const MovieList: React.FC = () => {
  const { movieData } = useMovieState();
  ...중략
   const loadMoreMovieData = async (page: number) => {
    if (isIntersect) {
      try {
        const data = await getMovieList(`${BASE_URL}/${END_POINT.trending}`, {
          page: page,
        });
        if (!data) {
          loadMoreMovieData(page + 1);
        } else {
          dispatch(addMovieData(data.results));
          setPage(page + 1);
        }
      } catch (error) {
        console.error("error");
      }
    }
  };
  useEffect(() => {
    loadMoreMovieData(page);
  }, [isIntersect]);
   return (
    <Wrapper>
      <List>
        {movieData.length > 0 &&
          movieData.map((data) => (
            <MovieItem movie={data} key={uuidv4()} />
          ))}
      </List>
      <NextNoti ref={intersectRef}>다음보기</NextNoti>
    </Wrapper>
  );
}
```

- `useContext`를 통해 작성한 hooks로 전역 데이터를 비구조화할당하여 하위 컴포넌트에서 값을 가져와 렌더링한다.
- useEffect에서 제일 하위에있는 요소와 겹쳐졌음을 감지하는 `isIntersect` 를 의존성배열에 추가해두어 겹쳐질 때마다 다음 페이지값을 불러와 전역state를 갱신하는 함수인 loadMoreMovieData를 호출한다.
- addMovieData를 통해 생성된 Action객체를 dispatch의 파라미터로 전달해 실행하면 `useReducer`에 등록되었던 `reducer` 함수가 실행되어 해당 Action객체의 type에 따라 state가 갱신된다.





> Consumer라는 방법으로 전역 데이터를 사용할 컴포넌트마다 묶어주어야한다는 번거로움이 존재한다.
>
> 다만, 이를 사용함으로서 불필요한 렌더링을 발생시키지 않는다는 점은 좋다고 생각한다.
>
> action을 담당하는 dispatch Context를 따로 생성함에 있어 조금 번거롭다고 생각되었다.
>
> action, reducer를 제거하고 순수한 값을 변경시키는 함수를 하나의 context에서 관리하는 방식으로 Context, 상태, 상태update 코드만 작성하면 되기 때문에 규모가 작은 프로젝트에서 사용하기 괜찮은 방법인 것 같다.



##### 코드출처

- [직접 만든 예제](https://github.dev/SeongsangCHO/ts-context-api/tree/feature/contextApi)

