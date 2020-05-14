## 스프링 #07 스프링 MVC Controller

스프링 MVC를 이용하는 경우 Controller의 특징

- HttpServletRequest, HttpServeletResponse를 거의 사용할 필요 없이 필요기능 구현
- 다양한 타입 파라미터, 리턴 타입 사용 및 처리
- GET, POST방식 등 처리를 어노테이션으로 가능
- 상속, 인터페이스 방식 대신 어노테이션 만으로 필요한 설정 가능

=> 각 어노테이션의 의미에 대해 주의하며 학습 @

### @Controller, @RequestMapping

- SampleController을 작성해보자

```java
@Controller
@RequestMapping("/sample")
public class SampleController {

}

```

작성된 해당 클래스는 자동으로 스프링의 Bean으로 등록이 된다. 무엇때문에?

servlet-context.xml

```xml
<context:component-scan base-package="org.zerock.controller" />
```

해당 파일에서는 **component-scan**태그를 통해 해당 package내의 클래스들을 조사하면서, Bean설정에 사용되는 **어노테이션**들을 가진 클래스들을 파악하고, 필요시 객체로 생성 및 관리하기 때문이다.

![스프링관리파일](https://user-images.githubusercontent.com/55486644/81806673-c64f4a80-9557-11ea-892e-24157d16cc39.JPG)

스프링이 관리해주는 파일은 옆에 S라고 추가된다.

@RequestMapping

- 현재 클래스내의 모든 메소드들의 기본 URL경로가 된다.
- 클래스선언뿐만아니라 메소드선언에도 사용 가능하다.

```

```

## 에러

```
Log4j에서 import가 제대로 읽히지 않는 에러가 발생했었다.
Log4j관련 설정 하위에 <scope> runtime</scope>를 지워주니 해결되었다.
runtime : 컴파일 시에는 필요하지 않지만 실행시에 사용되는 경우 사용한다. 이 옵션은 런타임, 테스트 시 classpath에 추가 되지만, 컴파일시에는 추가 되지 않는다.
```

