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
  impactTitle: el("impact-title"),
  impactStats: el("impact-stats"),
  testimonialsTitle: el("testimonials-title"),
  testimonialsList: el("testimonials-list"),
  footer: el("footer-text"),
};

let currentLang = "fr";
let testimonialData = [];

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

  elements.impactTitle.innerText = data.impact.title;
  elements.testimonialsTitle.innerText = data.impact.testimonials;

  elements.impactStats.innerHTML = "";
  data.impact.stats.forEach(stat => {
    const li = document.createElement("li");
    li.innerText = stat;
    elements.impactStats.appendChild(li);
  });

  elements.footer.innerText = data.footer;

  renderTestimonials();
}

async function loadTestimonials() {
  const res = await fetch("data/testimonials.json");
  testimonialData = await res.json();
  renderTestimonials();
}

function renderTestimonials() {
  elements.testimonialsList.innerHTML = "";
  testimonialData.forEach(t => {
    const div = document.createElement("div");
    div.className = "testimonial";
    const quote = document.createElement("blockquote");
    quote.innerText = `"${t.message[currentLang]}"`;
    const author = document.createElement("p");
    author.innerText = `– ${t.author}`;
    div.appendChild(quote);
    div.appendChild(author);
    elements.testimonialsList.appendChild(div);
  });
}

el("language-switcher").addEventListener("change", e => {
  loadLanguage(e.target.value);
});

loadTestimonials().then(() => loadLanguage("fr"));
