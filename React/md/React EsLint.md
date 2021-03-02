# React ESLint 설정



---



JS는 브라우저에서 바로 실행되기에 코드분석이 되지 않음

따라서 ESLint같은 도구를 사용해 스타일 규칙의 문제가 있는 코드를 찾는데에 사용할 수 있다.



- Eslint는 문법수정, 포매팅을 위해 사용하고, 프리티어는 포매팅에 특화되어있다고 한다.



### CRA에서 세팅

- VSCode에서 eslint설치
- 프로젝트 최상단에 `.eslintrc.json` 파일 추가 후 다음 내용 추가

```json
{
	"extends" : "react-app"
}
```

