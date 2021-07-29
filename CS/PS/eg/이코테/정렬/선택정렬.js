let array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

let length = array.length;
for(let i = 0 ; i < length; i++){
  let min = i;
  for(let j = i + 1; j < length; j++){
    if(array[j] < array[min])
      min = j;
  }
  let tmp = array[i];
  array[i] = array[min];
  array[min] = tmp;
}
