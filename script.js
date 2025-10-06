document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const errorMessage = document.getElementById('error-message');
    
    // Statistics elements
    const totalSpendingEl = document.getElementById('total-spending');
    const totalTransactionsEl = document.getElementById('total-transactions');
    const categorySpendingEl = document.getElementById('category-spending');

    // Filter elements
    const filterCategory = document.getElementById('filter-category');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // Load expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Form submission handler
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const amountInput = document.getElementById('amount');
        const categoryInput = document.getElementById('category');
        const dateInput = document.getElementById('date');
        const descriptionInput = document.getElementById('description');

        const amount = parseFloat(amountInput.value);
        const category = categoryInput.value;
        const date = dateInput.value;
        const description = descriptionInput.value;

        // Basic validation
        errorMessage.textContent = '';
        if (amount <= 0) {
            errorMessage.textContent = 'Amount must be a positive number.';
            return;
        }
        if (new Date(date) > new Date()) {
            errorMessage.textContent = 'Date cannot be in the future.';
            return;
        }

        const newExpense = {
            id: Date.now(),
            amount,
            category,
            date,
            description,
        };

        expenses.push(newExpense);
        saveAndRender();
        expenseForm.reset();
    });

    // Save to localStorage and render UI
    function saveAndRender() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        render();
    }
    
    // Render all components
    function render() {
        const filteredExpenses = getFilteredExpenses();
        renderExpenseList(filteredExpenses);
        renderStatistics(filteredExpenses);
    }
    
    // Apply filters and return filtered expenses
    function getFilteredExpenses() {
        let filtered = [...expenses];

        // Filter by category
        if (filterCategory.value !== 'All') {
            filtered = filtered.filter(expense => expense.category === filterCategory.value);
        }

        // Filter by date range
        if (startDate.value) {
            filtered = filtered.filter(expense => new Date(expense.date) >= new Date(startDate.value));
        }
        if (endDate.value) {
            filtered = filtered.filter(expense => new Date(expense.date) <= new Date(endDate.value));
        }
        
        return filtered;
    }

    // Render the list of expenses
    function renderExpenseList(expensesToRender) {
        expenseList.innerHTML = '';
        if (expensesToRender.length === 0) {
            expenseList.innerHTML = '<li>No expenses found.</li>';
            return;
        }
        expensesToRender.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent
        expensesToRender.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="expense-details">
                    <span class="category">${expense.category}</span>
                    <span class="date">${expense.date}</span>
                    ${expense.description ? `<small>${expense.description}</small>` : ''}
                </div>
                <div>
                    <span class="expense-amount">₹${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${expense.id}">&times;</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    // Render statistics dashboard
    function renderStatistics(expensesToRender) {
        const totalSpending = expensesToRender.reduce((sum, expense) => sum + expense.amount, 0);
        const totalTransactions = expensesToRender.length;
        
        totalSpendingEl.textContent = `₹${totalSpending.toFixed(2)}`;
        totalTransactionsEl.textContent = totalTransactions;
        
        // Breakdown by category
        const spendingByCategory = expensesToRender.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        
        categorySpendingEl.innerHTML = '<h4>Spending by Category</h4>';
        if (Object.keys(spendingByCategory).length > 0) {
            for (const category in spendingByCategory) {
                const categoryDiv = document.createElement('div');
                categoryDiv.innerHTML = `<span>${category}</span> <span>₹${spendingByCategory[category].toFixed(2)}</span>`;
                categorySpendingEl.appendChild(categoryDiv);
            }
        } else {
             categorySpendingEl.innerHTML += '<p>No spending data for this period.</p>';
        }
    }

    // Delete expense handler
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== id);
            saveAndRender();
        }
    });
    
    // Filter change handlers
    filterCategory.addEventListener('change', render);
    startDate.addEventListener('input', render);
    endDate.addEventListener('input', render);

    // Clear filters handler
    clearFiltersBtn.addEventListener('click', () => {
        filterCategory.value = 'All';
        startDate.value = '';
        endDate.value = '';
        render();
    });

    // Initial render
    render();
});