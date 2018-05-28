// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Setting the Enemy initial location
    this.x = x;
    this.y = y;
    //Setting the Enemy speed
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    //Update the Enemy location
    if(this.x > 505){
      this.x = -55;
    }
    //Handle collision with the Player
    //START of code chipset that is inspired from GitHub user "brenopolanski"
    if(player.x < this.x + 80 &&
        player.x + 60 > this.x &&
        player.y < this.y + 20 &&
        30 + player.y > this.y)
    {
    //END of GitHub code chipset
      player.x=200;
      player.y=390;
      lives -= 1;

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
  // The image/sprite for our Player
  this.sprite = 'images/char-boy.png';
  //Setting the player initial location
  this.x = x;
  this.y = y;
  //Setting the player speed :
  player.x=200;
  player.y=390;

};

// Update the Player's
Player.prototype.update = function(dt) {
  //Check if game over when player moves.
  CheckIfGameOver();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Moves player according to input
Player.prototype.handleInput = function(Arrow){
if(Arrow == 'left' && this.x > 0 && lives >= 0)
this.x -= 101;
else if (Arrow == 'right' && this.x < 400 && lives >= 0)
this.x += 101;
else if (Arrow == 'down' && this.y < 350 && lives >= 0)
this.y += 83;
else if (Arrow == 'up' && this.y > 0 && lives >= 0)
this.y -= 83;
else if (Arrow == 'up' && this.y <= 0 && lives >= 0)
{
  this.y = 390;
  this.x = 200;
  CheckIfWin();
}

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200,390);
var allEnemies = [new Enemy (-200,60,200),new Enemy (-1,145,150),new Enemy (-1,225,100) ];
var lives = 3;

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


//Check if player has enough "lives" left to continue playing. Otherwise GAME OVER and game restarts.
function CheckIfGameOver(){
  if (lives <= 0){
    alert("GAME OVER ! \n Click OK to retry");
    location.reload();
  }
};

//Check if player has reached water.
function CheckIfWin(){
  alert("YOU WIN ! ");
  location.reload();

};
