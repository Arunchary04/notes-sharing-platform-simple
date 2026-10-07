# Notes Sharing Platform

This is a simple static web app for creating, searching, and sharing notes.

## Run it

1. Open a terminal in this folder.
2. Start a local web server:
   `python3 -m http.server 8000`
3. Open this in your browser:
   `http://localhost:8000`

No build step or package install is required.

## Files

- `index.html` — app structure
- `style.css` — styling
- `script.js` — note logic and interactions


searchInput.addEventListener('input', renderNotes);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, document.body.classList.contains('dark') ? 'dark' : 'light');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

renderNotes();
