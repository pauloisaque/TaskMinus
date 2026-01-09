import { _ } from '../../utils/elements.js';
import { data } from '../../database/data.js';
import { generateId } from '../../utils/methods.js';

function saveTask(input, dateInput, emojiInput) {
    const newTask = {
        id: generateId(),
        title: input.value.trim(),
        emoji: emojiInput.dataset.emoji,
        completed: false,
        dueDate: new Date(dateInput.value.trim()),
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    data.taskList.push(newTask);
}

export { saveTask };

