## 코드로 배우는 스프링프레임워크

### 1. 환경설정

- pom.xml에서 springframework버전을 3.1.1에서 5점 버전대로 변경한다.

```xml
	<properties>
		<java-version>1.6</java-version>
		<org.springframework-version>5.0.7.RELEASE</org.springframework-version>
		<org.aspectj-version>1.6.10</org.aspectj-version>
		<org.slf4j-version>1.6.6</org.slf4j-version>
	</properties>
```

- 스프링 5점 버전대를 이용하기 위해서는 JDK 1.8을 사용하는 것이 좋으므로 마찬가지로 변경한다

```xml
           <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-compiler-plugin</artifactId>
               <version>3.5.1</version>
               <configuration>
                   <source>1.8</source>
                   <target>1.8</target>
                   <compilerArgument>-Xlint:all</compilerArgument>
                   <showWarnings>true</showWarnings>
                   <showDeprecation>true</showDeprecation>
                </configuration>
            </plugin>
```



변경을 완료했다면, 프로젝트 -> Maven -> Update Project를 수행한다.

수행 뒤에 JRE System Library 의 실행환경이 1.8기준으로 설정된 것을 확인할 수 있다.

Run on Server로 동작확인!



## Lombok 라이브러리 설치

- getter/setter, toString() 생성자 등을 자동으로 생성해줌!
- https://projectlombok.org 에서 jar형태 파일로 다운로드 가능

- 다운로드 후, cmd의 경로안에 lombok.jar를 넣고, java -jar lombok.jar 명령어를 쳐준다.
- 설치가 완료되면 이클립스 또는 STS의 경로에 lombok.jar이 추가된 것을 확인할 수 있다.



## 에러확인하는 방법

- Window -> Show view -> Other -> general -> problem에서 에러메시지 확인가능하다.
- pom.xml에서 빨간 경고 발생시, 해당 라이브러리를 다운로드못하면서 생기는 문제
  - 사용자 폴더내의 .m2폴더안의 내용을 모두 삭제후 다시 프로젝트 시작
- invalid loc header(bad signature)
  - 톰캣쪽 라이브러리가 제대로 처리되지 않았음, Maven -> Update Project로 업데이트



## JAVA Configuration을 하는 경우

- XML기반으로 스프링 관련 설정하는 것 보다 JAVA를 이용하는 설정이 점점 증가하는 중임.
- web.xml파일 삭제 및 스프링 관련 파일 삭제
  - web, servelet-context, root-context.xml 삭제
- pom.xml 수정 및 스프링 버전 변경
- java설정 관련 패키지 생성



web.xml을 삭제하면 pom에서 에러가 발생함

해결하기 위해 plugins 내의 아래의 설정을 추가한다.

```xml
            <plugin>
            	<groupId>org.apache.maven.plugins</groupId>
            	<artifactId>maven-war-plugin</artifactId>
            	<version>3.2.0</version>
            	<configuration>
            		<failOnMissingWebXml>false</failOnMissingWebXml>
            	</configuration>
            </plugin>
```

스프링 버전도 변경

```xml
<java-version>1.8</java-version>
		<org.springframework-version>5.0.7.RELEASE</org.springframework-version>
```

컴파일 버전도 마찬가지로 변경

```xml
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.5.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <compilerArgument>-Xlint:all</compilerArgument>
                    <showWarnings>true</showWarnings>
                    <showDeprecation>true</showDeprecation>
                </configuration>
            </plugin>
```

Maven -> Update Project 실행





## @Configuration

- java설정시 XML대신 설정파일을 직접 작성해야한다.
- 스프링은 @Configuration을 이용해 해당 클래스의 인스턴스를 이용해 설정 파일을 대신한다.
- 프로젝트 내에 패키지명.config라는 폴더를 생성하고 RootConfig클래스를 작성.

```java
package org.zerock.config;
import org.springframework.context.annotation.Configuration;
@Configuration
public class RootConfig {
}
```



## web.xml을 대신하는 클래스 작성

- web.xml의 역할을 대신하는 클래스를 작성해야한다.
- config패키지 내에 webConfig클래스를 생성한다.

```java
package org.zerock.config;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
public class WebConfig extends
	AbstractAnnotationConfigDispatcherServletInitializer{
		@Override
		protected Class<?>[] getRootConfigClasses(){
			return new Class[] {RootConfig.class};
		}
		@Override
		protected Class<?>[] getServletConfigClasses() {
			// TODO Auto-generated method stub
			return null;
		}
		@Override
		protected String[] getServletMappings() {
			// TODO Auto-generated method stub
			return null;
	}
}
```

