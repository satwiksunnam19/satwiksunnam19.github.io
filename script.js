// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Update Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach((el) => observer.observe(el));