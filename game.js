const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progress-text")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progress-bar-full")

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
]

const CORRECT_BONUS = 10
const MAX_QUESTIONS = 3

startGame = () => {
  score = 0
  questionCounter = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("recentScore", score)
    // go to the end page
    return window.location.assign("end.html")
  }

  questionCounter++
  progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const index = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[index]
  question.innerText = currentQuestion.question

  choices.forEach((choice) => {
    const number = choice.dataset["number"]
    choice.innerText = currentQuestion["choice" + number]
  })

  availableQuestions.splice(index, 1)
  acceptingAnswers = true
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return

    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"]

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)

    if (classToApply === "correct") incrementScore(CORRECT_BONUS)
  })
})

incrementScore = (num) => {
  score += num
  scoreText.innerText = score
}

startGame()
