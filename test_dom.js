const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (e) => {
  console.log("ERROR:", e.message || e);
});
virtualConsole.on("warn", (w) => {
  console.log("WARN:", w);
});
virtualConsole.on("info", (i) => {
  console.log("INFO:", i);
});
virtualConsole.on("log", (l) => {
  console.log("LOG:", l);
});
virtualConsole.on("jsdomError", (e) => {
  console.log("JSDOM ERROR:", e.message);
});

// Create a DOM
const dom = new JSDOM(html, {
  url: "file:///c:/Users/DELL/OneDrive/Desktop/galaxy/index.html",
  runScripts: "dangerously",
  resources: "usable",
  virtualConsole
});

setTimeout(() => {
  console.log("Finished running scripts.");
  process.exit(0);
}, 2000);
