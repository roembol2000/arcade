var Width = 640; // 640
var Height = 680; // 680
var yField = 600; // 600
var xField = 600; // 600

var HeadSize = 20; // ? 20 * 20; ? //
var xSnake = HeadSize * 3;
var ySnake = yField / 2;
var direction = "right";
var snakeColor;
var waitTime = 100;
var move = true;
var gamemodes = ["Standaard", "Hard mode", "Easy mode"]
var mode = 0;
var verwerkt = true;

var moveBuffer = [];
var bufferSize = 2;

var Snake;
var moves = 2;
var length = 4;
var coordinates = [{"x": HeadSize * 2, "y": ySnake},{"x": xSnake, "y": ySnake}];
var activeSnake = [];
var score = 0;
var xFood;
var yFood;
var start = false;
var keyDown = true;

// ! localScor(ag)e
var HighScore = localStorage.getItem("Localscore");
if (HighScore === null) {
  var HighScore = 0;
}

function setup(){
  MonoMedium = loadFont('DMMono-Medium.otf');
  createCanvas(Width, Height);
  reset();
}

function draw(){
  if (start) {
    if(move) {
      
      gamemode();
      background(0); // #Black
      fill(40); // #Gray
      rect(20, 60, xField, yField);
      scoreboard();
      if (moveBuffer[0]) {
        direction = moveBuffer[0]
        moveBuffer.shift();
      }
      Snake.move();
      move = false;
      setTimeout(() => {move = true}, waitTime);
    }

    noStroke();
    fill(255, 0, 0); // rood
    rect(xFood  + 20, yFood  + 60, HeadSize, HeadSize);
    detectKeyPress();
    Snake.display();
    Snake.botsDetect();
  } else {
    startScreen();
  }
}

function reset() {
  xSnake = HeadSize * 3;
  ySnake = yField / 2;
  moves = 2;
  length = 4;
  coordinates = [{"x": HeadSize * 2, "y": ySnake},{"x": xSnake, "y": ySnake}];
  activeSnake = [];
  score = 0;
  direction = "right";
  move = true;
  Snake = new snake();
  food();
}

function startScreen () {
  fill(40) // gray
  rect(0, 0, Width, Height);
  fill(255);
  textFont(MonoMedium);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Score: " + score + "   HighScore: " + HighScore, width/2, 30);
  textSize(30);
  if (keyIsDown(DOWN_ARROW) || keyDown) {
    text("< " + gamemodes[mode] + " >", Width/2, Height/2 - 30);
    fill(6,203,121);
    text("Play.", Width/2, Height/2 + 30);
    keyDown = true;
    if (keyIsDown(32) || keyIsDown(ENTER)){
      reset();
      start = true;
    }
  }
  if (keyIsDown(UP_ARROW) || keyDown === false) {
    if (verwerkt){
      if (keyIsDown(LEFT_ARROW)){
        mode --;
        verwerkt = false;
        setTimeout(() => {verwerkt = true; console.log("Verwerkt")}, 300);
      } else if (keyIsDown(RIGHT_ARROW)) {
        mode ++;
        verwerkt = false;
        setTimeout(() => {verwerkt = true; console.log("Verwerkt")}, 300);
      }
      if (mode < 0) {mode = 2};
      if (mode > 2) {mode = 0};
      
      
    } 
    text("Play.", Width/2, Height/2 + 30);
    fill(6,203,121);
    text("< " + gamemodes[mode] + " >", Width/2, Height/2 - 30);
    keyDown = false;
  }
}

function gamemode() {
  if (mode == 0) {
    waitTime = 100;
    snakeColor = [200,200,200];
  } 
  if (mode == 1) {
    waitTime = 50;
    snakeColor = [6,203,121];
  } 
  if (mode == 2) {
    waitTime = 150;
    snakeColor = [0,102,184];
  }
}

function detectKeyPress() {
  if (moveBuffer.length < bufferSize) {
    if (keyIsDown(UP_ARROW) && 
        direction !== "down" && 
        direction !== "up" && 
        moveBuffer[moveBuffer.length-1] !== "up"){
      moveBuffer.push("up");
    } 
    if (keyIsDown(DOWN_ARROW) && 
        direction !== "up" && 
        direction !== "down" &&
        moveBuffer[moveBuffer.length-1] !== "down"){
      moveBuffer.push("down");
    } 
    if (keyIsDown(LEFT_ARROW) && 
        direction !== "right" && 
        direction !== "left" &&
        moveBuffer[moveBuffer.length-1] !== "left"){
      moveBuffer.push("left");
    }
    if (keyIsDown(RIGHT_ARROW) && 
        direction !== "left" && 
        direction !== "right" &&
        moveBuffer[moveBuffer.length-1] !== "right"){
      moveBuffer.push("right");
    }
  }
}

function food() {
  xFood = int(random(0, 30)) * HeadSize;
  yFood = int(random(0,30)) * HeadSize;
  if (activeSnake.length >> 0) {
    for(var i = 1; i < length - 1; i++) { // i != 0, want dat is de snakehead zelf;
      if(activeSnake[i].x == xFood && activeSnake[i].y == yFood) {
        food();
      }
    }
  }
}

function scoreboard() {
  // ! highScore
  if (score >= HighScore) {
    HighScore = score;
    localStorage.setItem("Localscore", HighScore);
    // console.log(localStorage.getItem("Localscore"));
  }

  // * display score
  fill(255);
  textSize(20);
  textFont(MonoMedium);
  text("Score: " + score + "   HighScore: " + HighScore, 160, 40);
}

class snake {
  botsDetect() {
    if (ySnake < 0 || ySnake > yField - HeadSize || xSnake < 0 || xSnake > xField - HeadSize) { // met zich muur
      direction = "false";
      moveBuffer = [];
      saveScore("snake", localStorage.getItem("Localscore"));
    }
    for(var i = 1; i < length - 1; i++) { // i != 0, want dat is snakehead
      if(activeSnake[i].x == xSnake && activeSnake[i].y == ySnake) { // bot met zich zelf
        start = false;
        saveScore("snake", localStorage.getItem("Localscore"));
      }
    }
    if(ySnake == yFood && xSnake == xFood) {
      food();
      length += 2;
      score ++;
    }
    
  }

  move() {
      if (direction == "up") {
        ySnake -= HeadSize;
      }
      if (direction == "down") {
        ySnake += HeadSize;
      }
      if (direction == "left") {
        xSnake -= HeadSize;
      }
      if (direction == "right") {
        xSnake += HeadSize;
      }
      moves += 1;
      coordinates.push({"x": xSnake, "y": ySnake});
  }

  display() {
    fill(snakeColor[0], snakeColor[1], snakeColor[2])
    strokeWeight(2);
    stroke(40);
    rect(xSnake + 20, ySnake + 60, HeadSize, HeadSize); // ? head ? //
    activeSnake = [];
    let i;
    let X = "";
    let Y = "";
    for(i = moves - 1; i > moves - length; i--) {
      X = coordinates[i].x;
      Y = coordinates[i].y;
      rect(X + 20, Y + 60, HeadSize, HeadSize);
      activeSnake.push({"x": X, "y": Y});
    }
    noStroke();
  }
}