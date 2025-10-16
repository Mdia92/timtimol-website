const el = id => document.getElementById(id);

const elements = {
  title: el("title"),
  nav: {
    home: el("nav-home"),
    about: el("nav-about"),
    activities: el("nav-activities"),
    projects: el("nav-projects"),
    contact: el("nav-contact"),
  },
  projectsTitle: el("projects-title"),
  filterRegionLabel: el("label-filter-region"),
  filterThemeLabel: el("label-filter-theme"),
  filterRegion: el("filter-region"),
  filterTheme: el("filter-theme"),
  projectsList: el("projects-list"),
  footer: el("footer-text"),
};

let currentLang = "fr";
let projectsData = [];

async function loadLanguage(lang) {
  currentLang = lang;
  const resLang = await fetch(`lang/${lang}.json`);
  const dataLang = await resLang.json();

  elements.title.innerText = dataLang.title;
  elements.nav.home.innerText = dataLang.nav.home;
  elements.nav.about.innerText = dataLang.nav.about;
  elements.nav.activities.innerText = dataLang.nav.activities;
  elements.nav.projects.innerText = dataLang.nav.projects;
  elements.nav.contact.innerText = dataLang.nav.contact;

  document.getElementById("nav-impact").innerText = dataLang.nav.impact;
  document.getElementById("nav-partners").innerText = dataLang.nav.partners;
  document.getElementById("nav-resources").innerText = dataLang.nav.resources;

  elements.projectsTitle.innerText = dataLang.projects.title;
  elements.filterRegionLabel.innerText = dataLang.projects.filter_region;
  elements.filterThemeLabel.innerText = dataLang.projects.filter_theme;

  elements.footer.innerText = dataLang.footer;

  // après les traductions, affiche les projets
  renderProjects();
}

async function loadProjects() {
  const res = await fetch("data/projects.json");
  projectsData = await res.json();

  populateFilters();
}

function populateFilters() {
  // extraire toutes les régions et thèmes uniques
  const regions = new Set();
  const themes = new Set();
  projectsData.forEach(p => {
    regions.add(p.region);
    themes.add(p.theme);
  });

  // vider les selects sauf la première option "all"
  elements.filterRegion.innerHTML = `<option value="all">${ currentLang === "fr" ? "Tous" : "All" }</option>`;
  regions.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.innerText = r;
    elements.filterRegion.appendChild(opt);
  });

  elements.filterTheme.innerHTML = `<option value="all">${ currentLang === "fr" ? "Tous" : "All" }</option>`;
  themes.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.innerText = t;
    elements.filterTheme.appendChild(opt);
  });

  // ajout écouteurs
  elements.filterRegion.addEventListener("change", renderProjects);
  elements.filterTheme.addEventListener("change", renderProjects);
}

function renderProjects() {
  const regionFilter = elements.filterRegion.value;
  const themeFilter = elements.filterTheme.value;

  elements.projectsList.innerHTML = ""; // vide
  projectsData.forEach(p => {
    if ((regionFilter === "all" || p.region === regionFilter) &&
        (themeFilter === "all" || p.theme === themeFilter)) {
      // créer carte de projet
      const div = document.createElement("div");
      div.className = "project-item";
      const h3 = document.createElement("h3");
      h3.innerText = p.title[currentLang];
      const pdesc = document.createElement("p");
      pdesc.innerText = p.description[currentLang];
      div.appendChild(h3);
      div.appendChild(pdesc);
      elements.projectsList.appendChild(div);
    }
  });
}

// initialisation
loadProjects().then(() => {
  const savedLang = localStorage.getItem("lang") || "fr";
loadLanguage(savedLang);
});

el("language-switcher").addEventListener("change", e => {
  loadLanguage(e.target.value);
});
