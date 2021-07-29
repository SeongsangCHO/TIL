const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let date = new Date(`2020-${11}-${4}`);
let day = date.getDay();
console.log(DAYS[day]);
