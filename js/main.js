const elements = {
  title: document.getElementById("title"),
  nav: {
    home: document.getElementById("nav-home"),
    about: document.getElementById("nav-about"),
    activities: document.getElementById("nav-activities"),
    projects: document.getElementById("nav-projects"),
    contact: document.getElementById("nav-contact"),
  },
  mission_title: document.getElementById("mission-title"),
  mission_text: document.getElementById("mission-text"),
  stats_title: document.getElementById("stats-title"),
  stat_1: document.getElementById("stat-1"),
  stat_2: document.getElementById("stat-2"),
  stat_3: document.getElementById("stat-3"),
  footer: document.getElementById("footer-text"),
};

async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const data = await response.json();

  elements.title.innerText = data.title;
  elements.nav.home.innerText = data.nav.home;
  elements.nav.about.innerText = data.nav.about;
  elements.nav.activities.innerText = data.nav.activities;
  elements.nav.projects.innerText = data.nav.projects;
  elements.nav.contact.innerText = data.nav.contact;

document.getElementById("nav-impact").innerText = data.nav.impact;
  document.getElementById("nav-partners").innerText = data.nav.partners;
  document.getElementById("nav-resources").innerText = data.nav.resources;

  elements.mission_title.innerText = data.mission_title;
  elements.mission_text.innerText = data.mission_text;
  elements.stats_title.innerText = data.stats_title;
  elements.stat_1.innerText = data.stat_1;
  elements.stat_2.innerText = data.stat_2;
  elements.stat_3.innerText = data.stat_3;
  elements.footer.innerText = data.footer;
}

// Default to French
const savedLang = localStorage.getItem("lang") || "fr";
loadLanguage(savedLang);

document.getElementById("language-switcher").addEventListener("change", (e) => {
  localStorage.setItem("lang", e.target.value);
  loadLanguage(e.target.value);
});
