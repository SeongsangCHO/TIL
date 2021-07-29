function solution(bridge_length, weight, truck_weights) {
  var answer = 1;
  let truck_weights2 = truck_weights.map((weight) => {
    return [weight, 0];
  });
  let currWeight = 0;
  let nextWeight = 0;
  let totalWeight = currWeight + nextWeight;
  let passingTruck = [];
  while (truck_weights.length > 0) {
    if (weight >= totalWeight + nextWeight) {
      // 10 >= 7 + 0
      if (truck_weights2.length > 0) {
        passingTruck.push(truck_weights2.shift()); // [7,0];
        totalWeight += passingTruck[passingTruck.length - 1][0];
      }
    }
    //전진
    passingTruck = passingTruck.map((arr) => {
      arr[1]++;
      return arr;
    });
    if (passingTruck[0][1] === bridge_length) {
      //도착했을 때
      let passingWeight = truck_weights.shift();
      passingTruck.shift();
      totalWeight -= passingWeight;
    }
    if (truck_weights2.length > 0) {
      nextWeight = truck_weights2[0][0];
    }
    answer++;
  }
  // [0,0,0] 길이 2인 다리를 지나갈 때 3초걸림
  // [1,0,0]
  // [0,1,0]
  // [0,0,1] => done
  return answer;
}

console.log(solution(100, 100, [10]));
console.log(solution(2, 10, [7, 4, 5, 6]));
console.log(solution(100, 100, [10,10,10,10,10,10,10,10,10,10]));
