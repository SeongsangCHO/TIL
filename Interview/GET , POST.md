## GET , POST

[링크](https://github.com/Kraken-Addicts/HTTP-The-Definitive-Guide/issues/11)

GET, POST라는 HTTP메소드를 통해 서버에 요청을 보내고 이에 대한 응답을 받을 수 있습니다.

GET요청은 주로 조회의 목적으로 URL와 쿼리스트링을 함께 서버에 전송해 이에 대한 응답을 받습니다. 예를들어 게시글 중 3번을 보고싶을 때 게시판.com/게시글?postId=3 처럼 ? 뒤에 이름, 값을 가지고 조건을 주어 요청을 전송할 수 있습니다. 데이터를 URL에 붙여 전송하므로 전송길이에 제한이 있습니다. GET에 대한 응답은 항상 같습니다.

POST요청은 생성, 변경의 목적으로 GET과 달리 URL에 데이터를 붙이지 않고 메시지의 body에 담아서 전송해서 길이제한이 없습니다. 응답이 GET과달리 항상 같지 않습니다.