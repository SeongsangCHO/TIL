## 스프링 #06 MVC 구조

스프링 MVC는 스프링의 **SUB** 프로젝트

스프링은 하나의 기능을 위해 만들어진 것이 아닌, 여러 서브프로젝트들을 합친 하나의 코어

- Spring legacy,  Spring MVC로 프로젝트 생성
  - pom.xml내의 자바 버전 변경, lombok, spring-test, JUnit 버전 변경, Maven compiler 버전 변경 

프로젝트의 로딩구조

- 프로젝트 구동 시 관여하는 XML은 web, root-context, servlet-context파일이다. web은 Tomcat 구동관련 설정, 이외 두 파일은 스프링 관련 설정 파일이다.
- 프로젝트의 구동은 web.xml에서부터 시작한다. 가장먼저 Context Listener이 구동된다.

```xml
	<!-- The definition of the Root Spring Container shared by all Servlets and Filters -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>/WEB-INF/spring/root-context.xml</param-value>
	</context-param>
	
	<!-- Creates the Spring Container shared by all Servlets and Filters -->
	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>
```

context-param안에는 root-context의 경로가 설정되어있고, 리스너에는 ContextLoaderListener이 등록되어 있다. 그러므로 해당 리스너는 웹이 구동될 때, 가장 먼저 로그를 기록하면서 구동된다.

이 후  root-context가 처리되면, 해당 파일에 있는 bean설정이 동작한다. bean은 스프링의 context에 생성되고, 객체간 의존성이 처리된다. 이후 DispatcherServlet - 서블릿 관련 설정이 동작한다.

```xml
<!-- Processes application requests -->
	<servlet>
		<servlet-name>appServlet</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>/WEB-INF/spring/appServlet/servlet-context.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>
		
	<servlet-mapping>
		<servlet-name>appServlet</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
```

**Dispatcher Servlet**는 스프링 MVC에서 가장 핵심적인 역할이다.

내부적으로 웹 관련 처리의 준비작업을 servlet-context파일을 사용하며 진행한다.



#### 스프링 MVC의 기본구조

https://tjsdudkim.tistory.com/114 그대로 설명.

1. 클라이언트가 요청을 한다.
2. DispatcherSerlvet가 해당 요청을 받고, 요청을 처리할 컨트롤러를 찾는데(HandlerMapping), 이때 찾기위해 필요한 어노테이션은 개발자가 작성한 @RequestMapping이다.
3. 해당 어노테이션을 찾아, HandlerAdater는 해당 컨트롤러를 동작시킨다.
4. 작성한 로직부분인 컨트롤러를 수행하고, 데이터를 Model에 담아 처리할 View에 전달한다.
5. View를 처리하기위해  ViewResolver를 이용한다.
6. ViewResolver는 어떤 View를 통해 처리할지 해석하는 역할이다.(views/의 어느 jsp)
7. view는 jsp를 통해 응답을 만들어내고, DispatcherServlet을 통해 전송하게 된다.



스프링 MVC를 이용하는 경우에 servlet-context설정을 해야한다

servlet이란?

- 클라이언트의 요청을 처리하고, 다시 클라이언트에게 전송하는 "서블릿" 구현규칙을 지킨 자바 프로그래밍 기술이다.
- 키워드: 서블릿 컨테이너, httpSerlvetRequest, response

Servlet contanier이란? 

- 대표적으로 톰캣이 있으며, 톰캣은 웹 서버와 통신하며, JSP, 서블릿의 작동환경을 제공해준다.

JSP

- Java 코드가 있는 HTML이다.

