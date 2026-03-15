// --- CURSEUR ET EFFETS D'ORIGINE ---
const cursor = document.querySelector('.cursor');
const light = document.querySelector('.light-effect');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    if(light) {
        light.style.left = e.pageX + 'px';
        light.style.top = e.pageY + 'px';
    }
});

// Agrandir le curseur au survol des éléments cliquables
const clickables = document.querySelectorAll('a, button, .nav-item, .orb-light');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = '#fff';
    });
});

// --- NAVIGATION ET SCROLL D'ORIGINE ---
const nav = document.getElementById('main-nav');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
const ctaBtn = document.getElementById('cta-projects');

window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    
    // Switch Sticky sans décalage
    if (scrollPos > window.innerHeight - 150) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }

    // Scrollspy
    let current = "";
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop - 300) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const id = item.getAttribute('data-section');
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    });
});

if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    });
}

// --- LOGIQUE DU SLIDER PROJETS (Pleine Largeur) ---
const piste = document.querySelector('.piste-slider-wide');
const btnPrev = document.querySelector('.btn-prec');
const btnNext = document.querySelector('.btn-suiv');
const cartes = document.querySelectorAll('.carte-projet-wide');

if (piste && btnPrev && btnNext && cartes.length > 0) {
    let indexActuel = 0;
    
    const calculerCartesVisibles = () => {
        if (window.innerWidth > 1024) return 3; // 3 cartes sur grand écran
        if (window.innerWidth > 768) return 2;  // 2 cartes sur tablette
        return 1; // 1 carte sur mobile
    };

    const mettreAJourSlider = () => {
        // La largeur d'une carte + l'espace (gap de 30px)
        const largeurCarte = cartes[0].offsetWidth + 30; 
        piste.style.transform = `translateX(-${indexActuel * largeurCarte}px)`;
    };

    btnNext.addEventListener('click', () => {
        const maxIndex = cartes.length - calculerCartesVisibles();
        if (indexActuel < maxIndex) {
            indexActuel++;
        } else {
            indexActuel = 0; // Boucle au début
        }
        mettreAJourSlider();
    });

    btnPrev.addEventListener('click', () => {
        const maxIndex = cartes.length - calculerCartesVisibles();
        if (indexActuel > 0) {
            indexActuel--;
        } else {
            indexActuel = maxIndex; // Boucle à la fin
        }
        mettreAJourSlider();
    });

    // Ajuster le slider si l'utilisateur redimensionne la fenêtre
    window.addEventListener('resize', () => {
        indexActuel = 0; // Reset pour éviter les bugs d'affichage
        mettreAJourSlider();
    });
}