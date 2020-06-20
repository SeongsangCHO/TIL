## IBM Cloud core Module #06



**Learning Objectives**



After completing this module, you will be able to:

- Describe the emergent cloud trends such as Hybrid Multicloud, Microservices, and Serverless
- Explain how cloud native applications work
- Explain how DevOps helps tackle some of the complexities posed by cloud
- Describe the benefits of application modernization and how organizations can modernize their applications

<br>

### Hybrid Multi Cloud

<br>

- 프라이빗과 퍼블릭을 동시에 사용합니다. 프라이빗을 사용하면서, 각기 다른 공급자의 퍼블릭클라우드를 사용하여 각각 최고의 서비스만 이용하는 것이 하이브리드 클라우드입니다. **여러** 곳이라는 의미로 하이브리드 멀티 클라우드라고 합니다.

<br>

### Microservice

<br>

- 애플리케이션을 독립적인 최소 구성요소로 분할하는 소프트웨어 개발 기법입니다.

- 모든 요소가 독립적으로 연동되어, 동일한 테스크를 완수합니다.

- 클라우드 네이티브 모델 구현을 위해 앱개발 최적화하는데 필요한 주요 구성요소입니다.

<br>

### Serverless

<br>

서버가 없다는 것이 아니라, 서버의 존재에 대해 신경쓰지 않아도 된다는 것입니다.

백엔드 서버를 구성해야하는데 필요한 기능들이 있습니다. DB, SNS연동, 파일시스템 등을 일일히 설정해야합니다. Firebase는 이를 API로 제공해 서버 개발을 하지 않아도 됩니다.  이를 서버리스, Baas(Back-end as a Service)라 합니다.

[출처]([https://velopert.com/3543#:~:text=%EC%84%9C%EB%B2%84%EB%A6%AC%EC%8A%A4(Serverless)%EB%A5%BC%20%EC%A7%81%EC%97%AD,%EA%B2%83%EC%9D%B4%20%EC%95%84%EB%8B%98%EC%9D%84%20%EC%9D%98%EB%AF%B8%ED%95%A9%EB%8B%88%EB%8B%A4.](https://velopert.com/3543#:~:text=서버리스(Serverless)를 직역,것이 아님을 의미합니다.)

<br>

### Cloud native app

<br>



#### 클라우드 네이티브는 뭘까요?

애플리케이션 구조를 한 가지 업무에 특화된 독립적 단위로 개발하고, 이를 경량화된 가상화 환경에서 구동할 수 있는 단위로 생성하고, 이와 같은 컨테이너들을 관리할 수 있는 환경입니다.



[출처](https://www.e4ds.com/sub_view.asp?ch=23&t=0&idx=11009)

<br>

25년에는 앱의 90%가 클라우드 네이티브에서 구동된다고 합니다.

구동되는 순서는 다음과 같습니다.

- 앱을 마이크로서비스로 분할
- 각 파트를 자체 컨테이너에 패키징
- 컨테이너를 동적으로 오케스트레이션하여 리소스 사용을 최적화



<br>

### DevOps?

<br>

개발에서 배포 및 테스트까지를 한 팀내에서 하도록 하는 개발방법론.

원활한 의사소통과 협업이 가능하다.



이 모듈에서 배운 내용은 다음과 같습니다.

● 하이브리드 멀티클라우드는 퍼블릭 클라우드, 프라이빗 클라우드 및 사내 IT가 서로 다른 퍼블릭 클라우드 공급자의 최고의 클라우드 기반 서비스를 활용하면서 원활하게 상호 운용할 수 있도록 지원하는 클라우드 채택 전략입니다.

● Microservices 아키텍처는 애플리케이션이 느슨하게 결합되고 독립적으로 배포 가능한 구성 요소 또는 서비스의 모음으로 구축되어 효율적인 개발, 유지보수 및 업그레이드 주기가 이루어지는 접근 방식입니다.

● Serverless Computing은 애플리케이션 런타임에 대한 일반적인 인프라 관리 작업에 대한 책임을 클라우드 제공자에게 떠넘기는 컴퓨팅 접근 방식입니다. 개발자는 시간과 노력을 개발 및 테스트에 집중할 수 있으며 컴퓨팅 리소스의 프로비저닝, 유지 보수 및 확장에 대해 걱정할 필요가 없습니다.

● 클라우드 네이티브 애플리케이션은 클라우드 환경에서 작동하도록 구축되거나 리팩터링되는 애플리케이션입니다. DevOps 방법론을 사용하여 개발된 이러한 애플리케이션은 모든 환경에서 실행할 수 있는 컨테이너에 패키징된 마이크로 서비스로 구성되어 있으므로 빠른 반복 주기로 기능을 만들고 업데이트할 수 있습니다.

● DevOps는 개발 및 운영 팀이 빠른 반복 주기로 소프트웨어를 지속적으로 제공하는 동시에 오버헤드, 복제 및 재작업을 줄일 수 있는 협업 방식입니다. DevOps의 툴, 프랙티스 및 프로세스를 통해 클라우드가 안고 있는 복잡성과 과제를 해결함으로써 솔루션을 신속하고 안정적으로 제공하고 업데이트할 수 있습니다.

● 애플리케이션 현대화를 통해 조직은 디지털 전환을 가속화하고, 새로운 기술과 서비스를 활용하며, 변화하는 시장 역학에 보다 신속하게 대응할 수 있습니다. 클라우드 컴퓨팅은 애플리케이션 현대화의 핵심 요소 중 하나입니다.