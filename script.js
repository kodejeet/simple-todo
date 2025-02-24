const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something..");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Close button

        li.appendChild(span);
        listContainer.appendChild(li);

        saveData();
    }
    inputBox.value = "";
}

// Handle click events for checking & removing tasks
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent, // Store task text
            checked: li.classList.contains("checked") // Store checked status
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listContainer.innerHTML = ""; // Clear the list before restoring

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.checked) {
            li.classList.add("checked"); // Restore checked status
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Load tasks on page load
showTask();
