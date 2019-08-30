// Business End for game

function Game() {
  this.players = []
}

var game = new Game();

Game.prototype.addPlayer = function (player){
  this.players.push(player);
}

Game.prototype.endGame = function (){
  if (player1.totalscore > player2.totalscore) {
    player1.winner = true;
    console.log("player 1 wins")
  } else if (player2.totalscore > player1.totalscore) {
    player2.winner = true;
    console.log("player 2 wins")
  } else {
    console.log("endstate failure")
  }
}

function Player () {
  this.name = "name"
  this.totalscore = 0,
  this.turnscore = [],
  this.rollvalue = 0,
  this.turn = true,
  this.winner = false
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
  player1.turn = true
  player2.turn = true
  this.turn = false
  this.turnscore = [];
  if (this.totalscore >= 100) {
    game.endGame();
  }
}



$(document).ready(function() {
  player1 = new Player();
  player2 = new Player();

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
    $(".player1display").text(player1name);
    $(".player2display").text(player2name);
    $("#splashscreen").hide();
    $("#gamescreen").fadeIn(1000);
  });

  $("#roll-button1").click(function() {
    currentRollValue = player1.roll();

    var htmlText = diceStringHTML(currentRollValue)
    $("#dice-turn-roll-1").prepend(htmlText)
    $("#dice-display-1").text("")
    $("#dice-display-1").prepend(htmlText)

    var turnscoreDisplay = 0;
    player1.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      var standScore = turnscoreDisplay+player1.totalscore;
      console.log(standScore)
      $("#turn-tally1").text(standScore);
    });


    if (currentRollValue === 1){
      $("#turn-tally1").text("0");
      $("#dice-turn-roll-1").text("");
      $("#player2-panel").removeClass("hidden");
      $("#player1-panel").addClass("hidden");
    }
  });


  $("#roll-button2").click(function() {
    currentRollValue = player2.roll();

    var htmlText = diceStringHTML(currentRollValue)
    $("#dice-turn-roll-2").prepend(htmlText)
    $("#dice-display-2").text("")
    $("#dice-display-2").prepend(htmlText)


    var turnscoreDisplay = 0;
    player2.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      var standScore = turnscoreDisplay+player2.totalscore;
      console.log(standScore)
      $("#turn-tally2").text(standScore);
    });

    if (currentRollValue === 1) {
      $("#turn-tally2").text("0");
      $("#dice-turn-roll-2").text("");
      $("#player1-panel").removeClass("hidden");
      $("#player2-panel").addClass("hidden");
    }
  });


  $("#hold-button1").click(function() {
    player1.endTurn();
    $(".player1-score").text(player1.totalscore);
    $("#turn-tally1").text(" ");
    $("#dice-turn-roll-1").text("");
    $("#player2-panel").removeClass("hidden")
    $("#player1-panel").addClass("hidden")
    if (player1.winner === true) {
      $(".winscreen").show();
      $(".winscreen").addClass("red")
      $("#winner").text(player1.name)
    }
  })

  $("#hold-button2").click(function() {
    player2.endTurn();
    $(".player2-score").text(player2.totalscore);
    $("#turn-tally2").text(" ");
    $("#dice-turn-roll-2").text("");
    $("#player1-panel").removeClass("hidden")
    $("#player2-panel").addClass("hidden");
    if (player2.winner === true) {
      $(".winscreen").show();
      $(".winscreen").addClass("blue")
      $("#winner").text(player2.name)
    }

  })

  $("#replay").click(function() {
    $(".winscreen").removeClass("blue");
    $(".winscreen").removeClass("red");
    $(".winscreen").hide();
    $("#splashscreen").show();
    $("#gamescreen").hide();
    player1.totalscore = 0;
    player2.totalscore = 0;
    $(".player1-score").text(player2.totalscore);
    $(".player2-score").text(player2.totalscore);
  })

});


// });
