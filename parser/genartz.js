const analyze = require('./analyze');
const process = require('./process');
const compress = require('./compress');
const solGenerator = require('./sol.generator');


const fs = require('fs');


const code = fs.readFileSync('test_p5.js', 'utf-8');

const p5Data = analyze.analyzeCode(code);

console.log(p5Data);


