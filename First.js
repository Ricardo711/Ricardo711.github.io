document.addEventListener("DOMContentLoaded", function() {
    const mainScreen = document.getElementById("main-screen");
    const startButton = document.getElementById("start-button");
    const gameScreen = document.getElementById("game-screen");
    const player1NameInput = document.getElementById("player1-name");
    const player2NameInput = document.getElementById("player2-name");

    player1NameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            startButton.click(); 
        }
    });

    player2NameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            startButton.click(); 
        }
    });

    startButton.addEventListener("click", function() {
        const player1Name = player1NameInput.value;
        const player2Name = player2NameInput.value;

        if (player1Name.trim() === "" || player2Name.trim() === "") {
            alert("Please enter both player names.");
            return;
        }
        mainScreen.style.display = "none";
        gameScreen.style.display = "block";
        startGame(player1Name, player2Name);;
    });
});

const questions = [
    {
        question: "A subset of what field machine learning is?",
        answers: ["AI", "Finance", "Geography"],
        correctAnswer: 0
    },
    {
        question: "What is supervised learning?",
        answers: ["Labels", "No labels", "Don't know"],
        correctAnswer: 0
    },
    {
        question: "Which algorithm is used for classification in machine learning?",
        answers: ["Decision Tree", "K-Means", "Reinforcement Learning"],
        correctAnswer: 0
    },
    {
        question: "What is the goal of unsupervised learning?",
        answers: ["To predict outcomes based on labeled data", "To cluster data points without labeled responses", "To optimize a function through trial and error"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is NOT a type of machine learning algorithm?",
        answers: ["Linear Regression", "Convolutional Neural Network", "ARIMA"],
        correctAnswer: 2
    },
    {
        question: "What is the purpose of the activation function in a neural network?",
        answers: ["To control the learning rate", "To determine the cost function", "To introduce non-linearity into the network"],
        correctAnswer: 2
    },
    {
        question: "What is overfitting in machine learning?",
        answers: ["When the model performs well on the training data but poorly on unseen data", "When the model performs poorly on the training data", "When the model cannot generalize to new data"],
        correctAnswer: 0
    },
    {
        question: "What is the role of a loss function in machine learning?",
        answers: ["To minimize the difference between predicted and actual values", "To maximize the accuracy of the model", "To determine the number of hidden layers in a neural network"],
        correctAnswer: 0
    },
    {
        question: "What is a hyperparameter in machine learning?",
        answers: ["A parameter that is learned by the model during training", "A parameter that determines the structure of the model", "A parameter that is set before the learning process begins"],
        correctAnswer: 2
    },
    {
        question: "What is the purpose of cross-validation in machine learning?",
        answers: ["To train the model on multiple datasets", "To evaluate the performance of the model on unseen data", "To increase the complexity of the model"],
        correctAnswer: 1
    }
];

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let currentQuestionIndex = 0;
let gameOver = false;
let player1QuestionsAnswered = 0;
let player2QuestionsAnswered = 0;

function startGame(player1Name, player2Name) {
    const player1ScoreElement = document.getElementById("player1-score");
    const player2ScoreElement = document.getElementById("player2-score");
    const playerTurnElement = document.getElementById("player-turn");

    player1ScoreElement.textContent = player1Name + "'s Score: ";
    player2ScoreElement.textContent = player2Name + "'s Score: ";
    playerTurnElement.textContent = player1Name + "'s turn";

    // Update player names on game screen
    document.getElementById("player1-name-display").textContent = player1Name;
    document.getElementById("player2-name-display").textContent = player2Name;

    displayQuestion();

}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answerButtonsElement = document.getElementById("answer-buttons");

    questionElement.textContent = questions[currentQuestionIndex].question;
    answerButtonsElement.innerHTML = "";

    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answerButtonsElement.appendChild(button);
    });

    document.getElementById("player-turn").textContent = `Player ${currentPlayer}'s turn`;
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    const answerButtons = document.querySelectorAll("#answer-buttons button");

    answerButtons.forEach((button, index) => {
        if (index === selectedIndex) {
            if (index === correctIndex) {
                button.style.backgroundColor = "#28a745"; 
            } else {
                button.style.backgroundColor = "#dc3545"; 
            }
            button.disabled = true; 
        }
    });

    if (selectedIndex === correctIndex) {
        if (currentPlayer === 1) {
            player1Score++;
            document.getElementById("player1-score").textContent = player1Score;
        } else {
            player2Score++;
            document.getElementById("player2-score").textContent = player2Score;
        }
    }

    if (currentPlayer === 1) {
        player1QuestionsAnswered++;
    } else {
        player2QuestionsAnswered++;
    }

    if (currentPlayer === 1 && player1QuestionsAnswered === questions.length) {
        currentPlayer = 2;
        currentQuestionIndex = 0;
        displayQuestion();
    } else if (currentPlayer === 2 && player2QuestionsAnswered === questions.length) {
        endGame();
    } else {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function endGame() {
    const winnerMessageElement = document.getElementById("winner-message");
    if (player1Score > player2Score) {
        winnerMessageElement.textContent = "Player 1 wins!";
    } else if (player2Score > player1Score) {
        winnerMessageElement.textContent = "Player 2 wins!";
    } else {
        winnerMessageElement.textContent = "It's a tie!";
    }

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "block";
    gameOver = true;
}

function restartGame() {
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    currentQuestionIndex = 0;
    gameOver = false;
    player1QuestionsAnswered = 0;
    player2QuestionsAnswered = 0;

    // Reset the score display for both players
    document.getElementById("player1-score").textContent = player1Score;
    document.getElementById("player2-score").textContent = player2Score;

    // Hide game-related screens and show the main screen
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("main-screen").style.display = "block";

    // Display a new question
    displayQuestion();
}

document.getElementById("next-button").addEventListener("click", () => {
    currentPlayer = 2;
    document.getElementById("player-turn").textContent = `Player ${currentPlayer}'s turn`;
    displayQuestion();
});
document.getElementById("restart-button").addEventListener("click", restartGame);
