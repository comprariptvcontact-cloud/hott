import { NETWORK_SITES, AUTHORITY_LINKS } from "../networkSites";
import { SITE_URL } from "../siteConfig";
import { KEYWORD_PAGES } from "../data/keywordPages";
import { LangCode } from "../i18n";

/**
 * Footer band with three link groups (TODO-4 internal/external links):
 *   1. Popular pages  — INTERNAL links to this site's keyword landing pages.
 *   2. Our network    — EXTERNAL links to every sibling IPTV site.
 *   3. Useful resources — EXTERNAL nofollow links to reference/authority pages.
 *
 * Shared verbatim across all sites; the current site is filtered out of the
 * network list by comparing domains against SITE_URL.
 */

const HEADINGS: Record<string, { pages: string; network: string; resources: string }> = {
  nl: { pages: "Populaire pagina's", network: "Ons IPTV-netwerk", resources: "Handige bronnen" },
  en: { pages: "Popular pages", network: "Our IPTV network", resources: "Useful resources" },
  de: { pages: "Beliebte Seiten", network: "Unser IPTV-Netzwerk", resources: "Nützliche Links" },
  fr: { pages: "Pages populaires", network: "Notre réseau IPTV", resources: "Ressources utiles" },
  es: { pages: "Páginas populares", network: "Nuestra red IPTV", resources: "Recursos útiles" },
  it: { pages: "Pagine popolari", network: "La nostra rete IPTV", resources: "Risorse utili" },
};

function domainOf(u: string): string {
  return u.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").toLowerCase();
}

interface Props {
  lang: LangCode;
  langPrefix: string;
}

export default function SiteLinks({ lang, langPrefix }: Props) {
  const h = HEADINGS[lang] ?? HEADINGS.nl;
  const self = domainOf(SITE_URL);
  const others = NETWORK_SITES.filter((s) => domainOf(s.url) !== self);
  const pages = KEYWORD_PAGES.slice(0, 10);

  const linkCls = "text-neutral-400 hover:text-white transition-colors no-underline";
  const headCls = "text-sm font-bold uppercase tracking-wider text-white mb-4";

  return (
    <div className="border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div>
          <h5 className={headCls}>{h.pages}</h5>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {pages.map((p) => (
              <li key={p.slug}>
                <a href={`${langPrefix}/${p.slug}`} className={linkCls}>{p.keyword}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className={headCls}>{h.network}</h5>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {others.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkCls}>{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className={headCls}>{h.resources}</h5>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {AUTHORITY_LINKS.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="nofollow noopener noreferrer" className={linkCls}>{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
