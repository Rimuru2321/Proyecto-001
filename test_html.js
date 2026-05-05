const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html);
console.log("Timeline track found?", !!dom.window.document.querySelector('.timeline-track'));
console.log("Quiz pregunta found?", !!dom.window.document.getElementById('pregunta-actual'));
console.log("Script tags count:", dom.window.document.querySelectorAll('script').length);
