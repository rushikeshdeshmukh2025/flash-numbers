// Game State
let gameState = {
    score: 0,
    level: 1,
    currentQuestion: null,
    questionsAnswered: 0,
    maxQuestionsPerLevel: 5,
    timerInterval: null,
    timeRemaining: 100
};

// Fun emojis for counting - appealing to 6-year-olds
const countingEmojis = [
    ['🐶', '🐱', '🐭', '🐹', '🐰'], // Animals
    ['🍎', '🍌', '🍓', '🍒', '🍊'], // Fruits
    ['⚽', '🏀', '⚾', '🎾', '🏐'], // Sports
    ['🚗', '🚕', '🚙', '🚌', '🚎'], // Vehicles
    ['🌟', '⭐', '✨', '💫', '🌠'], // Stars
    ['🦋', '🐝', '🐞', '🦗', '🐛'], // Insects
    ['🌺', '🌻', '🌷', '🌹', '🌼'], // Flowers
    ['🎈', '🎁', '🎀', '🎊', '🎉'], // Party items
    ['🍭', '🍬', '🍫', '🍩', '🧁'], // Sweets
    ['🐠', '🐟', '🐡', '🦈', '🐙']  // Sea creatures
];

// Fun feedback messages
const correctMessages = [
    '🎉 Awesome!',
    '⭐ Super Star!',
    '🌟 Brilliant!',
    '🎊 Amazing!',
    '💫 Perfect!',
    '🎯 You got it!',
    '🚀 Fantastic!',
    '🏆 Champion!'
];

const encouragementMessages = [
    '💪 Try again!',
    '🌈 Almost there!',
    '🎈 Keep going!',
    '🌟 You can do it!',
    '🎨 Nice try!'
];

// Initialize game
function showWelcome() {
    document.getElementById('welcomeScreen').classList.add('active');
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.remove('active');
    resetGame();
}

function startGame() {
    resetGame();
    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    document.getElementById('resultsScreen').classList.remove('active');
    generateQuestion();
}

function resetGame() {
    gameState = {
        score: 0,
        level: 1,
        currentQuestion: null,
        questionsAnswered: 0,
        maxQuestionsPerLevel: 5,
        timerInterval: null,
        timeRemaining: 100
    };
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
}

// Generate a new question
function generateQuestion() {
    clearInterval(gameState.timerInterval);
    document.getElementById('feedback').textContent = '';
    
    // Clear any previous button states
    const answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = '';
    
    // Determine difficulty based on level
    let maxNumber;
    if (gameState.level === 1) {
        maxNumber = 5; // Count 1-5
    } else if (gameState.level === 2) {
        maxNumber = 10; // Count 1-10
    } else if (gameState.level === 3) {
        maxNumber = 15; // Count 1-15
    } else {
        maxNumber = 20; // Count 1-20
    }
    
    // Generate random count
    const correctAnswer = Math.floor(Math.random() * maxNumber) + 1;
    
    // Select random emoji category
    const emojiCategory = countingEmojis[Math.floor(Math.random() * countingEmojis.length)];
    const selectedEmoji = emojiCategory[Math.floor(Math.random() * emojiCategory.length)];
    
    // Store current question
    gameState.currentQuestion = {
        answer: correctAnswer,
        emoji: selectedEmoji
    };
    
    // Display the counting items
    displayCountingItems(selectedEmoji, correctAnswer);
    
    // Generate answer options
    generateAnswerOptions(correctAnswer, maxNumber);
    
    // Start timer
    startTimer();
}

function displayCountingItems(emoji, count) {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';
    
    let itemsPlaced = 0;
    
    // Create tens frames (groups of 10 in a single row)
    while (itemsPlaced < count || (itemsPlaced === 0 && count > 0)) {
        const frameContainer = document.createElement('div');
        frameContainer.className = 'frame-container';
        
        const itemsInThisFrame = Math.min(10, count - itemsPlaced);
        
        // Create one row with 10 boxes
        for (let i = 0; i < 10; i++) {
            const box = document.createElement('div');
            
            // Check if this box should have an object
            if (i < itemsInThisFrame) {
                box.className = 'frame-box filled';
                box.textContent = emoji;
                box.style.animationDelay = `${(itemsPlaced + i) * 0.08}s`;
            } else {
                box.className = 'frame-box empty';
            }
            
            // Add solid separator after 5th box
            if (i === 4) {
                box.classList.add('separator-after');
            }
            
            frameContainer.appendChild(box);
        }
        
        displayArea.appendChild(frameContainer);
        itemsPlaced += itemsInThisFrame;
        
        // If we've placed all items, break
        if (itemsPlaced >= count) break;
    }
}

function generateAnswerOptions(correctAnswer, maxNumber) {
    const answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = '';
    
    // Generate 4 unique options including the correct answer
    const options = new Set([correctAnswer]);
    
    while (options.size < 4) {
        let option = Math.floor(Math.random() * Math.min(maxNumber + 3, 20)) + 1;
        options.add(option);
    }
    
    // Convert to array and shuffle
    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
    
    // Create buttons
    optionsArray.forEach(option => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = option;
        button.disabled = false;
        button.onclick = () => checkAnswer(option, button);
        answerButtons.appendChild(button);
    });
}

function startTimer() {
    gameState.timeRemaining = 100;
    const timerBar = document.getElementById('timerBar');
    timerBar.style.width = '100%';
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining -= 1;
        timerBar.style.width = gameState.timeRemaining + '%';
        
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            handleTimeout();
        }
    }, 100); // Update every 100ms for smooth animation (10 seconds total)
}

function handleTimeout() {
    const feedback = document.getElementById('feedback');
    feedback.textContent = '⏰ Time\'s up! Try the next one!';
    
    // Disable all answer buttons
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        gameState.questionsAnswered++;
        checkLevelProgress();
    }, 2000);
}

function checkAnswer(selectedAnswer, button) {
    clearInterval(gameState.timerInterval);
    
    const feedback = document.getElementById('feedback');
    const buttons = document.querySelectorAll('.answer-button');
    
    // Remove any existing classes and disable all buttons
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = true;
    });
    
    if (selectedAnswer === gameState.currentQuestion.answer) {
        // Correct answer
        button.classList.add('correct');
        feedback.textContent = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        gameState.score += 10 * gameState.level;
        updateDisplay();
        
        // Play celebration animation
        createConfetti();
        
    } else {
        // Wrong answer
        button.classList.add('wrong');
        feedback.textContent = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
        
        // Highlight correct answer
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === gameState.currentQuestion.answer) {
                btn.classList.add('correct');
            }
        });
    }
    
    gameState.questionsAnswered++;
    
    // Move to next question after delay
    setTimeout(() => {
        checkLevelProgress();
    }, 2000);
}

function checkLevelProgress() {
    if (gameState.questionsAnswered >= gameState.maxQuestionsPerLevel) {
        gameState.level++;
        gameState.questionsAnswered = 0;
        
        if (gameState.level > 4) {
            showResults();
        } else {
            showLevelComplete();
        }
    } else {
        generateQuestion();
    }
}

function showLevelComplete() {
    const feedback = document.getElementById('feedback');
    feedback.textContent = `🎊 Level ${gameState.level - 1} Complete! 🎊`;
    
    setTimeout(() => {
        generateQuestion();
    }, 2000);
}

function showResults() {
    clearInterval(gameState.timerInterval);
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    document.getElementById('finalScore').textContent = gameState.score;
    
    // Create fireworks effect
    createFireworks();
}

// Visual effects
function createConfetti() {
    const confettiCount = 30;
    const displayArea = document.getElementById('displayArea');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['🎉', '⭐', '🌟', '✨', '💫'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '0';
        confetti.style.fontSize = '2em';
        confetti.style.animation = `fall ${1 + Math.random()}s linear forwards`;
        confetti.style.zIndex = '1000';
        
        displayArea.style.position = 'relative';
        displayArea.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

function createFireworks() {
    const resultsContent = document.querySelector('.results-content');
    const fireworksCount = 20;
    
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.textContent = ['🎆', '🎇', '✨', '💥', '🌟'][Math.floor(Math.random() * 5)];
            firework.style.position = 'absolute';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.fontSize = '3em';
            firework.style.animation = 'pulse 1s ease-out forwards';
            
            resultsContent.style.position = 'relative';
            resultsContent.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
}

// Add CSS animation for confetti falling
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(300px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize welcome screen on load
window.addEventListener('load', () => {
    showWelcome();
});

// Prevent accidental page refresh
window.addEventListener('beforeunload', (e) => {
    if (gameState.questionsAnswered > 0 && gameState.level <= 4) {
        e.preventDefault();
        e.returnValue = '';
    }
});
