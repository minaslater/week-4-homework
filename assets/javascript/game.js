$(function () {
  

  startGame();


});

var player,
    attacker;
  var characters = {
    jeanGrey: {
      name: "Jean Grey",
      baseAttack: 3,
      attackPower: 3,
      hitPoints: 50,
      counterAttackPower: 4,
      displayHTML: "<div id='jean-grey__img'><img class='character__image' src='assets/images/jean-grey.jpg' alt='jean grey' /></div><div id='jean-grey__hp'>50</div>"
    },
    magneto: {
      name: "Magneto",
      baseAttack: 6,
      attackPower: 6,
      hitPoints: 45,
      counterAttackPower: 3,
      displayHTML: "<div id='magneto__img'><img class='character__image' src='assets/images/magneto.jpg' alt='magneto' /></div><div id='magneto__hp'>45</div>"
    },
    rogue: {
      name: "Rogue",
      baseAttack: 5,
      attackPower: 5,
      hitPoints: 60,
      counterAttackPower: 9,
      displayHTML: "<div id='rogue__img'><img class='character__image' src='assets/images/rogue.gif' alt='rogue' /></div><div id='rogue__hp'>60</div>"
    },
    angel: {
      name: "Angel",
      baseAttack: 7,
      attackPower: 7,
      hitPoints: 90,
      counterAttackPower: 8,
      displayHTML: "<div id='angel__img'><img class='character__image' src='assets/images/angel.jpg' alt='angel' /></div><div id='angel__hp'>90</div>"
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
    $("#attack-button").hide();
    createStartingDivs();
    $("#jean-grey").html(characters.jeanGrey.displayHTML);
    $("#magneto").html(characters.magneto.displayHTML);
    $("#rogue").html(characters.rogue.displayHTML);
    $("#angel").html(characters.angel.displayHTML);
    $(".character").on("click", selectPlayer)
  }

  function selectPlayer(event) {
    player = characters[$(this).data("name")];
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
    var attackerHTML = $(event.currentTarget).html();
    $("#attack-button").show();
    $("#current__attacker").html(attackerHTML);
    $(this).remove();
    $(".enemies").off("click", selectAttacker);
    $("#attack-button").on("click", processAttack);
  }

  function processAttack() {
    player.hitPoints -= attacker.counterAttackPower;
    console.log("player", player.hitPoints);
    attacker.hitPoints -= player.attackPower;
    console.log("attacker", attacker.hitPoints);
    player.attackPower += player.baseAttack;
    console.log("player power", player.attackPower);
  }

