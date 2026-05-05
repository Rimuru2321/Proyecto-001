
// main.js - Orquestador central para asegurar el orden de ejecución correcto
document.addEventListener('DOMContentLoaded', async () => {
    console.log("Iniciando COSMOS...");
    
    // 1. Cargar el idioma base primero
    if (typeof cargarIdioma === 'function') {
        await cargarIdioma(typeof currentLang !== 'undefined' ? currentLang : 'es');
    }
    
    // 2. Inicializar la UI interactiva (Modales, botones)
    if (typeof initUI === 'function') initUI();
    
    // 3. Inicializar el Bot AI
    if (typeof initBot === 'function') initBot();
    
    // 4. Iniciar APOD
    if (typeof initApod === 'function') initApod();
    
    // 4.5. Iniciar Visor 3D
    try {
      if (typeof init3DViewer === 'function') init3DViewer();
    } catch (e) {
      console.warn("No se pudo iniciar el visor 3D (posiblemente WebGL no soportado):", e);
    }
    
    // 5. Otras funciones que estaban en DOMContentLoaded de ui.js
    if (typeof initVarious === 'function') initVarious();
    
    // 5.5. Inicializar el Quiz explícitamente (por si cargarIdioma ya no lo llamó)
    if (typeof cargarPregunta === 'function') cargarPregunta();
    
    // 6. APIs secundarias
    if (typeof initComparador === 'function') initComparador();
    if (typeof cargarClimaEspacial === 'function') cargarClimaEspacial();
    if (typeof cargarNoticias === 'function') cargarNoticias();
    if (typeof cargarHistoriaHoy === 'function') cargarHistoriaHoy();
    if (typeof cargarEfemerides === 'function') cargarEfemerides();
    
    console.log("COSMOS Iniciado exitosamente.");
});
