## 스프링 Test코드





#### DataSourceTests

```java
import static org.junit.Assert.fail;

import java.sql.Connection;

import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class DataSourceTests {
	
	@Setter(onMethod_ = {@Autowired})
	private DataSource dataSource;
	@Test
	public void testConnection() {
		try (Connection con = dataSource.getConnection())
		{
			log.info(con);
		}
		catch(Exception e) {
			fail(e.getMessage());
		}
	}
}

```



----

#### JDBCTests

```java
import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

import lombok.extern.log4j.Log4j;

@Log4j
public class JDBCTests {

	static {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testConnection() {
		try(Connection con = 
				DriverManager.getConnection(
						"jdbc:oracle:thin:@localhost:1521:XE",
						"book_ex",
						"book_ex")){
			log.info(con);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```



---

####  Mapper 테스트

```java

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.zerock.mapper.TimeMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class TimeMapperTests {

	@Setter(onMethod_ = @Autowired)
	private TimeMapper timeMapper;
	
	@Test
	public void testGetTime() {
		log.info(timeMapper.getClass().getName());
		log.info(timeMapper.getTime());
	}
	
	@Test
	public void testGetTime2() {
		log.info("getTime2");
		log.info(timeMapper.getTime2());
	}
}

```



### CRUD Test

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
	
	@Test
	public void testRead() {
		BoardVO board = mapper.read(5L);
		
		log.info("read Test : "+ board);
	}
	
	@Test
	public void testDelete() {
		log.info("DELETE COUNT: "+ mapper.delete(3L));
	}
	
	@Test
	public void testUpdate() {
		BoardVO board = new BoardVO();
		board.setBno(1L);
		board.setTitle("수정된 제목");
		board.setContent("수정된 내용");
		board.setWriter("user01");
		
		int count = mapper.update(board);
		log.info("UPDATE COUNT: " + count);	
	}
}

```

