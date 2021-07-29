## 스프링 #05 SQL 로그 설정

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