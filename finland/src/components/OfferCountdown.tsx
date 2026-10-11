import { useEffect, useState } from "react";
import { Clock, Zap, ArrowRight, MessageCircle } from "lucide-react";

// Per-site constants (swapped by scripts/replicate_de_kw.mjs when this file is
// cloned to the other German sites). BRAND is only used in the heading.
const BRAND = "HotPlayer";
const WA = "https://wa.me/447462229301";

// Rolling 48-hour deadline persisted per visitor. A fixed past date would show an
// expired timer; a date that resets on every render would never feel urgent.
const STORAGE_KEY = "de.offer.deadline";
const WINDOW_MS = 48 * 60 * 60 * 1000;

function getDeadline(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw ? Number(raw) : 0;
    if (stored && stored > Date.now()) return stored;
  } catch { /* ignore */ }
  const next = Date.now() + WINDOW_MS;
  try { window.localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }
  return next;
}

const BADGE = "Zeitlich begrenztes Angebot";
const HEADING = `12 + 3 Monate GRATIS — 15 Monate ${BRAND}`;
const SUB =
  "Zahle 12 Monate und erhalte 3 Monate geschenkt. Das beste Preis-Leistungs-Verhältnis für ein IPTV-Abonnement in Deutschland — nur für kurze Zeit.";
const UNITS: [string, string, string, string] = ["Tage", "Std.", "Min.", "Sek."];
const PERKS = ["220.000+ VOD", "69.000+ Sender", "Permanente Updates", "4K UHD"];
const CTA = "Angebot sichern";
const WA_LABEL = "Per WhatsApp bestellen";
const WA_MSG = `Hallo! Ich möchte das Angebot 12 + 3 Monate GRATIS (15 Monate) von ${BRAND}.`;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

interface OfferCountdownProps {
  onPricingClick: () => void;
}

export default function OfferCountdown({ onPricingClick }: OfferCountdownProps) {
  const [remaining, setRemaining] = useState<number>(WINDOW_MS);

  useEffect(() => {
    const deadline = getDeadline();
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const mins = Math.floor((remaining % 3_600_000) / 60_000);
  const secs = Math.floor((remaining % 60_000) / 1000);
  const cells: [number, string][] = [
    [days, UNITS[0]],
    [hours, UNITS[1]],
    [mins, UNITS[2]],
    [secs, UNITS[3]],
  ];

  const waUrl = `${WA}?text=${encodeURIComponent(WA_MSG)}`;

  return (
    <section
      className="relative overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-10 mb-12 text-white shadow-xl"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #0891b2 100%)" }}
      aria-label={HEADING}
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
          <Zap className="w-3.5 h-3.5" /> {BADGE}
        </span>

        <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold leading-tight">{HEADING}</h2>
        <p className="mt-3 text-white/80 text-sm sm:text-base">{SUB}</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {PERKS.map((p) => (
            <span key={p} className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold">
              {p}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-white/80 text-xs font-mono uppercase tracking-widest">
          <Clock className="w-4 h-4" /> {BADGE}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 sm:gap-3">
          {cells.map(([value, label]) => (
            <div key={label} className="bg-black/30 backdrop-blur rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[64px]">
              <div className="text-2xl sm:text-3xl font-black tabular-nums">{pad(value)}</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onPricingClick}
            className="inline-flex items-center gap-2 bg-white text-[#0f172a] font-black px-7 py-3.5 rounded-full hover:bg-white/90 transition-all"
          >
            {CTA} <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-[#0b1220] font-bold px-7 py-3.5 rounded-full hover:brightness-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" /> {WA_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
