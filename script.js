import confetti from 'canvas-confetti';
import { lessons } from './questions.js';

// Start Screen elements
const startScreen = document.getElementById('start-screen');
const nameInput = document.getElementById('name-input');
const avatarOptions = document.querySelectorAll('.avatar-option');
const startBtn = document.getElementById('start-btn');

// Game elements
const gameContainer = document.getElementById('game-container');
const playerAvatar = document.getElementById('player-avatar');
const playerNameEl = document.getElementById('player-name');
const coinCountEl = document.getElementById('coin-count');
const timerBar = document.getElementById('timer-bar');
const progressBar = document.getElementById('progress-bar');
const promptText = document.getElementById('prompt-text');
const optionsContainer = document.getElementById('options-container');
const checkBtn = document.getElementById('check-btn');
const continueBtn = document.getElementById('continue-btn');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const muteBtn = document.getElementById('mute-btn');
const bgMusic = document.getElementById('bg-music');
const restartBtn = document.getElementById('restart-btn');

let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let selectedOption = null;
let questions = lessons[currentLevelIndex];
let timerInterval;
const TIME_LIMIT = 30; // 30 seconds
let awaitingLevelLoad = false; // new flag to coordinate Continue behavior

// Player data
let playerName = '';
let playerAvatarSrc = '';
let coins = 0;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let soundBuffers = {};

async function loadSound(name, url) {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        soundBuffers[name] = audioBuffer;
    } catch (error) {
        console.error(`Error loading sound: ${name}`, error);
    }
}

function playSound(name) {
    if (soundBuffers[name] && audioContext.state !== 'suspended' && !bgMusic.muted) {
        const source = audioContext.createBufferSource();
        source.buffer = soundBuffers[name];
        source.connect(audioContext.destination);
        source.start(0);
    } else if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';

    // This forces a reflow, ensuring the transition starts from 100%
    void timerBar.offsetWidth;

    timerBar.style.transition = `width ${TIME_LIMIT}s linear`;
    timerBar.style.width = '0%';

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    const computedStyle = window.getComputedStyle(timerBar);
    const width = computedStyle.getPropertyValue('width');
    timerBar.style.transition = 'none';
    timerBar.style.width = width;
}

function handleTimeUp() {
    playSound('incorrect');
    feedbackTitle.textContent = '¡Se acabó el tiempo!';

    const lesson = lessons[currentLevelIndex];
    // support both quiz arrays and non-quiz (flashcard) lessons
    const question = Array.isArray(lesson) ? lesson[currentQuestionIndex] : null;
    let correctAns = '';

    if (question) {
        if (question.type === 'fill-in') correctAns = question.answer;
        else if (question.options) {
            const opt = question.options.find(o => o.isCorrect);
            correctAns = opt ? (opt.text || '') : '';
        }
    }

    feedbackText.textContent = correctAns ? `Respuesta correcta: "${correctAns}"` : '';
    // use classList instead of replacing className so we don't wipe 'visible' or event handlers
    feedbackContainer.classList.remove('correct', 'incorrect');
    feedbackContainer.classList.add('incorrect');
    continueBtn.classList.remove('incorrect-btn');
    continueBtn.classList.add('incorrect-btn');

    // Disable inputs/options
    document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
    const fillInput = document.querySelector('.fill-in-group input');
    if (fillInput) { fillInput.disabled = true; }

    showFeedback();
}

function loadLevel() {
    questions = lessons[currentLevelIndex];
    currentQuestionIndex = 0;
    updateProgressBar();
    showQuestion();
}

function showQuestion() {
    selectedOption = null;
    checkBtn.disabled = true;
    checkBtn.classList.remove('hidden');
    continueBtn.classList.add('hidden');
    
    const lesson = lessons[currentLevelIndex];
    promptText.textContent = lesson.title || "Elige la opción correcta";
    optionsContainer.innerHTML = '';

    // Handle flashcard type lesson
    if (lesson.type === 'flashcard') {
        optionsContainer.className = 'flashcard-grid';
        lesson.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.classList.add('flashcard');
            cardEl.innerHTML = `
                <div class="flashcard-main">${card.main}</div>
                <div class="flashcard-pronunciation">${card.pronunciation}</div>
                ${card.example ? `<div class="flashcard-example">${card.example}</div>` : ''}
            `;
            optionsContainer.appendChild(cardEl);
        });
        checkBtn.classList.add('hidden');
        continueBtn.classList.remove('hidden');
        // avoid attaching a separate onclick handler here (we use the shared continueBtn listener)
        continueBtn.onclick = null;
        continueBtn.textContent = 'Continuar';
        stopTimer();
        timerBar.style.width = '100%';
        return;
    }

    // Handle quiz type lesson (arrays of questions)
    optionsContainer.className = '';
    const question = lesson[currentQuestionIndex];
    promptText.textContent = question.prompt;

    // New: fill-in (completar) type handling
    if (question.type === 'fill-in') {
        optionsContainer.innerHTML = `
            <div class="fill-in-group">
                <input id="fill-input" list="fill-suggestions" type="text" placeholder="Escribe la palabra en inglés" autocomplete="off">
                <datalist id="fill-suggestions"></datalist>
                <div class="fill-hint">${question.hint || ''}</div>
            </div>
        `;
        // populate suggestions and wire up input below
        const fillInput = document.getElementById('fill-input');
        const dataList = document.getElementById('fill-suggestions');
        // add the expected answer as a suggestion (simple autocomplete)
        if (dataList && question.answer) {
            dataList.innerHTML = `<option value="${question.answer}">`;
        }
        fillInput.addEventListener('input', () => {
            checkBtn.disabled = fillInput.value.trim() === '';
        });
        checkBtn.disabled = true;
        stopTimer();
        timerBar.style.width = '100%';
        return;
    }

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.dataset.index = index;

        if (question.type === 'multiple-choice-image') {
            optionElement.innerHTML = `
                <img src="${option.image}" alt="${option.text}">
                <div class="option-text">
                    <span class="english-text">${option.text}</span>
                    <span class="spanish-text">${option.translation}</span>
                </div>
            `;
        } else { // multiple-choice-text
             optionElement.innerHTML = `
                <div class="option-text">
                    <span class="english-text">${option.text}</span>
                    <span class="spanish-text">${option.translation}</span>
                </div>
            `;
        }

        optionElement.addEventListener('click', () => selectOption(optionElement));
        optionsContainer.appendChild(optionElement);
    });
    startTimer();
}

function selectOption(optionElement) {
    const previouslySelected = document.querySelector('.option.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    optionElement.classList.add('selected');
    selectedOption = optionElement;
    checkBtn.disabled = false;
}

function checkAnswer() {
    const lesson = lessons[currentLevelIndex];
    const question = lesson ? lesson[currentQuestionIndex] : null;

    // Handle fill-in questions separately
    if (question && question.type === 'fill-in') {
        const input = document.getElementById('fill-input');
        if (!input) return;
        const answer = input.value.trim().toLowerCase();
        // Disable input and stop timer
        input.disabled = true;
        stopTimer();

        // accept exact word match (case-insensitive) and simple numeric matches
        const expected = String(question.answer).toLowerCase();
        if (answer === expected || answer === String(Number(question.answer)).toLowerCase()) {
            playSound('correct');
            feedbackTitle.textContent = '¡Excelente!';
            feedbackText.textContent = '+10 Monedas';
            feedbackContainer.classList.remove('incorrect');
            feedbackContainer.classList.add('correct');
            coins += 10;
            coinCountEl.textContent = coins;
            showFeedback();
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        } else {
            playSound('incorrect');
            feedbackTitle.textContent = 'Incorrecto';
            feedbackText.textContent = `Respuesta correcta: "${question.answer}"`;
            feedbackContainer.classList.remove('correct');
            feedbackContainer.classList.add('incorrect');
            showFeedback();
        }
        return;
    }

    if (!selectedOption) return;
    stopTimer();

    checkBtn.disabled = true;
    // Disable options after checking
    document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

    const selectedIndex = parseInt(selectedOption.dataset.index, 10);
    const currentQ = lesson[currentQuestionIndex];
    const correctOption = currentQ.options[selectedIndex];

    if (correctOption && correctOption.isCorrect) {
        handleCorrectAnswer();
    } else {
        handleIncorrectAnswer(currentQ);
    }
}

function handleCorrectAnswer() {
    playSound('correct');
    feedbackTitle.textContent = '¡Excelente!';
    feedbackText.textContent = '+10 Monedas';
    // keep existing classes and add correct marker
    feedbackContainer.classList.remove('incorrect');
    feedbackContainer.classList.add('correct');
    continueBtn.classList.remove('incorrect-btn');
    
    coins += 10;
    coinCountEl.textContent = coins;

    showFeedback();
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function handleIncorrectAnswer(question) {
    playSound('incorrect');
    const correctOpt = question.options ? question.options.find(opt => opt.isCorrect) : null;
    const correctAns = correctOpt ? correctOpt.text : '';
    feedbackTitle.textContent = 'Incorrecto';
    feedbackText.textContent = correctAns ? `Respuesta correcta: "${correctAns}"` : '';
    feedbackContainer.classList.remove('correct');
    feedbackContainer.classList.add('incorrect');
    continueBtn.classList.remove('incorrect-btn');
    continueBtn.classList.add('incorrect-btn');
    showFeedback();
}

function showFeedback() {
    feedbackContainer.classList.add('visible');
    checkBtn.classList.add('hidden');
    continueBtn.classList.remove('hidden');
}

function hideFeedback() {
    feedbackContainer.classList.remove('visible');
    checkBtn.classList.remove('hidden');
    continueBtn.classList.add('hidden');
}

function nextQuestion() {
    hideFeedback();

    // if we are awaiting a level load (after finishing a lesson), perform it
    if (awaitingLevelLoad) {
        awaitingLevelLoad = false;
        loadLevel();
        return;
    }
    
    const lesson = lessons[currentLevelIndex];
    // If current lesson is a flashcard object, treat it as completed and show level-complete
    if (lesson && lesson.type === 'flashcard') {
        showLevelComplete();
        return;
    }

    // Only advance question index for quiz-style lessons (arrays)
    if (Array.isArray(lesson)) {
        currentQuestionIndex++;
        if (currentQuestionIndex < lesson.length) {
            updateProgressBar();
            showQuestion();
            return;
        } else {
            showLevelComplete();
            return;
        }
    } else {
        // fallback - if lesson unexpectedly not an array, go to level complete
        showLevelComplete();
        return;
    }
}

function updateProgressBar() {
    const lesson = lessons[currentLevelIndex];
    if (lesson && lesson.type === 'flashcard') {
        progressBar.style.width = '0%';
        return;
    }
    const total = Array.isArray(lesson) ? lesson.length : (questions && questions.length) || 1;
    const progress = ((currentQuestionIndex) / total) * 100;
    progressBar.style.width = `${progress}%`;
}

function showLevelComplete() {
    playSound('level_complete'); // usar la clave cargada, no filename
    hideFeedback();
    progressBar.style.width = '100%';
    const lesson = lessons[currentLevelIndex];
    const title = lesson.title || `Nivel ${currentLevelIndex - 2} Completado!`;
    promptText.textContent = `¡Lección Completada: ${title}!`;
    optionsContainer.innerHTML = `<p class="completion-message">¡Gran trabajo, ${playerName}!</p>`;
    checkBtn.classList.add('hidden');

    // prepare continue button to load next level via the global nextQuestion handler
    currentLevelIndex++;
    if (currentLevelIndex < lessons.length) {
        awaitingLevelLoad = true;
        continueBtn.textContent = 'Continuar';
        continueBtn.classList.remove('hidden');
    } else {
        promptText.textContent = "¡Has completado todas las lecciones!";
        optionsContainer.innerHTML += `<p class="completion-message">¡Felicidades, eres una estrella de PlayLingua!</p>`;
        continueBtn.classList.add('hidden');
        restartBtn.classList.remove('hidden');
    }

    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
    });
}

function startGame() {
    playerName = nameInput.value;
    playerNameEl.textContent = playerName;
    playerAvatar.src = playerAvatarSrc;
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    muteBtn.classList.remove('hidden');
    bgMusic.play().catch(e => console.log("Playback prevented"));
    loadLevel();
}

function setupStartScreen() {
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '' && playerAvatarSrc !== '') {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    });

    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            playerAvatarSrc = option.dataset.avatar;
            if (nameInput.value.trim() !== '') {
                startBtn.disabled = false;
            }
        });
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', () => window.location.reload());
    muteBtn.classList.add('hidden');
}

async function initialize() {
    await Promise.all([
        loadSound('correct', 'correct.mp3'),
        loadSound('incorrect', 'incorrect.mp3'),
        loadSound('level_complete', 'level_complete.mp3')
    ]);
    
    // Resume audio context and play music on first user interaction during startup
    function userInteractionHandler() {
        audioContext.resume();
        document.body.removeEventListener('click', userInteractionHandler);
    }
    document.body.addEventListener('click', userInteractionHandler);
    
    checkBtn.addEventListener('click', checkAnswer);
    continueBtn.addEventListener('click', nextQuestion);
    
    muteBtn.addEventListener('click', () => {
        bgMusic.muted = !bgMusic.muted;
        // show 🔇 when muted, 🔊 when sound is on
        muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
        if (bgMusic.muted) {
            // pause audio context to save resources
            if (audioContext.state !== 'suspended') audioContext.suspend();
        } else {
            audioContext.resume();
        }
    });

    setupStartScreen();
}

initialize();