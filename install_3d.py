import os

# 1. WRITE 3D VIEWER JS
viewer_js = """
// js/3d-viewer.js
function init3DViewer() {
  const container = document.getElementById('solar-system-3d');
  if (!container || typeof THREE === 'undefined') return;
  
  container.innerHTML = '';
  
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 50, 150);
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 400;
  controls.minDistance = 20;
  
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 2.5, 500);
  scene.add(pointLight);
  
  const planetsData = [
    { name: 'Sun', color: 0xffcc00, radius: 12, distance: 0, speed: 0.002 },
    { name: 'Mercury', color: 0xa8a8a8, radius: 1.2, distance: 20, speed: 0.02 },
    { name: 'Venus', color: 0xe3bb76, radius: 2.2, distance: 30, speed: 0.015 },
    { name: 'Earth', color: 0x2b82c9, radius: 2.5, distance: 42, speed: 0.01 },
    { name: 'Mars', color: 0xc1440e, radius: 1.5, distance: 52, speed: 0.008 },
    { name: 'Jupiter', color: 0xd39c7e, radius: 6, distance: 75, speed: 0.002 },
    { name: 'Saturn', color: 0xead6b8, radius: 5, distance: 98, speed: 0.0009, hasRings: true },
    { name: 'Uranus', color: 0x4b70dd, radius: 3.5, distance: 118, speed: 0.0004 },
    { name: 'Neptune', color: 0x274687, radius: 3.3, distance: 135, speed: 0.0001 }
  ];
  
  const planets = [];
  
  const sunGeo = new THREE.SphereGeometry(12, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 }); 
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);
  
  planetsData.forEach((data, index) => {
    if(index === 0) return;
    
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPoints = [];
    for(let i=0; i<=64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      orbitPoints.push(new THREE.Vector3(Math.cos(angle)*data.distance, 0, Math.sin(angle)*data.distance));
    }
    orbitGeo.setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
    const orbit = new THREE.Line(orbitGeo, orbitMat);
    scene.add(orbit);
    
    const geo = new THREE.SphereGeometry(data.radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.6 });
    const planet = new THREE.Mesh(geo, mat);
    
    if(data.hasRings) {
      const ringGeo = new THREE.RingGeometry(data.radius * 1.3, data.radius * 2.2, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xead6b8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      planet.add(ring);
    }
    
    const pivot = new THREE.Object3D();
    pivot.add(planet);
    planet.position.x = data.distance;
    
    scene.add(pivot);
    planets.push({ pivot, planet, speed: data.speed });
  });
  
  window.addEventListener('resize', () => {
    if(container.clientWidth === 0) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  function animate() {
    requestAnimationFrame(animate);
    sun.rotation.y += 0.002;
    planets.forEach(p => {
      p.pivot.rotation.y += p.speed; 
      p.planet.rotation.y += 0.01;   
    });
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
}
"""

with open('js/3d-viewer.js', 'w', encoding='utf-8') as f:
    f.write(viewer_js)

# 2. UPDATE HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Insert 3D section right before timeline (17 - Línea de Tiempo)
three_d_html = """
  <!-- VISOR 3D -->
  <div class="sep-line"><hr/></div>
  <section class="sec" id="visor-3d">
    <div class="share-section">
      <span data-i18n="compartir">Compartir:</span>
      <a href="#" class="share-btn twitter" onclick="shareOnTwitter('Visor 3D del Sistema Solar')"><i class="fab fa-twitter"></i></a>
      <a href="#" class="share-btn facebook" onclick="shareOnFacebook('Visor 3D del Sistema Solar')"><i class="fab fa-facebook"></i></a>
    </div>
    <p class="section-label" data-i18n="visor_label">16.5 — Visor 3D</p>
    <h2 class="section-title" data-i18n="visor_titulo">Sistema Solar <span>3D Interactivo</span></h2>
    <div class="divider"></div>
    <div id="solar-system-3d" class="reveal" style="width: 100%; height: 600px; border-radius: 15px; overflow: hidden; position: relative; border: 1px solid rgba(108, 10, 239, 0.3); background: radial-gradient(circle at center, rgba(10,0,21,0.8) 0%, rgba(1,1,13,0.95) 100%);">
      <p style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white;">Cargando Visor 3D...</p>
    </div>
    <div style="text-align:center; margin-top:15px; color:var(--text);">
      <p data-i18n="visor_desc">🖱️ Arrastra para rotar · ⚙️ Haz scroll para hacer zoom</p>
    </div>
  </section>
"""

if '<section class="sec" id="visor-3d">' not in html:
    html = html.replace('<p class="section-label" data-i18n="timeline_label">17', three_d_html + '\n    <p class="section-label" data-i18n="timeline_label">17')

# Insert Three.js and 3d-viewer.js
scripts_html = """
  <!-- Three.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  
  <script src="lang/es.js"></script>
"""

if 'three.min.js' not in html:
    html = html.replace('<script src="lang/es.js"></script>', scripts_html)

if 'js/3d-viewer.js' not in html:
    html = html.replace('<script src="js/main.js"></script>', '  <script src="js/3d-viewer.js"></script>\n  <script src="js/main.js"></script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 3. UPDATE main.js to init 3D Viewer
with open('js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

if 'init3DViewer()' not in main_js:
    main_js = main_js.replace('// 5. Otras', '// 4.5. Iniciar Visor 3D\n    if (typeof init3DViewer === \'function\') init3DViewer();\n    \n    // 5. Otras')
    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(main_js)

# 4. UPDATE JSON TRANSLATIONS
def add_to_lang(lang_file, json_content):
    with open(lang_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '"visor_label"' not in content:
        content = content.replace('"btn_cerrar":', f'{json_content},\n  "btn_cerrar":')
        with open(lang_file, 'w', encoding='utf-8') as f:
            f.write(content)

add_to_lang('lang/es.js', '"visor_label": "16.5 — Visor 3D",\n  "visor_titulo": "Sistema Solar <span>3D Interactivo</span>",\n  "visor_desc": "🖱️ Arrastra para rotar · ⚙️ Haz scroll para hacer zoom"')
add_to_lang('lang/en.js', '"visor_label": "16.5 — 3D Viewer",\n  "visor_titulo": "Interactive 3D <span>Solar System</span>",\n  "visor_desc": "🖱️ Drag to rotate · ⚙️ Scroll to zoom"')

print("3D Viewer installed successfully!")
