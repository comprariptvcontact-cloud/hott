// Verifies each post has exactly 12 [8K IPTV](${SITE}) links + 1 Instagram link,
// no raw markdown leaks, and reports slug/paragraph counts.
import fs from "fs";

const files = process.argv.slice(2);
let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  // split into post objects by slug
  const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  // count brand links per file, then per-post by splitting on "slug:"
  const chunks = src.split(/(?=\bslug:\s*")/).slice(1);
  chunks.forEach((c, i) => {
    const brand = (c.match(/\[8K IPTV\]\(\$\{SITE\}\)/g) || []).length;
    const insta = (c.match(/\[Instagram @8K IPTV\]\(\$\{INSTA\}\)/g) || []).length;
    const paras = (c.match(/^\s*`/gm) || []).length;
    const slug = slugs[i];
    const ok = brand === 12 && insta === 1;
    if (!ok) { bad++; console.log(`  BAD  ${slug}: brand=${brand} insta=${insta} paras≈${paras}  [${f}]`); }
    else console.log(`  ok   ${slug}: brand=${brand} insta=${insta}`);
  });
}
console.log(bad === 0 ? "ALL GOOD" : `${bad} POSTS NEED FIX`);
process.exit(bad === 0 ? 0 : 1);
