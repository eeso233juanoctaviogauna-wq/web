// ======================
// CAMBIO DE PÁGINAS
// ======================

function showPage(name) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');

    window.scrollTo(0, 0);
}


// ======================
// GALERÍA CON FILTROS
// ======================

const botonesFiltro = document.querySelectorAll(".filtro-btn");
const itemsGaleria = document.querySelectorAll(".galeria-item");

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach(btn => btn.classList.remove("active"));
        boton.classList.add("active");

        const filtro = boton.dataset.filter;

        itemsGaleria.forEach(item => {
            if (filtro === "all" || item.classList.contains(filtro)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});


// ======================
// LIGHTBOX
// ======================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

function getVisibleImages() {
    return [...document.querySelectorAll(".gallery-img")].filter(img => {
        return img.closest(".galeria-item").style.display !== "none";
    });
}

document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", () => {
        const visibles = getVisibleImages();
        currentIndex = visibles.indexOf(img);
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
    });
});

nextBtn.addEventListener("click", () => {
    const visibles = getVisibleImages();
    currentIndex++;
    if (currentIndex >= visibles.length) {
        currentIndex = 0;
    }
    lightboxImg.src = visibles[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
    const visibles = getVisibleImages();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = visibles.length - 1;
    }
    lightboxImg.src = visibles[currentIndex].src;
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
        nextBtn.click();
    }
    if (e.key === "ArrowLeft") {
        prevBtn.click();
    }
    if (e.key === "Escape") {
        lightbox.classList.remove("active");
    }
});


// ======================
// HERO SLIDER
// ======================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextHero = document.querySelector(".hero-next");
const prevHero = document.querySelector(".hero-prev");

let heroIndex = 0;

function mostrarSlide(indice) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[indice].classList.add("active");
    dots[indice].classList.add("active");
}

if (nextHero && prevHero) {
    nextHero.onclick = () => {
        heroIndex++;
        if (heroIndex >= slides.length) heroIndex = 0;
        mostrarSlide(heroIndex);
    };

    prevHero.onclick = () => {
        heroIndex--;
        if (heroIndex < 0) heroIndex = slides.length - 1;
        mostrarSlide(heroIndex);
    };

    dots.forEach((dot, index) => {
        dot.onclick = () => {
            heroIndex = index;
            mostrarSlide(heroIndex);
        };
    });

    setInterval(() => {
        heroIndex++;
        if (heroIndex >= slides.length) heroIndex = 0;
        mostrarSlide(heroIndex);
    }, 5000);
}


// ======================
// BOTÓN IR ARRIBA
// ======================

const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ======================
// CONTADORES ANIMADOS
// ======================

const counters = document.querySelectorAll(".contador h2");

const contadorObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;

            const update = () => {
                const increment = target / 100;
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };

            update();
            contadorObserver.unobserve(counter);
        }
    });
});

counters.forEach(counter => contadorObserver.observe(counter));


// ===========================================
// MANEJO DE NOTIFICACIÓN DE MATERIAS PREVIAS
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    const formPrevias = document.getElementById("form-previas");

    if (formPrevias) {
        formPrevias.addEventListener("submit", function (e) {
            // Guardamos los datos temporalmente antes del envío ajax
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const materia = document.getElementById("materia").value.trim();

            // Interceptamos la respuesta de envío exitoso
            setTimeout(() => {
                const mensajeExito = document.querySelector("[data-fs-success]");
                if (mensajeExito && mensajeExito.style.display !== "none") {
                    lanzarNotificacionInscripcion(nombre, apellido, materia);
                }
            }, 1000);
        });
    }
});

function lanzarNotificacionInscripcion(nombre, apellido, materia) {
    const contenedor = document.getElementById("notificacion-inscripcion");
    const texto = document.getElementById("notificacion-texto");

    if (contenedor && texto) {
        texto.innerHTML = `El estudiante <strong>${nombre} ${apellido}</strong> se ha inscripto correctamente a la mesa de examen de <strong>${materia}</strong>.`;
        contenedor.style.display = "flex";
        contenedor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function cerrarNotificacion() {
    const contenedor = document.getElementById("notificacion-inscripcion");
    if (contenedor) {
        contenedor.style.display = "none";
    }
}

const formulario = document.getElementById('tu-formulario'); // Cambiá por el ID de tu <form>
const modal = document.getElementById('modal-exito');
const btnCerrar = document.getElementById('btn-cerrar');
let temporizador;

function cerrarModal() {
  modal.style.display = 'none';
  clearTimeout(temporizador); // Limpia el temporizador si el usuario lo cierra manualmente
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que se recargue la página inmediatamente

  // Mostrar el modal
  modal.style.display = 'flex';

  // Limpiar el formulario
  formulario.reset();

  // Programar el cierre automático a los 4 segundos (4000 ms)
  temporizador = setTimeout(() => {
    cerrarModal();
  }, 4000);
});

// Cerrar al hacer clic en la "X"
btnCerrar.addEventListener('click', cerrarModal);

// Cerrar al hacer clic fuera de la caja del modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    cerrarModal();
  }
});