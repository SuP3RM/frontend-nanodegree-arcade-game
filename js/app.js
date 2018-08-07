// References: https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/
// https://www.youtube.com/watch?v=JcQYGbg0IkQ

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;

    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not passed boundary
    if (this.x < this.boundary) {
      // increment x by speed * dt
      // move forward
      this.x += this.speed * dt;
    }
    else {
    this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Hero class
  // Constrctor
    // properties
      // x position
      // y position
      // sprite

    //methods
      // update position
        // check collision here
          // did player x and y collide with enemy?
          // check win here?
          // did player x and y reach final title?
      // Render
        // Draw player sprite on current x and y coord position
      // handle keyboard handleInput
        // update player's x and y property according to input
      // Reset hero
        // set x and y to starting x and y

class Hero {
  constructor() {
    this.step = 101;
    this.jump = 83;

    // referenced initial x and y coord so reset hero would be easier to call
    this.initialX = this.step * 2;
    this.initialY = (this.jump * 4) + 55;
    this.x = this.initialX;
    this.y = this.initialY;
    this.sprite = 'images/char-boy.png';
    this.winning = false;
  }

  // Draws Hero on the screen (same as enemy code)
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(input) {
    switch(input) {
      case 'left':
      if (this.x > 0) {
        this.x -= this.step;
      }
        break;
      case 'right':
        if (this.x < 404 ) {
          this.x += this.step;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.jump;
        }
        break;
      case 'down':
        if (this.y < 380)
        this.y += this.jump;
        break;
    }
  }

  update() {
    // check for collisions here
    for (let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + enemy.step/1.5 > this.x && enemy.x < this.x + this.step/1.5) ) {
          this.reset();
        }
    }
    // check win here?
    if(this.y === 55) {
      this.winning = true;
    }
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called 'allEnemies'
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101 * 2.5), 83, 300);

let allEnemies = [];
allEnemies.push(bug1, bug2, bug3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//clock/timer
let StopWatch = function StopWatch() {
  const self = this;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let timer;
  let on = false;

  self.startTimer = function(callback) {
    if (on === true) {
      return;
    }
    on = true;
    timer = setInterval(function() {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      if (callback && callback.constructor === Function) {
        callback();
      }
    }, 1000);
    console.log('timer started');
  }

  self.stopTimer = function() {
    clearInterval(timer);
    on = false;
    console.log('timer ended: ', self.getTimeString());
  }

  self.resetTimer = function() {
    self.stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  self.getTimeString = function() {
    let hour = hours > 9 ? String(hours) : '0' + String(hours);
    let minute = minutes > 9 ? String(minutes) : '0' + String(minutes);
    let second = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let timeString = hour + ':' + minute + ':' + second;
    return timeString;
  }

  self.getHours = function() {
    return hours;
  }

  self.getMinutes = function() {
    return minutes;
  }

  self.getSeconds = function() {
    return seconds;
  }
}

let watch = new StopWatch();
let timerText = document.querySelector('.timer');

function displayOnScreen() {
  watch.startTimer(function() {
    timerText.innerHTML = watch.getTimeString();
  });
}
displayOnScreen();
