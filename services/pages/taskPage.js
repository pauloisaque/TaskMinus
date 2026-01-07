import { _ } from '../../utils/elements.js';
import { data } from '../../database/data.js';

function updateTaskListUI() {
    if (!_.tasksScreenPageTaskList) return;
    _.tasksScreenPageTaskList.innerHTML = '';
    data.taskList.forEach((task) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = task;
        _.tasksScreenPageTaskList.appendChild(taskItem);
    });
}

_.tasksScreenPageAddProjectButton?.addEventListener('click', () => {
    console.log('Add Project button clicked on Tasks Screen Page');
    
});

_.tasksScreenPageAddTaskButton?.addEventListener('click', () => {
    console.log('Add Task button clicked on Tasks Screen Page');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escreva sua task';
    input.autofocus = true;
    input.className = 'task-input';

    _.tasksScreenPageTaskList.appendChild(input);

    function saveTask() {
        const taskText = input.value.trim();
        if(!taskText) { input.remove(); return; }
        data.taskList.push(taskText);
        console.log('Task added:', taskText);
        input.remove();
        updateTaskListUI();
    }

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            saveTask();
        }
    });

    input.addEventListener("blur", () => {
        saveTask();
    });
});