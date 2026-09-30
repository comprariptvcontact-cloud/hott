/**
 * Regenerates every derived brand image from the two source files in
 * `assets/brand/`. Run it whenever the logo artwork changes:
 *
 *   npm run brand
 *
 * Outputs (all into `public/`, all committed):
 *   favicon-32 / favicon (96) / favicon-192 / favicon-512 . png
 *   apple-touch-icon.png   180px, white ground
 *   logo-wordmark.png      the header / footer / terms wordmark
 *   logo-mark.png          the bare mark
 *   hero-bg.jpg            the dark hero plate with the mark on it
 *
 * Requires `sharp`, which is a devDependency for exactly this.
 */
import sharp from 'sharp';
import { existsSync, statSync, readdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'assets', 'brand');
const PUB = join(ROOT, 'public');

const MARK = join(SRC, 'logo-mark-source.png');
const WORD = join(SRC, 'logo-wordmark-source.png');

for (const f of [MARK, WORD]) {
  if (!existsSync(f)) {
    console.error(`missing source art: ${f}\n  put the logo files in assets/brand/ and re-run.`);
    process.exit(1);
  }
}

const kb = (f) => (statSync(f).size / 1024).toFixed(1) + ' KB';

/**
 * The source art carries a transparent margin of its own. Trim it so every
 * derived size is composed from the same tight bounding box — otherwise each
 * output gets a different amount of slack and the icon appears to shift
 * between sizes.
 *
 * Note the "6" glyph is opaque white knocked out of the blue disc. Do not be
 * tempted to key white out: that deletes the numeral.
 */
const trimmed = (src) => sharp(src).trim({ threshold: 1 }).png().toBuffer();

/** Square icon: contain the mark on a square canvas with breathing room. */
async function icon(buf, size, { background = { r: 0, g: 0, b: 0, alpha: 0 }, pad = 0.12 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const scaled = await sharp(buf)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: scaled, gravity: 'centre' }])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}

/**
 * The hero plate. The original was a flat JPEG with a white "8K" baked in, so
 * there was nothing to restyle — it is redrawn here: a charcoal ramp lit from
 * the upper right, matching the panel it replaced, with the mark composited on.
 */
const HERO_W = 1394;
const HERO_H = 1536;

function heroGround() {
  const buf = Buffer.alloc(HERO_W * HERO_H * 3);
  for (let y = 0; y < HERO_H; y++) {
    for (let x = 0; x < HERO_W; x++) {
      const t = (x / HERO_W) * 0.62 + (1 - y / HERO_H) * 0.38;
      let v = 6 + Math.pow(t, 1.55) * 52;
      // Fine grain, so the large flat areas do not band on a dark panel.
      const n = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
      v += (n - 0.5) * 3.2;
      const c = Math.max(0, Math.min(255, Math.round(v)));
      const o = (y * HERO_W + x) * 3;
      buf[o] = c; buf[o + 1] = c; buf[o + 2] = c;
    }
  }
  return sharp(buf, { raw: { width: HERO_W, height: HERO_H, channels: 3 } });
}

const markBuf = await trimmed(MARK);
const wordBuf = await trimmed(WORD);
const wMeta = await sharp(wordBuf).metadata();

const written = [];
const put = async (name, buf) => {
  await writeFile(join(PUB, name), buf);
  written.push(name);
};

// ---- favicons ---------------------------------------------------------------
for (const size of [32, 96, 192, 512]) {
  await put(size === 96 ? 'favicon.png' : `favicon-${size}.png`, await icon(markBuf, size));
}
// iOS composites a transparent touch icon onto black, which would swallow the
// navy discs — this one gets an explicit white ground. The white "6" still
// reads because it sits inside the bright blue disc.
await put('apple-touch-icon.png',
  await icon(markBuf, 180, { background: { r: 255, g: 255, b: 255, alpha: 1 }, pad: 0.1 }));

// ---- wordmark + mark --------------------------------------------------------
// The header renders the wordmark ~28px tall, the terms hero ~44px. 160px is
// crisp for both at 3x; larger is bytes nobody sees.
const H = 160;
const w = Math.round((wMeta.width / wMeta.height) * H);
await put('logo-wordmark.png',
  await sharp(wordBuf).resize(w, H).png({ compressionLevel: 9, palette: true }).toBuffer());
await put('logo-mark.png',
  await sharp(markBuf).resize(null, H).png({ compressionLevel: 9, palette: true }).toBuffer());

// ---- hero plate -------------------------------------------------------------
const heroMark = await sharp(markBuf).resize({ width: Math.round(HERO_W * 0.66) }).toBuffer();
const hm = await sharp(heroMark).metadata();
await writeFile(join(PUB, 'hero-bg.jpg'), await heroGround()
  .composite([{ input: heroMark, left: Math.round((HERO_W - hm.width) / 2), top: Math.round((HERO_H - hm.height) / 2) }])
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toBuffer());
written.push('hero-bg.jpg');

for (const f of written) console.log(`  ${f.padEnd(22)} ${kb(join(PUB, f))}`);
console.log(`\nwordmark ${w}x${H}; hero ${HERO_W}x${HERO_H}`);
console.log('If the wordmark aspect changed, update the width/height on the <img> tags in');
console.log('Header.tsx, App.tsx and Terms.tsx so the browser reserves the right box.');
