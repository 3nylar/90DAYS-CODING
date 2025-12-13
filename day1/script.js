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

const statusTabs = document.querySelectorAll('.status');
const extensions = document.querySelectorAll('.extensions');

statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        statusTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabName = tab.querySelector('a').getAttribute('href');

        if (tabName === '#all') {
            extensions.forEach(ext => ext.style.display = 'flex');
        } else if (tabName === '#active') {
            extensions.forEach(ext => {
                const toggle = ext.querySelector('.toggle-switch');
                ext.style.display = toggle.classList.contains('active') ? 'flex' : 'none';
            });
        } else if (tabName === '#inactive') {
            extensions.forEach(ext => {
                const toggle = ext.querySelector('.toggle-switch');
                ext.style.display = toggle.classList.contains('active') ? 'none' : 'flex';
            });
        }
    });
});

/* ===============================
   TOGGLE SWITCH INTERACTION
================================ */

document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        // Optional: Refresh visible extensions if a tab is active
        const activeTab = document.querySelector('.status.active a').getAttribute('href');
        if (activeTab === '#active') {
            extensions.forEach(ext => {
                const t = ext.querySelector('.toggle-switch');
                ext.style.display = t.classList.contains('active') ? 'flex' : 'none';
            });
        } else if (activeTab === '#inactive') {
            extensions.forEach(ext => {
                const t = ext.querySelector('.toggle-switch');
                ext.style.display = t.classList.contains('active') ? 'none' : 'flex';
            });
        }
    });
});
