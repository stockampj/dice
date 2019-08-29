
// Business End for game

    // Game constructor, which defines the object game and assigns players to the key value pair of game, starting as an empty array.
function Game() {
  this.players = []
}
    // prototype for game object that adds player objects to the Game objects key, making a pair.
Game.prototype.addPlayer = function (player){
  this.players.push(player);
}
//
Game.prototype.endGame = function (){

}


    // Business End for player
    // Player constructor. It defines the object Player and assigns name, totalscore, turnscore, rollvalue and turn to the key value pair of Player. Name key is assigned by the addName player prototype, others are hard coded.
function Player () {
  this.name = "name"
  this.totalscore = 0,
  this.turnscore = [],
  this.rollvalue = 0,
  this.turn = true
}
    // prototype for the player object that adds name to the player object key, creating a pair.
Player.prototype.addName = function (name) {
  this.name = name;
}

    // prototype for the player object that defines the variable roll (local), uses a math rng  function. If the roll is 1, is reassigns an empty array to the turnscore keypair (Player object) and it calls an endturn function. For any other roll, it pushes that integer to the turnscore keypair array (the turnscore array is a running log of all rolls that turn). It returns the value roll so that correct jQuery/HTML/CSS can show user's die grapics/roll history.
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
// prototype for the player object that defines the variable turnpoints and iterates elements in the turnscore array, adding each elements' value and then adding var turnpoints to the totalscore value. It sets player 1 and player 2 turn booleans to true and then sets the current ("this") player to false. Then, it resets the value of turnscore to an empy array (i.e. 0).
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

  // Front End
  // after well-known jamiroQuery function document ready is called (everyone understands this), we initialize a new game by declaring the variable so that other functions have access to it. Order Matters. We then declare
$(document).ready(function() {
  var game = new Game();
  player1 = new Player();
  player2 = new Player();

  // function telling the html to display particular images (die sides) based upon the value of the player roll. We define currentRollValue with jQuery click function, then use it as an argument with this function to define variable htmlText.)
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

    //variable htmltext calls the diceStringHTML function, taking currentRollValue as an argument, and appends the html assigned to that roll value to the div id dice display 1, determining hte image which will show for the roll.
    var htmlText = diceStringHTML(currentRollValue)
    $("#dice-turn-roll-1").prepend(htmlText)
    $("#dice-display-1").text("")
    $("#dice-display-1").prepend(htmlText)

    // tallies the turnscore (turn tallieeees) and sends that value to user display (html id turn tally 1)
    var turnscoreDisplay = 0;
    player1.turnscore.forEach(function(val) {
      turnscoreDisplay += val
      var standScore = turnscoreDisplay+player1.totalscore;
      console.log(standScore)
      $("#turn-tally1").text(standScore);
    });

    // when roll is 1, inserts a string "0" for turn-tally, empty text in the div which displays past rolls as die side images. Hidden is hardcoded into Bootstrap as a recognizable class, so here we are hiding the panel for whichever player rolled a 1 and un-hiding the other.
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
    // This function explicitly calls the endTurn function when the active player clicks the hold-button. It replaces the turn tally and dice turn roll ids with empty strings
  $("#hold-button1").click(function() {
    player1.endTurn();
    $(".player1-score").text(player1.totalscore);
    $("#turn-tally1").text(" ");
    $("#dice-turn-roll-1").text("");
    $("#player2-panel").removeClass("hidden")
    $("#player1-panel").addClass("hidden")
  })

  $("#hold-button2").click(function() {
    player2.endTurn();
    $(".player2-score").text(player2.totalscore);
    $("#turn-tally2").text(" ");
    $("#dice-turn-roll-2").text("");
    $("#player1-panel").removeClass("hidden")
    $("#player2-panel").addClass("hidden")
  })
});


// });
