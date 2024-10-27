const form = document.querySelector("#task-form");
const taskList = document.querySelector("tbody");
const taskFilter = document.querySelector("#taskFilter");

// Load tasks from sessionStorage
function loadTasks() {
    return JSON.parse(sessionStorage.getItem("tasks") || "[]");
}

// Save tasks to sessionStorage
function saveTasks(tasks) {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks based on filter
function displayTasks(filter) {
    const savedTasks = loadTasks();
    const filteredTasks = filterTasks(savedTasks, filter);
    showTasks(filteredTasks);
}

// Filter tasks based on the selected status
function filterTasks(tasks, filter) {
    return tasks.filter(task => {
        if (filter === "completed") return task.status === 'Completed';
        if (filter === "pending") return task.status === 'Pending';
        return true; // For "all", return all tasks
    });
}

// Render tasks to the DOM
function showTasks(tasks) {
    taskList.innerHTML = ""; // Clear the current task list

    tasks.forEach((task, index) => {
        const taskRow = `
            <tr>
                <td class="text-white">${task.name}</td>
                <td class="text-white">${task.description}</td>
                <td class="text-white">${task.dueDate}</td>
                <td class="text-white">${task.status}</td>
                <td>
                    <button class="btn btn-success btn-sm complete-btn" data-index="${index}">Complete</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                </td>
            </tr>
        `;
        taskList.innerHTML += taskRow; // Append the new row to the task list
    });

    addTaskEventListeners();
}

// Add event listeners for complete and delete buttons
function addTaskEventListeners() {
    const completeButtons = document.querySelectorAll(".complete-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    completeButtons.forEach(button => {
        button.addEventListener("click", () => completeTask(button.getAttribute("data-index")));
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => removeTask(button.getAttribute("data-index")));
    });
}

// Function to mark a task as completed
function completeTask(index) {
    const savedTasks = loadTasks();
    savedTasks[index].status = 'Completed'; // Change the status to 'Completed'
    saveTasks(savedTasks); // Save the updated list
    displayTasks(taskFilter.value); // Refresh the display with the current filter
}

// Function to remove a task
function removeTask(index) {
    const savedTasks = loadTasks();
    savedTasks.splice(index, 1); // Remove the task at the specified index
    saveTasks(savedTasks); // Save the updated list
    displayTasks(taskFilter.value); // Refresh the display with the current filter
}

// Event listener for form submission to add a new task
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get values from the form
    const task = {
        name: form.taskName.value,
        description: form.taskDescription.value,
        dueDate: form.dueDate.value,
        status: 'Pending' // Set initial status to 'Pending'
    };

    // Save the new task
    const savedTasks = loadTasks();
    savedTasks.push(task);
    saveTasks(savedTasks);

    // Refresh the task list display to include the new task
    displayTasks(taskFilter.value);
    form.reset(); // Clear the form fields
});

// Event listener for task filter change
taskFilter.addEventListener("change", (event) => {
    displayTasks(event.target.value); // Display tasks based on the selected filter
});

// Initial display all tasks when changing pages or refreshing the page
displayTasks("all");

