// =====================================================
//  MOCK DATA — General Event Manager
//  Eastside Church Production Team
// =====================================================

const EVENT_TYPES = {
  sunday:          { label: 'Sunday Service',    color: '#007eac' },
  special:         { label: 'Special Service',   color: '#f59e0b' },
  wedding:         { label: 'Wedding / Funeral', color: '#8b5cf6' },
  'ecs-chapel':    { label: 'ECS Chapel',        color: '#10b981' },
  'ecs-performance':{ label: 'ECS Performance', color: '#f97316' },
};

const TEAM_MEMBERS = [
  { id: 't1', name: 'Marlon G.',   initials: 'MG', role: 'Tech Director' },
  { id: 't2', name: 'David R.',    initials: 'DR', role: 'Audio Engineer' },
  { id: 't3', name: 'Kezia M.',    initials: 'KM', role: 'ProPresenter Op.' },
  { id: 't4', name: 'Andre T.',    initials: 'AT', role: 'Lighting Op.' },
  { id: 't5', name: 'Lisa C.',     initials: 'LC', role: 'Stage Manager' },
  { id: 't6', name: 'TBD',         initials: '?',  role: 'Volunteer' },
];

const EVENTS = [
  {
    id: 'e001',
    name: 'Sunday Morning Service',
    type: 'sunday',
    date: '2026-03-22',
    time: '9:00 AM',
    location: 'Main Sanctuary',
    notes: 'Guest speaker — Pastor James Wells. Confirm lapel mic preference.',
    readiness: 75,
    av: {
      checklist: [
        { id: 'av1', label: 'Wireless mic count confirmed (4 handheld, 2 lapel)', done: true },
        { id: 'av2', label: 'IEM pack assigned to worship leader', done: true },
        { id: 'av3', label: 'Podium mic checked and placed', done: true },
        { id: 'av4', label: 'Playback tracks loaded and tested', done: false },
        { id: 'av5', label: 'Announcement loop prepped and queued', done: false },
        { id: 'av6', label: 'Special AV request from guest speaker confirmed', done: false },
      ],
      notes: 'Pastor Wells prefers lapel over handheld — confirm with his assistant by Saturday.',
    },
    lighting: {
      checklist: [
        { id: 'lt1', label: 'Lighting scene set: Worship mode', done: true },
        { id: 'lt2', label: 'Stage wash balanced for camera', done: true },
        { id: 'lt3', label: 'ProPresenter songs loaded and tested', done: false },
        { id: 'lt4', label: 'Countdown timer set for 9:00 AM', done: false },
        { id: 'lt5', label: 'Side screen and overflow room display confirmed', done: true },
      ],
      notes: '',
    },
    stage: {
      checklist: [
        { id: 'st1', label: 'Band setup: 5-piece (drums, keys, bass, 2 guitar)', done: true },
        { id: 'st2', label: 'Podium positioned center stage', done: true },
        { id: 'st3', label: 'Monitor mix tested with worship team', done: false },
        { id: 'st4', label: 'Drum shield in place', done: true },
        { id: 'st5', label: 'Teardown plan confirmed — Sunday noon', done: false },
      ],
      notes: 'Drums can stay until Monday this week per ops approval.',
    },
    team: [
      { roleTitle: 'Technical Director', person: 'Marlon G.', initials: 'MG', status: 'confirmed' },
      { roleTitle: 'Audio Engineer',     person: 'David R.',  initials: 'DR', status: 'confirmed' },
      { roleTitle: 'ProPresenter Op.',   person: 'Kezia M.', initials: 'KM', status: 'confirmed' },
      { roleTitle: 'Lighting Op.',       person: 'Andre T.', initials: 'AT', status: 'confirmed' },
      { roleTitle: 'Stage Manager',      person: 'Open',     initials: '?',  status: 'open' },
      { roleTitle: 'Volunteer — Audio',  person: 'Open',     initials: '?',  status: 'open' },
    ],
  },
  {
    id: 'e002',
    name: 'ECS Chapel — Lower School',
    type: 'ecs-chapel',
    date: '2026-03-24',
    time: '8:30 AM',
    location: 'Main Sanctuary',
    notes: 'Simple setup. Podium, one handheld mic, basic slide deck.',
    readiness: 40,
    av: {
      checklist: [
        { id: 'av1', label: 'Single handheld mic tested', done: true },
        { id: 'av2', label: 'Laptop connected for teacher slide deck', done: false },
        { id: 'av3', label: 'Volume levels set for chapel ambiance', done: false },
      ],
      notes: '',
    },
    lighting: {
      checklist: [
        { id: 'lt1', label: 'Lighting scene set: Spoken Word (chapel)', done: false },
        { id: 'lt2', label: 'Main screen configured for slide output', done: false },
        { id: 'lt3', label: 'Side screens off or mirrored', done: false },
      ],
      notes: '',
    },
    stage: {
      checklist: [
        { id: 'st1', label: 'Podium centered, chair removed', done: true },
        { id: 'st2', label: 'No band setup required', done: true },
        { id: 'st3', label: 'Teardown complete before 10:00 AM', done: false },
      ],
      notes: 'Lower school wraps by 9:15. Stage must be clear for next event.',
    },
    team: [
      { roleTitle: 'Technical Director', person: 'Marlon G.', initials: 'MG', status: 'confirmed' },
      { roleTitle: 'Audio Engineer',     person: 'Open',      initials: '?',  status: 'open' },
      { roleTitle: 'ProPresenter Op.',   person: 'Open',      initials: '?',  status: 'open' },
    ],
  },
  {
    id: 'e003',
    name: 'Easter Sunday Services',
    type: 'special',
    date: '2026-04-05',
    time: '8:00 AM / 10:00 AM',
    location: 'Main Sanctuary + Overflow',
    notes: 'Two full services. Elevated complexity — full band, drama team, video elements.',
    readiness: 20,
    av: {
      checklist: [
        { id: 'av1', label: 'Mic count confirmed (6 wireless + 4 IEM)', done: false },
        { id: 'av2', label: 'Video elements from media team received', done: false },
        { id: 'av3', label: 'Drama team AV requirements confirmed', done: false },
        { id: 'av4', label: 'Overflow room audio/video routing confirmed', done: false },
        { id: 'av5', label: 'Playback tracks loaded for both services', done: false },
        { id: 'av6', label: 'Livestream setup tested', done: false },
      ],
      notes: 'Two-service day. Budget 45 min between services for reset.',
    },
    lighting: {
      checklist: [
        { id: 'lt1', label: 'Custom Easter lighting scene created', done: true },
        { id: 'lt2', label: 'Drama lighting cues mapped', done: false },
        { id: 'lt3', label: 'Projection content reviewed with media team', done: false },
        { id: 'lt4', label: 'All three screens configured (main + 2 side)', done: false },
      ],
      notes: '',
    },
    stage: {
      checklist: [
        { id: 'st1', label: 'Full band setup complete by 7:00 AM', done: false },
        { id: 'st2', label: 'Drama props positioned backstage', done: false },
        { id: 'st3', label: 'Stage walk-through with worship team Saturday PM', done: false },
        { id: 'st4', label: 'Teardown plan for post-10AM service', done: false },
      ],
      notes: 'Arrive 6:30 AM. Full rehearsal 7–8.',
    },
    team: [
      { roleTitle: 'Technical Director', person: 'Marlon G.', initials: 'MG', status: 'confirmed' },
      { roleTitle: 'Audio Engineer',     person: 'David R.',  initials: 'DR', status: 'confirmed' },
      { roleTitle: 'ProPresenter Op.',   person: 'Kezia M.', initials: 'KM', status: 'confirmed' },
      { roleTitle: 'Lighting Op.',       person: 'Andre T.', initials: 'AT', status: 'confirmed' },
      { roleTitle: 'Stage Manager',      person: 'Lisa C.',  initials: 'LC', status: 'confirmed' },
      { roleTitle: 'Livestream Op.',     person: 'Open',     initials: '?',  status: 'open' },
      { roleTitle: 'Volunteer — Audio',  person: 'Open',     initials: '?',  status: 'open' },
      { roleTitle: 'Volunteer — Stage',  person: 'Open',     initials: '?',  status: 'open' },
    ],
  },
  {
    id: 'e004',
    name: 'Wedding — Johnson / Carter',
    type: 'wedding',
    date: '2026-03-28',
    time: '2:00 PM',
    location: 'Main Sanctuary',
    notes: 'Coordinator: Sandra Torres. Guest list ~180. Classical playlist prelude requested.',
    readiness: 55,
    av: {
      checklist: [
        { id: 'av1', label: 'Officiant lapel mic confirmed and tested', done: true },
        { id: 'av2', label: 'Vocalist mic confirmed (1 handheld)', done: true },
        { id: 'av3', label: 'Prelude music playlist received and loaded', done: false },
        { id: 'av4', label: 'Processional / recessional cues confirmed with coordinator', done: false },
        { id: 'av5', label: 'Video output for photo slideshow tested', done: false },
      ],
      notes: 'Sandra will bring USB drive with prelude playlist. Confirm format (MP3 preferred).',
    },
    lighting: {
      checklist: [
        { id: 'lt1', label: 'Ceremony lighting scene: warm white wash', done: true },
        { id: 'lt2', label: 'Candle effect / warm uplighting programmed', done: false },
        { id: 'lt3', label: 'Projection: photo slideshow pre-ceremony', done: false },
        { id: 'lt4', label: 'House lights at 40% for seating period', done: true },
      ],
      notes: '',
    },
    stage: {
      checklist: [
        { id: 'st1', label: 'Arch and floral setup space confirmed with coordinator', done: true },
        { id: 'st2', label: 'No band — playback only', done: true },
        { id: 'st3', label: 'Pew markers / aisle runner — not production responsibility', done: true },
        { id: 'st4', label: 'Teardown complete within 2 hrs post-ceremony', done: false },
      ],
      notes: 'Florist arrives at 11:00 AM. Clear stage path for setup.',
    },
    team: [
      { roleTitle: 'Technical Director', person: 'Marlon G.', initials: 'MG', status: 'confirmed' },
      { roleTitle: 'Audio Engineer',     person: 'David R.',  initials: 'DR', status: 'confirmed' },
      { roleTitle: 'Lighting Op.',       person: 'Open',      initials: '?',  status: 'open' },
      { roleTitle: 'ProPresenter Op.',   person: 'Kezia M.', initials: 'KM', status: 'confirmed' },
    ],
  },
];

// Computed helpers
function getOpenRoles() {
  const open = [];
  EVENTS.forEach(ev => {
    ev.team.forEach(r => {
      if (r.status === 'open') {
        open.push({ event: ev.name, eventDate: ev.date, role: r.roleTitle, eventId: ev.id });
      }
    });
  });
  return open;
}

function getEventById(id) {
  return EVENTS.find(e => e.id === id);
}
