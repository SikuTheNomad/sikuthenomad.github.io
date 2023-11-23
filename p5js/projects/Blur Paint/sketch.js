let pnt, r, g, b, a, textAlpha, textFade, onOff, saveNum

function setup () {
  // Disable context menu
  for (let element of document.getElementsByClassName('p5Canvas')) {
    element.addEventListener('contextmenu', e => e.preventDefault())
  }

  // Main canvas
  createCanvas(windowWidth, windowHeight)

  // Painting canvas
  pnt = createGraphics(windowWidth, windowHeight)

  // Init rgba
  r = random(0, 255)
  g = random(0, 255)
  b = random(0, 255)
  a = 10
  pnt.fill(r, g, b, a)

  // Disable cursor and set range of random brush circles
  noCursor()
  mouseRange = 20

  // Init text transparency and fade-in speed
  textAlpha = 0
  textFade = 1

  // Init brush visibility
  onOff = 0

  // Save name increment
  saveNum = 1
}

function draw () {
  // Init Main canvas background
  background(20)

  // Render brush from function
  brush()

  // Render painting
  image(pnt, 0, 0)

  // Render intro text from function
  introText()
}

function mousePressed () {
  if (mouseButton === LEFT) {
    r = random(0, 255)
    g = random(0, 255)
    b = random(0, 255)
    a = random(5, 40)
    pnt.fill(r, g, b, a)
  }
}

function keyTyped () {
  if (key === 's' || key === 'S') {
    saveCanvas('Painting ' + saveNum)
    saveNum++
  }
  if (key === 'c' || key === 'C') {
    pnt.clear()
  }

  if (key === 'h' || key === 'H') {
    switch (textAlpha) {
      case 0:
        textFade = 6
        break
      case 255:
        textFade = -6
    }
  }

  if (key === ' ') {
    textFade = -3
    switch (onOff) {
      case 0:
        onOff = 1
        break
      case 1:
        onOff = 0
        break
    }
  }
}

function introText () {
  if (textAlpha > 255) {
    textFade = 0
    textAlpha = 255
  }
  if (textAlpha < 0) {
    textFade = 0
    textAlpha = 0
  }
  if (textFade != 0) {
    textAlpha += textFade
  }

  fill(100, 255, 255, textAlpha)
  textAlign(CENTER)
  textFont('Courier New')
  textSize(30)
  text('Welcome to Blur Paint', width / 2, height / 2 - 20 * 10)
  textSize(20)
  text(
    'Left Click to randomize color and transparency',
    width / 2,
    height / 2 - 20 * 6
  )
  text('Spacebar to turn brush on/off', width / 2, height / 2 - 20 * 4)
  text('Press H to see this again', width / 2, height / 2 - 20 * 2)
  text('Press C to clear paint', width / 2, height / 2)
  text('Press S to save', width / 2, height / 2 + 20 * 2)
}

function brush () {
  fill(255)
  circle(mouseX, mouseY, 3)
  // Draw brush
  pnt.noStroke()
  pnt.fill(r, g, b, a * onOff)
  pnt.circle(
    random(-mouseRange, mouseRange) + mouseX,
    random(-mouseRange, mouseRange) + mouseY,
    width * 0.02
  )
}
