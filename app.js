const API_BASE = 'https://convertershub-7.onrender.com';

// ===== TAB NAVIGATION =====
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Deactivate all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Activate selected button
  const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (selectedBtn) {
    selectedBtn.classList.add('active');
  }
}

// ===== DARK MODE =====
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  updateThemeButtonText();
}

function updateThemeButtonText() {
  const btn = document.getElementById('themeToggle');
  const isDark = document.body.classList.contains('dark-mode');
  btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// ===== API FUNCTIONS =====
async function postConvert(type, value, from, to) {
  const url = `${API_BASE}/convert/${type}`;
  const body = { value: Number(value), from: String(from).trim(), to: String(to).trim() };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  return res.json();
}

async function getData(path) {
  const url = `${API_BASE}/data/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  return res.json();
}

async function postTime(from, to) {
  const params = new URLSearchParams({ from, to });
  const url = `${API_BASE}/time/timezone?${params}`;
  const res = await fetch(url, { method: 'POST' });
  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  return res.text();
}

function setStatus(msg) {
  document.getElementById('status').innerText = msg;
}

// ===== CONVERTER FUNCTIONS =====
async function convert(kind) {
  let value, from, to, resultEl;

  if (kind === 'length') {
    value = document.getElementById('lengthValue').value;
    from = document.getElementById('lengthFrom').value;
    to = document.getElementById('lengthTo').value;
    resultEl = document.getElementById('lengthResult');
  } else if (kind === 'weight') {
    value = document.getElementById('weightValue').value;
    from = document.getElementById('weightFrom').value;
    to = document.getElementById('weightTo').value;
    resultEl = document.getElementById('weightResult');
  } else if (kind === 'volume') {
    value = document.getElementById('volumeValue').value;
    from = document.getElementById('volumeFrom').value;
    to = document.getElementById('volumeTo').value;
    resultEl = document.getElementById('volumeResult');
  } else {
    throw new Error('Unknown converter type: ' + kind);
  }

  resultEl.innerText = '⏳ Converting...';
  setStatus('');

  try {
    const out = await postConvert(kind, value, from, to);
    // Accept numeric or object { result: number } response
    const numericResult = typeof out === 'number'
      ? out
      : (typeof out === 'object' && out !== null)
        ? (out.result ?? out.value ?? out.conversion ?? NaN)
        : NaN;

    if (!Number.isFinite(numericResult)) {
      throw new Error('Unexpected response format from API: ' + JSON.stringify(out));
    }

    const displayText = `<strong>${value} ${from}</strong> = <strong style="color: #2dbe9b;">${numericResult.toFixed(4)} ${to}</strong>`;
    resultEl.innerHTML = displayText;
    setStatus('✅ Conversion successful!');
  } catch (err) {
    resultEl.innerText = '❌ Error: ' + err.message;
    setStatus('Error occurred');
  }
}

async function convertData() {
  const value = Number(document.getElementById('dataValue').value);
  const mode = document.getElementById('dataMode').value;
  const resultEl = document.getElementById('dataResult');
  resultEl.innerText = '⏳ Converting...';
  setStatus('');

  try {
    const out = await getData(`${mode}/${value}`);
    const modeLabel = mode.replace(/-/g, ' ').toUpperCase();
    const displayText = `<strong>${value}</strong> → <strong style="color: #2dbe9b;">${out.toFixed(4)}</strong>`;
    resultEl.innerHTML = displayText;
    setStatus('✅ Data conversion completed!');
  } catch (err) {
    resultEl.innerText = '❌ Error: ' + err.message;
    setStatus('Error occurred');
  }
}

async function convertTime() {
  const from = document.getElementById('tzFrom').value;
  const to = document.getElementById('tzTo').value;
  const resultEl = document.getElementById('timezoneResult');
  resultEl.innerText = '⏳ Converting...';
  setStatus('');

  try {
    const out = await postTime(from, to);
    const displayText = `<strong>${from}</strong> → <strong style="color: #2dbe9b;">${out}</strong>`;
    resultEl.innerHTML = displayText;
    setStatus('✅ Time zone conversion completed!');
  } catch (err) {
    resultEl.innerText = '❌ Error: ' + err.message;
    setStatus('Error occurred');
  }
}


const currencyRates = new Map([
  ['USD', 1.00],
  ['EUR', 0.92],
  ['GBP', 0.79],
  ['JPY', 110.00],
  ['AUD', 1.35],
  ['CAD', 1.26],
  ['CHF', 0.98],
  ['CNY', 6.45],
  ['INR', 74.50],
  ['BRL', 5.25],
  ['ZAR', 15.50],
  ['RUB', 73.50],
  ['HKD', 7.78],
  ['SGD', 1.35],
  ['MXN', 17.05],
  ['KRW', 1180.00],
  ['TRY', 8.45],
  ['SEK', 8.50],
  ['NOK', 8.95],
  ['DKK', 6.28]
]);

function convertCurrency() {
  const amount = Number(document.getElementById('currencyValue').value);
  const from = document.getElementById('currencyFrom').value;
  const to = document.getElementById('currencyTo').value;
  const resultEl = document.getElementById('currencyResult');

  if (!amount || amount < 0) {
    resultEl.innerText = 'Error: Please enter a valid amount';
    setStatus('Error occurred');
    return;
  }

  if (!currencyRates.has(from) || !currencyRates.has(to)) {
    resultEl.innerText = ' Error: Unsupported currency';
    setStatus('Error occurred');
    return;
  }


  const amountInUSD = amount / currencyRates.get(from);
  const convertedAmount = amountInUSD * currencyRates.get(to);

  const displayText = `<strong>${amount} ${from}</strong> = <strong style="color: #2dbe9b;">${convertedAmount.toFixed(2)} ${to}</strong>`;
  resultEl.innerHTML = displayText;
  setStatus('✅ Currency conversion successful!');
}
   
// ===== EVENT LISTENERS =====
window.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Dark mode toggle
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', toggleDarkMode);

  // Load dark mode preference
  const darkModeSaved = localStorage.getItem('darkMode') === 'true';
  if (darkModeSaved) {
    document.body.classList.add('dark-mode');
  }
  updateThemeButtonText();

  setStatus('✨ Ready! Backend deployed on Render');
});