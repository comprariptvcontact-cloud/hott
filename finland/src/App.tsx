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

const SITE_ORIGIN = "https://www.neroiptv.pro";

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
    try {
      const stored = window.localStorage.getItem("dark.lang");
      if (stored && isHomeLang(stored)) {
        window.location.replace(`/${stored}`);
        return;
      }
    } catch { /* ignore */ }

    fetch("https://get.geojs.io/v1/ip/country.json")
      .then(r => r.json())
      .then((data: { country: string }) => {
        const c = (data.country || "").toUpperCase();
        if (c === "NL" || c === "BE" || c === "SR") window.location.replace("/nl");
        else if (c === "DE" || c === "AT" || c === "CH" || c === "LI" || c === "LU") window.location.replace("/de");
        else window.location.replace("/en");
      })
      .catch(() => window.location.replace("/en"));
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

  useEffect(() => {
    if (view.type === "home") {
      setLang(view.homeLang as LangCode);
    } else if (urlLang) {
      setLang(urlLang as LangCode);
    }
  }, [view, urlLang, setLang]);

  const langPrefix = `/${lang === "nl" ? "nl" : lang === "de" ? "de" : "en"}`;

  const scrollToSection = (id: string) => {
    if (!isHome) {
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
      document.title = `${getBlogText(lang).notFoundTitle} — NERO IPTV`;
      setMetaByName("description", getBlogText(lang).notFoundDesc);
      link?.remove();
      return;
    }

    setMetaByName("robots", INDEXABLE);

    if (view.type === "terms") {
      const tt = getTerms(lang);
      document.title = `${tt.title1} ${tt.title2} — NERO IPTV`;
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
              NERO IPTV
            </a>
          </section>
        )}
      </main>

      <footer className="mt-16 text-white bg-black">
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
