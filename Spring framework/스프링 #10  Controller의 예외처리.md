## 스프링 #10  Controller의 예외처리

@ExceptionHandler, @ControllerAdvice를 이용한 처리

@ResponseEntity를 이용하는 예외 메시지 구성

```java
@ControllerAdvice
@Log4j
public class CommonExceptionAdvice{
	
	@ExceptionHandler (Exception.class)
	public String except(Exception ex, Model model) {
		
		log.error("Exception..... "+ ex.getMessage());
		model.addAttribute("exception", ex);
		log.error(model);
		return "error_page";
	}
}
```



@ControllerAdivice는 해당 객체가 스프링의 컨트롤러에서 발생하는 예외를 처리하는 존재임을 명시하는 용도

@ExceptionHandler은 해당 메소드가 ()들어가는 예외타입을 처리한다라는 의미. 즉, Exception.class을 지정했으므로, except()에서 모든 예외가 처리됨.

JSP에서도 에러 메시지를 보고 싶으면, Component-scan 패키지 경로를 추가해준다.



브라우저상에서 에러메세지를 확인하려면, 아래와 같은 코드를 작성한다.

```jsp
<%@ page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" import="java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

	<h4><c:out value="${exception.getMessage() }"></c:out></h4>
	
	<ul>
		<c:forEach items="${exception.getStackTrace() }" var="stack">
			<li> <c:out value="${stack}"></c:out></li>
		</c:forEach>
	</ul>

</body>
</html>
```



예외메시지가 출력되는지 확인하기 위해서, ex04에서 page같은 파라미터를 변환할 수 없는 다른값으로 지정한 후 호출해본다.

![에러메세지 on WEB](https://user-images.githubusercontent.com/55486644/81934268-a5efc080-9629-11ea-8093-6748540d1e42.JPG)





#### 404 에러페이지

500 메시지는 @ExceptionHandler를 이용해 처리하지만, 잘못된 URL을 호출할 때 생기는 404 메시지는 WAS 내부에서 발생하는 에러 처리방식을 따른다.



스프링 MVC의 모든 요청은 DispatcherServlet를 이용해 처리되므로 404에러도 같이 처리할 수 있도록, web.xml을 수정한다.

```xml
		<init-param>
			<param-name>throwExceptionIfNoHandlerFound</param-name>
			<param-value>true</param-value>
		</init-param>
```

<servlet>> 태그안에 상위 내용을 작성하고, CommonExceptionAdvice 클래스에 메소드를 추가한다.

```java
	@ExceptionHandler(NoHandlerFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String handle404(NoHandlerFoundException ex) {
		return "custom404";
	}
```



그리고, custom404.jsp도 작성한다.



엉뚱한 URL로 접근하게되면 평상시 뜨는 에러 페이지가 아닌

![커스텀 에러 404](https://user-images.githubusercontent.com/55486644/81935713-0c75de00-962c-11ea-8ef4-b2d5b5ba8a39.JPG)

작성한 페이지로 출력되는 것을 확인할 수 있다.

