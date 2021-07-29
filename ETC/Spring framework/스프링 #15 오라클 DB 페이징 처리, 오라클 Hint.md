## 스프링 #15 오라클 DB 페이징 처리



SQL에서 정렬하기 위해선 'order by'를 이용한다. 하지만 데이터가 많은 경우에서 성능 저하를 가져오기때문에 주의해야한다.

---

#### 실행계획, order by



페이징을 위해 반드시 알아야 할 것 = 실행계획



실행 계획 : SQL을 DB에서 어떻게 처리할 것인가? 라는 계획을 두는 것이다.



DB에 전달된 SQL문은 파싱, 최적화, 실행과정을 거친다.

- 파싱단계: SQL구문 오류파악, SQL 실행 대상객체 존재 검사
- 최적화단계: SQL실행에 필요한 비용(cost)계산 해당 비용으로 어느 방식으로 실행할지 실행 계획을 세운다.
- 실행단계: 세워진 실행 계획으로 작업을 진행한다.

SQL PLUS 등을 이용해 특정 SQL에 대한 실행 계획을 알 수 있다.



![실행 계획](https://user-images.githubusercontent.com/55486644/82750701-d2a39500-9dec-11ea-8581-aa2d0d3c6106.JPG)

sql developer에서 확인한 실행 계획



SQL 튜닝은 이를 확인하고 더 좋은 방식으로 수정하는 것.



#### order by보다 인덱스

인덱스는 정렬되어 있다. = 정렬과정이 필요 없다.

DB에서 PK는 식별자라는 의미도 있지만, 인덱스의 의미를 가진다. 인덱스라는 객체를 만들기 위해 PK를 지정한다.

데이터가 많아지면 정렬작업으로 인해서 시간이 걸린다는 점이 있는데, 이를 해결하기 위한 가장 일반적인 방법은 인덱스를 이용해 정렬을 생략하는 방법이다.



위의 사진의 SQL실행계획에서 주의해서 봐야할 부분은 정렬작업을 했는지, 기본 테이블에 바로 접근하지 않고 PK_BOARD에 접근했는지, BY INDEX ROWID, FULL SCAN인지 보는 것이다.



해당 테이블에서 bno(PK)라는 기준으로 인덱스를 생성한다. 인덱스는 ROWID라는 값을 갖게되는데, 이 값은 DB내의 주소이다.



모든 데이터는 자신만의 주소를 갖고있다. 즉, PK라고 지정된 bno는 순서대로 정렬된 ROWID를 가지고 있다. 인덱스에서 가장 중요한 개념이다. 바로 정렬 되어 있다는 점이다.



---

#### 인덱스와 오라클 힌트(hint)



웹 페이지의 목록은 주로 시간 역순으로 정렬결과를 보여준다.



말 그대로 최신 데이터를 가장 먼저 보여주는 것이다.



예를들어,

이 경우에 개발자는 정렬 안하는 방식으로 select 문을 실행하고 싶다고 한다.

이때 select를 전달할 때 힌트를 사용할 수 있다.

힌트란 DB에 ""내가 전달한 select문을 이렇게 실행해라''라는 것이다. 

힌트는 에러가 나도 SQL에 지장을 주지 않으므로 "확인하는 습관"이 중요하다.



다음 SQL문을 살펴보자

```
select * from tbl_board order by bno desc;

selct /*+INDEX_DESC (tbl_board pk_board)*/ * from tbl_board;
```

두 구문은 같은 결과(데이터 역순 정렬)를 생성한다.



두번째에서 order by 없이 동일 결과나오는 것에 주목한다. 

tbl_board테이블에, pk_board인덱스를 역순으로 이용해 줄 것이라는 힌트이다.



---



#### 힌트 사용 문법

```
SELECT /*+ Hint name(param) */ column name,....
FROM table_name
```

 힌트는 /*로 시작, */으로 마무리 된다. 칼럼명이 나와도 ,으로 처리하지 않는다.

---



####  FULL 힌트



select문 실행시 테이블 전체 스캔을 명시하는 것

```
select /*+ FULL(tbl_board) */ * from tbl_board order by bno desc;
```





#### INDEX_ASC, INDEX_DESC힌트



목록 페이지에서 가장 많이 사용하는 힌트

인덱스를 순서, 역순으로 이용할지 지정하는 것

```
select /*+ INDEX_ASC(tbl_board pk_board)*/ * from tbl_board where bno > 0;
```





#### ROWNUM과 인라인뷰



지금까지 전체 데이터를 역순으로 처리하는 방법(order by, 인덱스, 힌트를 통한 정렬)을 진행했다.



페이징 처리를 위해, 필요한 만큼의 데이터를 가져오는 방식을 보겠다.



ROWNUM을 이용해 데이터에 순번을 붙여 사용하는 방법을 알아보자.

SQL 실행 결과에 넘버링을 해준다고 생각하면 된다.

SELECT문에는 ROWNUM이라는 변수로 해당 데이터가 몇 번째로 나오는지 알 수 있다. (실제 데이터가 아닌, 데이터 추출 후 처리되는 변수, 상황에 따라 달라진다.)



![rownum](https://user-images.githubusercontent.com/55486644/82751240-ddf8bf80-9df0-11ea-85f1-00c7232499c6.JPG)

**rownum이 출력된 결과**

BNO41번이 RN에서는 1번을 갖는다. 그러나, 

![rownum 달라지는 번호](https://user-images.githubusercontent.com/55486644/82751349-7e4ee400-9df1-11ea-87a1-8e7c53132592.JPG)

오름차 정렬을 한 순간 4번이 RN1번을 갖게 된다. 따라서

데이터 처리에 따라 달라지는 번호라고 생각하면 될 것 같다. 



이를 이용해 페이징처리를 한다고 생각하면, 목록페이지에서 역순으로 가장 최근 데이터를 보여주어야 하니까, 내림차순으로 정렬(인덱스를 이용 또는 order by 이용)한다면 가장 최근 데이터부터 RN이 1부터 부여될 것이므로, 10개씩 페이지를 보여주고싶으면 1부터 10까지 1페이지에 해당하게 작성하면 된다.



#### 페이지 번호 1,2의 데이터



페이지당 10개의 데이터를 출력한다면 ROWNUM 조건을 WHHERE구문에 추가해서 작성하면 된다.

```
select /*+INDEX_DESC(tbl_board pk_board) */
	rownum rn, bn, title, content
from tbl_board
where rownum <= 10;
```

- 1~10까지 역순으로 된 데이터 출력



그렇다면 10~20은 어떻게 가져올까?

where절을 rownum > 10 and rownum <= 20;으로 지정한다면? => 아무일도 일어나지 않는다! 이때 실행계획을 살펴본다.

먼저 실행 계획은 ROWBUM>10부터 찾는다.

그러나 ROWNUM값의 시작은 1이기 때문에 찾을 수 없는 것이다.

그러므로 rownum을 가져올 때 사이 값을 가져오면 안되고 1을 포함한 시작값부터 해당 지점까지 모두 불러와야한다.

where rownum <= 20;



#### 인라인 뷰 

이제 1~10데이터를 처리하기 위해 인라인뷰를 이용한다.

인라인뷰는 "select문 안쪽 from에 다시 select문"이라는 의미이다.

다시말해 어느 결과를 select로 구하고, 그 결과를 다시 select하는 것

SQL구문을 보면 바로 이해할 수 있다



```
select bno, title, content
from (select /*+INDEX_DESC(tbl_board pk_board) 			rownum rn, bno, title, content
	 from tbl_board
	 where rownum <= 20)
where rn > 10;
```



from안쪽에서 rownum을 사용한 것, 바깥에서 rn을 사용한 것?

안쪽에서 rn이라고 불리는 rownum을 가져오기 위해 rownum을 사용-> 결과물이 rn으로 불리는 데이터로 출력

바깥에서 rn이라는 데이터를 이용하기 때문에 rn사용



