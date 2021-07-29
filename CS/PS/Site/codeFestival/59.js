const s = 'hio';

const n = 25 + Math.floor(s.length / 2);

const left = s.padStart(n, '=');

const answer = left.padEnd(50, '=');
console.log(answer);
