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

  // Ajustar canvas al ancho real del contenedor (responsive)
  const wrapper = canvas.parentElement;
  const W = wrapper ? wrapper.clientWidth || 800 : 800;
  const H = Math.round(W * 0.5);   // ratio 2:1
  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  // Fondo
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, W, H);

  // Calcular el radio máximo seleccionado
  let maxRadio = 0;
  planetasData.forEach(p => {
    const checkbox = document.getElementById(p.id);
    if (checkbox && checkbox.checked) maxRadio = Math.max(maxRadio, p.radio);
  });
  if (maxRadio === 0) {
    ctx.font = `${Math.max(12, W * 0.02)}px "Orbitron", sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('Selecciona al menos un planeta', W / 2, H / 2);
    return;
  }

  // Escala: el más grande ocupa como máximo H*0.35 de radio
  const maxRadioPx = H * 0.35;
  const escala = maxRadioPx / maxRadio;

  // Contar planetas seleccionados para espaciado
  const seleccionados = planetasData.filter(p => {
    const cb = document.getElementById(p.id);
    return cb && cb.checked;
  });
  const count = seleccionados.length;
  const stepX = W / (count + 1);

  seleccionados.forEach((p, index) => {
    const radioPx  = p.radio * escala;
    const radioFinal = Math.max(radioPx, 4);
    const radioDibujo = Math.min(radioFinal, maxRadioPx);

    const x = stepX * (index + 1);
    const y = H / 2;

    ctx.beginPath();
    ctx.arc(x, y, radioDibujo, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = 'rgba(255,255,255,0.5)';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = Math.max(1, W * 0.002);
    ctx.stroke();

    const fs = Math.max(8, Math.round(W * 0.018));
    ctx.font = `bold ${fs}px "Orbitron", sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(p.nombre, x, Math.min(y + radioDibujo + fs + 4, H - fs * 2 - 4));

    ctx.font = `${Math.max(7, fs - 2)}px "Rajdhani", sans-serif`;
    ctx.fillStyle = 'rgba(200,216,240,0.9)';
    ctx.fillText(`${(p.radio * 2).toLocaleString()} km`, x, Math.min(y + radioDibujo + fs * 2 + 6, H - 4));
  });
}

// Re-dibujar al redimensionar la ventana (portrait ↔ landscape en móvil)
if (typeof ResizeObserver !== 'undefined') {
  const comparadorCanvas = document.getElementById('comparador-canvas');
  if (comparadorCanvas) {
    new ResizeObserver(() => dibujarComparador()).observe(comparadorCanvas.parentElement);
  }
}

