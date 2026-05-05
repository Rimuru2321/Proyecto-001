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

