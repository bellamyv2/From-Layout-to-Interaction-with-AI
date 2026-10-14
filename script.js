const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const year = document.querySelector("#year");

function getSavedTheme() {
  try {
    return window.localStorage.getItem("form-function-theme");
  } catch (error) {
    console.warn("Theme preference could not be loaded.", error);
    return null;
  }
}

function saveTheme(theme) {
  try {
    window.localStorage.setItem("form-function-theme", theme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
}

function setTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#1b1d1a" : "#f4f2ed");
}

const initialTheme = getSavedTheme();
setTheme(initialTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  saveTheme(nextTheme);
});

year.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}
