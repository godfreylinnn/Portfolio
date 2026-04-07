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

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!header.classList.contains("nav-open")) return;
  const isClickInside = header.contains(event.target) || navOverlay.contains(event.target);
  if (!isClickInside) {
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
