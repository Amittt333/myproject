
// -- Navigation --
function go(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pg-btn').forEach(b => b.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  const btn = document.getElementById('pgb-' + id);
  if (pg)  pg.classList.add('active');
  if (btn) btn.classList.add('active');
  window.scrollTo(0, 0);
}

// -- Toast --
let toastTimer;
function toast(msg, cls = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + cls;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// -- Login --
let loginRole = 'customer';
function setLoginTab(btn, role) {
  loginRole = role;
  document.querySelectorAll('#loginTabs .auth-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
function doLogin() {
  toast('Login ho gaya! Welcome back.', 'tg');
  setTimeout(() => {
    if (loginRole === 'admin')  go('a-dashboard');
    else if (loginRole === 'worker') go('w-dashboard');
    else go('c-dashboard');
  }, 600);
}
function doAdminLogin() {
  toast('Admin login successful!', 'tg');
  setTimeout(() => go('a-dashboard'), 600);
}
function doLogout() {
  toast('Logout ho gaye. Phir milenge!');
  setTimeout(() => go('home'), 700);
}

// -- Register tabs --
function switchRegTab(tab) {
  document.getElementById('regCustomer').style.display = tab === 'customer' ? 'block' : 'none';
  document.getElementById('regWorker').style.display   = tab === 'worker'   ? 'block' : 'none';
  document.getElementById('regTabC').classList.toggle('active', tab === 'customer');
  document.getElementById('regTabW').classList.toggle('active', tab === 'worker');
}
function doRegister() {
  toast('Account ban gaya! Login karein.', 'tg');
  setTimeout(() => go('c-dashboard'), 800);
}

// -- Worker selection in booking --
const workerData = {
  'Plumber':       [['S', 'Suresh Yadav',   '?4.5 · 5 saal · 89 jobs · Station Road', '?200'],['M', 'Mohan Das',     '?4.2 · 3 saal · 42 jobs · Bazar Samiti', '?180']],
  'Electrician':   [['R', 'Ramesh Kumar',   '?4.8 · 7 saal · 142 jobs · City Centre', '?250'],['V', 'Vijay Prasad',   '?4.4 · 4 saal · 67 jobs · Station Road', '?220']],
  'Carpenter':     [['D', 'Deepak Sharma',  '?4.9 · 8 saal · 203 jobs · Canary Hill', '?300'],['R', 'Rajesh Kumar',   '?4.3 · 5 saal · 88 jobs · Court Chowk',  '?270']],
  'Painter':       [['A', 'Ajay Das',       '?4.6 · 6 saal · 115 jobs · Civil Rd',    '?400'],['P', 'Pramod Singh',   '?4.1 · 3 saal · 45 jobs · Hospital Rd',   '?350']],
  'Cleaner':       [['S', 'Savita Devi',    '?4.7 · 4 saal · 132 jobs · Bazar Samiti','?150'],['L', 'Lata Kumari',    '?4.3 · 2 saal · 55 jobs · Church Road',   '?130']],
  'AC Technician': [['K', 'Kamal Kumar',    '?4.6 · 5 saal · 98 jobs · Station Road', '?350'],['N', 'Naresh Prasad',  '?4.4 · 6 saal · 112 jobs · Civil Road',   '?320']],
};
const basePrices = {Plumber:200,Electrician:250,Carpenter:300,Painter:400,Cleaner:150,'AC Technician':350};

function showWorkers(service) {
  const list = document.getElementById('workersList');
  const heading = document.getElementById('workersHeading');
  const priceEl = document.getElementById('bookPrice');
  if (!service || !workerData[service]) {
    list.innerHTML = '<div style="text-align:center;padding:1.5rem;color:var(--tx2)">Pehle service select karein.</div>';
    heading.textContent = 'Available Workers'; priceEl.textContent = '—'; return;
  }
  heading.textContent = 'Available ' + service + ' Workers';
  priceEl.textContent = '?' + (basePrices[service] || 0);
  list.innerHTML = workerData[service].map((w, i) =>
    `<div class="wm-card" onclick="selectWM(this,${i})" id="wm${i}">
      <div class="wm-av">${w[0]}</div>
      <div style="flex:1"><div class="wm-name">${w[1]}</div><div class="wm-meta">${w[2]}</div></div>
      <div class="wm-price">${w[3]}</div>
    </div>`
  ).join('');
}
function selectWM(el, i) {
  document.querySelectorAll('.wm-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}
function confirmBooking() {
  const svc = document.getElementById('bookService').value;
  const selected = document.querySelector('.wm-card.selected');
  if (!svc) { toast('Service select karein pehle', 'tb'); return; }
  if (!selected) { toast('Ek worker select karein', 'tb'); return; }
  toast('Booking confirm ho gayi! Worker ko notify kiya gaya.', 'tg');
  setTimeout(() => go('c-history'), 1000);
}

// -- Star rating --
let currentRating = 4;
function setStar(n) {
  currentRating = n;
  document.querySelectorAll('#ratingStars .star').forEach((s, i) => {
    s.classList.toggle('lit', i < n);
  });
}
function submitRating() {
  if (!currentRating) { toast('Pehle rating dijiye', 'tb'); return; }
  toast(`${currentRating}? review submit ho gaya! Shukriya ?`, 'tg');
}
