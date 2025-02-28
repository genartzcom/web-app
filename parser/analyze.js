const acorn = require('acorn');
const walk = require('acorn-walk');

function analyzeCode(code) {
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

  return {
    collections: found_collections,
    traits: found_traits,
  };
}



module.exports = {
  analyzeCode
}
