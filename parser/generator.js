export function generateFormaCollectionCode(collectionName, traits) {
  let code = `const ${collectionName} = {\n`;
  code += `  traits: {\n`;

  for (const [key, typeValue] of Object.entries(traits)) {
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