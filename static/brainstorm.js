import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@11.1.0/dist/esm-browser/index.js';
const uuid = uuidv4;

let ideas = []

const drawIdeas = (ideas) => {
    const ideaBody = document.getElementById("ideaStickyNotes");
    ideaBody.innerHTML = '';
    let content = '';
    for (let i = 0; i < ideas.length; i++) {
        content += `
           <li id="${ideas[i].id}">
          
              <div class="editable" contenteditable>
                <h2>${ideas[i].title}</h2>
                <p>${ideas[i].content}</p>
                <div class="btn-group add-to-calendar">
                <button type="button" class="btn btn-sm btn-warning save-idea" contentEditable="false">Save</button>
                <button type="button" class="btn btn-sm btn-warning " contentEditable="false">Add</button>
                </div>
              </div>
      
            </li>
        `;
    }
    ideaBody.innerHTML = content;
}

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch("/get_brainstorms", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    ideas = await response.json()
    drawIdeas(ideas);
    addBEventListeners()
});

document.getElementById('addIdeaButton').addEventListener('click', async function () {
    const newNote = {
        "id": uuid(),
        "title": "Idea ",
        "content": "some content"
    };
    ideas.push(newNote);
    drawIdeas(ideas);
    addBEventListeners();
    createBrainstorm(newNote);

});

function createBrainstorm(note) {
    const response = fetch("/brainstorm/create_brainstorm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ newNote: note })
    });
}

function updateBrainstorm(note) {
    const response = fetch("/update_brainstorm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ newNote: note })
    });
}

function addBEventListeners() {
    document.querySelectorAll('.save-idea').forEach(button => {
        button.addEventListener('click', function (e) {
            var contentDiv = e.target.parentElement.parentElement;
            var li = e.target.parentElement.parentElement.parentElement;
            const note = {
                "id": li.id,
                "title": contentDiv.querySelector('h2').innerText,
                "content": contentDiv.querySelector('p').innerText
            };
            updateBrainstorm(note);
        })
});
}


