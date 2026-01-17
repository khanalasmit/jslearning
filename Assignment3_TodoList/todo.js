let tasks = [];

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Optional: Load from local storage here if needed
  showTasks();
});

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let taskText = taskInput.value;

  if (taskText.trim() === "") return;

  tasks.push({
    id: Date.now(), // Unique ID, though index is used for simplicity in some places, ID is better for robustness
    text: taskText,
    done: false
  });

  taskInput.value = "";
  taskInput.focus();
  showTasks();
}

function toggleTask(id) {
  // Find task by ID to be safe against filtering index shifts
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    showTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  showTasks();
}

function showTasks() {
  let filter = document.getElementById('filter').value;
  let list = document.getElementById('taskList');
  let countDiv = document.getElementById('count');

  list.innerHTML = "";

  // 1. Logic Fix: Calculate stats based on ALL tasks first
  let totalTasks = tasks.length;
  let completedCount = tasks.filter(t => t.done).length;
  let pendingCount = totalTasks - completedCount;

  // 2. Filter for display
  let displayTasks = tasks.filter(task => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  // 3. Render
  displayTasks.forEach((task) => {
    let li = document.createElement('li');
    if (task.done) li.classList.add('done');

    // Use span for text so we can strike it through independently if needed, 
    // or just style the whole li as before.
    let span = document.createElement('span');
    span.innerText = task.text;
    li.appendChild(span);

    // Toggle on click of the row
    li.onclick = () => toggleTask(task.id);

    let delBtn = document.createElement('button');
    delBtn.innerText = "Delete";
    // Stop propagation so clicking delete doesn't toggle 'done' status
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  // 4. Update Stats Message (Independent of filter)
  countDiv.innerText = `${completedCount} completed / ${totalTasks} total`;
}
