const elements = {
  title: document.getElementById("title"),
  nav: {
    home: document.getElementById("nav-home"),
    about: document.getElementById("nav-about"),
    activities: document.getElementById("nav-activities"),
    projects: document.getElementById("nav-projects"),
    contact: document.getElementById("nav-contact"),
  },
  about_title: document.getElementById("about-title"),
  about_text: document.getElementById("about-text"),
  about_values_title: document.getElementById("about-values-title"),
  about_values_list: document.getElementById("about-values-list"),
  about_team_title: document.getElementById("about-team-title"),
  about_team_text: document.getElementById("about-team-text"),
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

  elements.about_title.innerText = data.about.title;
  elements.about_text.innerText = data.about.text;

  elements.about_values_title.innerText = data.about.values_title;
  elements.about_team_title.innerText = data.about.team_title;
  elements.about_team_text.innerText = data.about.team_text;

  elements.about_values_list.innerHTML = "";
  data.about.values_list.forEach(val => {
    const li = document.createElement("li");
    li.innerText = val;
    elements.about_values_list.appendChild(li);
  });

  elements.footer.innerText = data.footer;
}

const savedLang = localStorage.getItem("lang") || "fr";
loadLanguage(savedLang);

document.getElementById("language-switcher").addEventListener("change", (e) => {
  localStorage.setItem("lang", e.target.value);
  loadLanguage(e.target.value);
});

