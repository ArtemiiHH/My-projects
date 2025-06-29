// Mortgage Calculator Logic

// TO DO:
// Make it responsive

// Assigning DOM Elements
// Inputs
const mortAmountInput = document.getElementById('mort-amount-input');
const mortTermInput = document.getElementById('mort-term-input');
const intRateInput = document.getElementById('mort-rate-input');

// Custom side input elements
const currencyCustom = document.getElementsByClassName('currency-symbol')
const yearsCustom = document.getElementsByClassName('years-symbol');
const percentageCustom = document.getElementsByClassName('percentage-symbol');

// Error inputs
const errorTextAmount = document.querySelector('.error-text-amount');
const errorTextTerm = document.querySelector('.error-text-term');
const errorTextRate = document.querySelector('.error-text-rate');

// Remove error while typing
document.addEventListener('DOMContentLoaded', () => {
  removeErrorLive(mortAmountInput, currencyCustom, errorTextAmount);
  removeErrorLive(mortTermInput, yearsCustom, errorTextTerm);
  removeErrorLive(intRateInput, percentageCustom, errorTextRate);
});

// Radio Buttons
const mortgageType = document.getElementsByName('mortgageType');

// Buttons
const calcBtn = document.getElementById('calc-btn');
const clearBtn = document.getElementById('clear-btn');

// Results
const bigResult = document.getElementById('total-monthly');
const smallResult = document.getElementById('total');



// Repayment Calculation Logic
const repaymentCalculation = () => {
  let amount = parseFloat(mortAmountInput.value);
  let term = parseFloat(mortTermInput.value);
  let monthlyRate = ((parseFloat(intRateInput.value)) / 100) / 12;

  // Get the number of total payments
  let totalPayments = term * 12;

  // Monthly payment formula
  let monthlyFormula = amount * monthlyRate * (Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Total repay formula
  let totalFormula = monthlyFormula * totalPayments;

  // Display montly repayments amount
  bigResult.innerText = `$${Number(monthlyFormula.toFixed(2)).toLocaleString()}`;

  // Display total repay amount over the term
  smallResult.innerText = `$${Number(totalFormula.toFixed(2)).toLocaleString()}`;
};



// Interest Only Calculation Logic
const interestOnlyCalculation = () => {
  let amount = parseFloat(mortAmountInput.value);
  let term = parseFloat(mortTermInput.value);
  let monthlyRate = ((parseFloat(intRateInput.value)) / 100) / 12;

  // Get the number of total payments
  let totalPayments = term * 12;

  // Monthly payment formula (Interest Only)
  let monthlyFormula = amount * monthlyRate;

  // Total repay formula (Interest Only)
  let totalFormula = monthlyFormula * totalPayments;

  // Display montly repayments amount (Interest Only)
  bigResult.innerText = `$${Number(monthlyFormula.toFixed(2)).toLocaleString()}`;

  // Display total repay amount over the term (Interest Only)
  smallResult.innerText = `$${Number(totalFormula.toFixed(2)).toLocaleString()}`;
};



// Button Actions
// Calculate Button Logic
const buttonHandleCalculation = () => {

  // Max mortgage term
  if (mortTermInput.value > 40) {
    alert('The maximum mortgage term is 40 years.');
    return;
  }

  // Max interest rate percentage
  if (intRateInput.value > 20) {
    alert('Interest rate seems unusually high.');
    return;
  }

  // Mortgage Amount Input
  if (mortAmountInput.value === '' || isNaN(mortAmountInput.value)) {
    // Input border animation
    mortAmountInput.style.border = "solid 1px red";
    // Currency error animation
    currencyCustom[0].style.backgroundColor = 'red';
    currencyCustom[0].style.color = 'white';
    // Display error text
    errorTextAmount.style.display = 'block';
  } else {
    // Remove errors
    mortAmountInput.style.border = '';
    currencyCustom[0].style.backgroundColor = '';
    currencyCustom[0].style.color = '';
    errorTextAmount.style.display = 'none';
  };

  // Mortgage Term Input
  if (mortTermInput.value === '' || isNaN(mortTermInput.value)) {
    // Input border animation
    mortTermInput.style.border = "solid 1px red";
    // Years error animation
    yearsCustom[0].style.backgroundColor = 'red';
    yearsCustom[0].style.color = 'white';
    // Display error text
    errorTextTerm.style.display = 'block';
  } else {
    // Remove errors
    mortTermInput.style.border = '';
    yearsCustom[0].style.backgroundColor = '';
    yearsCustom[0].style.color = '';
    errorTextTerm.style.display = 'none';
  };

  // Interest Rate Input
  if (intRateInput.value === '' || isNaN(intRateInput.value)) {
    // Input border animation
    intRateInput.style.border = "solid 1px red";
    // Percentage error animation
    percentageCustom[0].style.backgroundColor = 'red';
    percentageCustom[0].style.color = 'white';
    // Display error text
    errorTextRate.style.display = 'block';
  } else {
    // Remove errors
    intRateInput.style.border = '';
    percentageCustom[0].style.backgroundColor = '';
    percentageCustom[0].style.color = '';
    errorTextRate.style.display = 'none';
  };

  // Find the checked radio button
  const selected = Array.from(mortgageType).find(radio => radio.checked);
  const value = selected.value;

  // Display new screen if the inputs are not empty
  if (mortAmountInput.value === '' || mortTermInput.value === '' || intRateInput.value === '') {
    document.getElementById('result').style.display = 'block';
    document.getElementById('new-result').style.display = 'none';
    return;
  } else {
    document.getElementById('result').style.display = 'none';
    document.getElementById('new-result').style.display = 'block';
  }

  // Check radio button value and execute the right calculation
  if (value === 'repayment') repaymentCalculation();
  else if (value === 'interest-only') interestOnlyCalculation();
};

// Calculate Button Click
calcBtn.addEventListener('click', buttonHandleCalculation);

// Keydown 'Enter'
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') buttonHandleCalculation();
});

// Clear Button
clearBtn.addEventListener('click', () => location.reload());

// Function to remove input error live
const removeErrorLive = (input, sideElement, errorText) => {
  input.addEventListener('input', () => {
    input.style.border = '';
    sideElement[0].style.backgroundColor = '';
    sideElement[0].style.color = '';
    errorText.style.display = 'none';
  });
};
