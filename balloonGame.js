function setup() {
  createCanvas(400, 400);
  Game.addCommonBalloon();
}

function draw() {
  background("skyblue");

  for (const balloon of Game.balloons) {
    balloon.display();
    balloon.move(Game.score);

    if (balloon.y <= 0) {
      noLoop();
      Game.balloons.length = 0;
      Game.notBalloons.length = 0;
      background("red");
      let score = Game.score;
      Game.score = "";
      textSize(64);
      fill("white");
      textAlign(CENTER, CENTER);
      text("You Lose :(", 200, 200);

      textSize(64);
      fill("white");
      text("Score:" + score, 200, 300);
    }
  }
  for (const notBalloon of Game.notBalloons) {
    notBalloon.display();
    notBalloon.move();
  }

  textSize(32);
  fill("black");
  text(Game.score, 20, 40);

  textSize(32);
  fill("black");
  text("Record:" + Game.record, 250, 40);

  if (Game.score > Game.record) {
    Game.record = Game.score;
  }

  if (frameCount % 30 == 0) {
    Game.addCommonBalloon();
  }

  if (frameCount % 98 == 0) {
    Game.addRandomBalloon();
  }

  if (frameCount % 120 == 0) {
    Game.addRareBalloon();
  }

  if (frameCount % 160 == 0) {
    Game.addSuperRareBalloon();
  }

  if (frameCount % 145 == 0) {
    Game.addBadBalloon();
  }
}
function mousePressed() {
  if (!isLooping()) {
    loop();
    Game.score = 0;
  }
  Game.checkIfBalloonBurst();
  Game.checkIfNotBalloonBurst();
}

class Game {
  static balloons = [];
  static notBalloons = [];
  static score = 0;
  static record = 0;

  static addCommonBalloon() {
    let balloon = new CommonBalloon("blue", 50);
    this.balloons.push(balloon);
  }

  static addRareBalloon() {
    let balloon = new RareBalloon("green", 40);
    this.balloons.push(balloon);
  }

  static addSuperRareBalloon() {
    let balloon = new SuperRareBalloon("yellow", 30);
    this.balloons.push(balloon);
  }

  static addRandomBalloon() {
    let notBalloon = new RandomBalloon("purple", 70);
    this.notBalloons.push(notBalloon);
  }

  static addBadBalloon() {
    let notBalloon = new BadBalloon("black", 50);
    this.notBalloons.push(notBalloon);
  }

  static checkIfBalloonBurst() {
    this.balloons.forEach((balloon, index) => {
      let distance = dist(balloon.x, balloon.y, mouseX, mouseY);
      if (distance <= balloon.size / 2) {
        balloon.burst(index);
      }
    });
  }

  static checkIfNotBalloonBurst() {
    this.notBalloons.forEach((notBalloon, index) => {
      let distance = dist(notBalloon.x, notBalloon.y, mouseX, mouseY);
      if (distance <= notBalloon.size / 2) {
        notBalloon.burst(index);
      }
    });
  }
}

class CommonBalloon {
  constructor(color, size) {
    this.x = random(width);
    this.y = random(height - 10, height + 50);
    this.color = color;
    this.size = size;
  }
  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
    line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size);
  }
  move(score) {
    if (score > 1000) {
      (this.y -= 1), 5;
    }
    this.y -= 1;
  }

  burst(index) {
    Game.balloons.splice(index, 1);
    Game.score += 1;
  }
}

class RareBalloon extends CommonBalloon {
  constructor(color, size) {
    super(color, size);
  }
  burst(index) {
    Game.balloons.splice(index, 1);
    Game.score += 10;
  }
}

class SuperRareBalloon extends CommonBalloon {
  constructor(color, size) {
    super(color, size);
  }
  burst(index) {
    Game.balloons.splice(index, 1);
    Game.score += 50;
  }
}

class RandomBalloon extends CommonBalloon {
  constructor(color, size) {
    super(color, size);
  }

  burst(index) {
    Game.notBalloons.splice(index, 1);
    Game.score += randPoints(-50, 100);
  }
}
function randPoints(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
}

class BadBalloon extends CommonBalloon {
  constructor(color, size) {
    super(color, size);
  }
  burst(index) {
    Game.notBalloons.splice(index, 1);
    Game.score -= 30;
  }
}
