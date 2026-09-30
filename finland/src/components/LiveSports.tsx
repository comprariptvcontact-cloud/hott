import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface LiveSportsProps {
  onPricingClick: () => void;
}

interface League {
  id: string;
  name: string;
  logo: string;
  categoryKey: string;
}

const categoryLabels: Record<string, Record<string, string>> = {
  de: { motorsport: "Motorsport", cycling: "Radsport", europe: "Europa", mma: "MMA", basketball: "Basketball", iceHockey: "Eishockey" },
  en: { motorsport: "Motorsport", cycling: "Cycling", europe: "Europe", mma: "MMA", basketball: "Basketball", iceHockey: "Ice Hockey" },
  nl: { motorsport: "Motorsport", cycling: "Wielrennen", europe: "Europa", mma: "MMA", basketball: "Basketbal", iceHockey: "IJshockey" },
};

const LEAGUES: League[] = [
  { id: "bl",        name: "Bundesliga",                logo: "/sports/Bundesliga.png",             categoryKey: "DE" },
  { id: "ucl",       name: "UEFA Champions League",     logo: "/sports/UEFA_Champions_League.png",  categoryKey: "europe" },
  { id: "uel",       name: "UEFA Europa League",        logo: "/sports/UEFA_Europa_League.png",     categoryKey: "europe" },
  { id: "uecl",      name: "UEFA Conference League",    logo: "/sports/UEFA_Conference_League.png", categoryKey: "europe" },
  { id: "f1",        name: "Formel 1",                  logo: "/sports/Formula_1.png",              categoryKey: "motorsport" },
  { id: "tdf",       name: "Tour de France",            logo: "/sports/Tour_de_France.png",         categoryKey: "cycling" },
  { id: "pl",        name: "Premier League",            logo: "/sports/Premier_League.png",         categoryKey: "GB" },
  { id: "laliga",    name: "La Liga",                   logo: "/sports/La_Liga.png",                categoryKey: "ES" },
  { id: "sa",        name: "Serie A",                   logo: "/sports/Serie_A.png",                categoryKey: "IT" },
  { id: "l1",        name: "Ligue 1",                   logo: "/sports/Ligue_1.png",                categoryKey: "FR" },
  { id: "erediv",    name: "Eredivisie",                logo: "/sports/Eredivisie.png",             categoryKey: "NL" },
  { id: "cpl",       name: "Challenger Pro League",     logo: "/sports/Challenger_Pro_League.png",  categoryKey: "BE" },
  { id: "primeirap", name: "Primeira Liga",             logo: "/sports/Primeira_Liga.png",          categoryKey: "PT" },
  { id: "superlig",  name: "Süper Lig",                 logo: "/sports/Super_Lig.png",              categoryKey: "TR" },
  { id: "spl",       name: "Saudi Pro League",          logo: "/sports/Saudi_Pro_League.png",       categoryKey: "SA" },
  { id: "bra",       name: "Brasileirão",               logo: "/sports/Brasileirao.png",            categoryKey: "BR" },
  { id: "ligapro",   name: "Liga Profesional",          logo: "/sports/Liga_Profesional.png",       categoryKey: "AR" },
  { id: "caf",       name: "CAF Champions League",      logo: "/sports/CAF_Champions_League.png",   categoryKey: "africa" },
  { id: "ufc",       name: "UFC",                       logo: "/sports/UFC.png",                    categoryKey: "mma" },
  { id: "eurohl",    name: "EuroLeague",                logo: "/sports/UEFA_Champions_League.png",  categoryKey: "basketball" },
  { id: "nhl",       name: "NHL",                      logo: "/sports/NHL.svg",                    categoryKey: "iceHockey" },
  { id: "iihf",      name: "IIHF World Championship", logo: "/sports/IIHF.svg",                   categoryKey: "iceHockey" },
  { id: "can",       name: "Canadian Championship",     logo: "/sports/Canadian_Championship.png",  categoryKey: "CA" },
];

function getLeagueCountry(l: League, lang: string): string {
  const cats = categoryLabels[lang] ?? categoryLabels.en;
  if (cats[l.categoryKey]) return cats[l.categoryKey];
  try {
    const dn = new Intl.DisplayNames([lang], { type: "region" });
    return dn.of(l.categoryKey) ?? l.categoryKey;
  } catch {
    return l.categoryKey;
  }
}

type LogoKind = "svg-file" | "img";

interface Platform {
  id: string;
  name: string;
  subKey: string;
  bg: string;
  logoKind: LogoKind;
  logo: string;
}

const platformSubs: Record<string, Record<string, string>> = {
  de: {
    movSeries: "Filme & Serien",
    disneyOrig: "Disney Originals",
    hboOrig: "HBO Originals",
    amazonOrig: "Amazon Originals",
    appleOrig: "Apple Originals",
    cbsParam: "CBS & Paramount",
    liveTvVod: "Live-TV + VOD",
    liveSport: "Live-Sport",
    sportFilm: "Live-Sport & Filme",
    animeSeries: "Anime & Serien",
    sportMovies: "Sport & Filme",
    seriesMovies: "Serien & Filme",
    entertainment: "Unterhaltung",
    premiumSport: "Premium-Sport",
    sportEntertain: "Sport & Unterhaltung",
    sportCycling: "Sport & Radsport",
    docsSeries: "Dokus & Serien",
    disneyMarvel: "Disney & Marvel",
    paramCbs: "Paramount & CBS",
    boxingMma: "Boxen & MMA live",
    breakingNews: "Eilmeldungen",
  },
  en: {
    movSeries: "Movies & Series",
    disneyOrig: "Disney Originals",
    hboOrig: "HBO Originals",
    amazonOrig: "Amazon Originals",
    appleOrig: "Apple Originals",
    cbsParam: "CBS & Paramount",
    liveTvVod: "Live TV + VOD",
    liveSport: "Live Sport",
    sportFilm: "Live Sport & Movies",
    animeSeries: "Anime & Series",
    sportMovies: "Sport & Movies",
    seriesMovies: "Series & Movies",
    entertainment: "Entertainment",
    premiumSport: "Premium Sport",
    sportEntertain: "Sport & Entertainment",
    sportCycling: "Sport & Cycling",
    docsSeries: "Docs & Series",
    disneyMarvel: "Disney & Marvel",
    paramCbs: "Paramount & CBS",
    boxingMma: "Boxing & MMA live",
    breakingNews: "Breaking News",
  },
  nl: {
    movSeries: "Films & Series",
    disneyOrig: "Disney Originals",
    hboOrig: "HBO Originals",
    amazonOrig: "Amazon Originals",
    appleOrig: "Apple Originals",
    cbsParam: "CBS & Paramount",
    liveTvVod: "Live TV + VOD",
    liveSport: "Live Sport",
    sportFilm: "Live Sport & Films",
    animeSeries: "Anime & Series",
    sportMovies: "Sport & Films",
    seriesMovies: "Series & Films",
    entertainment: "Entertainment",
    premiumSport: "Premium Sport",
    sportEntertain: "Sport & Entertainment",
    sportCycling: "Sport & Wielrennen",
    docsSeries: "Docs & Series",
    disneyMarvel: "Disney & Marvel",
    paramCbs: "Paramount & CBS",
    boxingMma: "Boksen & MMA live",
    breakingNews: "Laatste nieuws",
  },
};

function getPlatformSub(subKey: string, lang: string): string {
  const subs = platformSubs[lang] ?? platformSubs.en;
  return subs[subKey] ?? subKey;
}

const INTL_PLATFORMS: Platform[] = [
  { id: "netflix",   name: "Netflix",      subKey: "movSeries",    bg: "#141414", logoKind: "img", logo: "/logos/netflix.svg"          },
  { id: "disneyp",   name: "Disney+",      subKey: "disneyOrig",   bg: "#000B8C", logoKind: "img", logo: "/logos/disneyplus.png"        },
  { id: "hbo",       name: "HBO Max",       subKey: "hboOrig",      bg: "#ffffff", logoKind: "img", logo: "/logos/hbomax-real.svg"       },
  { id: "prime",     name: "Prime Video",   subKey: "amazonOrig",   bg: "#ffffff", logoKind: "img", logo: "/logos/primevideo.svg"        },
  { id: "appletv",   name: "Apple TV+",     subKey: "appleOrig",    bg: "#f0f0f2", logoKind: "img", logo: "/logos/appletv-real.svg"      },
  { id: "paramount", name: "Paramount+",    subKey: "cbsParam",     bg: "#0064FF", logoKind: "img", logo: "/logos/paramount.svg"        },
  { id: "hulu",      name: "Hulu",          subKey: "liveTvVod",    bg: "#0d0d0d", logoKind: "img", logo: "/logos/hulu.svg"             },
  { id: "dazn",      name: "DAZN",          subKey: "liveSport",    bg: "#111111", logoKind: "img", logo: "/logos/dazn-real.svg"        },
  { id: "espn",      name: "ESPN+",         subKey: "liveSport",    bg: "#CC0000", logoKind: "img", logo: "/logos/espn.svg"             },
  { id: "canal",     name: "Canal+",        subKey: "sportFilm",    bg: "#001A50", logoKind: "img", logo: "/logos/canal.svg"            },
  { id: "crunch",    name: "Crunchyroll",   subKey: "animeSeries",  bg: "#111111", logoKind: "img", logo: "/logos/crunchyroll-real.svg" },
  { id: "sky",       name: "Sky",           subKey: "sportMovies",  bg: "#0072C6", logoKind: "img", logo: "/logos/sky.svg"              },
];

const EU_PLATFORMS: Platform[] = [
  { id: "wowde",     name: "WOW",          subKey: "seriesMovies",    bg: "#00B3B3", logoKind: "img", logo: "/logos/wow.png"            },
  { id: "sport1de",  name: "Sport1",       subKey: "liveSport",       bg: "#E4001B", logoKind: "img", logo: "/logos/sport1.svg"         },
  { id: "rtleu",     name: "RTL+",         subKey: "entertainment",   bg: "#CC0001", logoKind: "img", logo: "/logos/rtlplus.svg"       },
  { id: "beinsp",    name: "beIN Sports",  subKey: "premiumSport",    bg: "#8B0000", logoKind: "img", logo: "/logos/bein.svg"           },
  { id: "skysp",     name: "Sky Sports",   subKey: "sportEntertain",  bg: "#0072C6", logoKind: "img", logo: "/logos/sky.svg"            },
  { id: "dazneu",    name: "DAZN",         subKey: "liveSport",       bg: "#111111", logoKind: "img", logo: "/logos/dazn-real.svg"      },
  { id: "euroeu",    name: "Eurosport",    subKey: "sportCycling",    bg: "#FF6600", logoKind: "img", logo: "/logos/eurosport.svg"     },
  { id: "discoeu",   name: "Discovery+",   subKey: "docsSeries",      bg: "#0070C0", logoKind: "img", logo: "/logos/discovery.svg"     },
  { id: "disneyeu",  name: "Disney+",      subKey: "disneyMarvel",    bg: "#000B8C", logoKind: "img", logo: "/logos/disneyplus.png"    },
  { id: "parameu",   name: "Paramount+",   subKey: "paramCbs",        bg: "#0064FF", logoKind: "img", logo: "/logos/paramount.svg"     },
  { id: "tnteu",     name: "TNT Sports",   subKey: "boxingMma",       bg: "#1a1a1a", logoKind: "img", logo: "/logos/tnt.svg"           },
  { id: "cnneu",     name: "CNN Int'l",    subKey: "breakingNews",    bg: "#ffffff", logoKind: "img", logo: "/logos/cnn-real.svg"      },
];

// ── League Card ────────────────────────────────────────────────────────────────
const LeagueCard: React.FC<{ l: League }> = ({ l }) => (
  <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-white/10 hover:bg-neutral-50 border border-white/10 rounded-2xl p-3 transition-colors shadow-sm" title={l.name}>
    <img
      src={l.logo}
      alt={l.name}
      className="w-full h-full object-contain drop-shadow-sm"
      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
    />
  </div>
);

// ── Platform Card ──────────────────────────────────────────────────────────────
const PlatformCard: React.FC<{ p: Platform; lang: string }> = ({ p, lang }) => {
  return (
    <div
      className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden p-2 shadow-sm"
      style={{ backgroundColor: p.bg }}
      title={`${p.name} — ${getPlatformSub(p.subKey, lang)}`}
    >
      <img
        src={p.logo}
        alt={p.name}
        className="w-full h-full object-contain"
        onError={e => {
          const el = e.currentTarget;
          el.style.display = "none";
          const par = el.parentElement;
          if (par) {
            par.style.backgroundColor = p.bg;
            par.innerHTML = `<span style="color:white;font-size:8px;font-weight:900;text-align:center;line-height:1.2">${p.name}</span>`;
          }
        }}
      />
    </div>
  );
};

// ── Leagues scroll bar (Events) ───────────────────────────────────────────────
export function LiveSportsLeagues() {
  const leaguesTripled = [...LEAGUES, ...LEAGUES, ...LEAGUES];

  return (
    <section id="live-sports-section" className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4 scroll-mt-28">
      <div className="rounded-2xl overflow-hidden relative text-white py-5"
        style={{ background: "linear-gradient(145deg, #1a1a1a 0%, #111 55%, #0a0a0a 100%)" }}>
        <div className="overflow-hidden -mx-4 md:-mx-6 select-none pointer-events-none">
          <div className="animate-scroll flex gap-3 px-4">
            {leaguesTripled.map((l, i) => (
              <div key={`${l.id}-${i}`} className="pointer-events-auto">
                <LeagueCard l={l} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Streaming platforms block ──────────────────────────────────────────────────
export function LiveSportsPlatforms({ onPricingClick }: LiveSportsProps) {
  const { t, lang } = useLanguage();
  const tripled1 = [...INTL_PLATFORMS, ...INTL_PLATFORMS, ...INTL_PLATFORMS];
  const tripled2 = [...EU_PLATFORMS,   ...EU_PLATFORMS,   ...EU_PLATFORMS];

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
      <div className="bg-[#111] text-white rounded-2xl py-8 px-4 md:px-6 relative overflow-hidden ring-1 ring-white/[8]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#facc15]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-0 w-56 h-56 bg-[#facc15]/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mb-5 px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {t.platforms.heading}{" "}
            <span className="serif-display italic font-light text-white/85">{t.platforms.headingItalic}</span>
          </h2>
          <p className="serif-display italic font-light text-xl text-white/75 mt-1">
            {t.platforms.subheading}
          </p>
        </div>

        <div className="overflow-hidden -mx-4 md:-mx-6 mb-3 select-none pointer-events-none">
          <div className="animate-scroll flex gap-3 px-4">
            {tripled1.map((p, i) => <PlatformCard key={`r1-${p.id}-${i}`} p={p} lang={lang} />)}
          </div>
        </div>

        <div className="overflow-hidden -mx-4 md:-mx-6 mb-8 select-none pointer-events-none">
          <div className="animate-scroll-reverse flex gap-3 px-4">
            {tripled2.map((p, i) => <PlatformCard key={`r2-${p.id}-${i}`} p={p} lang={lang} />)}
          </div>
        </div>

        <div className="relative z-10 flex justify-end pt-6 border-t border-white/[8]">
          <button onClick={onPricingClick}
            className="flex items-center gap-2 bg-white text-[#facc15] font-extrabold text-sm px-6 py-2.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-none hover:bg-white/90 transition-all shrink-0">
            <span>{t.platforms.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Combined (legacy order) ────────────────────────────────────────────────────
export default function LiveSports({ onPricingClick }: LiveSportsProps) {
  return (
    <>
      <LiveSportsLeagues />
      <LiveSportsPlatforms onPricingClick={onPricingClick} />
    </>
  );
}
