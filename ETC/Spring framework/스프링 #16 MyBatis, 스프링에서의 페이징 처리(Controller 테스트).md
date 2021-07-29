## 스프링 #16 MyBatis, 스프링에서의 페이징 처리



페이징 처리를 위해 필요한 파라미터가 있다.

1. 페이지번호(pageNum)
2. 한 페이지당 몇개의 데이터를 보여줄 것인지.(amount)

예제를 통해 구현해보도록 한다.



domain에 Criteria클래스를 생성하고 작성한다.

```java
@Data
public class Criteria {
	
	private int pageNum;
	private int amount;
	
	public Criteria() {
		this(1, 10);
	}

	public Criteria(int pageNum, int amount) {
		this.pageNum = pageNum;
		this.amount = amount;
	}
}

```



#### MyBatis 처리 및 테스트



mapper패키지의 BoardMapper에 Criteria타입을 파라미터로 사용하는 getListWithPaging()메소드를 작성한다.

그리고 xml에 10~20rn의 값을 갖는 데이터를 가져오도록 작성하고 테스트도 해보자.



```xml
<select id="getListWithPaging" resultType="org.my.domain.BoardVO">
		<![CDATA[
			select bno, title, content, writer, regdate, updatedate
			from (select /*+INDEX_DESC(tbl_board pk_board)*/ rownum rn, bno, title, content, writer, regdate, updatedate
					from tbl_board
					where rownum <= 20)
			where rn > 10
		]]>
</select>
```

![페이징 데이터 출력](https://user-images.githubusercontent.com/55486644/82751969-f61f0d80-9df5-11ea-81b9-200827a4823c.JPG)



10, 20이라는 데이터를 사용하긴 했지만 결국 이 둘은 위에서 언급한 pageNum, amount에의해 조절되는 값이다.

20은 pageNum * amount

10은 (pageNum - 1) * amount. 이제 xml을 해당하는 값에 맞춰 변경해보도록 한다.

```xml
where rownum <= #{pageNum} * #{amount})
		where rn > (#{pageNum} - 1) * #{amount}
```

테스트 코드시 정상동작을 확인할 수 있다.





### BoardController, BoardService 수정

목록을 출력하는 부분을 수정한다.

이에 해당하는 부분은 getList메소드이다. 이는 Controller, Serivce에서 사용하므로 변경하도록 한다.



**BoardController 테스트**

Controller테스트를 위해선 mockito프레임워크를 사용해야한다.

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-all</artifactId>
    <version>1.9.5</version>
    <scope>test</scope>
</dependency
```



MockMvc를 사용하고, root-context에 controller를 스캔할 수 있도록 Component scan을 추가한다.

어노테이션설정은 기본과 동일한데 @Before로 선언된 setUp메소드를 먼저 수행하고 나머지 테스트를 수행한다.



```java
@Setter(onMethod_ = { @Autowired })
	private WebApplicationContext ctx;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
	}

	@Test
	public void testListPaging() throws Exception{
		
		log.info(mockMvc.perform(
				MockMvcRequestBuilders.get("/board/list")
				.param("pageNum", "2")
				.param("amount", "10"))
				.andReturn().getModelAndView().getModelMap());
	}
	
```





![1~10 데이터를 불러온 페이징 준비화면](https://user-images.githubusercontent.com/55486644/82752958-c8899280-9dfc-11ea-9990-1bce9d19a93c.JPG)



1~10까지 데이터를 불러온 화면

