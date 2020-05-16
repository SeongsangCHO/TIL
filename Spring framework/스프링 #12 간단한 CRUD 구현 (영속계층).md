## 스프링 #12 간단한 CRUD 구현 (영속계층)

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



### create(insert) 처리

현재 예제는 bno을 PK로 이용하고, 시퀀스를 통해 자동으로 번호가 생성된다. 이럴 때 2가지 방식으로 처리할 수 있다.

1. insert만 처리되고 생성된 PK(bno)를 알 필요 없는경우
2. insert문이 실행되고 PK를 알아야 하는 경우

이를 고려해서 작성한다. (BoardMapper.java)인터페이스

```java
	public void insert(BoardVO board);
	public void insertSelectKey(BoardVO board);
		
```



BoardMapper.xml

```xml
	
	<insert id="insert">
		insert into tbl_board (bno, title, content, writer)
		values (seq_board.nextval, #{title}, #{content}, #{writer})
	</insert>
	

	
	<insert id="insertSelectKey">
		<selectKey keyProperty="bno" order="BEFORE" resultType="long">
			select seq_board.nextval from dual			
		</selectKey>
	
		insert into tbl_board(bno, title, content, writer)
		values(seq_board.nextval, #{title},#{content} ,#{writer})
	</insert>
	
	</mapper
```

insert는 bno의 값을 삽입할 때 nextval을 이용하므로, 값을 알 수 없지만 

SelectKet는 nextval에서 받아온 시퀀스 값을 bno에 저장하기 때문에 출력할 수 있다. 이때 출력되는 값은 시퀀스값(중복X)은 환경마다 다를 수 있다.



#### 테스트 코드

```java

	@Test
	public void testInsert() {
		
		BoardVO board = new BoardVO();
		board.setTitle("새로 작성하는 글");
		board.setContent("새로 작성 내용");
		board.setWriter("newbie");
		
		mapper.insert(board);
		
		log.info(board); // bno가 null로 출력된다.
	}
	
	@Test
	public void testInsertSelectKey() {
		
		BoardVO board = new BoardVO();
		board.setTitle("새로 작성하는 글");
		board.setContent("새로 작성 내용");
		board.setWriter("newbie");
		
		mapper.insertSelectKey(board);
		
		log.info(board); // bno=25가 결과로 나온다. 이는 시퀀스 값으로 환경마다 다른 값이 나옴(중복 없는 값을 위함)
	}
}

```

---



### read(select)처리

인터페이스를 작성한다.

```java
public BoardVO read(long bno);
```



mapper.xml을 작성한다

```xml
<select id="read" resultType="org.zerock.domain.BoardVO">
	select * from tbl_board where bno = #{bno}
	</select>
```



테스트코드를 작성한다.

```java
@Test
public void readTest(){
	BoardVO board = mapper.read(5L);
	log.info(board);
}
```

5번 게시물이 출력되는 것을 볼 수 있다.



### Delete처리

인터페이스를 작성한다.

```java
public int delete(long bno);
```



XML을 작성한다.

```xml
<delete id="delete">
	delete from tbl_board where bno = #{bno}
</delete>
```



테스트코드를 작성한다.

```java
@Test
public void testDelete(){
	log.info("DELETE COUNT: "+ mapper.delete(3L));
}
```

정상적으로 삭제되었으면 다음과 같은 출력문이 나온다.

INFO : org.zerock.persistence.BoardMapperTests - DELETE COUNT: 1

카운트는 몇개의 데이터가 삭제되었는지를 알려준다.



### Update 처리

제목, 내용, 작성자를 수정한다. delete와 마찬가지로,  몇개의 데이터가 수정되었는지 처리할 수 있으므로 int형으로 작성한다.



인터페이스를 작성한다.

```java
public int update(BoardVO board);
```

xml을 작성한다.

```xml
<update id="update">
	update tbl_board
		set title = #{title},
		content = #{content},
		writer = #{writer},
		updatedate = sysdate
		where bno = #{bno}
</update>
```



테스트코드를 작성한다.

```java
@Test
public void testUpdate(){
			BoardVO board = new BoardVO();
		board.setBno(1L);
		board.setTitle("수정된 제목");
		board.setContent("수정된 내용");
		board.setWriter("user01");
		
		int count = mapper.update(board);
		log.info("UPDATE COUNT: " + count);	
}
```



수정이 완료되었으면, COUNT가 갯수에 맞춰 출력된다.

