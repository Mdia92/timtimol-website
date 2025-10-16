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
  partnersTitle: el("partners-title"),
  partnersList: el("partners-list"),
  footer: el("footer-text"),
};

let currentLang = "fr";
let partnersData = [];

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

  elements.partnersTitle.innerText = data.partners.title;
  elements.footer.innerText = data.footer;

  renderPartners();
}

async function loadPartners() {
  const res = await fetch("data/partners.json");
  partnersData = await res.json();
}

function renderPartners() {
  elements.partnersList.innerHTML = "";
  partnersData.forEach(p => {
    const div = document.createElement("div");
    div.className = "partner-item";

    const logo = document.createElement("img");
    logo.src = p.logo;
    logo.alt = p.name;
    logo.className = "partner-logo";

    const name = document.createElement("h3");
    name.innerText = p.name;

    const desc = document.createElement("p");
    desc.innerText = p.description[currentLang];

    div.appendChild(logo);
    div.appendChild(name);
    div.appendChild(desc);
    elements.partnersList.appendChild(div);
  });
}

// Init
el("language-switcher").addEventListener("change", e => {
  loadLanguage(e.target.value);
});

loadPartners().then(() => {
  const savedLang = localStorage.getItem("lang") || "fr";
  loadLanguage(savedLang);
});
