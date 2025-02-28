const walk = require("acorn-walk");
const acorn = require("acorn");

export function process(code) {
  const ast = acorn.parse(code, { ecmaVersion: 2020 });

  const removalRanges = [];
  walk.simple(ast, {
    VariableDeclaration(node) {
      if (node.declarations.some(dec => dec.init && dec.init.type === 'CallExpression' && dec.init.callee.name === 'FormaCollection')) {
        removalRanges.push({ start: node.start, end: node.end });
      }
    },
  });

  removalRanges.sort((a, b) => b.start - a.start);

  let modifiedCode = code;
  removalRanges.forEach(range => {
    modifiedCode = modifiedCode.slice(0, range.start) + modifiedCode.slice(range.end);
  });

  return modifiedCode;
}