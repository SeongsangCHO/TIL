

# Chapter 4-2 믹스인

---

- 클래스 복사기능을 흉내낸 명시적, 암시적 믹스인에 대해 알아보자



### 4.4.1 명시적 믹스인

JS는 클래스의 기능이 없다.

프로퍼티를 일일히 수동으로 복사하는 믹스인은 다음과 같이 구현할 수 있다.

```js
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		// only copy if not already present
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}

	return targetObj;
}

var Vehicle = {
	engines: 1,

	ignition: function() {
		console.log( "Turning on my engine." );
	},

	drive: function() {
		this.ignition();
		console.log( "Steering and moving forward!" );
	}
};

var Car = mixin( Vehicle, {
	wheels: 4,

	drive: function() {
		Vehicle.drive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	}
});
```

- 타겟객체에 없는 프로퍼티만 "복사"한다.
- 레퍼런스만 복사되는 것
  - `mixin` 의 매개변수 객체에 drive가 있다. `Vehicle` 과 새로 만들어지는 객체사이에 `drive()` 를 구분하기 위해서 앞에 객체이름을 써주는 절대적인 레퍼런스를 이용해야한다. 그러나 `Vehicle.drive()`로만 사용하면 `Vehicle` 객체의 함수가 호출되므로 명시적 바인딩을 이용해 `drive()` 를 오버라이드할 수 있다.

> 쓰지않는게 좋다.; ;



여러 방법이 있지만, 부모에서 중복되지 않는 내용을 자식에 명시적으로 복사하는 것은 동일하다.





### 기생상속

명시적 / 암시적 특성을 지닌 믹스인

```js
// "Traditional JS Class" `Vehicle`
// 부모클래스 객체 정의
function Vehicle() {
	this.engines = 1;
}
Vehicle.prototype.ignition = function() {
	console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log( "Steering and moving forward!" );
};
// 부모클래스 객체 정의

//기생 클래스 Car
function Car() {
	// first, `car` is a `Vehicle`
	var car = new Vehicle();

	// now, let's modify our `car` to specialize it
	car.wheels = 4;

	// save a privileged reference to `Vehicle::drive()`
	var vehDrive = car.drive;
  // 오버라이드 하기 위해 내부 레퍼런스 지정 car.drive는 복사된 부모의 drive레퍼런스임.
  
	// override `Vehicle::drive()`
	car.drive = function() {
    //this를 이용해 오버라이드 (car)
		vehDrive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	};
//new 연산자 사용할 필요없음 car객체 반환.
	return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!
```







### 4.4.2 암시적 믹스인

> 쓰지 않는편이 좋다.

```js
var Something = {
	cool: function() {
		this.greeting = "Hello World";
		this.count = this.count ? this.count + 1 : 1;
	}
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
	cool: function() {
		// implicit mixin of `Something` to `Another`
		Something.cool.call( this );
	}
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)
```

- Cool()를 바인드해서 Another컨텍스트로 호출하여 해당 프로퍼티를 복사할 수 있도록한 것.
- s