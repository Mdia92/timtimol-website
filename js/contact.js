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
  contact_title: el("contact-title"),
  labels: {
    name: el("label-name"),
    email: el("label-email"),
    subject: el("label-subject"),
    message: el("label-message"),
    submit: el("submit-button"),
  },
  form: el("contact-form"),
  formMessage: el("form-message"),
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

  elements.contact_title.innerText = data.contact.title;
  elements.labels.name.innerText = data.contact.name;
  elements.labels.email.innerText = data.contact.email;
  elements.labels.subject.innerText = data.contact.subject;
  elements.labels.message.innerText = data.contact.message;
  elements.labels.submit.innerText = data.contact.submit;

  elements.footer.innerText = data.footer;
  elements.formMessage.innerText = "";
}

el("language-switcher").addEventListener("change", (e) => {
  loadLanguage(e.target.value);
});

const savedLang = localStorage.getItem("lang") || "fr";
loadLanguage(savedLang);

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = el("name").value.trim();
  const email = el("email").value.trim();
  const subject = el("subject").value.trim();
  const message = el("message").value.trim();

  if (!name || !email || !subject || !message) {
    elements.formMessage.innerText = currentLang === "fr" ? "Veuillez remplir tous les champs." : "Please fill in all fields.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    elements.formMessage.innerText = currentLang === "fr" ? "Email invalide." : "Invalid email.";
    return;
  }

  // Simulation d'envoi réussi
  elements.formMessage.innerText = currentLang === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!";
  elements.form.reset();
});
