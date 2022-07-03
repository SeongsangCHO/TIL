### Emscripten으로 C++코드 JS로 포팅하기(2) - EMSCRIPTEN_BINDINGS

---

> c++로 작성된 라이브러리 코드를 emscripten을 통해 js로 사용할 수 있게 한다.

### docker build script

- `Code/MinimalLib/scripts/build_rdkitjs.sh` 에서 빌드스크립트가  `MinimalLib`의 도커파일을 실행하여 둘 중 아무거나 실행해도 됨
- `DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -o $MINIMALLIB_OUTPUT_PATH . -t 0703:0.1 ./`
  - M1 chip에서 build되지 않은 이슈로 `platform` 옵션으로 지정한 아키텍쳐로 이미지 빌드를 수행할 수 있음
- 이미지 빌드에 거의 1시간가량걸려서 매 수정마다 이미지 빌드를 하면 작업할 수 없음
  - 1. 컨테이너에서 코드 수정 후 emscripten으로 변환파일 생성
    2. 변환파일 로컬로 copy
    3. copy된 파일 테스팅



### C++코드 JS로 래핑하기

> https://github.com/rdkit/rdkit/commit/494c28de18284cc37ba37560cad70ca47fd2c5bd - rdkit에 `add_hs, remove_hs`기능이 추가된 PR

변환된 파일은 3가지다.

- 변환될 대상의 C++함수를 정의한 `minilib.h`
- 정의된 C++함수의 구현체 `minilib.cpp`
- `EMSCRIPTEN_BINDINGS` :  함수, 값, 클래스 등 바인딩될 대상의 블럭을 생성하는데 사용하는 것

여기서  `EMSCRIPTEN_BINDINGS`을 좀 더 알아보자



### EMSCRIPTEN_BINDINGS

> C / C++ 코드를 JS로 노출시키기 위한 블럭이다.\
>
> EMSCRIPTEN_BINDING()은 JS파일이 초기 로드되었을 때 (전역 생성자와 같은 타임에) 수행된다. - JS의 라이프사이클을 따르는 함수라고 이해하면 될 듯함.
>
> 여기서 작성된 것들은  `Module`이라는 Emscriptn 객체에 노출된다.
>
> 예제로 이해해보자

#### EMSCRIPTEN_BINDINGS 함수바인딩 example

```cpp
//emscripten_bindings.cpp
#include <emscripten/bind.h>

using namespace emscripten;

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("lerp", &lerp);
}

```

- ` emcc -lembind -o em_binding.js emscripten_bindings.cpp` 로 js, wasm을 생성한다

```html
//test.html
<!doctype html>
<html>
  <script>
    var Module = {
      onRuntimeInitialized: function() {
        console.log('lerp result: ' + Module.lerp(1, 2, 0.5));
      }
    };
  </script>
  <script src="emscripten_bindings.js"></script>
</html>

```

- C++에서 작성한 `lerp` 함수가 실행되는 것을 확인할 수 있음
- `onRuntimeInitialized` 은 런타임이 준비되었을 때 wasm을 컴파일 하기위해 사용되는  콜백이다.



#### EMSCRIPTEN_BINDINGS 클래스바인딩 example

- 클래스는 더 복잡한 바인딩 상태를 요구한다

```cpp
class MyClass {
public:
  MyClass(int x, std::string y)
    : x(x)
    , y(y)
  {}

  void incrementX() {
    ++x;
  }

  int getX() const { return x; }
  void setX(int x_) { x = x_; }

  static std::string getStringFromInstance(const MyClass& instance) {
    return instance.y;
  }

private:
  int x;
  std::string y;
};

// Binding code
EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<MyClass>("MyClass")
    .constructor<int, std::string>()
    .function("incrementX", &MyClass::incrementX)
    .property("x", &MyClass::getX, &MyClass::setX)
    .class_function("getStringFromInstance", &MyClass::getStringFromInstance)
    ;
}
```

- 해당 예제처럼 메소드, 변수 등을 바인딩시킬 수 있음

- 해당 클래스 메모리 GC를 지원해주지 않기 때문에 `delete()` 가 제공된다.

  - 최근 있었던 `rdkit memory leaks`이슈가 GC지원을 하지 않아서 그랬었다. 
  - 각 rdkit object를 사용하고나서 `delete`를 시켜주어 이슈를 해결했었음

  