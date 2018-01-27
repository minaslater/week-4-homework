$(function () {
  var player,
    attacker;
  var characters = {
    jeanGrey: {
      name: "Jean Grey",
      baseAttack: 3,
      attackPower: 3,
      health: 50,
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

  function startGame() {
    $("#jean-grey").html(characters.jeanGrey.displayHTML);
    $("#magneto").html(characters.magneto.displayHTML);
    $("#rogue").html(characters.rogue.displayHTML);
    $("#angel").html(characters.angel.displayHTML);
  }

  startGame();
});
