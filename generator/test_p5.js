class AMetadataAttribute {
  constructor(key, type, value) {
    this.key = key;
    this.type = type;
    this.value = value;
  }

  asString() {}

  asInt() {}

  asFloat() {}
}

class AFormaCollection {
  constructor(address) {
    this.address = address;
    this.require = false;
    this.metadatas = {};
  }

  metadata(key) {
    return new AMetadataAttribute(key, 'value', 'test');
  }

  exists() {
    return true;
  }

  require() {
    this.require = true;
  }
}

function FormaCollection(address) {
  return new AFormaCollection(address);
}


// ----------------------------------------------------------------------------------------------------



const MAMMOTHS = FormaCollection("0x1234");
const OTHER = FormaCollection("0x5678");



// ****************************************************************************************************

function setup() {

}

function draw() {
  background(255);

  let v = 0;
  if (MAMMOTHS.exists()) {
    let u = MAMMOTHS.metadata("anan").asString();
  } else {
    let l = OTHER.metadata("baban").asInt();
  }

  let cap = MAMMOTHS.metadata("cap").asString();

  noLoop();
}
