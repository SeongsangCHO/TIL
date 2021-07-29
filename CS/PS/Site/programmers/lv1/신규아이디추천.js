function oneStep(id) {
  let lowerCase = [...id];
  for (let i = 0; i < id.length; i++) {
    if (lowerCase[i] >= "A" && lowerCase[i] <= "Z") {
      lowerCase[i] = lowerCase[i].toLowerCase();
    }
  }

  return lowerCase;
}

function twoStep(id) {
  let arr = [...id];
  arr = arr.filter((letter) => {
    return (
      (letter >= "a" && letter <= "z") ||
      letter === "-" ||
      letter === "_" ||
      letter === "." ||
      (letter >= "0" && letter <= "9")
    );
  });
  return arr;
}
let three;
function threeStep(id) {
  three = id;
  
  if (three.includes("..")) {
    three = three.replace("..", ".");
    threeStep(three);
  } else {
    return three;
  }
  
  return three;
}

function forthStep(id) {
  if (id[0] === ".") {
    id.shift();
  }
  if (id[id.length - 1] === ".") {
    id.pop();
  }
  return id;
}

function fifthStep(id) {
  if (id.length === 0) {
    return "a";
  } else {
    return id;
  }
}

function sixStep(id) {
  if (id.length >= 16) {
    id = id.slice(0, 15);
    if (id[14] === ".") {
      id.pop();
    }
  }
  return id;
}

function lastStep(id) {
  while (id.length < 3) {
    id = [...id, id[id.length-1]];
  }
  return id;
}
function solution(new_id) {
  var answer = "";
  let oneParse = oneStep(new_id);
  let twoParse = twoStep(oneParse);
  let threeParse = threeStep(twoParse.join(""));
  
  let forthParse = forthStep(threeParse.split(""));
  let fifthParse = fifthStep(forthParse);
  let sixParse = sixStep(fifthParse);
  let lastParse = lastStep(sixParse);
  return lastParse.join("");
}

console.log(solution("=.="));
