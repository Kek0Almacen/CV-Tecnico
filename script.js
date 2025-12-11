// ===============================================
// 1. Desplazamiento  entre secciones
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));


        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20, 
                behavior: 'smooth'
            });
        }
    });
});


// ===============================================
// 2. Cargar elementos cuando están visibles
// ===============================================

const habilidadesSection = document.getElementById('habilidades');
const skills = document.querySelectorAll('.skills-grid h4, .skills-grid li');

// Ocultamos inicialmente los elementos CSS 
skills.forEach(skill => skill.style.opacity = '0');


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
       
        if (entry.isIntersecting) {
            // Aplicamos un retraso a cada elemento de habilidad para un efecto de "fade-in"
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transition = 'opacity 0.6s ease-out';
                    skill.style.opacity = '1';
                }, index * 100); // Retraso de 100ms entre cada elemento
            });
            // Dejamos de observar la sección una vez que se ha activado
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Se activa cuando el 10% de la sección es visible

// Empezamos a observar la sección de habilidades
if (habilidadesSection) {
    observer.observe(habilidadesSection);
}