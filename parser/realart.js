// By Roni Kaufman
// https://ronikaufman.github.io

let baseImg;
const N_FRAMES = 250;

function setup() {
  createCanvas(500, 500);

  baseImg = createGraphics(width, height);
  baseImg.noStroke();
  baseImg.background(0);
  let palette = ["#14976b", "#2b67af", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
  let thetaStep = TAU/palette.length;
  for (let i = 0; i < palette.length; i++) {
    gradientArc(width/2, height/2, 320, thetaStep*i, thetaStep*(1+i), palette[i], palette[(i+1)%palette.length], baseImg);
  }
  baseImg.filter(BLUR, 2);

  pixelDensity(2);
  //noLoop();
  noStroke();
}

function draw() {
  clear();
  blendMode(ADD);
  background(0);
  let scl = 6; // scale

  let img = createImage(baseImg.width, baseImg.height);
  img.copy(baseImg, 0, 0, baseImg.width, baseImg.height, 0, 0, baseImg.width, baseImg.height);
  img.resize(floor(width/scl), floor(height/scl));

  let pg = createGraphics(img.width, img.height);
  pg.pixelDensity(1);
  pg.translate(img.width/2, img.height/2);
  pg.rotate(TAU*(frameCount%N_FRAMES)/N_FRAMES);
  pg.translate(-img.width/2, -img.height/2);
  for (let mode of ["r", "g", "b"]) {
    pg.image(img, 0, 0);
    dithering(pg, mode);
    drawPixels(pg, scl);
  }
  pg.remove();
  pg = undefined;
}

// gradient

function gradientArc(x, y, d, theta1, theta2, col1, col2, grph) {
  let thetaStep = (theta2-theta1)/100;
  for (let theta = theta1; theta < theta2; theta += thetaStep) {
    let t = map(theta, theta1, theta2, 0, 1);
    let col = lerpColor(color(col1), color(col2), t);
    grph.fill(col);
    grph.arc(x, y, d, d, theta, theta+thetaStep);
  }
}

// Floyd–Steinberg dithering

function dithering(pg, mode) {
  pg.loadPixels();
  for (let x = 0; x < pg.width; x += 1) {
    for (let y = 0; y < pg.height; y += 1) {
      let v = getPixel(pg, x, y, mode);
      let error;
      if (v > 128) {
        setPixel(pg, x, y, 255, mode);
        error = v - 255;
      } else {
        setPixel(pg, x, y, 0, mode);
        error = v;
      }
      if (x < pg.width - 1) {
        setPixel(pg, x + 1, y, getPixel(pg, x + 1, y, mode) + (error * 7) / 16, mode);
      }
      if (y < pg.height - 1) {
        if (x > 0) {
          setPixel(pg, x - 1, y + 1, getPixel(pg, x - 1, y + 1, mode) + (error * 3) / 16, mode);
        }
        setPixel(pg, x, y + 1, getPixel(pg, x, y + 1, mode) + (error * 5) / 16, mode);
        if (x < pg.width - 1) {
          setPixel(pg, x + 1, y + 1, getPixel(pg, x + 1, y + 1, mode) + (error * 1) / 16, mode);
        }
      }
    }
  }
  pg.updatePixels();
}

function getPixel(pg, x, y, mode) {
  let offset = mode == "r" ? 0 : (mode == "g" ? 1 : 2);
  return pg.pixels[4 * (round(y) * pg.width + round(x)) + offset];
}

function setPixel(pg, x, y, col, mode) {
  let idx = 4 * (round(y) * pg.width + round(x));
  pg.pixels[idx] = mode == "r" ? col : 0;
  pg.pixels[idx + 1] = mode == "g" ? col : 0;
  pg.pixels[idx + 2] = mode == "b" ? col : 0;
}

function drawPixels(pg, scl) {
  for (let x = 0; x < pg.width; x += 1) {
    for (let y = 0; y < pg.height; y += 1) {
      let idx = 4 * (round(y) * pg.width + round(x));
      let r = pg.pixels[idx] > 120 ? 255 : 0;
      let g = pg.pixels[idx + 1] > 120 ? 255 : 0;
      let b = pg.pixels[idx + 2] > 120 ? 255 : 0;
      fill(r, g, b);
      square(x*scl, y*scl, scl);
    }
  }
}