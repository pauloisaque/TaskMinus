import { _ } from '../utils/elements.js';
import { data } from '../database/data.js';
import { generateId } from '../utils/methods.js';

function updateTaskListUI() {
    if (!_.tasksScreenPageTaskList) { return; }
    _.tasksScreenPageTaskList.innerHTML = '';
    data.taskList.forEach((task) => {
        _.tasksScreenPageTaskList.appendChild(createDivTask(task));
    });
}

function createDivTask(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-div';
    taskItem.innerHTML = `
        <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-title">${task.title}</span>
        <button class="task-delete-button">🗑️ Deletar</button>
    `;

    const checkbox = taskItem.querySelector('.task-complete-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        updateTaskListUI();
    });

    const deleteButton = taskItem.querySelector('.task-delete-button');
    deleteButton.addEventListener('click', () => {
        data.taskList = data.taskList.filter(t => t.id !== task.id);
        updateTaskListUI();
    });

    return taskItem;
}

_.tasksScreenPageAddProjectButton.addEventListener('click', () => {
    
});

_.tasksScreenPageAddTaskButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escreva sua task';
    input.className = 'task-input';
    input.autofocus = true;

    _.tasksScreenPageTaskList.appendChild(input);

    function saveTask() {
        const taskText = input.value.trim();
        if(!taskText) { input.remove(); return; }

        const newTask = {
            id: generateId(),
            title: taskText,
            completed: false,
            dueDate: null,
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        data.taskList.push(newTask);
        console.log('Task added:', newTask);
        input.remove();
        updateTaskListUI();
    }

    input.addEventListener("blur", saveTask);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveTask();
        }});    
})