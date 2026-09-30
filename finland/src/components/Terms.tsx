import { ShieldCheck, Clock, RefreshCw, AlertTriangle, Languages, Headphones, XCircle, CheckCircle2, MonitorSmartphone, CreditCard, FileText, Gift, Megaphone, Wrench } from "lucide-react";
import { WA_NUMBER } from "../types";
import { useLanguage } from "../LanguageContext";
import { getTerms } from "../termsText";

const GREEN = "#facc15";

/** One icon per section, in the same order as the fourteen sections of the copy. */
const SECTION_ICONS = [
  ShieldCheck, XCircle, MonitorSmartphone, CreditCard, FileText, Gift, Megaphone,
  Wrench, Headphones, RefreshCw, Clock, Languages, AlertTriangle, CheckCircle2,
];

export default function Terms() {
  const { lang } = useLanguage();
  const tt = getTerms(lang);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(tt.waText)}`;

  return (
    <section className="px-4 md:px-8 max-w-4xl mx-auto w-full py-6 md:py-10">
      {/* Hero — logo + title */}
      <div className="relative rounded-3xl overflow-hidden mb-10 px-6 py-12 md:px-12 md:py-16 text-center"
        style={{ background: "linear-gradient(150deg, #0a0a0a 0%, #111 45%, #0a0a0a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[360px] rounded-full opacity-25"
            style={{ background: `radial-gradient(ellipse, ${GREEN} 0%, transparent 65%)` }} />
        </div>

        <div className="relative z-10">
          {/* PANDORA IPTV wordmark */}
          <div className="inline-flex items-center px-6 py-3 rounded-2xl mb-6 select-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <span className="text-[#facc15] font-black text-2xl tracking-tight uppercase">PANDORA</span>
            <span className="text-white font-black text-2xl tracking-tight uppercase">&nbsp;IPTV</span>
          </div>

          <span className="serif-display italic font-light text-lg md:text-xl text-white/60 block mb-2">
            {tt.eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-white mb-4">
            {tt.title1}<br className="hidden md:block" /> {tt.title2}
          </h1>
          <p className="serif-display italic font-light text-base md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            {tt.intro}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {tt.chips.map(chip => (
              <span key={chip}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white/80"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 md:p-6 mb-10"
        style={{ background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.22)" }}>
        <p className="text-[15px] font-bold text-white leading-relaxed">
          {tt.summary}
        </p>
      </div>

      <div className="space-y-6">
        {tt.sections.map(({ title, body }, si) => {
          const Icon = SECTION_ICONS[si];
          return (
          <div key={title} className="rounded-2xl p-5 md:p-7 bg-white/10"
            style={{ border: "1px solid rgba(250,204,21,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: "rgba(250,204,21,0.10)", border: "1px solid rgba(250,204,21,0.25)" }}>
                <Icon className="w-4.5 h-4.5" style={{ color: GREEN, width: 18, height: 18 }} />
              </span>
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white">
                {title}
              </h2>
            </div>
            <ul className="space-y-2.5">
              {body.map((line, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-white/70">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: GREEN }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl p-6 md:p-8 text-center"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)" }}>
        <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">{tt.ctaHeading}</h2>
        <p className="serif-display italic font-light text-lg text-white/75 mb-6">
          {tt.ctaText}
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white no-underline transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #ca8a04 0%, #facc15 100%)", boxShadow: "0 4px 20px rgba(250,204,21,0.4)" }}
        >
          {tt.ctaButton}
        </a>
      </div>

      <p className="text-sm text-white/60 mt-8 leading-relaxed">
        {tt.updated}
      </p>
    </section>
  );
}
