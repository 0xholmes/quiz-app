const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progress-text")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progress-bar-full")
const loader = document.querySelector("#loader")
const game = document.querySelector("#game")

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = []

getQuestion = async () => {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  )
  const data = await res.json()
  questions = data.results.map((questionData) => {
    const formatted = {
      question: questionData.question,
    }

    const answerChoices = [...questionData.incorrect_answers]
    formatted.answer = Math.floor(Math.random() * 4) + 1
    answerChoices.splice(formatted.answer - 1, 0, questionData.correct_answer)

    answerChoices.forEach((choice, index) => {
      formatted["choice" + (index + 1)] = choice
    })

    return formatted
  })
  startGame()
}

getQuestion()

const CORRECT_BONUS = 10
const MAX_QUESTIONS = 10

startGame = () => {
  score = 0
  questionCounter = 0
  availableQuestions = [...questions]
  getNewQuestion()
  game.classList.remove("hidden")
  loader.classList.add("hidden")
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
