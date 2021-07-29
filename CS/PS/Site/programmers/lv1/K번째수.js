function solution(array, commands) {
  var answer = [];
  let commandsLength = commands.length;

  for(let command of commands){
    let slicedArray = array.slice(command[0] - 1, command[1]);
    slicedArray.sort((a,b) => a-b);
    answer.push(slicedArray[command[2] - 1] );
    console.log(slicedArray)
  }
  return answer;
}

console.log(
  solution(
    [1, 5, 2, 6, 3, 7, 4],
    [
      [2, 5, 3],
      [4, 4, 1],
      [1, 7, 3],
    ]
  )
);
