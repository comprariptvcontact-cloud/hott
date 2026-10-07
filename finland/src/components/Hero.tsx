import { useState, useEffect, memo } from "react";
import { Tv, Play, Globe, Music, SmilePlus, ShoppingBag, MonitorPlay, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface HeroProps {
  onPricingClick: () => void;
  onTrialClick: () => void;
}

interface Slide {
  tag: string;
  title: string;
  titleAccent: string;
  desc: string;
  bg: string;
}

const SLIDE_BG = [
  "/movies/dune_part_two_ver2_xxlg.jpg",
  "/movies/captain_america_brave_new_world_xxlg.jpg",
  "/movies/oppenheimer_xlg.jpg",
  "/movies/thunderbolts_xxlg.jpg",
  "/movies/mission_impossible__the_final_reckoning_xlg.jpg",
];

const heroSlides: Record<string, Slide[]> = {
  de: [
    { tag: "IPTV MATE", title: "Alle Inhalte.", titleAccent: "Ein Abo.", desc: "IPTV Mate: über 69.000 Live-Kanäle, 220.000+ Filme & Serien — sofort auf jedem Gerät.", bg: SLIDE_BG[0] },
    { tag: "LIVE SPORT", title: "Bundesliga, Champions League,", titleAccent: "F1 & mehr.", desc: "Alle großen Ligen und Events live in Ultra HD — ohne Geoblocking.", bg: SLIDE_BG[1] },
    { tag: "FILME & SERIEN", title: "Blockbuster & Originals.", titleAccent: "8K Qualität.", desc: "Netflix, Disney+, HBO, Sky, Prime — alles in einem Abo vereint.", bg: SLIDE_BG[2] },
    { tag: "NEU BEI IPTV MATE", title: "Thunderbolts*.", titleAccent: "Jetzt streamen.", desc: "Marvel-Action pur — exklusiv in deinem IPTV Mate Abo enthalten.", bg: SLIDE_BG[3] },
    { tag: "BLOCKBUSTER 2025", title: "Mission: Impossible.", titleAccent: "The Final Reckoning.", desc: "Tom Cruise kehrt zurück — das ultimative Action-Erlebnis in Ultra HD.", bg: SLIDE_BG[4] },
  ],
  en: [
    { tag: "IPTV MATE", title: "All Content.", titleAccent: "One Plan.", desc: "IPTV Mate: over 69,000 live channels, 220,000+ movies & series — instantly on any device.", bg: SLIDE_BG[0] },
    { tag: "LIVE SPORT", title: "Premier League, Champions League,", titleAccent: "F1 & more.", desc: "All major leagues and events live in Ultra HD — no geo-blocking.", bg: SLIDE_BG[1] },
    { tag: "MOVIES & SERIES", title: "Blockbusters & Originals.", titleAccent: "8K Quality.", desc: "Netflix, Disney+, HBO, Sky, Prime — all united in one plan.", bg: SLIDE_BG[2] },
    { tag: "NEW ON IPTV MATE", title: "Thunderbolts*.", titleAccent: "Stream now.", desc: "Pure Marvel action — exclusively included in your IPTV Mate subscription.", bg: SLIDE_BG[3] },
    { tag: "BLOCKBUSTER 2025", title: "Mission: Impossible.", titleAccent: "The Final Reckoning.", desc: "Tom Cruise returns — the ultimate action experience in Ultra HD.", bg: SLIDE_BG[4] },
  ],
  nl: [
    { tag: "IPTV MATE", title: "Alle content.", titleAccent: "Eén abonnement.", desc: "IPTV Mate: meer dan 69.000 live-zenders, 220.000+ films & series — direct op elk apparaat.", bg: SLIDE_BG[0] },
    { tag: "LIVE SPORT", title: "Eredivisie, Champions League,", titleAccent: "F1 & meer.", desc: "Alle grote competities en evenementen live in Ultra HD — zonder geoblocking.", bg: SLIDE_BG[1] },
    { tag: "FILMS & SERIES", title: "Blockbusters & Originals.", titleAccent: "8K Kwaliteit.", desc: "Netflix, Disney+, HBO, Sky, Prime — alles in één abonnement.", bg: SLIDE_BG[2] },
    { tag: "NIEUW BIJ IPTV MATE", title: "Thunderbolts*.", titleAccent: "Nu streamen.", desc: "Pure Marvel-actie — exclusief inbegrepen in je IPTV Mate abonnement.", bg: SLIDE_BG[3] },
    { tag: "BLOCKBUSTER 2025", title: "Mission: Impossible.", titleAccent: "The Final Reckoning.", desc: "Tom Cruise keert terug — de ultieme actie-ervaring in Ultra HD.", bg: SLIDE_BG[4] },
  ],
};

const heroCategories: Record<string, string[]> = {
  de: ["Aktuelles", "TV", "IPTV MATE+", "Sport", "Musik", "Kids", "Angebote", "Streaming"],
  en: ["News", "TV", "IPTV MATE+", "Sports", "Music", "Kids", "Deals", "Streaming"],
  nl: ["Nieuws", "TV", "IPTV MATE+", "Sport", "Muziek", "Kids", "Aanbiedingen", "Streaming"],
};

const heroCta: Record<string, string> = {
  de: "Mehr erfahren",
  en: "Learn more",
  nl: "Meer informatie",
};

const CATEGORY_ICONS = [Newspaper, Tv, MonitorPlay, Globe, Music, SmilePlus, ShoppingBag, Play];

function HeroInner({ onPricingClick, onTrialClick }: HeroProps) {
  const { t, lang } = useLanguage();
  const slides = heroSlides[lang] ?? heroSlides.en;
  const categories = heroCategories[lang] ?? heroCategories.en;
  const ctaText = heroCta[lang] ?? heroCta.en;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[slide];
  const prev = () => setSlide(s => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide(s => (s + 1) % slides.length);

  return (
    <section className="w-full">
      {/* Hero carousel — full-width background image category tiles */}
      <div className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] flex items-end overflow-hidden bg-black">
        {/* Background image */}
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.bg}
            alt={`IPTV MATE — ${s.tag}`}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0 }}
          />
        ))}

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 z-[1]" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.25) 60%, transparent 100%)"
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 25%, transparent 50%)"
        }} />
        {/* Glow accent */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] z-[2] bg-[#facc15]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-20">
          <div className="max-w-[600px] flex flex-col gap-4">
            <span className="text-[#facc15] text-xs font-bold uppercase tracking-[0.2em]">{current.tag}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
              {current.title}
              <br />
              <span className="text-white/70">{current.titleAccent}</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-[480px]">{current.desc}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <button
                onClick={onPricingClick}
                className="bg-[#facc15] hover:bg-[#eab308] text-white font-bold text-sm px-7 py-3 rounded-sm transition-all"
              >
                {ctaText}
              </button>
              <button
                onClick={onTrialClick}
                className="border border-white/30 hover:border-white/60 text-white font-medium text-sm px-7 py-3 rounded-sm transition-all"
              >
                {t.hero.cta2}
              </button>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-5 left-6 md:left-12 flex items-center gap-3 z-20">
          <button onClick={prev} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? "bg-[#facc15] scale-110" : "bg-white/30"}`} />
            ))}
          </div>
          <button onClick={next} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Category icon tiles */}
      <div className="w-full bg-black py-6 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((label, idx) => {
            const Icon = CATEGORY_ICONS[idx];
            return (
              <button
                key={label}
                onClick={onPricingClick}
                className="shrink-0 w-[120px] md:w-[140px] py-5 rounded-lg border border-white/15 hover:border-white/30 bg-transparent hover:bg-white/5 transition-all flex flex-col items-center gap-2.5 group"
              >
                <Icon className="w-7 h-7 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const Hero = memo(HeroInner);
export default Hero;
