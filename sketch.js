let bugs = []; // array to store bugs
let bugImage, squishedBugImage,DeadBugImage; // images for bug and squished bug
let squishedCount = 0; // number of bugs squished
let timer = 30; // timer for 30 seconds
let gameOver = false; // flag for game over


function preload() {
  bugImage = loadImage('assets/bug.gif'); // load the bug image
  squishedBugImage = loadImage('assets/squishedBug.gif'); // load the squished bug image
  DeadBugImage = loadImage('assets/deadbug.png');
}

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    bugs.push(new Bug()); // create 10 bugs and store them in the array
  }
}

function draw() {
  background(255);
  // for (let bug of bugs) {
  //   bug.move();
  //   bug.display();
  // }
  for (let i = bugs.length - 1; i >= 0; i--) {
    let bug = bugs[i];
    bug.move();
    bug.display();
   
  }

  fill(0);
  textSize(20);
  text('Bugs Squished: ' + squishedCount, 20, 30);
  text(`Time: ${floor(timer)}`, 20, 60);
  if (timer > 0 && !gameOver) {
    timer -= 0.0167; // decrement timer by 0.05 every frame
  } else {
    gameOver = true; // set game over flag to true
    fill(255, 0, 0);
    textSize(40);
    text('Game Over', width / 2 - 70, height / 2);
  }
  
}

function mousePressed() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      if(bugs[i].dead){
         squishedCount +=0;
         break;   
      }esle{
        bugs[i].dead = true;
        squishedCount++; // increment squished count
        break;
      }   
    }
  }
}

class Bug {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = 2;
    this.direction = random(360);
    this.dead = false; // flag to check if bug is dead
    this.squished = false;
  }

  // move() {
  //   this.x += random(-this.speed, this.speed);
  //   this.y += random(-this.speed, this.speed);
  // }

  
  move() {
    if(!this.dead){
      this.x += cos(radians(this.direction)) * this.speed;
      this.y += sin(radians(this.direction)) * this.speed;
      if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
        this.direction += 45;
      }
    }
    
  }

  display() {
    if (this.squished) {
      image(squishedBugImage, this.x, this.y); 
      this.squished = false;
    } 
    else if(this.dead){ 
      image(DeadBugImage, this.x, this.y);// display squished bug image
    }
    else {
      image(bugImage, this.x, this.y); // display bug image
    }
  }

  isClicked(x, y) {
    // check if mouse click is within the bug image
    let d = dist(x, y, this.x, this.y);
    if (d < bugImage.width) {
      this.dead = true;
      this.squished=true;
      return true;
    } else {
      return false;
    }
  }
}
