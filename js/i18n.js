// ========== IDIOMA (i18n) ==========
let currentLang = 'es';
try { currentLang = localStorage.getItem('idioma') || 'es'; } catch(e) {}
let translations = { es: {}, en: {} };

async function cargarIdioma(lang) {
  try {
    // Usamos las variables globales cargadas directamente en el HTML para evitar errores de CORS en file:///
    const data = lang === 'es' ? langES : langEN;
    translations[lang] = data;
    aplicarTraducciones(lang);
    currentLang = lang;
    try { localStorage.setItem('idioma', lang); } catch(e) {}
    document.querySelectorAll('.idioma-btn').forEach(btn => btn.classList.remove('activo'));
    document.getElementById(`lang-${lang}`)?.classList.add('activo');
    // Solo llamar construirTimeline si existe (definida en ui.js)
    if (typeof construirTimeline === 'function') construirTimeline();
    // Solo llamar cargarPregunta si existe (definida en quiz.js)
    if (typeof cargarPregunta === 'function') cargarPregunta();
    // Actualizar nombres de planetas en el visor 3D si está activo
    if (typeof window.update3DViewerLang === 'function') window.update3DViewerLang(lang);
    // Re-renderizar sección de Historia que tiene descripciones dinámicas bilingües
    if (typeof cargarHistoriaHoy === 'function') cargarHistoriaHoy();
    // Re-renderizar efemérides sin pedir geolocalización de nuevo (usa últimas coords guardadas)
    const efContainer = document.getElementById('efemerides-container');
    if (efContainer && typeof _renderEfemerides === 'function' && window._lastEfemeridesCoords) {
      _renderEfemerides(window._lastEfemeridesCoords.lat, window._lastEfemeridesCoords.lng, window._lastEfemeridesCoords.label, efContainer);
    }
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
  const buscadorLocal = document.getElementById('buscador');
  if (buscadorLocal && t.buscador_placeholder) {
    buscadorLocal.placeholder = t.buscador_placeholder;
  }
}

document.getElementById('lang-es')?.addEventListener('click', () => cargarIdioma('es'));
document.getElementById('lang-en')?.addEventListener('click', () => cargarIdioma('en'));
