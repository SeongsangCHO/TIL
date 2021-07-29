const a = '복잡한 세상 편하게 살자 치킨 먹방 스파이시';

let answer = a.split(' ').map((value) => value[0]).join('');
console.log(answer);
