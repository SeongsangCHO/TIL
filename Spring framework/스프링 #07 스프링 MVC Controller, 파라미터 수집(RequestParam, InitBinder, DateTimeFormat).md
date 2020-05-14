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

- method 속성(GET, POST방식으로 구분할 때 사용)
- @GetMapping @PostMapping





## Controller의 파라미터 수집

클라이언트의 요청에 필요한 데이터를 추출하고, VO 또는 DTO로 변환하는 파라미터 수집 작업! 스프링 MVC는 이를 자동으로 처리해줌 ! => RequestParam 어노테이션으로!

매번 request.getParameter()을 사용하지 않아도 됨.

- org.zerock.domain ( SampleDTO.java )생성

```java
@Data
public class SampleDTO {
	private String name;
	private int age;
}

```

- HomeController

```java
@Log4j
@RequestMapping("/sample/*")
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	
	@GetMapping("/ex01")
	public String ex01(SampleDTO dto) {
        dto.setAge(10);
		dto.setName("seongsang");
		log.info("" + dto);
		return "ex01";
	}
```

INFO : org.zerock.controller.HomeController - SampleDTO(name=seongsang, age=10)

배열, 배열리스트, 객체리스트 처리

```java
//배열
@GetMapping("/ex02Array")
	public String ex02Array(@RequestParam("ids") String[] ids) {
		log.info("array ids :" + Arrays.deepToString(ids));
		
		return "ex02Array";
	}
//배열리스트
@GetMapping("/ex02List")
	public String ex02List(@RequestParam("ids")ArrayList<String> ids) {
		log.info("ids" + ids);
		return "ex02List";
	}
```

객체안의 속성이 제대로 수집됨.(자동으로 타입을 변환해 처리한다!)(set하지 않아도 name은 null, age는 0이 기본값)



http://localhost:8090/sample/ex02List?ids=111&ids=222&ids=333 를 브라우저에 요청하면 각 배열원소를 받을 수 있다.

@RequestParam

- Controller 메소드의 파라미터와 웹 요청 파라미터를 매핑하기 위한 어노테이션이다. 웹에서 ids=111을 요청하면, Controller에서 ids를 받아 log에 출력시킨다.

객체리스트

- 객체를 List로 받는 클래스작성

```java
@Data
public class SampleDTOList {
	
	private List<SampleDTO> list;
	
	public SampleDTOList() {
		list = new ArrayList<>();
	}
}
```

sample/ex02Bean?list%5B0%5D.name=aaa&list%5B2%5D.name=bbb

해당 URL호출시 객체는 3개 생성되고, 각 객체에 대한 정보 출력이 됨.



#### @InitBinder

파라미터 수집 = 바인딩

변환가능 데이터는 자동으로 변환되지만 파라미터를 변환해서 처리해야하는 경우가 발생할 수도 있다. 2020-05-14라는 문자열을 Date타입으로 변환하는 작업이 그 예이다.

위의 예시는 @InitBinder을 이용해 처리할 수 있다.



예를 살펴보자

먼저, TodoDTO 클래스를 작성한다.

```java
@Data
public class TodoDTO {
	private String title;
	private Date dueData;
}
```

이를 처리할 initBinder을 이용하는 메소드 작성한다

```java
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(java.util.Date.class, new CustomDateEditor(dateFormat, false));
	}
	
	@GetMapping("/ex03")
	public String ex03(TodoDTO todo) {
		log.info("todo: " + todo);
		return "ex03";
	}
```

http://localhost:8090/sample/ex03?title=test&dueData=2020-05-12 ->![initBinder](https://user-images.githubusercontent.com/55486644/81880523-aefc7580-95c8-11ea-9e35-4de9152b6997.JPG)

또는, @DateTimeFormat을 이용해 변환할 수 있다. 해당 경우엔 @InitBinder이 필요 없다. 형식만 맞으면 변환된다.

```java
@Data
public class TodoDTO {
	private String title;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dueData;
}

```



## 에러

```
Log4j에서 import가 제대로 읽히지 않는 에러가 발생했었다.
Log4j관련 설정 하위에 <scope> runtime</scope>를 지워주니 해결되었다.
runtime : 컴파일 시에는 필요하지 않지만 실행시에 사용되는 경우 사용한다. 이 옵션은 런타임, 테스트 시 classpath에 추가 되지만, 컴파일시에는 추가 되지 않는다.
```

