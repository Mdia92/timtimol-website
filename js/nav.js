/* nav.js — shared header behavior: mobile toggle, active link, lang persistence */

// --- Mobile menu toggle ---
(function setupMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("site-nav");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open", !expanded);
  });
})();

// --- Active nav link based on current page ---
(function highlightActiveLink() {
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
    "contact.html": "nav-contact"
  };
  const activeId = map[page];
  if (!activeId) return;
  const link = document.getElementById(activeId);
  if (link) {
    link.classList.add("active");
    // optional: set aria-current for accessibility
    link.setAttribute("aria-current", "page");
  }
})();

// --- Language persistence across pages ---
(function persistLanguage() {
  const select = document.getElementById("language-switcher");
  if (!select) return;

  // On load: set select to saved language (defaults to 'fr')
  const saved = localStorage.getItem("lang") || "fr";
  select.value = saved;

  // When user changes language: save
  select.addEventListener("change", (e) => {
    localStorage.setItem("lang", e.target.value);
  });
})();
