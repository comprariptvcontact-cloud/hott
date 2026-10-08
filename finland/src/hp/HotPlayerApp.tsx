import * as React from "react";
import { useEffect, useState } from "react";
import {
  Store,
  Mail,
  Home,
  UploadCloud,
  Tag,
  Star,
  Check,
  Crown,
  Monitor,
  ShieldCheck,
  Zap,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  FileText,
  Lock,
  Menu,
  X,
} from "lucide-react";
import {
  HP_CONTENT,
  HP_DEFAULT_LANG,
  HP_LANGS,
  HpLang,
  isHpLang,
  PLATFORMS,
} from "./content";
import { SUBSCRIPTION_PLANS, WA_NUMBER, PricingPlan } from "../types";
import { getPlanText, planFeatures, planSavings } from "../planText";
import { getExtra } from "../i18nExtra";
import type { LangCode } from "../i18n";
import { BlogGridView, BlogPostView, TermsView } from "./pages";
import { getPostBySlug } from "../data/allPosts";

type Content = (typeof HP_CONTENT)[HpLang];
type TP = { t: Content };

const ORANGE = "#f7941d";
const AMBER = "#f5a623";

/* -------------------------------- routing --------------------------------- */

type Route =
  | { kind: "home" }
  | { kind: "blog" }
  | { kind: "post"; slug: string }
  | { kind: "terms" }
  | { kind: "notfound" };

function parsePath(path: string): { urlLang: HpLang | null; rest: string } {
  const clean = path.replace(/\/+$/, "") || "/";
  const m = clean.match(/^\/(nl|de|en)(\/.*)?$/);
  if (m) return { urlLang: m[1] as HpLang, rest: (m[2] || "/").replace(/\/+$/, "") || "/" };
  return { urlLang: null, rest: clean };
}

function routeFromRest(rest: string): Route {
  if (rest === "/") return { kind: "home" };
  if (rest === "/blog") return { kind: "blog" };
  if (rest === "/agb" || rest === "/terms") return { kind: "terms" };
  const m = rest.match(/^\/blog\/([^/]+)$/);
  if (m && getPostBySlug(m[1])) return { kind: "post", slug: m[1] };
  return { kind: "notfound" };
}

function readStoredLang(): HpLang {
  try {
    const s = window.localStorage.getItem("hp.lang");
    if (s && isHpLang(s)) return s;
  } catch {
    /* ignore */
  }
  return HP_DEFAULT_LANG;
}

/* ------------------------------ seo helpers ------------------------------- */

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertHreflang(hreflang: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Inject (or replace) the JSON-LD structured data block for "Hot IPTV" / HotPlayer. */
function injectJsonLd(lang: HpLang, isHome: boolean) {
  const origin = window.location.origin;
  const t = HP_CONTENT[lang];
  const minPrice = Math.min(...SUBSCRIPTION_PLANS.map((p) => p.price)).toFixed(2);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "SoftwareApplication",
      name: "HotPlayer",
      alternateName: ["Hot IPTV", "HotIPTV", "Hot IPTV Player"],
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Android, Android TV, Tizen, webOS, Roku, Fire OS, iOS",
      description: t.hero.intro,
      url: origin + "/",
      image: origin + "/hpv.png",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: minPrice,
        offerCount: SUBSCRIPTION_PLANS.length,
      },
    },
    {
      "@type": "Organization",
      name: "HotPlayer",
      alternateName: "Hot IPTV",
      url: origin + "/",
      logo: origin + "/logoBlackPlayer.svg",
    },
    {
      "@type": "WebSite",
      name: "HotPlayer — Hot IPTV",
      url: origin + "/",
    },
  ];

  if (isHome) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  let el = document.getElementById("hp-jsonld");
  if (!el) {
    el = document.createElement("script");
    el.id = "hp-jsonld";
    (el as HTMLScriptElement).type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = json;
}

/* --------------------------------- shell ---------------------------------- */

export default function HotPlayerApp() {
  const [path, setPath] = useState<string>(() => window.location.pathname);
  const { urlLang, rest } = parsePath(path);
  const [storedLang, setStoredLang] = useState<HpLang>(() => urlLang ?? readStoredLang());
  const lang = urlLang ?? storedLang;
  const t = HP_CONTENT[lang];
  const langPrefix = `/${lang}`;
  const route = routeFromRest(rest);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const setLang = (next: HpLang) => {
    setStoredLang(next);
    try {
      window.localStorage.setItem("hp.lang", next);
    } catch {
      /* ignore */
    }
    navigate(`${"/" + next}${rest === "/" ? "" : rest}`);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // SEO: titles, canonical, Open Graph URLs and JSON-LD (keyword: "Hot IPTV").
  useEffect(() => {
    const origin = window.location.origin;
    const url = origin + window.location.pathname;

    if (route.kind === "home") {
      document.title = "HotPlayer — Hot IPTV Media Player for Smart TV & Firestick";
      upsertMeta("name", "description", t.seo.metaDescription);
    }

    upsertLink("canonical", url);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", origin + "/hpv.png");
    upsertMeta("name", "twitter:image", origin + "/hpv.png");

    // hreflang alternates for the three language homepages
    (["nl", "de", "en"] as const).forEach((l) => upsertHreflang(l, `${origin}/${l}`));
    upsertHreflang("x-default", `${origin}/nl`);

    injectJsonLd(lang, route.kind === "home");
  }, [route.kind, lang, path, t]);

  // Home-section navigation: scroll if on home, otherwise go home then scroll.
  const goSection = (id: string) => {
    if (route.kind !== "home") {
      navigate(langPrefix || "/");
      setTimeout(() => {
        if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return;
    }
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goPricing = () => goSection("pricing");

  return (
    <div className="min-h-screen bg-white text-[#1f2a44] flex flex-col font-sans selection:bg-[#f5a623] selection:text-white">
      <Header t={t} lang={lang} setLang={setLang} langPrefix={langPrefix} navigate={navigate} goSection={goSection} />
      <main className="flex-grow">
        {route.kind === "home" && (
          <>
            <Hero t={t} />
            <Disclaimer t={t} />
            <Features t={t} />
            <Characteristics t={t} lang={lang} />
            <Trial t={t} />
            <Pricing t={t} lang={lang} />
            <Reseller t={t} />
            <Faq t={t} />
            <SeoSection t={t} />
          </>
        )}
        {route.kind === "blog" && <BlogGridView lang={lang} langPrefix={langPrefix} navigate={navigate} />}
        {route.kind === "post" && (
          <BlogPostView slug={route.slug} lang={lang} langPrefix={langPrefix} navigate={navigate} onPricing={goPricing} />
        )}
        {route.kind === "terms" && <TermsView lang={lang} />}
        {route.kind === "notfound" && (
          <section className="px-4 md:px-8 max-w-2xl mx-auto w-full py-24 text-center">
            <h1 className="text-3xl font-extrabold text-[#1f2a44] mb-3">404</h1>
            <p className="text-neutral-500 mb-8">This page could not be found.</p>
            <a href={langPrefix} onClick={(e) => { e.preventDefault(); navigate(langPrefix); }} className="font-bold no-underline" style={{ color: ORANGE }}>
              HotPlayer
            </a>
          </section>
        )}
      </main>
      <Footer t={t} langPrefix={langPrefix} navigate={navigate} />
    </div>
  );
}

/* --------------------------------- logo ----------------------------------- */

function Logo({ className = "", h = "h-8" }: { className?: string; h?: string }) {
  return (
    <img
      src="/logoBlackPlayer.svg"
      alt="HotPlayer"
      className={`${h} w-auto ${className}`}
    />
  );
}

/* -------------------------------- header ---------------------------------- */

function Header({
  t,
  lang,
  setLang,
  langPrefix,
  navigate,
  goSection,
}: TP & {
  lang: HpLang;
  setLang: (l: HpLang) => void;
  langPrefix: string;
  navigate: (to: string) => void;
  goSection: (id: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Old-style menu: Home, Features, Pricing, FAQ, Blog.
  const tabs = [
    { label: t.nav.home, icon: Home, kind: "section" as const, id: "top" },
    { label: t.nav.features, icon: Star, kind: "section" as const, id: "features" },
    { label: t.nav.pricing, icon: Tag, kind: "section" as const, id: "pricing" },
    { label: t.nav.faq, icon: ChevronDown, kind: "section" as const, id: "faq" },
    { label: t.nav.blog, icon: UploadCloud, kind: "route" as const, to: `${langPrefix}/blog` },
  ];

  const handle = (tab: (typeof tabs)[number]) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (tab.kind === "route") navigate(tab.to);
    else goSection(tab.id);
  };

  return (
    <header id="top" className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* top row */}
        <div className="h-16 flex items-center justify-between gap-4">
          <a href={langPrefix} onClick={(e) => { e.preventDefault(); navigate(langPrefix); }} className="no-underline shrink-0">
            <Logo />
          </a>

          <div className="flex items-center gap-5 md:gap-7">
            <a
              href="#reseller"
              onClick={(e) => { e.preventDefault(); goSection("reseller"); }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#1f2a44] hover:text-[#f7941d] transition-colors no-underline"
            >
              <Store className="w-4 h-4" /> {t.nav.reseller}
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); goSection("contact"); }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#1f2a44] hover:text-[#f7941d] transition-colors no-underline"
            >
              <Mail className="w-4 h-4" /> {t.nav.contact}
            </a>
            <LangSwitcher lang={lang} setLang={setLang} />
            <button
              type="button"
              aria-label="menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden grid place-items-center w-9 h-9 rounded-lg border border-neutral-300 text-[#1f2a44]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* secondary tab nav */}
        <nav className="hidden md:flex items-center gap-8 -mb-px">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const active = i === 0;
            return (
              <a
                key={tab.label}
                href={tab.kind === "route" ? tab.to : `#${tab.id}`}
                onClick={handle(tab)}
                className={`inline-flex items-center gap-2 py-3 text-sm font-medium no-underline border-b-2 transition-colors ${
                  active ? "border-[#f7941d] text-[#1f2a44]" : "border-transparent text-neutral-500 hover:text-[#1f2a44]"
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="px-4 py-3 flex flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <a
                  key={tab.label}
                  href={tab.kind === "route" ? tab.to : `#${tab.id}`}
                  onClick={handle(tab)}
                  className="inline-flex items-center gap-2 py-2.5 text-sm font-medium text-[#1f2a44] no-underline"
                >
                  <Icon className="w-4 h-4 text-[#f7941d]" /> {tab.label}
                </a>
              );
            })}
            <a href="#reseller" onClick={(e) => { e.preventDefault(); setMobileOpen(false); goSection("reseller"); }} className="inline-flex items-center gap-2 py-2.5 text-sm font-medium text-[#1f2a44] no-underline">
              <Store className="w-4 h-4 text-[#f7941d]" /> {t.nav.reseller}
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setMobileOpen(false); goSection("contact"); }} className="inline-flex items-center gap-2 py-2.5 text-sm font-medium text-[#1f2a44] no-underline">
              <Mail className="w-4 h-4 text-[#f7941d]" /> {t.nav.contact}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ lang, setLang }: { lang: HpLang; setLang: (l: HpLang) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-lg bg-[#1f2a44] px-2.5 py-1.5 text-xs font-bold text-white hover:bg-[#2a3658] transition-colors"
      >
        {lang.toUpperCase()}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 z-20 min-w-[6rem] rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
            {HP_LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  l.code === lang ? "bg-neutral-100 text-[#1f2a44] font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* --------------------------------- hero ----------------------------------- */

function Hero({ t }: TP) {
  return (
    <section className="bg-[#f7f7f8]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-14 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* left */}
        <div>
          <span
            className="inline-block rounded-md px-3 py-1.5 text-[11px] md:text-xs font-bold tracking-wide text-[#5c4100]"
            style={{ backgroundColor: AMBER }}
          >
            {t.hero.eyebrow}
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            {t.hero.titleLead}
            <br />
            <span style={{ color: ORANGE }}>{t.hero.brand}</span>
          </h1>

          <p className="mt-5 text-[15px] md:text-base text-neutral-600 leading-relaxed">{t.hero.intro}</p>
          <p className="mt-4 text-[15px] md:text-base text-neutral-600 leading-relaxed">{t.hero.storeNote}</p>

          <div className="mt-6 rounded-md bg-neutral-100 border border-neutral-200 px-4 py-3">
            <p className="text-xs md:text-[13px] text-neutral-500">{t.hero.note}</p>
          </div>

          {/* stats */}
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
            {t.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none" style={{ color: ORANGE }}>
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — available in */}
        <div>
          <h2 className="text-center text-sm font-bold tracking-widest text-neutral-500">{t.platforms.heading}</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="h-[80px] grid place-items-center rounded-xl border border-neutral-200 bg-white px-6 shadow-sm"
              >
                <img src={p.img} alt={p.name} loading="lazy" className="max-h-[44px] w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- disclaimer ------------------------------- */

function Disclaimer({ t }: TP) {
  return (
    <section className="bg-[#fce9e9]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-14">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t.disclaimer.heading}</h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4 text-sm md:text-[15px] text-neutral-700 leading-relaxed">
            <p>{t.disclaimer.p1}</p>
            <p>{t.disclaimer.p2}</p>
          </div>
          <ul className="space-y-4">
            {t.disclaimer.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm md:text-[15px] text-neutral-700">
                <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} strokeWidth={3} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- features -------------------------------- */

function Features({ t }: TP) {
  return (
    <section id="features" className="scroll-mt-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center">
          <h2 className="inline-block text-3xl md:text-4xl font-extrabold tracking-tight pb-2 border-b-4" style={{ borderColor: ORANGE }}>
            {t.features.heading}
          </h2>
          <p className="mt-6 text-neutral-500">{t.features.sub}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.features.items.map((f) => (
            <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 shrink-0" style={{ color: AMBER }} fill={AMBER} />
                <h3 className="text-base font-semibold text-[#1f2a44]">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- characteristics ---------------------------- */

function Characteristics({ t, lang }: TP & { lang: HpLang }) {
  const pt = getPlanText(lang as LangCode);
  return (
    <section id="characteristics" className="scroll-mt-16 bg-[#f7f7f8] border-y border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center">
          <h2 className="inline-block text-3xl md:text-4xl font-extrabold tracking-tight pb-2 border-b-4" style={{ borderColor: ORANGE }}>
            {t.characteristics.heading}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-neutral-500">{t.characteristics.sub}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3.5">
          {pt.common.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-white border border-neutral-200 px-4 py-3 shadow-sm">
              <span className="grid place-items-center w-5 h-5 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: ORANGE }}>
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <span className="text-sm text-[#1f2a44]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- trial ---------------------------------- */

function Trial({ t }: TP) {
  return (
    <section className="bg-gradient-to-r from-[#f6f6f7] via-[#faf3e3] to-[#fdeccf]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1f2a44]">{t.trial.heading}</h2>
          <p className="mt-1.5 text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: ORANGE }}>
            {t.trial.sub}
          </p>
        </div>
        <img src="/hpv.png" alt="HotPlayer" className="shrink-0 h-20 md:h-28 w-auto" />
      </div>
    </section>
  );
}

/* -------------------------------- pricing --------------------------------- */

function fmtPrice(value: number, lang: HpLang): string {
  const s = value.toFixed(2);
  return "€" + (lang === "en" ? s : s.replace(".", ","));
}

// hot palette for the pricing cards
const AMBER_L = "#fbbf24";
const AMBER_D = "#c2740a";

function Pricing({ t, lang }: TP & { lang: HpLang }) {
  const [devices, setDevices] = useState<1 | 2>(1);
  const pt = getPlanText(lang as LangCode);
  const px = getExtra(lang as LangCode).pricing;

  const MONTH_ORDER = [12, 3, 6, 24];
  const plans = SUBSCRIPTION_PLANS.filter((p) => p.devices === devices).sort((a, b) => {
    const ai = MONTH_ORDER.indexOf(a.durationMonths);
    const bi = MONTH_ORDER.indexOf(b.durationMonths);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const waLink = (plan: PricingPlan) => {
    const months = plan.durationMonths + (plan.freeMonths ?? 0);
    const dWord = plan.devices === 1 ? t.pricing.deviceWord : t.pricing.devicesWord;
    const msg = `${t.pricing.waIntro}: ${plan.name} — ${months} ${t.pricing.monthsWord} / ${plan.devices} ${dWord} / ${fmtPrice(plan.price, lang)}`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="pricing" className="scroll-mt-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center">
          <h2 className="inline-block text-3xl md:text-4xl font-extrabold tracking-tight pb-2 border-b-4" style={{ borderColor: ORANGE }}>
            {t.pricing.heading}
          </h2>
          <p className="mt-6 text-neutral-500">{t.pricing.sub}</p>
        </div>

        {/* device toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 p-1">
            {([1, 2] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDevices(d)}
                className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  devices === d ? "bg-white shadow-sm" : "text-neutral-400 hover:text-neutral-600"
                }`}
                style={devices === d ? { color: ORANGE } : undefined}
              >
                {d === 1 ? t.pricing.deviceOne : t.pricing.deviceTwo}
              </button>
            ))}
          </div>
        </div>

        {/* plan grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {plans.map((plan) => {
            const discount = plan.discountPct ?? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);
            const perMonth = (plan.price / (plan.durationMonths + (plan.freeMonths ?? 0))).toFixed(2);
            const perMonthStr = (lang === "en" ? perMonth : perMonth.replace(".", ",")) + " €";
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl overflow-hidden bg-white ${
                  plan.popular ? "border-2 border-[#f7941d] shadow-[0_12px_40px_rgba(247,148,29,0.25)]" : "border border-neutral-200 shadow-sm"
                }`}
              >
                {/* corner ribbon */}
                {plan.popular && (
                  <div
                    className="absolute z-10 pointer-events-none text-white"
                    style={{
                      top: "16px", right: "-34px", width: "140px", textAlign: "center", transform: "rotate(45deg)",
                      background: `linear-gradient(90deg, ${AMBER_D}, ${ORANGE}, ${AMBER_L})`,
                      fontSize: "9px", fontWeight: 900, padding: "5px 0", letterSpacing: "0.12em", textTransform: "uppercase",
                      boxShadow: "0 2px 8px rgba(247,148,29,0.5)",
                    }}
                  >
                    {px.bestSeller}
                  </div>
                )}
                {plan.durationMonths === 3 && (
                  <div
                    className="absolute z-10 pointer-events-none text-[#5c4100]"
                    style={{
                      top: "15px", right: "-36px", width: "140px", textAlign: "center", transform: "rotate(45deg)",
                      background: `linear-gradient(90deg, ${AMBER_L}, ${AMBER})`,
                      fontSize: "8px", fontWeight: 900, padding: "4px 0", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.5,
                    }}
                  >
                    {px.testPack1}<br />{px.testPack2}
                  </div>
                )}

                {/* top stripe */}
                <div className="h-1.5 w-full" style={{ background: plan.popular ? `linear-gradient(90deg, transparent, ${AMBER_L}, transparent)` : "linear-gradient(90deg, transparent, #e5e5e5, transparent)" }} />

                <div className="flex flex-col flex-1 p-6 text-left">
                  {plan.popular && (
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-4 h-4" style={{ color: ORANGE }} />
                      <span className="text-sm font-black uppercase tracking-[0.15em]" style={{ color: ORANGE }}>
                        {t.pricing.popular}
                      </span>
                    </div>
                  )}

                  {/* big months number */}
                  <div className="mb-4">
                    <div className="flex items-end gap-2 leading-none">
                      <span className="text-6xl font-black tracking-tighter leading-none" style={{ color: plan.popular ? ORANGE : "#1f2a44" }}>
                        {plan.durationMonths}
                      </span>
                      <span className="text-sm font-black mb-2 uppercase tracking-widest text-neutral-400">
                        {plan.durationMonths === 1 ? t.pricing.monthWord : t.pricing.monthsWord}
                      </span>
                    </div>

                    {plan.freeMonths ? (
                      <div className="mt-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white"
                          style={{ background: plan.popular ? `linear-gradient(90deg, ${AMBER_D}, ${ORANGE})` : `linear-gradient(90deg, ${AMBER_D}, ${AMBER})` }}
                        >
                          <span className="text-[13px] font-black tracking-tight">+{plan.freeMonths} {px.moShort}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{px.freeShort}</span>
                        </span>
                      </div>
                    ) : null}

                    <div
                      className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(247,148,29,0.1)", border: "1px solid rgba(247,148,29,0.3)" }}
                    >
                      <Monitor className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                      <span className="text-xs font-black uppercase tracking-wider" style={{ color: AMBER_D }}>
                        {plan.devices} {plan.devices === 1 ? t.pricing.deviceWord : t.pricing.devicesWord}
                      </span>
                    </div>
                  </div>

                  {/* savings + discount */}
                  <div className="self-start flex items-center gap-2 mb-4">
                    <span
                      className="text-[11px] font-black py-1 px-3 rounded-full uppercase tracking-wide"
                      style={{ background: "rgba(245,166,35,0.15)", color: AMBER_D, border: "1px solid rgba(245,166,35,0.35)" }}
                    >
                      {planSavings(plan, pt)}
                    </span>
                    <span className="text-3xl font-black leading-none tracking-tighter" style={{ color: ORANGE }}>
                      −{discount}%
                    </span>
                  </div>

                  {/* price */}
                  <div className="pb-4 mb-4 border-b border-neutral-200">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black tracking-tight leading-none text-[#1f2a44]">{fmtPrice(plan.price, lang)}</span>
                      <span className="text-sm line-through pb-0.5 text-neutral-400">{fmtPrice(plan.originalPrice, lang)}</span>
                    </div>
                    <p className="text-lg font-bold mt-1.5" style={{ color: ORANGE }}>
                      ≈ {perMonthStr} {t.pricing.perMonth}
                    </p>
                  </div>

                  {/* features */}
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {planFeatures(plan, pt).slice(0, 12).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 shrink-0 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(247,148,29,0.12)", border: "1px solid rgba(247,148,29,0.3)" }}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} style={{ color: ORANGE }} />
                        </span>
                        <span className="text-[13px] font-medium leading-snug text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={waLink(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center no-underline transition-opacity hover:opacity-90"
                    style={
                      plan.popular
                        ? { background: `linear-gradient(135deg, ${AMBER_D}, ${ORANGE}, ${AMBER_L})`, color: "#fff", boxShadow: "0 4px 20px rgba(247,148,29,0.4)" }
                        : { background: "#f8c86b", color: "#5c4100" }
                    }
                  >
                    {t.pricing.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* trust bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[ShieldCheck, Zap, MessageCircle].map((Icon, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f7f8] border border-neutral-200 text-left">
              <span className="grid place-items-center w-9 h-9 rounded-lg shrink-0" style={{ background: "rgba(247,148,29,0.12)" }}>
                <Icon className="w-5 h-5" style={{ color: ORANGE }} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#1f2a44]">{t.pricing.trust[i].title}</p>
                <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">{t.pricing.trust[i].desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- reseller -------------------------------- */

function Reseller({ t }: TP) {
  return (
    <section id="reseller" className="scroll-mt-16 bg-[#f4f4f5]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1f2a44]">{t.reseller.heading}</h2>
          <p className="mt-1 text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: ORANGE }}>
            {t.reseller.sub}
          </p>
        </div>
        <a
          href="#contact"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#1f2a44] px-6 py-3.5 text-sm font-bold text-white no-underline hover:bg-[#2a3658] transition-colors"
        >
          <Store className="w-4 h-4" /> {t.reseller.cta}
        </a>
      </div>
    </section>
  );
}

/* ---------------------------------- faq ----------------------------------- */

function Faq({ t }: TP) {
  return (
    <section id="faq" className="scroll-mt-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t.faq.heading}</h2>
        <div className="mt-10 space-y-4">
          {t.faq.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-200 bg-[#fafafa] px-5 md:px-6 py-5 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3 md:gap-8"
            >
              <h3 className="text-sm md:text-base font-bold text-[#1f2a44]">{item.q}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ seo section ------------------------------- */

function SeoSection({ t }: TP) {
  return (
    <section className="bg-[#f7f7f8] border-t border-neutral-200">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1f2a44]">{t.seo.heading}</h2>
        <div className="mt-5 space-y-4">
          {t.seo.body.map((p, i) => (
            <p key={i} className="text-[15px] md:text-base text-neutral-600 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer({ t, langPrefix, navigate }: TP & { langPrefix: string; navigate: (to: string) => void }) {
  return (
    <footer id="contact" className="bg-[#f4f4f5] border-t border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm text-neutral-500 text-center md:text-left">{t.footer.copyright}</p>
        <div className="flex items-center gap-6 text-sm">
          <a
            href={`${langPrefix}/agb`}
            onClick={(e) => { e.preventDefault(); navigate(`${langPrefix}/agb`); }}
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-[#1f2a44] no-underline transition-colors"
          >
            <FileText className="w-4 h-4" /> {t.footer.terms}
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-[#1f2a44] no-underline transition-colors">
            <Lock className="w-4 h-4" /> {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
