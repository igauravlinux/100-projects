// DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("questions-text");
const answerContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-questions");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
    // first question
    {
        question: "What is the capital of india?",
        answers: [
            {text: "New Delhi" , correct: true},
            {text: "Assam" , correct: false},
            {text: "Bihar" , correct: false},
            {text: "Arunachal pradesh" , correct: false},
        ],
    },

    // second question
    {
        question: "What is the National bird of india?",
        answers: [
            {text: "Parrot" , correct: false},
            {text: "Peacock" , correct: true},
            {text: "Eagle" , correct: false},
            {text: "Crow" , correct: false},
        ],
    },
    // third question
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth" , correct: false},
            {text: "Mars" , correct: true},
            {text: "Jupiter" , correct: false},
            {text: "venus" , correct: false},
        ],
    },
    // fourth question
    {
        question: "What is the largest ocean in the world?",
        answers: [
            {text: "Atlantic Ocean" , correct: false},
            {text: "Indian Ocean" , correct: false},
            {text: "Pacific Ocean" , correct: true},
            {text: "Arctic Ocean" , correct: false},
        ],
    },
    // fifth question
    {
        question: "How many continents are there onn Earth?",
        answers: [
            {text: "Five" , correct: false},
            {text: "Six" , correct: false},
            {text: "Eight" , correct: false},
            {text: "Seven" , correct: true},
        ],
    },
];

 // QUIZ STATE WAS
    let currentQuestionIndex = 0;
    let score = 0;
    let answersDisabled = false;

    totalQuestionsSpan.textContent = quizQuestions.length;
    maxScoreSpan.textContent = quizQuestions.length;

    // event listeners

    startButton.addEventListener("click",startQuiz);
    restartButton.addEventListener("click",restartQuiz);

    function startQuiz(){
        // reset vars
        currentQuestionIndex = 0;
        score = 0;
        scoreSpan.textContent = 0;

        startScreen.classList.remove("active");
        quizScreen.classList.add("active");

        showQuestion()
    }

    function showQuestion(){
        // reset state
        answersDisabled = false

        const currentQuestion = quizQuestions[currentQuestionIndex]

        currentQuestionSpan.textContent = currentQuestionIndex + 1;

        const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
        progressBar.style.width = progressPercent + "%"
        
        questionText.textContent = currentQuestion.question

        answerContainer.innerHTML = "";

        currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button")
            button.textContent = answer.text
            button.classList.add("answer-btn")

            button.detaset.correct = answer.correct

            button.addEventListener("click",selectAnswer)

            answerContainer.appendChild(button)
        });
    }

    function selectAnswer(event){
        if(answersDisabled) return;

        answersDisabled = true
        
        const selectedButton = event.target;
        const isCorrect = selectedButton.detaset.correct === "true"

        Array.from(answerContainer.children).forEach(button =>{
            if(button.detaset.correct === "true"){
                button.classList.add("correct")
            }else{
                button.classList.add("incorrect")
            }
        });

        if(isCorrect){
            score++;
            scoreSpan.textContent = score
        }

        setTimeout(() => {
            currentQuestionIndex++;

            // check if there are more questions or if the quiz is over
            if(currentQuestionIndex < quizQuestions.length){
                showQuestion()
            }else{
                showResults()
            }
        },1000)
    }

    function showResults(){
        quizScreen.classList.remove("active");
        resultScreen.classList.add("active");

        finalScoreSpan.textContent = score;

        const percentage = (score/quizQuestions.length) * 100

        if(percentage === 100){
            resultMessage.textContent = "Perfect! You're a genius!"
        } else if(percentage >= 80){
            resultMessage.textContent = "Great job! You know your stuff!"
        } else if(percentage >= 60){
            resultMessage.textContent = "Good effort! Keep learning"
        }else if(percentage >= 40){
            resultMessage.textContent = "Not bad! Try again to improve!"
        }else{
            resultMessage.textContent = "Kyun nahi ho rahi padhai"
        }
    }

    function restartQuiz(){
        console.log("restart started");
    }





