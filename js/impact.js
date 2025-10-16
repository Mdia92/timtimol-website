// js/impact.js — deterministic language init + uniform el(...)

document.addEventListener("DOMContentLoaded", () => {
  const el = (id) => document.getElementById(id);

  // --- Elements
  const elements = {
    title: el("title"),
    nav: {
      home: el("nav-home"),
      about: el("nav-about"),
      activities: el("nav-activities"),
      projects: el("nav-projects"),
      contact: el("nav-contact"),
      impact: el("nav-impact"),
      partners: el("nav-partners"),
      resources: el("nav-resources"),
    },
    impactTitle: el("impact-title"),
    impactStats: el("impact-stats"),
    testimonialsTitle: el("testimonials-title"),
    testimonialsList: el("testimonials-list"),
    footer: el("footer-text"),
    langSelect: el("language-switcher"),
  };

  // --- Language source of truth
  let currentLang = localStorage.getItem("lang") || "fr";
  if (elements.langSelect) elements.langSelect.value = currentLang;

  let testimonialData = [];

  // --- Load translations
  async function loadLanguage(lang) {
    currentLang = lang;
    const res = await fetch(`lang/${lang}.json`, { cache: "no-store" });
    const data = await res.json();

    // Title + full nav
    elements.title.innerText = data.title;
    elements.nav.home.innerText = data.nav.home;
    elements.nav.about.innerText = data.nav.about;
    elements.nav.activities.innerText = data.nav.activities;
    elements.nav.projects.innerText = data.nav.projects;
    elements.nav.contact.innerText = data.nav.contact;
    elements.nav.impact.innerText = data.nav.impact;
    elements.nav.partners.innerText = data.nav.partners;
    elements.nav.resources.innerText = data.nav.resources;

    // Impact stats
    elements.impactTitle.innerText = data.impact.title;
    elements.impactStats.innerHTML = "";
    data.impact.stats.forEach((stat) => {
      const li = document.createElement("li");
      li.innerText = stat;
      elements.impactStats.appendChild(li);
    });

    // Testimonials label
    elements.testimonialsTitle.innerText = data.impact.testimonials;

    // Footer
    elements.footer.innerText = data.footer;

    // Re-render testimonials in current language
    renderTestimonials();
  }

  // --- Testimonials
  async function loadTestimonials() {
    const res = await fetch("data/testimonials.json", { cache: "no-store" });
    testimonialData = await res.json();
    renderTestimonials();
  }

  function renderTestimonials() {
    if (!elements.testimonialsList) return;
    elements.testimonialsList.innerHTML = "";
    testimonialData.forEach((t) => {
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

  // --- Persist language on change
  if (elements.langSelect) {
    elements.langSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      localStorage.setItem("lang", val);
      loadLanguage(val);
    });
  }

  // --- Deterministic init: set select → load testimonials → load translations with saved lang
  (async () => {
    if (elements.langSelect) elements.langSelect.value = currentLang;
    await loadTestimonials();
    await loadLanguage(currentLang);
  })();
});
