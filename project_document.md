# Notes Sharing Platform

## Introduction
The Notes Sharing Platform is a simple front-end web application designed for creating, managing, and sharing notes. It is built using plain HTML, CSS, and JavaScript so that beginners can understand how browser-based applications work without needing a complex setup or framework.

This project demonstrates the basics of form handling, DOM updates, local storage, dynamic rendering, event listeners, and user interface design. It is ideal for learning how web applications interact with users and store data in the browser.

## Project Overview
The application allows users to:

- create notes with a title and content
- choose whether a note is private or public
- add tags to organize notes
- search notes by title, content, or tag
- delete notes
- share public notes using a generated share code
- switch between light and dark themes

## Features
1. Create and save notes
2. Mark notes as public or private
3. Generate share codes for public notes
4. Search by keyword or tag
5. Delete note cards
6. View public notes from other users
7. Persistent browser storage using localStorage
8. Dark mode option

## Code
### HTML Structure
```html
<form id="noteForm">
  <input id="noteTitle" type="text" placeholder="Note title" required />
  <textarea id="noteContent" placeholder="Write your note here..." required></textarea>

  <select id="noteVisibility">
    <option value="private">Private</option>
    <option value="public">Public</option>
  </select>

  <input id="noteTags" type="text" placeholder="study, notes, react" />
  <button type="submit">Save Note</button>
</form>
```

### JavaScript Logic
```javascript
function getNotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotes));
    return [...defaultNotes];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultNotes];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotes));
    return [...defaultNotes];
  }
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();

  if (!title || !content) {
    alert('Title and content are required.');
    return;
  }

  const notes = getNotes();
  notes.unshift({
    id: crypto.randomUUID(),
    title,
    content,
    visibility: noteVisibilityInput.value,
    tags: noteTagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean),
    createdAt: new Date().toISOString(),
    author: 'You'
  });

  saveNotes(notes);
  renderNotes();
});
```

### CSS Styling
```css
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 22px;
}
```

## Output Sample
Below is the expected appearance of the application after it is opened in the browser:

```text
Notes Sharing Platform

Create Note
[Title field]
[Content area]
Visibility: [Private / Public]
Tags: [study, javascript]
[Save Note]

My Notes
- Study Plan
- Project Ideas

Public Notes
- Study Plan

Shared Note
Enter Share Code: STUDY2024
[Open]
```

A typical layout includes:
- a note creation form on the left
- a share-code panel on the right
- a “My Notes” section with searchable cards
- a “Public Notes” section showing shareable notes

## Explanation
This app uses browser local storage to persist data without a backend. When a user creates a note, the system validates the input and saves it in `localStorage`. The page then re-renders the note list so the new note appears immediately.

The search box works by filtering notes based on matching title, content, or tags. Public notes receive a generated share code that can be used to open a specific note in the shared panel. The delete action removes the note from storage and updates the display immediately.

The CSS creates a responsive card layout and theme colors, while JavaScript handles the dynamic interaction. This makes the project a good example of front-end web programming with no server required.

## How to Run the Project
1. Open the project folder.
2. Run the following command:

```bash
python3 -m http.server 8000
```

3. Open this URL in the browser:

```text
http://localhost:8000
```

## Conclusion
The Notes Sharing Platform is a beginner-friendly web project that demonstrates how to build a working, interactive application using only HTML, CSS, and JavaScript. It includes core features such as note creation, data persistence, sharing, and searching, which makes it a strong example of practical front-end development.

This project is useful for learning how user input, browser storage, and dynamic UI updates work together in real web applications.
