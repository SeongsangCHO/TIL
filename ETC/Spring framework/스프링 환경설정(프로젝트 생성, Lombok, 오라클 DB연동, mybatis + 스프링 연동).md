## 스프링 간단정리

스프링프레임워크를 사용하기 위해선 환경설정이 필요하다.

#### pom.xml에서 수정 및 추가 해야할 사항

- springframework 버전을 3.XX에서 5버전대로 변경한다

- JDK를 1.8버전으로 변경한다

- maven-compiler-plugin도 같은 버전으로 변경한다.

- Spring-TEST 추가

- Lombok 추가

- log4j 버전을 1.2.17으로 변경하고 scope를 지운다

- TEST (JUnit)을 4.12버전으로 변경한다.

  

#### Lombok 사용

- https://projectlombok.org 에서 jar형태 파일로 다운로드 가능
- 다운로드 후, cmd의 경로안에 lombok.jar를 넣고, java -jar lombok.jar 명령어를 쳐준다.
- 설치가 완료되면 이클립스 또는 STS의 경로에 lombok.jar이 추가된 것을 확인할 수 있다.

----

#### 의존성주입

- root-context.xml의 namespace의 context체크한 다음 해당 코드 추가

```xml
	<context:component-scan base-package="org.zerock.sample">
		</context:component-scan>
```

---

#### 테스트코드

의존성 주입에 대한 테스트코드

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class SampleTest {
	@Setter(onMethod_ = {@Autowired})
	private Restaurant restaurant;
	
	@Test
	public void testExist() {
		
		assertNotNull(restaurant);
		
		log.info(restaurant);
		log.info("------------------");
		log.info(restaurant.getChef());
	}
}
```

---





#### 오라클 DB연동

## 스프링 #03 오라클 DB 연동

- oracle data base 11g express 설치
  - https://www.oracle.com/database/technologies/xe-prior-releases.html
- sql developer 설치
  - 11g express가 설치된 경로에 다운로드
  - https://www.oracle.com/tools/downloads/sqldev-v192-downloads.html

계정 접속한 다음, 연동 확인을 위해

```
CREATE USER book_ex IDENTIFIED BY book_ex
DEFAULT TABLESPACE USERS
TEMPORARY TABLESPACE TEMP;
```

실행 하면, 테이블이 생성됨을 확인할 수 있다.

사용자 계정으로 특정 행위를 위해 권한 또는 role이 필요하므로 GRANT 구문으로 처리한다

```
GRANT CONNECT, DBA TO BOOK_EX
```

### 포트변경

Tomcat의 기본포트가 8080으로 되어있기 때문에, 오라클 포트를 변경해주어야한다.

```
select dbms_xdb.gethttpport() from dual;
```

을 작성해 현재 포트번호를 확인할 수 있다.

8080으로 나오는 경우 포트번호를 아래 구문으로 변경한다

```
exec dbms_xdb..sethttpport(포트번호); // 1000번이하 제외
```



### 프로젝트의 JDBC 연결

SQL Developer 경로의 jdbc/lib 폴더에 ojdbc8.jar파일을 프로젝트의 build path에 추가한다

add External jars로 추가

Deploymenty Assembly에도 마찬가지로 추가해준다





### JDBC, Java 테스트

```java
package org.zerock.persistence;

import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

import lombok.extern.log4j.Log4j;

@Log4j
public class JDBCTests {

	static {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testConnection() {
		try(Connection con = 
				DriverManager.getConnection(
						"jdbc:oracle:thin:@localhost:1521:XE",
						"book_ex",
						"book_ex")){
			log.info(con);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}

```

---



## MyBatis + 스프링 연동, (커넥션 풀 히카리CP)



#### 커넥션 풀 히카리 CP (XML을 이용하는 경우)

여러명의 사용자를 동시에 처리해야하는 데이터베이스 연결을 이용할때 커넥션 풀을 사용한다

DataSource라는 인터페이스를 통해 이를 사용하며,Hikari CP라는 커넥션 풀을 사용하기 위해 설정을 진행한다.

pom.xml에 Hikari CP 를 추가한다

```xml
	<dependency>
	    <groupId>com.zaxxer</groupId>
	    <artifactId>HikariCP</artifactId>
	    <version>2.7.4</version>
	</dependency>
```

root-context.xml에 히카리 CP의 설정을 작성한다

```xml
	<!-- 히카리 CP 빈 등록 -->
	<bean id="hikariConfig" class="com.zaxxer.hikari.HikariConfig">
		<property name="driverClassName"
			value="oracle.jdbc.driver.OracleDriver">
		</property>
		<property name="jdbcUrl"
			value="jdbc:oracle:thin:@localhost:1521:XE"></property>
			<property name="username" value="book_ex"></property>
			<property name="password" value="book_ex"></property>
	</bean>	
		
	<!-- 히카리 CP 설정 -->
	<bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource"
		destroy-method="close">
		<constructor-arg ref="hikariConfig"/>
		</bean>

```

---

### JAVA를 이용하는 경우

RootConfig 클래스와 @Bean을 이용해서 처리한다

- @Bean이 선언된 메소드의 실행 결과로 반환된 객체는 스프링의 bean으로 등록된다.

RootConfig.java

```java
@Configuration
@ComponentScan(basePackages = {"org.zerock.sample"})
public class RootConfig {

	@Bean // dataSource()의 반환값 dataSource객체를 빈으로 등록하겠다.
	public DataSource dataSource() {
		HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		hikariConfig.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:XE");
		hikariConfig.setUsername("book_ex");
		hikariConfig.setPassword("book_ex");
		
		HikariDataSource dataSource = new HikariDataSource(hikariConfig);
		return dataSource; // dataSource객체가 Bean으로 등록됨
	}

}

```



### 테스트코드

```java
package org.zerock.persistence;

import static org.junit.Assert.fail;

import java.sql.Connection;

import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.zerock.config.RootConfig;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= {RootConfig.class})
@Log4j
public class DataSourceTests {
	
	@Setter(onMethod_ = {@Autowired})
	private DataSource dataSource;
	@Test
	public void testConnection() {
		try (Connection con = dataSource.getConnection())
		{
			log.info(con);
		}
		catch(Exception e) {
			fail(e.getMessage());
		}
	}
}

```

.hikari.HikariConfig - Failed to load driver class oracle.jdbc.driver.OracleDriver from HikariConfig class classloader 에러가 발생했었음

- XML프로젝트에만 JDBC Driver의 jar파일을 추가해주어서, 해당 프로젝트에도 추가해주었더니 해결됐음.

---

### MyBatis와 스프링의 연동

MyBatis : SQL 매핑 프레임워크

- mybatis-spring(스프링에서 동작) - MyBatis(이 둘을 연결해줌) - DB

---

#### XML을 이용하는 경우

pom.xml에 mybatis-spring과 MyBatis라이브러리를 추가해준다

Mybatis에서 핵심적인 객체는 SQLSession, SQLSessionFactory



root-context.xml

```xml
		
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	<property name="dataSource" ref="dataSource"></property></bean>
<!-- SqlSessionFactory을 등록하는 작업은 SqlSessionFactoryBean을 이용. Mybatis의 패키지가 아닌, 스프링과 연동작업을 처리하는 mybatis-spring라이브러리이다.-->
<mybatis-spring:scan base-package="패키지경로">
</mybatis-spring:scan> <!-- 지정된 패키지의 모든 mybatis관련 어노테이션을 찾아 처리한다. -->
```

테스트코드는 아래의 java경우에서 .contextconfiguration의 문자열 부분만 수정하여 테스트하면 된다.



---

#### JAVA를 이용하는 경우

RootConfig 클래스에 @Bean을 이용해서 설정

```java
@Bean
public SqlSessionFactory sqlSessionFactory() throws Exception{
	SqlSessionFactoryBean sqlSessionFactory = new
	SqlSessionFactoryBean();
	sqlSEssionFactory.setDataSource(dataSource());
	return (SqlSessionFactory) sqlSessionFactory.getObject();
}
```



TimeMapper.java 인터페이스 작성

```java
package org.zerock.mapper;

import org.apache.ibatis.annotations.Select;

public interface TimeMapper {

	@Select("SELECT sysdate FROM dual")
	public String getTime();
}
```

TimeMapperTests.java 테스트파일 작성

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { org.zerock.config.RootConfig.class })
@Log4j
public class TimeMapperTests {

	@Setter(onMethod_ = @Autowired)
	private TimeMapper timeMapper;
	
	@Test
	public void testGetTime() {
		log.info(timeMapper.getClass().getName());
		log.info(timeMapper.getTime());
	}
}

```

여기까지 완료하면 JAVA로는 연동을 확인할 수 있다.



---

### XML 매퍼와 같이 쓰기

mybatis를 통해 SQL처리시 어노테이션을 이용하는 것이 압도적 편리.. 그러나 길어지면 XML을 사용

XML작성시 XML파일의 위치와 XML파일에 지정하는 namespace속성이 중요

src/main/resource 하위에, 패키지명(. 기준)의 하위패키지들을 생성한다

org->zerock->mapper 순서로 하나씩 (한꺼번에 하면 에러발생할 수도 있음)

TimeMapper.xml 폴더를 작성한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
	PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
	<mapper namespace="org.zerock.mapper.TimeMapper"> 
	
	<select id="getTime2" resultType="string">
	SELECT sysdate FROM dual
	</select>
	
	</mapper>
```

- mybatis는 Mapper 인터페이스와 XML을, **인터페이스 이름**과 namespace 속성 값을 갖고 판단한다.
- org.zerock.mapper 하위에 TimeMapper **인터페이스* * 가 존재하고, XML파일의 namespace가 동일하면, 이를 병합해서 처리한다.
- 다시말해 메소드 선언은 인터페이스 내에 존재하고, SQL에 대한 처리는 XML을 이용하는 방식
- 그렇다면 지금까지 했던 인터페이스와 implement이 구분지어진다는 것이 이에 대한 이유 때문인거네.

```java
	@Test
	public void testGetTime2() {
		log.info("getTime2");
		log.info(timeMapper.getTime2());
	}
```

해당 내용을 테스트파일에 추가 작성하여 테스트를 확인한다.

---

##  SQL 로그 설정

- SQL로그를 보기위해서는 log4jdbc-log4j2 라이브러리를 사용해야한다

```xml
		<dependency>
		    <groupId>org.bgee.log4jdbc-log4j2</groupId>
		    <artifactId>log4jdbc-log4j2-jdbc4</artifactId>
		    <version>1.16</version>
		</dependency>
```

- src/main/resources 하위에 log4jdbc.log4j2.properties파일을 작성한다.

  ```
  log4jdbc.spylogdelegator.name=net.sf.log4jdbc.log.slf4j.Slf4jSpyLogDelegator
  ```

- root-context 내용을 변경한다.

```xml
	<bean id="hikariConfig" class="com.zaxxer.hikari.HikariConfig">
	<!-- 	<property name="driverClassName"
			value="oracle.jdbc.driver.OracleDriver">
		</property>
		<property name="jdbcUrl"
			value="jdbc:oracle:thin:@localhost:1521:XE"></property>
			 -->
			 <property name="driverClassName"
			 	value="net.sf.log4jdbc.sql.jdbcapi.DriverSpy"></property>
			 	<property name="jdbcUrl"
			 	value="jdbc:log4jdbc:oracle:thin:@localhost:1521:XE"></property>
			<property name="username" value="book_ex"></property>
			<property name="password" value="book_ex"></property>
	</bean>	
```

- 실행 결과

```
INFO : jdbc.resultsettable - 
|--------------------|
|sysdate             |
|--------------------|
|2020-05-12 14:31:01 |
|--------------------|
```



#### Java로 하는 경우

RootConig의 DataSource부분에서, 문자열 변경만 하면 된다.

물론, properties파일은 작성해야하고.

```java
	hikariConfig.setDriverClassName("net.sf.log4jdbc.sql.jdbcapi.DriverSpy");
		hikariConfig.setJdbcUrl("jdbc:log4jdbc:oracle:thin:@localhost:1521:XE");
```

여기까지 마친 뒤, Test코드를 수행하면 마찬가지로 SQL의 로그기록을 볼 수 있다.

로그레벨 설정은, log4.xml에서 info대신 보고싶은 로그의 레벨을 작성하면 된다.





여기까지가 스프링을 진행하기 위한 기본적인 설정..