const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const billZeroNotice = document.getElementById("bill-zero-notice");
const peopleZeroNotice = document.getElementById("people-zero-notice");
const tipButtons = document.querySelectorAll('input[name="tips"]');
const customPer = document.getElementById("custom-per");
const tipEl = document.getElementById("tip-el");
const totalEl = document.getElementById("total-el");
const resetBtn = document.getElementById("reset-btn");
let chosenTip;
let total;
let tip;

// calculation -- not refactored

function calculateTotal() {
  resetBtnEnable();
  total = billInput.value / peopleInput.value;
  tip = total * (1 + chosenTip) - total;

  if (billInput.value && !peopleInput.value) {
  } else if (!billInput.value && peopleInput.value) {
  } else if (!tip) {
    totalEl.textContent = `$${total.toFixed(2)}`;
  } else if (!total) {
  } else {
    total = billInput.value / peopleInput.value;
    totalEl.textContent = `$${(total + tip).toFixed(2)}`;
    tip = total * (1 + chosenTip) - total;
    tipEl.textContent = `$${tip.toFixed(2)}`;
  }
}

// tip buttons -- not refactored

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    let selectedTip;
    resetBtnEnable();

    for (const tipButton of tipButtons) {
      customPer.value = "";
      if (tipButton.checked) {
        const tipButtonLabel = tipButton.parentElement;
        selectedTip = tipButton.value / 100;
        tipButtonLabel.classList.replace(
          "bg-very-dark-cyan",
          "bg-primary-strong-cyan"
        );
        tipButtonLabel.classList.remove("sm:hover:bg-light-grayish-cyan");
        tipButtonLabel.classList.remove("sm:hover:text-very-dark-cyan");
        tipButtonLabel.classList.replace("text-white", "text-very-dark-cyan");

        tipButtons.forEach((uncheckedBtn) => {
          if (!uncheckedBtn.checked) {
            const uncheckedBtnLabel = uncheckedBtn.parentElement;
            uncheckedBtnLabel.classList.replace(
              "bg-primary-strong-cyan",
              "bg-very-dark-cyan"
            );
            uncheckedBtnLabel.classList.add("sm:hover:bg-light-grayish-cyan");
            uncheckedBtnLabel.classList.add("sm:hover:text-very-dark-cyan");
            uncheckedBtnLabel.classList.replace(
              "text-very-dark-cyan",
              "text-white"
            );
          }
        });
        chosenTip = selectedTip;
        if (peopleInput.value) {
          calculateTotal();
        }

        return chosenTip;
      }
    }
  });
});

// custom input -- not refactored

customPer.addEventListener("input", () => {
  let selectedTip;
  resetBtnEnable();

  for (const tipButton of tipButtons) {
    tipButton.checked = false;
    const tipButtonLabel = tipButton.parentElement;
    tipButtonLabel.classList.replace(
      "bg-primary-strong-cyan",
      "bg-very-dark-cyan"
    );
    tipButtonLabel.classList.add("sm:hover:bg-light-grayish-cyan");
    tipButtonLabel.classList.add("sm:hover:text-very-dark-cyan");
    tipButtonLabel.classList.replace("text-very-dark-cyan", "text-white");

    selectedTip = customPer.value / 100;
    chosenTip = selectedTip;
  }
  if (peopleInput.value) {
    calculateTotal();
  }
  return chosenTip;
});

// bill and people inputs -- not refactored

billInput.addEventListener("input", () => {
  if (billInput.value <= 0) {
    billZeroNotice.textContent = `Can't be zero`;
    billInput.classList.replace("outline-none", "outline");
    billInput.classList.replace(
      "focus:outline-primary-strong-cyan",
      "outline-red-500"
    );
    billInput.classList.add("outline-2");
  } else {
    billZeroNotice.textContent = ``;
    billInput.classList.replace("outline", "outline-none");
    billInput.classList.replace(
      "outline-red-500",
      "focus:outline-primary-strong-cyan"
    );
    billInput.classList.remove("outline-2");

    calculateTotal();
  }
});
peopleInput.addEventListener("input", () => {
  if (peopleInput.value <= 0) {
    peopleZeroNotice.textContent = `Can't be zero`;
    peopleInput.classList.replace("outline-none", "outline");
    peopleInput.classList.replace(
      "focus:outline-primary-strong-cyan",
      "outline-red-500"
    );
    peopleInput.classList.add("outline-2");
  } else {
    peopleZeroNotice.textContent = ``;
    peopleInput.classList.replace("outline", "outline-none");
    peopleInput.classList.replace(
      "outline-red-500",
      "focus:outline-primary-strong-cyan"
    );
    peopleInput.classList.remove("outline-2");

    calculateTotal();
  }
});

// Reset button functions -- not refactored

function resetBtnEnable() {
  resetBtn.removeAttribute("disabled");
  resetBtn.classList.replace("bg-dark-grayish-cyan", "bg-primary-strong-cyan");
  resetBtn.classList.add("sm:hover:bg-light-grayish-cyan");
  resetBtn.classList.add("cursor-pointer");
}
function resetBtnDisable() {
  resetBtn.toggleAttribute("disabled");
  resetBtn.classList.replace("bg-primary-strong-cyan", "bg-dark-grayish-cyan");
  resetBtn.classList.remove("sm:hover:bg-light-grayish-cyan");
  resetBtn.classList.remove("cursor-pointer");
}
function resetAll() {
  billInput.value = "";
  billInput.textContent = billInput.value;
  peopleInput.value = "";
  peopleInput.textContent = peopleInput.value;
  customPer.value = "";
  customPer.textContent = customPer.value;

  for (const tipButton of tipButtons) {
    tipButton.checked = false;
    const tipButtonLabel = tipButton.parentElement;
    tipButtonLabel.classList.replace(
      "bg-primary-strong-cyan",
      "bg-very-dark-cyan"
    );
    tipButtonLabel.classList.add("sm:hover:bg-light-grayish-cyan");
    tipButtonLabel.classList.add("sm:hover:text-very-dark-cyan");
    tipButtonLabel.classList.replace("text-very-dark-cyan", "text-white");
  }
  chosenTip = '';
  total = "";
  totalEl.textContent = "$0.00";
  tip = "";
  tipEl.textContent = "$0.00";

  resetBtnDisable();
}

resetBtn.addEventListener("click", () => {
  resetAll();
});
