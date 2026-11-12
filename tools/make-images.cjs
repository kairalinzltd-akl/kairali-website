// Generates lightweight scenic SVG artwork for the Live The Day Holidays site.
// No external photo dependencies — every image is self-contained and ~2KB.
const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname, '..', 'assets', 'img');
fs.mkdirSync(outDir, { recursive: true });

const scenes = {
  'hero-kerala':   { sky: ['#0b3b34', '#155e52'], sun: '#efd9a5', land: ['#0a2f2a', '#0d3b34', '#123f38'], water: '#1b6b5e', kind: 'backwater' },
  'kerala':        { sky: ['#f5c98d', '#f0a86a'], sun: '#fff0cd', land: ['#2f5d3a', '#3d7247', '#23492c'], water: '#4f8f78', kind: 'backwater' },
  'munnar':        { sky: ['#cfe6f2', '#8fc4d8'], sun: '#ffffff', land: ['#2c5b46', '#3b7355', '#1f4534'], water: null, kind: 'hills' },
  'vietnam':       { sky: ['#f7d6c4', '#e9a98f'], sun: '#fff2e2', land: ['#2b4a4f', '#365b60', '#1d3438'], water: '#5b8f92', kind: 'karst' },
  'dubai':         { sky: ['#f2c78a', '#d98b5f'], sun: '#ffe9bf', land: ['#4a3226', '#5d4030', '#33231a'], water: null, kind: 'city' },
  'malaysia':      { sky: ['#d9e9d2', '#9fc4a4'], sun: '#f6ffe8', land: ['#1f4a3d', '#2b5c4a', '#153229'], water: '#3f7d68', kind: 'city' },
  'azerbaijan':    { sky: ['#cfd9ec', '#8fa3c4'], sun: '#f2f6ff', land: ['#33415c', '#41506d', '#222c40'], water: '#5f7ba1', kind: 'city' },
  'kashmir':       { sky: ['#e7e3f5', '#b9c6e2'], sun: '#fffdf5', land: ['#2a4a3e', '#365c4d', '#1b322a'], water: '#5e93a5', kind: 'hills' },
  'thailand':      { sky: ['#ffe0c4', '#f2a97e'], sun: '#fff8ea', land: ['#1d4440', '#285a53', '#132e2b'], water: '#3f8a82', kind: 'karst' },
  'golden-triangle': { sky: ['#f7d9a0', '#dc9c62'], sun: '#fff3d6', land: ['#4a2f24', '#5e3d2e', '#33201a'], water: null, kind: 'city' },
  'about-team':    { sky: ['#e8dfd0', '#c9b79a'], sun: '#fff6e6', land: ['#20463c', '#2d5a4c', '#16302a'], water: '#4d8b7b', kind: 'hills' },
  'page-packages': { sky: ['#0d3b34', '#1a6b5c'], sun: '#efd9a5', land: ['#0a2f2a', '#0d3b34', '#123f38'], water: '#1b6b5e', kind: 'karst' }
};

function hills(id, base, seed, peaks) {
  let d = `M0 ${base}`;
  for (let i = 0; i <= peaks; i++) {
    const x = (i / peaks) * 1200;
    const y = base - (30 + ((seed * (i + 3) * 37) % 120));
    const cx = x + 1200 / peaks / 2;
    d += ` Q${cx} ${y} ${x + 1200 / peaks} ${base - ((seed * (i + 1) * 19) % 40)}`;
  }
  d += ` L1200 700 L0 700 Z`;
  return d;
}

Object.entries(scenes).forEach(([name, s]) => {
  const [c1, c2] = s.sky;
  let art = '';

  if (s.kind === 'city') {
    // skyline
    let x = 60;
    let bars = '';
    let h = 90;
    const heights = [130, 200, 260, 170, 320, 240, 190, 300, 160, 230, 280, 140];
    heights.forEach((hh, i) => {
      const w = 46 + (i % 3) * 18;
      bars += `<rect x="${x}" y="${560 - hh}" width="${w}" height="${hh + 140}" rx="4" fill="${s.land[i % 3]}" opacity="${0.55 + (i % 4) * 0.1}"/>`;
      for (let wy = 580 - hh; wy < 540; wy += 26) {
        bars += `<rect x="${x + 10}" y="${wy}" width="${w - 22}" height="9" rx="2" fill="${s.sun}" opacity="0.28"/>`;
      }
      x += w + 26;
    });
    art = bars;
  } else if (s.kind === 'karst') {
    // limestone islands rising from water
    const peaks = [[180, 300, 110], [390, 340, 150], [700, 320, 130], [940, 350, 160]];
    peaks.forEach(([px, py, pr], i) => {
      art += `<path d="M${px - pr} ${py + 120} Q${px - pr * 0.5} ${py - 90} ${px} ${py - 120} Q${px + pr * 0.6} ${py - 70} ${px + pr} ${py + 120} Z" fill="${s.land[i % 3]}" opacity="0.95"/>`;
    });
  } else if (s.kind === 'backwater') {
    // palms and a boat
    for (let i = 0; i < 7; i++) {
      const px = 70 + i * 170;
      const py = 470 + (i % 2) * 22;
      art += `<path d="M${px} ${py} q6 -80 -10 -130" stroke="${s.land[2]}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      for (let f = 0; f < 5; f++) {
        const a = -140 + f * 34;
        art += `<path d="M${px - 8} ${py - 128} q${Math.cos(a * Math.PI / 180) * 46} ${Math.sin(a * Math.PI / 180) * 34} ${Math.cos(a * Math.PI / 180) * 78} ${Math.sin(a * Math.PI / 180) * 12}" stroke="${s.land[0]}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      }
    }
    art += `<path d="M470 600 q120 -34 240 0 q-60 34 -240 34 Z" fill="#0f2b26" opacity="0.85"/>`;
  } else {
    art = '';
  }

  const landLayers = s.kind === 'city' || s.kind === 'karst'
    ? ''
    : '';
  const waterBand = s.water
    ? `<rect x="0" y="600" width="1200" height="200" fill="${s.water}"/>
       <rect x="0" y="600" width="1200" height="200" fill="url(#shine-${name})" opacity="0.5"/>`
    : `<rect x="0" y="600" width="1200" height="200" fill="${s.land[2]}"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img">
  <defs>
    <linearGradient id="sky-${name}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow-${name}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${s.sun}" stop-opacity="0.85"/>
      <stop offset="1" stop-color="${s.sun}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shine-${name}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#sky-${name})"/>
  <circle cx="880" cy="230" r="230" fill="url(#glow-${name})"/>
  <circle cx="880" cy="230" r="72" fill="${s.sun}" opacity="0.95"/>
  <path d="${hills(name, 520, name.length, 6)}" fill="${s.land[0]}" opacity="0.55"/>
  <path d="${hills(name, 590, name.length + 4, 4)}" fill="${s.land[1]}" opacity="0.75"/>
  ${art}
  ${waterBand}
  <rect width="1200" height="800" fill="url(#shine-${name})" opacity="0.18"/>
</svg>`;

  fs.writeFileSync(path.join(outDir, name + '.svg'), svg);
});

console.log('generated', Object.keys(scenes).length, 'images in', outDir);
