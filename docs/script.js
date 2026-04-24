const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navOverlay = document.querySelector(".nav-overlay");
const navLinks = document.querySelectorAll(".site-nav a");
const themeToggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark") {
  document.body.classList.add("theme-dark");
  themeToggle.checked = true;
} else if (storedTheme === "light") {
  document.body.classList.add("theme-light");
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    localStorage.setItem("theme", "light");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navOverlay.addEventListener("click", () => {
  header.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
});

// Close mobile nav and update active state when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // if the link is an in-page anchor, update active state
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }

    // close menu on mobile
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scrollspy: highlight nav link for section currently in view
const sections = Array.from(document.querySelectorAll('main section[id]'));
function updateActiveLinkOnScroll() {
  const offset = 160; // match header height / scroll padding
  const scrollPos = window.scrollY + offset;
  let currentId = null;
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  }

  if (currentId) {
    navLinks.forEach((l) => {
      const href = l.getAttribute('href') || '';
      if (href.startsWith('#')) {
        l.classList.toggle('active', href === `#${currentId}`);
      }
    });
  }
}

window.addEventListener('scroll', updateActiveLinkOnScroll, { passive: true });
// run once on load
updateActiveLinkOnScroll();

document.addEventListener("click", (event) => {
  if (!header.classList.contains("nav-open")) return;
  const isClickInside = header.contains(event.target) || navOverlay.contains(event.target);
  if (!isClickInside) {
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Contact form: open user's email client with prefilled subject and body
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.querySelector('input[name="name"]') || {}).value || '';
    const email = (form.querySelector('input[name="email"]') || {}).value || '';
    const subject = (form.querySelector('input[name="subject"]') || {}).value || '';
    const message = (form.querySelector('textarea[name="message"]') || {}).value || '';

    const to = 'gapudgodfreylinz@gmail.com';
    const mailSubject = subject.trim() ? subject.trim() : `Message from ${name || email || 'Website Visitor'}`;

    const bodyParts = [];
    if (name.trim()) bodyParts.push(`Name: ${name.trim()}`);
    if (email.trim()) bodyParts.push(`Email: ${email.trim()}`);
    if (message.trim()) {
      bodyParts.push('');
      bodyParts.push('Message:');
      bodyParts.push(message.trim());
    }

    const body = encodeURIComponent(bodyParts.join('\n'));
    const mailto = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${body}`;

    // Attempt to open the user's mail client. This will fall back to the browser's default
    // behaviour for mailto: links if the client is not configured.
    try {
      window.location.href = mailto;
    } catch (err) {
      // As a basic fallback, open in a new window/tab which some browsers allow for mailto
      window.open(mailto, '_blank');
    }
  });
}
