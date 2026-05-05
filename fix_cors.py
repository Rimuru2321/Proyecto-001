import json
import re

def create_lang_js(json_path, js_path, var_name):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = f.read()
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(f"const {var_name} = {data};\n")

create_lang_js('lang/es.json', 'lang/es.js', 'langES')
create_lang_js('lang/en.json', 'lang/en.js', 'langEN')

# Update script.js to use the variables instead of fetch
with open('js/script.js', 'r', encoding='utf-8') as f:
    script_content = f.read()

# Replace the fetch logic in cargarIdioma
old_fetch = """async function cargarIdioma(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const data = await response.json();
    translations[lang] = data;"""

new_fetch = """async function cargarIdioma(lang) {
  try {
    // Usamos las variables globales cargadas directamente en el HTML para evitar errores de CORS en file:///
    const data = lang === 'es' ? langES : langEN;
    translations[lang] = data;"""

script_content = script_content.replace(old_fetch, new_fetch)

with open('js/script.js', 'w', encoding='utf-8') as f:
    f.write(script_content)

# Update index.html to include the language scripts
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

if '<script src="lang/es.js"></script>' not in html_content:
    html_content = html_content.replace('<script src="js/script.js"></script>', 
        '<script src="lang/es.js"></script>\n  <script src="lang/en.js"></script>\n  <script src="js/script.js"></script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("CORS Fix applied successfully.")
