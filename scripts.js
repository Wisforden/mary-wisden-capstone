document.addEventListener("DOMContentLoaded", () => {
  const rollButton = document.getElementById("roll-button");
  const clearButton = document.getElementById("clear-button");

  //An Array (Mary.W)
  const diceConfig = [
    {
      sides: 4,
      display: document.getElementById("d4-value"),
      checkbox: document.getElementById("d4-checkbox"),
      countInput: document.getElementById("d4-count"),
    },
    {
      sides: 6,
      display: document.getElementById("d6-value"),
      checkbox: document.getElementById("d6-checkbox"),
      countInput: document.getElementById("d6-count"),
    },
    {
      sides: 8,
      display: document.getElementById("d8-value"),
      checkbox: document.getElementById("d8-checkbox"),
      countInput: document.getElementById("d8-count"),
    },
    {
      sides: 10,
      display: document.getElementById("d10-value"),
      checkbox: document.getElementById("d10-checkbox"),
      countInput: document.getElementById("d10-count"),
    },
    {
      sides: "percentile",
      display: document.getElementById("percentile-value"),
      checkbox: document.getElementById("percentile-checkbox"),
      countInput: document.getElementById("percentile-count"),
    },
    {
      sides: 12,
      display: document.getElementById("d12-value"),
      checkbox: document.getElementById("d12-checkbox"),
      countInput: document.getElementById("d12-count"),
    },
    {
      sides: 20,
      display: document.getElementById("d20-value"),
      checkbox: document.getElementById("d20-checkbox"),
      countInput: document.getElementById("d20-count"),
    },
  ];

  // Math Funcations YUCK (Mary .W)
  function rollDie(sides) {
    if (sides === "percentile") {
      const roll = Math.floor(Math.random() * 10) * 10;
      return roll === 0 ? "00" : roll;
    }
    return Math.floor(Math.random() * sides) + 1;
  }

  function getRollCount(inputElement) {
    if (inputElement) {
      const value = parseInt(inputElement.value, 10);
      return isNaN(value) || value < 1 ? 1 : value;
    }
    return 1;
  }

  function rollSingleDieConfig(die, count = 1) {
    if (!die.display) return;

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(rollDie(die.sides));
    }

    die.display.innerText = rolls.join(", ");
  }

  function playTurn() {
    diceConfig.forEach((die) => {
      if (die.checkbox && die.checkbox.checked) {
        const currentCount = getRollCount(die.countInput);
        rollSingleDieConfig(die, currentCount);
      }
    });
  }

  function clearAllRolls() {
    diceConfig.forEach((die) => {
      if (die.display) {
        die.display.innerText = "-";
      }
      if (die.countInput) {
        die.countInput.value = "1";
      }
      if (die.checkbox) {
        die.checkbox.checked = false;
      }
    });

    const selectAllButton = document.getElementById("select-button");
    selectAllButton.addEventListener("click", () => {
      diceConfig.forEach((die) => {
        if (die.checkbox) {
          die.checkbox.checked = true;
        }
      });
    });
  }

  //Button listeners (Mary. W)
  if (rollButton != null) {
    rollButton.addEventListener("click", playTurn);
  } else {
    console.error("The button element with class 'roll-button' was not found!");
  }

  if (clearButton != null) {
    clearButton.addEventListener("click", clearAllRolls);
  } else {
    console.error("The button element with id 'clear-button' was not found!");
  }
});

// Prompts (Mary. W)
let userName = prompt("What is your name, adventurer?");

let userLocation = prompt("Where are you Adventurer?");

let welcomeName = document.getElementById("welcome_name");
if (userName != null && userName != "") {
  welcomeName.innerText = `${userName}, let's get rolling!`;
} else {
  welcomeName.innerText = "Ain't you a brave boy?";
}

let adventureStarts = document.getElementById("adventure_starts");
if (userLocation != null && userLocation != "") {
  adventureStarts.innerText = `Our adventure begins in ${userLocation}`;
} else {
  adventureStarts.innerText = "Coming from nowhere!";
}
