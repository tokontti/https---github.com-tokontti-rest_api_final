/* Tämä on selainsovelluksen pääohjelma, joka käyttää fetch API:a hakeakseen ja lähettääkseen
 tietoja palvelimelle. Tämä tiedosto on vastuussa käyttöliittymän toiminnasta ja käyttäjän
syötteiden käsittelystä.*/ 
async function getNotes() {
    const response = await fetch("/api/v1/notes");
    const data = await response.json();

    // Muodosta tekstilaatikko elementti
    const textarea = document.getElementById("text_table");

    // Tyhjennä tekstilaatikko
    textarea.value = '';

    // lisää muistiinpanon ID ja sisältö tekstilaatikkoon
    data.forEach(note => {
        textarea.value += `ID: ${note.id}, Content: ${note.content}\n`;
    });

    // kutsu autoResize funktiota
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
// Hae note Id:n perusteella
async function getNoteById(id) {
    // Varmista että id on numero
    fetch(`/api/v1/notes/${String(id)}`)
    .then(response => response.json())
    .then(note => {
        // Hae tekstilaatikko elementti
        const textarea = document.getElementById("text_table");

        // Tyhjennä tekstilaatikko
        textarea.value = '';

        // Lisää muistiinpanon ID ja sisältö tekstilaatikkoon
        textarea.value = `ID: ${note.id}, Content: ${note.content}`;

        // Kutsu autoResize funktiota
        autoResize.call(textarea);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Poista muistiinpano ID:n perusteella
async function deleteNoteById(id) {
    const response = await fetch(`/api/v1/notes/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Päivitä muistiinpano ID:n perusteella

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

// Lisää tapahtumankuuntelijat
document.getElementById("get-all-notes").addEventListener("click", getNotes);

// Lisää kuuntelija hae muistiinpano ID:n perusteella
document.getElementById("get-note-by-id").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("note-id").value;
    getNoteById(id);
});

// Lisää kuuntelija luo muistiinpano
document.getElementById("create-note").addEventListener("submit", (event) => {
    event.preventDefault();
    const content = document.getElementById("note-content").value;
    createNote(content);
});

// Lisää kuuntelija päivitä muistiinpano
document.getElementById("update-note").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("update-id").value;
    const newContent = document.getElementById("update-content").value;
    updateNoteById(id, newContent);
});

// Lisää kuuntelija poista muistiinpano
document.getElementById("delete-note").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("delete-id").value;
    deleteNoteById(id);
});
// Lisää kuuntelija tekstilaatikolle
const textarea = document.getElementById('text_table');

textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}