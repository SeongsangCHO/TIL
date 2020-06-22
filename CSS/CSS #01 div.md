CSS



favicon 적용

headingsmap

filedset, legend

```html
    <!--상위에 form이옴 -->
    <fieldset>
        <!-- fieldset의 제목을 표시 -->
        <legend>
            검색
            <!-- 텍스트 입력-->
            <input />
        </legend>
    </fieldset>
   <!-- on off 가능-->
   <input type="checkbox"/>

   <!-- 이름으로 그룹지어서 하나의 값만 전달-->
   <input type="radio" name="group"/>
   <input type="radio" name="group"/>

   <!--텍스트 입력창-->
   <textarea></textarea>
```

레이아웃배치 - 가로로먼저 나눠보고 그 다음 세로로 나누는 것을 연습



div태그를 구분하는 시맨틱태그

div와 같은 기능을하는데 구분하기위해 이름을 달리함 header main footer nav 각 태그별로 제약(웹표준)이 존재함.=> validity-> HTML 시맨틱태그의 제약이 유효한지 체크해줌



div의 디폴트인 display : block은 width를 100% 차지하기 때문에, 한 div에 한줄씩 차지한다.

display: inline-block을 사용하면 margin이 사라지고 컨텐츠의 값만 갖는다. + width, height 설정가능

display: inline은 자기 컨텐츠만 갖는다.

span태그는 inline이 자동으로 적용되어있음.



 