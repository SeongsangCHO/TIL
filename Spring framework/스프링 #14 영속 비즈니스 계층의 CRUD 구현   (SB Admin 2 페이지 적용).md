## 스프링 #14 영속/ 비즈니스 계층의 CRUD 구현   (SB Admin 2 페이지 적용)



#### SB Admin 2 (디자인 템플릿) 다운로드

http://samara.computer/531_adaptive/startbootstrap-master/startbootstrap-master/sb-admin-v2.php



템플릿을 다운로드하고, 압축해제한 파일의 내용을 webapp/resources에 복사한다. 그리고 해당 템플릿을 적용하기 위해 다음 과정을 진행한다.



 /board/list 페이지가 작동하도록, BoardController.java와, list.jsp를 작성한다.



```java
@Log4j
@Controller
@RequestMapping("/board")
public class BoardController {
	
	@GetMapping("/list")
	public void list() {
		log.info("list......");
	}
}
```



list.jsp는 동작확인을 위해 간단하게 작성한다.



정상적으로 페이지가 동작한다면, SB Admin2의 pages 폴더의 tables.html내용을 list.jsp로 그대로 복사, 수정하고 실행한다.

이때 기존 list.jsp의 상단 지시자는 지우지 않는다.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

```





내용을 복사한 후,  페이지를 실행해보면 페이지가 깨지는 것을 확인할 수 있다. 이는 list.jsp에서 링크한 css파일의 경로가 아직 지정되지 않았기 때문에 발생한다. 해당 에러는 F12개발자도구 -> network -> 새로고침시 확인할 수 있다.

![css,js 경로 에러](https://user-images.githubusercontent.com/55486644/82214984-9c2fcb00-9951-11ea-860b-eade79fa44f7.JPG)



해결법은 jsp파일의 경로를 수정하는 것이다.

```jsp
 <link href="/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="/resources/font-awesome/css/font-awesome.css" rel="stylesheet">

    <!-- Page-Level Plugin CSS - Tables -->
    <link href="/resources/css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">

    <!-- SB Admin CSS - Include with every page -->
    <link href="/resources/css/sb-admin.css" rel="stylesheet">
```

link의 경로의 앞에 현재 css파일이 위치한 resources경로를 추가해주면 해결된다.



그리고나서 서버를 재시작하면 css가 제대로 적용됨을 확인할 수 있다.

----



#### includes 적용



JSP를 작성할 때마다 많은 양의 HTML코드를 피하기 위해 JSP의 includes 지시자를 활용해 사전 작업을 해야한다.



views/includes폴더를 작성하고, header.jsp, footer.jsp를 작성한다.



##### header.jsp 적용

 페이지의 핵심이 아닌, 위쪽 영역 HTML을 처리하기 위해 작성.

![image-20200518215532925](C:\Users\조성상\AppData\Roaming\Typora\typora-user-images\image-20200518215532925.png)



page-wrapper부터가 핵심적인 내용이므로, list.jsp의 

div id='page-wrapper' 까지 잘라서 header.jsp의 내용으로 처리한다.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@include file="../includes/header.jsp" %>
     
	<div id="page-wrapper">
        <!-- 하위를 제외한 상단의 모든내용을 header.jsp에 복사 -->
```



서버를 재시작해 제대로 출력되는지 확인한다.



##### footer.jsp 적용

div id='page-wrapper'이 끝나는 태그 부터 마지막까지, 마찬가지로 footer.jsp로 처리한다.





### jQuery 라이브러리 변경

footer에 jQuery라이브러리가 포함되어 있으므로, header에도 선언을 하면, 작성하는 jsp에서 자유롭게 사용할 수 있음

https://developers.google.com/speed/libraries#jquery 에서 jquery 링크를 추가한다.

header.jsp 하단

```jsp
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```



---



#### 반응형 웹 처리

SB Admin2은 반응형으로 제작되어 있지만, jquery최신 버전 사용상태에서는 새로고침시 메뉴가 펼쳐지는 문제가 발생 **현재까지의 과정을 따라했을때 해당 에러는 발생하지 않음 이전 버전의 SB Admin2에서 발생한 문제 같음**



---



#### 목록 화면 처리

아직 많은 HTML코드가 list.jsp에 존재하므로, 태그를 적용시킨다.

JSTL의 출력, 포맷을 적용하는 태그 라이브러리를 추가한다.

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

```



JSTL

https://mkil.tistory.com/249

- JSP 표준 태그 라이브러리
- 자신만의 태그를 추가할 수 있음
- c:if, c:forEach

- 변수 출력, 저장, 반복문, 조건문 등을 JSP에서 사용할 수 있는 라이브러리



##### Model에 담긴 데이터 출력



### 에러

```
No primary or default constructor found for interface java.util.List
```

```
널포인터 에러
```



기존 코드

```java
@Autowired
	private BoardService service;
@GetMapping("/list")
	public String list(Model model) {
		list = service.getList();
		System.out.println("**Controller getList**");
		log.info("list......");
		model.addAttribute("board", list);
		return "/board/list";
	}
```

기존 코드에 추가

```java
	@Autowired
	private BoardService service;
	//private List<BoardVO> list;
```



- List 생성자에러 https://seongtak-yoon.tistory.com/53
  - 기본 생성자가 없는 모델 객체를 바로 사용해서 발생한 에러이다. 
  - modelAttribute를 사용하기 위해서, JavaBeans 규칙에 맞는 객체여야한다.(getter/setter 등이 있어야함)

![bean 등록](https://user-images.githubusercontent.com/55486644/82228364-fdf93080-9963-11ea-9717-bcef73820ca3.JPG)



~~기존 코드처럼, List<BoardVO>를 주입 받지 않으면 저 빨간 네모표시(좀 더 찾아봐야함)가 나오지 않고, 에러가 있었는데 수정코드를 작성하니 사진과 같이 list가 생기고 에러가 해결되었다.. https://stackoverflow.com/questions/61872809/what-means-red-square-in-spring~~

=> Serivce를 주입받지 않아서 발생한 에러.

- ~~Java Beans 규칙을 따른 주입받은 객체(BoardVO)의 멤버변수이지 않을까~~https://thdghgns.tistory.com/17

  

- BoardController에서 DB에 있는 값을 불러올 때 널포인터 에러발생했다. Controller단에서 Service를 주입받아 사용해야할 것 같아서 @Setter Serivce를 작성했는데 마찬가지로 같은 오류가 발생했다.
  해당 어노테이션을 @Inject, @Autowired로 변경하니 해결됨.

  

**JSP에서 데이터를 계속 불러오지 못한 이슈가 발생했었는데 DB에서 데이터를 추가한 후 COMMIT을 하지 않아서 list가 비어있는 상태였다. 테이블을 삭제한 후 다시 데이터를 추가시키고 난 다음 COMMIT 과정을 수행하니 해결할 수 있었다.**



![image-20200519011427762](C:\Users\조성상\AppData\Roaming\Typora\typora-user-images\image-20200519011427762.png)

최종 결과물



해당 템플릿은 페이징처리를 지원한다. 따라서 이를 제거하고 다시 구현할 예정이다.