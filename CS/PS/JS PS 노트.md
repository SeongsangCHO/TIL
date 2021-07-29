## JS PS 노트



#### python range()와 같음

```javascript
let arr = [...Array(5).keys()];
[0,1,2,3,4]
```



#### 오름차순정렬

```javascript
let arr = [3, 2, 1, 0];
console.log(arr.sort());

[0, 1, 2, 3];
```



#### 내림차순 정렬

```javascript
arr.sort((a, b) => b - a)
```



#### numberString to char

fromCharCode => ascii => char

```javascript
//숫자 문자에 아스키코드를 더해 글자로 변환 
let str = "012345";

str.split('').map((value) => {
  console.log(String.fromCharCode(+value + 65));
});
//A B C D E F
```



#### char to String

charFromCode => asciii to char 

```javascript
//문자에 아스키코드를 더해 변환
let str = "abcdef";

let converted =str.split('').map((value) => {
  //문자 to ascii
  console.log(value.charCodeAt(0));
  //ascii to char
  return String.fromCharCode(value.charCodeAt(0) - 32);
});
console.log(converted);

//A B C D E F
```



#### 배열에서 max, min 값

```javascript
Math.max.apply(null, 배열);s
```

