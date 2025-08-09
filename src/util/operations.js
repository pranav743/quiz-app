export const caculateScore = (questions, answers) => {
  const len = questions.length;
  let score = 0;
  for (let i = 0; i < len; i++) {
    if (questions[i].answer === answers[i]) score++;
  }
  return { score, totalScore: len, percentage: (score / len) * 100 };
};
