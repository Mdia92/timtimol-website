/* nav.js — mobile toggle, active link, and language persistence (non-intrusive) */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("site-nav");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open", !expanded);
    });
  }

  // Active link
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  const map = {
    "index.html": "nav-home",
    "about.html": "nav-about",
    "activities.html": "nav-activities",
    "projects.html": "nav-projects",
    "impact.html": "nav-impact",
    "partners.html": "nav-partners",
    "resources.html": "nav-resources",
    "contact.html": "nav-contact",
  };
  const activeId = map[page];
  const link = activeId ? document.getElementById(activeId) : null;
  if (link) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }

  // Language persistence (do NOT trigger load here; pages handle their own init)
  const select = document.getElementById("language-switcher");
  const saved = localStorage.getItem("lang") || "fr";
  if (select) {
    select.value = saved;
    select.addEventListener("change", (e) => {
      localStorage.setItem("lang", e.target.value);
      // do not load here — page scripts call loadLanguage themselves
    });
  }
});
