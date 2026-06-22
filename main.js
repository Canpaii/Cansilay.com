// Can Silay — portfolio site behaviour

document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("nav-open");
      const open = header.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // hero terminal typing effect
  const body = document.querySelector("[data-terminal]");
  if (!body) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const script = [
    { type: "prompt", text: "can@portfolio:~$ git log --oneline -5" },
    { type: "plain", text: "a1d4f0e build drum-heaven beatmap parser" },
    { type: "plain", text: "9c3b21a add drawing-based ability system" },
    { type: "plain", text: "5e02a88 set up flask level-share server" },
    { type: "prompt", text: "can@portfolio:~$ unity --status" },
    { type: "ok", text: "3 projects shipped · 1 in progress" },
  ];

  if (reduceMotion) {
    body.innerHTML = script
      .map((l) => `<div class="line ${l.type === "prompt" ? "prompt" : l.type === "ok" ? "ok" : ""}">${l.text}</div>`)
      .join("");
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  body.innerHTML = "";

  function typeNext() {
    if (lineIndex >= script.length) {
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      body.appendChild(cursor);
      return;
    }
    const current = script[lineIndex];
    if (charIndex === 0) {
      const div = document.createElement("div");
      div.className = "line " + (current.type === "prompt" ? "prompt" : current.type === "ok" ? "ok" : "");
      div.dataset.full = current.text;
      body.appendChild(div);
    }
    const div = body.lastElementChild;
    charIndex++;
    div.textContent = current.text.slice(0, charIndex);
    if (charIndex < current.text.length) {
      setTimeout(typeNext, current.type === "plain" ? 10 : 24);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 260);
    }
  }

  typeNext();
});
