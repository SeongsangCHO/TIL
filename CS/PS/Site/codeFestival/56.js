const nationWidth = {
  korea: 220877,
  rusia: 17098242,
  china: 9596961,
  france: 543965,
  japan: 377915,
  england: 242900,
};

const koreaWidth = nationWidth["korea"];
delete nationWidth['korea']
let entry = Object.entries(nationWidth);
let value = Object.values(nationWidth);

let gap = Math.max(...value);

let item = [];

for (let i of entry){
  if (gap > Math.abs(i[1] - koreaWidth)){
    gap = Math.abs(i[1] - koreaWidth);
    item = i;
  }
}
console.log(item[0], item[1] - koreaWidth);

