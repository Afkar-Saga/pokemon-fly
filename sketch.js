let menuMudkip, playMudkip, levelMudkip, buttonMudkip, mudkipHit, mudkipScore, mudkipWin; // mudkip
let menuCharmander, playCharmander, levelCharmander, buttonCharmander, charmanderHit, charmanderScore, charmanderWin; // charmander
let menuSnivy, playSnivy, levelSnivy, buttonSnivy, snivyHit, snivyScore, snivyWin; // snivy
let start, howtoplay, level, back, nextLevel; // buttons
let bigCloud, smallCloud; // clouds
let leaf, grass, water, sea, fire, lava; // obstacles
let mainMusic, playMusic, buttonSound, winSound, loseSound, leafHitSound, fallGrassSound, waterHitSound, fallSeaSound, fireHitSound, fallLavaSound; // sounds
let leaves = [];
let grassXs = [];
let waters = [];
let seaXs = [];
let fires = [];
let lavaXs = [];
let currentScene;
let endlessMode;

function preload() {
  leaf = loadImage("img/leaf-green.png");
  grass = loadImage("img/GrassBlock.png");
  water = loadImage("img/water-bubble.png");
  sea = loadImage("img/WaterBlock.png");
  fire = loadImage("img/fire-ball.png");
  lava = loadImage("img/LavaBlock.png");

  mainMusic = loadSound("audio/main-music.mp3");
  playMusic = loadSound("audio/play-music.mp3");
  buttonSound = loadSound("audio/button.mp3");
  winSound = loadSound("audio/win.mp3");
  loseSound = loadSound("audio/lose.mp3");
  leafHitSound = loadSound("audio/leaf-hit.mp3");
  waterHitSound = loadSound("audio/water-hit.mp3");
  fireHitSound = loadSound("audio/fire-hit.mp3");
  fallGrassSound = loadSound("audio/fall-grass.mp3");
  fallSeaSound = loadSound("audio/fall-sea.mp3");
  fallLavaSound = loadSound("audio/fall-lava.mp3");
}

function setup() {
  noStroke();
  textAlign(CENTER);
  
  createCanvas(window.innerWidth, window.innerHeight);

  bigCloud = new Cloud(200, height * 0.13, 95);
  smallCloud = new Cloud(400, height * 0.13, 50);

  menuMudkip = new Mudkip(width / 2 - 30, height * 0.7, width * 0.01);
  levelMudkip = new Mudkip(width / 2, height * 0.25, width * 0.005);
  playMudkip = new Mudkip(100, 100, width * 0.005);

  menuCharmander = new Charmander(width / 2 - 30, height * 0.7, width * 0.01);
  levelCharmander = new Charmander(width / 2, height * 0.5, width * 0.005);
  playCharmander = new Charmander(100, 100, width * 0.005);

  menuSnivy = new Snivy(width / 2 - 30, height * 0.7, width * 0.01);
  levelSnivy = new Snivy(width / 2, height * 0.75, width * 0.005);
  playSnivy = new Snivy(100, 100, width * 0.005);

  mudkipHit = 0;
  charmanderHit = 0;
  snivyHit = 0;
  mudkipScore = 0;
  charmanderScore = 0;
  snivyScore = 0;
  mudkipWin = false;
  charmanderWin = false;
  snivyWin = false;
  endlessMode = false;

  start = new Button(width * 0.4, height / 2, width / 12, height / 12, width / 75, "Start"); // start button
  howtoplay = new Button(width * 0.5, height / 2, width / 12, height / 12, width / 75, "How To Play"); // how to play button
  level = new Button(width * 0.6, height / 2, width / 12, height / 12, width / 75, "Level"); // level button
  back = new Button(150, 75, width / 10, height / 10, width / 50, "Back"); // back button
  nextlevel = new Button(width - 200, 75, width / 8, height / 10, width / 50, "Next Level"); // next level button
  buttonMudkip = new Button(levelMudkip.x + 20, levelMudkip.y, width / 10, height / 6, 0, "");
  buttonCharmander = new Button(levelCharmander.x + 20, levelCharmander.y, width / 10, height / 6, 0, "");
  buttonSnivy = new Button(levelSnivy.x + 20, levelSnivy.y, width / 10, height / 6);
  buttonEndlessMode = new Button(width + 200, height * 0.95, width / 12, height / 12, 16, "Endless Mode"); // endless mode button

  for (let i = 0; i < 100; i++) {
    leaves.push(new Leaf(i * 300 + 500, random(40, height - 150)));
    waters.push(new Water(i * 300 + 500, random(40, height - 150)));
    fires.push(new Fire(i * 300 + 500, random(40, height - 150)));
  }
  for (let i = 0; i < width * 0.02255; i++) {
    grassXs.push(new Grass(i * 75, height - 60));
    seaXs.push(new Sea(i * 75, height - 60));
    lavaXs.push(new Lava(i * 75, height - 60));
  }

  currentScene = 1;

  mainMusic.loop();
}

// Cloud
class Cloud {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.size, this.size);
    ellipse(this.x + (this.size * 1) / 2, this.y + (this.size * 1) / 10, (this.size * 3) / 4, (this.size * 2) / 3);
    ellipse(this.x - (this.size * 1) / 2, this.y + (this.size * 1) / 10, (this.size * 3) / 4, (this.size * 2) / 3);
    this.x -= 3;
    if (this.x < -120) {
      this.x += width + 200;
    }
  }
}
function drawCloud() {
  bigCloud.draw();
  smallCloud.draw();
}

// --Pokemon--
// -Character: Mudkip-
class Mudkip {
  constructor(x, y, pixel) {
    this.x = x;
    this.y = y;
    this.pixel = pixel;
    this.leaves = 0;
  }

  draw() {
    rectMode(CORNER);
    this.y = constrain(this.y, 40, height - 50);
    // Body
    fill(0, 30, 255);
    rect(this.x, this.y, this.pixel * 9, this.pixel * 2);

    // Head
    rect(this.x + 4 * this.pixel, this.y - 2 * this.pixel, this.pixel * 5, this.pixel * 2);

    // Fin
    rect(this.x + 5 * this.pixel, this.y - 4 * this.pixel, this.pixel * 3, this.pixel * 2);

    // Leg
    rect(this.x, this.y + 2 * this.pixel, this.pixel * 2, this.pixel * 3);
    rect(this.x + 5 * this.pixel, this.y + 2 * this.pixel, this.pixel * 2, this.pixel * 3);

    // Stomach
    fill(100, 255, 255);
    rect(this.x + 2 * this.pixel, this.y + 2 * this.pixel, this.pixel * 3, this.pixel);

    // Mouth
    rect(this.x + 7 * this.pixel, this.y + this.pixel, this.pixel * 2, this.pixel);

    // Tail
    rect(this.x - this.pixel, this.y - this.pixel, this.pixel, this.pixel * 3);
    rect(this.x - 2 * this.pixel, this.y - 3 * this.pixel, this.pixel, this.pixel * 7);
    rect(this.x - 4 * this.pixel, this.y - 4 * this.pixel, this.pixel * 2, this.pixel * 9);

    // Gill
    fill(255, 132, 0);
    rect(this.x + 5 * this.pixel, this.y, this.pixel * 2, this.pixel * 2);

    // Eye
    fill(0, 0, 0);
    rect(this.x + 7 * this.pixel, this.y - this.pixel, this.pixel, this.pixel * 2);
  }

  fly() {
    this.y -= 7;
  }

  fall() {
    this.y += 4;
  }

  checkForLeafHit(leaf) {
    if (leaf.x >= this.x - 13 * this.pixel && leaf.x <= this.x + 8 * this.pixel && leaf.y >= this.y - 13 * this.pixel && leaf.y <= this.y + 4 * this.pixel) {
      leafHitSound.play();
      leaf.x += 30000;
      mudkipHit++;
    } else if (leaf.x < this.x - 20 * this.pixel) {
      leaf.x += 30000;
      mudkipScore++;
    }
  }

  checkForGrassHit(grass) {
    if (grass.y <= this.y + 3 * this.pixel) {
      fallGrassSound.play();
      mudkipHit += 10;
    }
  }
}
// -Character: Charmander-
class Charmander {
  constructor(x, y, pixel) {
    this.x = x;
    this.y = y;
    this.pixel = pixel;
    this.water = 0;
  }

  draw() {
    rectMode(CORNER);
    this.y = constrain(this.y, 40, height - 50);
    // Body
    fill(241, 115, 5);
    rect(this.x, this.y, this.pixel * 4, this.pixel * 3);

    // Head
    rect(this.x - this.pixel, this.y - 4 * this.pixel, this.pixel * 6, this.pixel * 4);

    // Tail
    rect(this.x - 2 * this.pixel, this.y + 2 * this.pixel, this.pixel, this.pixel * 2);
    rect(this.x - 3 * this.pixel, this.y + this.pixel, this.pixel, this.pixel * 2);

    // Leg
    rect(this.x - this.pixel, this.y + 3 * this.pixel, this.pixel * 2, this.pixel);
    rect(this.x + 3 * this.pixel, this.y + 3 * this.pixel, this.pixel * 2, this.pixel);
    rect(this.x + 5 * this.pixel, this.y + this.pixel, this.pixel, this.pixel * 2);

    // Stomach
    fill(245, 255, 150);
    rect(this.x + 3 * this.pixel, (this.y * this.pixel) / this.pixel, this.pixel, this.pixel * 3);
    rect(this.x + 2 * this.pixel, this.y + 2 * this.pixel, this.pixel, this.pixel);
    rect(this.x + this.pixel, this.y + 3 * this.pixel, this.pixel, this.pixel);

    // Flame
    fill(255, 255, 0);
    rect(this.x - 4 * this.pixel, (this.y * this.pixel) / this.pixel, this.pixel * 2, this.pixel);
    rect(this.x - 5 * this.pixel, this.y - this.pixel, this.pixel * 2, this.pixel);
    rect(this.x - 5 * this.pixel, this.y - 2 * this.pixel, this.pixel, this.pixel);
    fill(255, 0, 0);
    rect(this.x - 3 * this.pixel, this.y - this.pixel, this.pixel, this.pixel);
    rect(this.x - 4 * this.pixel, this.y - 3 * this.pixel, this.pixel, this.pixel * 2);
    rect(this.x - 5 * this.pixel, this.y - 4 * this.pixel, this.pixel, this.pixel * 2);

    // Eye
    fill(0, 0, 0);
    rect(this.x + 3 * this.pixel, this.y - 3 * this.pixel, this.pixel, this.pixel * 2);
  }

  fly() {
    this.y -= 12;
  }

  fall() {
    this.y += 8;
  }

  checkForWaterHit(water) {
    if (water.x >= this.x - 12 * this.pixel && water.x <= this.x + 5 * this.pixel && water.y >= this.y - 12 * this.pixel && water.y <= this.y + 3 * this.pixel) {
      waterHitSound.play();
      water.x += 30000;
      charmanderHit++;
    } else if (water.x < this.x - 20 * this.pixel) {
      water.x += 30000;
      charmanderScore++;
    }
  }

  checkForSeaHit(sea) {
    if (sea.y <= this.y + this.pixel) {
      fallSeaSound.play();
      charmanderHit += 10;
    }
  }
}
// -Character: Snivy-
class Snivy {
  constructor(x, y, pixel) {
    this.x = x;
    this.y = y;
    this.pixel = pixel;
    this.fire = 0;
  }

  draw() {
    rectMode(CORNER);
    this.y = constrain(this.y, 40, height - 50);
    // Body
    fill(80, 221, 70);
    rect(this.x - this.pixel, this.y, this.pixel * 4, this.pixel * 3);

    // Head
    rect(this.x - 2 * this.pixel, this.y - 4 * this.pixel, this.pixel * 6, this.pixel * 4);

    // Leg
    rect(this.x + 2 * this.pixel, this.y + 3 * this.pixel, this.pixel * 2, this.pixel);
    rect(this.x + 4 * this.pixel, this.y + this.pixel, this.pixel, this.pixel * 2);

    // Tail
    rect(this.x - 3 * this.pixel, this.y + 3 * this.pixel, this.pixel * 3, this.pixel);
    rect(this.x - 4 * this.pixel, this.y + 2 * this.pixel, this.pixel * 2, this.pixel);
    rect(this.x - 4 * this.pixel, this.y - 3 * this.pixel, this.pixel, this.pixel * 5);
    rect(this.x - 5 * this.pixel, this.y - 2 * this.pixel, this.pixel, this.pixel * 3);
    rect(this.x - 3 * this.pixel, this.y - 2 * this.pixel, this.pixel, this.pixel * 3);

    // Nose
    rect(this.x + 4 * this.pixel, this.y - 2 * this.pixel, this.pixel * 2, this.pixel * 2);
    rect(this.x + 6 * this.pixel, this.y - 3 * this.pixel, this.pixel, this.pixel * 2);

    // Eye
    fill(0, 0, 0);
    rect(this.x + 2 * this.pixel, this.y - 3 * this.pixel, this.pixel, this.pixel * 2);

    // Stomach
    fill(251, 253, 134);
    rect(this.x + 2 * this.pixel, this.y + 3 * this.pixel, this.pixel * 2, this.pixel);
    rect(this.x, this.y + 2 * this.pixel, this.pixel * 3, this.pixel);
    rect(this.x + this.pixel, this.y + this.pixel, this.pixel * 2, this.pixel);
    rect(this.x + 2 * this.pixel, this.y - this.pixel, this.pixel, this.pixel * 2);
    rect(this.x + 3 * this.pixel, this.y - this.pixel, this.pixel * 3, this.pixel);
    rect(this.x + 6 * this.pixel, this.y - 2 * this.pixel, this.pixel, this.pixel);

    // Yellow thing (idk a scarf?)
    fill(253, 252, 11);
    rect(this.x - this.pixel, this.y - this.pixel, this.pixel * 2, this.pixel);
    rect(this.x, this.y, this.pixel * 3, this.pixel);
    rect(this.x + 2 * this.pixel, this.y + this.pixel, this.pixel, this.pixel);
  }

  fly() {
    this.y -= 5;
  }

  fall() {
    this.y += 10;
  }

  checkForFireHit(fire) {
    if (fire.x >= this.x - 12 * this.pixel && fire.x <= this.x + 5 * this.pixel && fire.y >= this.y - 12 * this.pixel && fire.y <= this.y + 3 * this.pixel) {
      fireHitSound.play();
      fire.x += 30000;
      snivyHit++;
    } else if (fire.x < this.x - 20 * this.pixel) {
      fire.x += 30000;
      snivyScore++;
    }
  }

  checkForLavaHit(lava) {
    if (lava.y <= this.y + 3 * this.pixel) {
      fallLavaSound.play();
      snivyHit += 10;
    }
  }
}

// --Obstacles--
class Obstacles {
  constructor(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
  }

  draw() {
    image(this.image, this.x, this.y, this.size, this.size);
  }
}
// Leaf
class Leaf extends Obstacles {
  constructor(x, y) {
    super(x, y, 125, leaf);
  }
}
// Grass
class Grass extends Obstacles {
  constructor(x, y) {
    super(x, y, 75, grass);
  }
}
// Water
class Water extends Obstacles {
  constructor(x, y) {
    super(x, y, 125, water);
  }
}
// Sea
class Sea extends Obstacles {
  constructor(x, y) {
    super(x, y, 100, sea);
  }
}
// Fire
class Fire extends Obstacles {
  constructor(x, y) {
    super(x, y, 125, fire);
  }
}
// Lava
class Lava extends Obstacles {
  constructor(x, y) {
    super(x, y, 75, lava);
  }
}

// Texts
function drawMudkipText() {
  rectMode(CENTER);
  fill(210, 0, 110);
  rect(width / 2, height * 0.3, width / 5, width / 10, 15);
  fill(0, 255, 100);
  rect(width / 2, height * 0.3, width / 6, width / 15);
  fill(255, 0, 0);
  textFont("Comic Sans MS", width / 35);
  text("Mudkip Fly", width / 2, height * 0.3);
  fill(0, 0, 0);
  textSize(20);
  text("Mudkip can fly, now!", 100, height - 10);
}
function drawCharmanderText() {
  rectMode(CENTER);
  fill(210, 0, 110);
  rect(width / 2, height * 0.3, width / 5, width / 10, 15);
  fill(0, 255, 100);
  rect(width / 2, height * 0.3, width / 6, width / 15);
  fill(255, 0, 0);
  textFont("Comic Sans MS", width / 45);
  text("Charmander Fly", width / 2, height * 0.3);
  fill(255, 255, 255);
  textSize(20);
  text("Charmander can fly, now!", 125, height - 10);
}
function drawSnivyText() {
  rectMode(CENTER);
  fill(210, 0, 110);
  rect(width / 2, height * 0.3, width / 5, width / 10, 15);
  fill(0, 255, 100);
  rect(width / 2, height * 0.3, width / 6, width / 15);
  fill(255, 0, 0);
  textFont("Comic Sans MS", width / 35);
  text("Snivy Fly", width / 2, height * 0.3);
  fill(0, 0, 0);
  textSize(20);
  text("Snivy can fly, now!", 100, height - 10);
}

///-Button-///
class Button {
  constructor(x, y, width, height, textSize, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.textSize = textSize;
    this.label = label;
  }

  draw() {
    rectMode(CENTER);
    textAlign(CENTER);
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height, 10);
    fill(0, 0, 255);
    textSize(this.textSize);
    text(this.label, this.x, this.y);
  }

  isMouseInside() {
    return mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.width / 2 && mouseY < this.y + this.height / 2;
  }
}

function drawMenuButton() {
  start.draw();
  howtoplay.draw();
  level.draw();
  if (endlessMode) {
    buttonEndlessMode.x = width * 0.95;
    buttonEndlessMode.draw();
  }
}

// --Scenes--
// -Menu_Scenes-
function drawMudkipMenu() {
  background(0, 230, 255);
  drawCloud();
  menuMudkip.draw();
  drawMudkipText();
  drawMenuButton();
}
function drawCharmanderMenu() {
  background(200, 20, 0);
  drawCloud();
  menuCharmander.draw();
  drawCharmanderText();
  drawMenuButton();
}
function drawSnivyMenu() {
  background(140, 255, 161);
  drawCloud();
  menuSnivy.draw();
  drawSnivyText();
  drawMenuButton();
}
// -How_To_Play_Scene-
function drawHowToPlay() {
  background(255, 0, 255);
  drawCloud();
  fill(255, 255, 0);
  textSize(50);
  text("How To Play", width / 2, 100);
  textSize(20);
  text(
    "Your Pokemon can use HM02, FLY!\n\nTo fly, hold the SPACE button!\n\nYour goal is to dodge all the obstacles\n\nThe obstacles have a type advantage against your Pokemon\n\nIf you got hit by the obstacles 10 times, YOU LOSE!\n\nBut if you can dodge 100 of the obstacles, YOU WIN!!!",
    width / 2,
    height / 3.5
  );
  back.draw();
}
function drawLevel() {
  background(66, 66, 66);
  buttonMudkip.draw();
  levelMudkip.draw();
  if (mudkipWin) {
    buttonCharmander.draw();
    levelCharmander.draw();
  }
  if (mudkipWin && charmanderWin) {
    buttonSnivy.draw();
    levelSnivy.draw();
  }
}
// -Play_Scene-
function drawMudkipPlay() {
  background(0, 230, 255);
  drawCloud();
  if (keyIsPressed && keyCode === 32) {
    playMudkip.fly();
  } else {
    playMudkip.fall();
  }
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].draw();
    playMudkip.checkForLeafHit(leaves[i]);
    leaves[i].x -= 5; // Leaf Speed
  }
  for (let i = 0; i < grassXs.length; i++) {
    grassXs[i].draw();
    playMudkip.checkForGrassHit(grassXs[i]);
    grassXs[i].x -= 2.5;
    if (grassXs[i].x <= -grassXs[i].size) {
      grassXs[i].x = width;
    }
  }
  fill(0, 0, 0);
  textAlign(LEFT);
  textSize(25);
  text("Hit: " + mudkipHit, 30, 30);
  text("Score: " + mudkipScore, 30, 70);
  playMudkip.draw();
}
function drawCharmanderPlay() {
  background(200, 20, 0);
  drawCloud();
  if (keyIsPressed && keyCode === 32) {
    playCharmander.fly();
  } else {
    playCharmander.fall();
  }
  for (let i = 0; i < waters.length; i++) {
    waters[i].draw();
    playCharmander.checkForWaterHit(waters[i]);
    waters[i].x -= 7; // Water Speed
  }
  for (let i = 0; i < seaXs.length; i++) {
    seaXs[i].draw();
    playCharmander.checkForSeaHit(seaXs[i]);
    seaXs[i].x -= 2.5;
    if (seaXs[i].x <= -seaXs[i].size) {
      seaXs[i].x = width;
    }
  }
  fill(255, 255, 255);
  textAlign(LEFT);
  textSize(25);
  text("Hit: " + charmanderHit, 30, 30);
  text("Score: " + charmanderScore, 30, 70);
  playCharmander.draw();
}
function drawSnivyPlay() {
  background(140, 255, 161);
  drawCloud();
  if (keyIsPressed && keyCode === 32) {
    playSnivy.fly();
  } else {
    playSnivy.fall();
  }
  for (let i = 0; i < fires.length; i++) {
    fires[i].draw();
    playSnivy.checkForFireHit(fires[i]);
    fires[i].x -= 6; // Fire Speed
  }
  for (let i = 0; i < lavaXs.length; i++) {
    lavaXs[i].draw();
    playSnivy.checkForLavaHit(lavaXs[i]);
    lavaXs[i].x -= 2.5;
    if (lavaXs[i].x <= -lavaXs[i].size) {
      lavaXs[i].x = width;
    }
  }
  fill(0, 0, 0);
  textAlign(LEFT);
  textSize(25);
  text("Hit: " + snivyHit, 30, 30);
  text("Score: " + snivyScore, 30, 70);
  playSnivy.draw();
}
// -Lose_Scene-
function drawLose() {
  background(0, 0, 0);
  fill(255, 0, 0);
  textSize(30);
  text("You Lose", width / 2, height / 2.2);
  if (currentScene === 91) {
    text("Your Score was : " + mudkipScore, width / 2, height / 2);
  } else if (currentScene === 92) {
    text("Your Score was : " + charmanderScore, width / 2, height / 2);
  } else if (currentScene === 93) {
    text("Your Score was : " + snivyScore, width / 2, height / 2);
  }
}
// -Win_Scene-
function drawWin() {
  background(55, 255, 0);
  fill(0, 138, 0);
  textSize(30);
  textAlign(CENTER);
  text("You Win :D", width / 2, height / 2.2);
  text("Yay, Your Pokemon is still alive", width / 2, height / 2);
  text("Congratulations", width / 2, height / 1.8);
}
// -Reset-
var resetGame = function () {
  // Reset Mudkip
  mudkipHit = 0;
  playMudkip.y = 100;

  // Reset Charmander
  charmanderHit = 0;
  playCharmander.y = 100;

  // Reset Snivy
  snivyHit = 0;
  playSnivy.y = 100;

  // Reset Obstacles
  leaves = [];
  waters = [];
  fires = [];
  for (let i = 0; i < 100; i++) {
    leaves.push(new Leaf(i * 300 + 500, random(40, height - 150)));
    waters.push(new Water(i * 300 + 500, random(40, height - 150)));
    fires.push(new Fire(i * 300 + 500, random(40, height - 150)));
  }
};

function draw() {
  // Draw Main Menu
  // Mudkip
  if (currentScene === 1) {
    drawMudkipMenu();
  }
  // Charmander
  if (currentScene === 2) {
    drawCharmanderMenu();
  }
  // Snivy
  if (currentScene === 3 || currentScene === 4) {
    drawSnivyMenu();
  }
  // Draw How To Play
  if (currentScene > 30 && currentScene < 40) {
    drawHowToPlay();
  }
  // Draw Level Menu
  if (currentScene > 40 && currentScene < 50) {
    drawLevel();
  }
  // Draw Play Scenes
  // Mudkip
  if (currentScene === 11 || currentScene === 21) {
    drawMudkipPlay();
  }
  // Charmander
  if (currentScene === 12 || currentScene === 22) {
    drawCharmanderPlay();
  }
  // Snivy
  if (currentScene === 13 || currentScene === 23) {
    drawSnivyPlay();
  }
  // Draw Lose Scene
  if (mudkipHit >= 10) {
    playMusic.stop();
    loseSound.play();
    currentScene = 91;
  }
  if (charmanderHit >= 10) {
    playMusic.stop();
    loseSound.play();
    currentScene = 92;
  }
  if (snivyHit >= 10) {
    playMusic.stop();
    loseSound.play();
    currentScene = 93;
  }
  if (currentScene > 90 && currentScene < 100) {
    resetGame();
    drawLose();
    back.draw();
  }
  // Draw Win Scene
  if (currentScene >= 11 && currentScene <= 20) {
    if (mudkipScore >= 100) {
      playMusic.stop();
      winSound.play();
      mudkipScore = 0;
      mudkipWin = true;
      currentScene = 101;
    }
    if (charmanderScore >= 100) {
      playMusic.stop();
      winSound.play();
      charmanderScore = 0;
      charmanderWin = true;
      currentScene = 102;
    }
    if (snivyScore >= 100) {
      playMusic.stop();
      winSound.play();
      snivyScore = 0;
      snivyWin = true;
      currentScene = 103;
    }
  }
  if (currentScene > 100 && currentScene < 110) {
    resetGame();
    drawWin();
    nextlevel.draw();
  }
}

function mouseClicked() {
  // Mudkip Menu
  if (currentScene === 1) {
    if (start.isMouseInside()) {
      currentScene = 11;
      mainMusic.stop();
      buttonSound.play();
      playMusic.loop();
    } else if (buttonEndlessMode.isMouseInside()) {
      currentScene = 21;
      mainMusic.stop();
      buttonSound.play();
      playMusic.loop();
    } else if (howtoplay.isMouseInside()) {
      currentScene = 31;
      buttonSound.play();
    } else if (level.isMouseInside()) {
      currentScene = 41;
      buttonSound.play();
    }
  }
  // Charmander Menu
  if (currentScene === 2) {
    if (start.isMouseInside()) {
      currentScene = 12;
      mainMusic.stop();
      buttonSound.play();
      playMusic.loop();
    } else if (buttonEndlessMode.isMouseInside()) {
      currentScene = 22;
      mainMusic.stop();
      buttonSound.play();
      playMusic.loop();
    } else if (howtoplay.isMouseInside()) {
      currentScene = 32;
      buttonSound.play();
    } else if (level.isMouseInside()) {
      currentScene = 42;
      buttonSound.play();
    }
  }
  // Snivy Menu
  if (currentScene === 3 || currentScene === 4) {
    if (start.isMouseInside()) {
      currentScene = 13;
      mainMusic.stop();
      buttonSound.play();
      playMusic.loop();
    } else if (buttonEndlessMode.isMouseInside()) {
      currentScene = 23;
      mainMusic.stop();
      buttonSound.play();
      playMusic.loop();
    } else if (howtoplay.isMouseInside()) {
      currentScene = 33;
      buttonSound.play();
    } else if (level.isMouseInside()) {
      currentScene = 43;
      buttonSound.play();
    }
  }
  // Lose Scene
  if (currentScene > 90 && currentScene < 100) {
    if (back.isMouseInside()) {
      currentScene -= 90;
      mudkipScore = 0;
      charmanderScore = 0;
      snivyScore = 0;
      buttonSound.play();
      mainMusic.loop();
    }
  }
  // Win Scene
  if (currentScene > 100 && currentScene < 110) {
    if (nextlevel.isMouseInside()) {
      if (currentScene === 103) {
        endlessMode = true;
      }
      currentScene -= 99;
      buttonSound.play();
      mainMusic.loop();
    }
  }
  // How To Play
  if (currentScene > 30 && currentScene < 40) {
    if (back.isMouseInside()) {
      currentScene -= 30;
      buttonSound.play();
    }
  }
  // Level Menu
  if (currentScene > 40 && currentScene < 50) {
    if (buttonMudkip.isMouseInside()) {
      currentScene = 1;
      buttonSound.play();
    } else if (buttonCharmander.isMouseInside() && mudkipWin) {
      currentScene = 2;
      buttonSound.play();
    } else if (buttonSnivy.isMouseInside() && charmanderWin) {
      currentScene = 3;
      buttonSound.play();
    }
  }
}
