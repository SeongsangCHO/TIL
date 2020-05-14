## 스프링 #02 Lombok 및 어노테이션 정리

컴파일시 코드를 작성하는 기능을 완성해주는 라이브러리

@Setter

- setter 메소드를 만들어 줌
- 3가지 속성 부여

value : 접근 제한 속성

onMethod : setter메소드 생성시 메소드에 추가할 어노테이션 지정

​					예제에는 @Autowired 지정

onParam: setter 메소드의 파라미터에 어노테이션을 사용하는 경우에 적용.



@Data

- @Tostring, @EqulasAndHashCode, @Getter/ @Setter, @RequiredArgsConstructor 모두 생성

## 스프링 관련

@Component

- 해당 클래스가 스프링에서 객체로 만들어 관리하는 대상임을 명시
- @ComponentScan을 통해 패키지의 클래스들을 조사하면서 @Component가 존재하는 클래스들을 빈으로 관리

@Autowired

- 스프링 내부에서 자신이 특정한 객체에 의존적이므로, 해당되는 타입의 빈을 주입해주라는 표시
- Restaurant는 Chef타입 객체가 필요하므로 (@Setter(onMethod = @Autowired))private Chef chef; 이를 확인하고 자동으로 주입 - 그렇다면 스프링에서 이를 주입하기 위해서 관리하고있는 빈(객체)들을 주입해주어야하는데, 빈으로 등록하기 위해서는 Chef 클래스에 Component 어노테이션을 작성해주어야함



### 생성자 주입

@Autowired 대신 생성자 주입

```java
@Component
@ToString
@Getter
public class SampleHotel
{
	private Chef chef;
	
	public SampleHotel(Chef chef){
		this.chef = chef;
	}
}
```

생성자를 이용한 의존성 주입



생성자 자동주입 + LOMBOK

```java
@Component
@ToString
@Getter
@AllArgsConstructor
public class sampleHotel
{
	private Chef chef;
}

```

@AllArgsConstructor은 인스턴스 변수로 선언된 모든 것을 파라미터로 받는 생성자를 작성한다.

여러개의 인스턴스 변수들 중에서 특정 변수에 대해서만 생성작를 작성하고 싶다면, @NonNull과 @RequiredArgsConstructor을 이용할 수 있다.

```java
@Component
@ToString
@Getter
@RequiredArgsConstructor
public class sampleHotel
{
    @NonNull
	private Chef chef;
}

```

