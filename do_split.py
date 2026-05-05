import os

def split_js():
    with open('js/script.js', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    def extract_section(start_marker):
        start_idx = -1
        for i, line in enumerate(lines):
            if line.startswith(start_marker):
                start_idx = i
                break
        if start_idx == -1: return []
        
        end_idx = len(lines)
        for i in range(start_idx + 1, len(lines)):
            if lines[i].startswith('// ===') or lines[i].startswith('// =========='):
                end_idx = i
                break
        
        section = lines[start_idx:end_idx]
        del lines[start_idx:end_idx]
        return section

    # Extract sections by exact marker
    i18n_content = extract_section('// ========== IDIOMA (i18n) ==========')
    quiz_content = extract_section('// === 12. QUIZ MEJORADO (12 preguntas) ===')
    calc_edad = extract_section('// ========== CALCULADORA DE EDAD PLANETARIA ==========')
    calc_peso = extract_section('// ========== CALCULADORA DE PESO EN OTROS PLANETAS ==========')
    
    # We must handle the special character encoding if any, so we use string matching cautiously
    # We can match by a distinctive part of the comment
    def extract_by_substring(substring):
        start_idx = -1
        for i, line in enumerate(lines):
            if substring in line and (line.startswith('// ===') or line.startswith('// ==========')):
                start_idx = i
                break
        if start_idx == -1: return []
        
        end_idx = len(lines)
        for i in range(start_idx + 1, len(lines)):
            if lines[i].startswith('// ===') or lines[i].startswith('// =========='):
                end_idx = i
                break
        
        section = lines[start_idx:end_idx]
        del lines[start_idx:end_idx]
        return section

    comp_tam = extract_by_substring('COMPARADOR DE TAMA')
    bot_content = extract_by_substring('COSMOBOT AI LOCAL')
    apod_content = extract_by_substring('NASA APOD')
    clima_content = extract_by_substring('CLIMA ESPACIAL')
    noticias_content = extract_by_substring('NOTICIAS MEJORADAS')

    def write_file(filename, content):
        if not content: return
        with open(filename, 'w', encoding='utf-8') as f:
            f.writelines(content)

    write_file('js/i18n.js', i18n_content)
    write_file('js/quiz.js', quiz_content)
    write_file('js/calculators.js', calc_edad + ['\n'] + calc_peso + ['\n'] + comp_tam)
    write_file('js/api.js', apod_content + ['\n'] + clima_content + ['\n'] + noticias_content)
    write_file('js/bot.js', bot_content)

    # Whatever is left is the UI logic
    with open('js/ui.js', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    # Update index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    scripts = """
  <script src="js/i18n.js"></script>
  <script src="js/api.js"></script>
  <script src="js/calculators.js"></script>
  <script src="js/quiz.js"></script>
  <script src="js/bot.js"></script>
  <script src="js/ui.js"></script>
"""
    # Replace the old script.js tag, but remember we just added es.js and en.js before it in the CORS fix!
    # Let's just find where js/script.js is and replace it
    if '<script src="js/script.js"></script>' in html:
        html = html.replace('<script src="js/script.js"></script>', scripts.strip())
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("index.html updated successfully!")
        # We can delete js/script.js since it's now split
        os.remove('js/script.js')
    else:
        print("Could not find <script src=\"js/script.js\"></script> in index.html")

split_js()
print("Split complete!")
