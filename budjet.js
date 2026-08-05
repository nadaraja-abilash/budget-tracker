let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currency = "₹";

function addTransaction() {

    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let date = document.getElementById("date").value;

    if (desc === "" || isNaN(amount)) {
        alert("Enter valid data");
        return;
    }

    let transaction = {
        desc: desc,
        amount: amount,
        type: type,
        date: date
    };

    transactions.push(transaction);

    saveData();
    showTransactions();

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

function showTransactions() {

    let list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((t, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            ${t.date} - ${t.desc} : ${currency}${t.amount} (${t.type})
            <button class="delete" onclick="deleteTransaction(${index})">X</button>
        `;

        list.appendChild(li);

        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    let balance = income - expense;

    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("balance").innerText = balance;

    document.querySelectorAll(".symbol").forEach(symbol => {
        symbol.innerText = currency;
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveData();
    showTransactions();
}

function changeCurrency() {
    currency = document.getElementById("currency").value;
    showTransactions();
}

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load saved transactions when the page opens
showTransactions();
