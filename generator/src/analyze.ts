import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

export interface Collection {
  name: string;
  address: string | null;
}

export interface Trait {
  collection: string;
  key: string | null;
  type: string;
}

export interface TraitData {
  collection: string;
  traits: Trait[];
}

export function analyzeCode(code: string): {
  collections: Collection[];
  traits: Trait[]
  data: TraitData[];
} {
  const ast = acorn.parse(code, { ecmaVersion: 2020 }) as acorn.Node;

  const found_collections: Collection[] = [];
  const found_traits: Trait[] = [];

  walk.simple(ast, {
    VariableDeclarator(node: any) {
      if (node.init && node.init.type === 'CallExpression' && node.init.callee.name === 'FormaCollection') {
        const variableName: string = node.id.name;
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
    CallExpression(node: any) {
      if (node.callee.type === 'MemberExpression' && ['asInt', 'asString', 'asFloat'].includes(node.callee.property.name)) {
        const traitType: string = node.callee.property.name;

        const innerNode = node.callee.object;
        if (innerNode.type === 'CallExpression' && innerNode.callee.type === 'MemberExpression' && innerNode.callee.property.name === 'metadata') {
          const collectionName: string = innerNode.callee.object.name;
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

  const currentData: TraitData[] = [];

  found_traits.forEach((trait) => {
    const existingData = currentData.find((d) => d.collection === trait.collection);
    if (existingData) {
      existingData.traits.push(trait);
    } else {
      currentData.push({
        collection: trait.collection,
        traits: [trait],
      });
    }
  });

  return {
    collections: found_collections,
    traits: found_traits,
    data: currentData,
  };
}
