import { _ } from '../../utils/elements.js';
import { data } from '../../database/data.js';
import { generateId } from '../../utils/methods.js';
import { saveTask } from './save.js';
import { createInputElements } from './input.js';
import { setupDragEvents } from './drag-drop.js';
import { openTaskPage } from './open-task-page.js';

const PAGE_SIZE = 7;
let currentPage = 1; 

function getTotalPages() {
    return Math.max(1, Math.ceil(data.taskList.length / PAGE_SIZE));
}

function clampPage() {
    const total = getTotalPages();
    if (currentPage > total) currentPage = total;
    if (currentPage < 1) currentPage = 1;
}

function updateTaskListUI() {
    if (!_.tasksScreenPageTaskList) { return; }
    _.tasksScreenPageTaskList.innerHTML = '';

    // Renderiza todas as páginas empilhadas na mesma tela
    clampPage();
    const total = getTotalPages();
    for (let p = 1; p <= total; p++) {
        const start = (p - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const slice = data.taskList.slice(start, end);

        // Container da seção de página
        const section = document.createElement('div');
        section.className = 'task-page-section';

        slice.forEach((task) => {
            section.appendChild(createDivTask(task));
        });

        _.tasksScreenPageTaskList.appendChild(section);
    }
}

function createDivTask(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-div';
    taskItem.id = task.id;
    taskItem.dataset.taskId = task.id;

    let dueDateStr = '';
    if (task.dueDate) {
        const dueDateObj = new Date(task.dueDate);
        const dueDay = String(dueDateObj.getDate()).padStart(2, '0');
        const dueMonth = String(dueDateObj.getMonth() + 1).padStart(2, '0');
        dueDateStr = `${dueDay}/${dueMonth}`;
    }

    taskItem.innerHTML = `
        <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-title"><strong>${task.title}</strong></span>
        <span class="task-due-date">${dueDateStr}</span>
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

    // Scroll para o input ficar visível, compensando a nav fixa
    setTimeout(() => {
        const nav = _.bottomNav;
        const navHeight = nav ? nav.getBoundingClientRect().height : 60;
        const rect = container.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - navHeight - 16;
        window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    }, 0);

    input.focus();

    const sendTask = () => {
        saveTask(input, dateInput, emojiInput);
        container.remove();
        updateTaskListUI();
        // Scroll para mostrar a última tarefa acima da nav
        setTimeout(() => {
            const lastTask = _.tasksScreenPageTaskList.lastElementChild;
            if (lastTask) {
                lastTask.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 100);
    };

    sendButton.addEventListener('click', sendTask);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendTask();
        }
    });
     
})

export { updateTaskListUI };