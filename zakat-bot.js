document.getElementById("category").addEventListener("change", function () {
    const category = this.value;
    const unitSpan = document.getElementById("unit");
    const amountInput = document.getElementById("amount");

    // Define the unit for each category
    const units = {
        cash: "INR",
        silver: "grams of silver",
        gold: "grams of gold",
        camels: "camels",
        sheep: "sheep/goats",
        cows: "cows/buffalos",
        "irrigated-crops": "kilograms",
        "non-irrigated-crops": "kilograms",
        others: ""
    };

    unitSpan.textContent = units[category] || "";

    // Adjust placeholder for input field based on selected category
    if (category === "cash") {
        amountInput.placeholder = "Enter amount in INR";
    } else if (category === "silver" || category === "gold") {
        amountInput.placeholder = "Enter quantity in grams";
    } else if (category === "others") {
        window.location.href = "others-zakat-info.html"; // Redirect to additional info page
    } else {
        amountInput.placeholder = `Enter number of ${units[category]}`;
    }
});

document.getElementById("calculate-btn").addEventListener("click", function () {
    const category = document.getElementById("category").value;
    const amount = parseInt(document.getElementById("amount").value, 10);
    const resultDiv = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = "<p>Please enter a valid amount or quantity after debt deduction.</p>";
        return;
    }

    let zakat = "";
    let message = "";

    switch (category) {
        case "camels":
            if (amount >= 1 && amount <= 4) {
                message = "No Zakat Due.";
            } else if (amount >= 5 && amount <= 9) {
                zakat = "1 sheep";
            } else if (amount >= 10 && amount <= 14) {
                zakat = "2 sheep";
            } else if (amount >= 15 && amount <= 19) {
                zakat = "3 sheep";
            } else if (amount >= 20 && amount <= 24) {
                zakat = "4 sheep";
            } else if (amount >= 25 && amount <= 35) {
                zakat = "1 she-camel (above 1 year of age)";
            } else if (amount >= 36 && amount <= 45) {
                zakat = "1 she-camel (above 2 years of age)";
            } else if (amount >= 46 && amount <= 60) {
                zakat = "1 she-camel (above 3 years of age)";
            } else if (amount >= 61 && amount <= 75) {
                zakat = "1 she-camel (above 4 years of age)";
            } else if (amount >= 76 && amount <= 90) {
                zakat = "2 she-camels (above 2 years of age)";
            } else if (amount >= 91 && amount <= 120) {
                zakat = "2 she-camels (above 3 years of age)";
            } else {
                const fortySheCamels = Math.floor(amount / 40);
                const fiftySheCamels = Math.floor((amount % 40) / 50);
                zakat = `${fortySheCamels} she-camels (above 2 years), and ${fiftySheCamels} she-camels (above 3 years)`;
            }
            break;

        case "cows":
            if (amount >= 1 && amount <= 29) {
                message = "No Zakat Due.";
            } else if (amount >= 30 && amount <= 39) {
                zakat = "1 cow/bull aged 1 year";
            } else if (amount >= 40 && amount <= 59) {
                zakat = "1 cow/bull aged 2 years";
            } else if (amount >= 60 && amount <= 69) {
                zakat = "2 cows/bulls aged 1 year";
            } else if (amount >= 70 && amount <= 79) {
                zakat = "1 cow/bull aged 2 years and 1 cow/bull aged 1 year";
            } else if (amount >= 80 && amount <= 89) {
                zakat = "2 cows/bulls aged 2 years";
            } else if (amount >= 90 && amount <= 99) {
                zakat = "3 cows/bulls aged 2 years";
            }
            break;

        case "sheep":
            if (amount >= 1 && amount <= 39) {
                message = "No Zakat Due.";
            } else if (amount >= 40 && amount <= 120) {
                zakat = "1 sheep/goat";
            } else if (amount >= 121 && amount <= 200) {
                zakat = "2 sheep/goats";
            } else if (amount >= 201 && amount <= 300) {
                zakat = "3 sheep/goats";
            } else {
                const extraSheep = Math.floor((amount - 300) / 100);
                zakat = `${3 + extraSheep} sheep/goats`;
            }
            break;

        default:
            message = "Invalid category or additional info required. Please check the link.";
    }

    // Display the result
    if (message) {
        resultDiv.innerHTML = `<p>${message}</p>`;
    } else {
        resultDiv.innerHTML = `<p>Zakat for ${category} is <strong>${zakat}</strong>.</p>`;
    }
});
