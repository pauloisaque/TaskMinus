import { data } from '../../database/data.js';
import { _ } from '../../utils/elements.js';
import { saveTaskChanges } from './save-task-changes.js';

function openingTaskPage(taskItem) {
    const id = taskItem.id;
    const task = data.taskList.find(task => task.id === id);
    if (!task) { console.error('Task não encontrada'); return; }

    _.tasksScreenPage.hidden = true;
    _.taskPage.hidden = false;

    _.taskPageTaskName.textContent = task.title;
    _.taskPageDueDate.textContent = `${String(task.dueDate.getDate()).padStart(2, '0')}/${String(task.dueDate.getMonth() + 1).padStart(2, '0')}/${task.dueDate.getFullYear()}`;
    _.taskPageDueDateInput.valueAsDate = task.dueDate;
    _.taskPageDueDateInput.addEventListener('change', () => {
        const dateStr = _.taskPageDueDateInput.value;
        const [year, month, day] = dateStr.split('-');
        task.dueDate = new Date(year, month - 1, day);
        _.taskPageDueDate.textContent = `${String(task.dueDate.getDate()).padStart(2, '0')}/${String(task.dueDate.getMonth() + 1).padStart(2, '0')}/${task.dueDate.getFullYear()}`;
        taskItem.querySelector('.task-due-date').textContent = `${String(task.dueDate.getDate()).padStart(2, '0')}/${String(task.dueDate.getMonth() + 1).padStart(2, '0')}`;
    });
    saveTaskChanges(id, { dueDate: task.dueDate });
}

export { openingTaskPage };