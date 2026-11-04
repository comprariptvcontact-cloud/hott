import BlogOfferBanner from "./components/BlogOfferBanner";
import SiteLinks from "./components/SiteLinks";
import { useEffect, useState } from "react";
import { PricingPlan } from "./types";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import Header from "./components/Header";
import { LiveSportsLeagues, LiveSportsPlatforms } from "./components/LiveSports";
import MovieGrid from "./components/MovieGrid";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import DeviceCompatibility from "./components/DeviceCompatibility";
import ChannelStripe from "./components/ChannelStripe";
import PaymentsAndFaq from "./components/PaymentsAndFaq";
import Hero from "./components/Hero";
import ChannelScrollStrip from "./components/ChannelScrollStrip";
import EuropeCoverage from "./components/EuropeCoverage";
import ContentRows from "./components/ContentRows";
import CheckoutModal from "./components/CheckoutModal";
import BlogGrid from "./components/BlogGrid";
import BlogPost from "./components/BlogPost";
import Terms from "./components/Terms";

import { getPostBySlug } from "./data/allPosts";
import { getBlogText } from "./blogI18n";
import { getTerms } from "./termsText";
import type { LangCode } from "./i18n";
import RichText from "./components/RichText";
import { getKeywordPage } from "./data/keywordPages";

const SITE_ORIGIN = "https://www.hot-iptv.store";

const INDEXABLE = "index, follow, max-image-preview:large, max-snippet:-1";
const NOT_INDEXABLE = "noindex, follow";

const payAlt: Record<string, string> = { de: "Akzeptierte Zahlungsmethoden", en: "Accepted payment methods", nl: "Geaccepteerde betaalmethoden" };
const socialHeading: Record<string, string> = { de: "SOZIALE MEDIEN", en: "SOCIAL MEDIA", nl: "SOCIALE MEDIA" };

const HOME_LANGS = ["de", "nl", "en"] as const;
type HomeLang = (typeof HOME_LANGS)[number];

function isHomeLang(s: string): s is HomeLang {
  return (HOME_LANGS as readonly string[]).includes(s);
}

type View =
  | { type: "geo-redirect" }
  | { type: "home"; homeLang: HomeLang }
  | { type: "blog-grid" }
  | { type: "blog-post"; slug: string }
  | { type: "keyword-page"; slug: string }
  | { type: "terms" }
  | { type: "not-found" };

/** Extract the optional /{lang} prefix and the remaining path. */
function parsePath(): { lang: HomeLang | null; rest: string } {
  const raw = window.location.pathname.replace(/\/+$/, "") || "/";
  const m = raw.match(/^\/(de|nl|en)(\/.*)?$/);
  if (m) return { lang: m[1] as HomeLang, rest: m[2]?.replace(/\/+$/, "") || "/" };
  return { lang: null, rest: raw };
}

function resolveView(): { view: View; urlLang: HomeLang | null } {
  const { lang, rest } = parsePath();

  if (!lang && rest === "/") return { view: { type: "geo-redirect" }, urlLang: null };

  if (lang && rest === "/") return { view: { type: "home", homeLang: lang }, urlLang: lang };

  const effectiveRest = rest;
  if (effectiveRest === "/blog") return { view: { type: "blog-grid" }, urlLang: lang };
  if (effectiveRest === "/agb") return { view: { type: "terms" }, urlLang: lang };

  const match = effectiveRest.match(/^\/blog\/([^/]+)$/);
  if (match && getPostBySlug(match[1])) return { view: { type: "blog-post", slug: match[1] }, urlLang: lang };

  // Root-level SEO keyword landing pages, e.g. /iptv-kopen, /iptv-nederland.
  if (!lang) {
    const kwSlug = effectiveRest.replace(/^\//, "");
    if (getKeywordPage(kwSlug)) return { view: { type: "keyword-page", slug: kwSlug }, urlLang: null };
  }

  return { view: { type: "not-found" }, urlLang: lang };
}

function setMetaByName(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function GeoRedirect() {
  useEffect(() => {
    // English is the default home page. Only an explicit language the visitor
    // picked in the switcher (persisted in localStorage) overrides it; everyone
    // else — regardless of region — lands on /en.
    try {
      const stored = window.localStorage.getItem("dark.lang");
      if (stored && isHomeLang(stored)) {
        window.location.replace(`/${stored}`);
        return;
      }
    } catch { /* ignore */ }

    window.location.replace("/en");
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#facc15] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppInner({ view, urlLang }: { view: View; urlLang: HomeLang | null }) {
  const { t, dir, lang, setLang } = useLanguage();
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const isHome = view.type === "home";
  // The keyword landing pages render the Pricing section inline, so in-page
  // anchor scrolling works there exactly as it does on the home page.
  const isScrollable = view.type === "home" || view.type === "keyword-page";

  useEffect(() => {
    if (view.type === "home") {
      setLang(view.homeLang as LangCode);
    } else if (urlLang) {
      setLang(urlLang as LangCode);
    }
  }, [view, urlLang, setLang]);

  const langPrefix = `/${lang === "nl" ? "nl" : lang === "de" ? "de" : "en"}`;

  const scrollToSection = (id: string) => {
    if (!isScrollable) {
      window.location.href = `${langPrefix}/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (view.type !== "home") return;
    const id = window.location.hash.slice(1);
    if (!id) return;

    let timer = 0;
    let lastTop: number | null = null;
    let stopped = false;
    const deadline = Date.now() + 4000;

    const stop = () => {
      stopped = true;
      window.clearTimeout(timer);
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("keydown", stop, { once: true });

    const settle = () => {
      if (stopped) return;
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (lastTop === null || Math.abs(top - lastTop) > 2) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          lastTop = top;
        } else {
          stop();
          return;
        }
      }
      if (Date.now() < deadline) timer = window.setTimeout(settle, 120);
    };
    settle();

    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [view]);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (view.type === "not-found") {
      setMetaByName("robots", NOT_INDEXABLE);
      document.title = `${getBlogText(lang).notFoundTitle} — HotPlayer`;
      setMetaByName("description", getBlogText(lang).notFoundDesc);
      link?.remove();
      return;
    }

    setMetaByName("robots", INDEXABLE);

    if (view.type === "keyword-page") {
      const kp = getKeywordPage(view.slug);
      if (kp) {
        document.title = kp.title;
        setMetaByName("description", kp.description);
      }
    }

    if (view.type === "terms") {
      const tt = getTerms(lang);
      document.title = `${tt.title1} ${tt.title2} — HotPlayer`;
      setMetaByName("description", tt.intro);
    }

    const path = window.location.pathname.replace(/\/+$/, "");
    const canonicalUrl = `${SITE_ORIGIN}${path || "/"}`;
    if (link) {
      link.setAttribute("href", canonicalUrl);
    } else {
      const created = document.createElement("link");
      created.setAttribute("rel", "canonical");
      created.setAttribute("href", canonicalUrl);
      document.head.appendChild(created);
    }
  }, [view, lang]);

  if (view.type === "geo-redirect") return <GeoRedirect />;

  return (
    <div
      dir={dir}
      className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#facc15] selection:text-white w-full"
    >
      <Header
        langPrefix={langPrefix}
        onMoviesClick={() => scrollToSection("movies-section")}
        onPricingClick={() => scrollToSection("pricing-section")}
        onReviewsClick={() => scrollToSection("reviews-section")}
        onChannelsClick={() => scrollToSection("channels-section")}
        onPaymentsClick={() => scrollToSection("payments-section")}
      />

      <main className="flex-grow overflow-x-clip">
        {view.type === "home" && (
          <>
              <BlogOfferBanner />
            <Hero
              onPricingClick={() => scrollToSection("pricing-section")}
              onTrialClick={() => {
                scrollToSection("pricing-section");
                setTimeout(() => {
                  document.getElementById("plan-1mo")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  document.getElementById("plan-1mo")?.classList.add("ring-2", "ring-[#facc15]");
                  setTimeout(() => document.getElementById("plan-1mo")?.classList.remove("ring-2", "ring-[#facc15]"), 2000);
                }, 600);
              }}
            />
            <ContentRows onPricingClick={() => scrollToSection("pricing-section")} />
            <ChannelScrollStrip onPricingClick={() => scrollToSection("pricing-section")} />
            <Pricing onSelectPlan={setSelectedPlanForCheckout} />
            <LiveSportsPlatforms onPricingClick={() => scrollToSection("pricing-section")} />
            <EuropeCoverage onPricingClick={() => scrollToSection("pricing-section")} />
            <LiveSportsLeagues />
            <MovieGrid onPricingClick={() => scrollToSection("pricing-section")} />
            <DeviceCompatibility onPricingClick={() => scrollToSection("pricing-section")} />

            <div id="payments-section" className="px-4 md:px-8 max-w-4xl mx-auto w-full py-4 scroll-mt-28">
              <img
                src="/PAY1-1-1.svg"
                alt={payAlt[lang] ?? payAlt.en}
                className="w-full h-auto"
              />
            </div>

            <ChannelStripe />
            <Testimonials />
            <PaymentsAndFaq />
          </>
        )}

        {view.type === "keyword-page" && (() => {
          const kp = getKeywordPage(view.slug);
          if (!kp) return null;
          return (
            <>
              <Hero
              onPricingClick={() => scrollToSection("pricing-section")}
              onTrialClick={() => {
                scrollToSection("pricing-section");
                setTimeout(() => {
                  document.getElementById("plan-1mo")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  document.getElementById("plan-1mo")?.classList.add("ring-2", "ring-[#facc15]");
                  setTimeout(() => document.getElementById("plan-1mo")?.classList.remove("ring-2", "ring-[#facc15]"), 2000);
                }, 600);
              }}
            />
              <BlogOfferBanner />
              <MovieGrid onPricingClick={() => scrollToSection("pricing-section")} />
              <section className="px-4 md:px-8 max-w-4xl mx-auto w-full pt-10 pb-4">
                <nav className="text-sm text-white/50 mb-4">
                  <a href={langPrefix} className="hover:text-[#facc15]">HotPlayer</a> › {kp.keyword}
                </nav>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
                  {kp.h1}
                </h1>
                <div className="space-y-5">
                  {kp.lead.map((p, i) =>
                    p.startsWith("## ") ? (
                      <h2 key={i} className="text-2xl sm:text-3xl font-extrabold text-white !mt-10 !mb-2">
                        <RichText text={p.slice(3)} />
                      </h2>
                    ) : (
                      <p key={i} className="text-lg leading-relaxed text-neutral-300">
                        <RichText text={p} />
                      </p>
                    )
                  )}
                </div>
              </section>
              <Pricing onSelectPlan={setSelectedPlanForCheckout} />
              <DeviceCompatibility onPricingClick={() => scrollToSection("pricing-section")} />
              <section className="px-4 md:px-8 max-w-3xl mx-auto w-full py-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">FAQ</h2>
                <div className="space-y-5">
                  {kp.faq.map((f, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-white mb-1">{f.q}</h3>
                      <p className="text-neutral-300">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
              <PaymentsAndFaq />
            </>
          );
        })()}

        {view.type === "blog-grid" && (
          <>
            <div className="pt-6 md:pt-10" />
            <BlogGrid />
          </>
        )}

        {view.type === "blog-post" && (
          <>
            <div className="pt-6 md:pt-10" />
            <BlogPost slug={view.slug} onPricingClick={() => scrollToSection("pricing-section")} />
            <Pricing onSelectPlan={setSelectedPlanForCheckout} />
          </>
        )}

        {view.type === "terms" && (
          <>
            <div className="pt-6 md:pt-10" />
            <Terms />
          </>
        )}

        {view.type === "not-found" && (
          <section className="px-4 md:px-8 max-w-2xl mx-auto w-full py-24 text-center">
            <h1 className="text-3xl font-extrabold text-white mb-3">
              {getBlogText(lang).notFoundTitle}
            </h1>
            <p className="serif-display italic font-light text-lg text-neutral-500 mb-8">
              {getBlogText(lang).notFoundDesc}
            </p>
            <a href={langPrefix} className="inline-flex items-center gap-2 text-[#facc15] font-bold hover:underline">
              IPTV MATE
            </a>
          </section>
        )}
      </main>

      <footer className="mt-16 text-white bg-black">
        <SiteLinks lang={lang} langPrefix={langPrefix} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-left">
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-5">{t.footer.sub1}</h5>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-neutral-400 hover:text-white transition-colors">{t.footer.link1}</button></li>
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-neutral-400 hover:text-white transition-colors">{t.footer.link2}</button></li>
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-neutral-400 hover:text-white transition-colors">{t.footer.link3}</button></li>
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-neutral-400 hover:text-white transition-colors">{t.footer.link4}</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-5">{t.footer.sub2}</h5>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection("faq-section")} className="text-neutral-400 hover:text-white transition-colors">{t.footer.link6}</button></li>
              <li><a href={`${langPrefix}/agb`} className="text-neutral-400 hover:text-white transition-colors no-underline">{t.nav.terms}</a></li>
              <li><button onClick={() => scrollToSection("faq-section")} className="text-neutral-400 hover:text-white transition-colors">{t.faq.supportCta}</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-5">{t.footer.sub3}</h5>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection("channels-section")} className="text-neutral-400 hover:text-white transition-colors">{t.footer.link5}</button></li>
              <li><button onClick={() => scrollToSection("movies-section")} className="text-neutral-400 hover:text-white transition-colors">{t.nav.movies}</button></li>
              <li><a href={`${langPrefix}/blog`} className="text-neutral-400 hover:text-white transition-colors no-underline">{t.nav.blog}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-5">{socialHeading[lang] ?? socialHeading.en}</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors no-underline flex items-center gap-2"><span className="text-white/50 text-xs">f</span> Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors no-underline flex items-center gap-2"><span className="text-white/50 text-xs">𝕏</span> Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors no-underline flex items-center gap-2"><span className="text-white/50 text-xs">▶</span> YouTube</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors no-underline flex items-center gap-2"><span className="text-white/50 text-xs">◎</span> Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-3">
            <p className="text-xs text-neutral-500 mb-4">{t.footer.copyright}</p>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-8 flex flex-wrap gap-6 text-xs text-neutral-500">
            <a href={`${langPrefix}/agb`} className="hover:text-white transition-colors no-underline">{t.nav.terms}</a>
            <button onClick={() => scrollToSection("faq-section")} className="hover:text-white transition-colors">{t.faq.subtitle}</button>
            <a href={`${langPrefix}/blog`} className="hover:text-white transition-colors no-underline">{t.nav.blog}</a>
          </div>
        </div>
      
      {/* network-footer: full IPTV network, bottom of every page */}
      <div data-network-footer className="max-w-7xl mx-auto w-full px-6 md:px-12 py-8 border-t border-neutral-800/50 bg-[#0a0f1c]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 font-mono">Our network</p>
        <p className="text-[11px] leading-relaxed text-neutral-600 break-words">
          <a href="https://www.iptvmeezzy.app" className="hover:text-neutral-300 transition-colors">iptvmeezzy.app</a>{" · "}
          <a href="https://www.internetprotocoltelevision.de" className="hover:text-neutral-300 transition-colors">internetprotocoltelevision.de</a>{" · "}
          <a href="https://www.6iptv.store" className="hover:text-neutral-300 transition-colors">6iptv.store</a>{" · "}
          <a href="https://www.hakunatv-4k.de" className="hover:text-neutral-300 transition-colors">hakunatv-4k.de</a>{" · "}
          <a href="https://www.hakunatv.eu" className="hover:text-neutral-300 transition-colors">hakunatv.eu</a>{" · "}
          <a href="https://magentaiptv.com" className="hover:text-neutral-300 transition-colors">magentaiptv.com</a>{" · "}
          <a href="https://iptvlinekaufen.org" className="hover:text-neutral-300 transition-colors">iptvlinekaufen.org</a>{" · "}
          <a href="https://www.iptvabo8k.com" className="hover:text-neutral-300 transition-colors">iptvabo8k.com</a>{" · "}
          <a href="https://8kiptv.nl" className="hover:text-neutral-300 transition-colors">8kiptv.nl</a>{" · "}
          <a href="https://www.iptv-kopen.net" className="hover:text-neutral-300 transition-colors">iptv-kopen.net</a>{" · "}
          <a href="https://www.iptv-kopen.org" className="hover:text-neutral-300 transition-colors">iptv-kopen.org</a>{" · "}
          <a href="https://www.omniiptv.app" className="hover:text-neutral-300 transition-colors">omniiptv.app</a>{" · "}
          <a href="https://www.omniiptv.org" className="hover:text-neutral-300 transition-colors">omniiptv.org</a>{" · "}
          <a href="https://neroiptv.pro" className="hover:text-neutral-300 transition-colors">neroiptv.pro</a>{" · "}
          <a href="https://totaaltv.online" className="hover:text-neutral-300 transition-colors">totaaltv.online</a>{" · "}
          <a href="https://amikoiptv.pro" className="hover:text-neutral-300 transition-colors">amikoiptv.pro</a>{" · "}
          <a href="https://voodiptv.eu" className="hover:text-neutral-300 transition-colors">voodiptv.eu</a>{" · "}
          <a href="https://iptvclimb.eu" className="hover:text-neutral-300 transition-colors">iptvclimb.eu</a>{" · "}
          <a href="https://iptvmate.eu" className="hover:text-neutral-300 transition-colors">iptvmate.eu</a>{" · "}
          <a href="https://my4ktvs.com" className="hover:text-neutral-300 transition-colors">my4ktvs.com</a>{" · "}
          <a href="https://myeuroiptv.com" className="hover:text-neutral-300 transition-colors">myeuroiptv.com</a>{" · "}
          <a href="https://www.iptvbelgique.one" className="hover:text-neutral-300 transition-colors">iptvbelgique.one</a>{" · "}
          <a href="https://www.iptvbelgique.store" className="hover:text-neutral-300 transition-colors">iptvbelgique.store</a>{" · "}
          <a href="https://www.swiv-tv.nl" className="hover:text-neutral-300 transition-colors">swiv-tv.nl</a>{" · "}
          <a href="https://ipiptv.store" className="hover:text-neutral-300 transition-colors">ipiptv.store</a>{" · "}
          <a href="https://pandora-iptv.pro" className="hover:text-neutral-300 transition-colors">pandora-iptv.pro</a>{" · "}
          <a href="https://hakunaiptv.pro" className="hover:text-neutral-300 transition-colors">hakunaiptv.pro</a>{" · "}
          <a href="https://darkiptv.eu" className="hover:text-neutral-300 transition-colors">darkiptv.eu</a>{" · "}
          <a href="https://comprariptv-pro.com" className="hover:text-neutral-300 transition-colors">comprariptv-pro.com</a>{" · "}
          <a href="https://optiweb.pro" className="hover:text-neutral-300 transition-colors">optiweb.pro</a>{" · "}
          <a href="https://iptvcotenord.org" className="hover:text-neutral-300 transition-colors">iptvcotenord.org</a>{" · "}
          <a href="https://iptvedge.org" className="hover:text-neutral-300 transition-colors">iptvedge.org</a>{" · "}
          <a href="https://www.besteiptv.site" className="hover:text-neutral-300 transition-colors">besteiptv.site</a>{" · "}
          <a href="https://www.besteiptvneder.land" className="hover:text-neutral-300 transition-colors">besteiptvneder.land</a>{" · "}
          <a href="https://www.denederlandiptv.com" className="hover:text-neutral-300 transition-colors">denederlandiptv.com</a>{" · "}
          <a href="https://www.besteiptvprovider.nl" className="hover:text-neutral-300 transition-colors">besteiptvprovider.nl</a>{" · "}
          <a href="https://www.deiptvneder.land" className="hover:text-neutral-300 transition-colors">deiptvneder.land</a>{" · "}
          <a href="https://www.debesteiptv.site" className="hover:text-neutral-300 transition-colors">debesteiptv.site</a>{" · "}
          <a href="https://www.iptv4k.eu" className="hover:text-neutral-300 transition-colors">iptv4k.eu</a>{" · "}
          <a href="https://www.nliptv.eu" className="hover:text-neutral-300 transition-colors">nliptv.eu</a>{" · "}
          <a href="https://www.premiumdutchiptv.eu" className="hover:text-neutral-300 transition-colors">premiumdutchiptv.eu</a>{" · "}
          <a href="https://www.nederlandsiptv.eu" className="hover:text-neutral-300 transition-colors">nederlandsiptv.eu</a>{" · "}
          <a href="https://www.besteriptv.eu" className="hover:text-neutral-300 transition-colors">besteriptv.eu</a>{" · "}
          <a href="https://www.besteriptvanbieter.app" className="hover:text-neutral-300 transition-colors">besteriptvanbieter.app</a>{" · "}
          <a href="https://www.bestiptvdeutsch.land" className="hover:text-neutral-300 transition-colors">bestiptvdeutsch.land</a>{" · "}
          <a href="https://www.bestiptvanbieter.net" className="hover:text-neutral-300 transition-colors">bestiptvanbieter.net</a>{" · "}
          <a href="https://www.besteriptvanbieter.store" className="hover:text-neutral-300 transition-colors">besteriptvanbieter.store</a>{" · "}
          <a href="https://www.bestiptvgerman.com" className="hover:text-neutral-300 transition-colors">bestiptvgerman.com</a>{" · "}
          <a href="https://www.iptv-deutschland.site" className="hover:text-neutral-300 transition-colors">iptv-deutschland.site</a>{" · "}
          <a href="https://www.iptvkdeutsch.land" className="hover:text-neutral-300 transition-colors">iptvkdeutsch.land</a>{" · "}
          <a href="https://www.iptvkaufendeutsch.land" className="hover:text-neutral-300 transition-colors">iptvkaufendeutsch.land</a>{" · "}
          <a href="https://www.iptvgermanykaufen.de" className="hover:text-neutral-300 transition-colors">iptvgermanykaufen.de</a>{" · "}
          <a href="https://www.iptvlines.eu" className="hover:text-neutral-300 transition-colors">iptvlines.eu</a>{" · "}
          <a href="https://www.deutschiptv.eu" className="hover:text-neutral-300 transition-colors">deutschiptv.eu</a>{" · "}
          <a href="https://www.iptvabokaufen.eu" className="hover:text-neutral-300 transition-colors">iptvabokaufen.eu</a>{" · "}
          <a href="https://www.hot-iptv.online" className="hover:text-neutral-300 transition-colors">hot-iptv.online</a>{" · "}
          <a href="https://www.hot-iptv.site" className="hover:text-neutral-300 transition-colors">hot-iptv.site</a>{" · "}
          <a href="https://www.iptvnorden.eu" className="hover:text-neutral-300 transition-colors">iptvnorden.eu</a>{" · "}
          <a href="https://www.bastaiptvsweden.com" className="hover:text-neutral-300 transition-colors">bastaiptvsweden.com</a>{" · "}
          <a href="https://www.bastaiptv.app" className="hover:text-neutral-300 transition-colors">bastaiptv.app</a>{" · "}
          <a href="https://www.pongoiptv.store" className="hover:text-neutral-300 transition-colors">pongoiptv.store</a>{" · "}
          <a href="https://www.n1iptvsverige.site" className="hover:text-neutral-300 transition-colors">n1iptvsverige.site</a>{" · "}
          <a href="https://www.n1iptv.site" className="hover:text-neutral-300 transition-colors">n1iptv.site</a>{" · "}
          <a href="https://www.iptvsweden.online" className="hover:text-neutral-300 transition-colors">iptvsweden.online</a>{" · "}
          <a href="https://www.iptv-norden.site" className="hover:text-neutral-300 transition-colors">iptv-norden.site</a>{" · "}
          <a href="https://www.bastaiptvsverige.site" className="hover:text-neutral-300 transition-colors">bastaiptvsverige.site</a>{" · "}
          <a href="https://www.bastaiptvnordic.site" className="hover:text-neutral-300 transition-colors">bastaiptvnordic.site</a>{" · "}
          <a href="https://www.bastaiptvnordic.store" className="hover:text-neutral-300 transition-colors">bastaiptvnordic.store</a>{" · "}
          <a href="https://www.bastaiptvsverige.store" className="hover:text-neutral-300 transition-colors">bastaiptvsverige.store</a>
        </p>
      </div>
      </footer>

      {selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          onClose={() => setSelectedPlanForCheckout(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  const { view, urlLang } = resolveView();
  return (
    <LanguageProvider>
      <AppInner view={view} urlLang={urlLang} />
    </LanguageProvider>
  );
}
