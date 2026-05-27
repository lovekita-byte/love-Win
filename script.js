// --- CONFIGURATION ---
const CORRECT_PASSWORD = "042726";

// Quiz Questions - Complete 10 Questions
const questions = [
    {
        question: "Kapag sinabi kong 'okay lang ako,' ano dapat mong gawin? 😭",
        options: ["A. Maniwala agad", "B. Kulitin pa", "C. Lambingin ako", "D. Mag-sorry kahit di mo alam bakit 😂"],
        answer: 2 // C
    },
    {
        question: "Kapag nagtatampo ako, ano kailangan? 😌",
        options: ["A. Space", "B. Food", "C. Lambing", "D. Ikaw 😂"],
        answer: 2 // C
    },
    {
        question: "Kapag biglang cold reply, ibig sabihin? 💀",
        options: ["A. Pagod", "B. Galit", "C. Nag-ooverthink", "D. Lahat"],
        answer: 2 // C
    },
    {
        question: "Kung mahal mo ako, bakit mo ako inaaway? 😭",
        options: ["A. Kulang sa lambing", "B. Toyo mode", "C. Miss lang kita", "D. all of the above 😂"],
        answer: 3 // D
    },
    {
        question: "Bakit mo ako love? 🥰",
        options: ["A. Cute ako", "B. Mabait ako", "C. Wala ka nang choice", "D. Lahat tama"],
        answer: 3 // D
    },
    {
        question: "Kung love language=time+presence ano kulang kapag lagi kang busy ? 😤",
        options: ["A. Signal📶", "B. Nanlalamig🥶", "C. Aso🙄", "D. Ako😘"],
        answer: 3 // D
    },
    {
        question: "Kung love = effort + time, ano kulang kapag cold na?",
        options: ["A. Wifi", "B. Effort", "C. Tulog", "D. Lambing"],
        answer: 3 // B
    },
    {
        question: "Kung 1 kiss = 100% attention, ano mangyayari kapag 0 kiss?",
        options: ["A. Normal lang🥺", "B. Walang kilig🥶", "C. Di mo na ako love😔", "D. Need na pa welding para mag ka spark😏"],
        answer: 3 // D
    },
    {
        question: "Kung 1 effort = 100% love, pero 50% lang binibigay?",
        options: ["A. True love", "B. Stable", "C. Half warm half cold", "D. Aircon mode"],
        answer: 2 // C
    },
    {
        question: "1 sweet msg = 10 kilig, 1 lambing+kiss = 20 kilig. Alin mas mataas?",
        options: ["A. Sweet messages", "B. Lambing + kiss", "C. Pantay", "D. Overload"],
        answer: 1 // B
    }
];

// --- VARIABLES ---
let currentQuestionIndex = 0;
let currentScore = 0;

// --- FUNCTIONS ---

// Generate floating hearts background
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const heartChars = ['❤️', '💕', '💗', '💖', '💘'];
    
    for(let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'fheart';
        heart.innerText = heartChars[Math.floor(Math.random() * heartChars.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(heart);
    }
}

// Check Password
function checkPassword() {
    const input = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if(input === CORRECT_PASSWORD) {
        // Move to Quiz
        document.getElementById('lockContainer').classList.remove('active');
        document.getElementById('quizContainer').classList.add('active');
        startQuiz();
    } else {
        // Show error
        errorMsg.style.display = 'block';
        input.value = '';
        setTimeout(() => { errorMsg.style.display = 'none'; }, 2000);
    }
}

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const q = questions[currentQuestionIndex];
    
    // Update text
    document.getElementById('questionText').innerText = q.question;
    document.getElementById('currentQ').innerText = currentQuestionIndex + 1;
    document.getElementById('totalQ').innerText = questions.length;
    document.getElementById('score').innerText = currentScore;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Generate buttons
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => selectAnswer(index);
        container.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;
    
    if(selectedIndex === correctIndex) {
        currentScore++;
    }
    
    currentQuestionIndex++;
    
    if(currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// Finish Quiz
function finishQuiz() {
    document.getElementById('quizContainer').classList.remove('active');
    
    if(currentScore >= 8) {
        // Passed! Show modal
        document.getElementById('loveModal').style.display = 'flex';
    } else {
        // Failed! Show fail screen
        document.getElementById('failContainer').classList.add('active');
        document.getElementById('finalScore').innerText = currentScore;
    }
}

// Retry Quiz
function retryQuiz() {
    document.getElementById('failContainer').classList.remove('active');
    document.getElementById('quizContainer').classList.add('active');
    startQuiz();
}

// Restart All
function restartAll() {
    document.getElementById('failContainer').classList.remove('active');
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('lockContainer').classList.add('active');
    document.getElementById('password').value = '';
    document.getElementById('errorMsg').style.display = 'none';
}

// Close Modal
function closeModal() {
    document.getElementById('loveModal').style.display = 'none';
}

// Initialize
createHearts();