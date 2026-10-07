* {
  box-sizing: border-box;
}

:root {
  --bg: #f4f7fb;
  --panel: #ffffff;
  --panel-alt: #eef4ff;
  --text: #1f2937;
  --muted: #6b7280;
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --danger: #ef4444;
  --success: #16a34a;
  --border: #dfe7f5;
  --shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

body.dark {
  --bg: #0f172a;
  --panel: #111827;
  --panel-alt: #1e293b;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --danger: #f87171;
  --success: #4ade80;
  --border: #334155;
  --shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: 0.25s ease;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 60px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0;
  color: var(--primary);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

h1, h2, h3, p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
}

.layout {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 20px;
  margin-bottom: 22px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 22px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--panel-alt);
  color: var(--text);
}

textarea {
  resize: vertical;
  min-height: 160px;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row label {
  font-weight: 600;
}

.primary-btn,
.secondary-btn,
.ghost-btn,
.copy-btn,
.delete-btn {
  border: none;
  border-radius: 12px;
  padding: 11px 14px;
  font-weight: 600;
  transition: transform 0.15s ease, opacity 0.2s ease;
}

.primary-btn {
  background: var(--primary);
  color: white;
}

.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover,
.copy-btn:hover,
.delete-btn:hover {
  transform: translateY(-1px);
}

.secondary-btn {
  background: var(--panel-alt);
  color: var(--text);
}

.ghost-btn {
  background: var(--panel-alt);
  color: var(--text);
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.share-box {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.hidden {
  display: none;
}

.shared-note {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
}

.shared-note h3 {
  margin-bottom: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  margin-bottom: 18px;
}

.section-header input {
  max-width: 260px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.note-card {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.note-title {
  font-size: 1.1rem;
  margin-bottom: 0;
}

.badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.badge.private {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge.public {
  background: #dcfce7;
  color: #15803d;
}

.note-content {
  line-height: 1.55;
  color: var(--text);
  margin-bottom: 0;
  word-break: break-word;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 11px;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: var(--muted);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
}

.copy-btn {
  background: rgba(37, 99, 235, 0.12);
  color: var(--primary);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
}

.empty-state {
  padding: 18px;
  border-radius: 16px;
  background: var(--panel-alt);
  border: 1px dashed var(--border);
  color: var(--muted);
  text-align: center;
}

@media (max-width: 760px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .section-header,
  .share-box,
  .topbar,
  .card-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .section-header input {
    max-width: 100%;
  }
}
