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
resize(); initStars(); drawStars();
window.addEventListener('resize', () => { resize(); initStars(); });

// === 2. Scroll reveal ===
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
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

// === 4. Modal de términos ===
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal-terminos');
  const btnAceptar = document.getElementById('btn-aceptar');
  const aceptado = localStorage.getItem('terminosAceptados');
  if (!aceptado) {
    modal.classList.add('mostrar');
    document.body.style.overflow = 'hidden';
  }
  btnAceptar.addEventListener('click', function() {
    localStorage.setItem('terminosAceptados', 'true');
    modal.classList.remove('mostrar');
    document.body.style.overflow = '';
  });
});

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

// === 7. NASA APOD ===
const apodContainer = document.getElementById('apod-container');
if (apodContainer) {
  const API_KEY = 'C0OrFtO3IkyCp9RwGlnaKatgKYEtK46OcHANPCEX'; // Reemplazar con tu clave
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      let html = '';
      if (data.media_type === 'image') {
        html += `<img src="${data.url}" alt="${data.title}" loading="lazy">`;
      } else {
        html += `<iframe src="${data.url}" style="width:100%; height:400px;" frameborder="0"></iframe>`;
      }
      html += `<h3>${data.title}</h3><p>${data.explanation}</p>`;
      apodContainer.innerHTML = html;
    })
    .catch(() => apodContainer.innerHTML = '<p>Error al cargar APOD</p>');
}

// === 8. MODO NEBULOSA ===
const modoToggle = document.getElementById('modo-toggle');
const body = document.body;
if (localStorage.getItem('modo') === 'nebulosa') {
  body.classList.add('modo-nebulosa');
  modoToggle.textContent = '✨';
}
modoToggle.addEventListener('click', () => {
  body.classList.toggle('modo-nebulosa');
  if (body.classList.contains('modo-nebulosa')) {
    localStorage.setItem('modo', 'nebulosa');
    modoToggle.textContent = '✨';
  } else {
    localStorage.setItem('modo', 'oscuro');
    modoToggle.textContent = '🌌';
  }
});

// === 9. SONIDO AMBIENTAL ===
const sonidoToggle = document.getElementById('sonido-toggle');
const audio = document.getElementById('sonido-ambiente');
let sonidoActivado = localStorage.getItem('sonido') === 'true';

if (sonidoActivado) {
  audio.play().catch(() => {});
  sonidoToggle.classList.add('activo');
  sonidoToggle.textContent = '🔊';
} else {
  sonidoToggle.textContent = '🔈';
}

sonidoToggle.addEventListener('click', () => {
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
  localStorage.setItem('sonido', sonidoActivado);
});

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

// ========== FUNCIONES PRINCIPALES (TIMELINE Y QUIZ) ==========
// (Se inicializarán después de cargar el DOM)

// Variables globales para idioma
let currentLang = localStorage.getItem('idioma') || 'es';
let translations = { es: {}, en: {} };

// Eventos de cambio de idioma
document.getElementById('lang-es')?.addEventListener('click', () => cargarIdioma('es'));
document.getElementById('lang-en')?.addEventListener('click', () => cargarIdioma('en'));

// Función para cargar archivo de idioma
async function cargarIdioma(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const data = await response.json();
    translations[lang] = data;
    aplicarTraducciones(lang);
    currentLang = lang;
    localStorage.setItem('idioma', lang);
    document.querySelectorAll('.idioma-btn').forEach(btn => btn.classList.remove('activo'));
    document.getElementById(`lang-${lang}`)?.classList.add('activo');
    // Reconstruir componentes que dependen del idioma
    construirTimeline();
    cargarPregunta();
  } catch (error) {
    console.error('Error cargando idioma:', error);
    // Si falla, usar textos por defecto (los del HTML)
  }
}

function aplicarTraducciones(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });
  if (buscador && t.buscador_placeholder) {
    buscador.placeholder = t.buscador_placeholder;
  }
}

// ========== LÍNEA DE TIEMPO ==========
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
  
  if (!track) {
    console.error('No se encontró el elemento .timeline-track');
    return;
  }
  if (!info) {
    console.error('No se encontró el elemento #timeline-desc');
    return;
  }

  track.innerHTML = ''; // Limpiar

  timelineEvents.forEach((ev, index) => {
    const btn = document.createElement('div');
    btn.className = 'timeline-event';
    btn.dataset.index = index;
    // Usar traducción si existe, si no, usar el eventKey como texto (pero mejor mostrar algo legible)
    let texto = translations[currentLang]?.[ev.eventKey];
    if (!texto) {
      // Texto por defecto si no hay traducción
      const defaultTexts = {
        timeline_bigbang: 'Big Bang',
        timeline_estrellas: 'Primeras estrellas',
        timeline_galaxias: 'Primeras galaxias',
        timeline_sol: 'Nacimiento del Sol',
        timeline_luna: 'Llegada a la Luna',
        timeline_sgr: 'Imagen de Sgr A*'
      };
      texto = defaultTexts[ev.eventKey] || ev.eventKey;
    }
    btn.textContent = texto;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('activo'));
      btn.classList.add('activo');
      let desc = translations[currentLang]?.[ev.descKey];
      if (!desc) {
        const defaultDescs = {
          timeline_bigbang_desc: 'El universo comienza con una singularidad.',
          timeline_estrellas_desc: 'Las primeras estrellas se forman.',
          timeline_galaxias_desc: 'Las galaxias primitivas se ensamblan.',
          timeline_sol_desc: 'Se forma el Sol y el Sistema Solar.',
          timeline_luna_desc: 'Apolo 11 llega a la Luna.',
          timeline_sgr_desc: 'Primera imagen del agujero negro central.'
        };
        desc = defaultDescs[ev.descKey] || ev.descKey;
      }
      info.innerHTML = `<strong>${ev.year}</strong>: ${desc}`;
    });
    track.appendChild(btn);
  });

  // Activar el primer evento
  if (track.firstChild) {
    track.firstChild.classList.add('activo');
    let primerDesc = translations[currentLang]?.[timelineEvents[0].descKey];
    if (!primerDesc) {
      primerDesc = 'El universo comienza con una singularidad.';
    }
    info.innerHTML = `<strong>${timelineEvents[0].year}</strong>: ${primerDesc}`;
  }
}

// ========== QUIZ ==========
const preguntasQuiz = [
  { preguntaKey: "quiz_pregunta1", opcionesKey: ["quiz_opcion1_1","quiz_opcion1_2","quiz_opcion1_3","quiz_opcion1_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta2", opcionesKey: ["quiz_opcion2_1","quiz_opcion2_2","quiz_opcion2_3","quiz_opcion2_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta3", opcionesKey: ["quiz_opcion3_1","quiz_opcion3_2","quiz_opcion3_3","quiz_opcion3_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta4", opcionesKey: ["quiz_opcion4_1","quiz_opcion4_2","quiz_opcion4_3","quiz_opcion4_4"], respuesta: 3 },
  { preguntaKey: "quiz_pregunta5", opcionesKey: ["quiz_opcion5_1","quiz_opcion5_2","quiz_opcion5_3","quiz_opcion5_4"], respuesta: 0 },
  { preguntaKey: "quiz_pregunta6", opcionesKey: ["quiz_opcion6_1","quiz_opcion6_2","quiz_opcion6_3","quiz_opcion6_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta7", opcionesKey: ["quiz_opcion7_1","quiz_opcion7_2","quiz_opcion7_3","quiz_opcion7_4"], respuesta: 2 }
];

let preguntaActual = 0;
let aciertos = 0;

function cargarPregunta() {
  const contenedor = document.getElementById('pregunta-actual');
  const opcionesDiv = document.getElementById('opciones-container');
  const puntuacion = document.getElementById('puntuacion');
  const siguienteBtn = document.getElementById('siguiente-pregunta');
  const reiniciarBtn = document.getElementById('reiniciar-quiz');

  if (!contenedor || !opcionesDiv || !puntuacion) {
    console.error('No se encontraron elementos del quiz');
    return;
  }

  // Si no hay más preguntas, mostrar final
  if (preguntaActual >= preguntasQuiz.length) {
    contenedor.innerHTML = `¡Quiz completado! Puntuación: ${aciertos}/${preguntasQuiz.length}`;
    opcionesDiv.innerHTML = '';
    if (siguienteBtn) siguienteBtn.style.display = 'none';
    if (reiniciarBtn) reiniciarBtn.style.display = 'inline-block';
    puntuacion.textContent = `Aciertos: ${aciertos}/${preguntasQuiz.length}`;
    return;
  }

  const q = preguntasQuiz[preguntaActual];
  // Obtener texto de la pregunta
  let preguntaTexto = translations[currentLang]?.[q.preguntaKey];
  if (!preguntaTexto) {
    const defaultPreguntas = {
      quiz_pregunta1: "¿Cuál es el agujero negro supermasivo en el centro de la Vía Láctea?",
      quiz_pregunta2: "¿Aproximadamente cuántas estrellas se estima que contiene la Vía Láctea?",
      quiz_pregunta3: "¿En qué año el ser humano pisó la Luna por primera vez?",
      quiz_pregunta4: "¿Qué planeta tiene los anillos más famosos?",
      quiz_pregunta5: "¿Cómo se llama la galaxia más cercana a la Vía Láctea?",
      quiz_pregunta6: "¿Qué tipo de nebulosa son los 'Pilares de la Creación'?",
      quiz_pregunta7: "¿Cuál es la temperatura aproximada del núcleo del Sol?"
    };
    preguntaTexto = defaultPreguntas[q.preguntaKey] || q.preguntaKey;
  }
  contenedor.textContent = preguntaTexto;

  opcionesDiv.innerHTML = '';
  q.opcionesKey.forEach((key, idx) => {
    let opcionTexto = translations[currentLang]?.[key];
    if (!opcionTexto) {
      const defaultOpciones = {
        quiz_opcion1_1: "M87*",
        quiz_opcion1_2: "Sagitario A*",
        quiz_opcion1_3: "Cygnus X-1",
        quiz_opcion1_4: "TON 618",
        quiz_opcion2_1: "100 mil millones",
        quiz_opcion2_2: "300 mil millones",
        quiz_opcion2_3: "1 billón",
        quiz_opcion2_4: "10 mil millones",
        quiz_opcion3_1: "1965",
        quiz_opcion3_2: "1969",
        quiz_opcion3_3: "1972",
        quiz_opcion3_4: "1958",
        quiz_opcion4_1: "Júpiter",
        quiz_opcion4_2: "Urano",
        quiz_opcion4_3: "Neptuno",
        quiz_opcion4_4: "Saturno",
        quiz_opcion5_1: "Andrómeda",
        quiz_opcion5_2: "Triángulo",
        quiz_opcion5_3: "Nube de Magallanes",
        quiz_opcion5_4: "Sombrero",
        quiz_opcion6_1: "Nebulosa planetaria",
        quiz_opcion6_2: "Nebulosa de emisión",
        quiz_opcion6_3: "Remanente de supernova",
        quiz_opcion6_4: "Nebulosa oscura",
        quiz_opcion7_1: "5.500 °C",
        quiz_opcion7_2: "1 millón °C",
        quiz_opcion7_3: "15 millones °C",
        quiz_opcion7_4: "100 millones °C"
      };
      opcionTexto = defaultOpciones[key] || key;
    }
    const btn = document.createElement('button');
    btn.className = 'opcion-btn';
    btn.textContent = opcionTexto;
    btn.dataset.indice = idx;
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.opcion-btn').forEach(b => b.disabled = true);
      if (idx === q.respuesta) {
        btn.classList.add('correcta');
        aciertos++;
      } else {
        btn.classList.add('incorrecta');
        const correctBtn = document.querySelectorAll('.opcion-btn')[q.respuesta];
        if (correctBtn) correctBtn.classList.add('correcta');
      }
      puntuacion.textContent = `Aciertos: ${aciertos}/${preguntasQuiz.length}`;
      if (siguienteBtn) siguienteBtn.style.display = 'inline-block';
    });
    opcionesDiv.appendChild(btn);
  });

  puntuacion.textContent = `Aciertos: ${aciertos}/${preguntasQuiz.length}`;
  if (siguienteBtn) siguienteBtn.style.display = 'none';
  if (reiniciarBtn) reiniciarBtn.style.display = 'none';
}

// Eventos de los botones del quiz
document.getElementById('siguiente-pregunta')?.addEventListener('click', () => {
  preguntaActual++;
  cargarPregunta();
});
document.getElementById('reiniciar-quiz')?.addEventListener('click', () => {
  preguntaActual = 0;
  aciertos = 0;
  cargarPregunta();
});

// ========== ALTO CONTRASTE ==========
const contrasteToggle = document.getElementById('contraste-toggle');
if (localStorage.getItem('altoContraste') === 'true') {
  body.classList.add('alto-contraste');
  if (contrasteToggle) contrasteToggle.textContent = '👁️‍🗨️';
}
if (contrasteToggle) {
  contrasteToggle.addEventListener('click', () => {
    body.classList.toggle('alto-contraste');
    const activo = body.classList.contains('alto-contraste');
    localStorage.setItem('altoContraste', activo);
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

// ========== CLIMA ESPACIAL ==========
async function cargarClimaEspacial() {
  const container = document.getElementById('clima-container');
  if (!container) return;
  try {
    const API_KEY = 'DEMO_KEY'; // Reemplazar con tu API key de NASA
    const solarWindRes = await fetch(`https://api.nasa.gov/DONKI/notifications?api_key=${API_KEY}`);
    const solarWindData = await solarWindRes.json();
    const alertsRes = await fetch(`https://api.nasa.gov/DONKI/GST?api_key=${API_KEY}`);
    const alertsData = await alertsRes.json();
    
    const latestNotification = solarWindData[0] || {};
    const latestAlert = alertsData[0] || {};
    
    let html = '<div class="clima-grid">';
    const solarWindSpeed = latestNotification?.messageBody?.match(/(\d+)\s*km\/s/)?.[1] || '450';
    html += `<div class="clima-card"><h3>🌬️ Viento Solar</h3><div class="clima-valor">${solarWindSpeed} km/s</div><div class="clima-unidad">velocidad media</div></div>`;
    
    const bzValue = latestNotification?.messageBody?.match(/Bz[:\s]*([-\d.]+)/i)?.[1] || '-2.5';
    html += `<div class="clima-card"><h3>🧲 Campo Magnético Bz</h3><div class="clima-valor">${bzValue} nT</div><div class="clima-unidad">nanoTeslas</div></div>`;
    
    const density = latestNotification?.messageBody?.match(/densidad[:\s]*(\d+)/i)?.[1] || '5.2';
    html += `<div class="clima-card"><h3>⚡ Densidad de protones</h3><div class="clima-valor">${density} cm⁻³</div><div class="clima-unidad">partículas por cm³</div></div>`;
    html += '</div>';
    
    if (alertsData.length > 0) {
      html += '<div class="clima-alertas"><h4>⚠️ Alertas de tormentas geomagnéticas</h4><ul>';
      alertsData.slice(0, 3).forEach(alert => {
        html += `<li><strong>${alert.gstID || 'Alerta'}:</strong> ${alert.messageBody?.substring(0, 100) || 'Actividad geomagnética'}...</li>`;
      });
      html += '</ul></div>';
    } else {
      html += '<div class="clima-alertas"><h4>✅ No hay alertas activas</h4></div>';
    }
    container.innerHTML = html;
  } catch (error) {
    console.error('Error cargando clima espacial:', error);
    container.innerHTML = '<p class="clima-error">Error al cargar datos del clima espacial</p>';
  }
}

// ========== NOTICIAS DESDE RSS DE NASA ==========
async function cargarNoticias() {
  const container = document.getElementById('noticias-container');
  if (!container) return;
  try {
    const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss';
    const response = await fetch(rssUrl);
    const data = await response.json();
    if (data.status === 'ok' && data.items) {
      let html = '';
      data.items.slice(0, 6).forEach(item => {
        html += `
          <div class="noticia-card">
            <h3 class="noticia-titulo">${item.title}</h3>
            <span class="noticia-fecha">${new Date(item.pubDate).toLocaleDateString()}</span>
            <p class="noticia-descripcion">${item.description.substring(0, 150)}...</p>
            <a href="${item.link}" target="_blank" class="noticia-enlace">Leer más →</a>
          </div>
        `;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = '<p>No hay noticias disponibles</p>';
    }
  } catch (error) {
    console.error('Error cargando noticias:', error);
    container.innerHTML = '<p>Error al cargar noticias</p>';
  }
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
  this.page.url = window.location.href;
  this.page.identifier = window.location.pathname;
};
(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://cosmos-astronomia.disqus.com/embed.js'; // Cambia por tu shortname
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();

// ========== INICIALIZACIÓN GENERAL ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado, inicializando componentes...');
  
  // Inicializar idioma (esto dispara timeline y quiz)
  cargarIdioma(currentLang);
  
  // Cargar clima y noticias
  cargarClimaEspacial();
  cargarNoticias();
  
  console.log('Componentes inicializados.');
});
