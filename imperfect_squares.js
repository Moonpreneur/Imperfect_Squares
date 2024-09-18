let gameState = {
    playing: false,
    score: 0,
    action: null,
    timeRemaining: null,
    correctAnswer: null,
    happyEmojis: ['😊', '😁', '🎉', '👍', '😄'],
    sadEmojis: ['😞', '😢', '🙁', '😭', '👎']
};



// Start/Reset button click event handler
document.querySelector("#startreset").onclick = () => {
    if (gameState.playing) {
        // Reload the page if already playing
        location.reload();
    } else {
        // Start the game
        gameState.playing = true;
        gameState.score = 0;
        document.querySelector("#scorevalue").innerHTML = gameState.score;
        showElement("timeremaining");
        gameState.timeRemaining = 60;
        document.querySelector("#timeremainingvalue").innerHTML = gameState.timeRemaining;
        hideElement("gameOver");
        document.querySelector("#startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
};

// Answer box click event handlers
for (let i = 1; i < 5; i++) {
    document.querySelector("#box" + i).onclick = () => {
        if (gameState.playing) {
            const selectedAnswer = document.querySelector("#box" + i).innerHTML;
            const correctAnswer = gameState.correctAnswer;
            if (selectedAnswer === correctAnswer) {
                gameState.score += 2;
                document.querySelector("#scorevalue").innerHTML = gameState.score;
                hideElement("wrong");
                showElement("correct");
                showEmoji("correct");
                setTimeout(() => {
                    hideElement("correct");
                }, 1000);
                generateQA();
            } else {
                gameState.score -= 1;
                document.querySelector("#scorevalue").innerHTML = gameState.score;
                hideElement("correct");
                showElement("wrong");
                showEmoji("wrong");
                setTimeout(() => {
                    hideElement("wrong");
                }, 1000);
            }
        }
    };
}

// Countdown function
function startCountdown() {
    gameState.action = setInterval(() => {
        gameState.timeRemaining -= 1;
        document.querySelector("#timeremainingvalue").innerHTML = gameState.timeRemaining;
        if (gameState.timeRemaining == 0) {
            stopCountdown();
            showElement("gameOver");
            document.querySelector("#gameOver").innerHTML = "<p>Game Over!</p><p>Your score is : " + gameState.score + ".</p>";
            hideElement("timeremaining");
            hideElement("correct");
            hideElement("wrong");
            gameState.playing = false;
            document.querySelector("#startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

// Stop countdown function
function stopCountdown() {
    clearInterval(gameState.action);
}

// Utility function to hide elements
function hideElement(id) {
    document.querySelector("#" + id).style.display = "none";
}

// Utility function to show elements
function showElement(id) {
    document.querySelector("#" + id).style.display = "block";
}

function showEmoji(result) {
    const emojiElement = document.querySelector("#" + result);
    let emoji;
    if (result === "correct") {
        const shuffledHappyEmojis = shuffle(gameState.happyEmojis);
        emoji = shuffledHappyEmojis[0];
    } else if (result === "wrong") {
        const shuffledSadEmojis = shuffle(gameState.sadEmojis);
        emoji = shuffledSadEmojis[0];
    }
    emojiElement.innerHTML = `<span class="emoji">${emoji}</span>`;
}

// Function to generate questions and answers
function generateQA() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionObj = questions[randomIndex];
    const correspondingAnswer = answers.find(answer => answer.id === questionObj.id);

    document.querySelector("#question").innerHTML = questionObj.text;

    const shuffledChoices = shuffle(correspondingAnswer.choices);

    for (let i = 1; i < 5; i++) {
        document.querySelector("#box" + i).innerHTML = shuffledChoices[i - 1];
    }

    gameState.correctAnswer = correspondingAnswer.correct;
}

// Function to shuffle array elements
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

