const form = document.getElementById("mortgage-form");
const emptyResults = document.getElementById("empty-results");
const completedResults = document.getElementById("completed-results");

const monthlyRepaymentsEl = document.getElementById("monthly-repayments");
const totalRepayableEl = document.getElementById("total-repayable");

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // stops page reload

    // Read values
    const amount = parseFloat(document.getElementById("mortgage-amount").value);
    const term = parseFloat(document.getElementById("mortgage-term").value);
    const rate = parseFloat(document.getElementById("interest-rate").value);
    const type = document.querySelector("input[name='mortgage-type']:checked").value;

    // Basic validation
    if (!amount || !term || !rate) {
        alert("Please fill in all fields.");
        return;
    }

    // Convert annual rate → monthly %  (e.g. 5% → 0.004166)
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
        totalRepayable = monthlyPayment * totalMonths;
    }

    // Currency formatter
    const fmt = value =>
        "£" + value.toLocaleString("en-UK", { minimumFractionDigits: 2 });

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

    completedResults.style.display = "none";  
    emptyResults.style.display = "block"; // show empty results again
});
