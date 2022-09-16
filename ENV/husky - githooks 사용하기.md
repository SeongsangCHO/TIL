# husky로 git hooks 빠르게 작성하기



### git hooks

> 어떠한 이벤트가 발생했을 때 자동으로 스크립트를 실행할 수 있다.
>
> 예를 들어 commit 마다 lint체크를 하고 싶을 때 `pre-commit` 이라는 hook을 사용해 스크립트를 작성하면 된다.



#### 종류

> [Git hooks의 종류](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks) 중 제가 사용할 것은 다음 두 가지입니다.

- pre-commit : 커밋할 때 가장 먼저 실행 
- prepare-commit-msg : 커밋메시지를 생성 후, 편집기 실행 전 실행 (커밋메시지를 지정하기 이전에 실행됨) - 커밋메시지를 자동으로 수정하고 싶을 때 사용



### husky

git hooks는 이미 레포지토리에 존재합니다. `.git/hooks` 에 스크립트들이 존재하죠. 이를 수정해서 사용해도 되지만 이렇게 수정되는 파일들은 git에 관리되지 않기에 따로 관리해야하는 단점이 존재합니다.

husky는 아예 다른 파일로 분리되어 git으로 관리될 수 있게, 그리고 스크립트만 작성하면 되는 git hooks 패키지입니다.

husky 설치방법과 간단한 사용예제는 [공식문서](https://typicode.github.io/husky/#/)에 존재합니다. 여기서 저는 pre-commit, prepare-commit-msg만을 사용했습니다.

다음은 git hooks을 사용하려는 이유와 그리고 결과로 정리하겠습니다.





### 1. Pre-commit

앞서 얘기했듯 커밋을 할 때 가장 먼저 실행되는 hook으로써 보통 lint 체크를 할 때 사용됩니다.

lint에 통과되지 않았는데 commit이 된다면 당연히 push로 이어질 것이고 에러를 유발할 수 있는 코드가 실제 코드에 붙어버린다면 물론 되돌릴수 있겠지만 디버깅하기 귀찮아지겠지요.

따라서 코드반영 최소단위인 커밋단계에 lint체크를 함으로써 작업사항에 대한 컨벤션깨짐이나 유발할 수 있는 오류를 빠르게 찾을 수 있습니다.



생성된 `./husky/pre-commit `에 `npm run lint` (각자 package.json에 작성한 lint 실행명령)를 작성하고 commit을 하면 내가 작업하지 않은, 앱의 모든 파일을 대상으로 lint를 체크합니다.



내가 수정한 라인이 달랑 한줄임에도 불구하고 모든 파일을 체크하는건 사실 비효율적이겠죠.

따라서 stage된 파일을 대상으로만 lint를 돌리고 싶었고  `lint-staged`라는 패키지를 사용하게 되었습니다. 설치 후 Package.json만 수정하면 되는 사항이라 복잡한 것은 없습니다. [설정방법 참고 (husky, lint-staged를 사용하자( sub : ESLint 자동화하기 ))](https://velog.io/@do_dadu/husky-lint-staged%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%9E%90-sub-ESLint-%EC%9E%90%EB%8F%99%ED%99%94%ED%95%98%EA%B8%B0)

위 링크를 통해 간단한 설정을 마쳤다면, 결과를 확인해봅니다.



![image](https://user-images.githubusercontent.com/93111601/190546449-c97fbd95-9d63-4076-85ac-bc26e91baaec.png)

> lint 체크에 통과하지 못한 모습



![image](https://user-images.githubusercontent.com/93111601/190546576-64091e3a-1d04-4d62-ae58-efb405bf6ff2.png)

> lint 통과



간단한 설정으로 commit당 lint를 돌릴 수 있게 되었습니다. 디버깅하는데 드는 시간을 예방할 수 있겠죠.

lint 체크에 통과하지 못한다면 commit이 취소됩니다. 앞으로 지정한 컨벤션에 맞지 않는 코드가 포함되지 않을 것 입니다.





### 2. prepare-commit-msg

커밋메시지를 저장하기 이전 호출되는 훅입니다.

커밋컨벤션이 존재할 때, 커밋메시지를 자동으로 생성할 때 많이 사용되는 것 같더라구요.

저또한 자동생성을 목적으로 사용했습니다.

현재 Jira를 사용하고 있는데 Jira에서 요구하는 커밋컨벤션이 존재합니다.

Jira에서 github의 브랜치, 커밋을 트래킹할 때 사용되기 때문인데요.

이슈 하나마다 브랜치 이름을 `CSS-이슈번호-이슈제목` 으로 만들어주어야하고, 커밋메시지의 맨 처음은 `CSS-이슈번호`로 시작해야 Jira에서 변경파일 트래킹이 가능해집니다.

Jira기능을 위해서 컨벤션을 맞춰주어야하는 상황이었는데 커밋메시지를 수기로 작성하다보니 맨 앞에 `CSS-이슈번호` 를 잊고 작성하게되면 Jira에서 트래킹이 불가능해 github를 왔다갔다하게 되는 번거로움이 존재하게 됩니다. ~~돈주고 쓰는건데 기능을 다써야죠~~



#### 2.1 스크립트 작성하기

제가 원하는 기능은 다음과 같습니다.

`CSS-123-기능개발하기` 라는 브랜치에서 `CSS-123` 만 똑 띄어내는 것이죠

그러기 위해선 다음 사항들을 해야하는데요.

1. 현재 작업중인 브랜치이름을 알 수 있어야한다.
2. `CSS-123` 만을 떼어내어야한다
3. 현재 커밋메시지에 `CSS-123`을 붙인다.



위 구현이 10줄도 안되서 간단합니다.

##### 1.현재 작업중인 브랜치이름을 알 수 있어야한다.

```sh
git rev-parse --abbrev-ref HEAD
```

- 해당 명령어를 사용하면 됩니다.



##### 2.`CSS-123` 만을 떼어내어야한다

```sh
(^[CSS]{3})-([0-9]*)
```

- 앞의 세글자는 CSS로 시작해야하고, 중간에는 하이픈 그리고 끝에는 0~9 숫자가 오는지 확인하는 정규식을 작성해줍니다.
- 현재 브랜치이름이 해당 정규식 테스트를 통과하는지 판단하여 통과하는 경우에만 커밋메시지를 자동으로 채워주는 스크립트를 작성합니다.



##### 3. 현재 커밋메시지에 CSS-123을 붙인다.

정규식에 통과했다면 맨 앞은 무조건 `CSS-Numer`로 시작하는 브랜치이기 때문에 브랜치이름에서 split을 통해 이슈 넘버만 가져옵니다.

```sh
#branch_name이 CSS-123-기능개발 일때
echo ${BRANCH_NAME} | cut -d '-' -f2
123 # 결과는 123이 나옵니다.
```

얻어낸 123이라는 이슈넘버를 사용해 커밋메시지를 완성하면 끝이납니다.

```sh
echo "${ISSUE_PREFIX}-${issue_number}: $(cat $COMMIT_MSG_FILE)" > $COMMIT_MSG_FILE
```







##### 결과

![image](https://user-images.githubusercontent.com/93111601/190550674-3b13304d-fd76-4c1b-a992-389b6c07a3d7.png)

> 브랜치 이름에 맞춰서 커밋메시지가 잘 작성되는 것을 확인할 수 있었습니다 : )
>
> 스크립트 작성하는 것이 익숙치 않았지만 제가 원하는 기능을 간단하게 구현한 것 같습니다



### 알게된 것

> 스크립트의 정규식 테스트는 다음과 같이 합니다.
>
> ```sh
> if [[ $BRANCH_NAME =~ $prefix_regex ]]
> ```



##### 참고링크

- [commit 메시지에 자동으로 issue number 추가하기](https://myeongjae.kim/blog/2019/02/02/prepare-commit-msg-hook-issue-number)

- [git hooks를 이용하여 commit message에 특정 문자 넣기](