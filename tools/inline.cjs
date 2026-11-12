// Build a single self-contained HTML file from index.html (all CSS/JS/SVG inlined)
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1. inline stylesheet
html = html.replace(/<link[^>]+href="assets\/css\/style\.css"[^>]*>/g, () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');
  return '<style>\n' + css + '\n</style>';
});

// 2. inline script
html = html.replace(/<script[^>]+src="assets\/js\/main\.js"[^>]*><\/script>/g, () => {
  const js = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
  return '<script>\n' + js + '\n</script>';
});

// 3. inline SVG images as data URIs
html = html.replace(/assets\/img\/([a-zA-Z0-9._-]+\.svg)/g, (m, file) => {
  const p = path.join(root, 'assets/img', file);
  if (!fs.existsSync(p)) return m;
  const b64 = Buffer.from(fs.readFileSync(p)).toString('base64');
  return 'data:image/svg+xml;base64,' + b64;
});

// 4. neutralise links between local pages so the single file works standalone
html = html.replace(/href="index\.html"/g, 'href="#"');
html = html.replace(/href="packages\.html"/g, 'href="#packages"');
html = html.replace(/href="about\.html"/g, 'href="#about"');
html = html.replace(/href="contact\.html"/g, 'href="#contact"');

const out = path.join(root, 'livetheday-index-standalone.html');
fs.writeFileSync(out, html);
console.log('written', out, (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
console.log('remaining external asset refs:', (html.match(/assets\//g) || []).length);
