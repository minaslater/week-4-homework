$(function () {
  startGame();
});

var player,
    attacker,
    alertMessage = $("#alert-message");
var characters = {
  jeanGrey: {
    name: "Jean Grey",
    baseAttack: 10,
    attackPower: 10,
    hitPoints: 220,
    counterAttackPower: 15,
    displayHTML: "<div id='jean-grey__img'><img class='character__image' src='assets/images/jean-grey.jpg' alt='jean grey' /></div><div id='jean-grey__hp' class='hp'>50</div>"
  },
  magneto: {
    name: "Magneto",
    baseAttack: 11,
    attackPower: 11,
    hitPoints: 250,
    counterAttackPower: 17,
    displayHTML: "<div id='magneto__img'><img class='character__image' src='assets/images/magneto.jpg' alt='magneto' /></div><div id='magneto__hp' class='hp'>45</div>"
  },
  rogue: {
    name: "Rogue",
    baseAttack: 9,
    attackPower: 9,
    hitPoints: 260,
    counterAttackPower: 16,
    displayHTML: "<div id='rogue__img'><img class='character__image' src='assets/images/rogue.gif' alt='rogue' /></div><div id='rogue__hp' class='hp'>60</div>"
  },
  angel: {
    name: "Angel",
    baseAttack: 8,
    attackPower: 8,
    hitPoints: 240,
    counterAttackPower: 18,
    displayHTML: "<div id='angel__img'><img class='character__image' src='assets/images/angel.jpg' alt='angel' /></div><div id='angel__hp' class='hp'>90</div>"
  }
}

function createStartingDivs() {
  var jgDiv = $("<div>");
  var magnetoDiv = $("<div>");
  var rogueDiv = $("<div>");
  var angelDiv = $("<div>");
  jgDiv.attr("id", "jean-grey");
  magnetoDiv.attr("id", "magneto");
  rogueDiv.attr("id", "rogue");
  angelDiv.attr("id", "angel");
  jgDiv.attr("data-name", "jeanGrey");
  magnetoDiv.attr("data-name", "magneto");
  rogueDiv.attr("data-name", "rogue");
  angelDiv.attr("data-name", "angel");
  $("#available-characters").append(jgDiv);
  $("#available-characters").append(magnetoDiv);
  $("#available-characters").append(rogueDiv);
  $("#available-characters").append(angelDiv);
  $("#available-characters div").addClass("character__div character")
}

function startGame() {
  alertMessage.text("Choose your player").removeClass("disappear");
  $.modal.close();
  $("#characters").show();
  $("#game-play").hide();
  $("#attack-button").on("click", processAttack);
  $("#attack-button").hide();
  createStartingDivs();
  $("#jean-grey").html(characters.jeanGrey.displayHTML);
  $("#magneto").html(characters.magneto.displayHTML);
  $("#rogue").html(characters.rogue.displayHTML);
  $("#angel").html(characters.angel.displayHTML);
  $(".character").on("click", selectPlayer);
  $(".play-again").on("click", function () {
    location.reload();
  });
}

function selectPlayer(event) {
  player = characters[$(this).data("name")];
  alertMessage.text("Choose an enemy to attack");
  $("#game-play").show();
  var playerHTML = $(event.currentTarget).html();
  $("#current__player").html(playerHTML);
  $(this).remove();
  var enemyHTML = $("#available-characters").html();
  $("#enemies").html(enemyHTML);
  $("#characters").hide();
  $("#available-characters").empty();
  $(".character__div").removeClass("character");
  $("#enemies").children().addClass("enemies");
  $(".enemies").on("click", selectAttacker);
}

function selectAttacker(event) {
  attacker = characters[$(this).data("name")];
  alertMessage.text("Click button to attack. Good Luck!")
  var attackerHTML = $(event.currentTarget).html();
  $("#attack-button").show();
  $("#current__attacker").html(attackerHTML);
  $(this).remove();
  $(".enemies").off("click", selectAttacker);
}

function processAttack() {
  alertMessage.addClass("disappear");
  attacker.hitPoints -= player.attackPower;
  $("#current__attacker .hp").text(attacker.hitPoints.toString());
  if (checkProgress()) {
    return;
  }
  player.hitPoints -= attacker.counterAttackPower;
  $("#current__player .hp").text(player.hitPoints.toString());
  player.attackPower += player.baseAttack;
  checkProgress();
}

function checkProgress() {
  var gameOver = false;
  if (player.hitPoints <= 0) {
    $("#you-lose").modal({
      escapeClose: false,
      clickClose: false,
      showClose: false
    });
    $("#attack-button").hide();
    gameOver = true;
  } else if (attacker.hitPoints <= 0) {
    $("#attack-button").hide();
    if ($("#enemies").children().length) {
      alertMessage.text("Choose another enemy").removeClass("disappear");
      $(".enemies").on("click", selectAttacker);
      var defeatedHTML = "<div class='character__div'>" + $("#current__attacker").html() + "</div>";
      $("#current__attacker").empty();
      $("#defeated").append(defeatedHTML);
    } else {
      $("#you-win").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
      });
      gameOver = true;
    }
  }
  return gameOver;
}