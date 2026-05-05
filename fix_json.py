import re
import json

def fix_es():
    with open('lang/es.json', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find where the corruption starts
    start_idx = content.find('"evento_octubre_desc":')
    if start_idx == -1: return

    # Keep everything before the corruption
    clean_content = content[:start_idx]

    # Add the correct block to the end
    correct_block = """"evento_octubre_desc": "Andrómeda (M31) visible a simple vista en cielos oscuros.",
  "evento_noviembre_titulo": "Lluvia de Leónidas",
  "evento_noviembre_desc": "Hasta 15 meteoros por hora. Mejor observación de madrugada.",
  "evento_diciembre_titulo": "Geminidas",
  "evento_diciembre_desc": "Una de las mejores lluvias de meteoros del año (hasta 120 por hora).",
  "evento_enero_fecha": "10 de enero",
  "evento_febrero_fecha": "28 de febrero",
  "evento_marzo_fecha": "3 de marzo",
  "evento_abril_fecha": "Abril (fecha variable)",
  "evento_mayo_fecha": "31 de mayo",
  "evento_junio_fecha": "21 de junio",
  "evento_julio_fecha": "Julio (todo el mes)",
  "evento_agosto_fecha": "12 de agosto",
  "evento_perseidas_fecha": "Agosto (mediados)",
  "evento_septiembre_fecha": "22 de septiembre",
  "evento_octubre_fecha": "Octubre (todo el mes)",
  "evento_noviembre_fecha": "17-18 de noviembre",
  "evento_diciembre_fecha": "13-14 de diciembre",
  "qr_compartir": "Escanea para compartir",
  "nombres_planetas_nota": "* Los nombres romanos fueron adoptados por la astronomía occidental y se mantienen hasta hoy.",
  "visor_label": "16.5 — Visor 3D",
  "visor_titulo": "Sistema Solar <span>3D Interactivo</span>",
  "visor_desc": "🖱️ Arrastra para rotar · ⚙️ Haz scroll para hacer zoom",
  "btn_mas_info": "Más información",
  "btn_cerrar": "Cerrar"
}"""
    
    with open('lang/es.json', 'w', encoding='utf-8') as f:
        f.write(clean_content + correct_block)
        
    # Generate es.js
    with open('lang/es.js', 'w', encoding='utf-8') as f:
        f.write('const langES = ' + clean_content + correct_block + ';')


def fix_en():
    with open('lang/en.json', 'r', encoding='utf-8') as f:
        content = f.read()

    start_idx = content.find('"evento_octubre_desc":')
    if start_idx == -1: return

    clean_content = content[:start_idx]

    correct_block = """"evento_octubre_desc": "Andromeda (M31) visible to the naked eye in dark skies.",
  "evento_noviembre_titulo": "Leonids Meteor Shower",
  "evento_noviembre_desc": "Up to 15 meteors per hour. Best viewed in the early morning.",
  "evento_diciembre_titulo": "Geminids",
  "evento_diciembre_desc": "One of the best meteor showers of the year (up to 120 per hour).",
  "evento_enero_fecha": "January 10",
  "evento_febrero_fecha": "February 28",
  "evento_marzo_fecha": "March 3",
  "evento_abril_fecha": "April (variable date)",
  "evento_mayo_fecha": "May 31",
  "evento_junio_fecha": "June 21",
  "evento_julio_fecha": "July (all month)",
  "evento_agosto_fecha": "August 12",
  "evento_perseidas_fecha": "August (mid-month)",
  "evento_septiembre_fecha": "September 22",
  "evento_octubre_fecha": "October (all month)",
  "evento_noviembre_fecha": "November 17-18",
  "evento_diciembre_fecha": "December 13-14",
  "qr_compartir": "Scan to share",
  "nombres_planetas_nota": "* Roman names were adopted by Western astronomy and remain to this day.",
  "visor_label": "16.5 — 3D Viewer",
  "visor_titulo": "Interactive 3D <span>Solar System</span>",
  "visor_desc": "🖱️ Drag to rotate · ⚙️ Scroll to zoom",
  "btn_mas_info": "More information",
  "btn_cerrar": "Close"
}"""
    
    with open('lang/en.json', 'w', encoding='utf-8') as f:
        f.write(clean_content + correct_block)
        
    # Generate en.js
    with open('lang/en.js', 'w', encoding='utf-8') as f:
        f.write('const langEN = ' + clean_content + correct_block + ';')


fix_es()
fix_en()

# Verify JSON validity
try:
    with open('lang/es.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("es.json FIXED and VERIFIED")
except Exception as e:
    print(f"Error in es.json: {e}")
    
try:
    with open('lang/en.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("en.json FIXED and VERIFIED")
except Exception as e:
    print(f"Error in en.json: {e}")
