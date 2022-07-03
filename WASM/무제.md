### Emscripten으로 C++코드 JS로 포팅하기(1)

---

> Emscripten은 C 또는 C++, LLVM을 사용하는 다른 언어로 작성된 프로젝트들을 브라우저, 노드 또는 WASM 런타임에서 사용할 수 있도록 하는 컴파일러다
>
> C, C++ -> JS로 변환시키는 툴

### 0. LLVM ?

- Swift를 개발한 사람(크리스 래트너)이 시작한 프로젝트
- 오픈소스 컴파일러, 툴체인

![스크린샷 2022-06-19 오후 2.32.59](/Users/secho/Library/Application Support/typora-user-images/스크린샷 2022-06-19 오후 2.32.59.png)

- C, C++ 등 언어를 중간번역해서 여러 아키텍쳐에서 수행될 수 있도록 하는 컴파일러



### 1. 이해하기

emscripten은 웹어셈블리를 생성할 수 있다.(이걸 하기위한 포스팅이기도함) 

- 웹어셈블리는 3D, 게임 등 브라우저 런타임 성능으로는 무리가 있는 것들을 브라우저에 넣기 위한 기술이다.

웹 어셈블리는 [3가지 방법](https://developer.mozilla.org/ko/docs/WebAssembly/Concepts#%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EB%A5%BC_%EC%8D%A8%EB%B3%B4%EA%B3%A0_%EC%8B%B6%EC%9D%80%EB%8D%B0_%EC%96%B4%EB%96%BB%EA%B2%8C_%EC%8B%9C%EC%9E%91%ED%95%B4%EC%95%BC%ED%95%98%EB%82%98%EC%9A%94)으로 개발할 수 있는데, 그중 하나가 emscripten으로 c, c++코드를 포팅하는 것이다.

![스크린샷 2022-06-19 오후 2.47.25](/Users/secho/Library/Application Support/typora-user-images/스크린샷 2022-06-19 오후 2.47.25.png)

- Emscripten은 C/ C++ 코드를 `wams`파일로 컴파일 한다
- wasm자체로는 DOM에 접근할 수 없어서 emscripten이 HTML와 wasm을 이어붙이는 JS glue 코드를 생성해준다.
- [C/ C++모듈을 Wasm로 컴파일해보기](https://developer.mozilla.org/ko/docs/WebAssembly/C_to_wasm)



### 2. 성능

- 네이티브 코드보다 20% 느리다.

- js에 비해 2~3배 빠르다
- 브라우저가 js파일 -> AST -> Byte code로 변환과정이 있어야하는데 `wasm` 은 이미 Byte code형태여서 해석만 하면 됨
- js는 컴파일과정을 거치는데 `wasm`은 이밎 `LLVM` 컴파일러를 사용해 최적화가 되어있음
- JS와 같이 자동적인 GC는 제공되지 않는다





### 3. 설치

```shell
git clone https://github.com/emscripten-core/emsdk.git
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
emcc -v // 버전 확인
```



### 4. 예제 작성

```c
// hello.c
#include <stdio.h>

int main() {
  printf("hello, world!\n");
  return 0;
}
```

-  `emcc hello.c` 로 `a.out.js, a.out.wasm` 가 떨궈짐
- `node a.out.js`로 해당 코드 실행할 수 있음![스크린샷 2022-07-03 오후 3.23.28](/Users/secho/Library/Application Support/typora-user-images/스크린샷 2022-07-03 오후 3.23.28.png)

- `emcc hello.c -o hello.html` 로 테스팅코드가 들어간 HTML도 생성할 수 있음





