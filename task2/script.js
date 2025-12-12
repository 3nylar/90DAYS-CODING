const form = document.getElementById("mortgage-form");
const emptyResults = document.getElementById("empty-results");
const completedResults = document.getElementById("completed-results");

const monthlyRepaymentsEl = document.getElementById("monthly-repayments");
const totalRepayableEl = document.getElementById("total-repayable");

const errorMessages = document.querySelectorAll(".error-message");
const inputs = document.querySelectorAll("input[type='number']");

// Get the span elements inside input-icon divs
const currencySpan = document.querySelector(".currency");
const unitSpans = document.querySelectorAll(".unit");

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // stops page reload

    // Read values
    const amount = parseFloat(document.getElementById("mortgage-amount").value);
    const term = parseFloat(document.getElementById("mortgage-term").value);
    const rate = parseFloat(document.getElementById("interest-rate").value);
    const typeElement = document.querySelector("input[name='mortgage-type']:checked");
    const type = typeElement ? typeElement.value : null;

    // Basic validation
    const fields = [
        { value: amount, error: errorMessages[0], input: inputs[0], icon: currencySpan },
        { value: term, error: errorMessages[1], input: inputs[1], icon: unitSpans[0] },
        { value: rate, error: errorMessages[2], input: inputs[2], icon: unitSpans[1] }
    ];
    
    let hasError = false;
    
    // Validate numeric fields
    fields.forEach(field => {
        if (isNaN(field.value) || field.value === "" || field.value <= 0) {
            field.error.textContent = "This field is required";
            field.error.style.color = "#d73328";
            field.input.style.borderColor = "#d73328";
            field.icon.style.backgroundColor = "#d73328";
            field.icon.style.color = "#fff";
            hasError = true;
        } else {
            field.error.textContent = "";
            field.input.style.borderColor = "";
            field.icon.style.backgroundColor = "";
            field.icon.style.color = "";
        }
    });
    
    // Validate mortgage type selection
    const mortgageTypeError = errorMessages[3];
    
    if (!type) {
        mortgageTypeError.textContent = "This field is required";
        mortgageTypeError.style.color = "#d73328";
        hasError = true;
    } else {
        mortgageTypeError.textContent = "";
    }
    
    if (hasError) return;

    // Convert annual rate → monthly % (e.g. 5% → 0.004166)
    const monthlyRate = rate / 100 / 12;
    const totalMonths = term * 12;

    let monthlyPayment = 0;
    let totalRepayable = 0;

    // Repayment mortgage calculation
    if (type === "repayment") {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        monthlyPayment = amount * monthlyRate * (factor / (factor - 1));
        totalRepayable = monthlyPayment * totalMonths;
    } else {
        // Interest-only mortgage
        monthlyPayment = amount * monthlyRate;
        totalRepayable = (monthlyPayment * totalMonths) + amount; // Add principal back
    }

    // Currency formatter
    const fmt = value =>
        "£" + value.toLocaleString("en-GB", { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });

    // Push results into the UI
    monthlyRepaymentsEl.textContent = fmt(monthlyPayment);
    totalRepayableEl.textContent = fmt(totalRepayable);

    // Switch from "empty" to "results"
    emptyResults.style.display = "none";
    completedResults.style.display = "block";
});

// CLEAR ALL button
document.getElementById("clear-all").addEventListener("click", () => {
    form.reset(); // wipe all inputs

    // Clear all error messages
    errorMessages.forEach(error => {
        error.textContent = "";
    });
    
    // Clear input borders
    inputs.forEach(input => {
        input.style.borderColor = "";
    });
    
    // Clear currency span styling
    currencySpan.style.backgroundColor = "";
    currencySpan.style.color = "";
    
    // Clear unit spans styling
    unitSpans.forEach(span => {
        span.style.backgroundColor = "";
        span.style.color = "";
    });

    // Switch back to empty state
    completedResults.style.display = "none";  
    emptyResults.style.display = "block";
});