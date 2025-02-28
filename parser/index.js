const acorn = require('acorn');
const walk = require('acorn-walk');
const fs = require('fs');

// test_p5.js dosyasını oku
const code = fs.readFileSync('test_p5.js', 'utf-8');
const ast = acorn.parse(code, { ecmaVersion: 2020 });

let found_collections = [];
let found_traits = [];

walk.simple(ast, {
  VariableDeclarator(node) {
    if (node.init && node.init.type === 'CallExpression' && node.init.callee.name === 'FormaCollection') {
      const variableName = node.id.name;
      const firstArg = node.init.arguments[0];
      const stringParam = firstArg && firstArg.type === 'Literal' ? firstArg.value : null;

      found_collections.push({
        name: variableName,
        address: stringParam,
      });
    }
  },
});

walk.simple(ast, {
  CallExpression(node) {
    if (node.callee.type === 'MemberExpression' && ['asInt', 'asString', 'asFloat'].includes(node.callee.property.name)) {
      const traitType = node.callee.property.name;

      const innerNode = node.callee.object;
      if (innerNode.type === 'CallExpression' && innerNode.callee.type === 'MemberExpression' && innerNode.callee.property.name === 'metadata') {
        const collectionName = innerNode.callee.object.name;
        const keyArg = innerNode.arguments[0];
        const keyValue = keyArg && keyArg.type === 'Literal' ? keyArg.value : null;

        // Benzersiz kontrol: Aynı collection + key zaten varsa ekleme
        if (!found_traits.some((t) => t.collection === collectionName && t.key === keyValue)) {
          found_traits.push({
            collection: collectionName,
            key: keyValue,
            type: traitType,
          });
        }
      }
    }
  },
});


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

fs.writeFileSync('newFile.js', modifiedCode, 'utf8');

console.log("Yeni dosya oluşturuldu: newFile.js");

console.log('Yeni dosya oluşturuldu: newFile.js');

// 🔥 Sonuçları göster
console.log('🔎 Found Collections:', found_collections);
console.log('🎯 Found Traits:', found_traits);

console.log('📝 Generated Code:');