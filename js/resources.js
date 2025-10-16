// Helper
const el = (id) => document.getElementById(id);

// Références DOM
const elements = {
  title: el("title"),
  nav: {
    home: el("nav-home"),
    about: el("nav-about"),
    activities: el("nav-activities"),
    projects: el("nav-projects"),
    contact: el("nav-contact"),
  },
  resourcesTitle: el("resources-title"),
  labelFilterCategory: el("label-filter-category"),
  filterCategory: el("filter-category"),
  resourcesList: el("resources-list"),
  footer: el("footer-text"),
};

let currentLang = "fr";
let resourcesData = [];

// Chargement des traductions
async function loadLanguage(lang) {
  currentLang = lang;
  const res = await fetch(`lang/${lang}.json`);
  const data = await res.json();

  // En-tête + nav
  elements.title.innerText = data.title;
  elements.nav.home.innerText = data.nav.home;
  elements.nav.about.innerText = data.nav.about;
  elements.nav.activities.innerText = data.nav.activities;
  elements.nav.projects.innerText = data.nav.projects;
  elements.nav.contact.innerText = data.nav.contact;

  document.getElementById("nav-impact").innerText = data.nav.impact;
document.getElementById("nav-partners").innerText = data.nav.partners;
document.getElementById("nav-resources").innerText = data.nav.resources;

  // Ressources
  elements.resourcesTitle.innerText = data.resources.title;
  elements.labelFilterCategory.innerText = data.resources.filter_category;

  // Footer
  elements.footer.innerText = data.footer;

  // Re-rendu selon la langue
  populateCategories();
  renderResources();
}

// Chargement des ressources JSON
async function loadResources() {
  const res = await fetch("data/resources.json");
  resourcesData = await res.json();
  populateCategories();
  renderResources();
}

// Remplit la liste de catégories (unique) dans le select
function populateCategories() {
  const select = elements.filterCategory;
  const isFr = currentLang === "fr";
  const allText = isFr ? "Toutes" : "All";

  // reset
  select.innerHTML = `<option value="all">${allText}</option>`;

  const categories = Array.from(new Set(resourcesData.map(r => r.category)));
  categories.sort().forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.innerText = cat;
    select.appendChild(opt);
  });
}

// Génère une carte ressource
function createResourceCard(resource) {
  // resource = { id, title: {fr,en}, description:{fr,en}, file, size, category }
  const card = document.createElement("article");
  card.className = "resource-card";

  const icon = document.createElement("div");
  icon.className = "resource-icon";
  icon.innerText = "📄"; // simple icône texte (améliorable plus tard)

  const info = document.createElement("div");
  info.className = "resource-info";

  const h3 = document.createElement("h3");
  h3.innerText = resource.title[currentLang];

  const p = document.createElement("p");
  p.innerText = resource.description[currentLang];

  const meta = document.createElement("div");
  meta.className = "resource-meta";
  meta.innerText = `${resource.category} • ${resource.size}`;

  const actions = document.createElement("div");
  actions.className = "resource-actions";

  // Bouton "Voir" (ouvre dans un nouvel onglet)
  const viewBtn = document.createElement("a");
  viewBtn.href = resource.file;
  viewBtn.target = "_blank";
  viewBtn.rel = "noopener";
  viewBtn.className = "btn btn-secondary";
  viewBtn.innerText = currentLang === "fr" ? "Voir" : "View";

  // Bouton "Télécharger"
  const dlBtn = document.createElement("a");
  dlBtn.href = resource.file;
  dlBtn.setAttribute("download", "");
  dlBtn.className = "btn btn-primary";
  dlBtn.innerText = currentLang === "fr" ? "Télécharger" : "Download";

  actions.appendChild(viewBtn);
  actions.appendChild(dlBtn);

  info.appendChild(h3);
  info.appendChild(p);
  info.appendChild(meta);
  info.appendChild(actions);

  card.appendChild(icon);
  card.appendChild(info);
  return card;
}

// Rendu de la liste filtrée
function renderResources() {
  const list = elements.resourcesList;
  list.innerHTML = "";
  const catFilter = elements.filterCategory.value;

  resourcesData
    .filter(r => catFilter === "all" || r.category === catFilter)
    .forEach(r => list.appendChild(createResourceCard(r)));

  // Si aucune ressource
  if (!list.children.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.innerText = currentLang === "fr" ? "Aucune ressource trouvée." : "No resources found.";
    list.appendChild(empty);
  }
}

// Listeners
document.getElementById("language-switcher").addEventListener("change", (e) => {
  localStorage.setItem("lang", e.target.value);
  loadLanguage(e.target.value);
});

elements.filterCategory.addEventListener("change", renderResources);

// Init
loadResources().then(() => {
  const savedLang = localStorage.getItem("lang") || "fr";
  loadLanguage(savedLang);
});
