import { data } from '../../database/data.js';

function saveTaskChanges(id, changes = {}) {
    data.taskList.find(task => task.id === id) = changes.dueDate;
}

export { saveTaskChanges };