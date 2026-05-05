import os
import re

def safe_localstorage(match):
    original = match.group(0)
    # We will just replace common patterns manually to be safe
    return original

# 1. i18n.js
with open('js/i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("let currentLang = localStorage.getItem('idioma') || 'es';", """let currentLang = 'es';
try { currentLang = localStorage.getItem('idioma') || 'es'; } catch(e) {}""")

content = content.replace("localStorage.setItem('idioma', lang);", """try { localStorage.setItem('idioma', lang); } catch(e) {}""")

with open('js/i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. bot.js
with open('js/bot.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("let conversacionHistorial = JSON.parse(localStorage.getItem('cosmos_chat_historial') || '[]');", """let conversacionHistorial = [];
try { conversacionHistorial = JSON.parse(localStorage.getItem('cosmos_chat_historial') || '[]'); } catch(e) {}""")

content = content.replace("localStorage.setItem('cosmos_chat_historial', JSON.stringify(conversacionHistorial));", """try { localStorage.setItem('cosmos_chat_historial', JSON.stringify(conversacionHistorial)); } catch(e) {}""")

content = content.replace("localStorage.removeItem('cosmos_chat_historial');", """try { localStorage.removeItem('cosmos_chat_historial'); } catch(e) {}""")

with open('js/bot.js', 'w', encoding='utf-8') as f:
    f.write(content)

# 3. ui.js
with open('js/ui.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const aceptado = localStorage.getItem('terminosAceptados');", """let aceptado = null; try { aceptado = localStorage.getItem('terminosAceptados'); } catch(e) {}""")
content = content.replace("localStorage.setItem('terminosAceptados', 'true');", """try { localStorage.setItem('terminosAceptados', 'true'); } catch(e) {}""")
content = content.replace("localStorage.setItem('avisoEscritorioCerrado', 'true');", """try { localStorage.setItem('avisoEscritorioCerrado', 'true'); } catch(e) {}""")
content = content.replace("const avisoCerrado = localStorage.getItem('avisoEscritorioCerrado');", """let avisoCerrado = null; try { avisoCerrado = localStorage.getItem('avisoEscritorioCerrado'); } catch(e) {}""")

with open('js/ui.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("localStorage fixed!")
