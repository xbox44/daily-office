(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const view = $("#view");
  const KEY = "daily-office-v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { done: {} }; }
    catch { return { done: {} }; }
  }
  function save(st) { localStorage.setItem(KEY, JSON.stringify(st)); }

  let state = load();
  let cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  let office = Office.kindFromDate(new Date());

  function ymd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function stamp(d, kind) { return ymd(d) + ":" + kind; }

  function render() {
    document.body.dataset.office = office;
    const data = Office.assemble(cursor, office);
    const now = new Date();
    $("#clock").textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    $("#season-label").textContent = data.season.label;
    $("#date-label").textContent = cursor.toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric"
    });
    document.querySelectorAll(".tabs button").forEach((b) => {
      b.classList.toggle("active", b.dataset.office === office);
    });

    const done = !!state.done[stamp(cursor, office)];
    view.innerHTML = `
      <p class="lede">${data.source}</p>
      ${data.sections.map(sectionHtml).join("")}
      <button class="complete ${done ? "done" : ""}" id="mark">${done ? "Office kept this day" : "I have kept this office"}</button>
      <section class="section">
        <p class="kicker">The year</p>
        <h2>Three offices, every day</h2>
        <p class="rubric">${yearStats()} of 1,095 offices marked in this browser. Each square is a day; fill darkens as morning, midday, and evening are kept.</p>
        <div class="year" id="year"></div>
      </section>
      <p class="foot">Scripture is from the Holy Bible, Berean Standard Bible, BSB, produced in cooperation with Bible Hub, Discovery Bible, OpenBible.com, and the Berean Bible Translation Committee. Dedicated to the public domain (30 April 2023). Prayers are from the 1662 Book of Common Prayer, the Middelburg Liturgy (1586), the Westminster Shorter Catechism (1647), and the Heidelberg Catechism (Lord’s Day 1 on Sundays). This is a private household office, not a replacement for the public assembly of the church.</p>
    `;
    paintYear();
    $("#mark").onclick = () => {
      const k = stamp(cursor, office);
      if (state.done[k]) delete state.done[k];
      else state.done[k] = Date.now();
      save(state);
      render();
    };
  }

  function sectionHtml(sec) {
    let inner = "";
    if (sec.rubric) inner += `<p class="rubric">${esc(sec.rubric)}</p>`;
    if (sec.passage && sec.passage.lines) {
      inner += sec.passage.lines.map((ln) =>
        `<div class="verse"><span class="vn">${ln.n}</span><span>${esc(ln.t)}</span></div>`
      ).join("");
    } else if (sec.body) {
      inner += `<div class="body">${esc(sec.body)}</div>`;
    }
    if (sec.answer) inner += `<div class="body answer">${esc(sec.answer)}</div>`;
    return `<article class="section"><p class="kicker">The office</p><h2>${esc(sec.title)}</h2>${inner}</article>`;
  }

  function esc(s) {
    return String(s || "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function yearStats() {
    const y = cursor.getFullYear();
    return Object.keys(state.done).filter((k) => k.startsWith(y + "-")).length;
  }

  function paintYear() {
    const y = cursor.getFullYear();
    const leap = new Date(y, 1, 29).getDate() === 29;
    const days = leap ? 366 : 365;
    const wrap = $("#year");
    const start = new Date(y, 0, 1);
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(1 + i);
      const n = ["morning", "noon", "evening"].filter((k) => state.done[stamp(d, k)]).length;
      const el = document.createElement("i");
      el.className = "d" + n + (ymd(d) === ymd(cursor) ? " today" : "");
      el.title = d.toLocaleDateString();
      wrap.appendChild(el);
    }
  }

  document.querySelectorAll(".tabs button").forEach((b) => {
    b.onclick = () => { office = b.dataset.office; render(); };
  });
  $("#prev").onclick = () => { cursor.setDate(cursor.getDate() - 1); render(); };
  $("#next").onclick = () => { cursor.setDate(cursor.getDate() + 1); render(); };
  $("#today").onclick = () => {
    cursor = new Date();
    cursor.setHours(12, 0, 0, 0);
    office = Office.kindFromDate(new Date());
    render();
  };

  setInterval(() => {
    const el = $("#clock");
    if (el) el.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }, 30000);

  render();
})();
