## TCP / IP 계층

[링크](https://github.com/Kraken-Addicts/HTTP-The-Definitive-Guide/issues/15)

애플리케이션
트랜스포트
인터넷
네트워크 액세스로 구성되어있습니다.

애플리케이션
5 ~ 7계층 (응, 표, 세션계층)
서버, 클라이언트 응용 프로그램이 동작함
동작하기 위해서 전송계층의 주소(포트번호)를 사용
HTTP, Telnet, SSH, FTP, DNS 등의 프로토콜이 동작함
전송계층
OSI의 전송계층
프로세스간 신뢰성 있는 데이터 전송을 담당
TCP, UDP프로토콜이 동작.
인터넷계층
OSI의 네트워크계층
호스트간 라우팅 담당
IP, ICMP, IGMP, ARP (ip to mac), RARP (mac to ip adress) 프로토콜이 동작.
네트워크 액세스
OSI의 물리, 데이터링크계층에 해당
node to node간 신뢰성 있는 데이터 전송을 담당
MAC주소를 사용함
제가 이해한 TCP / IP 동작과정인데 확인부탁드립니다 : ) !!

컴퓨터간 네트워크 통신 단계를 표준화한 OSI의 7계층을 간략화한 것이 TCP/IP계층이다
클라이언트가 브라우저에 URI를 입력하면 DNS서버는 도메인네임에 연결된 IP를 찾아 요청을 보냄
서버는 HTTP를 통해 전달받은 요청을 전송계층으로 데이터를 전달
HTTP 메세지를 인터넷계층으로 전달
호스트간 라우팅(같은 네트워크여도 IP주소가 다를수있기때문에 네트워크내에 알맞는 IP를 가진 서버를 찾기위해 라우팅을함)을 통해 해당 서버를 찾음. -> 가까운 라우터 MAC주소중 IP주소와 가까운곳을 찾음- ARP프로토콜을 사용해서 IP to MAC Address로 서버를 찾음
서버에 요청이 전달되고 응답을 전송계층 -> 애플리케이션 계층으로 올려보냄
서버에서 애플리케이션계층에서 HTTP프로토콜을 이용해 클라이언트로 응답함.