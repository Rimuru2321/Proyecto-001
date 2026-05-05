const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "file:///c:/Users/DELL/OneDrive/Desktop/galaxy/index.html"
});

dom.window.onerror = function(message, source, lineno, colno, error) {
  console.log("JSDOM ERROR: ", message, source, lineno, colno, error);
};

dom.window.document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    setTimeout(() => {
        console.log("Timeline events count: ", dom.window.document.querySelectorAll('.timeline-event').length);
        console.log("Quiz HTML: ", dom.window.document.getElementById('pregunta-actual').innerHTML);
        console.log("APOD container: ", dom.window.document.getElementById('apod-container').innerHTML);
    }, 2000);
});
