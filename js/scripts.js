
// Business End for game
var game = new Game();
player1 = new Player();
player2 = new Player();

function Game() {
  this.players = []
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

$(document).ready(function() {

  var diceClass = [" ", "dice1", "dice2", "dice3", "dice4", "dice5", "dice6"]

  function diceStringHTML(number) {
    return ("<img src=\"img/" + number + ".png\">")
  }

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

    var index = diceClass[currentRollValue];
    $("#dice-turn-roll-1").append(htmlText)
    $("#dice-display-1").text("")
    $("#dice-display-1").append(htmlText)


    var turnscoreDisplay = 0;
    player1.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      $("#turn-tally1").text(turnscoreDisplay);
    });


    if (currentRollValue === 1){
      $("#turn-tally1").text("0");
      $("#dice-turn-roll-1").text("");
    }
  });


  $("#roll-button2").click(function() {
    currentRollValue = player2.roll();

    var index = diceClass[currentRollValue];
    var htmlText = diceStringHTML(currentRollValue)
    $("#dice-turn-roll-2").append(htmlText)
    $("#dice-display-2").text("")
    $("#dice-display-2").append(htmlText)


    var turnscoreDisplay = 0;
    player2.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      $("#turn-tally2").text(turnscoreDisplay);
    });


    if (currentRollValue === 1) {
      $("#turn-tally2").text("0");
      $("#dice-turn-roll-2").text("");
    }
  });

  $("#hold-button1").click(function() {
    player1.endTurn();
    $("#player1-score").text(player1.totalscore);
    $("#turn-tally1").text(" ");
    $("#dice-turn-roll-1").text("");
  })

  $("#hold-button2").click(function() {
    player2.endTurn();
    $("#player2-score").text(player2.totalscore);
    $("#turn-tally2").text(" ");
    $("#dice-turn-roll-2").text("");
  })
});


// });
