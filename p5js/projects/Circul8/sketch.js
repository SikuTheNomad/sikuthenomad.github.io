// Circle list
let cs = [];

// Pattern Settings
let settings = {
  hue: 200,
  sat: 100,
  light: 50,
  alpha: 0.25,
  diameter: 0,
  slices: 8,
  layers: 4,
};

function setup() {
  noCursor();
  colorMode(HSL);
  createCanvas(windowWidth, windowHeight);

  // Set diameter based on window size
  if (height > width) {
    settings.diameter = width / 2.1;
  } else {
    settings.diameter = height / 2.1;
  }

  // Make array of circle layers
  makeLayers(settings.layers);
}

function windowResized() {
  // Resize canvas on windowResize
  resizeCanvas(windowWidth, windowHeight);

  // Resize pattern on windowsResize
  if (height > width) {
    settings.diameter = width / 2.1;
  } else {
    settings.diameter = height / 2.1;
  }
}

function draw() {
  // Background color
  background(7);

  // Reset list when triggered
  resetList();

  // Display layers
  for (let i = 0; i < cs.length; i++) {
    let alphaMap = map(i, 0, cs.length, settings.alpha, 0.01);
    cs[i].display(alphaMap);
  }
}

// Draw Circle pattern
class circlePattern {
  constructor(
    // Init Vars
    diameter = settings.diameter,
    slices = 8,
    angle = 0,
    angleSpeed = PI / (360 * 10),
    hue = settings.hue
  ) {
    // Attach Vars
    this.d = diameter;
    this.r = this.d / 2;
    this.angle = angle;
    this.angleSpeed = angleSpeed / 2;
    this.slices = slices;
    this.hue = hue;

    // Color palette
    this.colorPalette = [];
    for (let i = 0; i < this.slices; i++) {
      let color = map(i, 0, this.slices, this.hue - 50, this.hue + 50);
      this.colorPalette.push(color);
    }
  }

  // Draw pattern
  display(alpha = 0.1) {
    this.alpha = alpha;

    // Brush settings
    noFill();
    noStroke();

    push();
    // Translate to screen center
    translate(width / 2, height / 2);
    // Rotate by angle based on slices
    rotate(this.angle);
    // Apply rotation
    this.angle += this.angleSpeed;
    // Draw invisible circle
    ellipse(0, 0, this.d);
    // Draw circles along circumference
    for (let i = 0; i < this.slices; i++) {
      let sliceAngle = TWO_PI / this.slices;
      rotate(sliceAngle);
      fill(this.colorPalette[i], settings.sat, settings.light, this.alpha);
      ellipse(this.r, 0, this.d);
    }
    pop();
  }
}

// Make array of layers
function makeLayers(amount = 4) {
  currLayers = amount;
  for (let i = 0; i < amount; i++) {
    let c;
    c = new circlePattern(
      settings.diameter,
      settings.slices,
      PI / 2,
      (PI / 4080 - (PI / 4080) * (i * 2)) / 2 //random(-PI / 1080, PI / 1080)
    );
    cs.push(c);
  }
}

// Reset array of layers on value change
function resetList() {
  if (
    cs[0].slices != settings.slices ||
    cs[0].hue != settings.hue ||
    cs[0].d != settings.diameter ||
    currLayers != settings.layers
  ) {
    cs = [];
    makeLayers(settings.layers);
  }
}
