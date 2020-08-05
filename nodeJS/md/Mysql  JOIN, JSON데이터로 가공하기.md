## Mysql  JOIN, JSON데이터로 가공하기

<br>

JOIN은 두 테이블을 **결합**하는 연산.

**JOIN은 연산량이 높아서 이를 피하기 위해 테이블 갯수를 줄이는 것이 좋다고 한다..**



뭐, 어쨌건 사용해보면 이해를 할 수 있으니 사용해보도록한다.





### JSON데이터로 가공해보기



현재 테이블의 관계도는 다음과 같다.

`programs` <= `categories` <= `subcategories` <= `qnas`로 참조를 진행하고 있다.

프로그램의 카테고리, 서브카테고리에 따른 qna가 존재하기 때문에 `JOIN`을 통해 데이터를 출력해야한다.

일단 42서울의 모든 qna를 출력하도록 해보겠다.

쿼리문은 다음과 같다.

```mysql
select	GROUP_CONCAT(JSON_ARRAY(JSON_OBJECT('a', a, 'q', q ))) as '42서울 데이터'
from programs
    inner join categories on programs.id = categories.programs_id # 프로그램 - 카테고리 조인
    inner join subcategories on categories.id = subcategories.categories_id # 카테고리 - 서브카테고리 조인
    inner join qnas on qnas.subcategories_id = subcategories.id # Qna - 서브카테고리 조인
	where   programs.title = '42서울';
```

`JSON_OBJECT`는 결과를 `키 : 값`에 해당하도록 JSON형태로 만들어주고, `JSON_ARRAY`는 이에 해당하는 결과들을 배열로 감싸준다.

`GROUP_CONCAT`은 결과로 나온 모든 값들을 `,`로 구분되게 이어붙여준다. `mysql`은 컬럼당 하나의 결과물을 갖지만 해당 함수를 사용하면 한 컬럼내에 모든 값을 출력시킬 수 있다.

그러나 1024라는 최대사이즈가 기본적으로 저장되어있기에 이를 수정해줄 필요가 있다.

`SET @@group_concat_max_len = 조절할 크기 ;` => 로 사이즈를 조정할 수 있다.

<br>

 

### 더미데이터와 형식이 같도록 가공하기

<br>

현재 내가 맞춰야할 더미데이터의 형식은 다음과 같다.

[ "프로그램명" : [ { "카테고리" : "값", "eventkey" : "값", "섭카테고리" : [ { "title": "값", "링크": "값", "qna" : [ { "q" :"값" , "a" : "값"} ] } ] } ] ]

~~???????~~

그림으로 다시 보자..



<img width="345" alt="관계도 그림" src="https://user-images.githubusercontent.com/55486644/89396853-0c2c4100-d74a-11ea-9bbf-0b7f99922a18.PNG">



복잡하다.

일단 한 부분만 뽑아보자.

```mysql

select
    JSON_OBJECT(programs.title,JSON_ARRAY(JSON_OBJECT('category', categories.title,'eventkey', categories.eventkey,
	'subCategory',JSON_ARRAY(JSON_OBJECT('title', subcategories.title, 'href', subcategories.link, 'qna',JSON_ARRAY(group_concat(JSON_OBJECT('q',qnas.q, 'a',qnas.a)))))))) from programs
    inner join categories on programs.id = categories.programs_id # 프로그램 - 카테고리 조인
    inner join subcategories on categories.id = subcategories.categories_id # 카테고리 - 서브카테고리 조인
    inner join qnas on qnas.subcategories_id = subcategories.id # Qna - 서브카테고리 조인
    where programs.title ='42서울' and (subcategories.title ='지원자격') # 없으면 모든데이터;
	GROUP BY subcategories.link, categories.title, categories.eventkey, subcategories.title; # 42서울의 지원자격을 갖는
```



depth가 깊어서 쿼리로 하기 너무 복잡하다.

```
{"42서울": [{"category": "지원/선발", "eventkey": "apply", "subCategory": [{"qna": ["{\"a\": \"지원 자격은 교육 시작 시점 기준으로 민법상 성인 또는 교육 시작 년도 기준 고등학교 졸업 또는 졸업예정자 이상의 학력자면 누구나 가능합니다.\", \"q\": \"지원자격이 어떻게 되나요?\"},{\"a\": \"저희는 지원자들이 특정 배경, 교육 또는 학위를 가지고 있는 대신, 열정적이고 2년 간의 교육 프로그램에 헌신할 준비가 된 비전을 가진 사람이기를 기대합니다.\", \"q\": \"어떤 사람이 지원하면 좋을까요?\"}"], "href": "#apply1", "title": "지원자격"}]}]}
```

nodejs에서 처리하는게 맞는 것 같다.

이런 작업을 진행할 때 어느 부분에서 해야 효율적인지 모르겠다.

흠.