// Theme toggle logic
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', 
    document.body.classList.contains('dark-theme') ? 'dark' : 'light'
  );
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}
// js/main.js
console.log("ScholarConnect loaded successfully!");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
});

menuOverlay?.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
});
