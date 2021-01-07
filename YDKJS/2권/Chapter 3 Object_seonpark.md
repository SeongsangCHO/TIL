# Chapter 3 객체


## 3.3.5 프로퍼티 서술자

ES5부터 모든 프로퍼티는 프로퍼티서술자로 표현된다.

- value
- writable
- enumerable
- configurable

```javascript
Object.defineProperty(myObject, 'a', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true,
})
```
### value (값설정)

### writable (쓰기가능)
엄격모드에서 값 수정 시 TypeError 오류발생

### configurable (설정가능)
defineProperty로 설정가능여부

### enumerable (열거가능)
for in 같은 반복문에서 enumerable이 false인 값은 반복문중에 넘겨주지않음

## 불변성

- configurable: false
- enumerable: false

두 옵션을 같이 사용해 상수처럼 사용할 수 있다.

## 확장금지 
```javascript
let myObject = {};
Object.preventExtensions(myObject);
myObject.a = 3;
myObject.a // undefined
```

## 봉인
```javascript
Object.seal(myObject);
```
- configurable: false
- preventExtensions()

propertyDefine을 할수없고 Object에 프로퍼티를 추가할수도 없음

값은 바꿀수있다.

## 동결
```javascript
Object.freeze(myObject);
```
- Object.seal()
- writable: false

생성된 객체에 아무것도 바꿀수 없음

재귀로 안에있는 모든 객체를 동결시킨다.

## [PUT], [GET]
Object.defineProperty에는 게터와 세터를 지정할수있다.

```javascript
myObject = {
    get a() {
        return 2;
    }
}

Object.defineProperty(
    myObject,
    b,
    {
        get: function () {
            return 4;
        },
        set: function (val) {
            this._b_ = val * 2;
        }
    }
)
```

this.\_b\_ 는 명칭을 보통 \_property\_ 로 사용한다고 한다.
this.\_bbb\_ 이렇게해도 문제는없음

### 존재확인 hasOwnProperty

in으로도 가능하다.

### 열거 가능성 enumerable

```javascript
let myObject = {}

Object.defineProperty(myObject, 'a', 
    {
        value: 2,
        enumerable: false
    }
);

Object.defineProperty(myObject, 'b', 
    {
        value: 10,
        enumerable: true
    }
);

for (obj in myObject) {
    console.log(obj)
}
// b
```

### Object.propertyIsEnumerable
해당 프로퍼티가 enumerable한지 확인한다 True/False

### Object.getOwnPropertyNames
해당 오브젝트 내에 property들을 배열로 반환한다.

### for of
배열을 for in으로 반복하면 index값만 출력한다.
```javascript
let arr = [1,2,3,4]
for (let item in arr) {
    console.log(item) // 0,1,2,3
}
```

for of를 이용해 값을 순회할수있다.
```javascript
let arr = [1,2,3,4]
for (let item of arr) {
    console.log(item) // 1,2,3,4
}
```

### [이터레이터 @@iterator 생성하기](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md#iteration)


```javascript
// Object.defineProperty(obj, Symbol.iterator, { ... })

return {
    next: function () {
        return {
            value: //...
            done: // Boolean
        }
    }
}
```
done이 true가 될때까지 반복하는 이터레이터다.
필터링 하는 기능도 만들수있고 무한한 배열을 만들어낼수도 있다.

이를 구현하면 for of를 이용해 모든값에 접근도 가능하다








