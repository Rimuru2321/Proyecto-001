// ================= COSMOBOT AI LOCAL =================
// Base de conocimientos del sitio COSMOS (bilingüe)
const COSMOS_KNOWLEDGE = {
  // Secciones del sitio
  secciones: {
    es: {
      'galaxia': 'La Vía Láctea es nuestra galaxia espiral barrada. Contiene unos 300 mil millones de estrellas y tiene 100,000 años luz de diámetro.',
      'planetas': 'El sistema solar tiene 8 planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno.',
      'agujero-negro': 'Sagitario A* es el agujero negro supermasivo en el centro de nuestra galaxia con 4 millones de masas solares.',
      'nebulosas': 'Las nebulosas son nubes de gas y polvo donde nacen nuevas estrellas. Las más famosas son Orión, la Laguna y la del Carbunclo.',
      'luna': 'La Luna es el único satélite natural de la Tierra. Está a 384,400 km y tiene un diámetro de 3,474 km.',
      'sistema-solar': 'El Sistema Solar está formado por el Sol, 8 planetas, satélites, asteroides, cometas y otros cuerpos celestes.',
      'curiosidades': 'Datos curiosos: el lugar más frío del universo es la Nebulosa Boomerang (-272°C), hay nubes de alcohol en el espacio, y la Vía Láctea es "caníbal".',
      'eventos-2026': 'Eventos astronómicos 2026: Eclipse lunar total en marzo, eclipse solar en agosto visible en España, Perseidas en agosto, y oposiciones de Júpiter y Saturno.',
      'mitos-leyendas': 'Las constelaciones tienen historias fascinantes: Orión el cazador, Casiopea la vanidosa, Andrómeda la princesa encadenada.',
      'calculadora-edad': 'Calcula tu edad en diferentes planetas. Cada planeta tiene un año de duración diferente: Mercurio = 88 días, Neptuno = 165 años terrestres.',
      'calculadora-peso': 'Calcula tu peso en otros cuerpos del sistema solar. Tu peso varía por la gravedad: en Marte pesas 38% de tu peso en Tierra.',
      'comparador': 'Compara los tamaños de todos los planetas del sistema solar visualmente. El Sol es enorme comparado con la Tierra.',
      'efemerides': 'Las efemérides muestran la salida y puesta del Sol, fase lunar y visibilidad de planetas según tu ubicación.',
      'clima-espacial': 'El clima espacial monitorea el viento solar, tormentas geomagnéticas y actividad solar que puede afectar la Tierra.',
      'noticias': 'Últimas noticias de astronomía de la NASA y otros organismos espaciales.',
      'apod': 'La NASA Picture of the Day muestra una imagen o video astronómico diferente cada día.',
      'quiz': 'Pon a prueba tus conocimientos de astronomía con nuestro cuestionario interactivo.',
      'misiones': 'Misiones actuales: Artemis II (2026) es la misión tripulada más histórica en 60 años - los astronautas llegaron a la cara oculta de la Luna. También Perseverance en Marte, Webb, Voyager, y más.'
    },
    en: {
      'galaxia': 'The Milky Way is our barred spiral galaxy. It contains about 300 billion stars and is 100,000 light-years in diameter.',
      'planetas': 'The solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.',
      'agujero-negro': 'Sagittarius A* is the supermassive black hole at the center of our galaxy with 4 million solar masses.',
      'nebulosas': 'Nebulae are clouds of gas and dust where new stars are born. The most famous are Orion, Lagoon and Carbuncle.',
      'luna': 'The Moon is Earth\'s only natural satellite. It is 384,400 km away and has a diameter of 3,474 km.',
      'sistema-solar': 'The Solar System is made up of the Sun, 8 planets, moons, asteroids, comets and other celestial bodies.',
      'curiosidades': 'Fun facts: the coldest place in the universe is the Boomerang Nebula (-272°C), there are alcohol clouds in space, and the Milky Way is "cannibal".',
      'eventos-2026': '2026 astronomical events: Total lunar eclipse in March, solar eclipse in August visible in Spain, Perseids in August, Jupiter and Saturn oppositions.',
      'mitos-leyendas': 'Constellations have fascinating stories: Orion the hunter, Cassiopeia the vain, Andromeda the chained princess.',
      'calculadora-edad': 'Calculate your age on different planets. Each planet has a different year length: Mercury = 88 days, Neptune = 165 Earth years.',
      'calculadora-peso': 'Calculate your weight on other bodies in the solar system. Your weight varies by gravity: on Mars you weigh 38% of your Earth weight.',
      'comparador': 'Compare the sizes of all the planets in the solar system visually. The Sun is huge compared to Earth.',
      'efemerides': 'Ephemerides show sunrise and sunset, moon phase and planet visibility based on your location.',
      'clima-espacial': 'Space weather monitors solar wind, geomagnetic storms and solar activity that can affect Earth.',
      'noticias': 'Latest astronomy news from NASA and other space agencies.',
      'apod': 'NASA Picture of the Day shows a different astronomical image or video every day.',
      'quiz': 'Test your knowledge of astronomy with our interactive quiz.',
      'misiones': 'Current missions: Artemis II (2026) is the most historic crewed mission in 60 years - astronauts reached the Moon\'s far side. Also Perseverance on Mars, Webb, Voyager, and more.'
    }
  },

  // Preguntas frecuentes
  faq: {
    es: {
      'que es la via lactea': 'La Vía Láctea es nuestra galaxia. Es una espiral barrada con unos 300 mil millones de estrellas, incluyendo nuestro Sol. Tiene 100,000 años luz de diámetro.',
      'cuantos planetas hay': 'Hay 8 planetas en nuestro sistema solar: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Plutón es un planeta enano.',
      'que es un agujero negro': 'Un agujero negro es una región del espacio donde la gravedad es tan intensa que nada, ni siquiera la luz, puede escapar. El nuestro se llama Sagitario A*.',
      'que es una nebulosa': 'Las nebulosas son enormes nubes de gas y polvo donde nacen nuevas estrellas. Son como guarderías estelares.',
      'cuantos anos tiene el universo': 'El universo tiene aproximadamente 13.8 mil millones de años. Se estima que el Big Bang ocurrió hace unos 13,800 millones de años.',
      'que es artemis': 'Artemis es el programa de la NASA para volver a la Luna. Artemis II (2026) llevó astronautas a la cara oculta de la Luna por primera vez en la historia - el viaje tripulado más lejano jamás realizado.',
      'quienes son los astronautas de artemis': 'Los 4 astronautas de Artemis II son: Reid Wiseman (comandante), Victor Glover (piloto), Christina Koch (especialista) y Jeremy Hansen (Canadá). ¡Christina Koch se convirtió en la mujer que ha viajado más lejos en el espacio!'
    },
    en: {
      'what is the milky way': 'The Milky Way is our galaxy. It is a barred spiral with about 300 billion stars, including our Sun. It is 100,000 light-years in diameter.',
      'how many planets are there': 'There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Pluto is a dwarf planet.',
      'what is a black hole': 'A black hole is a region of space where gravity is so intense that nothing, not even light, can escape. ours is called Sagittarius A*.',
      'what is a nebula': 'Nebulae are huge clouds of gas and dust where new stars are born. They are like stellar nurseries.',
      'how old is the universe': 'The universe is approximately 13.8 billion years old. The Big Bang is estimated to have occurred about 13.8 billion years ago.',
      'what is artemis': 'Artemis is NASA\'s program to return to the Moon. Artemis II (2026) took astronauts to the far side of the Moon for the first time in history - the farthest crewed journey ever made.',
      'who are the artemis astronauts': 'The 4 Artemis II astronauts are: Reid Wiseman (commander), Victor Glover (pilot), Christina Koch (specialist) and Jeremy Hansen (Canada). Christina Koch became the woman who has traveled farthest in space!'
    }
  },

  // Respuestas directas
respuestas: {
    es: {
      'hola': '¡Hola! 👋 Soy CosmoBot, tu asistente de astronomía. Pregúntame sobre el universo, planetas, galaxias... o dime "vámonos a [sección]" para navegar.',
      'como estas': '¡Muy bien, gracias! 🌟 Estoy listo para ayudarte a explorar el cosmos. ¿Qué te gustaría saber?',
      'como estas?': '¡Genial! ✨ Estoy al servicio del universo. ¿Sobre qué quieres aprender?',
      'que tal': '¡Todo listo para explorar! 🚀 ¿Qué tema astronómico te interesa?',
      'que haces': '¡Esperando tu pregunta! ⭐ ¿Quieres descubrir algo sobre el espacio?',
      'buenos dias': '¡Buenos días! 🌞 ¿Te interesa aprender algo sobre el cosmos hoy?',
      'buenas tardes': '¡Buenas tardes! 🌙 ¿Qué te gustaría descubrir del universo?',
      'buenas noches': '¡Buenas noches! ⭐ ¿Te intriga algo del espacio?',
      'gracias': '¡De nada! 😊 Si tienes más preguntas sobre el cosmos, aquí estaré.',
      'muchas gracias': '¡Con mucho gusto! 🌟 Cualquier duda sobre el universo, aquí estaré.',
      'adios': '¡Hasta luego! 🚀 Que tengas una buena exploración del universo. Vuelve cuando quieras.',
      'bye': '¡Chao! 👋 Siempre puedes volver para más información astronómica.',
      ' Chau': '¡Bye! 👋 Nos vemos en las estrellas!',
      'quien eres': '👽 Soy CosmoBot, tu asistente virtual de astronomía. Estoy aquí para responder tus preguntas sobre el cosmos.',
      'como te llamas': '¡Me dicen CosmoBot! 😎 El robot explorador del universo.',
      'cual es tu nombre': 'Mi nombre es CosmoBot 🌌 Estoy para ayudarte a explorar el espacio.',
      'estas vivo': '¡Estoy activo! 🤖 Siempre listo para conversar de astronomía.',
      'puedes ayudarme': '¡Por supuesto! 💫 ¿Qué necesitas saber sobre el universo?',
      'ayudame': '¡Aquí estoy! 🌠 Pregúntame sobre planetas, galaxias, agujeros negros...',
      'que sabes': '¡Sé mucho sobre astronomía! 🌌 Puedo hablarte de galaxias, planetas, nebulosas, eclipses, misiones espaciales y mucho más.',
      'explicame': '¡Con gusto! 📚 ¿Qué tema quieres que te explique?',
      'quiero aprender': '¡Excelente! 🎓 El universo está lleno de maravillas. ¿Qué tema te interesa más?',
      'dime algo': '¿Sabías que en el centro de nuestra galaxia hay un agujero negro supermasivo llamado Sagitario A*? 🕳️',
      'un dato': 'El universo tiene aproximadamente 13,800 millones de años 📅',
      'que interesante': '¡El cosmos está lleno de misterios fascinantes! 🔭 ¿Quieres saber más?',
      'wow': '¡El universo es increíble! 🌌 ¿Qué más quieres descubrir?',
      'genial': '¡A la orden! 🚀 ¿Qué tema exploramos ahora?',
      'perfecto': '¡Perfecto! ✨ ¿En qué más te ayudo?',
      'ok': '¡Ok! 👍 ¿Tienes otra pregunta sobre el espacio?',
      'si': '¡Perfecto! 👍 ¿Qué tema astronómico te gustaría explorar?',
      'no': '¡No hay problema! 😊 ¿Quizás otro tema?',
      'tal vez': '¡Claro! 🤔 Cuando decidas qué saber, aquí estaré.',
      'maybe': '¡Tú decides! 🌟 ¿Sobre qué quieres aprender?',
      'me aburr': '¡Vamos a explorar algo emocionante! 🌠 ¿Qué tal aprender sobre los planetas?',
      'tengo curiosidad': '¡La curiosidad es la clave del universo! 🔑 Pregúntame lo que quieras.',
      'me intere': '¡Qué bueno! 📖 ¿Qué aspecto del cosmos te llama la atención?',
      'me gustaria': '¡Dime qué te gustaría saber! 🌌 Estoy para ayudarte.',
      'necesito info': '¡Tengo información espacial! 📚 ¿Qué necesitas saber?',
      'tu nombre': 'Soy CosmoBot 🌟 Tu asistente de astronomía.',
      'tu edad': '¡Tengo la edad del universo! 🌌 Bueno, más o menos... 13,800 millones de años 🕰️'
    },
    en: {
      'hello': 'Hello! 👋 I\'m CosmoBot, your astronomy assistant. Ask me about the universe, planets, galaxies... or say "go to [section]" to navigate.',
      'how are you': 'I\'m great! 🌟 Ready to help you explore the cosmos. What would you like to know?',
      'how are you?': 'Awesome! ✨ Here, serving the universe. What do you want to learn about?',
      'what\'s up': 'All ready for exploration! 🚀 What astronomy topic interests you?',
      'what are you doing': 'Waiting for your question! ⭐ Do you want to discover something about space?',
      'good morning': 'Good morning! 🌞 Interested in learning about the cosmos today?',
      'good afternoon': 'Good afternoon! 🌙 What would you like to discover about the universe?',
      'good night': 'Good night! ⭐ Is there something about space that intrigues you?',
      'thanks': 'You\'re welcome! 😊 If you have more questions about the cosmos, I\'ll be here.',
      'thank you': 'My pleasure! 🌟 Any questions about the universe, I\'ll be here.',
      'goodbye': 'See you later! 🚀 Have a great exploration of the universe. Come back anytime.',
      'bye': 'Bye! 👋 You can always come back for more astronomy info.',
      'who are you': '👽 I\'m CosmoBot, your virtual astronomy assistant. I\'m here to answer your questions about the cosmos.',
      'what\'s your name': 'I\'m CosmoBot! 😎 The universe explorer robot.',
      'are you alive': 'I\'m active! 🤖 Always ready to talk astronomy.',
      'can you help me': 'Of course! 💫 What do you need to know about the universe?',
      'help me': 'I\'m here! 🌠 Ask me about planets, galaxies, black holes...',
      'what do you know': 'I know a lot about astronomy! 🌌 I can tell you about galaxies, planets, nebulae, eclipses, space missions, and more.',
      'explain': 'With pleasure! 📚 What topic do you want me to explain?',
      'i want to learn': 'Excellent! 🎓 The universe is full of wonders. What topic interests you most?',
      'tell me something': 'Did you know that at the center of our galaxy there\'s a supermassive black hole called Sagittarius A*? 🕳️',
      'a fact': 'The universe is approximately 13.8 billion years old 📅',
      'interesting': 'The cosmos is full of fascinating mysteries! 🔭 Want to know more?',
      'wow': 'The universe is incredible! 🌌 What else do you want to discover?',
      'great': 'At your service! 🚀 What topic shall we explore now?',
      'perfect': 'Great! ✨ What else can I help you with?',
      'ok': 'Okay! 👍 Have another question about space?',
      'yes': 'Perfect! 👍 What astronomical topic would you like to explore?',
      'no': 'No problem! 😊 Maybe another topic?',
      'maybe': 'You decide! 🌟 What do you want to learn about?',
      'i\'m bored': 'Let\'s explore something exciting! 🌠 How about learning about the planets?',
      'i\'m curious': 'Curiosity is the key to the universe! 🔑 Ask me anything.',
      'i\'m interested': 'Great! 📖 What aspect of the cosmos catches your attention?',
      'i would like': 'Tell me what you\'d like to know! 🌌 I\'m here to help.',
      'i need info': 'I have space information! 📚 What do you need to know?',
      'your name': 'I\'m CosmoBot 🌟 Your astronomy assistant.',
      'your age': 'I have the age of the universe! 🌌 Well, more or less... 13.8 billion years 🕰️'
    }
  },

  // Palabras clave para búsquedas
  palabras: {
    es: {
      'via lactea': 'galaxia', 'vía láctea': 'galaxia', 'milky way': 'galaxia',
      'agujero negro': 'agujero-negro', 'black hole': 'agujero-negro', 'sagitario a': 'agujero-negro',
      'planeta': 'planetas', 'planetas': 'planetas', 'mercurio': 'planetas', 'venus': 'planetas', 'tierra': 'planetas', 'marte': 'planetas', 'jupiter': 'planetas', 'saturno': 'planetas', 'urano': 'planetas', 'neptuno': 'planetas',
      'sol': 'sistema-solar', 'luna': 'luna', 'moon': 'luna',
      'nebulosa': 'nebulosas', 'estrella': 'curiosidades', 'eclipse': 'eventos-2026', 'cometa': 'curiosidades',
      'constelacion': 'mitos-leyendas', 'mision': 'misiones', 'nasa': 'noticias',
      'peso': 'calculadora-peso', 'edad': 'calculadora-edad', 'comparar': 'comparador', 'tamanio': 'comparador',
      'efemeride': 'efemerides', 'clima espacial': 'clima-espacial', 'quiz': 'quiz', 'test': 'quiz',
      'apod': 'apod', 'foto del dia': 'apod'
    },
    en: {
      'milky way': 'galaxia', 'galaxy': 'galaxia',
      'black hole': 'agujero-negro', 'sagittarius a': 'agujero-negro',
      'planet': 'planetas', 'planets': 'planetas', 'mercury': 'planetas', 'venus': 'planetas', 'earth': 'planetas', 'mars': 'planetas', 'jupiter': 'planetas', 'saturn': 'planetas', 'uranus': 'planetas', 'neptune': 'planetas',
      'sun': 'sistema-solar', 'moon': 'luna',
      'nebula': 'nebulosas', 'star': 'curiosidades', 'eclipse': 'eventos-2026', 'comet': 'curiosidades',
      'constellation': 'otros-leyendas', 'mission': 'misiones', 'nasa': 'noticias',
      'weight': 'calculadora-peso', 'age': 'calculadora-edad', 'compare': 'comparador', 'size': 'comparador',
      'ephemeris': 'efemerides', 'space weather': 'clima-espacial', 'quiz': 'quiz', 'test': 'quiz',
      'apod': 'apod', 'picture of the day': 'apod'
    }
  }
};

// Helper function to get content by language
function getCosmosContent(key, type = 'secciones') {
  const lang = currentLang || 'es';
  const content = COSMOS_KNOWLEDGE[type]?.[lang];
  if (content && content[key]) {
    return content[key];
  }
  // Fallback to Spanish
  const fallback = COSMOS_KNOWLEDGE[type]?.es;
  return fallback ? fallback[key] : null;
}

// Historial de conversación para aprendizaje

// Historial de conversación para aprendizaje
let conversacionHistorial = [];
try { conversacionHistorial = JSON.parse(localStorage.getItem('cosmos_chat_historial') || '[]'); } catch(e) {}

// Guardar conversación
function guardarConversacion(mensaje, respuesta) {
  conversacionHistorial.push({
    mensaje: mensaje.toLowerCase(),
    respuesta: respuesta,
    timestamp: Date.now()
  });
  // Mantener solo los últimos 50 mensajes
  if (conversacionHistorial.length > 50) {
    conversacionHistorial = conversacionHistorial.slice(-50);
  }
  try { localStorage.setItem('cosmos_chat_historial', JSON.stringify(conversacionHistorial)); } catch(e) {}
}

// Buscar en conversaciones previas (aprendizaje)
function buscarEnHistorial(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  // Buscar frases similares en el historial
  for (let i = conversacionHistorial.length - 1; i >= 0; i--) {
    const item = conversacionHistorial[i];
    // Verificar si hay palabras en común significativas
    const palabrasPregunta = preguntaLower.split(' ').filter(p => p.length > 3);
    const palabrasHistorial = item.mensaje.split(' ').filter(p => p.length > 3);
    const coincidencias = palabrasPregunta.filter(p => palabrasHistorial.includes(p));
    if (coincidencias.length >= 2) {
      return `Basedo en nuestra conversación anterior: ${item.respuesta}`;
    }
  }
  return null;
}

// Procesar mensaje del usuario (bilingüe)
function procesarMensaje(mensaje) {
  const msg = mensaje.toLowerCase().trim();
  const lang = currentLang || 'es';
  
  // Navigation commands (bilingual)
  const navigatePatterns = {
    es: ['llévame', 'vete', 've a', 'mostrar', 'abrir', 'ir a'],
    en: ['take me', 'go to', 'show', 'open', 'go to']
  };
  
  for (const pattern of navigatePatterns[lang] || navigatePatterns.es) {
    const navegarMatch = msg.match(new RegExp(`(?:${pattern})\\s+([a-záéíóúñ]+)`, 'i'));
    if (navegarMatch) {
      const seccion = navegarMatch[1].toLowerCase();
      if (seccion.includes('planet') || seccion.includes('planeta')) return { tipo: 'navegar', seccion: 'planetas' };
      if (seccion.includes('agujero') || seccion.includes('negro') || seccion.includes('black')) return { tipo: 'navegar', seccion: 'agujero-negro' };
      if (seccion.includes('nebulos') || seccion.includes('nebula')) return { tipo: 'navegar', seccion: 'nebulosas' };
      if (seccion.includes('curiosidad') || seccion.includes('dato') || seccion.includes('fact')) return { tipo: 'navegar', seccion: 'curiosidades' };
      if (seccion.includes('luna') || seccion.includes('moon')) return { tipo: 'navegar', seccion: 'luna' };
      if (seccion.includes('sistema') || seccion.includes('system')) return { tipo: 'navegar', seccion: 'sistema-solar' };
      if (seccion.includes('quiz') || seccion.includes('test')) return { tipo: 'navegar', seccion: 'quiz' };
      if (seccion.includes('evento') || seccion.includes('2026')) return { tipo: 'navegar', seccion: 'eventos-2026' };
      if (seccion.includes('calculadora') || seccion.includes('edad') || seccion.includes('age')) return { tipo: 'navegar', seccion: 'calculadora-edad' };
      if (seccion.includes('peso') || seccion.includes('weight')) return { tipo: 'navegar', seccion: 'calculadora-peso' };
      if (seccion.includes('comparar') || seccion.includes('compare')) return { tipo: 'navegar', seccion: 'comparador' };
      if (seccion.includes('efemerid') || seccion.includes('ephemer')) return { tipo: 'navegar', seccion: 'efemerides' };
      if (seccion.includes('clima') || seccion.includes('weather')) return { tipo: 'navegar', seccion: 'clima-espacial' };
      if (seccion.includes('noticia') || seccion.includes('news')) return { tipo: 'navegar', seccion: 'noticias' };
      if (seccion.includes('apod') || seccion.includes('foto')) return { tipo: 'navegar', seccion: 'apod' };
      if (seccion.includes('galaxia') || seccion.includes('galaxy')) return { tipo: 'navegar', seccion: 'galaxia' };
      if (seccion.includes('mision') || seccion.includes('mission')) return { tipo: 'navegar', seccion: 'misiones' };
      if (seccion.includes('mito') || seccion.includes('leyenda') || seccion.includes('myth')) return { tipo: 'navegar', seccion: 'otros-leyendas' };
    }
  }
  
  // 2. Check direct responses
  const respuestas = COSMOS_KNOWLEDGE.respuestas[lang] || COSMOS_KNOWLEDGE.respuestas.es;
  for (const [key, value] of Object.entries(respuestas)) {
    if (msg.includes(key)) {
      return { tipo: 'respuesta', texto: value };
    }
  }
  
  // 3. Check FAQ
  const faq = COSMOS_KNOWLEDGE.faq[lang] || COSMOS_KNOWLEDGE.faq.es;
  for (const [key, value] of Object.entries(faq)) {
    if (msg.includes(key)) {
      return { tipo: 'respuesta', texto: value };
    }
  }
  
  // 4. Check previous conversations
  const aprendizaje = buscarEnHistorial(msg);
  if (aprendizaje) {
    return { tipo: 'respuesta', texto: aprendizaje };
  }
  
  // 5. Search keywords for navigation
  const palabras = COSMOS_KNOWLEDGE.palabras[lang] || COSMOS_KNOWLEDGE.palabras.es;
  for (const [key, seccion] of Object.entries(palabras)) {
    if (msg.includes(key)) {
      const infoSeccion = getCosmosContent(seccion, 'secciones');
      const msgPrefix = lang === 'es' ? '¡Qué interesante! ' : 'Interesting! ';
      const navSuffix = lang === 'es' ? ` ¿Te gustaría que te lleve a ver más sobre ${seccion}?` : ` Would you like me to take you to see more about ${seccion}?`;
      return { tipo: 'navegar', seccion: seccion, mensaje: msgPrefix + infoSeccion + navSuffix };
    }
  }
  
  // 6. Default response
  const helpText = lang === 'es' 
    ? `¡Qué pregunta tan fascinante! 🎯 Puedo ayudarte con:\n\n📚 **Temas que conozco:**\n• La Vía Láctea y otras galaxias\n• Los 8 planetas del sistema solar\n• Agujeros negros y nebulosas\n• Eclipses y eventos astronómicos\n• Calculadoras de edad y peso planetario\n• Efemérides y clima espacial\n• Historia de la astronomía y mitos\n• Misiones espaciales y noticias NASA\n\n📍 **Navegación:**\nDi "vámonos a planetas", "quiero ver la luna", "abre el quiz"\n\n🔭 ¿Sobre qué tema quieres saber más?`
    : `What a fascinating question! 🎯 I can help you with:\n\n📚 **Topics I know:**\n• The Milky Way and other galaxies\n• The 8 planets of the solar system\n• Black holes and nebulae\n• Eclipses and astronomical events\n• Age and weight calculators\n• Ephemerides and space weather\n• Astronomy history and myths\n• Space missions and NASA news\n\n📍 **Navigation:**\nSay "go to planets", "I want to see the moon", "open quiz"\n\n🔭 What topic would you like to know more about?`;
  
  return { tipo: 'ayuda', texto: helpText };
}

// Inicializar el bot

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
    try { localStorage.removeItem('cosmos_chat_historial'); } catch(e) {}
  };
}
