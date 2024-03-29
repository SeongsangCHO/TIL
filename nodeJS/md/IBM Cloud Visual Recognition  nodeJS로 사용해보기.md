## IBM Cloud Visual Recognition  nodeJS로 사용해보기

<br>



IBM에서는 다양한 서비스들을 제공해줍니다.

이중에서도  AI 및 기계학습으로 이용할 수 있는 서비스가 정말 다양했습니다.

<img width="690" alt="AI_1" src="https://user-images.githubusercontent.com/55486644/88921448-86237c80-d2a9-11ea-9df4-d7cd88b394bf.PNG">
<img width="689" alt="AI_2" src="https://user-images.githubusercontent.com/55486644/88921450-86bc1300-d2a9-11ea-9c86-f69f546f20de.PNG">



무려 18개가 무료라니~~

저는 이미지 분석서비스인 Watson Visual Recognition을 사용해보기로 했습니다 ㅎㅎ.

Watson Visual Recognition이란?

딥러닝 알고리즘을 사용하여 장면, 사물, 얼굴 및 기타 콘텐츠에 대한 이미지를 분석해주는 서비스입니다.

<br>

### 시작하기

해당 서비스는 무료로 제공하지만, 회원가입 및 로그인 과정이 필요합니다.

[여기서 후딱해줍니다.](https://www.ibm.com/kr-ko/cloud)

로그인이 완료되었다면, 상단의 **카탈로그** 클릭, 그리고 **좌측의 서비스**를 클릭하고, 밑에 하위 카테고리에 **AI / 기계학습**을 선택합니다.

그럼 상단에 첨부한 이미지와 같이 그리드로 서비스 목록이 쭈욱 나열되는데 이중에서

**Visual Recognition**을 선택해줍니다!

그럼 아래와 같은 창이 나오는데,

<img width="728" alt="vr_1" src="https://user-images.githubusercontent.com/55486644/88921990-680a4c00-d2aa-11ea-8acd-702c2bfea6ec.PNG">

바로 우측 하단의 **작성**을 클릭해주면 됩니다.





### API , URL 확인하기

해당 서비스를 이용하기 위해서 발급받은 API KEY와 URL이 필요합니다.

이 둘은 

<img width="749" alt="api key" src="https://user-images.githubusercontent.com/55486644/88922166-b6b7e600-d2aa-11ea-8f51-a7b2de5b7cee.PNG">

관리 페이지에서 확인할 수 있으며 API키는 **신임정보보기**를 누르면 사람이 읽을 수 있는 형태로 보여지게 됩니다.

<br>

### 예제 따라하기

바로 밑의 리스트인 **시작하기**를 누르게 되면 예시코드가 나오는데요,

저는 해당 코드가 안되더라구요 그래서 stackoverflow에 찾아보았는데 [error code](https://stackoverflow.com/questions/60339789/ibm-watson-visual-recognition-nodejs-error-code-403-forbidden-access-is-d) 코드가 문제 있었다고해서 다른 예제를 찾아보았습니다.

[ibm Cloud docs](https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-getting-started-tutorial&programming_language=javascript#getting-started-tutorial) 해당 페이지의 예제를 따라가니 잘되었습니다 ㅎㅎ.

nodeJS말고 go, java, Ruby, Python 등 여러 언어들의 예제가 있으니 익숙하신 언어로 사용하시면 될 것 같습니다.

<br>

### 환경세팅

프로젝트 폴더 하나를 생성하고, `npm init`으로 package.json파일을 생성했습니다.

그리고 `npm i ibm-watson@^5`로 패키지 설치를 진행하고 `index.js`파일을 생성해 코드를 작성했습니다.

예제코드

```javascript
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  url: '{url}',
});

const classifyParams = {
  url: 'https://ibm.biz/BdzLPG',
};

visualRecognition.classify(classifyParams)
  .then(response => {
    const classifiedImages = response.result;
    console.log(JSON.stringify(classifiedImages, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
```

달리 변경하실 코드는 없고 apikey와 url에 각각 이전의 **관리 페이지**에 있던 개인 apikey와 url을 작성해주시면됩니다.

~~저는 왜 apikey에 있는 브라켓을 빼고 적어야한다는 것이 매번 헷갈릴까요? 'apikey' 이렇게 해주지..?~~





<br>

### 사용해보기!

<br>

`classifiyParams`의 `url`은 이미지인식을 할 URL을 작성해야합니다.

예제에 작성된 이미지는 

<img width="502" alt="예제 URL 이미지" src="https://user-images.githubusercontent.com/55486644/88923013-f92df280-d2ab-11ea-9477-6a1eea480ffc.PNG">

~~아주 귀여운~~ 보드네요!

그럼 이 이미지를 사용해 run해보겠습니다!

`node index.js`를 사용해서 결과물을 보면.. json형태로..

```json
$ node index.js
{
  "images": [
    {
      "classifiers": [
        {
          "classifier_id": "default",
          "name": "default",
          "classes": [
            {
              "class": "circuit board",
              "score": 0.577,
              "type_hierarchy": "/electrical device/computer circuit/circuit board"
            },
            {
              "class": "computer circuit",
              "score": 0.691
            },
            {
              "class": "electrical device",
              "score": 0.694
            },
            {
              "class": "disk controller",
              "score": 0.553,
              "type_hierarchy": "/controller/disk controller"
            },
            {
              "class": "controller",
              "score": 0.557
            },
            {
              "class": "central processing unit",
              "score": 0.534
            },
            {
              "class": "PC board",
              "score": 0.5,
              "type_hierarchy": "/electrical device/computer circuit/PC board"
            },
            {
              "class": "electronic equipment",
              "score": 0.6
            },
            {
              "class": "memory device",
              "score": 0.599
            },
            {
              "class": "microchip",
              "score": 0.592
            },
            {
              "class": "jade green color",
              "score": 0.838
            },
            {
              "class": "emerald color",
              "score": 0.787
            }
          ]
        }
      ],
      "source_url": "https://ibm.biz/BdzLPG",
      "resolved_url": "https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/640px-IBM_VGA_90X8941_on_PS55.jpg"
    }
  ],
  "images_processed": 1,
  "custom_classes": 0
}
```

circuit board 0.577 !

computer circuit 0.691 !

~~와 너무신기해요! 얼른 다른사진도 넣어봐야겠어요~~

<br>

[고양이사진](https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg)을 넣어봤습니다.

```json
$ node index.js
{
  "images": [
    {
      "classifiers": [
        {
          "classifier_id": "default",
          "name": "default",
          "classes": [
            {
              "class": "cat",
              "score": 0.95,
              "type_hierarchy": "/animal/mammal/carnivore/feline/cat"
            },
            {
              "class": "feline",
              "score": 0.958
            },
            {
              "class": "carnivore",
              "score": 0.958
            },
            {
              "class": "mammal",
              "score": 0.958
            },
            {
              "class": "animal",
              "score": 0.959
            },
            {
              "class": "beige color",
              "score": 0.998
            }
          ]
        }
      ],
      "source_url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
      "resolved_url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
    }
  ],
  "images_processed": 1,
  "custom_classes": 0
}
```

그리고 마지막으로...

<br>

<br>

[저와 옆자리 희생양분](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDKQLu%2FbtqF9kLn5ja%2FnqaRR9PAnGD44K1WE5GI81%2Fimg.jpg)

```json
$ node index.js
{
  "images": [
    {
      "classifiers": [
        {
          "classifier_id": "default",
          "name": "default",
          "classes": [
            {
              "class": "person",
              "score": 0.6
            },
            {
              "class": "neck brace",
              "score": 0.57,
              "type_hierarchy": "/brace/neck brace"
            },
            {
              "class": "brace",
              "score": 0.57
            },
            {
              "class": "gasmask",
              "score": 0.508,
              "type_hierarchy": "/protective covering/mask/gasmask"
            },
            {
              "class": "mask",
              "score": 0.542
            },
            {
              "class": "protective covering",
              "score": 0.542
            },
            {
              "class": "blindfold",
              "score": 0.508
            },
            {
              "class": "cup",
              "score": 0.5,
              "type_hierarchy": "/utensil/tableware/cup"
            },
            {
              "class": "tableware",
              "score": 0.503
            },
            {
              "class": "utensil",
              "score": 0.503
            },
            {
              "class": "beverage",
              "score": 0.6
            },
            {
              "class": "black color",
              "score": 0.561
            },
            {
              "class": "ivory color",
              "score": 0.511
            }
          ]
        }
      ],
      "source_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDKQLu%2FbtqF9kLn5ja%2FnqaRR9PAnGD44K1WE5GI81%2Fimg.jpg",
      "resolved_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDKQLu%2FbtqF9kLn5ja%2FnqaRR9PAnGD44K1WE5GI81%2Fimg.jpg"
    }
  ],
  "images_processed": 1,
  "custom_classes": 0
}
```

식기, 테이블웨어 등,, 뜬금없는걸 잡아내긴하지만 사람인것과 마스크인걸 잘잡아줬습니다.

아직, 잘 모르지만 이를 이용한 서비스를 만들 수 있겠다라는 생각이 듭니다. 얼른 다른 서비스도 이용해보러 가야겠습니다..