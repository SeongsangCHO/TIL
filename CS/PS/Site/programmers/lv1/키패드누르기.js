function findPos(numbers,keyPad){
  for(let [row, arr] of keyPad.entries()){
    let colPos = arr.indexOf(numbers);
    if(colPos > -1){
      return [row, colPos];
    }
  }
}

function solution(numbers, hand) {
  var answer = '';
  let keyPad = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    ['*',0,'#']
  ];
  
  let leftCurr = [3,0];
  let rightCurr = [3,2];
  let length = numbers.length;
  for(let i = 0; i < length; i++){
    let currNum = numbers[i];
    let numPos = findPos(numbers[i], keyPad);
    if(numbers[i] === 1 || numbers[i] === 4 || numbers[i] === 7){
      leftCurr = numPos;
      answer += 'L';
      continue;
    } else if (numbers[i] === 3 || numbers[i] === 6 || numbers[i] === 9){
      rightCurr = numPos;
      answer += 'R';
      continue;
    } else {
      //2580일때
      let leftGap = Math.abs(leftCurr[0] - numPos[0]) + Math.abs(leftCurr[1] - numPos[1]);
      let rightGap = Math.abs(rightCurr[0] - numPos[0]) + Math.abs(rightCurr[1] - numPos[1]);
      // console.log('numbers[i]: ', numbers[i], 'left Gap : ', leftGap,  'prevLeftPos', keyPad[leftCurr[0]][leftCurr[1]], 'numPos: ',numPos, 'leftCurr: ',leftCurr);
      // console.log( 'numbers[i]: ',numbers[i],'right Gap: ' ,rightGap,  'prevRighPos', keyPad[rightCurr[0]][rightCurr[1]], 'numPos: ',numPos, 'rightCurr: ',rightCurr);
      if (leftGap > rightGap){
        //left가 더 멀 때
        rightCurr = numPos;
        answer += 'R';
      }
      else if (leftGap < rightGap){
        leftCurr = numPos;
        answer += 'L';
      } else{
        if(hand === "right"){
          rightCurr = numPos;
          answer += 'R';
        } else {
          leftCurr = numPos;
          answer += 'L';
        }
      }

    }
  }
  return answer;
}

// console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"));
console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2],"left"));
// console.log(solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0],"right"));

