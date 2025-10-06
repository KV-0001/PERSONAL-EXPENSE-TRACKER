# Personal Expense Tracker

This is a simple web application for tracking personal expenses, built as part of the AI-Powered Development Assignment for Agrim Intelligence. The application is built entirely with client-side technologies and leverages browser storage to persist data.

---

## [cite_start]How to Run Your Application [cite: 77]

1.  Clone this repository to your local machine.
2.  Navigate into the project directory.
3.  Open the `index.html` file in any modern web browser. No special server or build steps are required.

---

## [cite_start]Key Features Implemented [cite: 78]

* [cite_start]**Add Expenses**: A form allows users to add new expenses with details like amount, category, date, and an optional description[cite: 12].
* [cite_start]**View All Expenses**: All expenses are displayed in a clean, organized list format[cite: 13].
* [cite_start]**Delete Expenses**: Each expense in the list has a dedicated button for deletion[cite: 16].
* [cite_start]**Data Persistence**: The application uses `localStorage` to save expense data, ensuring it persists across browser sessions[cite: 20, 57].
* [cite_start]**Filter by Category**: Users can filter the expense list to show transactions from a specific category using a dropdown menu[cite: 14, 33].
* [cite_start]**Filter by Date Range**: The list can be filtered to show expenses within a specified start and end date[cite: 14, 34].
* [cite_start]**Basic Statistics**: A dashboard displays key statistics, including total spending and total number of transactions[cite: 15]. [cite_start]It also provides a simple text-based breakdown of spending by category[cite: 15, 38].
* [cite_start]**Validation**: The "Add Expense" form includes basic validation to ensure the amount is positive and the date is not in the future[cite: 23].

---

## [cite_start]Cursor Usage Documentation [cite: 79]

This section details how Cursor AI was used to assist in the development process.

### [cite_start]1. Interesting Prompts Used [cite: 80]

* **Prompt 1: Generating the `localStorage` Logic**
    > "Write two JavaScript functions. The first function should take an array of expense objects and save it to localStorage under the key 'expenses', converting it to a JSON string. The second function should retrieve the data from localStorage, parse it back into an array, and return it. If no data exists, it should return an empty array."

* **Prompt 2: Creating the Filtering Function**
    > "Create a JavaScript function that filters an array of expense objects. It should accept the full array, a category string, a start date string, and an end date string as arguments. The function should return a new array containing only the expenses that match the filters. If the category is 'All' or a date is not provided, that specific filter should be ignored."

* **Prompt 3: Structuring the Statistics Calculation**
    > "Given an array of filtered expense objects, write a JavaScript function that calculates and returns an object containing three statistics: the total spending (a sum of all amounts), the total number of transactions (the array length), and an object representing the spending breakdown by category (e.g., { Food: 150, Transport: 80 })."

### [cite_start]2. How Cursor Solved Specific Challenges [cite: 81]

Cursor was instrumental in speeding up the development of boilerplate and complex logical functions. For the **`localStorage` challenge**, it provided a robust and error-free implementation instantly, including the crucial check for an empty array, which saved debugging time. For the **filtering logic**, Cursor generated a clean, chained `.filter()` implementation that correctly handled date and string comparisons, a task that can be tedious and error-prone to write manually.

### [cite_start]3. Modifications to AI-Generated Code [cite: 82]

While the AI-generated code was highly effective, some modifications were necessary:
* **For the `localStorage` functions:** The generated code was integrated into a single `saveAndRender()` function. This was a necessary modification to ensure that any action (like adding or deleting an expense) would automatically trigger both saving the data and updating the UI, keeping the application state consistent.
* **For the filtering function:** The AI's code was adapted to directly use the `.value` from the HTML input elements for the date range. I also added a `sort()` method to the output of the filtered expenses to ensure the list was always displayed in reverse chronological order, which is a better user experience.

---

## [cite_start]Challenges Faced and How They Were Overcome [cite: 83]

* **Challenge:** Managing UI updates across multiple components (the expense list and the statistics dashboard) without a reactive framework like React.
* **Solution:** I implemented a central `render()` function. This function is responsible for calling separate functions to update the expense list and render the statistics. It is called after any state change (adding, deleting, or filtering expenses), ensuring all parts of the UI are always synchronized with the current data.

---

## [cite_start]Time Spent on the Assignment [cite: 85]

* [cite_start]**Total Time:** Approximately **3 hours**, as estimated in the assignment brief[cite: 178].
    * **Setup and HTML/CSS Structure:** 25 mins
    * **Core Functionality (Add, Delete, `localStorage`):** 80 mins
    * **Filtering and Statistics Logic:** 55 mins
    * **Testing, Bug Fixes, and Final Polish:** 20 mins
