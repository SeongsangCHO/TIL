```
//10 * 10 (0 ~ 9까지의 인덱스) 맵에서 지뢰의 갯수를 랜덤하게 넣을 위치생성
//hor * ver = 범위
//mine = 지뢰의 갯수
//0~99에서 20개 데이터 랜덤 뽑기

var mineTmpArr = [];
var mineArr = [];

var numCandidate =  Array(10 * 10)
.fill()
.map(function(val, index){
    return index + 1;
});

while(numCandidate.length > 0)
{
    var tmp = numCandidate.splice([Math.floor(Math.random() * (numCandidate.length))], 1)[0];
    mineTmpArr.push(tmp);
}
mineArr = mineTmpArr.slice(0, 21);
//mine의 갯수만큼 반복문을 돌고,
//돌면서 x,y의 인덱스를 구해야함
// y는 mineArr의 값을 10으로 나눈 나머지값,
// x는 mineArr의 값을 10으로 나눈 값
//ex) 25면 y는 25 % 10 = 5, x는  25 / 10 = 2 (2,5)이다. 인덱스니까 -1처리
//예외 0~9까지는 x는 오직 0,  0일때는 y의 값이 0. -1처리를 하면 에러발생
//mineArr가 10보다 작을경우 따로 처리


console.log(mineArr);


document.querySelector('#exec').addEventListener('click',function(){
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);

     var dataSet = [];
     var tbody = document.querySelector('#table tbody');
     for(var i = 0; i < ver; i++)
     {
         var tr = document.createElement('tr');
         var rowArr
         var arr = [];
         dataSet.push(arr);
         for(var j = 0; j < hor; j++)
         {
             var td = document.createElement('td');
             tr.appendChild(td);
             arr.push(1);  
         }
         tbody.appendChild(tr);
     }
     for(var i = 0; i < mineArr.length; i++)
     {
        var y = (mineArr[i] % 10) - 1;
        var x = parseInt((mineArr[i] / 10) - 1);
        if(mineArr[i] == 0)
            y++;
        if(mineArr[i] <= 10)
            x = 0;
        dataSet[x][y] = '*';
        console.log("mineArr"+i+": "+mineArr[i] + " " +"y : " + y+" x: "+ x);

     }

     console.log(dataSet);
});
```

