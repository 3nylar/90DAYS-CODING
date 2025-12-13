const themeToggle = document.querySelector('.themeToggle');
const themeIcon = document.querySelector('.themeIcon');

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('darkMode');
    
    if (isDark) {
        document.body.classList.remove('darkMode');
        document.body.classList.add('lightMode');
        themeIcon.src = "assets/images/icon-sun.svg";
        themeIcon.alt = "light mode icon";
    } else {
        document.body.classList.remove('lightMode');
        document.body.classList.add('darkMode');
        themeIcon.src = "assets/images/icon-moon.svg";
        themeIcon.alt = "dark mode icon";
    }
    
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.remove('lightMode');
        document.body.classList.add('darkMode');
        themeIcon.src = "assets/images/icon-moon.svg";
        themeIcon.alt = "dark mode icon";
    }
});

const statusTabs = document.querySelectorAll('.status');
const extensions = document.querySelectorAll('.extensions');

function filterExtensions(filterType) {
    extensions.forEach(ext => {
        const toggle = ext.querySelector('.toggle-switch');
        const isActive = toggle.classList.contains('active');
        
        switch(filterType) {
            case '#all':
                ext.style.display = 'flex';
                break;
            case '#active':
                ext.style.display = isActive ? 'flex' : 'none';
                break;
            case '#inactive':
                ext.style.display = isActive ? 'none' : 'flex';
                break;
            default:
                ext.style.display = 'flex';
        }
    });
}

statusTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active tab styling
        statusTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Get filter type and apply
        const filterType = tab.querySelector('a').getAttribute('href');
        filterExtensions(filterType);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const allTab = document.querySelector('.status a[href="#all"]').parentElement;
    allTab.classList.add('active');
});

document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const wasActive = toggle.classList.contains('active');
        toggle.classList.toggle('active');
        
        // Update aria attribute for accessibility
        toggle.setAttribute('aria-pressed', !wasActive);
        toggle.setAttribute('role', 'switch');
        
        // Update filter if currently viewing filtered tab
        const activeTab = document.querySelector('.status.active a');
        if (activeTab) {
            const filterType = activeTab.getAttribute('href');
            if (filterType !== '#all') {
                filterExtensions(filterType);
            }
        }
    });
    
    // Initialize aria attributes
    toggle.setAttribute('aria-pressed', toggle.classList.contains('active'));
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('tabindex', '0');
    
    // Keyboard accessibility
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
        }
    });
});

document.querySelectorAll('.button-container button').forEach(button => {
    button.addEventListener('click', (e) => {
        const extensionCard = e.target.closest('.extensions');
        const extensionName = extensionCard.querySelector('.extensionName').textContent;
        
        // Confirmation dialog
        if (confirm(`Are you sure you want to remove "${extensionName}"?`)) {
            // Add fade-out animation
            extensionCard.style.transition = 'opacity 0.3s, transform 0.3s';
            extensionCard.style.opacity = '0';
            extensionCard.style.transform = 'scale(0.95)';
            
            // Remove after animation
            setTimeout(() => {
                extensionCard.remove();
                
                // Show message if no extensions left in current view
                checkEmptyState();
            }, 300);
        }
    });
});

function checkEmptyState() {
    const activeTab = document.querySelector('.status.active a');
    if (!activeTab) return;
    
    const filterType = activeTab.getAttribute('href');
    const visibleExtensions = Array.from(extensions).filter(ext => 
        ext.style.display !== 'none' && ext.parentElement
    );
    
    if (visibleExtensions.length === 0) {
        const section = document.querySelector('#all');
        if (!document.querySelector('.empty-state')) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--neutral-600);">
                    No extensions found in this category.
                </p>
            `;
            section.appendChild(emptyState);
        }
    } else {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) emptyState.remove();
    }
}

// ============= SEARCH FUNCTIONALITY (BONUS) =============
// If you want to add a search feature later, here's a starter:
function searchExtensions(query) {
    const searchTerm = query.toLowerCase();
    extensions.forEach(ext => {
        const name = ext.querySelector('.extensionName').textContent.toLowerCase();
        const description = ext.querySelector('.extensionDescription').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            ext.style.display = 'flex';
        } else {
            ext.style.display = 'none';
        }
    });
}

console.log('Extension Manager loaded successfully');
console.log(`Total extensions: ${extensions.length}`);