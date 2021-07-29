## 스프링 #13 비즈니스 계층(Service)





비즈니스 계층은 고객의 요구사항을 반영하는 계층이다.

프레젠테이션 + 영속계층의 중간다리 역할을 한다.

**영속계층은 DB**를 기준으로 설계를 나눠 구현하지만, **비즈니스계층은 로직**을 기준으로 처리한다.



예를들어, 쇼핑몰에서 상품을 구매한 회원에게 포인트를 올려준다라고 하면 영속 계층의 설계는 **상품, 회원**으로 나누어 설계한다.

비즈니스계층은 상품, 회원영역 동시에 로직을 처리하기 때문에 구매서비스라는 로직이 영속계층의 상품,회원처리 객체에 영향을 미치게 된다.



---



#### 비즈니스 계층의 설정

service패키지 하위에 BoardService(인터페이스), BoardServiceImpl(클래스)를 작성한다.

각 계층간의 연결은 인터페이스를 이용해 연결을 한다.



인터페이스를 작성한다.

```java
public interface BoardService {
	
	public void register(BoardVO board);
	
	public BoardVO get(Long bno);
	
	public boolean modify(BoardVO board);
	
	public boolean remove(Long bno);
	
	public List<BoardVO>  getList();

}

```



클래스를 작성한다.

```java
@Service
@Log4j
@AllArgsConstructor //모든 파라미터를 이용하는 생성자 작성
public class BoardServiceImpl implements BoardService{
    
    @Setter(onMethod_ = @Autowired)
	private BoardMapper mapper;
	
	@Override
	public void register(BoardVO board) {
		
	}
//..하위 생략
```

해당 클래스에서 @Service가 가장 중요하다.

@Service는 주로 비즈니스 영역을 담당하는 객체임을 표시하기 위해 사용된다.

BoardServiceImpl 클래스는 정상동작을 위해 mapper객체가 필요하다. Lombok을 이용하면 @Setter어노테이션으로 주입이 가능하고 또는 @Autowired로 직접 설정할 수 있다.



@AllArgsConstructor로 BoardMapper를 주입받는 생성자가 작성된다.(setMapper)

![service 생성자](https://user-images.githubusercontent.com/55486644/82112673-1b72a280-978a-11ea-8cc5-a6fd0acc1aed.JPG)



---

#### 스프링 service 객체 설정

root-context에서, component-scan으로 service패키지를 조사하도록 작성한다.



---

#### 비즈니스 계층 구현과 테스트

BoardMapper, Service, impl 구조 설정이 완료되었으므로, BoardServiceTests 클래스를 작성한다.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class BoardServiceTests {
	
	@Setter(onMethod_ = @Autowired)
	private BoardService service;
	
	@Test
	public void testExist() {
		log.info(service);
		assertNotNull(service);
	}
}

```

객체가 정상적으로 주입됐는지 테스트하는 작업이다.

정상적으로 되었으면 

```
INFO : org.zerock.persistence.BoardServiceTests - org.zerock.service.BoardServiceImpl@34cdeda2
```

로그가 출력됨을 확인할 수 있다.



---

#### 등록작업 구현과 테스트(Register)

서비스의 register 구현한다.

Impl에서 파라미터로 전달되는 boardVO객체를 mapper를 통해 처리한다.

```java
	@Override
	public void register(BoardVO board) {
		log.info("register....."+ board);
		
		mapper.insertSelectKey(board);
	}
```



#### 테스트코드

```java
@Test
public void testRegister() {
	BoardVO board = new BoardVO();
	board.setTitle("새 제목");
	board.setContent("새 내용");
	board.setWriter("새 작성자");
	service.register(board);
	log.info("생성된 게시물의 번호 : " + board.getBno());
		}
```

insertSelectKey를 이용해 나중에 생성된 게시물의 번호를 확인할 수 있다.

---



#### 목록(리스트)작업의 구현과 테스트



BoardServiceImpl.java

```java
@Override
public List<BoardVO> getList() {
		log.info("getList......");
		return (mapper.getList());
	}
```



BoardServiceTests.java

```java
@Test
public void testGetList() {
		service.getList().forEach(board -> log.info(board));
	}
```

---



#### 조회 작업의 구현과 테스트



BoardServiceImpl.java

```java
	@Override
	public BoardVO get(Long bno) {
		log.info("get........" + bno);
		
		return mapper.read(bno);
	}
```



BoardServiceTest.java

```java
	@Test
	public void testGet() {
		log.info(service.get(1L));
	}
```



#### 삭제, 수정 작업의 구현과 테스트



BoardServiceImpl.java

```java
	@Override
	public boolean modify(BoardVO board) {
		log.info("modify........" + board);
		return mapper.update(board) == 1;
	}

	@Override
	public boolean remove(Long bno) {
		log.info("delete........." +  bno);
		return mapper.delete(bno) == 1;
	}
```



BoardServiceTest.java

```java
	@Test
	public void testModify() {
		BoardVO board = new BoardVO();
		board.setBno(2L);
		board.setContent("modify");
		board.setTitle("modifed title");
		board.setWriter("newbieee");
		boolean cnt = service.modify(board);
		log.info("modify........." + cnt);
	}
	
	@Test
	public void testRemove() {
		boolean cnt = service.remove(2L);
		log.info("remove........"+ cnt);
	}
```





