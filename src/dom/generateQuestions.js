import { questions } from "../constants/constants.js";

export const generateQuestions = (container, answers) => {
  const array = [];
  let jumbeled_questions = questions.sort((a,b) => {
    if (Math.random() > 0.5) return -1;
    return 1
  })
  jumbeled_questions.forEach((q, index) => {
    let questionEl = document.createElement("h3");
    const question_element = document.createElement("div");
    questionEl.innerText = `${index + 1}. ${q.question}`;
    question_element.appendChild(questionEl);

    let optionsList = document.createElement("ul");
    optionsList.style.listStyle = "none";

    q.options.forEach((option) => {
      let optionItem = document.createElement("li");
      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `question_${index}`;
      radioInput.value = option;
      radioInput.id = `q${index}_option_${option}`;

      radioInput.addEventListener("change", () => {
        answers[index] = option;
        console.log("Current answers:", answers);
      });

      let label = document.createElement("label");
      label.htmlFor = radioInput.id;
      label.innerText = option;

      optionItem.appendChild(radioInput);
      optionItem.appendChild(label);
      optionsList.appendChild(optionItem);
    });

    question_element.appendChild(optionsList);
    let clearBtn = document.createElement("button");
    clearBtn.innerText = "Clear Selection";
    question_element.appendChild(clearBtn);
    clearBtn.addEventListener("click", () => {
      answers[index] = null;
      let radios = document.querySelectorAll(`input[name="question_${index}"]`);
      radios.forEach((radio) => (radio.checked = false));
    });
    array.push(question_element);
  });
  return array;
};
