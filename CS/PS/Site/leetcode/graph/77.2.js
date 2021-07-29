/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
 var combine = function(n, k) {
   let lst = Array(n).fill(0).map((_,idx) => idx + 1);
   const result = []
   function dfs(tmp, start){
     if (tmp.length === k){
       result.push([...tmp]);
       return;
     }
     for(let i = start; i < n; i++){
       tmp.push(lst[i]);
       dfs(tmp, i + 1);
       tmp.pop();
     }
   }
   dfs([], 0);
   return result
};

console.log(combine(4, 2));
