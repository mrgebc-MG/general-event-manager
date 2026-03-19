// =====================================================
//  DASHBOARD — app.js
// =====================================================

// ---- Page date ----
const dateEl = document.getElementById('pageDate');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ---- Stats ----
function renderStats() {
  const thisWeek = EVENTS.filter(e => isThisWeek(e.date)).length;
  const allOpen  = getOpenRoles().length;
  const totalRoles = EVENTS.reduce((s, e) => s + e.team.length, 0);
  const filledRoles = EVENTS.reduce((s, e) => s + e.team.filter(r => r.status === 'confirmed').length, 0);
  const avgReady = Math.round(EVENTS.reduce((s, e) => s + e.readiness, 0) / EVENTS.length);

  const stats = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      color: 'blue',
      value: EVENTS.length,
      label: 'Total Events',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
      color: 'green',
      value: filledRoles + '/' + totalRoles,
      label: 'Roles Filled',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      color: 'amber',
      value: thisWeek,
      label: 'This Week',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      color: allOpen > 3 ? 'red' : 'green',
      value: avgReady + '%',
      label: 'Avg. Readiness',
    },
  ];

  document.getElementById('statsRow').innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon ${s.color}">${s.icon}</div>
      <div class="stat-info">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    </div>
  `).join('');
}

// ---- Week strip ----
function renderWeekStrip() {
  const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const eventDates = new Set(EVENTS.map(e => e.date));

  const strip = document.getElementById('weekStrip');
  if (!strip) return;

  strip.innerHTML = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const isToday = d.toDateString() === today.toDateString();
    const hasEvent = eventDates.has(iso);

    return `
      <div class="week-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">
        <div class="wd-name">${days[i]}</div>
        <div class="wd-num">${d.getDate()}</div>
        <div class="wd-dot"></div>
      </div>
    `;
  }).join('');
}

// ---- Open roles ----
function renderOpenRoles() {
  const open = getOpenRoles().slice(0, 4);
  const el = document.getElementById('openRoles');
  if (!el) return;

  if (open.length === 0) {
    el.innerHTML = '<p style="font-size:0.8rem;color:var(--text-dim);text-align:center;padding:12px 0">All roles filled!</p>';
    return;
  }

  el.innerHTML = open.map(r => `
    <div class="open-role-item">
      <div>
        <div class="role-event-name">${r.event}</div>
        <div class="role-name">${r.role}</div>
      </div>
      <div class="role-tag">Open</div>
    </div>
  `).join('');
}

// ---- Event List ----
let currentFilter = 'all';

function renderEvents(filter = 'all') {
  currentFilter = filter;
  const list = document.getElementById('eventList');
  if (!list) return;

  const filtered = filter === 'all'
    ? EVENTS
    : EVENTS.filter(e => {
        if (filter === 'ecs') return e.type.startsWith('ecs');
        return e.type === filter;
      });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <p>No events for this filter.</p>
      </div>`;
    return;
  }

  list.innerHTML = filtered.map(e => {
    const d = new Date(e.date + 'T00:00:00');
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate();
    const typeKey = e.type;
    const typeInfo = EVENT_TYPES[typeKey] || {};
    const typeClass = typeKey.replace('-', '-');
    const badgeClass = typeKey;

    const totalChecks = e.av.checklist.length + e.lighting.checklist.length + e.stage.checklist.length;
    const doneChecks  = e.av.checklist.filter(c=>c.done).length
                      + e.lighting.checklist.filter(c=>c.done).length
                      + e.stage.checklist.filter(c=>c.done).length;

    const teamTotal  = e.team.length;
    const teamFilled = e.team.filter(t => t.status === 'confirmed').length;

    const pct = e.readiness;
    const circ = 44;
    const r = 17;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (pct / 100) * circumference;
    const ringColor = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--blue-bright)' : 'var(--amber)';

    return `
      <a class="event-card" href="event.html?id=${e.id}" data-type="${typeKey}">
        <div class="event-date-block">
          <div class="edb-month">${month}</div>
          <div class="edb-day">${day}</div>
        </div>
        <div class="event-info">
          <div class="event-name">${e.name}</div>
          <div class="event-meta">
            <span class="event-time">${e.time}</span>
            <span class="type-badge ${badgeClass}">${typeInfo.label || e.type}</span>
          </div>
        </div>
        <div class="event-status">
          <div class="readiness-ring">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle class="ring-track" cx="22" cy="22" r="${r}" />
              <circle class="ring-fill" cx="22" cy="22" r="${r}"
                stroke="${ringColor}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}" />
            </svg>
            <div class="ring-pct">${pct}%</div>
          </div>
          <div class="team-dots">
            ${e.team.map(t =>
              `<div class="team-dot ${t.status === 'confirmed' ? 'filled' : 'open'}" title="${t.roleTitle}: ${t.person}"></div>`
            ).join('')}
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ---- Filter pills ----
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    renderEvents(btn.dataset.filter);
  });
});

// ---- Add Event Modal ----
function openAddModal() {
  document.getElementById('addModal').classList.add('active');
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('newEventDate').value = today;
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('active');
}

document.getElementById('addModal').addEventListener('click', function(e) {
  if (e.target === this) closeAddModal();
});

function handleAddEvent(e) {
  e.preventDefault();
  const name = document.getElementById('newEventName').value.trim();
  const date = document.getElementById('newEventDate').value;
  const time = document.getElementById('newEventTime').value;
  const type = document.getElementById('newEventType').value;
  const notes = document.getElementById('newEventNotes').value.trim();

  const formatTime = t => {
    const [h, m] = t.split(':');
    const hour = +h;
    return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const newEvent = {
    id: 'e' + Date.now(),
    name,
    type,
    date,
    time: formatTime(time),
    location: 'Main Sanctuary',
    notes,
    readiness: 0,
    av:       { checklist: [], notes: '' },
    lighting: { checklist: [], notes: '' },
    stage:    { checklist: [], notes: '' },
    team:     [],
  };

  EVENTS.push(newEvent);
  closeAddModal();
  renderEvents(currentFilter);
  renderStats();
  renderOpenRoles();
  renderWeekStrip();

  e.target.reset();
}

// ---- Helpers ----
function isThisWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() - today.getDay());
  const end   = new Date(start); end.setDate(start.getDate() + 6);
  return d >= start && d <= end;
}

// ---- Init ----
renderStats();
renderWeekStrip();
renderOpenRoles();
renderEvents();
