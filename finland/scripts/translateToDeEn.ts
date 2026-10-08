/**
 * One-off migration: leave the blog with German and English posts only, split 50/50.
 *
 * The post set was inherited from the previous Dutch brand and still carries
 * Dutch, Spanish, Finnish, Swedish and Norwegian keyword landing pages. Those
 * are real SEO pages, so they are translated rather than deleted: each one is
 * rewritten as either a German or an English post, chosen so the finished blog
 * lands on an even split.
 *
 *   - title / excerpt / body are translated naturally (not literally),
 *   - the `[IPTV MATE](${SITE})` and `[Instagram @IPTV MATE](${INSTA})` markdown links are
 *     preserved exactly, including their count,
 *   - the slug prefix nl-/es-/fi-/sv-/no-/fr- becomes de- or en-, with a numeric
 *     suffix only where that would collide with an existing post,
 *   - `lang` and the content key become the target language.
 *
 * Output goes to src/data/deTranslatedNN.ts and enTranslatedNN.ts in chunks,
 * leaving the original source files untouched on disk so the migration can be
 * re-run or reverted. Wiring the new files into allPosts.ts (and dropping the
 * old imports) is the last step and is printed at the end.
 *
 * Usage:
 *   npx tsx scripts/translateToDeEn.ts --dry-run   # plan + split, no API calls, no key needed
 *   set GEMINI_API_KEY=...                         (or put it in .env.local)
 *   npx tsx scripts/translateToDeEn.ts --limit 20  # first 20 posts, for a trial run
 *   npx tsx scripts/translateToDeEn.ts             # everything
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";
import { ALL_POSTS } from "../src/data/allPosts";
import { getPostLang, getPostText, type BlogPost, type BlogPostText } from "../src/data/blogPosts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA = resolve(ROOT, "src", "data");

const SITE = "https://www.hotiptv.be";
const INSTA = "https://www.instagram.com/iptv-mate/";

/** Everything that is neither German nor English gets rewritten. */
const SOURCE_LANGS = ["nl", "es", "fi", "sv", "no", "fr"];
const TARGETS = ["de", "en"] as const;
type Target = (typeof TARGETS)[number];

const CHUNK_SIZE = 20;
const MODEL = "gemini-2.5-flash";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;

const LANG_NAME: Record<string, string> = {
  nl: "Dutch", es: "Spanish", fi: "Finnish", sv: "Swedish", no: "Norwegian", fr: "French",
  de: "German", en: "English",
};

// ---- load .env.local / .env so the key does not have to live in the shell ----
for (const f of [".env.local", ".env"]) {
  const p = resolve(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

// ---- work out what is kept, what is rewritten, and the target split ---------
// A post with no `lang` follows the site language; those all carry English text,
// so they count towards the English side and are pinned to "en" on the way out.
const keep: { post: BlogPost; target: Target; repin: boolean }[] = [];
const toTranslate: BlogPost[] = [];

for (const p of ALL_POSTS) {
  const l = p.lang;
  if (l === "de") keep.push({ post: p, target: "de", repin: false });
  else if (l === "en") keep.push({ post: p, target: "en", repin: false });
  else if (!l) keep.push({ post: p, target: "en", repin: true });
  else if (SOURCE_LANGS.includes(l)) toTranslate.push(p);
  else throw new Error(`post ${p.slug} has unexpected lang "${l}"`);
}

const keptDe = keep.filter((k) => k.target === "de").length;
const keptEn = keep.filter((k) => k.target === "en").length;
const total = ALL_POSTS.length;

// Even split, with the odd post going to German (the site language).
const targetDe = Math.ceil(total / 2);
const targetEn = total - targetDe;
const needDe = targetDe - keptDe;
const needEn = targetEn - keptEn;

if (needDe < 0 || needEn < 0) {
  throw new Error(
    `cannot reach an even split by translating alone: already ${keptDe} de / ${keptEn} en ` +
      `against targets ${targetDe}/${targetEn}. Some posts would have to be dropped.`
  );
}
if (needDe + needEn !== toTranslate.length) {
  throw new Error(`split maths is off: ${needDe} + ${needEn} != ${toTranslate.length}`);
}

// Deterministic order, then spread the German slots evenly across it so every
// source language contributes proportionally to both targets.
toTranslate.sort((a, b) => a.slug.localeCompare(b.slug));
const assignment = new Map<string, Target>();
for (let i = 0; i < toTranslate.length; i++) {
  const before = Math.floor((i * needDe) / toTranslate.length);
  const after = Math.floor(((i + 1) * needDe) / toTranslate.length);
  assignment.set(toTranslate[i].slug, after > before ? "de" : "en");
}

// ---- slug plan -------------------------------------------------------------
const taken = new Set<string>(keep.map((k) => k.post.slug));
const collisions: string[] = [];
const queue: { post: BlogPost; from: string; target: Target; newSlug: string }[] = [];

for (const p of toTranslate) {
  const from = getPostLang(p, "de");
  const target = assignment.get(p.slug)!;
  const stem = p.slug.startsWith(from + "-") ? p.slug.slice(from.length + 1) : p.slug;
  const base = `${target}-${stem}`;
  let slug = base;
  if (taken.has(slug)) {
    collisions.push(`${p.slug} -> ${base}`);
    let i = 2;
    while (taken.has(`${base}-${i}`)) i++;
    slug = `${base}-${i}`;
  }
  taken.add(slug);
  queue.push({ post: p, from, target, newSlug: slug });
}

// ---- report ----------------------------------------------------------------
const bySource = new Map<string, { de: number; en: number }>();
for (const q of queue) {
  const e = bySource.get(q.from) ?? { de: 0, en: 0 };
  e[q.target]++;
  bySource.set(q.from, e);
}

console.log(`total posts:            ${total}`);
console.log(`already German:         ${keptDe}`);
console.log(`already English:        ${keptEn}  (incl. ${keep.filter((k) => k.repin).length} unpinned, to be pinned "en")`);
console.log(`to translate:           ${queue.length}`);
console.log(`  -> German:            ${needDe}`);
console.log(`  -> English:           ${needEn}`);
console.log(`final split:            ${targetDe} de / ${targetEn} en  (${((targetDe / total) * 100).toFixed(1)}% / ${((targetEn / total) * 100).toFixed(1)}%)`);
console.log(`slug collisions:        ${collisions.length}`);
console.log(`\nper source language:`);
for (const [l, e] of [...bySource.entries()].sort()) {
  console.log(`  ${LANG_NAME[l].padEnd(10)} ${String(e.de + e.en).padStart(4)}  ->  ${String(e.de).padStart(3)} de + ${String(e.en).padStart(3)} en`);
}

if (DRY_RUN) {
  if (collisions.length) {
    console.log(`\ncollisions resolved with a numeric suffix:`);
    collisions.slice(0, 20).forEach((c) => console.log("  " + c));
    if (collisions.length > 20) console.log(`  … and ${collisions.length - 20} more`);
  }
  console.log("\ndry run — no API calls made, no files written.");
  process.exit(0);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error(
    "\nGEMINI_API_KEY is not set.\n" +
      'Put it in .env.local as GEMINI_API_KEY="..." or export it, then re-run.\n' +
      "Use --dry-run to inspect the plan without a key."
  );
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

// ---- translation -----------------------------------------------------------
const BRAND_LINK = `[IPTV MATE](${SITE})`;
const INSTA_LINK = `[Instagram @IPTV MATE](${INSTA})`;

const countOf = (s: string, needle: string) => s.split(needle).length - 1;

/**
 * Both targets describe the same German service — the English posts are the
 * English-language face of a German site, not a separate market — so both
 * prompts localise to Germany and neither may mention the source country.
 */
function prompt(text: BlogPostText, from: string, target: Target): string {
  const intoName = target === "de" ? "natural, fluent German (Germany, formal 'Sie')" : "natural, fluent English";
  return [
    `Translate this ${LANG_NAME[from] ?? from} IPTV blog post into ${intoName}.`,
    ``,
    `Hard rules:`,
    `1. Reproduce every markdown link EXACTLY as written, character for character:`,
    `   ${BRAND_LINK}`,
    `   ${INSTA_LINK}`,
    `   Do not translate the link text, do not change the URL, do not add or remove links.`,
    `2. Keep the same number of body paragraphs, in the same order.`,
    `3. Localise for a German audience: refer to Deutschland, German providers`,
    `   (Telekom, Vodafone, 1&1, O2) and German channels/competitions (ARD, ZDF,`,
    `   RTL, Sky Deutschland, DAZN, Bundesliga) where the original referred to its`,
    `   own country's equivalents. Never mention the source country.`,
    `4. Write for search: keep the title punchy and keyword-led, keep the excerpt under 200 characters.`,
    `5. Also return "slug": a short URL slug for this post in the target language —` +
      ` lowercase a-z, digits and hyphens only, 3-7 words, keyword-led, no language prefix,` +
      ` no umlauts or accents (write ä as ae, ö as oe, ü as ue, ß as ss).`,
    `6. Return ONLY minified JSON: {"slug":"...","title":"...","excerpt":"...","body":["...","..."]}`,
    ``,
    JSON.stringify({ title: text.title, excerpt: text.excerpt, body: text.body }),
  ].join("\n");
}

type Translated = BlogPostText & { slug?: string };

/** Slugs come back from the model, so they are sanitised rather than trusted. */
function cleanSlug(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const s = raw
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (s.length < 6 || s.length > 80) return undefined;
  return s;
}

async function translate(text: BlogPostText, from: string, target: Target): Promise<Translated> {
  const wantBrand = countOf([text.title, text.excerpt, ...text.body].join("\n"), BRAND_LINK);
  const wantInsta = countOf([text.title, text.excerpt, ...text.body].join("\n"), INSTA_LINK);

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents: prompt(text, from, target),
      config: { responseMimeType: "application/json", temperature: 0.4 },
    });
    const raw = (res.text ?? "").trim();
    let parsed: Translated;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn(`    attempt ${attempt}: response was not valid JSON, retrying`);
      continue;
    }
    if (!parsed.title || !parsed.excerpt || !Array.isArray(parsed.body)) {
      console.warn(`    attempt ${attempt}: missing fields, retrying`);
      continue;
    }
    const joined = [parsed.title, parsed.excerpt, ...parsed.body].join("\n");
    if (countOf(joined, BRAND_LINK) !== wantBrand || countOf(joined, INSTA_LINK) !== wantInsta) {
      console.warn(`    attempt ${attempt}: link count drifted, retrying`);
      continue;
    }
    if (parsed.body.length !== text.body.length) {
      console.warn(`    attempt ${attempt}: ${parsed.body.length} paragraphs vs ${text.body.length}, retrying`);
      continue;
    }
    return { ...parsed, slug: cleanSlug((parsed as { slug?: unknown }).slug) };
  }
  throw new Error("translation failed after 3 attempts");
}

// ---- emit ------------------------------------------------------------------
/** Turn a runtime string back into a source template literal using ${SITE} / ${INSTA}. */
function toTemplate(s: string): string {
  const escaped = s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  return escaped.split(SITE).join("${SITE}").split(INSTA).join("${INSTA}");
}

const jsonStr = (s: string) => JSON.stringify(s);

function renderPost(p: BlogPost, slug: string, target: Target, t: BlogPostText): string {
  return [
    `  {`,
    `    slug: ${jsonStr(slug)},`,
    `    category: ${jsonStr(p.category)},`,
    `    dateISO: ${jsonStr(p.dateISO)},`,
    `    image: ${jsonStr(p.image)},`,
    `    minutes: ${p.minutes},`,
    `    lang: ${jsonStr(target)},`,
    `    content: {`,
    `      ${target}: {`,
    `        title: \`${toTemplate(t.title)}\`,`,
    `        excerpt: \`${toTemplate(t.excerpt)}\`,`,
    `        body: [`,
    ...t.body.map((b) => `          \`${toTemplate(b)}\`,`),
    `        ],`,
    `      },`,
    `    },`,
    `  },`,
  ].join("\n");
}

function writeChunk(target: Target, index: number, rendered: string[]) {
  const n = String(index).padStart(2, "0");
  const constName = `${target.toUpperCase()}_TRANSLATED_${n}`;
  const file = [
    `import { BlogPost } from "./blogPosts";`,
    ``,
    `const SITE = "${SITE}";`,
    `const INSTA = "${INSTA}";`,
    ``,
    `export const ${constName}: BlogPost[] = [`,
    ...rendered,
    `];`,
    ``,
  ].join("\n");
  const name = `${target}Translated${n}.ts`;
  writeFileSync(resolve(DATA, name), file, "utf8");
  console.log(`  wrote ${name} (${rendered.length} posts)`);
  return constName;
}

// ---- run -------------------------------------------------------------------
const work = queue.slice(0, LIMIT === Infinity ? queue.length : LIMIT);
const done: Record<Target, string[]> = { de: [], en: [] };
const chunkIndex: Record<Target, number> = { de: 1, en: 1 };
const constNames: Record<Target, string[]> = { de: [], en: [] };
let n = 0;

for (const item of work) {
  n++;
  const src = getPostText(item.post, item.from as never);
  process.stdout.write(`[${n}/${work.length}] ${item.from}->${item.target} ${item.post.slug}\n`);
  try {
    const t = await translate(src, item.from, item.target);
    // Prefer a slug written in the target language; the planned one keeps the
    // source language's wording, which is dead weight for search.
    let slug = item.newSlug;
    if (t.slug) {
      const base = `${item.target}-${t.slug}`;
      if (!taken.has(base)) { taken.add(base); taken.delete(item.newSlug); slug = base; }
      else {
        let i = 2;
        while (taken.has(`${base}-${i}`)) i++;
        taken.add(`${base}-${i}`); taken.delete(item.newSlug); slug = `${base}-${i}`;
      }
    }
    done[item.target].push(renderPost(item.post, slug, item.target, t));
  } catch (e) {
    console.error(`  FAILED: ${(e as Error).message}`);
    continue;
  }
  for (const target of TARGETS) {
    if (done[target].length >= CHUNK_SIZE) {
      constNames[target].push(writeChunk(target, chunkIndex[target]++, done[target].splice(0, CHUNK_SIZE)));
    }
  }
}
for (const target of TARGETS) {
  if (done[target].length) {
    constNames[target].push(writeChunk(target, chunkIndex[target]++, done[target]));
  }
}

console.log(`\nDone. Next, in src/data/allPosts.ts:`);
console.log(`  1. delete the NL_/ES_/NO_/SV_/FI_/UK_ imports and their spread arrays,`);
console.log(`  2. add the new ones:`);
for (const target of TARGETS) {
  for (const c of constNames[target]) {
    console.log(`     import { ${c} } from "./${target}Translated${c.slice(-2)}";`);
  }
}
console.log(`  3. pin the ${keep.filter((k) => k.repin).length} unpinned posts in blogPosts.ts to lang: "en".`);
console.log(`Then: npm run lint && npm run build`);
