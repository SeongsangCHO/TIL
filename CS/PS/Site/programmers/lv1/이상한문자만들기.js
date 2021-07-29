function solution(s) {
    var answer = '';
    s = s.toLowerCase();
    let arr = s.split(' ');
    for(let i = 0; i < arr.length; i++){
        for(let value in arr[i]){
            if(value % 2 == 0){
                answer += arr[i][value].toUpperCase();
            } else{
                answer += arr[i][value];
            }
        }
        if(i != arr.length)
         answer += ' ';
    }
    return answer;
}

console.log(solution("try hello world"));
