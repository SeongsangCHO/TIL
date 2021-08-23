# TS - Type, Interface, Generic, React에서 TS 정리

---



> [Type Test해보는 사이트](https://www.typescriptlang.org/play?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCoASMFmgY7p7ehCTkVOle4jUMdRLYTqCc8LEZzCZmoNJODPHFZZXVtZYYkAAeRJTInDQS8po+rf40gnjbDKv8LqD2jpbYoACqAEoAMsK7sUmxkGSCc+VVQQuaTwVb1UBrDYULY7PagbgUZLJH6QbYmJAECjuMigZEMVDsJzCFLNXxtajBBCcQQ0MwAUVWDEQNUgADVHBQGNJ3KAALygABEAAkYNAMOB4GRogLFFTBPB3AExcwABT0xnM9zsyhc9wASmCKhwDQ8ZC8iElzhB7Bo3zcZmY7AYzEg-Fg0HUiS58D0Ii8AoZTJZggFSRxAvADlQAHJhAA5SASAVBFQAeW+ZF2gldWkgx1QjgUrmkeFATgtOlGWH0KAQiBhwiudokkuiIgMHBx3RYbC43CCJSAA)
>
> 각 Component 폴더에서 `types.ts` 를 분리해 import로 사용함.





### 1. 함수

```js
function formatDate(d : Date) : string{
...
	return ...
}
```

매개변수에 대한 타입(Date) `:` 으로 지정

Return Type(string) `:` 으로 지정 



```js
const formatDate = (d : Date | number, delimiter?: string) => {
  ...
}
```

`?` 는 Optional

`|` 는 Date or number



### 2. 타입

```js
let value : any; //타입을 지정합니다.

value = 'abc';
value = 123;
...

enum Category {
  //0부터 시작,
	  Pasta,
    Pizza,
    Dessert
  //값도 지정 가능하다.
	  Pasta = 'pasta
    Pizza = 'pizza'
    Dessert = 'dessert'
}
// enum 값중 하나를 가질 수 있음.
let menuCategory : Category = Category.Pasta;

//Type Alias
type ID = number | string;
type Info = {
  id : ID;
  pw : string;
}
function checkInfo(info : Info){}

let id : ID = "1010;
checkInfo({id, pw: "password"});
```



- any : 어느 타입도 지정 가능- 안쓰도록 노력::쓰나마나라는 의미.
- void : 어떤 타입도 없음. 함수 반환값이 없을 때 사용
- enum : 0부터 시작하는 열거형으로 값도 지정할 수 있다. - 상수로 된 값이 필요할 때 사용한다.
- union : `|` 의 의미로 여러 타입이 올 때 사용.
- Type Alias :  `type` 키워드를 사용해 타입에 이름을 붙일 수 있다. 재사용하거나 객체를 위한 타입을 정의할 때 많이 사용.



### 3. 타입추론

> 꼭 타입을 지정하지 않아도 컴파일 때 변수에 할당한 값을 보고 타입을 추론한다.
>
> 적당한 타입 추론은 가독성을 높일 수 있으나 유지보수를 위해 정의하는 편이 좋다.

```js
let starArr = [1,2,3];
starArr.push("5점")

let starArr = [1, 2, "3점"];
//위의 타입은 (string | number)[]으로 추론된다.
```

숫자로 이루어진 배열을 타입추론해서 `number []` 로 지정되었음.

그래서 string을 넣으면 에러가 발생한다.



### 4. Interface

> Java에서 Class에서 구현되어야하는 method를 정의할 때 사용하는 개념
>
> Ts에선 state, Props Type을 정의하는데 주로 사용한다.



#### 4.1 객체 타입 정의

```js
interface Restaurant {
  name : string;
  star : number;
}

const road : Restaurant = {
  name : "취향로3가",
  star : 5,
  address : "을지로 3가", // 예정되어있지 않은 프로퍼티 추가시 에러가 발생한다.
}
```

위 처럼 interface에 없는 타입을 리터럴로 넣으면 에러가 발생한다.

그러나 아래처럼 사용하면 에러가 발생하지 않는다.

```js
interface Restaurant {
  name : string;
  star : number;
}

const road  = {
  name : "취향로3가",
  star : 5,
  address : "을지로 3가",
}

const chroad3 : Restaurant = road;
```

이게 되는 이유는 `타입 호환성` 때문이다.



##### 🤔 타입 호환성 ?

> TS의 타입시스템 기본 규칙은 y가 최소한으로 x와 동일 멤버를 갖고 있다면, x와 y가 호환된다는 것이다.
>
> 타입의 범위가 큰 것이 작은 곳으로 할당될 때는 가능하나 반대의 경우는 되지 않는다.
>
> A타입이 B타입의 부분집합일 때 B의 타입을 갖는 값이 A로 할당될 수 있다라는 의미

![스크린샷 2021-08-23 오후 2 54 01](https://user-images.githubusercontent.com/55486644/130397292-d0f402ed-abf3-45ff-920c-0f9aa9c095aa.png)

위 예제의 `const chroad3 : Restaurant`의 의미는, `chroad3`은 `Restaurant`의 타입을 따르기에 chroad3에 `name, star` 속성을 가진 객체가 할당되어야 한다. 라는 것이다.

3개의 프로퍼티를 가진 객체`road`를 `chroad3`에 할당할 수 있는 이유는 `road`와 `chroad3`이 호환되기 때문이다. (`name, star`를 이미 갖고 있기 때문이다.)



#### 4.2 다양한 프로퍼티 타입

```js
interface Restaurant {
  readonly name : string;
  star : number;
  address? : string; // 있어도되고 없어도되는 프로퍼티
}
  
 const chroad3 : Restaurant = {
   name : "취향로3가",
   star : 5,
 };
  
  chroad3.name = "12345"; //에러 :: 읽기 전용 속성이기 때문
```



#### 4.3 인터페이스 확장

> `extends` 키워드를 사용해 기존 정의된 인터페이스를 확장해서 사용가능하다.
>
> 타입 상속

```js
interface BasicInfo {
  name : string;
  star: number;
}

interface DetailInfo extends BasicInfo{
  address : string;
  phone : string;
  position : number[];
}

const chroad3 : DetailInfo = {
  name : "1234",
  star : 5,
  address : "567",
  phone : "1231-1231-1231",
  position : [12, 45],
};
```



> 교차 타입의 활용
>
> 합쳐서 새로운 interface를 만드는 것이 아니라, 기존에 정의했던 인터페이스를 합쳐 `새로운 타입을 만드는 것`

```js
interface BasicInfo {
  name : string;
  star: number;
}

interface DetailInfo extends BasicInfo{
  position : number[];
}

type Info = BasicInfo & DetailInfo;
```





### 5. 제네릭 (Generic)

> `<>` 키워드를 통해 유동적인 타입정의가 된다.
>
> 특정 타입 고정정의가 아닌, 원하는 타입을 자유롭게 지정해서 사용하고 싶을 때 사용한다.

```js
function makeArr<T>(el : T): T[] {
  return [el];
}

makeArr<number>(1);
makeArr<string>("1점");
makeArr<boolean>(true);
```

매개변수의 타입을 제네릭으로 받아서 호출할 때 `<TYPE>`을 명시해서 사용할 타입을 유동적으로 사용할 수 있다.

반환의 타입도 지정한 TYPE과 같이 유동적이다.



### 6. React에서의 TS

> `객체 타입 정의`는 object, interface, type alias가 있다.
>
> 공식문서에서는 type보다 interface를 사용하라고 되어있음



#### 6.1 객체 타입 정의방식, Object <type < interface

```js
function checkInfo(info : {id : string; pw: string}){...}
```

프로퍼티가 많을수록 가독성이 좋지 않으니 interface, type을 사용하는 편이 좋다.



#### 6.2 type, interface의 차이

> 타입을 확장하는 방법에 차이가 있다.
>
> type은 `&`연산자로, interface는 `extends` 키워드를 이용한다.
>
> type은 새로운 속성 추가를 위해서 같은 이름으로 재 선언할 수 없지만, interface는 가능하다.

```js
interface Food {
  name : string;
}

interface Food { // 가능
  price : number;
}

///

type Food {
  name : string;
}

type Food { // 불가능
  price : number; 
}
```



#### 6.3 함수형컴포넌트 2가지 선언 방법

> FC === FunctionComponent 타입
>
> FC에 제네릭으로 props타입을 전달해야한다.
>
> 반환값을 내부적으로 정의되어 있다.

##### 👉 FC

```js
interface StarsProps {  // prop 타입 정의
	star: number;
}

const Stars: React.FC<StarsProps> = ({ star }) => {   // 2
	// 로직

	return ( 
		<div>
			{makeStars(star)}
		</div>
	)
}
```



##### 👉 함수 정의

```js
interface StarsProps {   // prop 타입 정의
	star: number;
}

const Stars = ({ star }: StarsProps): JSX.Element => {  // 1
	// 로직

	return ( 
		<div>
			{makeStars(star)}
		</div>
		)
}
```

1. return타입 생략 가능 - 타입추론됨







#### 6.4 Hooks

> state의 타입이 중간에 바뀌지 않는다면 타입추론으로 인해 initState의 타입을 선언해주지 않아도 된다.

```js
const [like, setLike] = useState<boolean | null>(null);
```

위 코드처럼 초기 값을 null로 set하고 싶을 때 generic, union을 사용할 수 있다.



```js
interface Food {
  name : string;
  price : number;
}

const [foods, setFoods] = useState<Food[]>([]);
```

객체가 포함된 경우 프로퍼티 타입을 지정해준다.



UseRef의 경우도 마찬가지로 타입추론이 되나 정의하고싶은 경우 제네릭으로 사용하면 된다.

```js
const inputRef = useRef<HTMLDivElement>(null);
```





Event Handler의 `e` 매개변수는 타입이 필요하다.

어느 종류, 어느 태그에서 발생하는지 써주는 것이 좋다.

```json
const updateValue = (e : React.ChangeEvent<HTMLInputElement>) => {...}
```



### 7. 전역변수

```js
declare global {
  interface Window {
    kakao : any;
  }
}
```

window에 외부라이브러리 변수 추가시, 해당 라이브러리에서 사용하는 변수 명을 추가하면 된다.

