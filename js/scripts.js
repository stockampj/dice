// Business End for game
function Game (player1, player2){
  this.player1 = player1,
  this.player2 = player2,
}

// Game.prototype.addNames function (name1, name2){
//     this.player1 = name1;
//     this.player2 = name2;
// }


// Business End for player
function Player (name)
  this.name = name,
  this.totalscore = 0,
  this.turnscore = [],
  this.rollvalue = 0,
  this.turn = true;
}

Player.prototype.roll function (){
  var roll = Math.floor(Math.random()*6)+1
  if (roll === 1){
    // this.turn = false
  } else if
}





// Front End
$(document).ready(function() {
  $(" ").submit(function(event) {
    event.preventDefault();
