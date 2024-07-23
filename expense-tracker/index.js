document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseDateInput = document.getElementById('expense-date');
    const expenseCategoryInput = document.getElementById('expense-category');
    const expensesList = document.getElementById('expenses');
    const totalExpensesElem = document.getElementById('total-expenses');

    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpenseToDOM(expense));
    updateTotalExpenses();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value.trim());
        const expenseDate = expenseDateInput.value;
        const expenseCategory = expenseCategoryInput.value;
        
        if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0 && expenseDate && expenseCategory) {
            const expense = { name: expenseName, amount: expenseAmount, date: expenseDate, category: expenseCategory };
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            
            addExpenseToDOM(expense);
            updateTotalExpenses();
            
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
            expenseDateInput.value = '';
            expenseCategoryInput.value = '';
        }
    });

    function addExpenseToDOM(expense) {
        const expenseItem = document.createElement('li');
        
        const expenseDetails = document.createElement('div');
        expenseDetails.classList.add('details');
        expenseDetails.innerHTML = `
            <span>${expense.name}: $${expense.amount.toFixed(2)}</span>
            <span class="category">Category: ${expense.category}</span>
            <span class="date">Date: ${expense.date}</span>
        `;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            expensesList.removeChild(expenseItem);
            removeExpenseFromStorage(expense);
            updateTotalExpenses();
        });
        
        expenseItem.appendChild(expenseDetails);
        expenseItem.appendChild(deleteButton);
        expensesList.appendChild(expenseItem);
    }

    function removeExpenseFromStorage(expenseToRemove) {
        expenses = expenses.filter(expense => expense !== expenseToRemove);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function updateTotalExpenses() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpensesElem.textContent = `$${total.toFixed(2)}`;
    }
});
