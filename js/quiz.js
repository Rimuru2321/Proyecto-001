// === 12. QUIZ MEJORADO (12 preguntas) ===
const preguntasQuiz = [
  { preguntaKey: "quiz_pregunta1", opcionesKey: ["quiz_opcion1_1","quiz_opcion1_2","quiz_opcion1_3","quiz_opcion1_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta2", opcionesKey: ["quiz_opcion2_1","quiz_opcion2_2","quiz_opcion2_3","quiz_opcion2_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta3", opcionesKey: ["quiz_opcion3_1","quiz_opcion3_2","quiz_opcion3_3","quiz_opcion3_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta4", opcionesKey: ["quiz_opcion4_1","quiz_opcion4_2","quiz_opcion4_3","quiz_opcion4_4"], respuesta: 3 },
  { preguntaKey: "quiz_pregunta5", opcionesKey: ["quiz_opcion5_1","quiz_opcion5_2","quiz_opcion5_3","quiz_opcion5_4"], respuesta: 0 },
  { preguntaKey: "quiz_pregunta6", opcionesKey: ["quiz_opcion6_1","quiz_opcion6_2","quiz_opcion6_3","quiz_opcion6_4"], respuesta: 1 },
  { preguntaKey: "quiz_pregunta7", opcionesKey: ["quiz_opcion7_1","quiz_opcion7_2","quiz_opcion7_3","quiz_opcion7_4"], respuesta: 2 },
  // Nuevas preguntas (8 a 12)
  { 
    pregunta: "¿Cuál es la luna más grande del Sistema Solar?", 
    opciones: ["Europa", "Titán", "Ganímedes", "Calisto"], 
    respuesta: 2,
    preguntaKey: "quiz_pregunta8",
    opcionesKey: ["quiz_opcion8_1","quiz_opcion8_2","quiz_opcion8_3","quiz_opcion8_4"]
  },
  { 
    pregunta: "¿Qué misión de la NASA lleva el nombre de un famoso científico que estudió Marte?", 
    opciones: ["Perseverance", "Curiosity", "Insight", "Opportunity"], 
    respuesta: 1,
    preguntaKey: "quiz_pregunta9",
    opcionesKey: ["quiz_opcion9_1","quiz_opcion9_2","quiz_opcion9_3","quiz_opcion9_4"]
  },
  { 
    pregunta: "¿Cuál es la estrella más cercana al Sol?", 
    opciones: ["Alfa Centauri A", "Próxima Centauri", "Barnard", "Wolf 359"], 
    respuesta: 1,
    preguntaKey: "quiz_pregunta10",
    opcionesKey: ["quiz_opcion10_1","quiz_opcion10_2","quiz_opcion10_3","quiz_opcion10_4"]
  },
  { 
    pregunta: "¿Qué fenómeno ocurre cuando la Luna pasa entre el Sol y la Tierra?", 
    opciones: ["Eclipse lunar", "Eclipse solar", "Tránsito de Venus", "Ocultación"], 
    respuesta: 1,
    preguntaKey: "quiz_pregunta11",
    opcionesKey: ["quiz_opcion11_1","quiz_opcion11_2","quiz_opcion11_3","quiz_opcion11_4"]
  },
  { 
    pregunta: "¿Cuánto dura un día en Venus (en días terrestres)?", 
    opciones: ["24 horas", "243 días", "365 días", "10 horas"], 
    respuesta: 1,
    preguntaKey: "quiz_pregunta12",
    opcionesKey: ["quiz_opcion12_1","quiz_opcion12_2","quiz_opcion12_3","quiz_opcion12_4"]
  }
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
    let mensajeFinal = '';
    const porcentaje = (aciertos / preguntasQuiz.length) * 100;
    if (porcentaje >= 80) mensajeFinal = '🌟 ¡Genio cósmico! 🌟';
    else if (porcentaje >= 50) mensajeFinal = '✨ Buen astrónomo ✨';
    else mensajeFinal = '🌌 Sigue explorando... 🌌';
    contenedor.innerHTML = `¡Quiz completado! ${mensajeFinal}<br>Puntuación: ${aciertos}/${preguntasQuiz.length}`;
    opcionesDiv.innerHTML = '';
    siguienteBtn.style.display = 'none';
    reiniciarBtn.style.display = 'inline-block';
    puntuacion.textContent = `${translations[currentLang]?.quiz_puntuacion || 'Aciertos:'} ${aciertos}/${preguntasQuiz.length}`;
    return;
  }

  const q = preguntasQuiz[preguntaActual];
  // Usar traducciones si existen, sino el texto directo
  let preguntaTexto = translations[currentLang]?.[q.preguntaKey] || q.pregunta || q.preguntaKey;
  contenedor.textContent = preguntaTexto;
  
  opcionesDiv.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const opcionKey = q.opcionesKey ? q.opcionesKey[i] : null;
    const opcionesDirectas = q.opciones || [];
    let opcionTexto = '';
    if (opcionKey) {
      const traduccion = translations[currentLang]?.[opcionKey];
      const fallback = opcionesDirectas[i] || translations['en']?.[opcionKey] || '';
      opcionTexto = traduccion || fallback;
    } else {
      opcionTexto = opcionesDirectas[i] || '';
    }
    const btn = document.createElement('button');
    btn.className = 'opcion-btn';
    btn.textContent = opcionTexto;
    btn.dataset.indice = i;
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.opcion-btn').forEach(b => b.disabled = true);
      if (i === q.respuesta) {
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
  }
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

// Inicializar puntuación inicial visible
const _puntuacionInit = document.getElementById('puntuacion');
if (_puntuacionInit) _puntuacionInit.textContent = `Aciertos: 0 / ${preguntasQuiz.length}`;
