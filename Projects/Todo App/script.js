document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    // Load todos from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }

            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => deleteTodo(index));

            li.addEventListener('click', () => toggleComplete(index));
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    // Function to add a new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            localStorage.setItem('todos', JSON.stringify(todos));
            todoInput.value = '';
            renderTodos();
        }
    }

    // Function to delete a todo
    function deleteTodo(index) {
        if (index >= 0 && index < todos.length) {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        }
    }

    // Function to toggle completion status of a todo
    function toggleComplete(index) {
        if (index >= 0 && index < todos.length) {
            todos[index].completed = !todos[index].completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        }
    }

    // Event listeners
    addTodoButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});
