## nodeJS #12 JSON데이터 파싱하기



<br>

`DB`에서 받아온 데이터를 우리가 만든 더미데이터의 형식에 맞게 가공해야하는 일을 해야한다.

JSON은 객체 형태로 키와 값을 가진다.

```json
{
	"키":"값",
	"키2":"값2"
}
```

~~이렇게만있으면 얼마나 좋을까?~~

```
{ ftseoul: [
      {
          키1:값,
          키2:값2,
          키3:값3,
          키4:값4
      },
      {
      	동일
      }
      {
     	 동일
      }
    ],
    ssafy : [
      {
          키1:값,
          키2:값2,
          키3:값3,
          키4:값4
      },
      {
      	동일
      }
      {
     	 동일
      }
        
    ]
    }
```

일단 이렇게 만들어야한다!

{ftseoul : [ {키...}, { 키... } ] ssafy: [ { 키.. }] } 이렇게 존재한다.

먼저 전체를 감싸는 객체를 생성해준다.

```javascript
let obj = {};
```

그리고 쿼리문의 결과로 받아온 result의 객체를 `map`반복을 통해서 진행하도록한다.

```javascript
result.map(v => {...})
```

`v`는 result의 각 객체로 중복되는 값이 존재하고 있다.

우리가 원하는 형태는 ftseoul이라는 중복되지 않은 단 하나의 키안에 배열,그리고 그 안에 객체가 존재해야하므로 먼저 각 프로그램에 해당하는 이름을 가진 키에 배열의 값을 가진 것을 할당해주도록 한다.



<br>

```javascript
result.map(v => {
	if (!(v.program in obj))
		obj[v.program] = [];
})
```

현재 obj는 빈 객체이므로, v의 program값을 가지고 있지 않으므로 첫 반복에는 `obj의 첫 program명의 키`에 배열이 할당된다.

```
{"ftseoul":[]}
```

이렇게 모든 프로그램이 반복되면,

```
{"ftseoul":[]},"ssafy":[],"boostcamp":[],"soma":[],"woowa":[],"likelion":[]
```

다음과 같은 형태가 된다.

이제 프로그램을 키로 갖는 값(배열)에 객체를 넣어주면 원하는 데이터 형태로 만들 수 있다.



코드는 다음과 같다.

```javascript
  db.query(sql, (error, result) => {
    if (error) throw error;
    let obj = {};
    //데이터를 담을 객체 obj 생성
    result.map(v => { 
      //쿼리문 결과가 객체 배열, 이를 반복함.
     if (!(v.program in obj))
        obj[v.program] = [];        
        //객체에서 program이라는 키가 obj에 존재하지 않으면, 해당 키값에 대한 배열 생성
      obj[v.program].push(v);
      //program의 키값을 갖는 객체에 v객체 할당.
      delete v['program'];
      //program의 키는 사용하지 않으므로 삭제함.
    })
    console.log(obj);
     res.json(obj);
  })
})
```

