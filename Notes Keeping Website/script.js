console.log("Welcome to Magic Notes App. Write your notes here.");

// Display existing notes on page load
showNotes();

// Reference to the "Add Note" button
const myBtn = document.getElementById('myBtn');

myBtn.addEventListener('click', () => {
    const textArea = document.getElementById('textarea');
    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];

    // Add the new note
    notesObj.push(textArea.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    // Clear the textarea
    textArea.value = '';

    // Refresh the displayed notes
    showNotes();
});

function showNotes() {
    const notes = localStorage.getItem('notes');
    const notesObj = notes ? JSON.parse(notes) : [];

    const notesContainer = document.getElementById('notes');
    let html = '';

    if (notesObj.length === 0) {
        notesContainer.innerHTML = `Nothing to show, create a new note from "Add a note" section above.`;
        return;
    }

    notesObj.forEach((note, index) => {
        html += `
        <div class="noteBox">
            <h3 class="noteHeading">Note ${index + 1}</h3>
            <p class="paraHeading">${note}</p>
            <button class="buttonHeading" id="${index}" onclick="deleteNote(${index})">Delete Note</button>
        </div>`;
    });

    notesContainer.innerHTML = html;
}

function deleteNote(index) {
    const notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];

    // Remove the selected note
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    // Refresh the notes display
    showNotes();
}

// Search functionality
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
    const inputVal = searchInput.value.toLowerCase();
    const noteBoxes = document.getElementsByClassName('noteBox');

    Array.from(noteBoxes).forEach((box) => {
        const noteText = box.querySelector('.paraHeading').innerText.toLowerCase();

        if (noteText.includes(inputVal)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
});
