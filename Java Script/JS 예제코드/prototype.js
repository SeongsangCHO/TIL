function Person(name, gender) {
  // new키워드를 빼먹고 생성했을 때의 방법
  if (this instanceof Person === false) {
    console.log(this); //window 전역객체
    return new Person(name, gender);
  }

  this.name = name;
  this.gender = gender;

  this.sayHello = function () {
    alert(this.name + ' said "hello"');
  };
  Person.prototype.getName = function () {
    return this.name;
  };
}

let hi = Person("hihi", "man");
var zero = new Person("Zero", "m"); // Person {name: 'Zero', gender: 'm'}


/* Q ? - 11번 ~ 16번라인까지의 차이점?*/
/* this는 자기 자신 '마다' 갖고 있고
prototype은 부모 객체에만 갖고 있어서
이를 만들기 위해서 메모리를 덜 할당할 수 있는 방법인가?
*/