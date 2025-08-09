import { questions } from "../constants/constants.js";
import { caculateScore } from "../util/operations.js";
import { generateQuestions } from "../util/generateQuestions.js";
import { createTimer } from "../state/timer.js";
import getHighScore from "../state/highScore.js";

let currentIndex = 0;
const app = document.getElementById("root") || document.body;
const highScoreContainer = document.createElement("div");
highScoreContainer.innerText = "Highest Score : " + getHighScore();

let currentTimer = null;

const startTimer = () => {
  if (currentTimer) {
    clearInterval(currentTimer.ticking);
    clearTimeout(currentTimer.timer);
  }
  currentTimer = createTimer(nextQuestion);
}

const nextQuestion = () => {
  let app = document.getElementById("root") || document.body;
  if (currentIndex + 1 > questions.length) {
    container.style.display = "none";
    scoreCard.style.display = "block";
    const {score, totalScore, percentage} = caculateScore(questions, answers);
    scoreCard.innerText = "Score = " + score + "  Percentage = " + percentage;
    app.appendChild(scoreCard);
    nextQuestionBtn.disabled = true;
    nextQuestionBtn.style.display = 'none';
    clearInterval(currentTimer.ticking);
    clearTimeout(currentTimer.timer);
    localStorage.setItem("highScore", score);
    highScoreContainer.innerText = "Highest Score : " + getHighScore();
    return true;
  }
  startTimer();
  if (currentIndex === 0) {
    console.log("here")
    nextQuestionBtn.innerText = "Next Question";
    container.appendChild(questionElements[currentIndex]);
    currentIndex++;
    return;
  }
  console.log(questionElements[currentIndex], questionElements[currentIndex-1])
  container.replaceChild(questionElements[currentIndex], questionElements[currentIndex-1]);
  currentIndex++;
  return false;
}

const container = document.createElement("div");
const scoreCard = document.createElement("div");
const answers = new Array(questions.length).fill(null);
const questionElements = generateQuestions(container, answers);

const nextQuestionBtn = document.createElement("button");
nextQuestionBtn.innerText = "Start";

nextQuestionBtn.addEventListener("click", ()=> {
  nextQuestion();
})

document.addEventListener("keydown", function handleKeydown(event) {
  if (["1", "2", "3", "4"].includes(event.key)) {
    const questionIndex = currentIndex - 1;
    if (questionIndex < 0) return;
    const optionIndex = parseInt(event.key, 10) - 1;
    const radiosForCurrentQuestion = document.querySelectorAll(`input[name="question_${questionIndex}"]`);
    const selectedRadio = radiosForCurrentQuestion[optionIndex];
    if (selectedRadio) {
      selectedRadio.checked = true;
      answers[questionIndex] = selectedRadio.value;
    }
  }
});

const mountUI = () => {
  app.appendChild(highScoreContainer);
  app.appendChild(container);
  app.appendChild(nextQuestionBtn);
};

export default mountUI;
