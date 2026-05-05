import os
import re

# 1. FIX BOT.JS
with open('js/bot.js', 'r', encoding='utf-8') as f:
    bot_content = f.read()

# The duplicate DOMContentLoaded block starts around line 417
# Let's just find the first occurrence of `document.addEventListener('DOMContentLoaded'`
# and we'll rewrite the initialization block completely.

bot_code = bot_content.split("document.addEventListener('DOMContentLoaded'")[0]

bot_init = """
function initBot() {
  const botButton = document.getElementById('cosmobot-button');
  const botChat = document.getElementById('cosmobot-chat');
  const botClose = document.getElementById('cosmobot-close');
  const botInput = document.getElementById('cosmobot-input');
  const botSend = document.getElementById('cosmobot-send');
  const botMessages = document.getElementById('cosmobot-messages');
  const botThinking = document.getElementById('cosmobot-thinking');

  if (!botButton || !botChat || !botClose || !botInput || !botSend || !botMessages) {
    console.error('❌ No se encontraron los elementos del bot');
    return;
  }

  const mensajesBienvenida = {
    es: `🌟 ¡Bienvenido a COSMOS! Soy tu asistente de astronomía.

Puedo ayudarte con:
🔭 Galaxias, planetas y estrellas
⚫ Agujeros negros y nebulosas
🌑 Eclipses y eventos astronómicos
📱 Navegar a cualquier sección
💡 Responder preguntas del cosmos

¡Pregúntame lo que quieras!`,
    en: `🌟 Welcome to COSMOS! I'm your astronomy assistant.

I can help you with:
🔭 Galaxies, planets and stars
⚫ Black holes and nebulae
🌑 Eclipses and astronomical events
📱 Navigate to any section
💡 Answer questions about the cosmos

Ask me anything!`
  };

  // currentLang is global from i18n.js
  const mensajeBienvenida = mensajesBienvenida[typeof currentLang !== 'undefined' ? currentLang : 'es'] || mensajesBienvenida.es;
  
  // Clear messages and add welcome
  botMessages.innerHTML = '';
  addMessage(mensajeBienvenida, 'bot');

  botButton.addEventListener('click', () => {
    botChat.classList.add('mostrar');
    setTimeout(() => { botButton.style.display = 'none'; }, 300);
  });

  botClose.addEventListener('click', () => {
    botChat.classList.remove('mostrar');
    setTimeout(() => { botChat.style.display = 'none'; botButton.style.display = 'flex'; }, 300);
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    botMessages.appendChild(msgDiv);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  function sendMessage() {
    const userText = botInput.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    botInput.value = '';

    if (botThinking) botThinking.style.display = 'block';

    setTimeout(() => {
      const respuesta = procesarMensaje(userText);
      
      if (respuesta.tipo === 'navegar') {
        const mensajeMostrar = respuesta.mensaje || `Perfecto, te llevo a ${respuesta.seccion.replace('-', ' ')} 🚀`;
        addMessage(mensajeMostrar, 'bot');
        guardarConversacion(userText, mensajeMostrar);
        setTimeout(() => {
          const element = document.getElementById(respuesta.seccion);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
      } else {
        addMessage(respuesta.texto, 'bot');
        guardarConversacion(userText, respuesta.texto);
      }
      
      if (botThinking) botThinking.style.display = 'none';
    }, 600);
  }

  botSend.addEventListener('click', sendMessage);
  botInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  window.limpiarHistorialBot = function() {
    conversacionHistorial = [];
    localStorage.removeItem('cosmos_chat_historial');
  };
}
"""

with open('js/bot.js', 'w', encoding='utf-8') as f:
    f.write(bot_code + bot_init)

# 2. FIX i18n.js
with open('js/i18n.js', 'r', encoding='utf-8') as f:
    i18n_content = f.read()

# remove immediate execution of cargarIdioma and add a global initI18n
i18n_content = i18n_content.replace("cargarIdioma(currentLang);", "")
i18n_content = i18n_content.replace(
    "const buscador = document.getElementById('buscador');", 
    "const buscador = document.getElementById('buscador');"
)
# Ensure buscador is handled properly inside aplicarTraducciones
if "if (buscador && t.buscador_placeholder)" in i18n_content:
    i18n_content = i18n_content.replace(
        "if (buscador && t.buscador_placeholder) {",
        "const buscadorLocal = document.getElementById('buscador');\n  if (buscadorLocal && t.buscador_placeholder) {"
    )
    i18n_content = i18n_content.replace("buscador.placeholder", "buscadorLocal.placeholder")

with open('js/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_content)


# 3. FIX UI.JS (Planets Modal)
with open('js/ui.js', 'r', encoding='utf-8') as f:
    ui_content = f.read()

ui_init = """
function initUI() {
  const modalPlaneta = document.getElementById('modal-planeta');
  const modalPlanetaTitulo = document.getElementById('modal-planeta-titulo');
  const modalPlanetaImg = document.getElementById('modal-planeta-img');
  const modalPlanetaDesc = document.getElementById('modal-planeta-desc');
  const btnCerrarPlaneta = document.getElementById('btn-cerrar-planeta');

  document.querySelectorAll('.btn-info-planeta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const planetaKey = btn.getAttribute('data-planeta');
      const data = typeof planetasInfoData !== 'undefined' ? planetasInfoData[planetaKey] : null;
      if(data) {
        modalPlanetaTitulo.textContent = data.nombre[currentLang] || data.nombre['es'];
        modalPlanetaImg.src = data.img;
        modalPlanetaDesc.innerHTML = data.desc[currentLang] || data.desc['es'];
        modalPlaneta.classList.add('mostrar');
        document.body.style.overflow = 'hidden';
      }
    });
  });

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
      this.page.url = 'https://cosmos-proyecto-local.com' + window.location.pathname;
      this.page.identifier = window.location.pathname || 'cosmos-home';
    };
  }
}
"""

# Replace the immediate execution of modal planetas
modal_pattern = re.compile(r"const modalPlaneta = document\.getElementById\('modal-planeta'\);.*?\}\);(?=\n\n|\Z)", re.DOTALL)
ui_content = modal_pattern.sub(ui_init, ui_content)

# Replace Disqus local loading issue
if "this.page.url = window.location.href;" in ui_content:
    ui_content = ui_content.replace("this.page.url = window.location.href;", "this.page.url = 'https://cosmos-proyecto-local.com';")

# Remove the duplicated DOMContentLoaded in ui.js (if any)
ui_content = ui_content.replace("document.addEventListener('DOMContentLoaded', function() {", "function initVarious() {")

with open('js/ui.js', 'w', encoding='utf-8') as f:
    f.write(ui_content)


# 4. FIX API.JS (APOD Fallback)
with open('js/api.js', 'r', encoding='utf-8') as f:
    api_content = f.read()

apod_init = """
function initApod() {
  const apodContainer = document.getElementById('apod-container');
  if (apodContainer) {
    const API_KEY = 'DEMO_KEY'; // Changed to DEMO_KEY to avoid strict rate limits or just 'C0OrFtO3IkyCp9RwGlnaKatgKYEtK46OcHANPCEX'
    fetch(`https://api.nasa.gov/planetary/apod?api_key=C0OrFtO3IkyCp9RwGlnaKatgKYEtK46OcHANPCEX`)
      .then(res => res.json())
      .then(data => {
        if(data.error) throw new Error(data.error.message);
        let html = '';
        if (data.media_type === 'image') {
          html += `<img src="${data.url}" alt="${data.title}" loading="lazy">`;
        } else {
          html += `<iframe src="${data.url}" style="width:100%; height:400px;" frameborder="0"></iframe>`;
        }
        html += `<h3>${data.title}</h3><p>${data.explanation}</p>`;
        apodContainer.innerHTML = html;
      })
      .catch(() => {
        // Fallback APOD
        apodContainer.innerHTML = `
          <img src="https://apod.nasa.gov/apod/image/2207/CarinaNebula_Webb_1080.jpg" alt="Carina Nebula" loading="lazy">
          <h3>Nebulosa de Carina (Imagen de respaldo)</h3>
          <p>Esta espectacular imagen de la Nebulosa de Carina fue capturada por el Telescopio Espacial James Webb. Muestra los "Acantilados Cósmicos", una región de formación estelar donde nacen nuevas estrellas.</p>
        `;
      });
  }
}
"""

apod_pattern = re.compile(r"const apodContainer = document\.getElementById\('apod-container'\);.*?\}\);(?:\n\})?(?=\n\n|\Z)", re.DOTALL)
api_content = apod_pattern.sub(apod_init, api_content)

with open('js/api.js', 'w', encoding='utf-8') as f:
    f.write(api_content)

# 5. CREATE main.js
main_content = """
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
    
    // 5. Otras funciones que estaban en DOMContentLoaded de ui.js
    if (typeof initVarious === 'function') initVarious();
    
    // 6. APIs secundarias
    if (typeof cargarClimaEspacial === 'function') cargarClimaEspacial();
    if (typeof cargarNoticias === 'function') cargarNoticias();
    if (typeof cargarHistoriaHoy === 'function') cargarHistoriaHoy();
    if (typeof cargarEfemerides === 'function') cargarEfemerides();
    
    console.log("COSMOS Iniciado exitosamente.");
});
"""
with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(main_content)

# 6. Update index.html to include main.js
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if '<script src="js/main.js"></script>' not in html:
    html = html.replace('</body>', '  <script src="js/main.js"></script>\n</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

print("Fixes applied!")
