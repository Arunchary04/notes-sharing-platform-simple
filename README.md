const STORAGE_KEY = 'notes-sharing-platform-data';
const THEME_KEY = 'notes-sharing-platform-theme';

const noteForm = document.getElementById('noteForm');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const noteVisibilityInput = document.getElementById('noteVisibility');
const noteTagsInput = document.getElementById('noteTags');
const notesList = document.getElementById('notesList');
const publicNotesList = document.getElementById('publicNotesList');
const shareCodeInput = document.getElementById('shareCodeInput');
const openShareBtn = document.getElementById('openShareBtn');
const sharedNoteCard = document.getElementById('sharedNoteCard');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const noteCardTemplate = document.getElementById('noteCardTemplate');

const defaultNotes = [
  {
    id: crypto.randomUUID(),
    title: 'Study Plan',
    content: 'Complete JavaScript DOM practice, revise CSS flexbox, and prepare 3 revision notes for tomorrow.',
    visibility: 'public',
    tags: ['study', 'javascript'],
    createdAt: new Date().toISOString(),
    author: 'Demo User',
    shareCode: 'STUDY2024'
  },
  {
    id: crypto.randomUUID(),
    title: 'Project Ideas',
    content: 'Create a note-sharing dashboard, add dark mode, and include search and share features.',
    visibility: 'private',
    tags: ['project', 'ideas'],
    createdAt: new Date().toISOString(),
    author: 'Demo User',
    shareCode: ''
  }
];

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

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function generateShareCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function renderNotes() {
  const notes = getNotes();
  const query = searchInput.value.trim().toLowerCase();

  const filtered = notes.filter((note) => {
    const matchesQuery = !query ||
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.join(' ').toLowerCase().includes(query);

    return matchesQuery;
  });

  const myNotes = filtered.filter((note) => note.visibility === 'private' || note.visibility === 'public');

  if (!myNotes.length) {
    notesList.innerHTML = '<div class="empty-state">No notes found.</div>';
  } else {
    notesList.innerHTML = '';
    myNotes.forEach((note) => {
      const clone = noteCardTemplate.content.cloneNode(true);
      const card = clone.querySelector('.note-card');
      clone.querySelector('.note-title').textContent = note.title;
      clone.querySelector('.note-content').textContent = note.content;
      clone.querySelector('.badge').textContent = note.visibility;
      clone.querySelector('.badge').classList.add(note.visibility);
      clone.querySelector('.note-author').textContent = note.author || 'You';
      clone.querySelector('.note-date').textContent = formatDate(note.createdAt);

      const tagsContainer = clone.querySelector('.tags');
      note.tags.forEach((tag) => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.textContent = '#' + tag;
        tagsContainer.appendChild(tagEl);
      });

      const copyBtn = clone.querySelector('.copy-btn');
      if (!note.shareCode || note.visibility !== 'public') {
        copyBtn.disabled = true;
        copyBtn.style.opacity = '0.5';
        copyBtn.textContent = note.visibility === 'public' ? 'Copy Code' : 'Private';
      } else {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(note.shareCode);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy Share Code';
          }, 1200);
        });
      }

      const deleteBtn = clone.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        const updatedNotes = getNotes().filter((item) => item.id !== note.id);
        saveNotes(updatedNotes);
        renderNotes();
        renderPublicNotes();
      });

      notesList.appendChild(clone);
      card.dataset.noteId = note.id;
    });
  }

  renderPublicNotes();
}

function renderPublicNotes() {
  const notes = getNotes();
  const publicNotes = notes.filter((note) => note.visibility === 'public');

  if (!publicNotes.length) {
    publicNotesList.innerHTML = '<div class="empty-state">No public notes yet.</div>';
    return;
  }

  publicNotesList.innerHTML = '';
  publicNotes.forEach((note) => {
    const clone = noteCardTemplate.content.cloneNode(true);
    const card = clone.querySelector('.note-card');
    clone.querySelector('.note-title').textContent = note.title;
    clone.querySelector('.note-content').textContent = note.content;
    clone.querySelector('.badge').textContent = 'Public';
    clone.querySelector('.badge').classList.add('public');
    clone.querySelector('.note-author').textContent = note.author || 'Anonymous';
    clone.querySelector('.note-date').textContent = formatDate(note.createdAt);

    const tagsContainer = clone.querySelector('.tags');
    note.tags.forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.className = 'tag';
      tagEl.textContent = '#' + tag;
      tagsContainer.appendChild(tagEl);
    });

    const copyBtn = clone.querySelector('.copy-btn');
    copyBtn.textContent = 'View Code';
    copyBtn.addEventListener('click', () => {
      const shareText = note.shareCode || 'No share code';
      navigator.clipboard.writeText(shareText);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'View Code';
      }, 1000);
    });

    const deleteBtn = clone.querySelector('.delete-btn');
    deleteBtn.remove();
    publicNotesList.appendChild(clone);
    card.dataset.noteId = note.id;
  });
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  const visibility = noteVisibilityInput.value;
  const tags = noteTagsInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title || !content) {
    alert('Title and content are required.');
    return;
  }

  const notes = getNotes();
  const newNote = {
    id: crypto.randomUUID(),
    title,
    content,
    visibility,
    tags,
    createdAt: new Date().toISOString(),
    author: 'You',
    shareCode: visibility === 'public' ? generateShareCode() : ''
  };

  notes.unshift(newNote);
  saveNotes(notes);
  renderNotes();

  noteForm.reset();
  noteVisibilityInput.value = 'private';
});

openShareBtn.addEventListener('click', () => {
  const code = shareCodeInput.value.trim().toUpperCase();
  if (!code) {
    alert('Enter a share code first.');
    return;
  }

  const notes = getNotes();
  const note = notes.find((item) => item.shareCode === code && item.visibility === 'public');

  if (!note) {
    sharedNoteCard.classList.remove('hidden');
    sharedNoteCard.innerHTML = '<h3>Not Found</h3><p>No public note exists for that share code.</p>';
    return;
  }

  sharedNoteCard.classList.remove('hidden');
  sharedNoteCard.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <div class="tags">
      ${note.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('')}
    </div>
    <p><strong>Author:</strong> ${note.author}</p>
    <p><strong>Share Code:</strong> ${note.shareCode}</p>
  `;
});

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
