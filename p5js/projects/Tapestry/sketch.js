// Declare variables
let info;
let grid;
let gridCols = 15;

// List of patterns, bias
let choices = [
  [pattern1, 1],
  [pattern2, 1],
  [pattern3, 1],
  [pattern4, 2],
  [pattern5, 2],
];

function setup() {
  noCursor();
  // Set color mode to hsb
  colorMode(HSB);
  // Create a canvas that covers the whole viewport
  createCanvas(windowWidth, windowHeight);
  // Define grid cell size
  grid = width / gridCols;

  // Draw background
  background(5, 30, 10);
  // Draw grid
  drawRandomGrid();
}

// On window resize, update canvas size
function windowResized() {
  clear();
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

// Main render loop
function draw() {
  keyboardController();
}

// Main controls
function keyboardController() {
  // Up arrow increases columns, zooms out
  if (keyIsDown(UP_ARROW) && gridCols > 1) {
    gridCols--;
    grid = width / gridCols;
    clear();
    setup();
  }

  // Down arrow decreases columns, zooms in
  if (keyIsDown(DOWN_ARROW) && gridCols < 40) {
    gridCols++;
    grid = width / gridCols;
    clear();
    setup();
  }

  // Left/Right arrow to create new image
  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    clear();
    setup();
  }
}

// Draw grid
function drawRandomGrid() {
  // Brush settings
  noFill();
  strokeWeight(grid / 10);
  strokeCap(PROJECT);
  strokeJoin(BEVEL);
  stroke(100);

  // Draw randomized grid
  strokeWeight(2); //grid / 15);
  stroke(190, 90, 40);
  for (let x = 0; x < width; x += grid) {
    for (let y = 0; y < height; y += grid) {
      push();
      translate(x + 0.5, y + 0.5);
      drawRandomPattern();
      pop();
    }
  }
}

// Choose and draw random pattern
function drawRandomPattern() {
  // raffle -> [item]
  let raffle = [];
  for (let i = 0; i < choices.length; i++) {
    // item -> [pattern, #]
    let item = choices[i];
    let numberOfEntries = item[1];

    for (j = 0; j < numberOfEntries; j++) {
      raffle.push(item[0]);
    }
  }

  let chosenPattern = random(raffle);

  chosenPattern();
}

// Patterns
function pattern1() {
  let w = grid / 2 - 4;
  let h = grid / 2 - 4;

  noStroke();
  stroke(180, 100, 100);
  fill(185, 90, 90);
  fill(180, 100, 100);
  arc(0, grid / 2, w, h, PI * 1.5, HALF_PI);
  arc(grid + 1, grid / 2, w, h, HALF_PI, PI * 1.5);
  arc(grid / 2, 0, w, h, TWO_PI, PI);
  arc(grid / 2, grid + 1, w, h, PI, TWO_PI);
}

function pattern2() {
  stroke(30, 100, 100);
  fill(30, 100, 100);
  triangle(grid / 4, grid, grid * 0.75, grid, grid / 2, grid * 0.75);
  triangle(grid / 4, 0, grid * 0.75, 0, grid / 2, grid / 4);
  stroke(185, 90, 90);
  fill(185, 90, 90);
  noFill();
  triangle(0, grid / 4, grid / 4, grid / 2, 0, grid * 0.75);
  triangle(grid, grid / 4, grid, grid * 0.75, grid * 0.75, grid / 2);
}

function pattern3() {
  stroke(30, 100, 100);
  fill(30, 100, 100);
  triangle(0, grid / 4, grid / 4, grid / 2, 0, grid * 0.75);
  triangle(grid, grid / 4, grid, grid * 0.75, grid * 0.75, grid / 2);
  stroke(185, 90, 90);
  fill(185, 90, 90);
  triangle(grid / 4, grid, grid * 0.75, grid, grid / 2, grid * 0.75);
  triangle(grid / 4, 0, grid * 0.75, 0, grid / 2, grid / 4);
}

function pattern4() {
  stroke(185, 90, 90);
  fill(185, 90, 90);
  quad(0, grid / 4, 0, grid * 0.75, grid * 0.75, 0, grid / 4, 0);
  quad(grid / 4, grid, grid * 0.75, grid, grid, grid * 0.75, grid, grid / 4);
}

function pattern5() {
  stroke(185, 90, 90);
  fill(185, 90, 90);
  quad(0, grid / 4, grid * 0.75, grid, grid / 4, grid, 0, grid * 0.75);
  quad(grid / 4, 0, grid * 0.75, 0, grid, grid / 4, grid, grid * 0.75);
}
