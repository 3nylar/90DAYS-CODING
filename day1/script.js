const toggles = document.querySelectorAll('.toggle-switch');

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const active = toggle.classList.toggle('active');
        toggle.setAttribute('aria-pressed', active);
    });
});
