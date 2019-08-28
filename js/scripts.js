// Business End for game
var game = new Game();
player1 = new Player();
player2 = new Player();

function Game() {
  this.players = []
  // this.player1 = player1,
  // this.player2 = player2
}

Game.prototype.addPlayer = function (player){
    this.players.push(player);
}

Game.prototype.endGame = function (){

}


// Business End for player
function Player () {
  this.name = "name"
  this.totalscore = 0,
  this.turnscore = [],
  this.rollvalue = 0,
  this.turn = true;
}

Player.prototype.addName = function (name) {
  this.name = name;
}


Player.prototype.roll = function() {
  var roll = Math.floor(Math.random()*6)+1
  if (roll === 1) {
    this.turnscore = [];
    this.endTurn();
  } else {
      this.turnscore.push(roll);
  }
  return roll;
}

Player.prototype.endTurn = function() {
  var turnpoints = 0;
  this.turnscore.forEach(function(val) {
    turnpoints = turnpoints + val;
  });
  this.totalscore += turnpoints;
  this.turn = false
  this.turnscore = [];
}

// Front End
var diceClass = [" ", "dice1", "dice2", "dice3", "dice4", "dice5", "dice6"]

$(document).ready(function() {
  $("#start").submit(function(event) {
    event.preventDefault();
    var player1name = $("#player1-name").val();
    var player2name = $("#player2-name").val();
    player1.addName(player1name);
    player2.addName(player2name);
    game.addPlayer(player1);
    game.addPlayer(player2);
  });

  $("#roll-button1").click(function() {
    player1.roll();
    console.log(player1.roll());
    var index = diceClass[player1.roll()];
    console.log(index);
    // $("#dice-display-1").addClass(class);
  });
});
