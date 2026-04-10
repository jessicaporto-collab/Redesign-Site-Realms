const fs = require('fs');
let content = fs.readFileSync('src/pages/IPTVConteudo/index.jsx', 'utf8');

// === PHASE 2: Platform card labels ===

// Web label: find string containing 'Zero Instalação'
let idx = content.indexOf('Zero Instala');
if (idx !== -1) {
  const openQuote = content.lastIndexOf("'", idx);
  const closeQuote = content.indexOf("'", idx + 20);
  console.log('Old web label:', JSON.stringify(content.substring(openQuote, closeQuote + 1)));
  content = content.substring(0, openQuote) + "{t('iptv_page.platform_web_label')}" + content.substring(closeQuote + 1);
}

// Mobile label: find 'Em Qualquer Lugar'
idx = content.indexOf('Em Qualquer Lugar');
if (idx !== -1) {
  const openQuote = content.lastIndexOf("'", idx);
  const closeQuote = content.indexOf("'", idx + 20);
  console.log('Old mobile label:', JSON.stringify(content.substring(openQuote, closeQuote + 1)));
  content = content.substring(0, openQuote) + "{t('iptv_page.platform_mobile_label')}" + content.substring(closeQuote + 1);
}

// Desktop label: find 'Máxima Performance'
idx = content.indexOf('xima Performance');
if (idx !== -1) {
  const openQuote = content.lastIndexOf("'", idx);
  const closeQuote = content.indexOf("'", idx + 20);
  console.log('Old desktop label:', JSON.stringify(content.substring(openQuote, closeQuote + 1)));
  content = content.substring(0, openQuote) + "{t('iptv_page.platform_desktop_label')}" + content.substring(closeQuote + 1);
}

fs.writeFileSync('src/pages/IPTVConteudo/index.jsx', content, 'utf8');
console.log('Platform labels done!');

// === PHASE 2: Platform card labels ===

// Web label: find string containing 'Zero Instalação'
let idx = content.indexOf('Zero Instala');
if (idx !== -1) {
  const openQuote = content.lastIndexOf("'", idx);
  const closeQuote = content.indexOf("'", idx + 20);
  console.log('Old web label:', JSON.stringify(content.substring(openQuote, closeQuote + 1)));
  content = content.substring(0, openQuote) + "{t('iptv_page.platform_web_label')}" + content.substring(closeQuote + 1);
}

// Mobile label: find 'Em Qualquer Lugar'
idx = content.indexOf('Em Qualquer Lugar');
if (idx !== -1) {
  const openQuote = content.lastIndexOf("'", idx);
  const closeQuote = content.indexOf("'", idx + 20);
  console.log('Old mobile label:', JSON.stringify(content.substring(openQuote, closeQuote + 1)));
  content = content.substring(0, openQuote) + "{t('iptv_page.platform_mobile_label')}" + content.substring(closeQuote + 1);
}

// Desktop label: find 'Máxima Performance'
idx = content.indexOf('xima Performance');
if (idx !== -1) {
  const openQuote = content.lastIndexOf("'", idx);
  const closeQuote = content.indexOf("'", idx + 20);
  console.log('Old desktop label:', JSON.stringify(content.substring(openQuote, closeQuote + 1)));
  content = content.substring(0, openQuote) + "{t('iptv_page.platform_desktop_label')}" + content.substring(closeQuote + 1);
}

fs.writeFileSync('src/pages/IPTVConteudo/index.jsx', content, 'utf8');
console.log('Platform labels done!');

// Replace garbled platform array with t() calls
const idx = content.indexOf("Navegador', '");
if (idx === -1) { console.log('Navegador not found'); process.exit(1); }

const startIdx = content.lastIndexOf("                {['", idx);
const endStr = "].map((mode) => (";
const endIdx = content.indexOf(endStr, idx) + endStr.length;

if (startIdx === -1 || endIdx < 10) { console.log('Bounds not found', startIdx, endIdx); process.exit(1); }

console.log('Replacing platform array...');
const newSegment = `                {[t('iptv_page.hero_platform_1'), t('iptv_page.hero_platform_2'), t('iptv_page.hero_platform_3')].map((mode) => (`;
content = content.substring(0, startIdx) + newSegment + content.substring(endIdx);

// Replace floating chip 1 - "Ao Vivo" and "Transmissão em tempo real"
content = content.replace(
  '<p className="text-sm font-bold text-white">Ao Vivo</p>',
  '<p className="text-sm font-bold text-white">{t(\'iptv_page.hero_chip1_title\')}</p>'
);
content = content.replace(
  '<p className="text-xs text-white/40">Transmissão em tempo real</p>',
  '<p className="text-xs text-white/40">{t(\'iptv_page.hero_chip1_sub\')}</p>'
);

// Replace floating chip 2 - "HD Ready" and "1080p · 4K · 60fps"
content = content.replace(
  '<p className="text-sm font-bold text-white">HD Ready</p>',
  '<p className="text-sm font-bold text-white">{t(\'iptv_page.hero_chip2_title\')}</p>'
);
content = content.replace(
  '<p className="text-xs text-white/40">1080p · 4K · 60fps</p>',
  '<p className="text-xs text-white/40">{t(\'iptv_page.hero_chip2_sub\')}</p>'
);

// Intro chip 1 - "Gravação Automática"
content = content.replace(
  '<p className="text-white font-bold text-sm">Gravação Automática</p>',
  '<p className="text-white font-bold text-sm">{t(\'iptv_page.intro_chip1_title\')}</p>'
);
content = content.replace(
  '<p className="text-white/40 text-xs">Salva na nuvem · disponível 24h</p>',
  '<p className="text-white/40 text-xs">{t(\'iptv_page.intro_chip1_sub\')}</p>'
);

// Intro chip 2 - "Criptografia E2E"
content = content.replace(
  '<p className="text-white font-bold text-sm">Criptografia E2E</p>',
  '<p className="text-white font-bold text-sm">{t(\'iptv_page.intro_chip2_title\')}</p>'
);
content = content.replace(
  '<p className="text-white/40 text-xs">Salas 100% seguras</p>',
  '<p className="text-white/40 text-xs">{t(\'iptv_page.intro_chip2_sub\')}</p>'
);

fs.writeFileSync('src/pages/IPTVConteudo/index.jsx', content, 'utf8');
console.log('Done! Chips replaced.');
