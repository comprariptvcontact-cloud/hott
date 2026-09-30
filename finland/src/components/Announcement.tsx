import { ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface AnnouncementProps {
  onPricingClick: () => void;
}

const announcementTexts: Record<string, { joinNow: string; badge: string; title1: string; titleAccent: string; title2: string; subtitle1: string; subtitleAccent: string; cta: string; imgAlt: string }> = {
  de: { joinNow: "Jetzt beitreten", badge: "FIFA WM 2026", title1: "Erlebe die", titleAccent: "FIFA WM", title2: "Live.", subtitle1: "In ganz Europa mit uns —", subtitleAccent: "sei dabei!", cta: "Paket wählen", imgAlt: "FIFA Weltmeisterschaft 2026" },
  en: { joinNow: "Join Now", badge: "FIFA World Cup 2026", title1: "Watch the", titleAccent: "FIFA World Cup", title2: "Live.", subtitle1: "All across Europe with us —", subtitleAccent: "be there!", cta: "Choose a plan", imgAlt: "FIFA World Cup 2026" },
  nl: { joinNow: "Nu deelnemen", badge: "FIFA WK 2026", title1: "Bekijk de", titleAccent: "FIFA WK", title2: "Live.", subtitle1: "Overal in Europa met ons —", subtitleAccent: "wees erbij!", cta: "Kies een pakket", imgAlt: "FIFA Wereldkampioenschap 2026" },
};

export default function Announcement({ onPricingClick }: AnnouncementProps) {
  const { lang } = useLanguage();
  const tx = announcementTexts[lang] ?? announcementTexts.en;

  return (
    <div className="flex flex-col gap-3 h-full">

      {/* ── Title ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="serif-display italic font-light text-xl text-white/50 whitespace-nowrap">{tx.joinNow}</span>
      </div>

      {/* ── Card ────────────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group flex-1"
        style={{ minHeight: "260px" }}
        onClick={onPricingClick}
      >
        {/* Photo */}
        <div className="w-full h-full aspect-[4/5] sm:aspect-auto sm:absolute sm:inset-0">
          <img
            src="/wm-banner.png"
            alt={tx.imgAlt}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, rgba(226,0,116,0.75) 0%, rgba(0,30,80,0.50) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Decorative rings */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-white/8 pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 z-10 p-4 sm:p-5 flex flex-col justify-between">

          {/* Top badge */}
          <span className="self-start serif-display italic font-light text-base text-white/60 border border-white/20 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {tx.badge}
          </span>

          {/* Bottom */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-white font-black leading-[1.06] tracking-[-0.02em] text-[1.15rem] sm:text-xl md:text-2xl drop-shadow-sm">
                {tx.title1}{" "}
                <span className="serif-display italic font-light text-white/90">
                  {tx.titleAccent}
                </span>{" "}
                {tx.title2}
              </h3>
              <p className="text-white/60 text-[11px] sm:text-xs mt-1.5 leading-snug font-medium">
                {tx.subtitle1}{" "}
                <span className="serif-display italic text-white/80">{tx.subtitleAccent}</span>
              </p>
            </div>

            <button
              onClick={e => { e.stopPropagation(); onPricingClick(); }}
              className="self-start flex items-center gap-2 bg-white text-[#facc15] font-extrabold text-[11px] px-4 py-2 rounded-full
                         shadow-[0_3px_0_rgba(0,0,0,0.18)] active:translate-y-0.5 active:shadow-none
                         hover:bg-white/90 transition-all"
            >
              <span>{tx.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
