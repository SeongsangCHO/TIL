# 클래스와 객체의 혼합

## 클래스이론

[클래스의 개념](http://www.tcpschool.com/java/java_class_intro)

## 자바스크립트의 클래스

자바스크립트의 클래스는 클래스 디자인 패턴을 사용하기위해 억지로 만들어낸 패턴이다.

클래스는 디자인패턴중 하나이니 쓸지말지는 자신의 결정에 달렸다.

## 클래스 체계

클래스는 설계도 같은 느낌이다.

구성은 아래와같다.
- 데이터 프로퍼티(변수)
- 메서드

## 생성자
객체를 생성할 때 필요한 정보를 초기화한다.

```javascript
class CoolGuy {

    // 생성자
    constructor (trick) {
        // property 
        this.specialTrick = trick
    }

    // 메서드
    showOff () {
        console.log('My trick is ', this.specialTrick)
    }
}
```

객체를 생성하는 방법
```javascript
joe = new CoolGuy('카드마술');
joe.showOff(); // My trick is 카드마술
```

## 클래스 상속

- inherit : 상속하다

### inherits
부모클래스를 정함

```javascript
class Vehicle {
    constructor () {
        this.a = 10;
    }
}
class Car extends Vehicle {
    constructor () {
        console.log(inherited::a)
    }
}
```

### inherited
부모의 메서드, 변수에 접근할 때 사용