// Application Deadline Tracker — live countdowns, per-deadline checklists, saved in localStorage.
const STORAGE_KEY = "tb-deadline-tracker-v1";

const DEMO = [
  { id: "cce", title: "SPSC CCE-2026 application", date: "2026-11-23", time: "17:00",
    steps: [
      { text: "Set my own password and register", done: false },
      { text: "Submit the application", done: false },
      { text: "Pay the fee after approval", done: false }
    ] },
  { id: "sts", title: "STS challan payment (4 clerk posts)", date: "2026-11-25", time: "23:59",
    steps: [
      { text: "Pay Rs 2,000 per post at the bank / 1Bill", done: false },
      { text: "Keep all 4 paid challan receipts", done: false }
    ] },
  { id: "spsc07", title: "SPSC Ad 07/2026 Assistant posts", date: "2026-12-14", time: "17:00",
    steps: [
      { text: "Choose the eligible posts only", done: false },
      { text: "Pay Rs 500 per post", done: false }
    ] },
  { id: "lat", title: "HEC LAT result", date: "2026-12-24", time: "23:59",
    steps: [
      { text: "Check the Yellow answer key when it is posted", done: false },
      { text: "Check the result on the ETC portal", done: false }
    ] }
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fall through to demo */ }
  return structuredClone(DEMO);
}

function save(items) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* private mode */ }
}

let items = load();

function deadlineMs(d) {
  return new Date(d.date + "T" + (d.time || "23:59") + ":00+05:00").getTime();
}

function countdownText(ms) {
  if (ms < 0) return "Closed";
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  if (days > 0) return days + (days === 1 ? " day" : " days") + " · " + hours + "h left";
  const mins = Math.floor((ms % 3600000) / 60000);
  return hours + "h " + mins + "m left";
}

function render() {
  const list = document.getElementById("deadline-list");
  const now = Date.now();
  const sorted = [...items].sort((a, b) => deadlineMs(a) - deadlineMs(b));
  const open = sorted.filter(d => deadlineMs(d) - now >= 0);
  const urgent = open.filter(d => deadlineMs(d) - now < 7 * 86400000);
  document.getElementById("summary").textContent =
    open.length === 0 ? "No open deadlines — add your next one above." :
    urgent.length > 0
      ? "Most urgent: " + urgent[0].title + " — " + countdownText(deadlineMs(urgent[0]) - now) + ". " +
        open.length + " deadline" + (open.length === 1 ? "" : "s") + " open."
      : open.length + " deadline" + (open.length === 1 ? "" : "s") + " open. Nearest: " +
        open[0].title + " — " + countdownText(deadlineMs(open[0]) - now) + ".";

  list.innerHTML = "";
  sorted.forEach(d => {
    const left = deadlineMs(d) - now;
    const done = d.steps.filter(s => s.done).length;
    const card = document.createElement("div");
    card.className = "result-card" + (left < 0 ? " fee" : left < 7 * 86400000 ? " keep" : "");
    card.innerHTML =
      '<span class="result-label">' + escapeHtml(d.title) + '</span>' +
      '<span class="result-value">' + countdownText(left) + '</span>' +
      '<span class="result-sub">Last date: ' + escapeHtml(d.date) +
      (d.time ? " · " + escapeHtml(d.time) : "") + ' · ' + done + "/" + d.steps.length + ' steps done</span>';
    const steps = document.createElement("div");
    steps.style.textAlign = "left";
    steps.style.width = "100%";
    d.steps.forEach((s, i) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.margin = "4px 0";
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = !!s.done;
      box.addEventListener("change", () => { s.done = box.checked; save(items); render(); });
      label.appendChild(box);
      label.appendChild(document.createTextNode(" " + s.text));
      steps.appendChild(label);
    });
    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn btn-secondary";
    del.textContent = "Remove";
    del.addEventListener("click", () => {
      items = items.filter(x => x.id !== d.id);
      save(items); render();
    });
    card.appendChild(steps);
    card.appendChild(del);
    list.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("new-title").value.trim();
  const date = document.getElementById("new-date").value;
  const time = document.getElementById("new-time").value || "23:59";
  const step = document.getElementById("new-step").value.trim();
  if (!title || !date) return;
  items.push({ id: "d" + Date.now(), title, date, time,
    steps: step ? [{ text: step, done: false }] : [] });
  save(items);
  e.target.reset();
  document.getElementById("new-time").value = "17:00";
  render();
});

document.getElementById("reset-demo").addEventListener("click", () => {
  items = structuredClone(DEMO);
  save(items);
  render();
});

render();
setInterval(render, 60000);
