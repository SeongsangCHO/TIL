## JS30 Day07 Array cardio Day2



### 요구사항

- array 메소드에 대해 학습
- `some` :
- `every`:
- `find`:
- `findIndex`:





---

### 코드

#### 1번

`some`, `Date`를 사용하여 19살이상인 성인인지 확인하는 함수를 작성

```javascript
    const isAdult = people.some(person => {
      const currentYear = (new Date()).getFullYear();
      return currentYear - person.year >= 19;
    });
    console.log({isAdult});

```

-> 적어도 하나가 성인이므로 true의 결과를 출력

<br>

---

#### 2번

`every`를 사용하여 모두가 성인인지 확인하는 함수를 작성

```javascript
    const allAdult = people.every(person => {
      const currentYear = (new Date()).getFullYear();
      return currentYear - person.year >= 19;
    });
    console.log({allAdult});
```

-> 모두 성인이 아니므로 false를 출력

<br>

---

#### 3번

`filter`이랑 다른 `find`를 사용하여 특정 id를 갖는  comment를 반환하도록 작성

```javascript
    const comment = comments.find((v,idx)=>{
      return v.id === 823423;
    });
```

<br>

---

#### 4번

`findIndex`를 사용하여 특정 id의 인덱스를 반환하도록 작성

```javascript
    const commentIndex = comments.findIndex((v) => {
      return v.id === 823423;
    })
```

<br>

---

#### 4번

`slice`를 사용하여 4번에서 얻은 index를 가진 코멘트를 제외하여 새로운 comments배열을 생성 == `splice`와 같은 기능

```javascript
const newComments = comments.filter((v, idx) => idx != commentIndex);
    console.log(newComments);

    const sliceComments = [
      ...comments.slice(0, commentIndex),
      ...comments.slice(commentIndex + 1)
    ];
```

