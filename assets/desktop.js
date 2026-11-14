/* Desktop: window manager, taskbar and desktop for maxwellanavian.com */
(() => {
  "use strict";

  /* ---------- icons (32px pixel-style SVG) ---------- */
  const svg = (body) =>
    `<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
  const ICONS = {
    welcome: svg(`<rect x="3" y="5" width="26" height="20" fill="#0b0b0b"/><rect x="4" y="6" width="24" height="18" fill="#2a7fd4"/><rect x="4" y="6" width="24" height="4" fill="#0b2a78"/><rect x="7" y="13" width="6" height="6" fill="#ff5b4a"/><rect x="14" y="13" width="6" height="6" fill="#3fc46b"/><rect x="21" y="13" width="4" height="6" fill="#ffd23f"/><rect x="12" y="25" width="8" height="2" fill="#555"/><rect x="8" y="27" width="16" height="2" fill="#0b0b0b"/>`),
    about: svg(`<rect x="6" y="3" width="20" height="26" fill="#0b0b0b"/><rect x="7" y="4" width="18" height="24" fill="#fff"/><rect x="7" y="4" width="18" height="4" fill="#2a7fd4"/><rect x="10" y="11" width="12" height="2" fill="#888"/><rect x="10" y="15" width="10" height="2" fill="#888"/><rect x="10" y="19" width="12" height="2" fill="#888"/><rect x="10" y="23" width="7" height="2" fill="#888"/>`),
    projects: svg(`<rect x="2" y="7" width="12" height="4" fill="#0b0b0b"/><rect x="3" y="8" width="10" height="3" fill="#f2c94c"/><rect x="2" y="10" width="28" height="18" fill="#0b0b0b"/><rect x="3" y="11" width="26" height="16" fill="#f2c94c"/><rect x="3" y="11" width="26" height="2" fill="#fff3b0"/><rect x="3" y="25" width="26" height="2" fill="#c9962a"/>`),
    photos: svg(`<rect x="3" y="9" width="26" height="18" fill="#0b0b0b"/><rect x="4" y="10" width="24" height="16" fill="#9aa3ad"/><rect x="10" y="6" width="10" height="4" fill="#0b0b0b"/><rect x="11" y="7" width="8" height="3" fill="#9aa3ad"/><rect x="10" y="12" width="12" height="12" fill="#0b0b0b"/><rect x="12" y="14" width="8" height="8" fill="#2a7fd4"/><rect x="13" y="15" width="3" height="3" fill="#bfe0ff"/><rect x="23" y="12" width="3" height="2" fill="#ffd23f"/>`),
    resume: svg(`<rect x="6" y="3" width="20" height="26" fill="#0b0b0b"/><rect x="7" y="4" width="18" height="24" fill="#fff"/><rect x="10" y="7" width="8" height="2" fill="#0b2a78"/><rect x="10" y="11" width="12" height="1" fill="#888"/><rect x="10" y="13" width="12" height="1" fill="#888"/><rect x="10" y="15" width="9" height="1" fill="#888"/><rect x="4" y="19" width="16" height="7" fill="#d43a2f"/><rect x="6" y="21" width="2" height="3" fill="#fff"/><rect x="9" y="21" width="3" height="3" fill="#fff"/><rect x="13" y="21" width="3" height="3" fill="#fff"/>`),
    contact: svg(`<rect x="3" y="8" width="26" height="18" fill="#0b0b0b"/><rect x="4" y="9" width="24" height="16" fill="#fff"/><rect x="5" y="10" width="2" height="2" fill="#0b0b0b"/><rect x="7" y="12" width="2" height="2" fill="#0b0b0b"/><rect x="9" y="14" width="2" height="2" fill="#0b0b0b"/><rect x="11" y="16" width="2" height="2" fill="#0b0b0b"/><rect x="13" y="17" width="6" height="2" fill="#0b0b0b"/><rect x="19" y="16" width="2" height="2" fill="#0b0b0b"/><rect x="21" y="14" width="2" height="2" fill="#0b0b0b"/><rect x="23" y="12" width="2" height="2" fill="#0b0b0b"/><rect x="25" y="10" width="2" height="2" fill="#0b0b0b"/><rect x="22" y="20" width="4" height="3" fill="#d43a2f"/>`),
    terminal: svg(`<rect x="3" y="5" width="26" height="22" fill="#0b0b0b"/><rect x="4" y="6" width="24" height="3" fill="#c3c3c3"/><rect x="4" y="9" width="24" height="17" fill="#111"/><rect x="7" y="12" width="2" height="2" fill="#3fc46b"/><rect x="9" y="14" width="2" height="2" fill="#3fc46b"/><rect x="7" y="16" width="2" height="2" fill="#3fc46b"/><rect x="13" y="17" width="7" height="2" fill="#3fc46b"/>`),
    hanoi: svg(`<rect x="2" y="25" width="28" height="4" fill="#0b0b0b"/><rect x="3" y="26" width="26" height="2" fill="#a0652b"/><rect x="7" y="7" width="2" height="18" fill="#5a3a1a"/><rect x="15" y="7" width="2" height="18" fill="#5a3a1a"/><rect x="23" y="7" width="2" height="18" fill="#5a3a1a"/><rect x="2" y="21" width="12" height="4" fill="#0b0b0b"/><rect x="3" y="22" width="10" height="2" fill="#d43a2f"/><rect x="3" y="17" width="10" height="4" fill="#0b0b0b"/><rect x="4" y="18" width="8" height="2" fill="#f2c94c"/><rect x="19" y="21" width="10" height="4" fill="#0b0b0b"/><rect x="20" y="22" width="8" height="2" fill="#3fc46b"/><rect x="5" y="13" width="6" height="4" fill="#0b0b0b"/><rect x="6" y="14" width="4" height="2" fill="#2a7fd4"/>`),
    wallpaper: svg(`<rect x="3" y="5" width="26" height="22" fill="#0b0b0b"/><rect x="4" y="6" width="24" height="20" fill="#2a3a7a"/><rect x="18" y="9" width="4" height="4" fill="#ffd23f"/><rect x="4" y="19" width="24" height="7" fill="#3a8a4a"/><rect x="8" y="15" width="8" height="4" fill="#3a8a4a"/>`),
    shutdown: svg(`<rect x="7" y="7" width="18" height="18" fill="#0b0b0b"/><rect x="8" y="8" width="16" height="16" fill="#d43a2f"/><rect x="15" y="10" width="2" height="7" fill="#fff"/><rect x="11" y="13" width="2" height="7" fill="#fff"/><rect x="19" y="13" width="2" height="7" fill="#fff"/><rect x="12" y="20" width="8" height="2" fill="#fff"/>`),
    github: `<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0a8 8 0 0 0-2.5 15.6c.4 0 .5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7 0-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.6 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 0Z"/></svg>`,
    linkedin: `<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M0 1.1C0 .5.5 0 1.2 0h13.6c.7 0 1.2.5 1.2 1.1v13.8c0 .6-.5 1.1-1.2 1.1H1.2C.5 16 0 15.5 0 14.9V1.1Zm4.9 12.3V6.2H2.5v7.2h2.4ZM3.7 5.2c.8 0 1.4-.6 1.4-1.3 0-.8-.5-1.3-1.3-1.3-.8 0-1.4.5-1.4 1.3 0 .7.5 1.3 1.3 1.3Zm4.9 8.2v-4c0-.2 0-.4.1-.6.2-.4.6-.9 1.3-.9.9 0 1.2.7 1.2 1.7v3.8h2.4V9.3c0-2.2-1.2-3.2-2.7-3.2-1.3 0-1.8.7-2.2 1.2v-1H6.2v7.1h2.4Z"/></svg>`,
  };
  const winGlyph = {
    min: `<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><rect x="1" y="7" width="6" height="2"/></svg>`,
    max: `<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M0 0h10v10H0zM1 2v7h8V2z" fill-rule="evenodd"/></svg>`,
    close: `<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M1 1h2v1h1v1h2V2h1V1h2v2H8v1H7v2h1v1h1v2H7V8H6V7H4v1H3v1H1V7h1V6h1V4H2V3H1z"/></svg>`,
  };

  /* ---------- photos app ---------- */
  const PHOTOS = Array.from({ length: 33 }, (_, i) => "photo_" + String(i + 1).padStart(2, "0"));
  const SLIDE_MS = 4000;
  // width / height of each photo, so the gallery can lay out justified rows without cropping
  const PORTRAIT = new Set([3, 9, 16, 30, 32]);
  const ratio = (i) => (PORTRAIT.has(i + 1) ? 2 / 3 : 3 / 2);

  function photosBody() {
    const frames = PHOTOS.map((p, i) => `
      <button class="frame" data-i="${i}" aria-label="Photo ${i + 1}">
        <img src="photos/thumbs/${p}.jpg" alt="" loading="lazy" decoding="async">
        <span class="fnum" aria-hidden="true">${i + 1}<i>▸</i>${i + 1}A</span>
      </button>`).join("");
    const tiles = PHOTOS.map((p, i) => `
      <button class="tile" data-i="${i}" aria-label="Open photo ${i + 1}"
        style="flex: ${ratio(i)} 1 calc(var(--row) * ${ratio(i)}); aspect-ratio: ${ratio(i)}">
        <img src="photos/thumbs/${p}.jpg" alt="" loading="lazy" decoding="async">
      </button>`).join("");
    return `
      <div class="photos">
        <div class="tabs" role="tablist">
          <button class="tab" role="tab" data-tab="viewer" aria-selected="true">Viewer</button>
          <button class="tab" role="tab" data-tab="gallery" aria-selected="false">Gallery</button>
        </div>
        <div class="tab-body">
        <div class="ph-gallery" data-panel="gallery" role="tabpanel" hidden>
          <div class="gallery">${tiles}</div>
        </div>
        <div class="ph-viewer" data-panel="viewer" role="tabpanel">
        <div class="ph-toolbar">
          <button class="bevel" data-act="prev" aria-label="Previous photo">◀ <span>Previous</span></button>
          <button class="bevel" data-act="next" aria-label="Next photo"><span>Next</span> ▶</button>
          <span class="ph-sep" aria-hidden="true"></span>
          <button class="bevel" data-act="play" aria-pressed="false"><b aria-hidden="true">▶</b> <span>Slideshow</span></button>
          <a class="bevel ph-full" data-act="full" target="_blank" rel="noopener">Full size</a>
          <span class="ph-count bevel-in" aria-live="polite"></span>
        </div>
        <div class="ph-stage" tabindex="0" aria-label="Photo viewer. Use the arrow keys to move between photos.">
          <img class="ph-img" alt="">
        </div>
        <div class="film" aria-label="Film strip">
          <div class="film-track">
            <span class="film-edge" aria-hidden="true">SAFETY FILM</span>${frames}
          </div>
        </div>
        </div>
        </div>
      </div>`;
  }

  function photosInit(win) {
    const img = $(".ph-img", win);
    const stage = $(".ph-stage", win);
    const film = $(".film", win);
    const frames = [...win.querySelectorAll(".frame")];
    const count = $(".ph-count", win);
    const full = $(".ph-full", win);
    const playBtn = $('[data-act="play"]', win);
    let cur = -1;
    let timer = null;

    function show(i, { scroll = true } = {}) {
      i = (i + PHOTOS.length) % PHOTOS.length;
      if (i === cur) return;
      cur = i;
      const name = PHOTOS[i];
      img.classList.add("loading");
      const next = new Image();
      next.onload = next.onerror = () => {
        if (cur !== i) return;
        img.src = next.src;
        img.alt = `Photo ${i + 1} of ${PHOTOS.length}`;
        img.classList.remove("loading");
      };
      next.src = `photos/${name}.jpg`;
      full.href = `photos/${name}.jpg`;
      count.textContent = `${i + 1} of ${PHOTOS.length}`;
      frames.forEach((f, k) => f.setAttribute("aria-current", k === i ? "true" : "false"));
      if (scroll) {
        const f = frames[i];
        film.scrollTo({ left: f.offsetLeft - (film.clientWidth - f.offsetWidth) / 2, behavior: "smooth" });
      }
      // warm the cache for the neighbours
      [i + 1, i - 1].forEach((k) => { new Image().src = `photos/${PHOTOS[(k + PHOTOS.length) % PHOTOS.length]}.jpg`; });
    }
    const step = (d) => show(cur + d);

    function play(on) {
      clearInterval(timer);
      timer = null;
      playBtn.setAttribute("aria-pressed", on ? "true" : "false");
      $("b", playBtn).textContent = on ? "■" : "▶";
      $("span", playBtn).textContent = on ? "Stop" : "Slideshow";
      if (on) timer = setInterval(() => (win.isConnected ? step(1) : play(false)), SLIDE_MS);
    }

    // Viewer / Gallery tabs
    const tabs = [...win.querySelectorAll(".tab")];
    const panels = [...win.querySelectorAll("[data-panel]")];
    let tab = "viewer";
    function setTab(name) {
      tab = name;
      tabs.forEach((t) => t.setAttribute("aria-selected", t.dataset.tab === name ? "true" : "false"));
      panels.forEach((p) => (p.hidden = p.dataset.panel !== name));
      if (name === "gallery") {
        play(false);
        win.querySelectorAll(".tile").forEach((t, k) => t.setAttribute("aria-current", k === cur ? "true" : "false"));
      } else {
        const f = frames[cur];
        film.scrollLeft = f.offsetLeft - (film.clientWidth - f.offsetWidth) / 2;
      }
    }

    win.addEventListener("click", (e) => {
      const t = e.target.closest(".tab");
      if (t) { setTab(t.dataset.tab); return; }
      const tile = e.target.closest(".tile");
      if (tile) { setTab("viewer"); show(+tile.dataset.i); return; }
      const frame = e.target.closest(".frame");
      if (frame) { play(false); show(+frame.dataset.i); return; }
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "prev") { play(false); step(-1); }
      if (act === "next") { play(false); step(1); }
      if (act === "play") play(!timer);
    });

    // arrow keys while the Photos window is the active one
    const onKey = (e) => {
      if (!win.isConnected) { document.removeEventListener("keydown", onKey); play(false); return; }
      if (!win.classList.contains("active") || win.hidden || tab !== "viewer") return;
      if (e.key === "ArrowRight") { e.preventDefault(); play(false); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); play(false); step(-1); }
      if (e.key === " " && document.activeElement === stage) { e.preventDefault(); play(!timer); }
    };
    document.addEventListener("keydown", onKey);

    // swipe on the big photo
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 40) { play(false); step(dx < 0 ? 1 : -1); }
    });

    // vertical mouse wheel scrolls the film sideways
    film.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { film.scrollLeft += e.deltaY; e.preventDefault(); }
    }, { passive: false });

    show(0, { scroll: false });
  }

  /* ---------- terminal app: the real MOOP compiler ---------- */
  const MOOP_API = "/api/moop/run";
  const MOOP_REPO = "https://github.com/anavianm/Moop";
  const FLAGS = { run: "", ast: "-a ", sast: "-s ", ir: "-l " };
  let moopExamples = null; // loaded once from assets/moop/examples.json
  let termSelect = null;      // set while the Terminal is open: (path) => show that file
  let pendingTermFile = null; // file to show once the Terminal has loaded its examples
  const HANOI_FILE = "showcase/hanoi.moop";
  let hanoiRestart = null;       // set while the game is open: start over with the current backend
  let hanoiFromTerminal = false; // true once the game uses source edited in the Terminal
  function openInTerminal(path) {
    open("terminal");
    if (termSelect) termSelect(path);
    else pendingTermFile = path;
  }
  const moopDrafts = new Map(); // path -> edited source, in memory only

  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function termBody() {
    return `
      <div class="moop">
        <div class="mp-toolbar">
          <select class="mp-file" aria-label="File in the editor"><option>Loading…</option></select>
          <button class="bevel mp-run" data-mode="run" title="Compile and run (Ctrl+Enter)"><b aria-hidden="true">▶</b> Run</button>
          <span class="ph-sep" aria-hidden="true"></span>
          <span class="mp-label">Show:</span>
          <button class="bevel" data-mode="ast" title="moop -a: print the AST">AST</button>
          <button class="bevel" data-mode="sast" title="moop -s: print the semantically checked AST">SAST</button>
          <button class="bevel" data-mode="ir" title="moop -l: print the generated LLVM IR">LLVM IR</button>
          <span class="ph-sep" aria-hidden="true"></span>
          <button class="bevel" data-act="reset" title="Undo your edits to this file">Reset</button>
          <button class="bevel" data-act="clear" title="Clear the terminal">Clear</button>
        </div>
        <div class="mp-panes">
          <div class="mp-editor-wrap">
            <pre class="mp-gutter" aria-hidden="true">1</pre>
            <textarea class="mp-editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"
              wrap="off" aria-label="MOOP source code"></textarea>
          </div>
          <div class="mp-out">
            <pre class="mp-log" role="log" aria-live="polite" aria-label="Terminal output"></pre>
            <div class="mp-line">
              <span class="t-prompt mp-ps">C:\\MOOP&gt;</span>
              <input class="mp-cmd" type="text" spellcheck="false" autocapitalize="off" autocomplete="off"
                autocorrect="off" enterkeyhint="go" aria-label="Command (type help for a list)">
            </div>
          </div>
        </div>
        <div class="mp-status">
          <span>MOOP compiler by Isabelle Lai, Anthony Tranduc, Jacqueline Chin and Maxwell Anavian</span>
          <a href="${MOOP_REPO}" target="_blank" rel="noopener">Source on GitHub</a>
        </div>
      </div>`;
  }

  const MODE_OF_FLAG = { "": "run", "-c": "run", "-a": "ast", "-s": "sast", "-l": "ir" };
  const HELP = `Commands
  dir [folder]     list files (also ls)
  cd <folder>      change folder: cd demos, cd ..
  type <file>      print a file (also cat)
  edit <file>      open a file in the editor
  moop <file>      compile and run a file
  moop -a <file>   show the AST (-s SAST, -l LLVM IR)
  run              run the file in the editor
  hanoi            play Tower of Hanoi
  cls              clear the screen
  echo  ver  help  exit

Up/Down: history    Tab: complete names
Edits last until you reload the page.
`;

  function termInit(win) {
    const select = $(".mp-file", win);
    const editor = $(".mp-editor", win);
    const gutter = $(".mp-gutter", win);
    const out = $(".mp-log", win);
    const outBox = $(".mp-out", win);
    const input = $(".mp-cmd", win);
    const ps = $(".mp-ps", win);
    const files = new Map(); // path -> { source, desc }
    let current = null;      // file in the editor
    let cwd = "";            // "" is C:\MOOP
    let busy = false;
    const history = [];
    let hIndex = 0;

    // Edits live only in memory for this page visit: nothing is saved in the browser
    // or on the server, and a reload brings every file back to its original.
    const loadDraft = (path) => moopDrafts.get(path);
    const saveDraft = (path, text) => {
      if (text === files.get(path).source) moopDrafts.delete(path);
      else moopDrafts.set(path, text);
    };
    const sourceOf = (path) => (path === current ? editor.value : loadDraft(path) ?? files.get(path).source);
    // clear drafts an earlier version of this page kept in localStorage
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("desktop.moop:")).forEach((k) => localStorage.removeItem(k));
    } catch { /* storage unavailable */ }

    /* ---- editor ---- */
    function lines() {
      const n = editor.value.split("\n").length;
      let t = "";
      for (let i = 1; i <= n; i++) t += i + "\n";
      gutter.textContent = t;
      gutter.scrollTop = editor.scrollTop;
    }
    editor.addEventListener("input", () => { lines(); if (current) saveDraft(current, editor.value); });
    editor.addEventListener("scroll", () => { gutter.scrollTop = editor.scrollTop; });
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        document.execCommand("insertText", false, "    "); // keeps undo history
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); typed(`moop ${dosName(current)}`); }
    });

    function openFile(path) {
      const text = loadDraft(path) ?? files.get(path).source;
      current = path;
      select.value = path;
      editor.value = text;
      editor.scrollTop = 0;
      lines();
    }

    /* ---- screen ---- */
    function print(html) {
      out.insertAdjacentHTML("beforeend", html);
      outBox.scrollTop = outBox.scrollHeight;
    }
    const say = (text, cls) => print(cls ? `<span class="${cls}">${esc(text)}</span>\n` : esc(text) + "\n");
    const where = () => "C:\\MOOP" + (cwd ? "\\" + cwd.toUpperCase().replace(/\//g, "\\") : "");
    const showPrompt = () => { ps.textContent = where() + ">"; };
    const dosName = (path) => {
      const rel = cwd && path.startsWith(cwd + "/") ? path.slice(cwd.length + 1) : (cwd ? "\\" + path : path);
      return rel.replace(/\//g, "\\");
    };

    /* ---- a small DOS-like file system over the example programs ---- */
    const dirs = () => {
      const set = new Set([""]);
      for (const k of files.keys()) if (k.includes("/")) set.add(k.slice(0, k.lastIndexOf("/")));
      return set;
    };
    function resolve(arg) {
      const p = arg.replace(/\\/g, "/").replace(/^c:/i, "");
      const parts = p.startsWith("/") ? [] : cwd ? cwd.split("/") : [];
      for (const seg of p.split("/")) {
        if (!seg || seg === ".") continue;
        if (seg === "..") parts.pop(); else parts.push(seg);
      }
      return parts.join("/");
    }
    const findDir = (arg) => [...dirs()].find((d) => d.toLowerCase() === resolve(arg).toLowerCase());
    function findFile(arg) {
      const p = resolve(arg).toLowerCase();
      return [...files.keys()].find((k) => k.toLowerCase() === p || k.toLowerCase() === p + ".moop");
    }
    const parentOf = (p) => (p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "");
    function entries(dir) {
      const sub = [...dirs()].filter((d) => d && parentOf(d) === dir).map((d) => d.split("/").pop());
      const fs = [...files.keys()].filter((k) => parentOf(k) === dir).map((k) => k.split("/").pop());
      return { sub, fs };
    }

    /* ---- compile through the MOOP API ---- */
    async function compile(mode, path) {
      busy = true;
      win.classList.add("mp-busy");
      const source = sourceOf(path);
      try {
        const res = await fetch(MOOP_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, mode }),
        });
        let r;
        try { r = await res.json(); } catch { r = { ok: false, error: `the compiler service returned an error (${res.status})` }; }
        if (r.error) {
          say(r.error, "t-err");
        } else {
          const c = r.compile || {};
          if (c.stdout) print(`<span class="t-listing">${esc(c.stdout)}</span>`);
          if (c.stderr) print(`<span class="t-err">${esc(c.stderr)}</span>`);
          if (r.run) {
            if (r.run.stdout) print(esc(r.run.stdout));
            if (r.run.stderr) print(`<span class="t-err">${esc(r.run.stderr)}</span>`);
          }
          const what = mode !== "run" ? "compiled" : r.stage === "run" ? "compiled and ran" : "compile failed";
          say(`[${what} in ${r.ms} ms${r.run && r.run.exit ? `, exit code ${r.run.exit}` : ""}]`, "t-dim");
          if (mode === "run" && path === HANOI_FILE) launchHanoi(r.ok, source);
        }
      } catch {
        say("Couldn't reach the compiler. Check your connection and try again.", "t-err");
      } finally {
        print("\n");
        busy = false;
        win.classList.remove("mp-busy");
      }
    }

    // Running hanoi.moop opens the game, using that code as its backend
    // (kept in memory only, like every other edit).
    function launchHanoi(ok, source) {
      if (!ok) { say("[fix the error above, then run it again to play with this backend]", "t-dim"); return; }
      if (!/@@BEGIN@@[\s\S]*@@END@@/.test(source)) {
        say("The game sends the board between the // @@BEGIN@@ and // @@END@@ markers in main(). Put them back to play.", "t-err");
        return;
      }
      hanoiTemplate = source;
      hanoiFromTerminal = true;
      say("[opening Tower of Hanoi with this file as its backend]", "t-dim");
      const wasOpen = wins.has("hanoi");
      open("hanoi");
      if (wasOpen && hanoiRestart) hanoiRestart();
    }

    /* ---- commands ---- */
    const COMMANDS = {
      help: () => print(`<span class="t-dim">${esc(HELP)}</span>`),
      ver: () => say("MOOP Terminal 1.0. Compiler: moop.native (OCaml) with LLVM 14, run by lli."),
      echo: (args) => say(args.join(" ")),
      cls: () => { out.textContent = ""; },
      exit: () => close("terminal"),
      hanoi: () => { say("[opening Tower of Hanoi]", "t-dim"); open("hanoi"); },
      cd: (args) => {
        if (!args.length) { say(where()); return; }
        const d = findDir(args.join(" "));
        if (d === undefined) say("The system cannot find the path specified.", "t-err");
        else { cwd = d; showPrompt(); }
      },
      dir: (args) => {
        const d = args.length ? findDir(args[0]) : cwd;
        if (d === undefined) { say("File Not Found", "t-err"); return; }
        const { sub, fs } = entries(d);
        let total = 0;
        let text = ` Directory of C:\\MOOP${d ? "\\" + d.toUpperCase().replace(/\//g, "\\") : ""}\n\n`;
        if (d) text += "<DIR>          ..\n";
        for (const s of sub) text += `<DIR>          ${s}\n`;
        for (const f of fs) {
          const size = new Blob([sourceOf((d ? d + "/" : "") + f)]).size;
          total += size;
          text += `${size.toLocaleString("en-US").padStart(14)} ${f}\n`;
        }
        text += `${String(fs.length).padStart(16)} file(s) ${total.toLocaleString("en-US")} bytes\n${String(sub.length).padStart(16)} dir(s)\n`;
        say(text);
      },
      type: (args) => {
        if (!args.length) { say("Usage: type <file>", "t-err"); return; }
        const f = findFile(args.join(" "));
        if (!f) say(`The system cannot find the file ${args.join(" ")}.`, "t-err");
        else say(sourceOf(f).replace(/\n$/, ""));
      },
      edit: (args) => {
        if (!args.length) { say(`Editing ${dosName(current)}`); return; }
        const f = findFile(args.join(" "));
        if (!f) say(`The system cannot find the file ${args.join(" ")}.`, "t-err");
        else { openFile(f); say(`[${dosName(f)} is open in the editor]`, "t-dim"); }
      },
      run: () => compile("run", current),
      moop: (args) => {
        let flag = "";
        const rest = [];
        for (const a of args) {
          if (a.startsWith("-")) {
            if (!(a in MODE_OF_FLAG)) { say(`Unknown flag ${a}. Use -a, -s or -l (or none to run).`, "t-err"); return; }
            flag = a;
          } else rest.push(a);
        }
        const f = rest.length ? findFile(rest.join(" ")) : current;
        if (!f) { say(`The system cannot find the file ${rest.join(" ")}.`, "t-err"); return; }
        return compile(MODE_OF_FLAG[flag], f);
      },
    };
    Object.assign(COMMANDS, { ls: COMMANDS.dir, cat: COMMANDS.type, open: COMMANDS.edit, clear: COMMANDS.cls });

    async function execute(line) {
      const words = line.trim().split(/\s+/).filter(Boolean);
      if (!words.length) return;
      let [cmd, ...args] = words;
      cmd = cmd.toLowerCase();
      if (/^cd[\\.]/.test(cmd)) { args = [cmd.slice(2), ...args]; cmd = "cd"; } // cd.. and cd\
      if (cmd.endsWith(".moop") && findFile(cmd)) { args = [cmd, ...args]; cmd = "moop"; } // typing a file name runs it
      const fn = COMMANDS[cmd];
      if (!fn) { say(`'${words[0]}' is not a command. Type help for a list.`, "t-err"); return; }
      await fn(args);
    }

    // run a command as if it had been typed at the prompt
    async function typed(line) {
      if (busy || !files.size) return;
      print(`<span class="t-prompt">${esc(where())}&gt;</span><span class="t-cmd">${esc(line)}</span>\n`);
      if (line.trim()) { history.push(line); hIndex = history.length; }
      await execute(line);
    }

    /* ---- the prompt ---- */
    function complete() {
      const value = input.value;
      const start = value.lastIndexOf(" ") + 1;
      const word = value.slice(start).replace(/\//g, "\\");
      const cut = word.lastIndexOf("\\") + 1;
      const base = findDir(word.slice(0, cut) || ".");
      if (base === undefined) return;
      const { sub, fs } = entries(base);
      const names = [...sub.map((s) => s + "\\"), ...fs];
      const stem = word.slice(cut).toLowerCase();
      const hits = names.filter((n) => n.toLowerCase().startsWith(stem));
      if (!hits.length) return;
      if (hits.length === 1) {
        input.value = value.slice(0, start) + word.slice(0, cut) + hits[0];
        return;
      }
      let common = hits[0];
      for (const h of hits) while (!h.toLowerCase().startsWith(common.toLowerCase())) common = common.slice(0, -1);
      if (common.length > stem.length) input.value = value.slice(0, start) + word.slice(0, cut) + common;
      else say(hits.join("   "), "t-dim");
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (busy) return;
        const line = input.value;
        input.value = "";
        typed(line);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hIndex > 0) input.value = history[--hIndex];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        hIndex = Math.min(hIndex + 1, history.length);
        input.value = history[hIndex] ?? "";
      } else if (e.key === "Tab") {
        e.preventDefault();
        complete();
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        out.textContent = "";
      }
    });
    // clicking anywhere in the terminal puts the cursor at the prompt (unless selecting text)
    outBox.addEventListener("mouseup", () => {
      if (!String(getSelection())) input.focus({ preventScroll: true });
    });

    /* ---- toolbar ---- */
    win.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-mode], [data-act]");
      if (!btn) return;
      if (btn.dataset.mode) {
        const flag = Object.keys(MODE_OF_FLAG).find((k) => k !== "-c" && MODE_OF_FLAG[k] === btn.dataset.mode);
        typed(`moop ${flag ? flag + " " : ""}${dosName(current)}`);
      }
      if (btn.dataset.act === "clear") out.textContent = "";
      if (btn.dataset.act === "reset" && current) {
        editor.value = files.get(current).source;
        saveDraft(current, editor.value);
        lines();
        editor.focus();
      }
    });
    select.addEventListener("change", () => openFile(select.value));

    say("MOOP Terminal: the Micro OOP compiler (OCaml + LLVM 14)", "t-dim");
    say("Type help for commands, or edit the code on the left and press Run.\n", "t-dim");
    showPrompt();

    (moopExamples ? Promise.resolve(moopExamples) : fetch("assets/moop/examples.json?v=2").then((r) => r.json()))
      .then((data) => {
        moopExamples = data;
        select.innerHTML = data.groups.map((g) =>
          `<optgroup label="${esc(g.group)}">${g.files.map((f) => {
            files.set(f.path, f);
            return `<option value="${esc(f.path)}">${esc(f.path)}${f.desc ? " - " + esc(f.desc) : ""}</option>`;
          }).join("")}</optgroup>`).join("");
        const first = pendingTermFile && files.has(pendingTermFile) ? pendingTermFile : "hello.moop";
        pendingTermFile = null;
        openFile(first);
        termSelect = (path) => {
          if (!win.isConnected) { termSelect = null; return; }
          if (files.has(path)) openFile(path);
        };
        if (finePointer()) input.focus({ preventScroll: true });
      })
      .catch(() => say("Couldn't load the example programs.", "t-err"));
  }

  /* ---------- Tower of Hanoi: HTML front end, MOOP back end ---------- */
  // Every action compiles and runs assets/moop/hanoi.moop on the real MOOP compiler,
  // with the current board and the action written into its main().
  let hanoiTemplate = null;
  const DISK_COLORS = ["#d43a2f", "#f28c28", "#f2c94c", "#3fc46b", "#21a3a3", "#2a7fd4", "#5b4fd1", "#b0346a"];

  function hanoiBody() {
    return `
      <div class="hanoi">
        <div class="hn-toolbar">
          <label class="hn-label">Disks
            <select class="hn-disks" aria-label="Number of disks">
              ${[3, 4, 5, 6, 7, 8].map((k) => `<option${k === 4 ? " selected" : ""}>${k}</option>`).join("")}
            </select>
          </label>
          <button class="bevel" data-hn="new">New game</button>
          <button class="bevel" data-hn="solve">Solve</button>
          <span class="hn-count bevel-in" aria-live="polite">Moves: 0</span>
        </div>
        <div class="hn-board">
          ${[0, 1, 2].map((i) => `
            <button class="hn-peg" data-peg="${i}" aria-label="Peg ${i + 1}">
              <span class="hn-rod" aria-hidden="true"></span>
              <span class="hn-stack"></span>
              <span class="hn-key" aria-hidden="true">${i + 1}</span>
            </button>`).join("")}
          <div class="hn-base" aria-hidden="true"></div>
        </div>
        <div class="hn-msg bevel-in" aria-live="polite">Loading…</div>
        <div class="hn-status">
          <span class="hn-timing">Rules checked by hanoi.moop on the real MOOP compiler</span>
          <button class="hn-link" data-hn="source">View the MOOP backend</button>
        </div>
      </div>`;
  }

  function hanoiInit(win) {
    const pegsEl = [...win.querySelectorAll(".hn-peg")];
    const msg = $(".hn-msg", win);
    const count = $(".hn-count", win);
    const timing = $(".hn-timing", win);
    const disksSel = $(".hn-disks", win);
    const solveBtn = $('[data-hn="solve"]', win);
    let pegs = [[], [], []];
    let n = 4;
    let moves = 0;
    let selected = null;
    let busy = false;
    let solving = null; // interval while a solution is being played
    let won = false;

    const best = () => (1 << n) - 1;
    const say = (text, kind = "") => { msg.textContent = text; msg.dataset.kind = kind; };

    function render() {
      pegsEl.forEach((el, i) => {
        $(".hn-stack", el).innerHTML = pegs[i].map((d) => {
          const w = 26 + ((d - 1) / Math.max(n - 1, 1)) * 70;
          return `<span class="hn-disk" style="width:${w}%;--c:${DISK_COLORS[(d - 1) % 8]}">${d}</span>`;
        }).join("");
        el.classList.toggle("selected", selected === i);
        el.setAttribute("aria-pressed", selected === i ? "true" : "false");
        el.setAttribute("aria-label", `Peg ${i + 1}: ${pegs[i].length ? "disks " + pegs[i].join(", ") + ", bottom to top" : "empty"}`);
      });
      count.textContent = `Moves: ${moves}  ·  Best: ${best()}`;
    }

    // Run hanoi.moop with the current board and `action` written into main(); returns its output lines.
    async function moop(action) {
      if (!hanoiTemplate) hanoiTemplate = await fetch("assets/moop/hanoi.moop?v=1").then((r) => r.text());
      const board = action.includes("newGame") ? []
        : pegs.flatMap((p, i) => p.map((d) => `        game.place(${i}, ${d});`));
      const body = ["// @@BEGIN@@", ...board, `        ${action}`, "        // @@END@@"].join("\n");
      const source = hanoiTemplate.replace(/\/\/ @@BEGIN@@[\s\S]*?\/\/ @@END@@/, () => body);
      const res = await fetch(MOOP_API, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, mode: "run" }),
      });
      const r = await res.json().catch(() => ({ error: `the compiler service returned an error (${res.status})` }));
      if (r.error) throw new Error(r.error);
      if (!r.run) throw new Error((r.compile && r.compile.stderr) || "compile failed");
      if (r.run.stderr) throw new Error(r.run.stderr);
      timing.textContent = `Checked by hanoi.moop${hanoiFromTerminal ? " (from the Terminal)" : ""} on the real MOOP compiler in ${r.ms} ms`;
      return r.run.stdout.replace(/\n$/, "").split("\n");
    }

    // board part of the output: for each peg, a count and then its disks bottom to top
    function readBoard(lines, at) {
      const out = [];
      for (let i = 0; i < 3; i++) {
        const k = +lines[at++];
        out.push(lines.slice(at, at + k).map(Number));
        at += k;
      }
      return out;
    }

    async function act(action) {
      busy = true;
      win.classList.add("hn-busy");
      try {
        return await moop(action);
      } catch (e) {
        say(String(e.message || e), "error");
        return null;
      } finally {
        busy = false;
        win.classList.remove("hn-busy");
      }
    }

    async function newGame() {
      stopSolving();
      n = +disksSel.value;
      const lines = await act(`game.newGame(${n});`);
      if (!lines) return;
      pegs = readBoard(lines, 2);
      moves = 0; selected = null; won = false;
      say(`${lines[1]}. Click a peg to pick up its top disk, then click where it should go.`);
      render();
    }

    async function tryMove(from, to) {
      const lines = await act(`game.move(${from}, ${to});`);
      if (!lines) return;
      const [status, text] = lines;
      if (status === "ILLEGAL" || status === "BADSTATE") {
        say(text, "error");
        pegsEl[to].classList.remove("shake");
        void pegsEl[to].offsetWidth; // restart the animation
        pegsEl[to].classList.add("shake");
        return;
      }
      pegs = readBoard(lines, 2);
      moves++;
      if (status === "WON") {
        won = true;
        say(moves === best() ? `Solved in ${moves} moves. That's perfect!`
          : `Solved in ${moves} moves. The best possible is ${best()}.`, "won");
      } else {
        say(`Disk moved from peg ${from + 1} to peg ${to + 1}.`);
      }
      render();
    }

    async function clickPeg(i) {
      if (busy || solving) return;
      if (won) { say("Solved! Press New game to play again.", "won"); return; }
      if (selected === null) {
        if (!pegs[i].length) { say("That peg is empty. Pick one with a disk on it.", "error"); return; }
        selected = i;
        say(`Disk ${pegs[i][pegs[i].length - 1]} picked up. Now choose a peg to put it on.`);
        render();
        return;
      }
      const from = selected;
      selected = null;
      render();
      if (from === i) say("Put back. Pick a peg to move from.");
      else await tryMove(from, i);
    }

    function stopSolving() {
      if (solving) { clearInterval(solving); solving = null; }
      solveBtn.textContent = "Solve";
    }

    async function solve() {
      if (solving) { stopSolving(); say("Stopped. Carry on yourself, or press Solve again."); return; }
      if (busy) return;
      if (won) { say("Already solved. Press New game to play again.", "won"); return; }
      selected = null;
      render();
      const lines = await act("game.solve();");
      if (!lines) return;
      if (lines[0] !== "SOLUTION") { say(lines[1], "error"); return; }
      const end = lines.indexOf("END");
      const steps = [];
      for (let k = 2; k < end; k += 2) steps.push([+lines[k], +lines[k + 1]]);
      const final = readBoard(lines, end + 2);
      say(`MOOP worked out the best finish: ${steps.length} moves. Playing them…`);
      solveBtn.textContent = "Stop";
      const delay = Math.max(50, Math.min(450, 18000 / steps.length));
      let k = 0;
      solving = setInterval(() => {
        if (!win.isConnected) return stopSolving();
        const [a, b] = steps[k++];
        pegs[b].push(pegs[a].pop());
        moves++;
        render();
        if (k === steps.length) {
          stopSolving();
          pegs = final;
          won = true;
          render();
          say(`Solved by MOOP: ${steps.length} moves from that position.`, "won");
        }
      }, delay);
    }

    win.addEventListener("click", (e) => {
      const peg = e.target.closest(".hn-peg");
      if (peg) { clickPeg(+peg.dataset.peg); return; }
      const btn = e.target.closest("[data-hn]");
      if (!btn) return;
      if (btn.dataset.hn === "new") newGame();
      if (btn.dataset.hn === "solve") solve();
      if (btn.dataset.hn === "source") openInTerminal("showcase/hanoi.moop");
    });
    disksSel.addEventListener("change", newGame);

    // keys 1, 2, 3 pick pegs while this window is in front
    const onKey = (e) => {
      if (!win.isConnected) { document.removeEventListener("keydown", onKey); stopSolving(); return; }
      if (!win.classList.contains("active") || win.hidden) return;
      if (e.target.closest && e.target.closest("select, textarea, input")) return;
      if (e.key === "1" || e.key === "2" || e.key === "3") clickPeg(+e.key - 1);
    };
    document.addEventListener("keydown", onKey);

    hanoiRestart = () => {
      if (!win.isConnected) { hanoiRestart = null; return; }
      newGame();
    };

    render();
    newGame();
  }

  /* ---------- apps ---------- */
  const soon = (what) => `
    <div class="soon">
      <div class="hourglass" aria-hidden="true">⧗</div>
      <h3>${what} is being set up</h3>
      <p>This window gets designed in the next step of the redesign.</p>
      <button class="bevel" data-close>OK</button>
    </div>`;

  const APPS = {
    welcome: {
      title: "Welcome", w: 580, h: "auto", plain: false,
      body: () => `
        <div class="welcome">
          <div class="welcome-art" aria-hidden="true"></div>
          <div class="welcome-main">
            <h1>Hi, I'm Max</h1>
            <p class="tag">Currently developing software at National Grid</p>
            <p>Welcome to my corner of the internet. It works like an old computer: open the icons to look through my projects, photography and resume, or to get in touch.</p>
            <div class="tip"><span aria-hidden="true">💡</span><div><b>Tip:</b> ${finePointer()
              ? "double-click an icon to open it. Drag windows around by their title bar."
              : "tap an icon to open it. Close a window with the × in its corner."}</div></div>
            <div class="quick">
              <button class="bevel" data-open="projects">Projects</button>
              <button class="bevel" data-open="photos">Photos</button>
              <button class="bevel" data-open="resume">Resume</button>
              <button class="bevel" data-open="contact">Contact</button>
            </div>
          </div>
        </div>`,
    },
    about:    { title: "About me.txt", w: 460, h: 320, body: () => soon("About me") },
    projects: { title: "Projects",     w: 620, h: 440, body: () => soon("Projects") },
    photos:   { title: "Photos", w: 880, h: 660, plain: true, body: photosBody, init: photosInit },
    resume:   { title: "Resume.pdf",   w: 620, h: 560, body: () => soon("Resume") },
    contact:  { title: "Contact",      w: 400, h: 300, body: () => soon("Contact") },
    terminal: { title: "Terminal - MOOP", w: 960, h: 620, plain: true, body: termBody, init: termInit },
    hanoi:    { title: "Tower of Hanoi", w: 640, h: 500, plain: true, body: hanoiBody, init: hanoiInit },
  };
  const DESKTOP_ORDER = ["about", "projects", "photos", "resume", "contact", "terminal", "hanoi"];
  const LABEL = { about: "About me", projects: "Projects", photos: "Photos", resume: "Resume", contact: "Contact", terminal: "Terminal", hanoi: "Hanoi" };

  const WALLPAPERS = ["photo_01", "photo_25", "photo_17", "photo_20", "photo_10", "photo_13", "photo_28"];

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const store = {
    get(k) { try { return localStorage.getItem("desktop." + k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("desktop." + k, v); } catch { /* private mode */ } },
  };
  const isPhone = () => matchMedia("(max-width: 700px)").matches;
  const finePointer = () => matchMedia("(pointer: fine)").matches;

  const desktop = $("#desktop");
  const winLayer = $("#windows");
  const tasks = $("#tasks");
  const startBtn = $("#startBtn");
  const startMenu = $("#startMenu");

  /* ---------- desktop icons ---------- */
  const iconList = $("#icons");
  iconList.innerHTML = DESKTOP_ORDER.map((id) =>
    `<li><button class="icon" data-app="${id}">${ICONS[id]}<span>${LABEL[id]}</span></button></li>`
  ).join("");

  iconList.addEventListener("click", (e) => {
    const btn = e.target.closest(".icon");
    if (!btn) return;
    selectIcon(btn);
    // mouse: double-click to open (classic); touch / pen: single tap opens
    if (!finePointer() || e.detail === 0) open(btn.dataset.app);
  });
  iconList.addEventListener("dblclick", (e) => {
    const btn = e.target.closest(".icon");
    if (btn && finePointer()) open(btn.dataset.app);
  });
  function selectIcon(btn) {
    iconList.querySelectorAll(".icon.selected").forEach((b) => b.classList.remove("selected"));
    if (btn) btn.classList.add("selected");
  }

  /* ---------- window manager ---------- */
  const wins = new Map(); // id -> { el, task }
  let z = 10;
  let cascade = 0;

  function open(id) {
    const app = APPS[id];
    if (!app) return;
    closeStart();
    if (wins.has(id)) { restore(id); return; }

    const el = document.createElement("section");
    el.className = "win bevel";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", app.title);
    el.dataset.app = id;
    el.innerHTML = `
      <header class="titlebar">
        ${ICONS[id]}
        <h2>${app.title}</h2>
        <button class="wbtn bevel minimize" aria-label="Minimize">${winGlyph.min}</button>
        <button class="wbtn bevel maximize" aria-label="Maximize">${winGlyph.max}</button>
        <button class="wbtn bevel close" aria-label="Close">${winGlyph.close}</button>
      </header>
      <div class="win-body${app.plain ? " plain" : ""}">${app.body()}</div>`;

    // size + position
    const area = desktop.getBoundingClientRect();
    const w = Math.min(app.w, area.width - 16);
    el.style.width = w + "px";
    if (app.h !== "auto") el.style.height = Math.min(app.h, area.height - 16) + "px";
    el.style.visibility = "hidden";
    winLayer.appendChild(el);
    const h = Math.min(el.offsetHeight, area.height - 16);
    el.style.visibility = "";
    let x, y;
    if (id === "welcome") {
      x = Math.max(120, (area.width - w) / 2);
      y = Math.max(16, (area.height - h) / 2 - 20);
    } else {
      x = 150 + (cascade % 6) * 34;
      y = 30 + (cascade % 6) * 30;
      cascade++;
    }
    x = Math.max(8, Math.min(x, area.width - w - 8));
    y = Math.max(8, Math.min(y, area.height - h - 8));
    Object.assign(el.style, { left: x + "px", top: y + "px" });

    const task = document.createElement("button");
    task.className = "task bevel";
    task.innerHTML = `${ICONS[id]}<span>${app.title}</span>`;
    task.setAttribute("aria-label", app.title);
    task.addEventListener("click", () => {
      if (el.hidden) restore(id);
      else if (el.classList.contains("active")) minimize(id);
      else focus(id);
    });
    tasks.appendChild(task);

    wins.set(id, { el, task });
    wire(id, el);
    if (app.init) app.init(el);
    focus(id);
    setHash(id);
  }

  function wire(id, el) {
    el.addEventListener("pointerdown", () => focus(id));
    $(".minimize", el).addEventListener("click", (e) => { e.stopPropagation(); minimize(id); });
    $(".maximize", el).addEventListener("click", (e) => { e.stopPropagation(); toggleMax(id); });
    $(".close", el).addEventListener("click", (e) => { e.stopPropagation(); close(id); });
    el.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-open]");
      if (opener) open(opener.dataset.open);
      if (e.target.closest("[data-close]")) close(id);
    });

    const bar = $(".titlebar", el);
    bar.addEventListener("dblclick", (e) => { if (!e.target.closest(".wbtn")) toggleMax(id); });

    // dragging
    let drag = null;
    bar.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || e.target.closest(".wbtn") || isPhone() || el.classList.contains("max")) return;
      drag = { dx: e.clientX - el.offsetLeft, dy: e.clientY - el.offsetTop };
      bar.setPointerCapture(e.pointerId);
      bar.style.cursor = "grabbing";
    });
    bar.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const area = desktop.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - drag.dx, 60 - el.offsetWidth), area.width - 60);
      const y = Math.min(Math.max(e.clientY - drag.dy, 0), area.height - 30);
      el.style.left = x + "px";
      el.style.top = y + "px";
    });
    const end = () => { drag = null; bar.style.cursor = ""; };
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
  }

  function focus(id) {
    const w = wins.get(id);
    if (!w) return;
    for (const [, o] of wins) {
      o.el.classList.remove("active");
      o.task.setAttribute("aria-pressed", "false");
    }
    w.el.style.zIndex = ++z;
    w.el.classList.add("active");
    w.task.setAttribute("aria-pressed", "true");
  }
  function topVisible() {
    let best = null, bestZ = -1;
    for (const [id, o] of wins) {
      const zi = +o.el.style.zIndex || 0;
      if (!o.el.hidden && zi > bestZ) { best = id; bestZ = zi; }
    }
    return best;
  }
  function minimize(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.hidden = true;
    w.el.classList.remove("active");
    w.task.setAttribute("aria-pressed", "false");
    const next = topVisible();
    if (next) focus(next);
    setHash(next);
  }
  function restore(id) {
    const w = wins.get(id);
    w.el.hidden = false;
    focus(id);
    setHash(id);
  }
  function toggleMax(id) {
    const w = wins.get(id);
    if (w) w.el.classList.toggle("max");
  }
  function close(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.remove();
    w.task.remove();
    wins.delete(id);
    const next = topVisible();
    if (next) focus(next);
    setHash(next);
  }

  // keep windows on screen when the browser is resized
  function clampAll() {
    const area = desktop.getBoundingClientRect();
    for (const [, { el }] of wins) {
      if (el.offsetWidth > area.width - 16) el.style.width = area.width - 16 + "px";
      const x = Math.max(8, Math.min(el.offsetLeft, area.width - el.offsetWidth - 8));
      const y = Math.max(0, Math.min(el.offsetTop, area.height - 40));
      el.style.left = x + "px";
      el.style.top = y + "px";
    }
  }
  let rz;
  window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(clampAll, 80); });

  function setHash(id) {
    const h = id && id !== "welcome" ? "#" + id : location.pathname + location.search;
    history.replaceState(null, "", h);
  }

  /* ---------- start menu ---------- */
  const startItems = [
    ["welcome", "Welcome"], ...DESKTOP_ORDER.map((id) => [id, LABEL[id]]),
    ["sep"], ["wallpaper", "Change wallpaper"], ["shutdown", "Shut down…"],
  ];
  $("#startList").innerHTML = startItems.map(([id, label]) =>
    id === "sep" ? `<li class="sep" role="separator"></li>`
      : `<li role="none"><button class="mi" role="menuitem" data-item="${id}">${ICONS[id]}${label}</button></li>`
  ).join("");

  function openStart() {
    startMenu.hidden = false;
    startBtn.setAttribute("aria-expanded", "true");
    $(".mi", startMenu).focus({ preventScroll: true });
  }
  function closeStart() {
    startMenu.hidden = true;
    startBtn.setAttribute("aria-expanded", "false");
  }
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    startMenu.hidden ? openStart() : closeStart();
  });
  startMenu.addEventListener("click", (e) => {
    const item = e.target.closest("[data-item]");
    if (!item) return;
    const id = item.dataset.item;
    closeStart();
    if (id === "wallpaper") nextWallpaper();
    else if (id === "shutdown") shutdown();
    else open(id);
  });
  startMenu.addEventListener("keydown", (e) => {
    const items = [...startMenu.querySelectorAll(".mi")];
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  });

  document.addEventListener("pointerdown", (e) => {
    if (!startMenu.hidden && !e.target.closest("#startMenu, #startBtn")) closeStart();
    if (e.target === desktop || e.target === iconList || e.target === winLayer) selectIcon(null);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (e.target.closest && e.target.closest("textarea, input, select")) return; // let editors keep Esc
    if (!startMenu.hidden) { closeStart(); startBtn.focus(); return; }
    const top = topVisible();
    if (top) close(top);
  });

  /* ---------- wallpaper ---------- */
  function setWallpaper(name) {
    document.body.style.backgroundImage = `url("photos/${name}.jpg")`;
    store.set("wallpaper", name);
  }
  function nextWallpaper() {
    const cur = store.get("wallpaper") || WALLPAPERS[0];
    setWallpaper(WALLPAPERS[(WALLPAPERS.indexOf(cur) + 1) % WALLPAPERS.length]);
  }
  const savedWp = store.get("wallpaper");
  if (savedWp && WALLPAPERS.includes(savedWp)) setWallpaper(savedWp);

  /* ---------- shutdown ---------- */
  const shut = $("#shutdown");
  function shutdown() {
    shut.hidden = false;
    $("#rebootBtn").focus();
  }
  $("#rebootBtn").addEventListener("click", () => {
    shut.hidden = true;
    for (const id of [...wins.keys()]) close(id);
    open("welcome");
  });

  /* ---------- tray ---------- */
  document.querySelectorAll(".tray-icon").forEach((a) => (a.innerHTML = ICONS[a.dataset.icon]));
  const clock = $("#clock");
  const tick = () => {
    const d = new Date();
    clock.textContent = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    clock.dateTime = d.toISOString();
    clock.title = d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };
  tick();
  setInterval(tick, 15000);

  /* ---------- boot ---------- */
  const fromHash = location.hash.slice(1);
  open("welcome");
  if (APPS[fromHash] && fromHash !== "welcome") open(fromHash);
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (APPS[id]) open(id);
  });
})();
