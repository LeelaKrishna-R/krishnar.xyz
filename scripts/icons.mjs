// scripts/icons.mjs: build the site icons from the chibi head the site itself renders.
// Needs the site running on :3211 and sharp (scratch). Writes app/icon.svg, app/apple-icon.png, app/favicon.ico, public/icon-192.png, public/icon-512.png.
import sharp from 'sharp';
import fs from 'fs';
const R = 'E:/krishnar-site/repo/';
const html = await (await fetch('http://127.0.0.1:3211/')).text();
const m = html.match(/<svg class="chibi chibi-head[^"]*"[^>]*>([\s\S]*?)<\/svg>/);
if (!m) throw new Error('no chibi head in the page');
const inner = m[1].replace(/ class="[^"]*"/g, '');
const tile = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="7" y="8" width="54" height="54" rx="14" fill="#231c15"/>
  <rect x="3" y="3" width="54" height="54" rx="14" fill="#e9a934" stroke="#231c15" stroke-width="3"/>
  <svg x="${6 - pad}" y="${4.5 - pad}" width="${48 + pad * 2}" height="${51 + pad * 2}" viewBox="15 -3 90 104">${inner}</svg>
</svg>`;
const svg = tile(0);
fs.writeFileSync(R + 'app/icon.svg', svg + '\n');
// Opaque versions for Apple and the app manifest: paper background, a bit of margin.
const opaque = (size) => sharp(Buffer.from(svg), { density: 72 * size / 64 * 1.2 }).resize(Math.round(size * 0.86)).png().toBuffer()
  .then((b) => sharp({ create: { width: size, height: size, channels: 4, background: '#f3ebdc' } }).composite([{ input: b, gravity: 'center' }]).png().toBuffer());
fs.writeFileSync(R + 'app/apple-icon.png', await opaque(180));
fs.writeFileSync(R + 'public/icon-192.png', await opaque(192));
fs.writeFileSync(R + 'public/icon-512.png', await opaque(512));
// favicon.ico with 16, 32 and 48 px PNG entries (transparent).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(svg), { density: 72 * s / 64 * 4 }).resize(s, s).png().toBuffer()));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let off = head.length;
sizes.forEach((s, i) => { const e = 6 + 16 * i; head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3); head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6); head.writeUInt32LE(pngs[i].length, e + 8); head.writeUInt32LE(off, e + 12); off += pngs[i].length; });
fs.writeFileSync(R + 'app/favicon.ico', Buffer.concat([head, ...pngs]));
// preview strip
const prev = await Promise.all([16, 32, 64, 180].map((s) => sharp(Buffer.from(svg), { density: 72 * s / 64 * 4 }).resize(s, s).png().toBuffer()));
let x = 10; const comp = prev.map((b, i) => { const r = { input: b, left: x, top: 10 }; x += [16, 32, 64, 180][i] + 20; return r; });
await sharp({ create: { width: x, height: 200, channels: 4, background: '#ffffff' } }).composite(comp).png().toFile('review/icons.png');
console.log('ok', inner.length);
