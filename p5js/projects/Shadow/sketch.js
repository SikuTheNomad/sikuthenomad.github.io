let mouseLimitY, randomColor

document.oncontextmenu = function () {
  return false
}

function setup () {
  colorMode(HSB)
  createCanvas(windowWidth, windowHeight) // functionName(arg1, arg2)
  noCursor()
}

function draw () {
  drawBG()
  drawSun()
  drawGround()
  drawCharacter()
}

function drawBG () {
  mouseLimitY = constrain(mouseY, 0, height)

  bgHueLimit = createVector(60, 0)
  bgLightLimit = createVector(7, 100)

  bgHueScale = map(mouseLimitY, 0, height, bgHueLimit.x, bgHueLimit.y)
  bgLightScale = map(
    bgHueScale,
    bgHueLimit.y,
    bgHueLimit.x,
    bgLightLimit.x,
    bgLightLimit.y
  )

  background(bgHueScale, 100, bgLightScale)
}

function drawSun () {
  // Light
  radius = 1

  noFill()
  stroke(100)
  ellipseMode(RADIUS)

  for (let i = 0; i < 10; i++) {
    sunHueFactor = 50

    sunHueLimit = createVector(0, 40)
    sunLightLimit = createVector(10, 100)

    sunHueScale = map(mouseLimitY, height, 0, sunHueLimit.x, sunHueLimit.y)
    sunLightScale = map(
      mouseLimitY,
      height,
      0,
      sunLightLimit.x,
      sunLightLimit.y
    )

    spacing = (i * width) / 8
    strokeWeight(40)
    stroke(sunHueScale * (i / sunHueFactor + 1), 100, sunLightScale)
    // stroke(randomColor, 100, sunLightScale);
    ellipse(mouseX, mouseY, radius - spacing)
  }
}

function drawGround () {
  // Ground
  rectMode(CORNER)

  groundHueLimit = createVector(100, 130)
  groundLightLimit = createVector(9, 100)

  groundHueScale = map(
    mouseLimitY,
    0,
    height,
    groundHueLimit.x,
    groundHueLimit.y
  )
  groundLightScale = map(
    mouseLimitY,
    0,
    height,
    groundLightLimit.y,
    groundLightLimit.x
  )

  groundStrokeWeight = height * 0.15
  groundY = height - groundStrokeWeight / 2

  stroke(groundHueScale, 100, groundLightScale)
  strokeWeight(groundStrokeWeight)
  line(0, groundY, width, groundY)

  // Grass lines
  rectMode(CENTER)
  strokeCap(SQUARE)

  grassHueLimit = createVector(90, 120)
  grassHueScale = map(mouseLimitY, 0, height, grassHueLimit.y, grassHueLimit.x)
  grassLightLimit = createVector(9, 80)
  grassLightScale = map(
    mouseLimitY,
    0,
    height,
    grassLightLimit.y,
    grassLightLimit.x
  )

  lineStrokeWeight = height * 0.15

  strokeWeight(groundStrokeWeight)
  stroke(grassHueScale, 100, grassLightScale)

  for (i = 0; i < 10; i++) {
    spacing = width / 10 + 10
    lineX1 = spacing * i
    lineY1 = groundY
    lineX2 = spacing * i + spacing / 2
    lineY2 = groundY

    line(lineX1, lineY1, lineX2, lineY2)
  }
}

function drawCharacter () {
  // Drawing Variables
  charHeight = height * 0.25
  charWidth = charHeight * 0.4
  curveWidth = 31
  curveHeight = 50
  charStroke = (width * 6) / width

  charY = height * 0.75
  charX = width / 2

  // Shadow
  rectMode(CORNER)

  heightFactor = 8

  shadownLightLimit = createVector(13, 20)
  shadownAlphaLimit = createVector(0.1, 0.9)

  shadowLightScale = map(
    mouseLimitY,
    0,
    height - height / heightFactor,
    shadownLightLimit.x,
    shadownLightLimit.y
  )
  shadowAlphaScale = map(
    mouseLimitY,
    0,
    height - height / heightFactor,
    shadownAlphaLimit.y,
    shadownAlphaLimit.x
  )
  shadowColor = color(0, 0, shadowLightScale)
  shadowColor.setAlpha(shadowAlphaScale)

  shadowX = map(mouseX, 0, width, width, 0)
  shadowY = charY + charHeight / 2
  shadowStrokeWeight = charStroke

  distX = mouseX - charX

  stroke(shadowColor)
  strokeCap(ROUND)
  strokeWeight(shadowStrokeWeight)
  line(charX, shadowY, shadowX, shadowY)

  // Character
  rectMode(CENTER)

  charHueLimit = createVector(230, 240)
  charSatLimit = createVector(80, 100)
  charLightLimit = createVector(20, 100)

  charHueScale = map(mouseLimitY, 0, height, charHueLimit.x, charHueLimit.y)
  charSatScale = map(mouseLimitY, 0, height, charSatLimit.y, charSatLimit.x)
  charLightScale = map(
    mouseLimitY,
    0,
    height,
    charLightLimit.y,
    charLightLimit.x
  )

  fill(charHueScale - 40, charSatScale, charLightScale)
  stroke(charHueScale, charSatScale, charLightScale)

  for (let i = 0; i < 3; i++) {
    strokeWeight(charStroke - i)
    spacing = i * 20
    rect(
      charX,
      charY,
      charWidth - spacing,
      charHeight - spacing,
      curveWidth - i * 10
    )
  }
}
