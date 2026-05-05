// === 1. Fondo de estrellas con PARALLAX ===
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let scrollY = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 4000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.7 + 0.2,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function drawStars() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const t = Date.now() / 1000;
  const offset = scrollY * 0.2;

  stars.forEach(s => {
    let y = s.y + offset * s.speed;
    if (y > canvas.height + s.r) y = -s.r;
    if (y < -s.r) y = canvas.height + s.r;

    const a = s.alpha * (0.6 + 0.4 * Math.sin(s.phase + t));
    ctx.beginPath();
    ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('scroll', () => { scrollY = window.pageYOffset; });
try {
  resize(); initStars(); drawStars();
  window.addEventListener('resize', () => { resize(); initStars(); });
} catch (e) {
  console.warn("Error inicializando estrellas de fondo:", e);
}

// === 2. Scroll reveal con múltiples animaciones ===
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
      obs.unobserve(e.target); 
    } 
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => obs.observe(el));

// === 3. Navegación activa y scroll suave ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const sections = document.querySelectorAll('[id]');
const navAs = document.querySelectorAll('.nav-links > li > a');
window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  sections.forEach(sec => {
    if (y >= sec.offsetTop - 120 && y < sec.offsetTop + sec.clientHeight - 120) {
      navAs.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + sec.id) a.style.color = 'var(--cyan)';
      });
    }
  });
});

// === 4. Navbar con efecto de scroll ===
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(1, 1, 13, 0.95)';
    nav.style.boxShadow = '0 2px 20px rgba(108, 10, 239, 0.3)';
  } else {
    nav.style.background = 'rgba(1, 1, 13, 0.88)';
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// === 5. Parallax suave para elementos ===
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.nebula-bg');
  parallaxElements.forEach(el => {
    const speed = 0.3;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// === 4. Modal de términos ===
function initVarious() {
  const modal = document.getElementById('modal-terminos');
  const btnAceptar = document.getElementById('btn-aceptar');
  let aceptado = null; try { aceptado = localStorage.getItem('terminosAceptados'); } catch(e) {}
  if (!aceptado) {
    modal.classList.add('mostrar');
    document.body.style.overflow = 'hidden';
  }
  btnAceptar.addEventListener('click', function() {
    try { localStorage.setItem('terminosAceptados', 'true'); } catch(e) {}
    modal.classList.remove('mostrar');
    document.body.style.overflow = '';
  });
}

// === 5. Menú hamburguesa ===
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => { navMenu.classList.toggle('mostrar'); });
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => { if (window.innerWidth <= 1100) navMenu.classList.remove('mostrar'); });
});

// === 6. Buscador de planetas ===
const buscador = document.getElementById('buscador');
const planetCards = document.querySelectorAll('.planet-card');
if (buscador) {
  buscador.addEventListener('input', function() {
    const termino = this.value.toLowerCase().trim();
    planetCards.forEach(card => {
      const nombre = card.getAttribute('data-nombre').toLowerCase();
      card.style.display = nombre.includes(termino) ? 'block' : 'none';
    });
  });
}

// === 8. MODO NEBULOSA ===
const modoToggle = document.getElementById('modo-toggle');
const body = document.body;
let modoGuardado = null;
try { modoGuardado = localStorage.getItem('modo'); } catch(e) {}
if (modoGuardado === 'nebulosa') {
  body.classList.add('modo-nebulosa');
  if (modoToggle) modoToggle.textContent = '🪐';
}
modoToggle.addEventListener('click', () => {
  body.classList.toggle('modo-nebulosa');
  if (body.classList.contains('modo-nebulosa')) {
    try { localStorage.setItem('modo', 'nebulosa'); } catch(e) {}
    if (modoToggle) modoToggle.textContent = '🪐';
  } else {
    try { localStorage.setItem('modo', 'oscuro'); } catch(e) {}
    if (modoToggle) modoToggle.textContent = '🌌';
  }
});

// === 9. SONIDO AMBIENTAL ===
const sonidoToggle = document.getElementById('sonido-toggle');
const audio = document.getElementById('sonido-ambiente');
let sonidoActivado = false;
try { sonidoActivado = localStorage.getItem('sonido') === 'true'; } catch(e) {}

if (audio) {
  if (sonidoActivado) {
    audio.play().catch(() => {});
    if (sonidoToggle) { sonidoToggle.classList.add('activo'); sonidoToggle.textContent = '🔊'; }
  } else {
    if (sonidoToggle) sonidoToggle.textContent = '🔈';
  }
}

if (sonidoToggle) {
  sonidoToggle.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(e => console.log('Autoplay bloqueado:', e));
      sonidoActivado = true;
      sonidoToggle.textContent = '🔊';
      sonidoToggle.classList.add('activo');
    } else {
      audio.pause();
      sonidoActivado = false;
      sonidoToggle.textContent = '🔈';
      sonidoToggle.classList.remove('activo');
    }
    try { localStorage.setItem('sonido', sonidoActivado); } catch(e) {}
  });
}

// === 10. EFECTO TILT ===
document.querySelectorAll('.planet-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    card.style.transform = `perspective(500px) rotateX(${deltaY * -10}deg) rotateY(${deltaX * 10}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
  });
});

// === 10.5. MODAL DE PLANETAS ===
const cosmosInfoData = {
  mercurio: {
    nombre: { es: "Mercurio", en: "Mercury" },
    img: "img/mercurio.jpg",
    desc: { 
      es: "<p>Mercurio es el planeta más pequeño del sistema solar y el más cercano al Sol. No tiene lunas ni anillos, y su superficie está llena de cráteres, similar a la Luna terrestre.</p>", 
      en: "<p>Mercury is the smallest planet in the solar system and the closest to the Sun. It has no moons or rings, and its surface is heavily cratered, similar to Earth's Moon.</p>" 
    }
  },
  venus: {
    nombre: { es: "Venus", en: "Venus" },
    img: "img/venus.jpg",
    desc: { 
      es: "<p>Venus es el planeta más caliente del sistema solar debido a su densa atmósfera de dióxido de carbono, que provoca un efecto invernadero extremo. Gira en dirección contraria a la mayoría de los planetas.</p>", 
      en: "<p>Venus is the hottest planet in the solar system due to its dense carbon dioxide atmosphere, which causes an extreme greenhouse effect. It spins in the opposite direction to most planets.</p>" 
    }
  },
  tierra: {
    nombre: { es: "Tierra", en: "Earth" },
    img: "img/tierra.jpg",
    desc: { 
      es: "<p>Nuestro hogar, la Tierra, es el único planeta conocido que alberga vida. Más del 70% de su superficie está cubierta de agua líquida.</p>", 
      en: "<p>Our home, Earth, is the only known planet to harbor life. More than 70% of its surface is covered in liquid water.</p>" 
    }
  },
  marte: {
    nombre: { es: "Marte", en: "Mars" },
    img: "img/marte.jpg",
    desc: { 
      es: "<p>Marte es conocido como el Planeta Rojo por el óxido de hierro en su superficie. Alberga el Monte Olimpo, el volcán más grande conocido en el sistema solar.</p>", 
      en: "<p>Mars is known as the Red Planet because of the iron oxide on its surface. It hosts Olympus Mons, the largest known volcano in the solar system.</p>" 
    }
  },
  jupiter: {
    nombre: { es: "Júpiter", en: "Jupiter" },
    img: "img/jupiter.jpg",
    desc: { 
      es: "<p>Júpiter es un gigante gaseoso y el planeta más grande de nuestro sistema. Su icónica Gran Mancha Roja es una tormenta gigante que lleva activa siglos.</p>", 
      en: "<p>Jupiter is a gas giant and the largest planet in our system. Its iconic Great Red Spot is a giant storm that has been active for centuries.</p>" 
    }
  },
  saturno: {
    nombre: { es: "Saturno", en: "Saturn" },
    img: "img/saturno.jpg",
    desc: { 
      es: "<p>Famoso por su espectacular sistema de anillos compuestos de hielo y roca, Saturno es el segundo planeta más grande y el menos denso del sistema solar.</p>", 
      en: "<p>Famous for its spectacular ring system made of ice and rock, Saturn is the second-largest planet and the least dense in the solar system.</p>" 
    }
  },
  urano: {
    nombre: { es: "Urano", en: "Uranus" },
    img: "img/urano.jpg",
    desc: { 
      es: "<p>Urano es un gigante de hielo que rota de lado, con una inclinación axial extrema, probablemente debido a una colisión masiva en el pasado.</p>", 
      en: "<p>Uranus is an ice giant that rotates on its side, with an extreme axial tilt likely caused by a massive past collision.</p>" 
    }
  },
  neptuno: {
    nombre: { es: "Neptuno", en: "Neptune" },
    img: "img/neptuno.jpg",
    desc: { 
      es: "<p>Neptuno es el planeta más alejado del Sol. Es un mundo oscuro, frío y azotado por vientos supersónicos, siendo el primero descubierto mediante predicciones matemáticas.</p>", 
      en: "<p>Neptune is the farthest planet from the Sun. It is a dark, cold world whipped by supersonic winds, and was the first planet discovered through mathematical predictions.</p>" 
    }
  },
  
  // GALAXIAS
  espiral: {
    nombre: { es: "Galaxia Espiral", en: "Spiral Galaxy" },
    img: "img/galaxia-espiral.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Espirales</strong> tienen un disco plano giratorio con un bulto central y brazos espirales repletos de gas interestelar, polvo y estrellas jóvenes brillantes.</p>", 
      en: "<p><strong>Spiral Galaxies</strong> have a flat, spinning disk with a central bulge and spiral arms packed with interstellar gas, dust, and bright young stars.</p>" 
    }
  },
  eliptica: {
    nombre: { es: "Galaxia Elíptica", en: "Elliptical Galaxy" },
    img: "img/galaxia-eliptica.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Elípticas</strong> tienen forma de huevo a esférica, contienen principalmente estrellas viejas y tienen muy poco gas y polvo, por lo que rara vez forman nuevas estrellas.</p>", 
      en: "<p><strong>Elliptical Galaxies</strong> are egg-shaped to spherical, contain mostly older stars, and have very little gas and dust, so they rarely form new stars.</p>" 
    }
  },
  irregular: {
    nombre: { es: "Galaxia Irregular", en: "Irregular Galaxy" },
    img: "img/galaxia-irregular.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Irregulares</strong> carecen de forma simétrica. Suelen ser el resultado de intensas perturbaciones gravitacionales o fusiones caóticas de otras galaxias.</p>", 
      en: "<p><strong>Irregular Galaxies</strong> lack a symmetrical shape. They are usually the result of intense gravitational disturbances or chaotic mergers of other galaxies.</p>" 
    }
  },
  lenticular: {
    nombre: { es: "Galaxia Lenticular", en: "Lenticular Galaxy" },
    img: "img/galaxia-lenticular.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Lenticulares</strong> son una transición entre espirales y elípticas. Tienen un disco pero carecen de brazos definidos y han perdido gran parte de su materia interestelar.</p>", 
      en: "<p><strong>Lenticular Galaxies</strong> are a transition between spirals and ellipticals. They have a disk but lack defined arms and have lost much of their interstellar matter.</p>" 
    }
  },
  
  // NEBULOSAS
  neb_cangrejo: {
    nombre: { es: "Nebulosa del Cangrejo", en: "Crab Nebula" },
    img: "img/nebulosa.jpg",
    desc: { 
      es: "<p>La <strong>Nebulosa del Cangrejo</strong> es un remanente de supernova, la brillante explosión de una estrella masiva observada por astrónomos chinos en el año 1054.</p>", 
      en: "<p>The <strong>Crab Nebula</strong> is a supernova remnant, the bright explosion of a massive star observed by Chinese astronomers in the year 1054.</p>" 
    }
  },
  neb_pilares: {
    nombre: { es: "Pilares de la Creación", en: "Pillars of Creation" },
    img: "img/pilares.avif",
    desc: { 
      es: "<p>Ubicados en la Nebulosa del Águila, los <strong>Pilares de la Creación</strong> son gigantescas columnas de hidrógeno interestelar frío y polvo donde se están formando nuevas estrellas.</p>", 
      en: "<p>Located in the Eagle Nebula, the <strong>Pillars of Creation</strong> are giant columns of cold interstellar hydrogen gas and dust where new stars are forming.</p>" 
    }
  },
  neb_orion: {
    nombre: { es: "Nebulosa de Orión", en: "Orion Nebula" },
    img: "img/orion.jpg",
    desc: { 
      es: "<p>La <strong>Nebulosa de Orión (M42)</strong> es una región de formación estelar masiva visible a simple vista. Es la cuna estelar densa más cercana a nuestro planeta.</p>", 
      en: "<p>The <strong>Orion Nebula (M42)</strong> is a massive star-forming region visible to the naked eye. It is the closest region of massive star formation to Earth.</p>" 
    }
  },
  neb_eta: {
    nombre: { es: "Eta Carinae", en: "Eta Carinae" },
    img: "img/eta.webp",
    desc: { 
      es: "<p><strong>Eta Carinae</strong> es un sistema estelar hipermasivo que experimentó una Gran Erupción en el siglo XIX, creando la Nebulosa del Homúnculo bipolar que lo rodea.</p>", 
      en: "<p><strong>Eta Carinae</strong> is a hypermassive star system that experienced a Great Eruption in the 19th century, creating the bipolar Homunculus Nebula around it.</p>" 
    }
  },
  neb_hubble: {
    nombre: { es: "Campo Profundo", en: "Deep Field" },
    img: "img/campo.jpg",
    desc: { 
      es: "<p>El <strong>Campo Ultra Profundo del Hubble</strong> revela miles de galaxias de diversas edades y tamaños, algunas de cuando el universo tenía apenas cientos de millones de años.</p>", 
      en: "<p>The <strong>Hubble Ultra Deep Field</strong> reveals thousands of galaxies of various ages and sizes, some from when the universe was only hundreds of millions of years old.</p>" 
    }
  },
  neb_planetaria: {
    nombre: { es: "Nebulosa Planetaria", en: "Planetary Nebula" },
    img: "img/planetaria.jpg",
    desc: { 
      es: "<p>Una <strong>Nebulosa Planetaria</strong> marca el hermoso final de una estrella similar al Sol, expulsando sus capas gaseosas exteriores mientras su núcleo brillante se encoge y enfría.</p>", 
      en: "<p>A <strong>Planetary Nebula</strong> marks the beautiful end of a Sun-like star, expelling its outer gaseous layers while its glowing core shrinks and cools.</p>" 
    }
  },
  
  // CONSTELACIONES
  const_orion: {
    nombre: { es: "Orión", en: "Orion" },
    img: "img/orion.jpg",
    desc: { 
      es: "<p><strong>Orión</strong> (el cazador) es una de las constelaciones más prominentes y reconocibles, dominada por el Cinturón de Orión de tres estrellas alineadas.</p>", 
      en: "<p><strong>Orion</strong> (the hunter) is one of the most prominent and recognizable constellations, dominated by the three aligned stars of Orion's Belt.</p>" 
    }
  },
  const_osa: {
    nombre: { es: "Osa Mayor", en: "Ursa Major" },
    img: "img/osa.webp",
    desc: { 
      es: "<p>La <strong>Osa Mayor</strong> contiene el famoso asterismo de 'El Carro' o 'El Cazo'. Es una constelación circumpolar clave para la navegación en el hemisferio norte.</p>", 
      en: "<p><strong>Ursa Major</strong> contains the famous asterism the 'Big Dipper'. It is a circumpolar constellation essential for navigation in the Northern Hemisphere.</p>" 
    }
  },
  const_casiopea: {
    nombre: { es: "Casiopea", en: "Cassiopeia" },
    img: "img/casiopea.jpg",
    desc: { 
      es: "<p><strong>Casiopea</strong> tiene la inconfundible forma de una letra 'W' o 'M' y en la mitología griega representa a una reina vanidosa atada a su trono.</p>", 
      en: "<p><strong>Cassiopeia</strong> has the unmistakable shape of a 'W' or 'M' and in Greek mythology represents a vain queen tied to her throne.</p>" 
    }
  },
  const_cisne: {
    nombre: { es: "Cisne", en: "Cygnus" },
    img: "img/cisne.webp",
    desc: { 
      es: "<p><strong>El Cisne</strong> es fácil de hallar en verano gracias al asterismo de la 'Cruz del Norte' y su estrella supergigante blanca, Deneb.</p>", 
      en: "<p><strong>Cygnus</strong> (the swan) is easy to spot in summer thanks to the 'Northern Cross' asterism and its white supergiant star, Deneb.</p>" 
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// Listener delegado para TODOS los botones "Más información" / "More Information"
// Registrado a nivel de módulo para garantizar que esté activo desde el inicio
// ──────────────────────────────────────────────────────────────────────────────
document.addEventListener('click', function masInfoHandler(e) {
  const btn = e.target.closest('.btn-mas-info');
  if (!btn) return;

  const planetaKey = btn.getAttribute('data-info');
  const data = cosmosInfoData[planetaKey];

  const modalPlaneta       = document.getElementById('modal-info');
  const modalPlanetaTitulo = document.getElementById('modal-info-titulo');
  const modalPlanetaImg    = document.getElementById('modal-info-img');
  const modalPlanetaDesc   = document.getElementById('modal-info-desc');

  if (!modalPlaneta) {
    console.error('[MasInfo] No se encontró #modal-info en el DOM');
    return;
  }
  if (!data) {
    console.warn('[MasInfo] No hay datos para key:', planetaKey, '- claves disponibles:', Object.keys(cosmosInfoData));
    return;
  }

  modalPlanetaTitulo.textContent  = data.nombre[currentLang] || data.nombre['es'];
  modalPlanetaImg.src             = data.img;
  modalPlanetaDesc.innerHTML      = data.desc[currentLang]   || data.desc['es'];
  modalPlaneta.classList.add('mostrar');
  document.body.style.overflow    = 'hidden';
});

function initUI() {
  const modalPlaneta    = document.getElementById('modal-info');
  const btnCerrarPlaneta = document.getElementById('btn-cerrar-info');

  if(btnCerrarPlaneta) {
    btnCerrarPlaneta.addEventListener('click', () => {
      modalPlaneta.classList.remove('mostrar');
      document.body.style.overflow = '';
    });
  }

  if(modalPlaneta) {
    modalPlaneta.addEventListener('click', (e) => {
      if (e.target === modalPlaneta) {
        modalPlaneta.classList.remove('mostrar');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Fix Disqus for local files
  if (typeof disqus_config !== 'undefined') {
    disqus_config = function () {
      this.page.url = 'https://rimuru2321.github.io/COSMOS' + window.location.pathname;
      this.page.identifier = window.location.pathname || 'cosmos-home';
    };
  }
}


// Note: modalPlaneta and btnCerrarPlaneta event listeners are handled inside initUI()

// === 11. LÍNEA DE TIEMPO (con soporte i18n) ===
const timelineEvents = [
  { year: "-13.8 Ga", eventKey: "timeline_bigbang", descKey: "timeline_bigbang_desc" },
  { year: "-13.6 Ga", eventKey: "timeline_estrellas", descKey: "timeline_estrellas_desc" },
  { year: "-13.5 Ga", eventKey: "timeline_galaxias", descKey: "timeline_galaxias_desc" },
  { year: "-4.6 Ga", eventKey: "timeline_sol", descKey: "timeline_sol_desc" },
  { year: "1969", eventKey: "timeline_luna", descKey: "timeline_luna_desc" },
  { year: "2022", eventKey: "timeline_sgr", descKey: "timeline_sgr_desc" }
];

function construirTimeline() {
  const track = document.querySelector('.timeline-track');
  const info = document.getElementById('timeline-desc');
  if (!track) return;
  track.innerHTML = '';
  timelineEvents.forEach((ev, index) => {
    const btn = document.createElement('div');
    btn.className = 'timeline-event';
    btn.dataset.index = index;
    btn.dataset.eventKey = ev.eventKey;
    btn.dataset.descKey = ev.descKey;
    btn.dataset.year = ev.year;
    btn.textContent = translations[currentLang]?.[ev.eventKey] || ev.eventKey;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('activo'));
      btn.classList.add('activo');
      info.innerHTML = `<strong>${ev.year}</strong>: ${translations[currentLang]?.[ev.descKey] || ev.descKey}`;
    });
    track.appendChild(btn);
  });
  if (timelineEvents.length) {
    track.firstChild.classList.add('activo');
    info.innerHTML = `<strong>${timelineEvents[0].year}</strong>: ${translations[currentLang]?.[timelineEvents[0].descKey] || timelineEvents[0].descKey}`;
  }
}

// ========== ALTO CONTRASTE ==========
const contrasteToggle = document.getElementById('contraste-toggle');
let altoContrasteGuardado = null;
try { altoContrasteGuardado = localStorage.getItem('altoContraste'); } catch(e) {}
if (altoContrasteGuardado === 'true') {
  body.classList.add('alto-contraste');
  if (contrasteToggle) contrasteToggle.textContent = '👁️‍🗨️';
}
if (contrasteToggle) {
  contrasteToggle.addEventListener('click', () => {
    body.classList.toggle('alto-contraste');
    const activo = body.classList.contains('alto-contraste');
    try { localStorage.setItem('altoContraste', activo); } catch(e) {}
    contrasteToggle.textContent = activo ? '👁️‍🗨️' : '👁️';
  });
}

// ========== ATAJOS DE TECLADO ==========
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const key = e.key.toLowerCase();
  let targetId = null;
  switch (key) {
    case 'p': targetId = 'planetas'; break;
    case 'n': targetId = 'nebulosas'; break;
    case 'a': targetId = 'agujero-negro'; break;
    case 'c': targetId = 'curiosidades'; break;
    case 'q': targetId = 'quiz'; break;
    case 'h': targetId = 'inicio'; break;
    case 't': targetId = 'timeline'; break;
    case 'm': targetId = 'misiones'; break;
    case 'w': targetId = 'clima-espacial'; break;
    case 'r': targetId = 'noticias'; break;
    case 'e': targetId = 'calculadora-edad'; break;
    case 'k': targetId = 'calculadora-peso'; break;
    case '6': targetId = 'eventos-2026'; break;
    case 'y': targetId = 'mitos-leyendas'; break;
    case 'f': targetId = 'efemerides'; break;
    case 'o': targetId = 'comparador'; break;
    case 'u': targetId = 'historia-hoy'; break;
    default: return;
  }
  const target = document.getElementById(targetId);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// ========== PANEL DE ATAJOS ==========
const atajosToggle = document.getElementById('atajos-toggle');
const atajosContenido = document.getElementById('atajos-contenido');
if (atajosToggle && atajosContenido) {
  atajosToggle.addEventListener('click', () => {
    atajosContenido.classList.toggle('mostrar');
  });
  document.addEventListener('click', (e) => {
    if (!atajosToggle.contains(e.target) && !atajosContenido.contains(e.target)) {
      atajosContenido.classList.remove('mostrar');
    }
  });
}

// ========== BOTÓN QR ==========
const qrToggle = document.getElementById('qr-toggle');
const qrContenido = document.getElementById('qr-contenido');
if (qrToggle && qrContenido) {
  qrToggle.addEventListener('click', () => {
    qrContenido.classList.toggle('mostrar');
  });
  document.addEventListener('click', (e) => {
    if (!qrToggle.contains(e.target) && !qrContenido.contains(e.target)) {
      qrContenido.classList.remove('mostrar');
    }
  });
}

// ========== HOY EN LA HISTORIA DE LA ASTRONOMÍA ==========
async function cargarHistoriaHoy() {
  const container = document.getElementById('historia-container');
  if (!container) return;

  const t = (k, fb) => (translations[currentLang]?.[k] || fb);
  container.innerHTML = `<div class="historia-cargando">${t('historia_cargando','Cargando eventos históricos...')}</div>`;

  try {
    const data = typeof astronomyEventsData !== 'undefined' ? astronomyEventsData : { eventos: [] };

    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    const eventosHoy = data.eventos.filter(e => e.mes === mesActual && e.dia === diaActual);

    if (eventosHoy.length === 0) {
      const msgES = 'Hoy no hay eventos registrados. ¡Vuelve mañana!';
      const msgEN = 'No events registered for today. Come back tomorrow!';
      container.innerHTML = `<div class="historia-vacio">${currentLang === 'en' ? msgEN : msgES}</div>`;
      return;
    }

    let html = '<div class="historia-eventos">';
    eventosHoy.forEach(e => {
      // Usar descripción en inglés si existe y el idioma es inglés
      const desc = (currentLang === 'en' && e.descripcionEN) ? e.descripcionEN : e.descripcion;
      html += `
        <div class="historia-evento">
          <div class="historia-fecha">${e.year}</div>
          <div class="historia-desc">${desc}</div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Error cargando eventos históricos:', error);
    const errES = 'No se pudieron cargar los eventos históricos.';
    const errEN = 'Could not load historical events.';
    container.innerHTML = `<div class="historia-vacio">${currentLang === 'en' ? errEN : errES}</div>`;
  }
}

// ========== EFEMÉRIDES ASTRONÓMICAS CON GEOLOCALIZACIÓN ==========
async function cargarEfemerides() {
  const container = document.getElementById('efemerides-container');
  if (!container) return;

  const isEN = currentLang === 'en';
  container.innerHTML = `<p class="efemerides-cargando">${isEN ? 'Requesting location to calculate ephemerides...' : 'Solicitando ubicación para calcular las efemérides...'}</p>`;

  const obtenerUbicacion = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject(new Error('no geolocation'));
    else navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000, maximumAge: 600000 });
  });

  try {
    const pos = await obtenerUbicacion();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    _renderEfemerides(lat, lng, null, container);
  } catch (error) {
    console.warn('No se pudo obtener la ubicación, usando coordenadas por defecto (Madrid):', error);
    mostrarEfemeridesPorDefecto(40.4168, -3.7038, container);
  }
}

function _renderEfemerides(lat, lng, defaultLabel, container) {
  try {
    // Guardar coords para re-renderizar al cambiar idioma sin pedir geolocalización de nuevo
    window._lastEfemeridesCoords = { lat, lng, label: defaultLabel };

    const isEN = currentLang === 'en';
    const ahora = new Date();
    const sunTimes  = SunCalc.getTimes(ahora, lat, lng);
    const moonTimes = SunCalc.getMoonTimes(ahora, lat, lng);
    const moonIllum = SunCalc.getMoonIllumination(ahora);


    const fmt = d => (!d || isNaN(d.getTime())) ? '--:--' : d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

    // Labels según idioma
    const L = {
      sun:       isEN ? 'Sun'              : 'Sol',
      moon:      isEN ? 'Moon'             : 'Luna',
      rise:      isEN ? 'Rise:'            : 'Salida:',
      set:       isEN ? 'Set:'             : 'Puesta:',
      culmination: isEN ? 'Culmination:'  : 'Culminación:',
      illumination: isEN ? 'Illumination:' : 'Iluminación:',
      planets:   isEN ? 'Visible Planets' : 'Planetas visibles',
      approx:    isEN ? '(Approximate data)' : '(Datos aproximados)',
      nota:      isEN ? '⏱️ Times in local timezone. Planets are visible if above the horizon at nightfall.'
                      : '⏱️ Horas en zona horaria local. Los planetas son visibles si están por encima del horizonte al anochecer.',
      noData:    isEN ? 'Data not available without precise location.' : 'Datos no disponibles sin ubicación precisa.',
    };

    const hora = ahora.getHours();
    const isNight = hora > 18 || hora < 6;
    const getPV = (nameES, nameEN, isVisible) => {
      if (!isNight) return isEN ? 'Not visible (day)' : 'No visible (día)';
      return isVisible ? (isEN ? 'Possibly visible' : 'Posiblemente visible') : (isEN ? 'Not visible' : 'No visible');
    };
    const venus   = getPV('Venus',   'Venus',   isNight);
    const jupiter = getPV('Júpiter', 'Jupiter', isNight);
    const saturn  = getPV('Saturno', 'Saturn',  isNight);
    const other   = isEN ? 'Not visible' : 'No visible';

    const locLine = defaultLabel
      ? `📍 ${defaultLabel}`
      : `📍 Lat: ${lat.toFixed(4)}° | Lon: ${lng.toFixed(4)}°`;

    container.innerHTML = `
      <div class="efemerides-ubicacion">${locLine}</div>
      <div class="efemerides-grid">
        <div class="efemerides-card">
          <h3>☀️ ${L.sun}</h3>
          <div class="efemerides-item"><span class="label">${L.rise}</span> <span class="value">${fmt(sunTimes.sunrise)}</span></div>
          <div class="efemerides-item"><span class="label">${L.set}</span> <span class="value">${fmt(sunTimes.sunset)}</span></div>
          ${defaultLabel ? '' : `<div class="efemerides-item"><span class="label">${L.culmination}</span> <span class="value">${fmt(sunTimes.solarNoon)}</span></div>`}
        </div>
        <div class="efemerides-card">
          <h3>🌙 ${L.moon}</h3>
          <div class="efemerides-item"><span class="label">${L.rise}</span> <span class="value">${fmt(moonTimes.rise)}</span></div>
          <div class="efemerides-item"><span class="label">${L.set}</span> <span class="value">${fmt(moonTimes.set)}</span></div>
          <div class="efemerides-item"><span class="label">${L.illumination}</span> <span class="value">${(moonIllum.fraction * 100).toFixed(1)}%</span></div>
        </div>
        <div class="efemerides-card">
          <h3>🪐 ${L.planets}</h3>
          <p style="color:rgba(200,216,240,0.8);margin-bottom:10px;">${L.approx}</p>
          ${defaultLabel ? `<p style="color:rgba(200,216,240,0.8);">${L.noData}</p>` : `
          <div class="efemerides-item"><span class="label">${isEN?'Mercury:':'Mercurio:'}</span> <span class="value">${other}</span></div>
          <div class="efemerides-item"><span class="label">Venus:</span> <span class="value">${venus}</span></div>
          <div class="efemerides-item"><span class="label">${isEN?'Mars:':'Marte:'}</span> <span class="value">${other}</span></div>
          <div class="efemerides-item"><span class="label">${isEN?'Jupiter:':'Júpiter:'}</span> <span class="value">${jupiter}</span></div>
          <div class="efemerides-item"><span class="label">${isEN?'Saturn:':'Saturno:'}</span> <span class="value">${saturn}</span></div>`}
        </div>
      </div>
      <div class="efemerides-nota">${L.nota}</div>
    `;
  } catch(e) {
    container.innerHTML = `<p class="efemerides-error">${currentLang==='en'?'Error calculating ephemerides.':'Error al calcular efemérides.'}</p>`;
  }
}

async function mostrarEfemeridesPorDefecto(lat, lng, container) {
  const isEN = currentLang === 'en';
  const label = isEN ? 'Default location: Madrid (approximate coordinates)' : 'Ubicación por defecto: Madrid (coordenadas aproximadas)';
  _renderEfemerides(lat, lng, label, container);
}

// ========== COMPARTIR EN REDES SOCIALES ==========
window.shareOnTwitter = function(titulo) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Mira esta sección sobre ${titulo} en Cosmos 🌌`);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};
window.shareOnFacebook = function(titulo) {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};
window.shareOnLinkedIn = function(titulo) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(`Cosmos - ${titulo}`);
  const summary = encodeURIComponent('Explora el universo con esta increíble página');
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank');
};

// ========== DISQUS ==========
var disqus_config = function () {
  this.page.url = 'https://rimuru2321.github.io/COSMOS/';
  this.page.identifier = window.location.pathname;
};
(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://cosmos-astronomia-1.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();

// ========== FECHA Y HORA EN TIEMPO REAL ==========
function actualizarFechaHora() {
  const ahora = new Date();
  
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const año = ahora.getFullYear();
  const fechaEl = document.getElementById('fecha-actual');
  if (fechaEl) fechaEl.textContent = `${dia}/${mes}/${año}`;
  
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  const horaEl = document.getElementById('hora-actual');
  if (horaEl) horaEl.textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(actualizarFechaHora, 1000);

// ========== FASE LUNAR MEJORADA ==========
async function obtenerFaseLunar() {
  try {
    const respuesta = await fetch('https://api.farmsense.net/v1/moonphases/');
    if (!respuesta.ok) throw new Error('Error en la API de fase lunar');
    
    const datos = await respuesta.json();
    if (datos && datos.length > 0) {
      const fase = datos[0];
      const nombreFase = fase.Phase;
      
      let icono = '🌕';
      if (nombreFase.includes('New')) icono = '🌑';
      else if (nombreFase.includes('Waxing Crescent')) icono = '🌒';
      else if (nombreFase.includes('First Quarter')) icono = '🌓';
      else if (nombreFase.includes('Waxing Gibbous')) icono = '🌔';
      else if (nombreFase.includes('Full')) icono = '🌕';
      else if (nombreFase.includes('Waning Gibbous')) icono = '🌖';
      else if (nombreFase.includes('Last Quarter')) icono = '🌗';
      else if (nombreFase.includes('Waning Crescent')) icono = '🌘';
      
      document.getElementById('fase-icono').textContent = icono;
      document.getElementById('fase-nombre').textContent = nombreFase;
    } else {
      throw new Error('Datos vacíos');
    }
  } catch (error) {
    console.error('Error al obtener fase lunar, usando valor por defecto:', error);
    document.getElementById('fase-icono').textContent = '🌖';
    document.getElementById('fase-nombre').textContent = 'Fase no disponible';
  }
}

obtenerFaseLunar();
setInterval(obtenerFaseLunar, 3600000);

// ========== AVISO MODO ESCRITORIO ==========

// Función para detectar si es un dispositivo móvil (por User Agent y ancho de pantalla)
function esDispositivoMovil() {
  // Detección por User Agent (más fiable)
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
  
  // Detección por ancho de pantalla (por si acaso)
  const isSmallScreen = window.innerWidth <= 1024;
  
  // Detección por eventos táctiles
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return mobileKeywords || (isSmallScreen && hasTouch);
}

// Mostrar el aviso si es móvil y no se ha cerrado antes
function mostrarAvisoMovil() {
  const aviso = document.getElementById('aviso-modo-escritorio');
  if (!aviso) return;

  // Comprobar si el usuario ya cerró el aviso antes
  let avisoCerrado = null; try { avisoCerrado = localStorage.getItem('avisoEscritorioCerrado'); } catch(e) {}

  if (esDispositivoMovil() && !avisoCerrado) {
    aviso.style.display = 'block';
  } else {
    aviso.style.display = 'none';
  }
}

// Función para cerrar el aviso (se llama desde el botón)
window.cerrarAviso = function() {
  const aviso = document.getElementById('aviso-modo-escritorio');
  if (aviso) {
    aviso.classList.add('oculto');
    try { localStorage.setItem('avisoEscritorioCerrado', 'true'); } catch(e) {}
  }
};

// Ejecutar cuando el DOM esté listo y al cambiar el tamaño de la pantalla
document.addEventListener('DOMContentLoaded', mostrarAvisoMovil);
window.addEventListener('resize', mostrarAvisoMovil);

// ========== INICIALIZACIÓN GENERAL ==========
function initComparador() {
  // Inicializar comparador
  const btnActualizar = document.getElementById('comparador-actualizar');
  const btnTodos = document.getElementById('comparador-todos');
  const btnNinguno = document.getElementById('comparador-ninguno');
  
  if (btnActualizar) {
    btnActualizar.addEventListener('click', dibujarComparador);
  }
  
  if (btnTodos) {
    btnTodos.addEventListener('click', function() {
      planetasData.forEach(p => {
        const chk = document.getElementById(p.id);
        if (chk) chk.checked = true;
      });
      dibujarComparador();
    });
  }
  
  if (btnNinguno) {
    btnNinguno.addEventListener('click', function() {
      planetasData.forEach(p => {
        const chk = document.getElementById(p.id);
        if (chk) chk.checked = false;
      });
      dibujarComparador();
    });
  }
  
  setTimeout(dibujarComparador, 500);
}

// === CURSOR CÓSMICO INTERACTIVO ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia("(pointer: fine)").matches) { // Solo en dispositivos con cursor real
    const cursor = document.createElement('div');
    cursor.className = 'cosmic-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const addHoverEffect = () => {
      document.querySelectorAll('a, button, input, .planet-card, .quiz-opcion, .timeline-event, .modo-btn').forEach(el => {
        // Evitar duplicar listeners si se llama de nuevo
        if (!el.dataset.cursorAttached) {
          el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
          el.dataset.cursorAttached = 'true';
        }
      });
    };
    
    addHoverEffect();
    
    // Observador para elementos creados dinámicamente (ej: modal, notificaciones)
    const observer = new MutationObserver(() => addHoverEffect());
    observer.observe(document.body, { childList: true, subtree: true });
  }
});