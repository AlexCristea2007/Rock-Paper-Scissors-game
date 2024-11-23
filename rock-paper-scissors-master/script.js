const score = document.querySelector(".score");
let scoreValue = 0;

const originalChoosingStep = document.querySelector(".original-choosing-step");
const chooseBtns = document.querySelectorAll(".choose-btn");
let choicesValue = new Array(2);
let result = [false, false];

const originalFightingStep = document.querySelector(".original-fighting-step");
const user = document.querySelector(".user");
const house = document.querySelector(".house");
const userChoice = document.querySelector(".user-choice");
const houseChoice = document.querySelector(".house-choice");
const choicesPreview = document.querySelectorAll(".choice-preview");
const logosPreview = document.querySelectorAll(".choice-preview .circle img");
const userChoiceWaves = document.querySelectorAll(
  '.user-choice [class ^= "wave"]'
);
const houseChoiceWaves = document.querySelectorAll(
  '.house-choice [class ^= "wave"]'
);

const resultScreen = document.querySelector(".result-screen");
const resultScreenText = document.querySelector(".result-screen span");
const playAgainBtn = document.querySelector(".play-again-btn");

const rules = document.querySelector(".rules-container");
const brightnessBg = document.querySelector(".bg-brightness");
const rulesBtn = document.querySelector(".rules-btn ");
const closeRulesBtn = document.querySelector(".close-rules-btn");

/* Game Steps */
chooseBtns.forEach((chooseBtn, index) => {
  chooseBtn.addEventListener("click", () => {
    choicesValue[0] = index;
    console.log(index);
    choicesValue[1] = Math.floor(Math.random() * 3);

    choicesValue.forEach((choice, index2) => {
      if (choice === 0) {
        choicesPreview[index2].style.backgroundImage = "var(--paper-gradient)";
        logosPreview[index2].src = "images/icon-paper.svg";
      } else if (choice === 1) {
        choicesPreview[index2].style.backgroundImage =
          "var(--scissors-gradient)";
        logosPreview[index2].src = "images/icon-scissors.svg";
      } else {
        choicesPreview[index2].style.backgroundImage = "var(--rock-gradient)";
        logosPreview[index2].src = "images/icon-rock.svg";
      }
    });

    compare(choicesValue[0], choicesValue[1]);
    if (result[0] === true) {
      resultScreenText.textContent = "You win";
    } else if (result[1] === true) {
      resultScreenText.textContent = "You lose";
    } else {
      resultScreenText.textContent = "tie";
    }

    choicesPreview[1].style.opacity = "0";
    originalChoosingStep.style.display = "none";
    originalFightingStep.style.display = "flex";

    setTimeout(() => {
      choicesPreview[1].style.opacity = "1";
    }, 3000);
    setTimeout(() => {
      if (window.innerWidth > 980) {
        user.style.transform = "translateX(-5vw)";
        house.style.transform = "translateX(5vw)";
      }
    }, 6000);
    setTimeout(() => {
      resultScreen.style.display = "flex";
      resultScreen.style.opacity = "1";

      if (result[0] === true) {
        userChoiceWaves.forEach((wave) => {
          wave.style.display = "inline-block";
        });
        userChoiceWaves[0].style.opacity = "0.375";
        userChoiceWaves[0].style.opacity = "0.35";
        userChoiceWaves[0].style.opacity = "0.325";

        scoreValue++;
        score.textContent = scoreValue;
      } else if (result[1] === true) {
        houseChoiceWaves.forEach((wave) => {
          wave.style.display = "inline-block";
        });
        houseChoiceWaves[0].style.opacity = "0.375";
        houseChoiceWaves[0].style.opacity = "0.35";
        houseChoiceWaves[0].style.opacity = "0.325";

        scoreValue = 0;
        score.textContent = scoreValue;
      }
    }, 7000);
  });
});

function compare(userValue, houseValue) {
  switch (userValue) {
    case 0:
      switch (houseValue) {
        case 0:
          result = [false, false]; // P - P
          break;
        case 1:
          result = [false, true]; // P - S
          break;
        case 2:
          result = [true, false]; // P - R
          break;
      }
      break;
    case 1:
      switch (houseValue) {
        case 0:
          result = [true, false]; // S - P
          break;
        case 1:
          result = [false, false]; // S - S
          break;
        case 2:
          result = [false, true]; // S - R
          break;
      }
      break;
    case 2:
      switch (houseValue) {
        case 0:
          result = [false, true]; // R - P
          break;
        case 1:
          result = [true, false]; // R - S
          break;
        case 2:
          result = [false, false]; // R - R
          break;
      }
      break;
  }
}

playAgainBtn.addEventListener("click", () => {
  resultScreen.style.display = "none";
  resultScreen.style.opacity = "0";

  choicesPreview[1].style.opacity = "0";

  user.style.transform = "translateX(0)";
  house.style.transform = "translateX(0)";

  userChoiceWaves.forEach((wave) => {
    wave.style.display = "none";
  });
  houseChoiceWaves.forEach((wave) => {
    wave.style.display = "none";
  });

  originalFightingStep.style.display = "none";
  originalChoosingStep.style.display = "inline-block";
});

/* Game Rules */
rulesBtn.addEventListener("click", () => {
  rules.style.display = "flex";
  brightnessBg.style.display = "inline-block";
});
closeRulesBtn.addEventListener("click", () => {
  rules.style.display = "none";
  brightnessBg.style.display = "none";
});
