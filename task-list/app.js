// define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection"); // ul
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event Listeners
loadEventListeners();

// Load all event Listeners fn
function loadEventListeners() {
	//Add task event
	form.addEventListener("submit", addTask);

	//remove task
	taskList.addEventListener("click", removeTask);

	// clear all tasks
	clearBtn.addEventListener("click", clearTasks);

	//filter tasks
	filter.addEventListener("keyup", filterTasks);
}

//add task
function addTask(e) {
	if (taskInput.value === "") {
		alert("Add a Task");
	}
	//create li
	const li = document.createElement("li");
	li.className = "collection-item";
	li.appendChild(document.createTextNode(taskInput.value));
	const link = document.createElement("a");
	link.className = "delete-item secondary-content";
	link.innerHTML = '<i class ="fa fa-remove"></i>';
	li.appendChild(link);

	// Append li
	taskList.appendChild(li);

	// Reset filter
	taskInput.value = "";

	e.preventDefault();
}

//remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

// clear all tasks
function clearTasks() {
	// taskList.innerHTML = ''
	// clear tasks using removeChild (faster)
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
}

// filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
