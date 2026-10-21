/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NETWORK & RESOURCE LINKS  (TODO-4 — internal/external links)
 *
 *  NETWORK_SITES lists every sibling IPTV site in the Netherlands network. The
 *  <SiteLinks> footer renders them as cross-links and automatically filters out
 *  the current site (matched by domain against SITE_URL), so this one list can
 *  be shared verbatim across every site.
 *
 *  AUTHORITY_LINKS are external reference pages (rendered rel="nofollow").
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface NetworkSite {
  /** Visible anchor text. */
  name: string;
  /** Full https:// URL, no trailing slash. */
  url: string;
}

export const NETWORK_SITES: NetworkSite[] = [
  { name: "8K IPTV", url: "https://www.8kiptv.nl" },
  { name: "IPTV Kopen", url: "https://www.iptv-kopen.net" },
  { name: "IPTV Kopen (.org)", url: "https://www.iptv-kopen.org" },
  { name: "OMNI IPTV", url: "https://www.omniiptv.app" },
  { name: "OMNI IPTV (.org)", url: "https://www.omniiptv.org" },
  { name: "Nero IPTV", url: "https://www.neroiptv.pro" },
  { name: "Totaal TV", url: "https://www.totaaltv.online" },
  { name: "Amiko IPTV", url: "https://amikoiptv.pro" },
  { name: "Vood IPTV", url: "https://www.voodiptv.eu" },
  { name: "IPTV Climb", url: "https://www.iptvclimb.eu" },
  { name: "IPTV Mate", url: "https://www.iptvmate.eu" },
  { name: "IP IPTV", url: "https://www.ipiptv.store" },
  { name: "Pandora IPTV", url: "https://www.pandora-iptv.pro" },
  { name: "Hakuna IPTV", url: "https://www.hakunaiptv.pro" },
  { name: "Dark IPTV", url: "https://www.darkiptv.eu" },
  { name: "Hot IPTV", url: "https://www.hotiptv.be" },
  { name: "Swiv TV", url: "https://www.swivtv.be" },
  { name: "Beste IPTV", url: "https://www.besteiptv.site" },
  { name: "Beste IPTV Nederland", url: "https://www.besteiptvneder.land" },
  { name: "Nederland IPTV", url: "https://www.denederlandiptv.com" },
  { name: "Beste IPTV Provider", url: "https://www.besteiptvprovider.nl" },
  { name: "De IPTV Nederland", url: "https://www.deiptvneder.land" },
  { name: "De Beste IPTV", url: "https://www.debesteiptv.site" },
  { name: "IPTV 4K", url: "https://www.iptv4k.eu" },
  { name: "NL IPTV", url: "https://www.nliptv.eu" },
  { name: "Premium Dutch IPTV", url: "https://www.premiumdutchiptv.eu" },
  { name: "Nederlands IPTV", url: "https://www.nederlandsiptv.eu" },
  { name: "Beste IPTV EU", url: "https://www.besteriptv.eu" },
];

export interface AuthorityLink {
  name: string;
  url: string;
}

export const AUTHORITY_LINKS: AuthorityLink[] = [
  { name: "Wat is IPTV? — Wikipedia", url: "https://nl.wikipedia.org/wiki/Internet_Protocol_Television" },
  { name: "Streaming — Wikipedia", url: "https://nl.wikipedia.org/wiki/Streaming" },
  { name: "Smart-tv — Wikipedia", url: "https://nl.wikipedia.org/wiki/Smart-tv" },
  { name: "Kodi mediaspeler — Wikipedia", url: "https://nl.wikipedia.org/wiki/Kodi" },
];
