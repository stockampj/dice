
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
    $("#player1display").text(player1name);
    $("#player2display").text(player2name);
  });

  $("#roll-button1").click(function() {
    currentRollValue = player1.roll();
    console.log(currentRollValue);
    var index = diceClass[currentRollValue];
    console.log(index);
    $("#dice-display-1").removeClass("dice1");
    $("#dice-display-1").removeClass("dice2");
    $("#dice-display-1").removeClass("dice3");
    $("#dice-display-1").removeClass("dice4");
    $("#dice-display-1").removeClass("dice5");
    $("#dice-display-1").removeClass("dice6");
    $("#dice-display-1").addClass(index);

    var turnscoreDisplay = 0;
    player1.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      $("#turn-tally1").text(turnscoreDisplay);
    });
    if (currentRollValue === 1){
      $("#turn-tally1").text("0");
    }
  });


  $("#roll-button2").click(function() {
    currentRollValue = player2.roll();
    console.log(currentRollValue);
    var index = diceClass[currentRollValue];
    console.log(index);
    $("#dice-display-2").removeClass("dice1");
    $("#dice-display-2").removeClass("dice2");
    $("#dice-display-2").removeClass("dice3");
    $("#dice-display-2").removeClass("dice4");
    $("#dice-display-2").removeClass("dice5");
    $("#dice-display-2").removeClass("dice6");
    $("#dice-display-2").addClass(index);

    var turnscoreDisplay = 0;
    player2.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      $("#turn-tally2").text(turnscoreDisplay);
    });
    if (currentRollValue === 1) {
      $("#turn-tally2").text("0");
    }
  });

  $("#hold-button1").click(function() {
    player1.endTurn();
    $("#player1-score").text(player1.totalscore);
    $("#turn-tally1").text(" ");
  })

  $("#hold-button2").click(function() {
    player2.endTurn();
    $("#player2-score").text(player2.totalscore);
    $("#turn-tally2").text(" ");
  })
});


// });
