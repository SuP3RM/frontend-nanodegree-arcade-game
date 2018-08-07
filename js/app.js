
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
const bug1 = new Enemy(-101, 0, 100);
const bug2 = new Enemy(-101, 83, 200);
const bug3 = new Enemy((-101 * 2.5), 83, 200);

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
