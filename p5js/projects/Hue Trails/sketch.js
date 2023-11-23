let x, y, xoff, yoff, r, grow, h, s, b;

function setup() {
  noCursor();
  colorMode(HSB);
  rectMode(CENTER);
  if (windowHeight > windowWidth) {
    cnv = createCanvas(windowWidth, windowWidth);
  } else {
    cnv = createCanvas(windowHeight, windowHeight);
  }
  background(3);

  x = width * 0.5;
  y = height * 0.5;
  r = 0;

  xoff = 0;
  yoff = 0;

  grow = true;

  h = 0;
  s = 0;
  b = 100;

  hueDir = true;
}

function draw() {
  fill(100);

  x = noise(xoff) * width;
  y = noise(yoff) * height;

  xoff += 0.005;
  yoff += 0.004;

  if (r > 200) {
    grow = false;
  } else if (r < 5) {
    grow = true;
  }

  if (grow) {
    r += 0.1;
    constrain((s += 0.1), 0, 100);
  } else {
    r -= 0.1;
    constrain((s -= 0.1), 20, 100);
  }

  if (h < 0) {
    hueDir = true;
  } else if (h > 360) {
    hueDir = false;
  }
  if (hueDir) {
    constrain((h += 0.1), 0, 360);
  } else {
    constrain((h -= 0.1), 0, 360);
  }

  stroke(0, 0.6);
  fill(h, s, b);
  circle(x, y, r);
}
