import { _ } from '../../utils/elements.js';
import { data } from '../../database/data.js';
import { generateId } from '../../utils/methods.js';

function saveTask(input, dateInput, emojiInput) {
    const dateStr = dateInput.value.trim();
    const [year, month, day] = dateStr.split('-');
    
    const newTask = {
        id: generateId(),
        title: input.value.trim(),
        emoji: emojiInput.dataset.emoji || '',
        completed: false,
        dueDate: new Date(year, month - 1, day), 
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    data.taskList.push(newTask);
}

export { saveTask };

