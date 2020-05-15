## 스프링 #11 



#### 패키지들의 name

config : 프로젝트 설정 클래스 보관

controller : controller 보관

service : service 인터페이스, 구현 클래스

domain : VO,DTO 클래스

persistence : Mybatis Mapper 인터페이스

exception : 예외처리 

aop : AOP 관련

security : Security 관련

util : 유틸리티 클래스



#### 요구사항의 정리

고객은 새로운 게시물을 등록할 수 있다.

고객은 특정 게시물을 조회할 수 있다.

고객은 작성한 게시물을 삭제할 수 있다.

=> 게시물의 구조를 판단해 DB 테이블을 설계해야한다.

naming에서 Board관련해서 짓는 것이 좋다.

그에 대한 클래스의 멤버변수들을 설계할 땐 PPT 또는 Mockup 툴을 이용해 작성해본다.

각 화면을 설계할 때, 전체 페이지 흐름을 설계한다.

흐름은 URL로 구성하고 GET/POST방식에 대해 같이 언급해두는 것이 좋다.



이제 예제를 시작한다.

pom.xml설정은 