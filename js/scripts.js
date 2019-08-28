// Business End for game
function Game (player){
  this.players = []
  // this.player1 = player1,
  // this.player2 = player2
}

Game.prototype.addPlayer = function (player){
    this.players.push(player);
}


// Business End for player
function Player (name) {
  this.name = name,
  this.totalscore = 0,
  this.turnscore = [],
  this.rollvalue = 0,
  this.turn = true;
}

Player.prototype.roll = function() {
  var roll = Math.floor(Math.random()*6)+1
  if (roll === 1) {
    this.turnscore = [];
    this.endTurn();
  } else {
      this.turnscore.push(roll);
  }
}

Player.prototype.endTurn = function() {
  var turnpoints = 0;
  this.turnscore.forEach(function(val) {
    turnpoints = turnpoints + val;
  });
  this.totalscore += turnpoints;
    this.turn = false
}





// Front End
// $(document).ready(function() {
//   $(" ").submit(function(event) {
//     event.preventDefault();
