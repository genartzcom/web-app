import { TraitData, Trait } from './analyze';

export function generateFormaCollectionCodes(collections: TraitData[]): string {
  const codes: string[] = [];

  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    codes.push(generateFormaCollectionCode(collection));
  }

  let code: string = '';
  codes.forEach((trait) => {
    code += trait;
  });

  return code;
}

export function generateFormaCollectionCode(collection: TraitData): string {
  let code: string = `const ${collection.collection} = {\n`;
  code += `  traits: {\n`;

  const traits: Trait[] = collection.traits;

  const defaults = {
    asString: "''",
    asInt: 0,
    asFloat: 0.0,
  };

  for (let i = 0; i < traits.length; i++) {
    const trait = traits[i];
    code += `    "${trait.key}": {\n`;
    code += `      ${trait.type}() {\n`;
    code += `        return ${defaults[trait.type]};\n`;
    code += `      }\n`;
    code += `    },\n`;
  }

  code += `  },\n`;
  code += `  metadata(key) {\n`;
  code += `    return this.traits[key];\n`;
  code += `  }\n`;
  code += `};\n`;

  return code;
}
