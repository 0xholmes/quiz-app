const username = document.querySelector("#username")
const saveScoreBtn = document.querySelector("#save-score-btn")
const finalScore = document.querySelector("#final-score")
const recentScore = localStorage.getItem("recentScore")
finalScore.innerText = recentScore

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value
})

saveHighScore = (e) => {
  e.preventDefault()
}
