import { Collection, Trait, TraitData } from './analyze';

const SOL_COLLECTION_FIELD: string = 'address private constant %COLLECTION% = %ADDRESS%;';
const SOL_COLLECTION_INDEX: string = 'uint256 private constant %COLLECTION%_INDEX = %INDEX%;';

const SOL_P5_CHUNK: string = 'string private constant CHUNK_%INDEX% = "%DATA%"';

const SOL_METADATA_VARIABLE: string =
  'string memory m_%METADATA_VAR% = %COLLECTION%.getTokenAttribute(_tokenId%COLLECTION_PARAM%, "%METADATA_NAME%");';

const SOL_COLLECTION_INDEXES: string = 'uint256 memory _tokenId%COLLECTION_PARAM% = _tokenIds[%COLLECTION%_INDEX];';

const SOL_MINT_PARAMS: string = 'uint256 _tokenId%COLLECTION_PARAM%';
const SOL_REQUIRE_TOKEN: string = 'require(IERC721(%COLLECTION%).ownerOf(_tokenId%COLLECTION_PARAM%) == _msgSender(), "Not %COLLECTION_MSG% owner");';

export function solidity_generateP5Chunks(chunks: string[]): string {
  let code: string = '';
  for (let i = 0; i < chunks.length; i++) {
    code += SOL_P5_CHUNK.replace('%INDEX%', i.toString()).replace('%DATA%', chunks[i]) + '\n';
  }
  return code;
}

export function solidity_generateCollectionFields(collections: Collection[]): string {
  let code: string = '';
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    if (collection.address === null) {
      continue;
    }
    code += SOL_COLLECTION_FIELD.replace('%COLLECTION%', collection.name).replace('%ADDRESS%', collection.address) + '\n';
  }
  return code;
}

export function solidity_generateCollectionIndexes(collections: Collection[]): string {
  let code: string = '';
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    if (collection.address === null) {
      continue;
    }
    code += SOL_COLLECTION_INDEX.replace('%COLLECTION%', collection.name).replace('%INDEX%', i.toString()) + '\n';
  }
  return code;
}

export function solidity_generateMetadataVariables(traits: Trait[]): string {
  let code: string = '';
  for (let i = 0; i < traits.length; i++) {
    const trait = traits[i];

    if (trait.collection === null) {
      continue;
    }
    if (trait.key === null) {
      continue;
    }

    const fieldName = naming(trait.key);
    const tokenParamName = naming(trait.collection);

    code +=
      SOL_METADATA_VARIABLE.replace('%METADATA_VAR%', fieldName)
        .replace('%COLLECTION%', trait.collection)
        .replace('%METADATA_NAME%', trait.key)
        .replace('%COLLECTION_PARAM%', tokenParamName) + '\n';
  }
  return code;
}

export function solidity_generateTokenIdIndexes(collections: Collection[]): string {
  let code: string = '';
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    if (collection.address === null) {
      continue;
    }
    code += SOL_COLLECTION_INDEXES.replace('%COLLECTION%', collection.name).replace('%COLLECTION_PARAM%', naming(collection.name)) + '\n';
  }
  return code;
}

export function solidity_generateRequireToken(collections: Collection[]): string {
  let code: string = '';
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    if (collection.address === null) {
      continue;
    }
    code +=
      SOL_REQUIRE_TOKEN.replace('%COLLECTION%', collection.name)
        .replace('%COLLECTION_MSG%', naming(collection.name))
        .replace('%COLLECTION_PARAM%', naming(collection.name)) + '\n';
  }
  return code;
}

export function solidity_generateMintParams(collections: Collection[]): string {
  let code: string = '';
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    if (collection.address === null) {
      continue;
    }
    code += SOL_MINT_PARAMS.replace('%COLLECTION_PARAM%', naming(collection.name)) + (i < collections.length - 1 ? ', ' : '');
  }
  return code;
}

export function solidity_generateTraitStuffs(data: TraitData[]): string {
  let code: string = '';
  for (let i = 0; i < data.length; i++) {
    const trait = data[i];
    for (let j = 0; j < trait.traits.length; j++) {
      const tr = trait.traits[j];
      code += `_traitRegistry[${trait.collection}_INDEX].push(TraitRegistry("${tr.type}", "${tr.key}"));\n`;
    }
    code += `_traitRegistrySize[${trait.collection}_INDEX] = ${trait.traits.length};\n`;
  }
  return code;
}

function naming(name: string): string {
  return capitalize(name.trim().toLowerCase().replaceAll('\\s+', '_'));
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function solidity_generateTraitFields(): string {
  return '';
}
