const toggles = document.querySelectorAll('.toggle-switch');

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const active = toggle.classList.toggle('active');
        toggle.setAttribute('aria-pressed', active);
    });
});


const themeToggle = document.querySelector('.themeToggle');
const themeIcon = document.querySelector('.themeIcon');

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');

    themeIcon.src = isDark 
        ? "assets/images/icon-moon.svg" 
        : "assets/images/icon-sun.svg";
});
