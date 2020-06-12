## node js에서의 DB연동 및 테스트(mysql + workbench + nodejs)

<br>

## 다운로드 링크

<br>

1. 먼저 mysql에 필요한 파일이긴한데, 2번에서 설치되는 것 같으므로 일단 2번으로 넘어가세요.  [C++ redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads)

2. 420MB파일 받은 다음에, 설치를 진행합니다. 첫번째 메뉴에서 2번째항목 체크하고 넘어갑니다(1번을 다운로드 받는 작업), excute, next의 반복절차, 설치가 마무리될 즈음, 계정비밀번호를 설정하는데, workbench나 nodejs에서 접근하기 위한 비밀번호니 잊지 말도록 하세요! [mysql](https://dev.mysql.com/downloads/windows/installer/8.0.html) 420mb설치

3. mysql을 보다 편하게 사용할 수 있게 해주는 툴입니다. [mysql workbench](https://dev.mysql.com/downloads/workbench/)

<br>

## DB 테스트하는 순서

<br>

1. mysql 설치할 때 test하는 과정이 있는데 거의 다 문제없이 테스트 될 것입니다.
2. workbench를 키고 +버튼을 눌러주세요. 첫번째 칸은 DB의 이름입니다. 설정해주세요. 그 다음, store valut에는 설치할 때 설정했던 비밀번호를 입력해줍니다. 다음에 db접속시 비밀번호 치는 번거로움을 없애줍니다. 맨 밑에 default 스키마는 빈칸인 채로 놔둡니다.
3. test connection을 눌러 테스트를 해봅니다. successfully ~~가 나오면 정상적으로 연결이 된 것입니다.

<br><br>

## DB 만들고 테스트해보기

<br>

DB를 만들었으므로, 이제 DB하위의 스키마와 테이블을 만듭니다. 스키마는 여러 테이블을 담는 그릇이고 테이블은 여러 요소들을 담을 그릇입니다.

<br>

1. navigator, 왼쪽 사이드바 하단에 Schemas가 있는데 공란을 우클릭하여 Create Schema를 합니다.

2. 스키마 이름을 정하고, charset/collation에는 각각 UTF-8, UTF-8 bin을 설정합니다.

3. 스키마가 생성이 되었으므로 쿼리문을 이용해 테이블을 만들어 봅니다.

4. 왼쪽 사이드바의 Tables에 우클릭하여 생성하는 방법과 직접 쿼리문을 입력해 작성할 수 있습니다. 

   ```
   CREATE TABLE `mydb`.`new_table` (
     `idnew_table` INT NOT NULL,
     PRIMARY KEY (`idnew_table`));
   ```

5. 데이터를 추가합니다 !

   ```
   insert into 테이블명(컬럼명)
   values(추가할 데이터);
   ```

6. 추가한 데이터를 확인합니다!

   ```
   select * from 테이블명
   ```

7. 스키마, 테이블을 생성하고 데이터를 삽입하고, 조회하는데까지 진행했습니다!

<br>

##  nodejs에서의 DB테스트

<br>

1. ```
   npm install mysql
   ```

   로 mysql을 설치합니다.

2. mysql.js파일을 생성하고 다음을 입력합니다.

3. ```javascript
   var mysql      = require('mysql');
   var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '설치시 설정한 비밀번호',
     database : '생성한 DB명'
   });
   
   connection.connect();
   
   connection.query('SELECT * FROM 테이블 명', function(err, results, fields) {
     if (err) {
       console.log(err);
     }
     console.log(results);
   });
   
   connection.end();
   
   ```

   다음을 작성하고 

   ```
   node mysql.js
   ```
   
   를 실행해봅니다.
   
4. 에러가 뜹니다 ㅎㅎ. 다음 [링크](https://stackoverflow.com/questions/51008807/nodejs-mysql-client-does-not-support-authentication-protocol/51063951)에서 SQL쿼리를 생성했던 workbench에서 작성하고 ctrl+ enter로 쿼리문을 실행해준뒤 다시 시도해봅니다.

5. 해결되었습니다!.

