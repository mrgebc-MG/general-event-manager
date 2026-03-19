// =====================================================
//  EVENT DETAIL — event.js
// =====================================================

const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');
const event = getEventById(eventId);

if (!event) {
  document.querySelector('.main').innerHTML = `
    <div class="empty-state" style="padding-top:80px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p>Event not found. <a href="index.html">Back to dashboard</a></p>
    </div>`;
} else {
  renderEventDetail();
}

function renderEventDetail() {
  renderHeader();
  renderProgress();
  setupTabs();
  renderAVPanel();
  renderLightingPanel();
  renderStagePanel();
  renderTeamPanel();
}

// ---- Header ----
function renderHeader() {
  const d = new Date(event.date + 'T00:00:00');
  const formatted = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const typeInfo = EVENT_TYPES[event.type] || {};
  const badgeClass = event.type;

  document.getElementById('eventHeader').innerHTML = `
    <div class="event-header-left">
      <h1 class="event-header-title">${event.name}</h1>
      <div class="event-header-meta">
        <span class="event-header-date">${formatted} &middot; ${event.time}</span>
        <span class="type-badge ${badgeClass}">${typeInfo.label || event.type}</span>
        ${event.location ? `<span class="event-header-date">${event.location}</span>` : ''}
      </div>
      ${event.notes ? `<p style="margin-top:10px;font-size:0.82rem;color:var(--text-muted)">${event.notes}</p>` : ''}
    </div>
    <div class="event-header-actions">
      <button class="btn-ghost" onclick="window.print()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
      <button class="btn-ghost">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        Share
      </button>
    </div>
  `;
}

// ---- Progress ----
function calcProgress() {
  const allChecks = [
    ...event.av.checklist,
    ...event.lighting.checklist,
    ...event.stage.checklist,
  ];
  const teamDone = event.team.filter(t => t.status === 'confirmed').length;
  const teamTotal = event.team.length;

  const checksDone  = allChecks.filter(c => c.done).length;
  const checksTotal = allChecks.length;

  const checkPct = checksTotal ? (checksDone / checksTotal) * 70 : 0;
  const teamPct  = teamTotal   ? (teamDone  / teamTotal)   * 30 : 0;
  return Math.round(checkPct + teamPct);
}

function renderProgress() {
  const pct = calcProgress();
  document.getElementById('progressPct').textContent = pct + '%';
  document.getElementById('progressFill').style.width = pct + '%';
}

// ---- Tabs ----
function setupTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });
}

// ---- Checklist builder ----
function buildChecklistSection(title, icon, checks, notesVal, storageKey) {
  const done = checks.filter(c => c.done).length;
  const allDone = done === checks.length;

  return `
    <div class="checklist-section">
      <div class="checklist-header">
        <div class="checklist-title">
          ${icon}
          ${title}
        </div>
        <div class="checklist-count ${allDone ? 'all-done' : ''}">${done}/${checks.length}</div>
      </div>
      <div class="checklist-items" id="${storageKey}-items">
        ${checks.length === 0
          ? `<p style="padding:16px 20px;font-size:0.82rem;color:var(--text-dim)">No checklist items yet.</p>`
          : checks.map(c => checkItem(c, storageKey)).join('')}
      </div>
      <div class="checklist-notes">
        <textarea placeholder="Add notes for this section..." oninput="saveNote('${storageKey}', this.value)">${notesVal}</textarea>
      </div>
    </div>
  `;
}

function checkItem(c, sectionKey) {
  const storedDone = localStorage.getItem(`${eventId}-${sectionKey}-${c.id}`);
  const isDone = storedDone !== null ? storedDone === 'true' : c.done;

  return `
    <label class="check-item ${isDone ? 'checked' : ''}" id="item-${c.id}">
      <input type="checkbox"
        ${isDone ? 'checked' : ''}
        onchange="toggleCheck('${c.id}', '${sectionKey}', this.checked)" />
      <span class="check-label">${c.label}</span>
    </label>
  `;
}

function toggleCheck(checkId, sectionKey, checked) {
  localStorage.setItem(`${eventId}-${sectionKey}-${checkId}`, checked);
  const item = document.getElementById('item-' + checkId);
  if (item) item.classList.toggle('checked', checked);
  updateSectionCount(sectionKey);
  renderProgress();
}

function updateSectionCount(sectionKey) {
  const items = document.querySelectorAll(`#${sectionKey}-items .check-item`);
  const total = items.length;
  const done  = [...items].filter(i => i.classList.contains('checked')).length;
  const allDone = done === total;
  const countEl = document.querySelector(`#${sectionKey}-items`).closest('.checklist-section').querySelector('.checklist-count');
  if (countEl) {
    countEl.textContent = `${done}/${total}`;
    countEl.classList.toggle('all-done', allDone);
  }
}

function saveNote(sectionKey, value) {
  localStorage.setItem(`${eventId}-${sectionKey}-notes`, value);
}

// ---- AV Panel ----
function renderAVPanel() {
  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
  const notes = localStorage.getItem(`${eventId}-av-notes`) ?? event.av.notes;
  document.getElementById('panel-av').innerHTML = buildChecklistSection(
    'AV Setup Requirements', icon, event.av.checklist, notes, 'av'
  );
}

// ---- Lighting Panel ----
function renderLightingPanel() {
  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const notes = localStorage.getItem(`${eventId}-lighting-notes`) ?? event.lighting.notes;
  document.getElementById('panel-lighting').innerHTML = buildChecklistSection(
    'Lighting & Projection', icon, event.lighting.checklist, notes, 'lighting'
  );
}

// ---- Stage Panel ----
function renderStagePanel() {
  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`;
  const notes = localStorage.getItem(`${eventId}-stage-notes`) ?? event.stage.notes;
  document.getElementById('panel-stage').innerHTML = buildChecklistSection(
    'Stage Setup & Teardown', icon, event.stage.checklist, notes, 'stage'
  );
}

// ---- Team Panel ----
function renderTeamPanel() {
  const confirmed = event.team.filter(t => t.status === 'confirmed').length;
  const total     = event.team.length;

  document.getElementById('panel-team').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
      <div style="font-size:0.9rem;color:var(--text-muted)">
        <strong style="color:var(--text)">${confirmed}</strong> of ${total} roles filled
      </div>
      <div style="font-size:0.75rem;color:${confirmed === total ? 'var(--green)' : 'var(--amber)'}">
        ${confirmed === total ? 'All roles confirmed' : `${total - confirmed} open`}
      </div>
    </div>
    <div class="team-grid">
      ${event.team.map(r => `
        <div class="role-card ${r.status}">
          <div class="role-avatar ${r.status}">${r.initials}</div>
          <div class="role-card-info">
            <div class="role-card-title">${r.roleTitle}</div>
            <div class="role-card-person">${r.person}</div>
          </div>
          <div class="role-card-badge ${r.status}">${r.status === 'confirmed' ? 'Confirmed' : 'Open'}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:24px">
      <div class="checklist-section">
        <div class="checklist-header">
          <div class="checklist-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Team Notes
          </div>
        </div>
        <div class="checklist-notes">
          <textarea placeholder="Notes for the team — debrief, changes, what to remember next time..."
            style="min-height:100px"
            oninput="saveNote('team', this.value)">${localStorage.getItem(eventId + '-team-notes') || ''}</textarea>
        </div>
      </div>
    </div>
  `;
}
