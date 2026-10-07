# Notes Sharing Platform

## 1. Project Overview
The Notes Sharing Platform is a lightweight static web application built using HTML, CSS, and JavaScript. It allows users to create, manage, search, and share notes. The app stores note data in the browser using `localStorage`, which makes it easy to use without needing a backend server or database.

This project is designed to demonstrate core front-end development concepts such as DOM manipulation, local storage persistence, dynamic rendering, event-driven UI updates, and responsive page layout.

## 2. Objective of the Project
The main purpose of the project is to provide a small but functional note-sharing application where:

- users can create personal notes
- notes can be marked as private or public
- public notes can be opened using a unique share code
- notes can be searched by title or tag
- notes can be deleted
- the interface supports a dark mode toggle

## 3. Features
### Create Notes
Users can write a note title and content, choose visibility, and add tags. The system validates that both the title and body are present before saving.

### Private and Public Notes
Each note has a visibility setting:

- Private: visible only to the creator
- Public: visible to everyone and shareable via a generated code

### Share Codes
When a note is marked as public, a random share code is generated. That code allows other users to open the note without viewing the full list of all public notes.

### Search
The search box filters notes by title, content, or tags. This improves quick access and usability for larger note collections.

### Delete Notes
Users may delete any note they own. The application updates the rendered list immediately after removal.

### Dark Mode
A theme toggle allows switching between light and dark visuals for better user experience.

### Persistence
All saved notes are stored in the browser's `localStorage`, so they remain available even after the user refreshes the page.

## 4. Technology Stack
This project uses:

- HTML for page structure
- CSS for styling and responsiveness
- JavaScript for logic, interactivity, and browser storage
- Browser `localStorage` for persistence

There are no external frameworks, libraries, or build tools required.

## 5. Project Structure

- `index.html` — contains the app layout and structure
- `style.css` — includes all styling and responsive behavior
- `script.js` — contains the application logic, note handling, rendering, and sharing behavior
- `README.md` — basic run instructions

## 6. Files Explanation

### index.html
This file creates the user interface. It includes:

- the note creation form
- visibility selector
- tag input
- search field
- share code input
- public notes section
- my notes section
- reusable card template for notes

The HTML also links the stylesheet and the JavaScript logic.

### style.css
This file defines the visual design of the app, including:

- page colors and theme variables
- panel layout and card design
- responsive grid behavior
- buttons and input styling
- dark mode color overrides
- empty state styling

The CSS uses CSS variables such as `--bg`, `--panel`, `--primary`, and `--danger` to keep the design consistent and easy to customize.

### script.js
This is the core logic file. It handles the following responsibilities:

1. Storage constants
   - `STORAGE_KEY` stores all notes in browser memory
   - `THEME_KEY` stores the selected theme

2. DOM references
   - references to inputs, buttons, lists, and templates present in the HTML

3. Default demo data
   - includes example notes so the app is useful immediately when opened

4. Data helpers
   - `getNotes()` loads notes from localStorage
   - `saveNotes()` writes notes back to localStorage
   - `generateShareCode()` creates the public share code
   - `formatDate()` formats note timestamps

5. Rendering functions
   - `renderNotes()` displays user notes and applies search filters
   - `renderPublicNotes()` displays all public notes

6. Event handlers
   - form submit adds a new note
   - delete button removes a note
   - share button copies share code or opens public note
   - search input filters content live
   - theme toggle switches dark mode

## 7. Application Flow
### Creating a Note
1. User enters title and content.
2. User selects visibility: private or public.
3. User adds tags separated by commas.
4. Form submission triggers validation.
5. A new note object is created with a unique ID and timestamp.
6. The note is inserted at the front of the array.
7. Data is saved in localStorage and the list is re-rendered.

### Opening a Shared Note
1. User enters a share code in the share box.
2. The app searches for a public note whose `shareCode` matches.
3. If the note exists, it is displayed in the shared note panel.
4. If it does not exist, a not-found message is shown.

### Searching Notes
1. User types into the search input.
2. The search compares the query to title, content, and tag strings.
3. Matching notes are displayed while non-matching notes are removed from view.

## 8. State Management Strategy
The app uses a lightweight local-only state model:

- `notes` are stored as an array of objects
- each note object includes:
  - `id`
  - `title`
  - `content`
  - `visibility`
  - `tags`
  - `createdAt`
  - `author`
  - `shareCode`

This structure is simple and sufficient for a front-end-only project without a backend.

## 9. UI and Design Notes
The design is clean and modern, with a card-based layout and a responsive grid. The CSS uses spacing, borders, shadows, and rounded corners to create a polished feel. The color palette is easy to adjust and the theme toggle supports a darker alternative for low-light viewing.

## 10. How to Run the Project
1. Go to the project folder.
2. Start a local server using Python:

```bash
python3 -m http.server 8000
```

3. Open the following URL in a browser:

```text
http://localhost:8000
```

No installation or package manager step is required because the app uses plain HTML, CSS, and JavaScript.

## 11. Advantages of the Project
- easy to understand and modify
- no backend required
- quick demonstration of front-end functionality
- portable and lightweight
- good example of browser-based app patterns

## 12. Limitations
- notes are stored only on the browser that created them
- there is no user authentication or multi-user backend
- data is not shared across different devices without a server
- the app does not include advanced security or database features

## 13. Conclusion
The Notes Sharing Platform is a simple and effective front-end application that demonstrates note creation, public sharing, search, and local persistence. It is a good example of how to build a fully functional web app using only browser-native technologies.

The project is ideal for beginners learning JavaScript DOM manipulation, localStorage, and interactive UI design. It also serves as a foundation that could later be expanded into a full-stack application with a server, database, and user accounts.

## 14. Summary
In short, this project delivers:

- note writing and storage
- public/private visibility
- share code support
- note searching and filtering
- deletion and UI updates
- dark mode customization
- responsive design

This makes it both educational and practical for learning front-end web development.
