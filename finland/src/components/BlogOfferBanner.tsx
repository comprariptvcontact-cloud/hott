import { useEffect, useState } from "react";
import { Clock, ArrowRight, Check, Zap } from "lucide-react";
import { PricingPlan, SUBSCRIPTION_PLANS, WA_NUMBER } from "../types";
import { useLanguage } from "../LanguageContext";

interface BlogOfferBannerProps {
  /** Optional: opens the in-page checkout modal pre-loaded with the headline
   *  plan. When omitted, the primary button links straight to WhatsApp. */
  onBuy?: (plan: PricingPlan) => void;
}

/** The headline deal: 12 months + 3 free = 15 months total. */
export const OFFER_PLAN =
  SUBSCRIPTION_PLANS.find((p) => p.durationMonths === 12 && p.freeMonths === 3) ??
  SUBSCRIPTION_PLANS.find((p) => p.popular) ??
  SUBSCRIPTION_PLANS[0];

/** A fresh 24-hour window per visitor, remembered in localStorage and
 *  auto-renewed once it runs out, so the offer always reads as "ending soon". */
const DEADLINE_KEY = "biptv_offer_deadline";
const WINDOW_MS = 24 * 60 * 60 * 1000;

function getDeadline(): number {
  try {
    const stored = localStorage.getItem(DEADLINE_KEY);
    if (stored) {
      const ts = parseInt(stored, 10);
      if (Number.isFinite(ts) && ts > Date.now()) return ts;
    }
  } catch { /* private mode / blocked storage */ }
  const next = Date.now() + WINDOW_MS;
  try { localStorage.setItem(DEADLINE_KEY, String(next)); } catch { /* ignore */ }
  return next;
}

const pad = (n: number) => String(n).padStart(2, "0");

interface Copy {
  badge: string; title: string; sub: string;
  perMonth: string; ends: string; cta: string; order: string;
  f1: string; f2: string; f3: string;
  u: string; m: string; s: string;
  wa: (months: number, price: string) => string;
}
const COPY: Record<string, Copy> = {
  nl: { badge: "Tijdelijke weekaanbieding", title: "12 + 3 maanden GRATIS", sub: "15 maanden premium IPTV voor de prijs van 12", perMonth: "/ maand", ends: "Aanbieding verloopt over", cta: "Nu bestellen", order: "Bestel via WhatsApp", f1: "69.000+ live zenders", f2: "Tot 4K/8K", f3: "15 dagen geld-terug", u: "uur", m: "min", s: "sec", wa: (mo, p) => `Hallo, ik wil graag de 12 + 3 maanden aanbieding (${mo} maanden) bestellen voor ${p} €.` },
  en: { badge: "Limited weekly deal", title: "12 + 3 months FREE", sub: "15 months of premium IPTV for the price of 12", perMonth: "/ month", ends: "Offer ends in", cta: "Order now", order: "Order on WhatsApp", f1: "69,000+ live channels", f2: "Up to 4K/8K", f3: "15-day money-back", u: "hrs", m: "min", s: "sec", wa: (mo, p) => `Hello, I'd like to order the 12 + 3 months offer (${mo} months) for ${p} €.` },
  de: { badge: "Zeitlich begrenztes Angebot", title: "12 + 3 Monate GRATIS", sub: "15 Monate Premium-IPTV zum Preis von 12", perMonth: "/ Monat", ends: "Angebot endet in", cta: "Jetzt bestellen", order: "Per WhatsApp bestellen", f1: "69.000+ Live-Sender", f2: "Bis zu 4K/8K", f3: "15 Tage Geld-zurück", u: "Std", m: "Min", s: "Sek", wa: (mo, p) => `Hallo, ich möchte das 12 + 3 Monate Angebot (${mo} Monate) für ${p} € bestellen.` },
  fr: { badge: "Offre limitée", title: "12 + 3 mois OFFERTS", sub: "15 mois d'IPTV premium au prix de 12", perMonth: "/ mois", ends: "L'offre se termine dans", cta: "Commander", order: "Commander sur WhatsApp", f1: "69 000+ chaînes live", f2: "Jusqu'à 4K/8K", f3: "Garantie 15 jours", u: "h", m: "min", s: "sec", wa: (mo, p) => `Bonjour, je souhaite commander l'offre 12 + 3 mois (${mo} mois) pour ${p} €.` },
  es: { badge: "Oferta por tiempo limitado", title: "12 + 3 meses GRATIS", sub: "15 meses de IPTV premium al precio de 12", perMonth: "/ mes", ends: "La oferta termina en", cta: "Pedir ahora", order: "Pedir por WhatsApp", f1: "69.000+ canales en vivo", f2: "Hasta 4K/8K", f3: "15 días de garantía", u: "h", m: "min", s: "seg", wa: (mo, p) => `Hola, quiero pedir la oferta de 12 + 3 meses (${mo} meses) por ${p} €.` },
  ar: { badge: "عرض لفترة محدودة", title: "12 + 3 أشهر مجانًا", sub: "15 شهرًا من IPTV المميز بسعر 12", perMonth: "/ شهر", ends: "ينتهي العرض خلال", cta: "اطلب الآن", order: "اطلب عبر واتساب", f1: "+69.000 قناة مباشرة", f2: "حتى 4K/8K", f3: "استرداد خلال 15 يومًا", u: "ساعة", m: "دقيقة", s: "ثانية", wa: (mo, p) => `مرحبًا، أرغب في طلب عرض 12 + 3 أشهر (${mo} شهرًا) مقابل ${p} €.` },
};

export default function BlogOfferBanner({ onBuy }: BlogOfferBannerProps) {
  const { lang } = useLanguage();
  const c = COPY[lang] ?? COPY.en;
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = getDeadline();
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!OFFER_PLAN) return null;

  const price = OFFER_PLAN.price.toFixed(2).replace(".", ",");
  const original = OFFER_PLAN.originalPrice.toFixed(2).replace(".", ",");
  const totalMonths = OFFER_PLAN.durationMonths + (OFFER_PLAN.freeMonths ?? 0);
  const perMonth = (OFFER_PLAN.price / totalMonths).toFixed(2).replace(".", ",");
  const discount =
    OFFER_PLAN.discountPct ??
    Math.round(((OFFER_PLAN.originalPrice - OFFER_PLAN.price) / OFFER_PLAN.originalPrice) * 100);

  const totalSec = Math.floor((remaining ?? WINDOW_MS) / 1000);
  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = totalSec % 60;

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(c.wa(totalMonths, price))}`;

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-10 border-2 border-[#facc15] shadow-lg"
      style={{ background: "linear-gradient(135deg, #15161a 0%, #1d1e24 55%, #15161a 100%)" }}
    >
      {/* accent glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#facc15]/[0.12] blur-3xl pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Left: offer */}
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 bg-[#facc15] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" /> {c.badge}
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white leading-tight">
            {c.title}
          </h2>
          <p className="text-white/70 text-sm sm:text-base mt-1">{c.sub}</p>

          <div className="flex items-end gap-3 mt-4 flex-wrap">
            <span className="text-3xl sm:text-4xl font-black text-[#facc15] leading-none">{price} €</span>
            <span className="text-white/40 line-through text-base mb-0.5">{original} €</span>
            <span className="text-[11px] font-black uppercase bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/40 px-2.5 py-1 rounded-full mb-0.5">−{discount}%</span>
            <span className="serif-display italic font-light text-white/70 text-lg mb-0.5">≈ {perMonth} € {c.perMonth}</span>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-white/75 text-[13px]">
            <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#facc15] shrink-0" /> {c.f1}</li>
            <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#facc15] shrink-0" /> {c.f2}</li>
            <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#facc15] shrink-0" /> {c.f3}</li>
          </ul>
        </div>

        {/* Right: countdown + CTAs */}
        <div className="shrink-0 w-full lg:w-auto flex flex-col items-stretch lg:items-center gap-3 lg:border-l lg:border-white/10 lg:pl-7">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-white/60 text-[11px] uppercase tracking-wider font-bold mb-2">
              <Clock className="w-3.5 h-3.5" /> {c.ends}
            </div>
            <div className="flex items-center justify-center gap-2" role="timer" aria-live="off">
              {[hh, mm, ss].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-2xl sm:text-3xl font-black font-mono text-white tabular-nums min-w-[52px] text-center">
                    {pad(v)}
                  </span>
                  {i < 2 && <span className="text-[#facc15] font-black text-xl">:</span>}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-[46px] sm:gap-[52px] mt-1.5 text-white/40 text-[9px] uppercase tracking-widest font-bold">
              <span>{c.u}</span><span>{c.m}</span><span>{c.s}</span>
            </div>
          </div>

          {onBuy ? (
            <>
              <button
                onClick={() => OFFER_PLAN && onBuy(OFFER_PLAN)}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#facc15] hover:bg-[#eab308] text-black font-black text-sm px-7 py-3.5 rounded-full transition-all shadow-[0_4px_0_#422006] active:translate-y-0.5 active:shadow-none"
              >
                {c.cta} <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto text-center text-white/60 hover:text-white text-xs font-semibold transition-colors"
              >
                {c.order}
              </a>
            </>
          ) : (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#facc15] hover:bg-[#eab308] text-black font-black text-sm px-7 py-3.5 rounded-full transition-all shadow-[0_4px_0_#422006] active:translate-y-0.5 active:shadow-none"
            >
              {c.cta} <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
