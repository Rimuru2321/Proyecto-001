import os
import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace modal IDs
html = html.replace('id="modal-planeta"', 'id="modal-info"')
html = html.replace('id="modal-planeta-titulo"', 'id="modal-info-titulo"')
html = html.replace('id="modal-planeta-img"', 'id="modal-info-img"')
html = html.replace('id="modal-planeta-desc"', 'id="modal-info-desc"')
html = html.replace('id="btn-cerrar-planeta"', 'id="btn-cerrar-info"')
html = html.replace('btn-info-planeta', 'btn-mas-info')
html = html.replace('data-planeta=', 'data-info=')

# Add buttons to Galaxy Types
def add_btn_to_card(html, search_str, key):
    btn_html = f'\n        <button class="btn btn-outline btn-mas-info" data-info="{key}" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>\n      </div>'
    return html.replace(search_str, btn_html)

html = add_btn_to_card(html, '</p>\n      </div>\n      <div class="type-card">\n        <img src="img/galaxia-eliptica.jpg"', 'galaxia-espiral</p>\n      </div>\n      <div class="type-card">\n        <img src="img/galaxia-eliptica.jpg"')
# Wait, standardizing the replacement.
# Let's use regex to find the end of the cards and insert the button.

# Galaxias
html = re.sub(r'(<h3 data-i18n="type_card_espiral">.*?</h3>\s*<p data-i18n="type_espiral_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="espiral" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h3 data-i18n="type_card_eliptica">.*?</h3>\s*<p data-i18n="type_eliptica_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="eliptica" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h3 data-i18n="type_card_irregular">.*?</h3>\s*<p data-i18n="type_irregular_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="irregular" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h3 data-i18n="type_card_lenticular">.*?</h3>\s*<p data-i18n="type_lenticular_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="lenticular" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)

# Nebulosas
html = re.sub(r'(<h4 data-i18n="nebulosa_cangrejo">.*?</h4>\s*<p data-i18n="nebulosa_cangrejo_desc">.*?</p>)', 
              r'\1\n          <button class="btn btn-outline btn-mas-info" data-info="neb_cangrejo" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h4 data-i18n="nebulosa_pilares">.*?</h4>\s*<p data-i18n="nebulosa_pilares_desc">.*?</p>)', 
              r'\1\n          <button class="btn btn-outline btn-mas-info" data-info="neb_pilares" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h4 data-i18n="nebulosa_orion">.*?</h4>\s*<p data-i18n="nebulosa_orion_desc">.*?</p>)', 
              r'\1\n          <button class="btn btn-outline btn-mas-info" data-info="neb_orion" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h4 data-i18n="nebulosa_eta">.*?</h4>\s*<p data-i18n="nebulosa_eta_desc">.*?</p>)', 
              r'\1\n          <button class="btn btn-outline btn-mas-info" data-info="neb_eta" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h4 data-i18n="nebulosa_hubble">.*?</h4>\s*<p data-i18n="nebulosa_hubble_desc">.*?</p>)', 
              r'\1\n          <button class="btn btn-outline btn-mas-info" data-info="neb_hubble" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h4 data-i18n="nebulosa_planetaria">.*?</h4>\s*<p data-i18n="nebulosa_planetaria_desc">.*?</p>)', 
              r'\1\n          <button class="btn btn-outline btn-mas-info" data-info="neb_planetaria" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)

# Constelaciones
html = re.sub(r'(<h3 data-i18n="constelacion_orion">.*?</h3>\s*<p data-i18n="constelacion_orion_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="const_orion" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h3 data-i18n="constelacion_osa">.*?</h3>\s*<p data-i18n="constelacion_osa_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="const_osa" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h3 data-i18n="constelacion_casiopea">.*?</h3>\s*<p data-i18n="constelacion_casiopea_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="const_casiopea" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)
html = re.sub(r'(<h3 data-i18n="constelacion_cisne">.*?</h3>\s*<p data-i18n="constelacion_cisne_desc">.*?</p>)', 
              r'\1\n        <button class="btn btn-outline btn-mas-info" data-info="const_cisne" style="margin-top:15px; width:100%; font-size:0.7rem;" data-i18n="btn_mas_info">Más información</button>', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML modified")
