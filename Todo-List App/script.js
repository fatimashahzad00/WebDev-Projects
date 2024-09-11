document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <input type="checkbox" id="todo-${index}" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text ${todo.completed ? 'completed' : ''}" contenteditable="true">${todo.text}</span>
                <button class="delete-btn">Delete</button>
            `;
            todoList.appendChild(li);

            // Add event listener for checkbox
            const checkbox = li.querySelector(`#todo-${index}`);
            checkbox.addEventListener('change', () => {
                todos[index].completed = checkbox.checked;
                li.querySelector('.todo-text').classList.toggle('completed');
                saveTodos();
            });

            // Add event listener for delete button
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                renderTodos();
                saveTodos();
            });

            // Add event listener for todo text editing
            const todoText = li.querySelector('.todo-text');
            todoText.addEventListener('input', () => {
                todos[index].text = todoText.textContent;
                saveTodos();
            });
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText) {
            todos.push({ text: todoText, completed: false });
            input.value = '';
            renderTodos();
            saveTodos();
        }
    });

    // Initial render
    renderTodos();
});