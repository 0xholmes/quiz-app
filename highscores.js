const highScoresList = document.querySelector("#high-scores-list")
const highScore = JSON.parse(localStorage.getItem("highScore")) || []

highScoresList.innerHTML = highScore
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
  })
  .join("")
