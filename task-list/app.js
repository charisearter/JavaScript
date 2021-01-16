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
	//D OM loadEvent

	document.addEventListener("DOMContentLoaded", getTasks);

	//Add task event
	form.addEventListener("submit", addTask);

	//remove task
	taskList.addEventListener("click", removeTask);

	// clear all tasks
	clearBtn.addEventListener("click", clearTasks);

	//filter tasks
	filter.addEventListener("keyup", filterTasks);
}

// get Tasks from Local Storage

function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	tasks.forEach(function (task) {
		const li = document.createElement("li");
		li.className = "collection-item";
		li.appendChild(document.createTextNode(task));
		const link = document.createElement("a");
		link.className = "delete-item secondary-content";
		link.innerHTML = '<i class ="fa fa-remove"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
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

	// store in LocalStorage
	keepInLocalStorage(taskInput.value);

	// Reset filter
	taskInput.value = "";

	e.preventDefault();
}

// persist to LocalStorage
function keepInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	tasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();

			//remove from Local Storage
			removeFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

//Remove from LS
function removeFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear all tasks
function clearTasks() {
	// taskList.innerHTML = ''
	// clear tasks using removeChild (faster)
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	// clear all from LS
	clearAllFromLocalStorage();
}

function clearAllFromLocalStorage() {
	localStorage.clear();
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
