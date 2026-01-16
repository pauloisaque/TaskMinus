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

const EMOJIS = ['🆘', '👀', '🗿', '⚠️', '🚨', '💥', '⏰', '🔥', '🚀', '🎯', '⚡',
    '⭐', '💪', '✅', '🔝', '🔜', '☑️', '✔️', '❗', '‼️', '💯', '❌', '🚫',
    '🔴', '🔵', '🟢', '🔹', '🔺', '🔻',
    '📌', '📍', '📈', '📉', '🔎', '💡', '💼', '📝', '📚', '🧹', '🏫',
    '♠️', '♣️', '♥️', '♦️', '♟️'];

function pickRandomEmoji() {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function createEmojiModal(onSelect) {
    const modal = document.createElement('div');
    modal.className = 'emoji-modal';
    
    const content = document.createElement('div');
    content.className = 'emoji-modal-content';
    
    EMOJIS.forEach(emoji => {
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
    const defaultEmoji = pickRandomEmoji();
    button.textContent = defaultEmoji;
    
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
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3l18 9-18 9V3z"/>
            <path d="M3 12h18"/>
        </svg>
    `;
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