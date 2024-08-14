const confirmButton = document.querySelector(".confirm");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const topicError = document.querySelector(".topic.error");
const stepBand = document.querySelector(".step-band");
const stepText = document.querySelector(".text");
const infoName = document.querySelector(".info-name");
const infoEmail = document.querySelector(".info-email");
const list = document.querySelector(".list");
const dottes = document.querySelectorAll(".dot");
const continueButtons = document.querySelectorAll(".continue");
const topics = document.querySelectorAll(".topic");

let pointer = 0;
let unpredictableSliding = false;

continueButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (canActivate()) {
      markAsValid(index);
      pointer = index + 1;
      slide();
    }
  });
});

dottes.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    unpredictableSliding = true;
    const prev = pointer;
    pointer = index;
    if (canActivate()) {
      markAsValid(prev);
      slide();
    } else {
      pointer = prev;
    }
    unpredictableSliding = false;
  });
});

confirmButton.addEventListener("click", () => {
  alert("✅ Succes !");
});

markAsActive();

function slide() {
  stepBand.style.transform = `translateX(${(-100 * pointer) / 3}%)`;
  markAsActive();
}

function markAsActive() {
  updateText();
  dottes.forEach((dot, index) => {
    if (index === pointer) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function markAsValid(step) {
  if (step === 0 && validateStepOne()) {
    dottes.item(0).classList.add("valid");
  }
  if (step === 1 && validateStepTwo()) {
    dottes.item(1).classList.add("valid");
  }
  if (step === 2 && validateStepOne() && validateStepTwo()) {
    dottes.item(2).classList.add("valid");
  }
}

function updateText() {
  stepText.textContent = `Step ${pointer + 1} of 3`;
}

function canActivate() {
  if (pointer === 0 || (pointer === 1 && unpredictableSliding)) {
    return validateStepOne();
  }
  if (pointer === 1 || (pointer === 2 && unpredictableSliding)) {
    return validateStepTwo();
  }
  return false;
}

function validateStepOne() {
  if (nameInput.validity.valueMissing) {
    nameInput.nextElementSibling.style.display = "flex";
  } else {
    nameInput.nextElementSibling.style.display = "none";
  }
  if (emailInput.validity.valueMissing) {
    emailInput.nextElementSibling.style.display = "flex";
  } else {
    emailInput.nextElementSibling.style.display = "none";
  }
  if (emailInput.validity.typeMismatch) {
    emailInput.parentElement.lastElementChild.style.display = "flex";
  } else {
    emailInput.parentElement.lastElementChild.style.display = "none";
  }
  return nameInput.validity.valid && emailInput.validity.valid;
}

function validateStepTwo() {
  const valid = Array.from(topics).some((el) => el.checked);
  if (!valid) {
    topicError.style.display = "flex";
  } else {
    topicError.style.display = "none";
    summarize();
  }
  return valid;
}

function summarize() {
  infoName.textContent = nameInput.value;
  infoEmail.textContent = emailInput.value;
  list.innerHTML = "";
  Array.from(topics)
    .filter((el) => el.checked)
    .map((el) => el.value)
    .forEach((val) => {
      const li = document.createElement("li");
      li.textContent = val;
      list.append(li);
    });
}
