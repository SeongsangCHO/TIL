## Java Wrapper 클래스 + 백준 1157 단어공부

<br>



[백준 1157번](https://www.acmicpc.net/problem/1157)을 풀고있는데, 내림차정렬을 하기위해서 Arrays.sort(배열, Collections.reverseOrder());에서 

`reason: no instance(s) of type variable(s) T exist so that int[] conforms to T[]`에러메시지가 발생했다. 일단 해당 메소드부터 살펴봐야겠다.



<br>

### Collections.reverseOrder()

공식문서 내용은 다음과 같다 [ 링크 ](https://docs.oracle.com/javase/9/docs/api/java/util/Collections.html#reverseOrder--)

Arrays.sort에 들어가는 배열은 단순히 []로 되어있다고 배열이 아니다.

제네릭클래스에 필요한 참조형 객체 즉, Wrapper 클래스여야 한다.

나는 int[]nbr을 인수로 넣었기 때문에 당연히 제네릭에 int[]가 conform되지 않는다 라고 에러메시지가 나온 것이다.

Interger []로 된 래퍼클래스를 인수로 넣으면 잘 동작한다.

그렇다면 해당 문제에서 저 메소드를 사용할 수는 없을까?

Interger배열에 크기를 선언하고 초기화하는 방법에 대해서 찾아봐야겠다.

Hard한 방법인지는 모르겠지만 Integer배열을 선언하여 int[]에 존재하는 원소의 값을 각각 할당하는 방법을 적용해보았다.

```java
int alpa[] = new int[26];

//alpa에 값 할당.
Integer arr[] = new Integer[alpa.length()];
int idx = 0;
for(int value : alpa)
	arr[idx++] = value;
Arrays.sort(arr, Collections.reverseOrder());

```

해당 코드로 문제가 해결이 되었지만 다른 방법이 존재할 것 같다.

```java
Integer alpa = new Integer[26];

for(int i = 0; i < str.length; i++)
    alpa[인덱스]  += 1;
//java.lang.NullPointerException 발생
```

널 포인터 익셉션이 발생했다.

객체는 처음에 null값을 갖고 있는데 alpa[index]에 접근할 때 null을 가리키고 있으므로 초기화를 하지 않아서 발생하는 이슈라고 생각했다.

실제로 값을 찍어보니 다음과 같은 값이 나왔다.

```
[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

```



+ wrapper클래스는 참조형이기 때문에 기본값은 null이라고 한다.
+ null은 할당되는 메모리가 없기 때문에 접근할 수 없다.

그렇다면 다시 돌아와서 Collections의 메소드인 reverseOrder()를 사용하기 위해 필요한 객체인 Integer을 초기화하는 방법만 찾으면 해결할 수 있을 것 같다.

`Arrays.fill(alpa,0);` 을 사용해서 값을 초기화했고 원하는 답을 얻을 수 있었다.





### 래퍼클래스

<br>

프로그램에 따라 기본타입의 데이터를 객체로 취급해야하는 경우가 존재.

메소드의 인수가 객체타입만 요구하면, 기본 타입을 그대로 사용할 수 없다.

8개의 기본타입의 데이터를 객체로 포장하는 클래스를 Wrapper 클래스라고한다.



자바의 기본 타입에 대응하여 제공하고 있는 래퍼 클래스는 다음과 같습니다.

| 기본 타입 |  래퍼 클래스  |
| :-------: | :-----------: |
|   byte    |     Byte      |
|   short   |     Short     |
|    int    |  **Integer**  |
|   long    |     Long      |
|   float   |     Float     |
|  double   |    Double     |
|   char    | **Character** |
|  boolean  |    Boolean    |

 

래퍼 클래스 중에서 Integer 클래스와 Character 클래스만이 자신의 기본 타입과 이름이 다름을 주의해야 합니다.

[출처](http://www.tcpschool.com/java/java_api_wrapper)

<br>

### Boxing, UnBoxing

래퍼클래스는 산술 연산을 위한 클래스가 아니므로, 인스턴스에 저장된 값을 변경할 수 없다.

**참조를 위해** 인스턴스를 생성하고 생성된 인스턴스를 **참조**만할 수 있다.

기본타입에서 객체로 변환하는 것을 박싱, 그 반대를 언박싱이라고 한다.

<br>

자바 컴파일러는 박싱, 언박싱을 자동으로 처리해주는데 이를 오토 박싱,언박싱이라고 한다.

```java
Integer num = new Integer(17); // 박싱

int n = num.intValue();        // 언박싱

System.out.println(n);

 

Character ch = 'X'; // Character ch = new Character('X'); : 오토박싱

char c = ch;        // char c = ch.charValue();           : 오토언박싱

System.out.println(c);

//
17
X
```





<br>



결과적으로 정렬을 사용하지 않았다.

그리고 str.toLowcase()메소드를 사용하여 인덱스에 접근하니

메모리초과가 발생해 아스키코드를 이용해 인덱스접근하여 문제를 해결했다.

```java
package ALGO_Study;

import java.util.Scanner;

public class B1157 {
    public static void main(String[] args) {
        int alpa[] = new int[26];
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        for(int i = 0; i < str.length(); i++) {
            if (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z')
                alpa[str.charAt(i) - 65] += 1;
            else
                alpa[str.charAt(i) - 97] += 1;
        }
        int max = -1;
        for(int i = 0; i < 26; i++)
        {
            if (max < alpa[i])
                max = alpa[i];
        }
        int idx = 0;
        int tmp = 0;
        for(int i = 0 ; i < 26; i++)
        {
            if (max == alpa[i]) {
                tmp++;
                idx = i;
            }

        }
        if (tmp == 1)
            System.out.println((char)('A'+idx));
        else
            System.out.println("?");
    }
}

```

