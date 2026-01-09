function createAddTaskInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escreva sua task';
    input.className = 'task-input';
    input.autofocus = true;
    return input;
}

function createAddDateInput() {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = 'date-input';
    return input;
}

function createEmojiModal(onSelect) {
    const modal = document.createElement('div');
    modal.className = 'emoji-modal';
    
    const content = document.createElement('div');
    content.className = 'emoji-modal-content';
    
    const emojis = ['😊', '🎉', '💼', '📚', '🏃', '💪', '🎯', '⭐', '🔥', '✅', '📝', '🚀',
                     '❤️', '🌟', '🎨', '📱', '💻', '🎵', '🍕', '☕', '🌈', '🦄', '🐱', '🐶'];
    
    emojis.forEach(emoji => {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.className = 'emoji-option';
        btn.addEventListener('click', () => {
            onSelect(emoji);
            modal.remove();
        });
        content.appendChild(btn);
    });

    modal.appendChild(content);

    // Fechar ao clicar no fundo escuro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    return modal;
}

function createAddEmojiInput() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'emoji-input';
    button.textContent = '😊'; // emoji padrão
    
    button.addEventListener('click', () => {
        const modal = createEmojiModal((selectedEmoji) => {
            button.textContent = selectedEmoji;
            button.dataset.emoji = selectedEmoji;
        });
        document.body.appendChild(modal);
    });
    
    return button;
}

function createSendButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'send-task-button';
    button.textContent = 'Enviar Task';
    return button;
}

function createInputElements() {
    const container = document.createElement('div');
    container.className = 'input-elements';

    const input = createAddTaskInput();
    const dateInput = createAddDateInput();
    const emojiInput = createAddEmojiInput();
    const sendButton = createSendButton();

    container.appendChild(input);
    container.appendChild(dateInput);
    container.appendChild(emojiInput);
    container.appendChild(sendButton);

    return { container, input, dateInput, emojiInput, sendButton };
}

export { createInputElements };