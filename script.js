window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);
  taskInput.value = "";
  loadTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newTaskText = prompt("Edit task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText.trim();
    saveTasks(tasks);
    loadTasks();
  }
}

// ❌ Delete = just mark as completed (line-through)
function deleteTask(index) {
  const tasks = getTasks();
  tasks[index].completed = true;
  saveTasks(tasks);
  loadTasks();
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}
