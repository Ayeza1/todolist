const API = "https://ayeza.pythonanywhere.com/todos";
function showLoading() {
  document.getElementById("loadingState").style.display = "block";
  document.getElementById("errorState").style.display = "none";
}

function showError(message) {
  document.getElementById("loadingState").style.display = "none";
  document.getElementById("errorState").style.display = "block";
  document.getElementById("errorMessage").textContent = message;
}

function hideStates() {
  document.getElementById("loadingState").style.display = "none";
  document.getElementById("errorState").style.display = "none";
}

function renderTodos(todos) {
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach(todo => {
    const div = document.createElement("div");
    div.className = "todo-item";
    div.innerHTML = `
      <input type="checkbox" ${todo.done ? "checked" : ""} data-id="${todo.id}" class="doneCheckbox">
      <span style="${todo.done ? "text-decoration:line-through;" : ""}">${todo.title}</span>
      <button data-id="${todo.id}" class="deleteBtn">Delete</button>
    `;
    list.appendChild(div);
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", () => deleteTodo(btn.dataset.id));
  });
  document.querySelectorAll(".doneCheckbox").forEach(cb => {
    cb.addEventListener("change", () => toggleDone(cb.dataset.id, cb.checked));
  });
}

async function loadTodos() {
  showLoading();
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const todos = await res.json();
    hideStates();
    renderTodos(todos);
  } catch (err) {
    console.error(err);
    showError("Couldn't load todos. Is the backend running?");
  }
}

async function addTodo(title) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    loadTodos();
  } catch (err) {
    console.error(err);
    showError("Couldn't add todo. Try again.");
  }
}

async function toggleDone(id, done) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done })
    });
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    loadTodos();
  } catch (err) {
    console.error(err);
    showError("Couldn't update todo.");
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    loadTodos();
  } catch (err) {
    console.error(err);
    showError("Couldn't delete todo.");
  }
}

document.getElementById("todoForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const input = document.getElementById("titleInput");
  if (!input.value.trim()) return;
  addTodo(input.value.trim());
  input.value = "";
});

document.getElementById("retryButton").addEventListener("click", loadTodos);

loadTodos();