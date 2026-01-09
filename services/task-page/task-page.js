import { _ } from '../../utils/elements.js';
import { data } from '../../database/data.js';
import { generateId } from '../../utils/methods.js';
import { saveTask } from './save.js';
import { createInputElements } from './input.js';

let draggedTask = null;

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
    taskItem.draggable = true;
    taskItem.dataset.taskId = task.id;

    let dateStr = '';
    if (task.dueDate instanceof Date) {
        const dd = String(task.dueDate.getDate()).padStart(2, '0');
        const mm = String(task.dueDate.getMonth() + 1).padStart(2, '0');
        dateStr = `${dd}/${mm}`;
    }

    taskItem.innerHTML = `
        <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-title"><strong>${task.title}</strong></span>
        <span class="task-due-date">${dateStr}</span>
        <span class="task-emoji">${task.emoji || ''}</span>
        <button class="task-delete-button">🗑️ Deletar</button>
    `;

    // Drag events
    taskItem.addEventListener('dragstart', (e) => {
        draggedTask = task;
        taskItem.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    });

    taskItem.addEventListener('dragend', () => {
        taskItem.style.opacity = '1';
        draggedTask = null;
    });

    taskItem.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        taskItem.style.borderTop = '3px solid #007bff';
    });

    taskItem.addEventListener('dragleave', () => {
        taskItem.style.borderTop = 'none';
    });

    taskItem.addEventListener('drop', (e) => {
        e.preventDefault();
        taskItem.style.borderTop = 'none';

        if (draggedTask && draggedTask.id !== task.id) {
            const draggedIndex = data.taskList.findIndex(t => t.id === draggedTask.id);
            const targetIndex = data.taskList.findIndex(t => t.id === task.id);

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [removed] = data.taskList.splice(draggedIndex, 1);
                data.taskList.splice(targetIndex, 0, removed);
                updateTaskListUI();
            }
        }
    });

    // Checkbox
    const checkbox = taskItem.querySelector('.task-complete-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        updateTaskListUI();
    });

    // Delete button
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
