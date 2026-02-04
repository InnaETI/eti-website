const pageSelect = document.getElementById('page-select');
const customPathInput = document.getElementById('custom-path');
const openPathButton = document.getElementById('open-path');
const editor = document.getElementById('editor');
const status = document.getElementById('status');
const pathDisplay = document.getElementById('path-display');
const saveButton = document.getElementById('save');
const previewButton = document.getElementById('preview');
const backupList = document.getElementById('backup-list');
const uploadInput = document.getElementById('upload-input');
const uploadUrl = document.getElementById('upload-url');
const copyUpload = document.getElementById('copy-upload');

const state = {
  currentPath: null,
};

function setStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? '#f87171' : '#38bdf8';
}

async function loadPages() {
  const res = await fetch('/api/admin/pages');
  const data = await res.json();
  pageSelect.innerHTML = '';
  data.pages.forEach((page) => {
    const option = document.createElement('option');
    option.value = page.path;
    option.textContent = page.label;
    pageSelect.appendChild(option);
  });
  if (data.pages.length) {
    await loadPage(data.pages[0].path);
  }
}

async function loadPage(path) {
  if (!path) return;
  setStatus('Loading...');
  const res = await fetch(`/api/admin/page?path=${encodeURIComponent(path)}`);
  const data = await res.json();
  if (!res.ok) {
    setStatus(data.error || 'Failed to load page', true);
    return;
  }
  state.currentPath = data.relativePath;
  editor.value = data.html || '';
  pathDisplay.textContent = `Editing: ${data.relativePath}`;
  setStatus('Loaded.');
  await loadBackups();
}

async function loadBackups() {
  backupList.innerHTML = '';
  if (!state.currentPath) return;
  const res = await fetch(`/api/admin/backups?path=${encodeURIComponent(state.currentPath)}`);
  const data = await res.json();
  if (!res.ok) {
    setStatus(data.error || 'Failed to load backups', true);
    return;
  }
  if (!data.backups.length) {
    backupList.textContent = 'No backups yet.';
    return;
  }
  data.backups.forEach((backup) => {
    const item = document.createElement('div');
    item.className = 'backup-item';
    const name = document.createElement('span');
    name.textContent = backup.name;
    const restore = document.createElement('button');
    restore.type = 'button';
    restore.textContent = 'Restore';
    restore.addEventListener('click', () => restoreBackup(backup.path));
    item.appendChild(name);
    item.appendChild(restore);
    backupList.appendChild(item);
  });
}

async function savePage() {
  if (!state.currentPath) return;
  setStatus('Saving...');
  const res = await fetch(`/api/admin/page?path=${encodeURIComponent(state.currentPath)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html: editor.value }),
  });
  const data = await res.json();
  if (!res.ok) {
    setStatus(data.error || 'Failed to save', true);
    return;
  }
  setStatus('Saved.');
  await loadBackups();
}

async function restoreBackup(backupPath) {
  if (!state.currentPath) return;
  setStatus('Restoring...');
  const res = await fetch(`/api/admin/backups?path=${encodeURIComponent(state.currentPath)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ backupPath }),
  });
  const data = await res.json();
  if (!res.ok) {
    setStatus(data.error || 'Failed to restore', true);
    return;
  }
  setStatus('Restored.');
  await loadPage(state.currentPath);
}

async function uploadAsset(file) {
  if (!file) return;
  setStatus('Uploading...');
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/admin/uploads', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    setStatus(data.error || 'Upload failed', true);
    return;
  }
  uploadUrl.textContent = data.url;
  setStatus('Uploaded.');
}

pageSelect.addEventListener('change', (event) => {
  loadPage(event.target.value);
});

openPathButton.addEventListener('click', () => {
  const value = customPathInput.value.trim();
  if (!value) return;
  loadPage(value);
});

saveButton.addEventListener('click', savePage);

previewButton.addEventListener('click', () => {
  if (!state.currentPath) return;
  const previewPath = state.currentPath.replace(/\.html$/, '');
  window.open(`/${previewPath === 'index' ? '' : previewPath}`, '_blank');
});

uploadInput.addEventListener('change', (event) => {
  uploadAsset(event.target.files[0]);
});

copyUpload.addEventListener('click', async () => {
  if (!uploadUrl.textContent) return;
  await navigator.clipboard.writeText(uploadUrl.textContent);
  setStatus('Copied upload URL.');
});

loadPages().catch(() => setStatus('Failed to load admin data.', true));
