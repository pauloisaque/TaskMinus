import { data } from '../../database/data.js';

let draggedTask = null;
let draggedElement = null;

function setupDragEvents(taskItem, task, updateCallback) {
    taskItem.draggable = true;
    // === EVENTOS DESKTOP (Mouse) ===
    taskItem.addEventListener('dragstart', (e) => {
        draggedTask = task;
        draggedElement = taskItem;
        taskItem.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    });

    taskItem.addEventListener('dragend', () => {
        taskItem.style.opacity = '1';
        draggedTask = null;
        draggedElement = null;
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
            reorderTasks(draggedTask.id, task.id, updateCallback);
        }
    });

    // === EVENTOS MOBILE (Touch) ===
    let touchStartY = 0;
    
    taskItem.addEventListener('touchstart', (e) => {
        draggedTask = task;
        draggedElement = taskItem;
        touchStartY = e.touches[0].clientY;
        taskItem.style.opacity = '0.5';
        taskItem.style.transition = 'none';
    });

    taskItem.addEventListener('touchmove', (e) => {
        if (!draggedElement) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        const currentY = touch.clientY;
        
        // Move o elemento visualmente
        const deltaY = currentY - touchStartY;
        draggedElement.style.transform = `translateY(${deltaY}px)`;
        
        // Encontra o elemento abaixo do toque
        draggedElement.style.pointerEvents = 'none';
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        draggedElement.style.pointerEvents = 'auto';
        
        // Remove highlight de todos
        document.querySelectorAll('.task-div').forEach(el => {
            el.style.borderTop = 'none';
        });
        
        // Adiciona highlight no elemento alvo
        if (elementBelow && elementBelow.classList.contains('task-div')) {
            elementBelow.style.borderTop = '3px solid #007bff';
        }
    });

    taskItem.addEventListener('touchend', (e) => {
        if (!draggedElement) return;
        
        const touch = e.changedTouches[0];
        
        // Encontra o elemento onde foi solto
        draggedElement.style.pointerEvents = 'none';
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        draggedElement.style.pointerEvents = 'auto';
        
        // Reset visual
        draggedElement.style.opacity = '1';
        draggedElement.style.transform = 'none';
        draggedElement.style.transition = '';
        
        // Remove todos os highlights
        document.querySelectorAll('.task-div').forEach(el => {
            el.style.borderTop = 'none';
        });
        
        // Reordena se foi solto em outra task
        if (elementBelow && elementBelow.classList.contains('task-div')) {
            const targetTaskId = elementBelow.dataset.taskId;
            const targetTask = data.taskList.find(t => t.id === targetTaskId);
            
            if (targetTask && draggedTask.id !== targetTask.id) {
                reorderTasks(draggedTask.id, targetTask.id, updateCallback);
            }
        }
        
        draggedTask = null;
        draggedElement = null;
    });
}

function reorderTasks(draggedId, targetId, updateCallback) {
    const draggedIndex = data.taskList.findIndex(t => t.id === draggedId);
    const targetIndex = data.taskList.findIndex(t => t.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
        const [removed] = data.taskList.splice(draggedIndex, 1);
        data.taskList.splice(targetIndex, 0, removed);
        if (typeof updateCallback === 'function') {
            updateCallback();
        }
    }
}

export { setupDragEvents };
