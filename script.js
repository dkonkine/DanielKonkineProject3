const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choiceText'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let quizQuestions = [];

let questions = [
    {
        question: 'When was the first Formula 1 race?',
        choice1: '1950',
        choice2: '1960',
        choice3: '1970',
        choice4: '1930',
        answer: 1
    },
    {
        question: 'Who won the first Formula 1 race?',
        choice1: 'Michael Schumacher',
        choice2: 'Giuseppe Farina',
        choice3: 'Lewis Hamilton',
        choice4: 'Jack Black',
        answer: 2
    },
    {
        question: 'Who won the 2019 championship?',
        choice1: 'Lewis Hamilton',
        choice2: 'Lando Norris',
        choice3: 'Valterri Bottas',
        choice4: 'Sebastian Vettel',
        answer: 1
    },
    {
        question: 'What team won the 2019 Constructors Championship?',
        choice1: 'Ferrari',
        choice2: 'McLaren',
        choice3: 'Mercedes-Benz',
        choice4: 'Aston-Martin Red Bull Racing',
        answer: 3
    }
];

const correctBonus = 10;
const maxQuestions = 4;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${maxQuestions}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
            }

            if (classToApply === 'correct') {
                incrementScore(correctBonus)
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout( () => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 500)

    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startQuiz();