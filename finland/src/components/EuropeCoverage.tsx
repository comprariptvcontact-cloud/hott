import { WA_NUMBER } from "../types";
import { useLanguage } from "../LanguageContext";
import { getExtra } from "../i18nExtra";

// The DACH countries lead — the rest shows the wider reach for expats and
// households that watch foreign channels.
const COUNTRIES = [
  { code: "de", name: "Deutschland" },
  { code: "at", name: "Österreich" },
  { code: "ch", name: "Schweiz" },
  { code: "gb", name: "Vereinigtes Königreich" },
  { code: "fr", name: "Frankreich" },
  { code: "nl", name: "Niederlande" },
  { code: "be", name: "Belgien" },
  { code: "es", name: "Spanien" },
  { code: "it", name: "Italien" },
  { code: "pt", name: "Portugal" },
  { code: "tr", name: "Türkei" },
  { code: "ma", name: "Marokko" },
  { code: "pl", name: "Polen" },
  { code: "se", name: "Schweden" },
  { code: "no", name: "Norwegen" },
  { code: "dk", name: "Dänemark" },
  { code: "ie", name: "Irland" },
  { code: "lu", name: "Luxemburg" },
  { code: "gr", name: "Griechenland" },
  { code: "ro", name: "Rumänien" },
];

const tripled = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];

interface EuropeCoverageProps {
  onPricingClick: () => void;
}

export default function EuropeCoverage({ onPricingClick }: EuropeCoverageProps) {
  const { lang } = useLanguage();
  const ct = getExtra(lang).coverage;
  // Country names come from the browser rather than a translation table: the strip
  // only ever shows ISO region codes, and Intl already knows them in every language.
  const regionNames = (() => {
    try {
      return new Intl.DisplayNames([lang], { type: "region" });
    } catch {
      return null;
    }
  })();
  const countryName = (c: { code: string; name: string }) => {
    try {
      return regionNames?.of(c.code.toUpperCase()) ?? c.name;
    } catch {
      return c.name;
    }
  };
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(ct.waText)}`;

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-3">
      <div
        className="rounded-2xl py-8 px-5 md:px-10 ring-1 ring-white/[0.08] relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0a0a0a 0%, #111 55%, #0a0a0a 100%)" }}
      >
        {/* Subtle glow accents */}
        <div className="absolute top-0 left-1/4 w-80 h-32 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(250,204,21,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-24 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(250,204,21,0.07) 0%, transparent 70%)" }} />

        {/* Text */}
        <div className="relative z-10 text-center mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#facc15]/60 mb-2">
            {ct.badge}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {ct.title}
          </h2>
          <p className="text-white/40 text-[13px] mt-2 font-normal max-w-md mx-auto leading-relaxed">
            {ct.subtitle}
          </p>
        </div>

        {/* Flag strip with edge fade */}
        <div
          className="relative overflow-hidden -mx-5 md:-mx-10 select-none pointer-events-none mb-7"
          style={{
            paddingBlock: "14px",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="animate-scroll flex gap-6 px-8" style={{ willChange: "transform" }}>
            {tripled.map((c, i) => (
              <div
                key={`${c.code}-${i}`}
                className="shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: 80,
                  height: 54,
                  transform: `rotate(${i % 2 === 0 ? "-6deg" : "-8deg"})`,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.08) inset",
                  outline: "1px solid rgba(255,255,255,0.1)",
                }}
                title={countryName(c)}
              >
                <img
                  src={`https://flagcdn.com/w160/${c.code}.png`}
                  alt={countryName(c)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-[13px] font-bold text-white transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #1aab55 100%)",
              boxShadow: "0 2px 12px rgba(37,211,102,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {ct.contact}
          </a>
          <button
            onClick={onPricingClick}
            className="px-6 py-2.5 rounded-full text-[13px] font-bold text-white transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ca8a04 0%, #facc15 100%)",
              boxShadow: "0 2px 12px rgba(250,204,21,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            {ct.packages}
          </button>
        </div>
      </div>
    </section>
  );
}
