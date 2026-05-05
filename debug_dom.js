const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "file:///c:/Users/DELL/OneDrive/Desktop/galaxy/index.html"
});

// Mock WebGLRenderer to prevent crash
dom.window.THREE = {
  WebGLRenderer: function() {
    this.setSize = () => {};
    this.setPixelRatio = () => {};
    this.setClearColor = () => {};
    this.domElement = dom.window.document.createElement('canvas');
    this.render = () => {};
  },
  Scene: function() { this.add = () => {}; this.remove = () => {}; },
  PerspectiveCamera: function() { this.position = { set: () => {} }; this.lookAt = () => {}; },
  AmbientLight: function() {},
  DirectionalLight: function() { this.position = { set: () => {} }; },
  TextureLoader: function() { this.load = () => {}; },
  SphereGeometry: function() {},
  MeshStandardMaterial: function() {},
  MeshBasicMaterial: function() {},
  Mesh: function() { this.rotation = { y: 0 }; },
  Group: function() { this.add = () => {}; this.rotation = { x: 0 }; }
};

dom.window.document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log("Timeline HTML:\n", dom.window.document.querySelector('.timeline-track').innerHTML);
        console.log("Quiz HTML:\n", dom.window.document.getElementById('pregunta-actual').innerHTML);
        console.log("APOD HTML:\n", dom.window.document.getElementById('apod-container').innerHTML);
        console.log("Moon Phase HTML:\n", dom.window.document.getElementById('fase-lunar-container').innerHTML);
    }, 2000);
});
