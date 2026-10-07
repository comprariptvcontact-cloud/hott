import { useState } from "react";
import { PricingPlan, SUBSCRIPTION_PLANS, WA_NUMBER } from "../types";
import { Check, ShieldCheck, Zap, Crown, MessageCircle, Monitor } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { getExtra } from "../i18nExtra";
import { getPlanText, planFeatures, planSavings } from "../planText";
import { trackWaConversion } from "../analytics";

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

const ACCENT   = "#facc15";
const ACCENT_L = "#fde047";
const ACCENT_D = "#ca8a04";
const ACCENT_T = "#fef9c3";
const GREEN  = "#facc15";
const GREEN_D = "#422006";


function buildWhatsAppUrl(plan: PricingPlan, waMsg: (m: number, d: number, p: string) => string): string {
  const preis = plan.price.toFixed(2).replace(".", ",");
  const msg = waMsg(plan.durationMonths, plan.devices, preis);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Pricing({ onSelectPlan: _unused }: PricingProps) {
  const { t, lang } = useLanguage();
  const px = getExtra(lang).pricing;
  const pay = getExtra(lang).payments;
  const pt = getPlanText(lang);
  const [activeDevices, setActiveDevices] = useState<1 | 2>(1);

  const MONTH_ORDER = [12, 3, 6, 24];
  const plans = SUBSCRIPTION_PLANS
    .filter(p => p.devices === activeDevices)
    .sort((a, b) => {
      const ai = MONTH_ORDER.indexOf(a.durationMonths);
      const bi = MONTH_ORDER.indexOf(b.durationMonths);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

  return (
    <section
      id="pricing-section"
      className="relative py-10 md:py-20 px-4 md:px-8 w-full text-center overflow-hidden scroll-mt-28"
      style={{ background: `linear-gradient(160deg, #0a0a0a 0%, #111 45%, #0a0a0a 100%)` }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-10"
          style={{ background: `radial-gradient(ellipse, ${GREEN} 0%, transparent 65%)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-20"
          style={{ background: `linear-gradient(to right, transparent, ${GREEN}, transparent)` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10 md:mb-16">
          {[
            { value: "69K",  label: t.pricing.statChannels  },
            { value: "220K", label: t.pricing.statVod        },
            { value: "8K",   label: px.quality               },
            { value: "∞",    label: t.pricing.statUpdate     },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex flex-col items-center relative">
              {i < 3 && (
                <span className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-white/10 text-4xl font-thin">|</span>
              )}
              <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">{value}</span>
              <span className="serif-display italic font-light text-xl text-white/75 mt-1.5">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div className="max-w-xl mx-auto mb-10 text-center">
          <span className="serif-display italic font-light text-2xl text-white/80 mb-3 block">
            {t.pricing.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
            {t.pricing.heading}
            <br />
            <span className="serif-display italic font-light pr-1.5"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_D} 0%, ${ACCENT} 40%, ${ACCENT_L} 65%, ${ACCENT} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block"
              }}>
              {t.pricing.highlight}
            </span>
          </h2>
          <p className="serif-display italic font-light text-base md:text-xl text-white/75 mt-4 leading-relaxed">
            {t.pricing.desc}
          </p>
        </div>

        {/* ── Device toggle ─────────────────────────────────────────────── */}
        <div className="inline-flex items-center rounded-full p-1 mb-12 border border-white/10"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          {([1, 2] as const).map(n => (
            <button key={n} onClick={() => setActiveDevices(n)}
              className={`px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                activeDevices === n
                  ? "bg-white text-[#facc15] shadow-md"
                  : "text-white/40 hover:text-white/70"
              }`}>
              {n} {n === 1 ? t.pricing.device1 : t.pricing.device2}
            </button>
          ))}
        </div>

        {/* ── Plan grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto items-stretch">
          {plans.map(plan => (
            <div key={plan.id} id={plan.durationMonths === 3 ? "plan-1mo" : undefined} className="relative flex flex-col transition-all duration-300">

              {/* Card */}
              <div className="relative flex-1 flex flex-col rounded-2xl overflow-hidden"
                style={plan.popular ? {
                  background: `linear-gradient(160deg, #0f0a00 0%, #1c1500 30%, #2a1a00 55%, #1c1500 80%, #0f0a00 100%)`,
                  border: `1.5px solid ${ACCENT}88`,
                  boxShadow: `0 0 80px rgba(250,204,21,0.35), 0 0 40px rgba(250,204,21,0.15), 0 16px 50px rgba(0,0,0,0.5)`,
                } : {
                  background: "#111111",
                  border: `1.5px solid rgba(255,255,255,0.12)`,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}>

                {/* BEST SELLER ribbon — 12-month popular card */}
                {plan.popular && (
                  <div className="absolute z-10 pointer-events-none"
                    style={{ top: "18px", right: "-32px", width: "130px", textAlign: "center", transform: "rotate(45deg)",
                      background: `linear-gradient(90deg, ${ACCENT_D}, ${ACCENT}, ${ACCENT_L})`,
                      color: "white", fontSize: "8px", fontWeight: "900", padding: "6px 0",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      boxShadow: `0 2px 8px ${ACCENT}88` }}>
                    {px.bestSeller}
                  </div>
                )}

                {/* TEST PACK ribbon — 3-month card */}
                {plan.durationMonths === 3 && (
                  <div className="absolute z-10 pointer-events-none"
                    style={{ top: "16px", right: "-34px", width: "130px", textAlign: "center", transform: "rotate(45deg)",
                      background: `linear-gradient(90deg, ${GREEN_D}, ${GREEN})`,
                      color: "white", fontSize: "7px", fontWeight: "900", padding: "5px 0",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      boxShadow: "0 2px 8px rgba(250,204,21,0.5)", lineHeight: "1.5" }}>
                    {px.testPack1}<br/>{px.testPack2}
                  </div>
                )}

                {/* Top stripe */}
                <div className="h-1.5 w-full"
                  style={{
                    background: plan.popular
                      ? `linear-gradient(90deg, transparent, ${ACCENT_L}, transparent)`
                      : `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`
                  }} />

                <div className="flex flex-col flex-1 p-6 text-left">

                  {/* Popular title */}
                  {plan.popular && (
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-4 h-4" style={{ color: ACCENT }} />
                      <span className="text-sm font-black uppercase tracking-[0.15em]"
                        style={{ color: ACCENT_L }}>
                        {t.pricing.popular}
                      </span>
                    </div>
                  )}

                  {/* Months — big number */}
                  <div className="mb-5">
                    <div className="flex items-end gap-2 leading-none">
                      <span className="text-7xl font-black tracking-tighter leading-none"
                        style={ plan.popular
                          ? { background: `linear-gradient(135deg, ${ACCENT_D} 0%, ${ACCENT} 40%, ${ACCENT_L} 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }
                          : { color: ACCENT }}>
                        {plan.durationMonths}
                      </span>
                      <span className="text-base font-black mb-3 uppercase tracking-widest"
                        style={{ color: plan.popular ? ACCENT_T : "rgba(250,204,21,0.7)" }}>
                        {plan.durationMonths === 1 ? t.pricing.month1 : t.pricing.monthMany}
                      </span>
                    </div>

                    {/* Free months offer strip */}
                    {plan.freeMonths && (
                      <div className="flex items-center gap-2 mt-2 mb-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                          style={plan.popular ? {
                            background: `linear-gradient(90deg, ${ACCENT_D}, ${ACCENT})`,
                            boxShadow: `0 2px 10px ${ACCENT}55`,
                          } : {
                            background: `linear-gradient(90deg, ${GREEN_D}, ${GREEN})`,
                          }}>
                          <span className="text-[13px] font-black tracking-tight text-white">
                            +{plan.freeMonths} {px.moShort}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest"
                            style={{ color: "rgba(255,255,255,0.85)" }}>
                            {px.freeShort}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Devices badge */}
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={plan.popular ? {
                        background: `${ACCENT}22`,
                        border: `1px solid ${ACCENT}55`,
                      } : {
                        background: `rgba(255,255,255,0.08)`,
                        border: `1px solid rgba(255,255,255,0.15)`,
                      }}>
                      <Monitor className="w-3.5 h-3.5"
                        style={{ color: plan.popular ? ACCENT : "rgba(255,255,255,0.7)" }} />
                      <span className="text-xs font-black uppercase tracking-wider"
                        style={{ color: plan.popular ? ACCENT_T : "rgba(255,255,255,0.7)" }}>
                        {plan.devices} {plan.devices === 1 ? t.pricing.dev1 : t.pricing.dev2}
                      </span>
                    </div>
                  </div>

                  {/* Savings badge */}
                  <div className="self-start flex items-center gap-2 mb-5">
                    <span className="text-[11px] font-black py-1 px-3 rounded-full uppercase tracking-wide"
                      style={plan.popular ? {
                        background: `${ACCENT}33`,
                        color: ACCENT_L,
                        border: `1px solid ${ACCENT}66`,
                      } : {
                        background: "rgba(250,204,21,0.15)",
                        color: ACCENT,
                        border: `1px solid rgba(250,204,21,0.3)`,
                      }}>
                      {planSavings(plan, pt)}
                    </span>
                    <span className="text-4xl font-black leading-none tracking-tighter"
                      style={plan.popular ? {
                        background: `linear-gradient(135deg, ${ACCENT_D}, ${ACCENT}, ${ACCENT_L})`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                      } : {
                        color: ACCENT,
                      }}>
                      −{plan.discountPct ?? Math.round((plan.originalPrice - plan.price) / plan.originalPrice * 100)}%
                    </span>
                  </div>

                  {/* Price */}
                  <div className="pb-5 mb-5 border-b"
                    style={{ borderColor: plan.popular ? `${ACCENT}33` : "rgba(255,255,255,0.1)" }}>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black tracking-tight leading-none"
                        style={{ color: plan.popular ? "white" : "white" }}>
                        {plan.price.toFixed(2).replace(".", ",")} €
                      </span>
                      <span className="text-sm font-mono line-through pb-0.5"
                        style={{ color: plan.popular ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.30)" }}>
                        {plan.originalPrice.toFixed(2).replace(".", ",")} €
                      </span>
                    </div>
                    <p className="serif-display italic font-light text-2xl mt-1.5"
                      style={{ color: plan.popular ? ACCENT_L : ACCENT }}>
                      ≈ {(plan.price / (plan.durationMonths + (plan.freeMonths ?? 0))).toFixed(2).replace(".", ",")} € / {t.pricing.month1.toLowerCase()}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-6">
                    {planFeatures(plan, pt).slice(0, 12).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center"
                          style={plan.popular ? {
                            background: `${ACCENT}22`,
                            border: `1px solid ${ACCENT}55`,
                          } : {
                            background: `rgba(255,255,255,0.08)`,
                            border: `1px solid rgba(255,255,255,0.15)`,
                          }}>
                          <Check className="w-3.5 h-3.5 stroke-[3]"
                            style={{ color: plan.popular ? ACCENT : ACCENT }} />
                        </span>
                        <span className="text-[15px] font-mono font-bold leading-snug"
                          style={{ color: plan.popular ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.75)" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={buildWhatsAppUrl(plan, t.pricing.waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWaConversion}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider
                               flex items-center justify-center transition-all duration-200 no-underline
                               hover:opacity-90 hover:scale-[1.02] active:scale-100"
                    style={plan.popular ? {
                      background: `linear-gradient(135deg, ${ACCENT_D} 0%, ${ACCENT} 45%, ${ACCENT_L} 100%)`,
                      color: "white",
                      boxShadow: `0 4px 24px rgba(250,204,21,0.45)`,
                    } : {
                      background: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <span>{t.pricing.cta}</span>
                  </a>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Separator ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto mt-14 mb-10 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${GREEN}88, transparent)` }} />

        {/* ── Trust bar ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: <ShieldCheck className="w-5 h-5 shrink-0 text-white" />, title: t.pricing.trust[0], desc: t.pricing.trust[1], href: null },
            { icon: <Zap         className="w-5 h-5 shrink-0 text-white" />, title: t.pricing.trust[2], desc: t.pricing.trust[3], href: null },
            { icon: <MessageCircle className="w-5 h-5 shrink-0 text-white" />, title: t.pricing.trust[4], desc: t.pricing.trust[5], href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pay.supportWaText)}` },
          ].map(({ icon, title, desc, href }) => {
            const inner = (
              <>
                {icon}
                <div>
                  <p className="text-base font-bold text-white/80">{title}</p>
                  <p className="serif-display italic font-light text-base text-white/75 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </>
            );
            return href ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer"
                onClick={trackWaConversion}
                className="flex items-start gap-3 p-4 rounded-xl text-left no-underline hover:opacity-80 transition-opacity"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {inner}
              </a>
            ) : (
              <div key={title}
                className="flex items-start gap-3 p-4 rounded-xl text-left"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {inner}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
