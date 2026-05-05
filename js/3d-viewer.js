// js/3d-viewer.js
function init3DViewer() {
  const container = document.getElementById('solar-system-3d');
  if (!container || typeof THREE === 'undefined') return;

  container.innerHTML = '';
  container.style.position = 'relative';

  // ── Contenedor HTML para etiquetas (superpuesto, no intercepta mouse) ─────
  const labelsContainer = document.createElement('div');
  labelsContainer.style.cssText =
    'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
  container.appendChild(labelsContainer);

  // ── Three.js core ─────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, container.clientWidth / container.clientHeight, 0.1, 1000
  );
  camera.position.set(0, 55, 160);

  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // Canvas ANTES del div de etiquetas → etiquetas quedan encima
  container.insertBefore(renderer.domElement, labelsContainer);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 400;
  controls.minDistance = 20;

  scene.add(new THREE.AmbientLight(0x333333));
  const pointLight = new THREE.PointLight(0xffffff, 2.5, 500);
  scene.add(pointLight);

  // ── Datos de planetas (nombres ES / EN) ───────────────────────────────────
  const planetsData = [
    { nameES:'Sol',      nameEN:'Sun',     color:0xffcc00, radius:12,  dist:0,   speed:0,      isSun:true  },
    { nameES:'Mercurio', nameEN:'Mercury', color:0xa8a8a8, radius:1.2, dist:20,  speed:0.020               },
    { nameES:'Venus',    nameEN:'Venus',   color:0xe3bb76, radius:2.2, dist:30,  speed:0.015               },
    { nameES:'Tierra',   nameEN:'Earth',   color:0x2b82c9, radius:2.5, dist:42,  speed:0.010               },
    { nameES:'Marte',    nameEN:'Mars',    color:0xc1440e, radius:1.5, dist:52,  speed:0.008               },
    { nameES:'Júpiter',  nameEN:'Jupiter', color:0xd39c7e, radius:6,   dist:75,  speed:0.002               },
    { nameES:'Saturno',  nameEN:'Saturn',  color:0xead6b8, radius:5,   dist:98,  speed:0.0009, rings:true  },
    { nameES:'Urano',    nameEN:'Uranus',  color:0x4b70dd, radius:3.5, dist:118, speed:0.0004              },
    { nameES:'Neptuno',  nameEN:'Neptune', color:0x274687, radius:3.3, dist:135, speed:0.0001              },
  ];

  // ── Colores de etiqueta por cuerpo ────────────────────────────────────────
  const labelColors = {
    Sol:'#ffe066', Sun:'#ffe066',
    Tierra:'#6ec6ff', Earth:'#6ec6ff',
    Saturno:'#f5d89a', Saturn:'#f5d89a',
  };

  // ── Crear etiqueta HTML ───────────────────────────────────────────────────
  function makeLabelEl(text, data) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      transform:translateX(-50%);
      font-family:'Orbitron',sans-serif;
      font-size:10px;
      font-weight:700;
      letter-spacing:.08em;
      text-transform:uppercase;
      white-space:nowrap;
      color:${labelColors[text] || '#e8eaf6'};
      text-shadow:0 0 6px rgba(0,0,0,.9),0 0 14px rgba(0,0,0,.7),0 0 22px rgba(108,10,239,.45);
      padding:2px 5px;
      border-radius:4px;
      background:rgba(0,0,5,.35);
      pointer-events:none;
      user-select:none;
      opacity:.95;
    `;
    el.textContent = text;
    labelsContainer.appendChild(el);
    return el;
  }

  // ── Construir escena ───────────────────────────────────────────────────────
  const objects = []; // { mesh, pivot|null, labelEl, data, offsetY }

  planetsData.forEach((data, i) => {
    if (i > 0) {
      // Órbita
      const pts = [];
      for (let j = 0; j <= 128; j++) {
        const a = (j / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * data.dist, 0, Math.sin(a) * data.dist));
      }
      const og = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(og,
        new THREE.LineBasicMaterial({ color:0xffffff, transparent:true, opacity:0.12 })
      ));
    }

    // Malla del cuerpo
    const geo = data.isSun
      ? new THREE.SphereGeometry(data.radius, 32, 32)
      : new THREE.SphereGeometry(data.radius, 32, 32);
    const mat = data.isSun
      ? new THREE.MeshBasicMaterial({ color: data.color })
      : new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.6 });
    const mesh = new THREE.Mesh(geo, mat);

    if (data.isSun) {
      // Halo del Sol
      const haloGeo = new THREE.SphereGeometry(data.radius * 1.12, 32, 32);
      const haloMat = new THREE.MeshBasicMaterial({ color:0xff8800, transparent:true, opacity:0.07 });
      mesh.add(new THREE.Mesh(haloGeo, haloMat));
      scene.add(mesh);

      objects.push({ mesh, pivot:null, labelEl: makeLabelEl(data.nameES, data), data, offsetY: data.radius + 2 });
    } else {
      if (data.rings) {
        const rg = new THREE.RingGeometry(data.radius*1.3, data.radius*2.2, 64);
        const rm = new THREE.MeshStandardMaterial({ color:0xead6b8, side:THREE.DoubleSide, transparent:true, opacity:0.7 });
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }
      const pivot = new THREE.Object3D();
      pivot.add(mesh);
      mesh.position.x = data.dist;
      pivot.rotation.y = Math.random() * Math.PI * 2; // posición inicial variada
      scene.add(pivot);

      objects.push({ mesh, pivot, labelEl: makeLabelEl(data.nameES, data), data, offsetY: data.radius + 1.4 });
    }
  });

  // ── Función pública: actualizar idioma de los labels ──────────────────────
  window.update3DViewerLang = function(lang) {
    objects.forEach(obj => {
      const name = lang === 'en' ? obj.data.nameEN : obj.data.nameES;
      obj.labelEl.textContent = name;
      obj.labelEl.style.color = labelColors[name] || '#e8eaf6';
    });
  };

  // ── Proyección 3D → pantalla ──────────────────────────────────────────────
  const _v = new THREE.Vector3();

  function updateLabels() {
    const W = container.clientWidth;
    const H = container.clientHeight;
    objects.forEach(obj => {
      obj.mesh.getWorldPosition(_v);
      _v.y += obj.offsetY;
      _v.project(camera);
      if (_v.z > 1) { obj.labelEl.style.opacity = '0'; return; }
      obj.labelEl.style.opacity = '.95';
      obj.labelEl.style.left   = ((_v.x * .5 + .5) * W) + 'px';
      obj.labelEl.style.top    = ((-_v.y * .5 + .5) * H) + 'px';
    });
  }

  // ── Resize ────────────────────────────────────────────────────────────────
  const resizeObs = new ResizeObserver(() => {
    if (!container.clientWidth) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  resizeObs.observe(container);

  // ── Loop ──────────────────────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);
    objects[0].mesh.rotation.y += 0.002; // Sol gira
    objects.slice(1).forEach(obj => {
      obj.pivot.rotation.y += obj.data.speed;
      obj.mesh.rotation.y  += 0.008;
    });
    controls.update();
    renderer.render(scene, camera);
    updateLabels();
  }
  animate();
}
