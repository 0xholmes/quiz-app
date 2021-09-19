const username = document.querySelector("#username")
const saveScoreBtn = document.querySelector("#save-score-btn")
const finalScore = document.querySelector("#final-score")
const highScore = JSON.parse(localStorage.getItem("highScore")) || []

const recentScore = localStorage.getItem("recentScore")
finalScore.innerText = recentScore

const MAX_HIGH_SCORES = 5

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value
})

saveHighScore = (e) => {
  e.preventDefault()

  const score = {
    score: recentScore,
    name: username.value,
  }
  highScore.push(score)
  highScore.sort((a, b) => b.score - a.score)
  highScore.splice(MAX_HIGH_SCORES)

  localStorage.setItem("highScore", JSON.stringify(highScore))
  window.location.assign("/")
}
