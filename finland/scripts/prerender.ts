/**
 * Post-build prerenderer.
 *
 * The site is a client-rendered Vite SPA. Search engines and social crawlers that
 * fetch a blog URL would otherwise receive the generic index.html shell (same title
 * for every route + a canonical pointing at the homepage), which makes the posts
 * un-indexable. This script emits a real static HTML file per route with its own
 * <title>, meta description, canonical, Open Graph / Twitter tags, Article JSON-LD
 * and the actual article text baked into the HTML, so every post is crawlable and
 * indexable as its own page. It also writes sitemap.xml from the real post list.
 * Runs after `vite build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_POSTS } from "../src/data/allPosts";
import { getPostText, getPostLang, type BlogPost } from "../src/data/blogPosts";
import { SITE_LANG, type LangCode } from "../src/i18n";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
// Canonical origin — must match the host that actually serves 200s.
const SITE = "https://www.hotiptv.be";
const BRAND = "HotPlayer";

// Must match index.html exactly — these are the anchors the template is patched on.
const TPL_HTML_TAG = '<html lang="nl">';
const TPL_CANONICAL = `<link rel="canonical" href="${SITE}/" />`;
const TPL_TITLE =
  "<title>HotPlayer — Hot IPTV Media Player for Smart TV & Firestick</title>";

const template = readFileSync(resolve(DIST, "index.html"), "utf8");

for (const [name, anchor] of Object.entries({ TPL_HTML_TAG, TPL_CANONICAL, TPL_TITLE })) {
  if (!template.includes(anchor)) {
    throw new Error(
      `prerender: ${name} not found in dist/index.html.\n  Expected: ${anchor}\n` +
        `  Update the constant in scripts/prerender.ts to match index.html.`
    );
  }
}

const OG_LOCALE: Record<string, string> = {
  nl: "nl_NL", en: "en_US", fr: "fr_FR", fi: "fi_FI", de: "de_DE", es: "es_ES",
  it: "it_IT", sv: "sv_SE", no: "nb_NO", da: "da_DK", pl: "pl_PL", pt: "pt_PT",
  ro: "ro_RO", cs: "cs_CZ", tr: "tr_TR", ar: "ar_AR",
};

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const stripMd = (s: string): string => s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

const truncate = (s: string, n: number): string =>
  s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).trimEnd() + "…";

/** Convert a body paragraph with [label](url) markdown links into safe HTML with real anchors. */
function paragraphToHtml(text: string): string {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out += esc(text.slice(last, m.index));
    out += `<a href="${esc(m[2])}" rel="noopener">${esc(m[1])}</a>`;
    last = m.index + m[0].length;
  }
  if (last < text.length) out += esc(text.slice(last));
  return out;
}

interface HreflangLink { lang: string; href: string }

interface PageOpts {
  lang: string;
  title: string;
  description: string;
  canonical: string;
  image?: string;
  ogType: "website" | "article";
  jsonLd: object[];
  bodyHtml: string;
  hreflang?: HreflangLink[];
}

function buildPage(o: PageOpts): string {
  const locale = OG_LOCALE[o.lang] ?? "nl_NL";
  const img = o.image ?? `${SITE}/favicon-512.png`;
  const head = [
    `<meta name="description" content="${esc(o.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="${o.ogType}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:url" content="${esc(o.canonical)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(o.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    ...(o.hreflang ?? []).map(
      (h) => `<link rel="alternate" hreflang="${h.lang}" href="${esc(h.href)}" />`
    ),
    ...o.jsonLd.map(
      (j) =>
        `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`
    ),
  ].join("\n    ");

  return template
    .replace(TPL_HTML_TAG, `<html lang="${o.lang}">`)
    .replace(TPL_CANONICAL, `<link rel="canonical" href="${esc(o.canonical)}" />`)
    .replace(TPL_TITLE, `<title>${esc(o.title)}</title>\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root">${o.bodyHtml}</div>`);
}

function hreflangSet(pathSuffix: string): HreflangLink[] {
  return [
    { lang: "de", href: `${SITE}/de${pathSuffix}` },
    { lang: "en", href: `${SITE}/en${pathSuffix}` },
    { lang: "nl", href: `${SITE}/nl${pathSuffix}` },
    { lang: "x-default", href: `${SITE}/nl${pathSuffix}` },
  ];
}

function langToPrefix(lang: string): string {
  if (lang === "de" || lang === "nl" || lang === "en") return `/${lang}`;
  return "/en";
}

function postUrl(slug: string, lang?: string): string {
  const prefix = lang ? langToPrefix(lang) : "/en";
  return `${SITE}${prefix}/blog/${slug}`;
}

// A duplicate slug would silently overwrite one post's page with another's and put
// the same <loc> in the sitemap twice, which Search Console flags as a duplicate.
const seenSlugs = new Set<string>();
for (const post of ALL_POSTS) {
  if (seenSlugs.has(post.slug)) {
    throw new Error(`prerender: duplicate slug "${post.slug}" in ALL_POSTS.`);
  }
  seenSlugs.add(post.slug);
}

// ---- internal link graph --------------------------------------------------
// Without this every post is a dead end: the only links out are "/" and "/blog",
// so ~990 URLs all hang off one hub page with ~990 outbound links each worth
// almost nothing. Google discovers them and then never schedules a crawl.
// Related + prev/next links give each post real inbound links from pages in its
// own language and topic, which is what turns "Discovered" into "Crawled".
const byLang = new Map<string, BlogPost[]>();
for (const post of ALL_POSTS) {
  const lang = getPostLang(post, SITE_LANG);
  const bucket = byLang.get(lang);
  if (bucket) bucket.push(post);
  else byLang.set(lang, [post]);
}
for (const bucket of byLang.values()) {
  bucket.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

const RELATED_COUNT = 6;

const RELATED_HEADING: Record<string, string> = {
  nl: "Meer lezen", de: "Mehr lesen", en: "Read more", fr: "À lire aussi",
  es: "Sigue leyendo", fi: "Lue lisää", sv: "Läs mer", no: "Les mer",
  da: "Læs mere", it: "Continua a leggere", pl: "Czytaj dalej",
  pt: "Leia mais", ro: "Continuă lectura", cs: "Další články",
  tr: "Devamını okuyun", ar: "اقرأ المزيد",
};

/** Same language first, same category before the rest, newest first, never itself. */
function relatedPosts(post: BlogPost, lang: string): BlogPost[] {
  const pool = byLang.get(lang) ?? [];
  const others = pool.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, RELATED_COUNT);
}

function postLinkHtml(p: BlogPost): string {
  const lang = getPostLang(p, SITE_LANG);
  const t = getPostText(p, lang);
  const prefix = langToPrefix(lang);
  return `<li><a href="${prefix}/blog/${p.slug}">${esc(t.title)}</a></li>`;
}

// ---- per-post pages -------------------------------------------------------
let count = 0;
for (const post of ALL_POSTS) {
  const lang = getPostLang(post, SITE_LANG) as LangCode;
  const t = getPostText(post, lang);
  const prefix = langToPrefix(lang);
  const canonical = postUrl(post.slug, lang);
  const description = truncate(stripMd(t.excerpt), 160);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: stripMd(t.excerpt),
    image: [post.image],
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    inLanguage: lang,
    author: { "@type": "Organization", name: BRAND, url: SITE },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/favicon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND, item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}${prefix}/blog` },
      { "@type": "ListItem", position: 3, name: t.title, item: canonical },
    ],
  };

  const bodyHtml = [
    `<article>`,
    `<nav><a href="${prefix}">${BRAND}</a> › <a href="${prefix}/blog">Blog</a></nav>`,
    `<p>${esc(post.category)} · ${post.dateISO} · ${post.minutes} min</p>`,
    `<h1>${esc(t.title)}</h1>`,
    `<p>${esc(stripMd(t.excerpt))}</p>`,
    `<img src="${esc(post.image)}" alt="${esc(t.title)}" width="1200" height="675" />`,
    // A body paragraph starting with "## " becomes a real <h2>, so long posts can carry
    // scannable subheadings (and featured-snippet-friendly sections) instead of one flat
    // wall of <p> tags. Plain paragraphs are unaffected.
    ...t.body.map((p) =>
      p.startsWith("## ") ? `<h2>${paragraphToHtml(p.slice(3))}</h2>` : `<p>${paragraphToHtml(p)}</p>`
    ),
    `</article>`,
    ...(() => {
      const siblings = byLang.get(lang) ?? [];
      const i = siblings.findIndex((p) => p.slug === post.slug);
      const newer = i > 0 ? siblings[i - 1] : undefined;
      const older = i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : undefined;
      const related = relatedPosts(post, lang);
      const out: string[] = [];
      if (related.length) {
        out.push(`<aside><h2>${esc(RELATED_HEADING[lang] ?? RELATED_HEADING.en)}</h2>`);
        out.push(`<ul>${related.map(postLinkHtml).join("")}</ul></aside>`);
      }
      if (newer || older) {
        out.push(
          `<nav>${[
            older ? `<a rel="prev" href="${prefix}/blog/${older.slug}">${esc(getPostText(older, lang).title)}</a>` : "",
            newer ? `<a rel="next" href="${prefix}/blog/${newer.slug}">${esc(getPostText(newer, lang).title)}</a>` : "",
          ]
            .filter(Boolean)
            .join(" · ")}</nav>`
        );
      }
      return out;
    })(),
  ].join("\n");

  const withBrand = `${t.title} — ${BRAND}`;
  const html = buildPage({
    lang,
    title: withBrand.length <= 60 ? withBrand : t.title,
    description,
    canonical,
    image: post.image,
    ogType: "article",
    jsonLd: [articleJsonLd, breadcrumbJsonLd],
    bodyHtml,
  });

  // Directory-style output so the URL /blog/<slug> is served as a real static
  // file WITHOUT needing cleanUrls (which breaks the SPA fallback rewrite).
  const outPath = resolve(DIST, prefix.slice(1), "blog", post.slug, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  count++;
}

// ---- /blog grid page (per language) ----------------------------------------
const sorted = [...ALL_POSTS].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

const BLOG_TITLE: Record<string, string> = {
  de: `HotPlayer Blog — Hot IPTV Anleitungen, Vergleiche & Tipps`,
  en: `HotPlayer Blog — Hot IPTV Guides, Comparisons & Tips`,
  nl: `HotPlayer Blog — Hot IPTV Handleidingen, Vergelijkingen & Tips`,
};
const BLOG_DESC: Record<string, string> = {
  de: "HotPlayer Blog: Hot IPTV-Anleitungen, App-Vergleiche, Installationstipps und Ratgeber zum Abspielen deiner M3U-Playlists und Xtream Codes.",
  en: "HotPlayer Blog: Hot IPTV guides, app comparisons, installation tips and advice for playing your own M3U playlists and Xtream Codes.",
  nl: "HotPlayer Blog: Hot IPTV-handleidingen, app-vergelijkingen, installatietips en advies voor het afspelen van je eigen M3U-afspeellijsten en Xtream Codes.",
};

const HOME_LANGS = ["de", "en", "nl"];

for (const blogLang of HOME_LANGS) {
  const prefix = langToPrefix(blogLang);
  const gridItems = sorted
    .map((post: BlogPost) => {
      const pLang = getPostLang(post, SITE_LANG);
      const t = getPostText(post, pLang);
      const pPrefix = langToPrefix(pLang);
      return [
        `<article>`,
        `<h2><a href="${pPrefix}/blog/${post.slug}">${esc(t.title)}</a></h2>`,
        `<p>${esc(stripMd(t.excerpt))}</p>`,
        `<p>${esc(post.category)} · ${post.dateISO}</p>`,
        `</article>`,
      ].join("\n");
    })
    .join("\n");

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BRAND} Blog`,
    url: `${SITE}${prefix}/blog`,
    inLanguage: blogLang,
    blogPost: sorted.slice(0, 50).map((post) => {
      const pLang = getPostLang(post, SITE_LANG);
      const t = getPostText(post, pLang);
      return {
        "@type": "BlogPosting",
        headline: t.title,
        url: postUrl(post.slug, pLang),
        datePublished: post.dateISO,
      };
    }),
  };

  const blogHtml = buildPage({
    lang: blogLang,
    title: BLOG_TITLE[blogLang] ?? BLOG_TITLE.en,
    description: BLOG_DESC[blogLang] ?? BLOG_DESC.en,
    canonical: `${SITE}${prefix}/blog`,
    ogType: "website",
    jsonLd: [blogJsonLd],
    hreflang: hreflangSet("/blog"),
    bodyHtml: `<h1>${BRAND} Blog</h1>\n${gridItems}`,
  });
  mkdirSync(resolve(DIST, prefix.slice(1), "blog"), { recursive: true });
  writeFileSync(resolve(DIST, prefix.slice(1), "blog", "index.html"), blogHtml, "utf8");
}

// ---- /agb (per language) ---------------------------------------------------
const TERMS_TITLE: Record<string, string> = {
  de: `AGB & Kundenschutz | HotPlayer`,
  en: `Terms & Customer Protection | HotPlayer`,
  nl: `Voorwaarden & Klantbescherming | HotPlayer`,
};
const TERMS_DESC: Record<string, string> = {
  de: "HotPlayer: 15 Tage Rückerstattungsgarantie und 24/7 Support für die Aktivierung. Vollständige AGB und Kundenschutz des HotPlayer Hot IPTV Mediaplayers.",
  en: "HotPlayer: 15-day money-back guarantee and 24/7 support on activation. Full terms and customer protection for the HotPlayer Hot IPTV media player.",
  nl: "HotPlayer: 15 dagen geld-terug-garantie en 24/7 ondersteuning bij activatie. Volledige voorwaarden en klantbescherming van de HotPlayer Hot IPTV mediaspeler.",
};
const TERMS_LABEL: Record<string, string> = { de: "AGB", en: "Terms", nl: "Voorwaarden" };
const TERMS_H1: Record<string, string> = {
  de: "AGB &amp; Kundenschutz",
  en: "Terms &amp; Customer Protection",
  nl: "Voorwaarden &amp; Klantbescherming",
};
const TERMS_CTA: Record<string, string> = {
  de: `<a href="/de">Alle Pakete von ${BRAND} ansehen</a> · <a href="/de/blog">Zum Blog</a>`,
  en: `<a href="/en">View all ${BRAND} plans</a> · <a href="/en/blog">Visit the blog</a>`,
  nl: `<a href="/nl">Bekijk alle ${BRAND} pakketten</a> · <a href="/nl/blog">Naar de blog</a>`,
};

for (const tLang of HOME_LANGS) {
  const prefix = langToPrefix(tLang);
  const tTitle = TERMS_TITLE[tLang] ?? TERMS_TITLE.en;
  const tDesc = TERMS_DESC[tLang] ?? TERMS_DESC.en;
  const tLabel = TERMS_LABEL[tLang] ?? TERMS_LABEL.en;

  const termsHtml = buildPage({
    lang: tLang,
    title: tTitle,
    description: tDesc,
    canonical: `${SITE}${prefix}/agb`,
    ogType: "website",
    hreflang: hreflangSet("/agb"),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: tTitle,
        url: `${SITE}${prefix}/agb`,
        inLanguage: tLang,
        description: tDesc,
        isPartOf: { "@type": "WebSite", name: BRAND, url: SITE },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE}${prefix}` },
          { "@type": "ListItem", position: 2, name: tLabel, item: `${SITE}${prefix}/agb` },
        ],
      },
    ],
    bodyHtml: [
      `<nav><a href="${prefix}">${BRAND}</a> › <a href="${prefix}/agb">${tLabel}</a></nav>`,
      `<h1>${TERMS_H1[tLang] ?? TERMS_H1.en}</h1>`,
      `<p>${esc(tDesc)}</p>`,
      `<p>${TERMS_CTA[tLang] ?? TERMS_CTA.en}</p>`,
    ].join("\n"),
  });
  mkdirSync(resolve(DIST, prefix.slice(1), "agb"), { recursive: true });
  writeFileSync(resolve(DIST, prefix.slice(1), "agb", "index.html"), termsHtml, "utf8");
}

// ---- homepage (per language) -----------------------------------------------
const HOME_TITLE: Record<string, string> = {
  de: "HotPlayer — Hot IPTV Mediaplayer für Smart-TV & Firestick",
  en: "HotPlayer — Hot IPTV Media Player for Smart TV & Firestick",
  nl: "HotPlayer — Hot IPTV Mediaspeler voor Smart TV & Firestick",
};
const HOME_DESC: Record<string, string> = {
  de: "HotPlayer ist der beste Hot IPTV Mediaplayer für Smart-TV, Firestick & Android. Spiele deine eigenen M3U-Playlists oder Xtream Codes in bis zu 8K. Jetzt aktivieren.",
  en: "HotPlayer is the best Hot IPTV media player for Smart TV, Firestick, Roku & Android. Play your own M3U playlists or Xtream Codes in up to 8K. Activate now.",
  nl: "HotPlayer is de beste Hot IPTV mediaspeler voor smart-tv, Firestick & Android. Speel je eigen M3U-afspeellijsten of Xtream Codes af in tot wel 8K. Nu activeren.",
};
const HOME_BODY: Record<string, string[]> = {
  de: [
    `<h1>HotPlayer — Hot IPTV Mediaplayer für Smart-TV & Firestick</h1>`,
    `<p>HotPlayer ist ein Hot IPTV Mediaplayer für Smart-TV, Firestick, Android TV, Roku, Samsung und LG. Die App spielt deine eigenen M3U-Playlists und Xtream Codes ab — es sind keine Sender enthalten.</p>`,
    `<p>Als schlanker Hot IPTV Player bietet HotPlayer eine schnelle, einfache Oberfläche mit Favoriten, Suche, Kindersicherung, Multi-Liste und MAC-Sperre, damit deine Playlist flüssig in bis zu 8K auf jedem Bildschirm läuft.</p>`,
    `<h2>Warum HotPlayer der beste Hot IPTV Player ist</h2>`,
    `<ul>`,
    `<li>Spielt deine eigenen M3U-Playlists und Xtream Codes ab</li>`,
    `<li>Für Smart-TV, Firestick, Android TV, Roku, Samsung und LG</li>`,
    `<li>Favoriten, Suche, Kindersicherung, Multi-Liste und MAC-Sperre</li>`,
    `<li>Wiedergabe in bis zu 8K Ultra HD</li>`,
    `<li>Einmal aktivieren und auf jedem Gerät nutzen</li>`,
    `</ul>`,
    `<p><a href="/de/blog">Alle Ratgeber im Blog</a></p>`,
  ],
  en: [
    `<h1>HotPlayer — Hot IPTV Media Player for Smart TV & Firestick</h1>`,
    `<p>HotPlayer is a Hot IPTV media player built for Smart TV, Firestick, Android TV, Roku, Samsung and LG. It plays your own M3U playlists and Xtream Codes — no channels are included with the app.</p>`,
    `<p>As a lightweight Hot IPTV player, HotPlayer gives you a fast, simple interface with favorites, search, parental controls, multi-list support and MAC lock, so your playlist streams smoothly in up to 8K on any screen.</p>`,
    `<h2>Why HotPlayer is the best Hot IPTV player</h2>`,
    `<ul>`,
    `<li>Plays your own M3U playlists and Xtream Codes</li>`,
    `<li>Works on Smart TV, Firestick, Android TV, Roku, Samsung and LG</li>`,
    `<li>Favorites, search, parental controls, multi-list and MAC lock</li>`,
    `<li>Playback in up to 8K Ultra HD</li>`,
    `<li>Activate once and use on any device</li>`,
    `</ul>`,
    `<p><a href="/en/blog">Browse all guides on the blog</a></p>`,
  ],
  nl: [
    `<h1>HotPlayer — Hot IPTV Mediaspeler voor Smart TV & Firestick</h1>`,
    `<p>HotPlayer is een Hot IPTV mediaspeler voor smart-tv, Firestick, Android TV, Roku, Samsung en LG. De app speelt je eigen M3U-afspeellijsten en Xtream Codes af — er zijn geen zenders inbegrepen.</p>`,
    `<p>Als lichte Hot IPTV speler biedt HotPlayer een snelle, eenvoudige interface met favorieten, zoeken, ouderlijk toezicht, multi-lijst en MAC-vergrendeling, zodat je afspeellijst vloeiend in tot wel 8K op elk scherm speelt.</p>`,
    `<h2>Waarom HotPlayer de beste Hot IPTV speler is</h2>`,
    `<ul>`,
    `<li>Speelt je eigen M3U-afspeellijsten en Xtream Codes af</li>`,
    `<li>Werkt op smart-tv, Firestick, Android TV, Roku, Samsung en LG</li>`,
    `<li>Favorieten, zoeken, ouderlijk toezicht, multi-lijst en MAC-vergrendeling</li>`,
    `<li>Weergave in tot wel 8K Ultra HD</li>`,
    `<li>Eén keer activeren en op elk apparaat gebruiken</li>`,
    `</ul>`,
    `<p><a href="/nl/blog">Bekijk alle handleidingen op de blog</a></p>`,
  ],
};
const AREA_SERVED: Record<string, string> = { de: "Germany", en: "Europe", nl: "Netherlands" };

for (const hLang of HOME_LANGS) {
  const prefix = langToPrefix(hLang);
  const hTitle = HOME_TITLE[hLang] ?? HOME_TITLE.en;
  const hDesc = HOME_DESC[hLang] ?? HOME_DESC.en;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: SITE,
    logo: `${SITE}/favicon-512.png`,
    areaServed: { "@type": "Country", name: AREA_SERVED[hLang] ?? "Europe" },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    url: SITE,
    inLanguage: hLang,
    description: hDesc,
  };

  const homeHtml = buildPage({
    lang: hLang,
    title: hTitle,
    description: hDesc,
    canonical: `${SITE}${prefix}`,
    ogType: "website",
    jsonLd: [orgJsonLd, websiteJsonLd],
    hreflang: hreflangSet(""),
    bodyHtml: [`<nav><a href="${prefix}">${BRAND}</a></nav>`, ...(HOME_BODY[hLang] ?? HOME_BODY.en)].join("\n"),
  });
  mkdirSync(resolve(DIST, prefix.slice(1)), { recursive: true });
  writeFileSync(resolve(DIST, prefix.slice(1), "index.html"), homeHtml, "utf8");
}

// Root index.html — the SPA shell served at "/". Dutch is the default site
// language (SITE_LANG), so the root is rendered in Dutch: a visitor landing on
// "/" sees the Dutch homepage, and the SPA boots in Dutch to match.
const rootOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  url: SITE,
  logo: `${SITE}/favicon-512.png`,
};
const rootWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: SITE,
  inLanguage: SITE_LANG,
  description: HOME_DESC[SITE_LANG] ?? HOME_DESC.nl,
};
const rootHtml = buildPage({
  lang: SITE_LANG,
  title: HOME_TITLE[SITE_LANG] ?? HOME_TITLE.nl,
  description: HOME_DESC[SITE_LANG] ?? HOME_DESC.nl,
  canonical: `${SITE}/`,
  ogType: "website",
  jsonLd: [rootOrgJsonLd, rootWebsiteJsonLd],
  hreflang: hreflangSet(""),
  bodyHtml: [`<nav><a href="/">${BRAND}</a></nav>`, ...(HOME_BODY[SITE_LANG] ?? HOME_BODY.nl)].join("\n"),
});
writeFileSync(resolve(DIST, "index.html"), rootHtml, "utf8");

// ---- sitemap.xml ----------------------------------------------------------
// Generated from the real post list so it can never drift out of sync with the
// pages that were actually emitted above.
//
// Deliberately only <loc> + <lastmod>:
//   * Google ignores <changefreq> and <priority> outright, so they were pure
//     payload — ~2 extra lines on every one of ~950 URLs.
//   * <lastmod> is derived from real post dates instead of `new Date()`. A
//     lastmod that jumps to "today" on every deploy, for every URL, is exactly
//     the pattern Google treats as unreliable and then stops trusting — which
//     costs recrawl priority on the posts that genuinely did change.
const today = new Date().toISOString().slice(0, 10);
const newestPostDate = sorted[0]?.dateISO ?? today;

const urlEntry = (loc: string, lastmod: string) =>
  `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;

// Cosmetic: browsers render a bare sitemap with "This XML file does not appear
// to have any style information associated with it", which looks like an error.
// Crawlers ignore the stylesheet.
const XSL = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

const urlset = (entries: string[]): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    XSL,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n") + "\n";

// One sitemap per language instead of a single 990-URL file. Search Console
// reports coverage per sitemap, so a split makes it visible which language
// group Google actually indexes — and the German pages, the ones this domain
// is actually about, no longer queue behind 700 foreign-language URLs.
const sitemapFiles: string[] = [];

const corePageEntries: string[] = [
  urlEntry(`${SITE}/`, newestPostDate),
];
for (const hLang of HOME_LANGS) {
  const prefix = langToPrefix(hLang);
  corePageEntries.push(urlEntry(`${SITE}${prefix}`, newestPostDate));
  corePageEntries.push(urlEntry(`${SITE}${prefix}/blog`, newestPostDate));
  corePageEntries.push(urlEntry(`${SITE}${prefix}/agb`, today));
}
const corePages = urlset(corePageEntries);
writeFileSync(resolve(DIST, "sitemap-pages.xml"), corePages, "utf8");
sitemapFiles.push("sitemap-pages.xml");

// German first: it is the language of the domain and should be crawled first.
const langOrder = [
  SITE_LANG,
  ...[...byLang.keys()].filter((l) => l !== SITE_LANG).sort(),
];
for (const lang of langOrder) {
  const posts = byLang.get(lang);
  if (!posts?.length) continue;
  const file = `sitemap-blog-${lang}.xml`;
  writeFileSync(
    resolve(DIST, file),
    urlset(posts.map((p) => urlEntry(postUrl(p.slug, lang), p.dateISO))),
    "utf8"
  );
  sitemapFiles.push(file);
}

const sitemapIndex = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  XSL,
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapFiles.map(
    (f) => `  <sitemap>\n    <loc>${SITE}/${f}</loc>\n    <lastmod>${newestPostDate}</lastmod>\n  </sitemap>`
  ),
  "</sitemapindex>",
].join("\n");
writeFileSync(resolve(DIST, "sitemap.xml"), sitemapIndex + "\n", "utf8");

// ---- robots.txt -----------------------------------------------------------
// The crawl rules ship in public/robots.txt; the Sitemap: lines are written
// here so they can never disagree with what was actually emitted. The index is
// listed first, then every child — a crawler that does not expand a sitemap
// index still reaches each language group directly.
const robotsPath = resolve(DIST, "robots.txt");
const robotsRules = readFileSync(robotsPath, "utf8").trimEnd();
writeFileSync(
  robotsPath,
  [
    robotsRules,
    "",
    `Sitemap: ${SITE}/sitemap.xml`,
    ...sitemapFiles.map((f) => `Sitemap: ${SITE}/${f}`),
    "",
  ].join("\n"),
  "utf8"
);

const langPageCount = HOME_LANGS.length * 3; // 3 pages (home, blog, agb) × 3 langs
console.log(
  `Prerendered ${count} post pages + ${langPageCount} lang pages (home/blog/agb × ${HOME_LANGS.length} langs) + root index, ` +
    `wrote a sitemap index over ${sitemapFiles.length} sitemaps (${sorted.length + 1 + langPageCount} URLs), ` +
    `and declared all ${sitemapFiles.length + 1} of them in robots.txt.`
);
