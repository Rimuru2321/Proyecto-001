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
  const API_KEY = 'C0OrFtO3IkyCp9RwGlnaKatgKYEtK46OcHANPCEX';
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

// === 12. QUIZ (con soporte i18n) ===
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
  if (!contenedor) return;

  if (preguntaActual >= preguntasQuiz.length) {
    contenedor.innerHTML = `¡Quiz completado! Puntuación: ${aciertos}/${preguntasQuiz.length}`;
    opcionesDiv.innerHTML = '';
    siguienteBtn.style.display = 'none';
    reiniciarBtn.style.display = 'inline-block';
    puntuacion.textContent = `${translations[currentLang]?.quiz_puntuacion || 'Aciertos:'} ${aciertos}/${preguntasQuiz.length}`;
    return;
  }

  const q = preguntasQuiz[preguntaActual];
  contenedor.textContent = translations[currentLang]?.[q.preguntaKey] || q.preguntaKey;
  opcionesDiv.innerHTML = '';
  q.opcionesKey.forEach((key, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opcion-btn';
    btn.textContent = translations[currentLang]?.[key] || key;
    btn.dataset.indice = idx;
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.opcion-btn').forEach(b => b.disabled = true);
      if (idx === q.respuesta) {
        btn.classList.add('correcta');
        aciertos++;
      } else {
        btn.classList.add('incorrecta');
        document.querySelectorAll('.opcion-btn')[q.respuesta].classList.add('correcta');
      }
      puntuacion.textContent = `${translations[currentLang]?.quiz_puntuacion || 'Aciertos:'} ${aciertos}/${preguntasQuiz.length}`;
      siguienteBtn.style.display = 'inline-block';
    });
    opcionesDiv.appendChild(btn);
  });
  puntuacion.textContent = `${translations[currentLang]?.quiz_puntuacion || 'Aciertos:'} ${aciertos}/${preguntasQuiz.length}`;
  siguienteBtn.style.display = 'none';
  reiniciarBtn.style.display = 'none';
}

document.getElementById('siguiente-pregunta')?.addEventListener('click', () => {
  preguntaActual++;
  cargarPregunta();
});
document.getElementById('reiniciar-quiz')?.addEventListener('click', () => {
  preguntaActual = 0;
  aciertos = 0;
  cargarPregunta();
});

// ========== IDIOMA (i18n) ==========
let currentLang = localStorage.getItem('idioma') || 'es';
let translations = { es: {}, en: {} };

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
    construirTimeline();
    cargarPregunta();
  } catch (error) {
    console.error('Error cargando idioma:', error);
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

document.getElementById('lang-es')?.addEventListener('click', () => cargarIdioma('es'));
document.getElementById('lang-en')?.addEventListener('click', () => cargarIdioma('en'));
cargarIdioma(currentLang);

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
    case 'e': targetId = 'calculadora-edad'; break;
    case 'k': targetId = 'calculadora-peso'; break;
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

// ========== CLIMA ESPACIAL MEJORADO (con tu API key) ==========
async function cargarClimaEspacial() {
  const container = document.getElementById('clima-container');
  if (!container) return;
  
  container.innerHTML = '<p class="clima-cargando">Cargando datos del clima espacial...</p>';
  
  try {
    const API_KEY = 'C0OrFtO3IkyCp9RwGlnaKatgKYEtK46OcHANPCEX';
    const solarWindRes = await fetch(`https://api.nasa.gov/DONKI/notifications?api_key=${API_KEY}`);
    if (!solarWindRes.ok) throw new Error('Error en la respuesta de NASA');
    
    const solarWindData = await solarWindRes.json();
    const alertsRes = await fetch(`https://api.nasa.gov/DONKI/GST?api_key=${API_KEY}`);
    const alertsData = await alertsRes.json();
    
    const latestNotification = solarWindData[0] || {};
    
    let html = '<div class="clima-grid">';
    
    // Extraer datos con expresiones regulares
    const solarWindSpeed = latestNotification?.messageBody?.match(/(\d+)\s*km\/s/)?.[1] || '420';
    html += `<div class="clima-card"><h3>🌬️ Viento Solar</h3><div class="clima-valor">${solarWindSpeed} km/s</div><div class="clima-unidad">velocidad media</div></div>`;
    
    const bzValue = latestNotification?.messageBody?.match(/Bz[:\s]*([-\d.]+)/i)?.[1] || '-1.8';
    html += `<div class="clima-card"><h3>🧲 Campo Magnético Bz</h3><div class="clima-valor">${bzValue} nT</div><div class="clima-unidad">nanoTeslas</div></div>`;
    
    const density = latestNotification?.messageBody?.match(/densidad[:\s]*(\d+)/i)?.[1] || '6.3';
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
    console.error('Error cargando clima espacial, usando datos simulados:', error);
    container.innerHTML = `
      <div class="clima-grid">
        <div class="clima-card"><h3>🌬️ Viento Solar</h3><div class="clima-valor">420 km/s</div><div class="clima-unidad">velocidad media (simulada)</div></div>
        <div class="clima-card"><h3>🧲 Campo Magnético Bz</h3><div class="clima-valor">-1.8 nT</div><div class="clima-unidad">nanoTeslas (simulado)</div></div>
        <div class="clima-card"><h3>⚡ Densidad de protones</h3><div class="clima-valor">6.3 cm⁻³</div><div class="clima-unidad">partículas por cm³ (simulado)</div></div>
      </div>
      <div class="clima-alertas"><h4>ℹ️ Datos simulados (la API no respondió)</h4></div>
    `;
  }
}

// ========== NOTICIAS MEJORADAS (con respaldo) ==========
async function cargarNoticias() {
  const container = document.getElementById('noticias-container');
  if (!container) return;
  
  container.innerHTML = '<p class="noticias-cargando">Cargando noticias...</p>';
  
  const noticiasRespaldo = [
    {
      title: "James Webb descubre galaxias tempranas",
      pubDate: "2025-02-25",
      description: "El telescopio James Webb ha observado galaxias que se formaron solo 300 millones de años después del Big Bang.",
      link: "https://www.nasa.gov"
    },
    {
      title: "Perseverance encuentra rocas con posibles signos de vida",
      pubDate: "2025-02-20",
      description: "El rover de la NASA en Marte ha recolectado muestras que contienen compuestos orgánicos complejos.",
      link: "https://www.nasa.gov"
    },
    {
      title: "Eclipse lunar total visible en América",
      pubDate: "2025-02-15",
      description: "La Luna de sangre podrá observarse en todo el continente americano esta noche.",
      link: "https://www.nasa.gov"
    }
  ];
  
  try {
    const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss';
    const response = await fetch(rssUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      let html = '';
      data.items.slice(0, 6).forEach(item => {
        html += `
          <div class="noticia-card">
            <h3 class="noticia-titulo">${item.title}</h3>
            <span class="noticia-fecha">${new Date(item.pubDate).toLocaleDateString()}</span>
            <p class="noticia-descripcion">${item.description.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
            <a href="${item.link}" target="_blank" class="noticia-enlace">Leer más →</a>
          </div>
        `;
      });
      container.innerHTML = html;
    } else {
      throw new Error('No se obtuvieron noticias');
    }
  } catch (error) {
    console.error('Error cargando noticias, usando respaldo:', error);
    let html = '';
    noticiasRespaldo.forEach(item => {
      html += `
        <div class="noticia-card">
          <h3 class="noticia-titulo">${item.title}</h3>
          <span class="noticia-fecha">${new Date(item.pubDate).toLocaleDateString()}</span>
          <p class="noticia-descripcion">${item.description}</p>
          <a href="${item.link}" target="_blank" class="noticia-enlace">Leer más →</a>
        </div>
      `;
    });
    container.innerHTML = html;
  }
}

// ========== HOY EN LA HISTORIA DE LA ASTRONOMÍA ==========
async function cargarHistoriaHoy() {
  const container = document.getElementById('historia-container');
  if (!container) return;
  
  container.innerHTML = '<div class="historia-cargando">Cargando eventos históricos...</div>';
  
  try {
    const respuesta = await fetch('data/astronomy-events.json');
    const data = await respuesta.json();
    
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();
    
    const eventosHoy = data.eventos.filter(e => e.mes === mesActual && e.dia === diaActual);
    
    if (eventosHoy.length === 0) {
      container.innerHTML = '<div class="historia-vacio">Hoy no hay eventos registrados. ¡Vuelve mañana!</div>';
      return;
    }
    
    let html = '<div class="historia-eventos">';
    eventosHoy.forEach(e => {
      html += `
        <div class="historia-evento">
          <div class="historia-fecha">${e.year}</div>
          <div class="historia-desc">${e.descripcion}</div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
    
  } catch (error) {
    console.error('Error cargando eventos históricos:', error);
    container.innerHTML = '<div class="historia-vacio">No se pudieron cargar los eventos históricos.</div>';
  }
}

// ========== EFEMÉRIDES ASTRONÓMICAS CON GEOLOCALIZACIÓN ==========
async function cargarEfemerides() {
  const container = document.getElementById('efemerides-container');
  if (!container) return;

  container.innerHTML = '<p class="efemerides-cargando">Solicitando ubicación para calcular las efemérides...</p>';

  const obtenerUbicacion = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 600000
        });
      }
    });
  };

  try {
    const pos = await obtenerUbicacion();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const ahora = new Date();
    const sunTimes = SunCalc.getTimes(ahora, lat, lng);
    const moonTimes = SunCalc.getMoonTimes(ahora, lat, lng);
    const moonIllum = SunCalc.getMoonIllumination(ahora);

    const formatTime = (date) => {
      if (!date || isNaN(date.getTime())) return '--:--';
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getPlanetVisibility = (planeta) => {
      const hora = ahora.getHours();
      if (hora > 18 || hora < 6) {
        const visibles = ['Venus', 'Júpiter', 'Saturno'];
        return visibles.includes(planeta) ? 'Posiblemente visible' : 'No visible';
      } else {
        return 'No visible (día)';
      }
    };

    let html = `
      <div class="efemerides-ubicacion">
        📍 Lat: ${lat.toFixed(4)}° | Lon: ${lng.toFixed(4)}°
      </div>
      <div class="efemerides-grid">
        <div class="efemerides-card">
          <h3>☀️ Sol</h3>
          <div class="efemerides-item"><span class="label">Salida:</span> <span class="value">${formatTime(sunTimes.sunrise)}</span></div>
          <div class="efemerides-item"><span class="label">Puesta:</span> <span class="value">${formatTime(sunTimes.sunset)}</span></div>
          <div class="efemerides-item"><span class="label">Culminación:</span> <span class="value">${formatTime(sunTimes.solarNoon)}</span></div>
        </div>
        <div class="efemerides-card">
          <h3>🌙 Luna</h3>
          <div class="efemerides-item"><span class="label">Salida:</span> <span class="value">${formatTime(moonTimes.rise)}</span></div>
          <div class="efemerides-item"><span class="label">Puesta:</span> <span class="value">${formatTime(moonTimes.set)}</span></div>
          <div class="efemerides-item"><span class="label">Iluminación:</span> <span class="value">${(moonIllum.fraction * 100).toFixed(1)}%</span></div>
        </div>
        <div class="efemerides-card">
          <h3>🪐 Planetas visibles</h3>
          <p style="color: rgba(200,216,240,0.8); margin-bottom: 10px;">(Datos aproximados)</p>
          <div class="efemerides-item"><span class="label">Mercurio:</span> <span class="value">${getPlanetVisibility('Mercurio')}</span></div>
          <div class="efemerides-item"><span class="label">Venus:</span> <span class="value">${getPlanetVisibility('Venus')}</span></div>
          <div class="efemerides-item"><span class="label">Marte:</span> <span class="value">${getPlanetVisibility('Marte')}</span></div>
          <div class="efemerides-item"><span class="label">Júpiter:</span> <span class="value">${getPlanetVisibility('Júpiter')}</span></div>
          <div class="efemerides-item"><span class="label">Saturno:</span> <span class="value">${getPlanetVisibility('Saturno')}</span></div>
        </div>
      </div>
      <div class="efemerides-nota">
        ⏱️ Horas en zona horaria local. Los planetas son visibles si están por encima del horizonte al anochecer.
      </div>
    `;

    container.innerHTML = html;

  } catch (error) {
    console.warn('No se pudo obtener la ubicación, usando coordenadas por defecto (Madrid):', error);
    const lat = 40.4168;
    const lng = -3.7038;
    mostrarEfemeridesPorDefecto(lat, lng, container);
  }
}

async function mostrarEfemeridesPorDefecto(lat, lng, container) {
  try {
    const ahora = new Date();
    const sunTimes = SunCalc.getTimes(ahora, lat, lng);
    const moonTimes = SunCalc.getMoonTimes(ahora, lat, lng);
    const moonIllum = SunCalc.getMoonIllumination(ahora);

    const formatTime = (date) => {
      if (!date || isNaN(date.getTime())) return '--:--';
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    let html = `
      <div class="efemerides-ubicacion">
        📍 Ubicación por defecto: Madrid (coordenadas aproximadas)
      </div>
      <div class="efemerides-grid">
        <div class="efemerides-card">
          <h3>☀️ Sol</h3>
          <div class="efemerides-item"><span class="label">Salida:</span> <span class="value">${formatTime(sunTimes.sunrise)}</span></div>
          <div class="efemerides-item"><span class="label">Puesta:</span> <span class="value">${formatTime(sunTimes.sunset)}</span></div>
        </div>
        <div class="efemerides-card">
          <h3>🌙 Luna</h3>
          <div class="efemerides-item"><span class="label">Salida:</span> <span class="value">${formatTime(moonTimes.rise)}</span></div>
          <div class="efemerides-item"><span class="label">Puesta:</span> <span class="value">${formatTime(moonTimes.set)}</span></div>
          <div class="efemerides-item"><span class="label">Iluminación:</span> <span class="value">${(moonIllum.fraction * 100).toFixed(1)}%</span></div>
        </div>
        <div class="efemerides-card">
          <h3>🪐 Planetas</h3>
          <p style="color: rgba(200,216,240,0.8);">Datos no disponibles sin ubicación precisa.</p>
        </div>
      </div>
      <div class="efemerides-nota">
        ℹ️ Para obtener datos precisos de tu ubicación, activa la geolocalización.
      </div>
    `;
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<p class="efemerides-error">Error al calcular efemérides.</p>';
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

// ========== CALCULADORA DE EDAD PLANETARIA ==========
const planetasEdad = [
  { nombre: 'Mercurio', factor: 0.2408467 },
  { nombre: 'Venus', factor: 0.61519726 },
  { nombre: 'Tierra', factor: 1 },
  { nombre: 'Marte', factor: 1.8808158 },
  { nombre: 'Júpiter', factor: 11.862615 },
  { nombre: 'Saturno', factor: 29.447498 },
  { nombre: 'Urano', factor: 84.016846 },
  { nombre: 'Neptuno', factor: 164.79132 }
];

function calcularEdades() {
  const input = document.getElementById('edad-terrestre');
  const contenedor = document.getElementById('resultados-edad');
  if (!input || !contenedor) return;
  const edad = parseFloat(input.value);
  if (isNaN(edad) || edad < 0) {
    contenedor.innerHTML = '<p style="color: var(--nebula3);">Por favor ingresa una edad válida</p>';
    return;
  }
  let html = '';
  planetasEdad.forEach(p => {
    const edadPlaneta = (edad / p.factor).toFixed(2);
    html += `<div class="resultado-card"><h4>${p.nombre}</h4><div class="edad">${edadPlaneta} años</div></div>`;
  });
  contenedor.innerHTML = html;
}

document.getElementById('calcular-edad')?.addEventListener('click', calcularEdades);
if (document.getElementById('edad-terrestre')) {
  setTimeout(calcularEdades, 500);
}

// ========== CALCULADORA DE PESO EN OTROS PLANETAS ==========
const pesosData = [
  { nombre: 'Sol', gravedad: 274, color: '#ffaa00', emoji: '☀️' },
  { nombre: 'Mercurio', gravedad: 3.7, color: '#a5a5a5', emoji: '☿' },
  { nombre: 'Venus', gravedad: 8.87, color: '#e6b800', emoji: '♀️' },
  { nombre: 'Tierra', gravedad: 9.81, color: '#2e86c1', emoji: '🌍' },
  { nombre: 'Luna', gravedad: 1.62, color: '#cccccc', emoji: '🌙' },
  { nombre: 'Marte', gravedad: 3.71, color: '#c1440e', emoji: '♂️' },
  { nombre: 'Júpiter', gravedad: 24.79, color: '#b07d5e', emoji: '♃' },
  { nombre: 'Saturno', gravedad: 10.44, color: '#e0bb87', emoji: '🪐' },
  { nombre: 'Urano', gravedad: 8.69, color: '#4fd0e7', emoji: '⛢' },
  { nombre: 'Neptuno', gravedad: 11.15, color: '#4b70dd', emoji: '♆' }
];

function calcularPeso() {
  const input = document.getElementById('peso-terrestre');
  const contenedor = document.getElementById('resultados-peso');
  if (!input || !contenedor) return;
  const peso = parseFloat(input.value);
  if (isNaN(peso) || peso < 0) {
    contenedor.innerHTML = '<p style="color: var(--nebula3);">Por favor ingresa un peso válido</p>';
    return;
  }
  const gravedadTierra = 9.81;
  let html = '';
  pesosData.forEach(p => {
    const pesoPlaneta = (peso / gravedadTierra) * p.gravedad;
    html += `<div class="resultado-card" style="border-color: ${p.color};"><h4>${p.emoji} ${p.nombre}</h4><div class="edad">${pesoPlaneta.toFixed(2)} kg</div></div>`;
  });
  contenedor.innerHTML = html;
}

document.getElementById('calcular-peso')?.addEventListener('click', calcularPeso);
if (document.getElementById('peso-terrestre')) {
  setTimeout(calcularPeso, 500);
}

// ========== COMPARADOR DE TAMAÑOS DE PLANETAS ==========
const planetasData = [
  { id: 'showSun', nombre: 'Sol', radio: 695700, color: '#ffaa00' },
  { id: 'showMercurio', nombre: 'Mercurio', radio: 2440, color: '#a5a5a5' },
  { id: 'showVenus', nombre: 'Venus', radio: 6052, color: '#e6b800' },
  { id: 'showTierra', nombre: 'Tierra', radio: 6371, color: '#2e86c1' },
  { id: 'showMarte', nombre: 'Marte', radio: 3390, color: '#c1440e' },
  { id: 'showJupiter', nombre: 'Júpiter', radio: 69911, color: '#b07d5e' },
  { id: 'showSaturno', nombre: 'Saturno', radio: 58232, color: '#e0bb87' },
  { id: 'showUrano', nombre: 'Urano', radio: 25362, color: '#4fd0e7' },
  { id: 'showNeptuno', nombre: 'Neptuno', radio: 24622, color: '#4b70dd' }
];

function dibujarComparador() {
  const canvas = document.getElementById('comparador-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Fondo
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Calcular el radio máximo seleccionado
  let maxRadio = 0;
  planetasData.forEach(p => {
    const checkbox = document.getElementById(p.id);
    if (checkbox && checkbox.checked) {
      maxRadio = Math.max(maxRadio, p.radio);
    }
  });
  
  // Escala para que el más grande tenga 130px de radio
  const escala = 130 / maxRadio;
  
  const startX = 100;
  const stepX = 140;
  let index = 0;
  
  planetasData.forEach(p => {
    const checkbox = document.getElementById(p.id);
    if (!checkbox || !checkbox.checked) return;
    
    const radioPx = p.radio * escala;
    const radioFinal = Math.max(radioPx, 5); // mínimo 5px para que se vea
    const radioDibujo = Math.min(radioFinal, 150);
    
    const x = startX + index * stepX;
    const y = canvas.height / 2;
    
    ctx.beginPath();
    ctx.arc(x, y, radioDibujo, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = 'rgba(255,255,255,0.5)';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.font = 'bold 14px "Orbitron", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(p.nombre, x, y + radioDibujo + 25);
    
    ctx.font = '12px "Rajdhani", sans-serif';
    ctx.fillStyle = 'rgba(200,216,240,0.9)';
    ctx.fillText(`${p.radio * 2} km`, x, y + radioDibujo + 45);
    
    index++;
  });
  
  if (index === 0) {
    ctx.font = '18px "Orbitron", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('Selecciona al menos un planeta', canvas.width/2, canvas.height/2);
  }
}

// ========== DISQUS ==========
var disqus_config = function () {
  this.page.url = window.location.href;
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

// ========== INICIALIZACIÓN GENERAL ==========
document.addEventListener('DOMContentLoaded', function() {
  cargarClimaEspacial();
  cargarNoticias();
  cargarHistoriaHoy();
  cargarEfemerides();
  
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
});
