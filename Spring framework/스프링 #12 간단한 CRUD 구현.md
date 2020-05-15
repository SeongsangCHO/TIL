## 스프링 #12 간단한 CRUD 구현

영속계층(CRUD연산을 수행하는 계층)은 데이터 생성/수정/삭제/조회를 수행한다.

여기선 영속계층의 CRUD구현을 다룬다.

---

영속계층의 작업은 항상 아래 순서를 따른다

1. 테이블 칼럼구조를 반영하는 VO(Value Object)클래스 생성
2. mybatis의 Mapper 인터페이스의 작성/XML처리
3. 작성한 Mapper 인터페이스의 테스트



#### VO 클래스 작성

- domain패키지 하위에 BoardVo.java클래스를 생성한다.

```java
@Data
public class BoardVO {
	private Long bno;
	private String title;
	private String content;
	private String writer;
	private Date regdate;
	private Date updateDate;
}
```



#### Mapper 인터페이스, XML

mapper인터페이스를 사용하기 위해선, mapper패키지를 조사해야하므로 root-context에 component-scan을 추가하도록한다.

그리고 Mapper 인터페이스를 작성한다.

```java
public interface BoardMapper {
	@Select("select * from tbl_board where bno > 0")
	public List<BoardVO> getList();
}
```



그리고 테스트코드를 작성한 후 출력문을 보면 정상적으로 연결됨을 확인할 수 있다.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class BoardMapperTests {
	
	@Setter(onMethod_ = @Autowired)
	private BoardMapper mapper;//BoardMapperTest는 BoardMapper인터페이스의 구현체를 주입 받는다.
	
	@Test
	public void testGetList() {
		mapper.getList().forEach(board -> log.info(board));
	}
}

```

![더미데이터 출력 테스트코드](https://user-images.githubusercontent.com/55486644/82014899-85227c00-96b8-11ea-9530-2fc20cacc527.JPG)





확인이 완료되었으면 src/main/resources내에 패키지와 동일한 org/zerock/mapper 단계의 폴더 생성 후 BoardMapper.xml을 작성한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
	PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
	<mapper namespace="org.zerock.mapper.BoardMapper">
	
	<select id="getList" resultType="org.zerock.domain.BoardVO">
	<![CDATA[
	select * from tbl_board where bno > 0 
	]]>
	</select>
	
	</mapper>
```

주의해야할 사항은

- mapper의 namespace는 **Mapper 인터페이스와 동일한 이름**
- select 태그의 id는 **메소드의 이름과 일치**
- resultType은 **select 쿼리의 결과를 특정 클래스의 객체 또는 다른 자료형 타입과 일치**해야한다.

그리고 BoardMapper 인터페이스의 SQL문을 제거하고 다시 실행하면 동일한 결과를 얻을 수 있다.



