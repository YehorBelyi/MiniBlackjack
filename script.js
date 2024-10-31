let userScore = 0;
let botScore = 0;
let attempts = 0;
const MAX_ATTEMPTS = 3;

const username = () => {
    while (true) {
        const playerName = prompt("Як до вас звертатись?");

        if (playerName === null) {
            alert("Ви не ввели своє ім'я! Спробуйте ще раз.");
            continue;
        }

        const newName = playerName.trim();

        if (newName === "") {
            alert("Поле не повинне бути пусте!");
        } else if (newName.length > 15) {
            alert("Ваше ім'я не може перевищувати 15 символів!");
        } else if (newName.length < 3) {
            alert("Ваше ім'я не може бути менше ніж 3 символи!");
        } else {
            return newName;
        }
    }
};

const playerName = username();
const playerNameVariable = document.querySelector("#username");
playerNameVariable.innerHTML = playerName;

const userScoreVariable = document.querySelector("#user-score");
userScoreVariable.innerHTML = `${userScore} `;

const botScoreVariable = document.querySelector("#bot-score");
botScoreVariable.innerHTML = `${botScore} `;

const attemptsVariable = document.querySelector("#attempts");
attemptsVariable.innerHTML = `Спроба ${attempts} з ${MAX_ATTEMPTS}`;

const cardSuit = ["diamonds", "clubs", "hearts", "spades"];
const cardValues = { 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, "jack": 2, "queen": 3, "king": 4, "ace": 11 };

const playerCardImg = document.querySelector(".player-area:first-child .player-card img");
const botCardImg = document.querySelector(".player-area:last-child .player-card img");

const playButton = document.querySelector(`.play-button input`);

const setWinner = document.querySelector('#winner-state');

document.querySelector(".win-screen").addEventListener('click', () => {
    document.querySelector(".win-screen").style.display = "none";
    resetScores();
});

playButton.addEventListener('click', () => {
    playerCardImg.setAttribute("src", `./images/backward-card.jpg`);
    botCardImg.setAttribute("src", `./images/backward-card.jpg`);

    playerCardImg.hidden = false;
    botCardImg.hidden = false;

    if (attempts < MAX_ATTEMPTS) {
        const currentCardSuit = Math.floor(Math.random() * cardSuit.length) + 1;
        console.log(cardSuit.length);

        switch (currentCardSuit) {
            case 1: {
                getPlayerCard(currentCardSuit);
                getBotCard(currentCardSuit);
                break;
            }
            case 2: {
                getPlayerCard(currentCardSuit);
                getBotCard(currentCardSuit);
                break;
            }
            case 3: {
                getPlayerCard(currentCardSuit);
                getBotCard(currentCardSuit);
                break;
            }
            case 4: {
                getPlayerCard(currentCardSuit);
                getBotCard(currentCardSuit);
                break;
            }
            default: {
                alert("Сталася помилка!");
                break;
            }
        }
        attempts++;
        attemptsVariable.innerHTML = `Спроба ${attempts} з ${MAX_ATTEMPTS}`;

        if (attempts === MAX_ATTEMPTS) {
            setTimeout(checkWinner, 800);
        }
    }
});

const getPlayerCard = (thisSuit) => {
    const keys = Object.keys(cardValues);
    const card = cardSuit[thisSuit - 1];
    const index = Math.floor(Math.random() * keys.length);
    const thisValue = keys[index];

    playerCardImg.classList.add("card-animate");


    setTimeout(() => {
        playerCardImg.setAttribute("src", `./images/cards/${thisValue}_of_${card}.png`);
        playerCardImg.setAttribute("style", `width: 230px; height: 330px;`);
        playerCardImg.classList.remove("card-animate");

        userScore += cardValues[thisValue];
        userScoreVariable.innerHTML = `${userScore} `;
    }, 600);
}

const getBotCard = (thisSuit) => {
    const keys = Object.keys(cardValues);
    const card = cardSuit[thisSuit - 1];
    const index = Math.floor(Math.random() * keys.length);
    const thisValue = keys[index];

    botCardImg.classList.add("card-animate");

    setTimeout(() => {
        botCardImg.setAttribute("src", `./images/cards/${thisValue}_of_${card}.png`);
        botCardImg.setAttribute("style", `width: 230px; height: 330px;`);
        botCardImg.classList.remove("card-animate");

        botScore += cardValues[thisValue];
        botScoreVariable.innerHTML = `${botScore} `;
    }, 600);
}


const checkWinner = () => {
    if (userScore > botScore) {
        setWinner.setAttribute("style", "color: green;");
        setWinner.innerHTML = `${playerName} переміг!`

    } else if (userScore < botScore) {
        setWinner.setAttribute("style", "color: red;");
        setWinner.innerHTML = `Комп'ютер переміг!`
    } else {
        setWinner.setAttribute("style", "color: blue;");
        setWinner.innerHTML = `Нічия!`
    }

    setTimeout(() => {
        document.querySelector(".win-screen").style.display = "flex";
    }, 1700)
}

const resetScores = () => {
    userScore = 0;
    botScore = 0;
    attempts = 0;

    userScoreVariable.innerHTML = `${userScore} `;
    botScoreVariable.innerHTML = `${botScore} `;
    attemptsVariable.innerHTML = `Спроба ${attempts} з ${MAX_ATTEMPTS}`;
}