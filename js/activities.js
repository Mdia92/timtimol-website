const el = (id) => document.getElementById(id);

const elements = {
  title: el("title"),
  nav: {
    home: el("nav-home"),
    about: el("nav-about"),
    activities: el("nav-activities"),
    projects: el("nav-projects"),
    contact: el("nav-contact"),
  },
  activities_title: el("activities-title"),
  community_title: el("community-title"),
  community_text: el("community-text"),
  private_title: el("private-title"),
  private_text: el("private-text"),
  footer: el("footer-text"),
};

let currentLang = "fr";

async function loadLanguage(lang) {
  currentLang = lang;
  const res = await fetch(`lang/${lang}.json`);
  const data = await res.json();

  elements.title.innerText = data.title;
  elements.nav.home.innerText = data.nav.home;
  elements.nav.about.innerText = data.nav.about;
  elements.nav.activities.innerText = data.nav.activities;
  elements.nav.projects.innerText = data.nav.projects;
  elements.nav.contact.innerText = data.nav.contact;

  document.getElementById("nav-impact").innerText = data.nav.impact;
document.getElementById("nav-partners").innerText = data.nav.partners;
document.getElementById("nav-resources").innerText = data.nav.resources;

  elements.activities_title.innerText = data.activities.title;
  elements.community_title.innerText = data.activities.community.title;
  elements.community_text.innerText = data.activities.community.text;
  elements.private_title.innerText = data.activities.private.title;
  elements.private_text.innerText = data.activities.private.text;

  elements.footer.innerText = data.footer;
}

el("language-switcher").addEventListener("change", (e) => {
  loadLanguage(e.target.value);
});

const savedLang = localStorage.getItem("lang") || "fr";
loadLanguage(savedLang);

