let tasks = [];

function addTask() {
  let taskText = document.getElementById('taskInput').value;
  if (taskText.trim() === "") return;
  tasks.push({ text: taskText, done: false });
  document.getElementById('taskInput').value = "";
  showTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

function showTasks() {
  let filter = document.getElementById('filter').value;
  let list = document.getElementById('taskList');
  list.innerHTML = "";
  let completedCount = 0;

  tasks.forEach((task, i) => {
    if (filter === "completed" && !task.done) return;
    if (filter === "pending" && task.done) return;

    let li = document.createElement('li');
    li.innerText = task.text;
    if (task.done) {
      li.className = "done";
      completedCount++;
    }
    li.onclick = () => toggleTask(i);

    let delBtn = document.createElement('button');
    delBtn.innerText = "Delete";
    delBtn.onclick = (e) => { e.stopPropagation(); deleteTask(i); };
    li.appendChild(delBtn);

    list.appendChild(li);
  });

  document.getElementById('count').innerText = "Completed: " + completedCount;
}
