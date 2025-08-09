import { questions } from "../constants/constants.js";

export const generateQuestions = (container, answers) => {
  questions.forEach((q, index) => {
    let questionEl = document.createElement("h3");
    questionEl.innerText = `${index + 1}. ${q.question}`;
    container.appendChild(questionEl);

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

    container.appendChild(optionsList);
    let clearBtn = document.createElement("button");
    clearBtn.innerText = "Clear Selection";
    container.appendChild(clearBtn);
    clearBtn.addEventListener("click", () => {
      answers[index] = null;
      let radios = document.querySelectorAll(`input[name="question_${index}"]`);
      radios.forEach((radio) => (radio.checked = false));
    });
  });
  
};
