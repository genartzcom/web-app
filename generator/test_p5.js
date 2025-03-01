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



const MAMOTH = FormaCollection("0xC737D98ce1DDdd49295C1507a015600f8ae1D18C");


// ****************************************************************************************************
/*
By Okazz
*/
let colors = ['#f71735', '#067bc2', '#FFC247', '#ffffff', '#232524'];
let ctx;

function setup() {
  createCanvas(900, 900, WEBGL);

  let color = MAMOTH.metadata('background').asString();

  rectMode(CENTER);
  textureMode(NORMAL);
  translate(-width / 2, -height / 2);
  ctx = drawingContext;
  let shapeSize = width * 0.19;
  background(0);
  let y = 0;
  let w = shapeSize * sin(PI / 3);
  while (y < height * 1.1) {
    let x = 0;
    while (x < width * 1.1) {
      drawBox(x, y, shapeSize * 0.8);
      drawBox(x + w / 2, y + w * sin(TAU / 6), shapeSize * 0.8);
      x += w
    }
    y += w * sin(TAU / 6) * 2;
  }
}

function draw() {

}

function drawBox(x, y, w) {
  shuffle(colors, true);
  let clr = colors[0];
  noStroke();
  for (let i = 0; i < 3; i++) {
    fill(colors[0]);
    drawRhombus(x, y, w, (TAU / 3 * i));
    texture(createGrfx(w / 2));
    drawRhombus(x, y, w, (TAU / 3 * i));
  }
  fill(0, 70);
  drawRhombus(x, y, w, TAU / 3);
  fill(255, 40);
  drawRhombus(x, y, w, TAU / 3 * 2);

}

function drawRhombus(x, y, w, ang) {
  push();
  translate(x, y);
  rotate(ang);
  beginShape();
  vertex(0, 0, 0, 0);
  vertex(w * 0.5 * cos(-PI / 6), w * 0.5 * sin(-PI / 6), 1, 0);
  vertex(w * 0.5 * cos(-PI / 2), w * 0.5 * sin(-PI / 2), 1, 1);
  vertex(w * 0.5 * cos(-PI + PI / 6), w * 0.5 * sin(-PI + PI / 6), 0, 1);
  endShape(CLOSE);
  pop();
}

function createGrfx(w) {
  let grfx;
  grfx = createGraphics(w, w);
  grfx.rectMode(CENTER);
  let row = int(random(1, 6));
  let col = int(random(1, 6));
  let cellW = w / col;
  let cellH = w / row;
  let margin = width * 0.008;
  grfx.fill(colors[int(random(colors.length - 1)) + 1]);
  grfx.noStroke();
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let cellX = i * cellW + cellW / 2;
      let cellY = j * cellH + cellH / 2;
      grfx.rect(cellX, cellY, cellW - margin, cellH - margin);
    }
  }
  return grfx;
}