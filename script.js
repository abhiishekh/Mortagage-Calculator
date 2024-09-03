document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.querySelector("button");
    const amountInput = document.getElementById("amount");
    const termInput = document.querySelector(".time input");
    const rateInput = document.querySelector(".rate input");
    const resultMain = document.querySelector(".main");
    const resultPrice = document.querySelector(".price");
  
    calculateButton.addEventListener("click", function() {
      // Get input values
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
          if (!input.value) {
              input.style.borderColor = 'red';
          } else {
              input.style.borderColor = 'lightblue'; // or your default color
          }
      });
      const mortgageAmount = parseFloat(amountInput.value);
      const mortgageTerm = parseFloat(termInput.value);
      const interestRate = parseFloat(rateInput.value) / 100 / 12;
      const mortgageType = document.querySelector('input[name="type"]:checked').value;
  
      if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate)) {
        // amountInput.style.border="red";
        return;
      }
  
      let monthlyRepayment;
      if (mortgageType === "Repayment") {
        // Calculate monthly repayment for repayment mortgage
        const totalMonths = mortgageTerm * 12;
        monthlyRepayment = mortgageAmount * interestRate / (1 - Math.pow(1 + interestRate, -totalMonths));
      } else if (mortgageType === "Interest Only") {
        // Calculate monthly repayment for interest-only mortgage
        monthlyRepayment = mortgageAmount * interestRate;
      }
  
      const totalRepayment = monthlyRepayment * mortgageTerm * 12;
  
      // Update results on the right side
      resultMain.textContent = `$ ${monthlyRepayment.toFixed(2)}`;
      resultPrice.textContent = `$ ${totalRepayment.toFixed(2)}`;
    });
  
    // Optional: Clear all fields
    const clearButton = document.querySelector(".heading p");
    clearButton.addEventListener("click", function() {
      amountInput.value = "";
      termInput.value = "";
      rateInput.value = "";
      resultMain.textContent = "$ 0.00";
      resultPrice.textContent = "$ 0.00";
      document.querySelectorAll('input[name="type"]').forEach(input => input.checked = false);
    });
  });
  