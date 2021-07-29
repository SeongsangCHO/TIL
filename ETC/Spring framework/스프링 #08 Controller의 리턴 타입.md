## 스프링 #08 Controller의 리턴 타입



#### void

리턴타입을 void로 할 경우 해당 URL의 경로를 그대로 jsp 파일 이름으로 사용

```java
@GetMapping("/ex05")
public void ex05(){
	log.info("/ex05......");
}
```

![void타입 리턴](https://user-images.githubusercontent.com/55486644/81915467-94002480-960d-11ea-95ac-7bb4a4eb3060.JPG)

#### String

상황에 따라 다른 화면을 보여줄 경우가 있을 때 사용

redirect 또는 forward 키워드를 붙일 수 있다.





---

#### 객체 타입

VO나, DTO타입 등 여러 데이터가 들어간 객체로 지정 가능-> JSON 데이터를 만들어 내는 용도로 사용.





JSON

- JavaScript Object Notation
- 경량의 데이터 교환방식
- 데이터를 표시하는 표현방법(텍스트 형식일뿐임)
- 서버 - 클라이언트 교류간 많이 사용
- 사용하기 위해서 jack-son-databind 라이브러리 추가

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.4</version>
</dependency>

```





@ResponseBody를 통해 View로의 이동없이 데이터만 또는Json 데이터를 웹페이지에 전달할 수 있다. 

```java
	@GetMapping("/ex06")
	public @ResponseBody SampleDTO ex06() {
		log.info("/ex06..........");
		
		SampleDTO dto = new SampleDTO();
		dto.setAge(10);
		dto.setName("성상");
		return (dto);
	}
```

![json 출력](https://user-images.githubusercontent.com/55486644/81916691-1806dc00-960f-11ea-9c10-a4045639f5ba.JPG)



---

#### ResponseEntity 타입

MVC 매핑은 HttpServletRequest, Response를 직접 핸들링 하지 않아도 처리해주기 때문에 HTTP프로토콜 헤더를 다루지 않아도 된다

ResponseEntity를 통해 원하는 헤더 정보 또는 데이터 전달가능



```java
	
	@GetMapping("/ex07")
	public ResponseEntity<String> ex07(){
		log.info("/ex07.........");
		
		String msg = "{\"name\": \"홍길동\"}";
		
		HttpHeaders header = new HttpHeaders();
		header.add("Content-Type", "application/json;charset=UTF-8");
		
		return new ResponseEntity<>(msg, header, HttpStatus.OK);
	}
	
```

![headers보기](https://user-images.githubusercontent.com/55486644/81918011-eabb2d80-9610-11ea-8845-91d7d29bb5ca.JPG)

이렇게 헤더를 확인할 수 있다.

