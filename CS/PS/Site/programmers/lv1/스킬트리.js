function solution(skill, skill_trees) {
  var answer = skill_trees.length;
  for (let tree of skill_trees) {
    let len = tree.length;
    let index = 0;
    for (let i = 0; i < len; i++) {
      if (skill.includes(tree[i])) {
        if (skill[index] == skill[skill.indexOf(tree[i])]) {
          index++;
        } else {
          answer--;
          break;
        }
      }
    }
  }
  return answer;
}

let a = ["BACDE", "CBADF", "AECB", "BDA"];
let b = ["B", "D", "A"];
console.log(solution("CBD", a));
