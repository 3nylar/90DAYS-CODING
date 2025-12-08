const simpleToggle = document.getElementById('simpleToggle');
const toggleLabel = document.getElementById('toggleLabel');
let isToggled = false;

simpleToggle.addEventListener('click', () => {
    isToggled = !isToggled;
    simpleToggle.classList.toggle('active');
    toggleLabel.textContent = isToggled ? 'ON' : 'OFF';
});