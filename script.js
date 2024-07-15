document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const createButton = document.getElementById('create-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push(taskItem.querySelector('.task-name').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (taskText) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskName = document.createElement('span');
        taskName.classList.add('task-name');
        taskName.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'edit';
        editButton.addEventListener('click', () => editTask(taskItem));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));

        taskItem.appendChild(taskName);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    };

    // Add new task
    createButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Edit task
    const editTask = (taskItem) => {
        const taskName = taskItem.querySelector('.task-name');
        const newTaskText = prompt('Edit task:', taskName.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskName.textContent = newTaskText.trim();
            saveTasks();
        }
    };

    // Delete task
    const deleteTask = (taskItem) => {
        if (confirm('Are you sure you want to delete this task?')) {
            taskList.removeChild(taskItem);
            saveTasks();
        }
    };

    // Load tasks initially
    loadTasks();
});
