import { _ } from '../../utils/elements.js';
import { data } from '../../database/data.js';
import { generateId } from '../../utils/methods.js';
import { saveTask } from './save.js';
import { createInputElements } from './input.js';
import { setupDragEvents } from './drag-drop.js';
import { openTaskPage } from './open-task-page.js';

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
    taskItem.id = task.id;
    taskItem.dataset.taskId = task.id;

    const dueDateObj = new Date(task.dueDate);
    const dueDay = String(dueDateObj.getDate()).padStart(2, '0');
    const dueMonth = String(dueDateObj.getMonth() + 1).padStart(2, '0');

    taskItem.innerHTML = `
        <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-title"><strong>${task.title}</strong></span>
        <span class="task-due-date">${dueDay}/${dueMonth}</span>
        <span class="task-emoji">${task.emoji || ''}</span>
    `;

    // Configura os eventos de drag and drop
    setupDragEvents(taskItem, task, updateTaskListUI);

    // Checkbox
    const checkbox = taskItem.querySelector('.task-complete-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        updateTaskListUI();
    });

    taskItem.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-complete-checkbox')) { return; }
        openTaskPage(taskItem);
    });

    return taskItem;
}

_.tasksScreenPageAddProjectButton.addEventListener('click', () => {
    
});

_.tasksScreenPageAddTaskButton.addEventListener('click', () => {
    const inputElements = createInputElements();

    const input = inputElements.input;
    const dateInput = inputElements.dateInput;
    const emojiInput = inputElements.emojiInput;
    const sendButton = inputElements.sendButton;
    const container = inputElements.container;

    _.tasksScreenPageTaskList.appendChild(container);

    input.focus();

    sendButton.addEventListener("click", () => {
        saveTask(input, dateInput, emojiInput);
        container.remove();
        updateTaskListUI();
    });
     
})

export { updateTaskListUI };