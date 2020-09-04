## 자바스크립트 #02 js로 HTML태그만들기(태그 동적생성)(끝말잇기)

http://blog.naver.com/PostView.nhn?blogId=missjin_k&logNo=220806025058&categoryNo=34&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView

#### DOM

document object model

XML이나 HTML 문서에 접근하기 위한 일종의 인터페이스

즉 HTML의 요소를 JS가 이용할 수 있는 객체가 문서 객체이다.

따라서 HTML에 선언된 요소들을 DOM을 이용해 JS가 이용할 수 있는 것이고 마찬가지로 DOM을 통해 JS가 HTML요소를 생성, 변경 등을 통해 다룰 수 있다는 것이다.

http://tcpschool.com/javascript/js_dom_concept



DOM은 Tree형태로 문서의 태그를 노드 계층 구조트리로 표현한다.

![dom트리](https://user-images.githubusercontent.com/55486644/82993537-b2b5e080-a03b-11ea-8413-b72fd28410f0.JPG)





#### Document 객체

Document객체는 웹 페이지 그 자체를 의미한다.

웹페이지에 존재하는 어떤 요소에 접근하기 위해서 Document객체부터 시작해야한다.



#### Document 메소드

http://tcpschool.com/javascript/js_dom_document

Document객체는 HTML요소와 관련된 작업을 도와주는 다양한 메소드를 제공한다.

- 요소의 선택
  - getElementById, ByClassName, ByName, ByTagName, querySelectorAll
- 요소의 생성
  - createElement(HTML요소)
  - write(텍스트)
- 이벤트 핸들러 추가
  - onClick = function(){}
- 객체의 선택





#### 이벤트리스너

button, form 등 여러 요소에 대한 이벤트가 존재한다.



button의 클릭리스너는 다음과 같이 사용할 수 있다..

```javascript
버튼.addEvenetListener('click', function 함수명(){
	...
});
```



form의 submit 이벤트는 form으로 묶인 input에 대하여 엔터키만 눌러도 제출이 된다.

```javascript
form.addEventListener('submit', function callBack(e)
{
    e.preventDefault();
    checkAnswer();
});
```

그러나 함수 뒤의 이벤트 변수인 e, 그리고 e에 대한 preventDefault를 사용해주지 않으면  페이지가 새로고침 되는 것을 볼 수 있다.

preventDefault는 해당 이벤트만 수행하고 브라우저의 행동을 막는다. form의 submit는 내용을 전송하고 기본적(default)으로 수행되는 브라우저의 행동은 새로고침 이기 때문이다.



## 결과

![끝말잇기](https://user-images.githubusercontent.com/55486644/82984505-459b4e80-a02d-11ea-9003-e8bdfbc0d0f1.gif)



#### 코드

```javascript
var body = document.body;
var score;
var scoreData = 0;

var life;
var lifeData = 3;

var life = document.createElement('div');
document.body.append(life);
life.textContent = 'Your life : ' + lifeData;
var score = document.createElement('div');
score.textContent ='Your score : 0';
document.body.append(score);

var form = document.createElement('form');
document.body.append(form);

var input = document.createElement('input');
//input.setAttribute('onkeyup','enterKey();');
form.append(input);
input.placeholder = 'input your answer';

var button = document.createElement('button');

form.append(button);
button.textContent = 'submit';

var word = document.createElement('div');

word.textContent = '한글';
document.body.append(word);

var result = document.createElement('div');
document.body.append(result);



//정답을 확인하는 메소드
function checkAnswer(){
    if(word.textContent[word.textContent.length - 1] == input.value[0])
    {  
        word.textContent = input.value;
        score.textContent = "Your score :" + ++scoreData;
        result.textContent = "correct";
    }
    else
    {
        --lifeData;
        if(lifeData < 0)
        {
            alert("Out of life");
            window.location.reload();
            return ;
        }
        result.textContent = "wrong";
        score.textContent =  "Your score : "+ --scoreData;
        life.textContent = 'Your life : ' + lifeData;
    }
    input.value = null;

}


//버튼클릭시 발생하는 이벤트


form.addEventListener('submit', function callBack(e)
{
    e.preventDefault();
    checkAnswer();
});

//input태그에 onkeyup으로 엔터키를 눌렀을 때 발생하는 이벤트

// function enterKey()
// {
//     if(window.event.keyCode == 13)
//         checkAnswer();

// }
```

