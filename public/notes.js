async function getNotes() {
    const response = await fetch("/api/v1/notes");
    const data = await response.json();

    // Get the textarea element
    const textarea = document.getElementById("text_table");

    // Clear the textarea
    textarea.value = '';

    // For each note, append its content to the textarea
    data.forEach(note => {
        textarea.value += `ID: ${note.id}, Content: ${note.content}\n`;
    });

    // Call autoResize function
    autoResize.call(textarea);
}
async function createNote(content) {
    const response = await fetch('/api/v1/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function getNoteById(id) {
    // Ensure the id is a string
    fetch(`/api/v1/notes/${String(id)}`)
    .then(response => response.json())
    .then(note => {
        // Get the textarea element
        const textarea = document.getElementById("text_table");

        // Clear the textarea
        textarea.value = '';

        // Append the note's content to the textarea
        textarea.value = `ID: ${note.id}, Content: ${note.content}`;

        // Call autoResize function
        autoResize.call(textarea);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Delete a note by ID
async function deleteNoteById(id) {
    const response = await fetch(`/api/v1/notes/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Auto-resizing textarea
// Update a note by ID

async function updateNoteById(id, newContent) {
    const response = await fetch(`/api/v1/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

document.getElementById("get-all-notes").addEventListener("click", getNotes);

document.getElementById("get-note-by-id").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("note-id").value;
    getNoteById(id);
});

document.getElementById("create-note").addEventListener("submit", (event) => {
    event.preventDefault();
    const content = document.getElementById("note-content").value;
    createNote(content);
});

document.getElementById("update-note").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("update-id").value;
    const newContent = document.getElementById("update-content").value;
    updateNoteById(id, newContent);
});

document.getElementById("delete-note").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("delete-id").value;
    deleteNoteById(id);
});
// Auto-resizing textarea
const textarea = document.getElementById('text_table');

textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}