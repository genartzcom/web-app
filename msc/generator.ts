export interface TraitDefinition {
  type: string;
  value: any;
}

export function generateFormaCollectionCode(collectionName: string, traits: Record<string, TraitDefinition>): string {
  let code: string = `const ${collectionName} = {\n`;
  code += `  traits: {\n`;

  for (const [key, typeValue] of Object.entries(traits) as [string, TraitDefinition][]) {
    code += `    "${key}": {\n`;
    code += `      ${typeValue.type}() {\n`;
    code += `        return ${JSON.stringify(typeValue.value)};\n`;
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
