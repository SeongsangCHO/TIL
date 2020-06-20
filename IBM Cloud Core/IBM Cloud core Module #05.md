## IBM Cloud core Module #05

**Learning Objectives**

After completing this module, you will be able to:

- Describe and differentiate between the four main types of cloud storage - Direct Attached, File Storage, Block Storage and Object Storage
- Explain the benefits of Content Delivery Networks

<br>

### Cloud Storage

<br>

클라우드 스토리지는 원격으로 연결된 서버 네트워크에 데이터를 업로드할 수 있도록 지원합니다. 웹 기반 API를 사용하여 데이터에 엑세스합니다.

Direct Attached, File Storage, Block Storage and Object Storage의 종류가 있습니다.

<br>

### File Storage

<br>

파일 스토리지는 파일 공유가 필요한 경우 공유 파일에 액세스하기 위해 파일 시스템이 있어야하는데, 이런 유형의 스토리지는 NAS에서 지원합니다., 워크로드에 스토리지에 대한 신속한 연결이 필요하지 않은 경우 또는 비용이 중요한 경우에 적합합니다.

<br>

### Block Storage

블록 스토리지는 데이터베이스와 같이 Disk에 대한 일관된 빠른 액세스가 필요한 애플리케이션을 지원할 때 선택하는 것이 좋습니다. 데이터베이스, ERP시스템에 주로 사용하는 경우가 많습니다.

파일 또는 블록 스토리지를 프로비저닝할 때 애플리케이션의 IOPS 요구 사항을 고려해야 합니다.

(IOPS : Input/Output Per Second) : 입출력 속도의 지표.



### Object Storage - Tiers and APIs 

- 객체 스토리지는 구조화되지 않은 대량의 데이터를 저장하는 데 유용합니다.

- 무한 확장 가능한 용량을 제공합니다. 즉, 파일을 계속 추가할 수 있고 사용량에 대한 비용만 지불할 수 있습니다.

<br>



### Content Delivery Networks

<br>

- 분산 서버 네트워크를 제공합니다.
- 사용자의 지리적 위치에 따라 웹 사이트 콘텐츠의 복사본을 사용자에게 임시로 저장하거나 캐시합니다. 
- CDN은 이 콘텐츠를 분산된 위치에 저장하고 웹 사이트 방문자와 웹 사이트 서버 간의 거리를 줄입니다.
- CDN은 인터넷 컨텐츠 전달을 가속화하는 서비스입니다.
- 물리적 위치가 멀더라도, 여러 임시서버를 두어 제일 근접한 서버에서 처리함으로써 지연 시간을 줄여줍니다.





**이 모듈에서는 다음을 학습했습니다.**

- 클라우드 스토리지는 Direct Attached, File, Block, Object Storage의 4가지 주요 유형으로 제공됩니다. 이러한 스토리지 유형은 액세스 방법, 제공되는 용량, 비용, 저장하기에 가장 적합한 데이터 유형, 읽기-쓰기 속도 등에 따라 다릅니다.

- Direct Attached(또는 Local) 스토리지는 클라우드 기반 서버에 직접 제공되며 호스트 서버 섀시 또는 동일한 랙 내에 있는 스토리지입니다.

- 일반적으로 파일 스토리지는 컴퓨팅 노드에 네트워크 파일 시스템(NFS)으로 제공되며, 이는 스토리지가 표준 이더넷 네트워크를 통해 컴퓨팅 노드에 연결됨을 의미합니다.

- 블록 스토리지는 컴퓨팅 노드에 마운트되는 일반적으로 볼륨으로 프로비저닝되는 고속 파이버 연결을 사용하여 컴퓨팅 노드에 제공됩니다.

- 개체 저장소는 API를 통해 액세스되므로 기본 컴퓨팅 노드가 필요하지 않습니다. Object Storage는 무한 확장 가능한 용량을 제공합니다. 즉, 파일을 계속 추가할 수 있고 사용량에 대한 비용만 지불할 수 있습니다. 다른 스토리지 유형에 비해 개체 스토리지는 읽기 및 쓰기 속도 측면에서 가장 느립니다.

- CDN(Content Delivery Network)은 웹 사이트 또는 미디어 콘텐츠의 복사본을 지리적 위치에 따라 사용자에게 임시로 저장하거나 캐시하여 전송함으로써 인터넷 콘텐츠 전송을 가속화하는 분산 서버 네트워크입니다.