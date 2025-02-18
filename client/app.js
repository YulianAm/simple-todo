// client/app.js
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Fetch existing todos
async function fetchTodos() {
    const response = await fetch('http://localhost:3000/todos');
    const todos = await response.json();
    todos.forEach(addTodoToList);
}

// Add a new todo
addTodoButton.addEventListener('click', async () => {
    const text = todoInput.value;
    if (text) {
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        const newTodo = await response.json();
        addTodoToList(newTodo);
        todoInput.value = '';
    }
});

// Function to add todo to the list
function addTodoToList(todo) {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/todos/${todo.id}`, { method: 'DELETE' });
        todoList.removeChild(li);
    });
    todoList.appendChild(li);
}

// Initial fetch
fetchTodos();