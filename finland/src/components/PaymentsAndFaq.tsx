import { useState } from "react";
import { Plus, Minus, Lock } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { getExtra } from "../i18nExtra";
import { WA_NUMBER } from "../types";
import { trackWaConversion } from "../analytics";

const PaypalLogo = () => (
  <svg viewBox="0 0 80 24" xmlns="http://www.w3.org/2000/svg" width="64" height="20">
    <path d="M9.5 2h7.2c3.6 0 5.5 1.8 5.1 5-.4 3.5-2.9 5.4-6.4 5.4H13l-1 6H8.2L9.5 2z" fill="#009cde"/>
    <path d="M4 2h7.2c3.6 0 5.5 1.8 5.1 5-.4 3.5-2.9 5.4-6.4 5.4H7.5l-1 6H2.7L4 2z" fill="#003087"/>
    <text x="26" y="17" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#003087">Pay</text>
    <text x="50" y="17" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#009cde">Pal</text>
  </svg>
);

const VisaLogo = () => (
  <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" width="52" height="18">
    <text x="0" y="16" fontFamily="Arial" fontWeight="900" fontSize="19" fill="#1A1F71" fontStyle="italic" letterSpacing="-0.5">VISA</text>
  </svg>
);

const MastercardLogo = () => (
  <svg viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg" width="44" height="28">
    <circle cx="17" cy="15" r="13" fill="#EB001B"/>
    <circle cx="33" cy="15" r="13" fill="#F79E1B"/>
    <path d="M25 5.4a13 13 0 0 1 0 19.2A13 13 0 0 1 25 5.4z" fill="#FF5F00"/>
  </svg>
);

const SepaLogo = () => (
  <svg viewBox="0 0 64 28" xmlns="http://www.w3.org/2000/svg" width="56" height="24">
    <rect width="64" height="28" rx="4" fill="#003399"/>
    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const x = 14 + 9 * Math.cos(angle);
      const y = 14 + 9 * Math.sin(angle);
      return <text key={i} x={x} y={y + 1.5} textAnchor="middle" fontSize="5" fill="#FFD700" fontFamily="Arial">★</text>;
    })}
    <text x="38" y="18" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="white" letterSpacing="1">SEPA</text>
  </svg>
);

const SofortLogo = () => (
  <svg viewBox="0 0 72 24" xmlns="http://www.w3.org/2000/svg" width="64" height="22">
    <rect width="72" height="24" rx="3" fill="#EF6C00"/>
    <text x="6" y="17" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="white" letterSpacing="0.3">SOFORT</text>
  </svg>
);

const GiropayLogo = () => (
  <svg viewBox="0 0 72 24" xmlns="http://www.w3.org/2000/svg" width="64" height="22">
    <rect width="34" height="24" rx="3" fill="#005DAA"/>
    <rect x="34" width="38" height="24" rx="0" fill="#00A650"/>
    <rect x="34" width="4" height="24" fill="#005DAA"/>
    <text x="4" y="17" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="white">giro</text>
    <text x="38" y="17" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="white">pay</text>
  </svg>
);

const KlarnaLogo = () => (
  <svg viewBox="0 0 64 24" xmlns="http://www.w3.org/2000/svg" width="56" height="22">
    <rect width="64" height="24" rx="3" fill="#FFB3C7"/>
    <text x="8" y="17" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#17120F" letterSpacing="0.2">Klarna</text>
  </svg>
);

const CryptoLogo = () => (
  <svg viewBox="0 0 72 24" xmlns="http://www.w3.org/2000/svg" width="64" height="22">
    <rect width="72" height="24" rx="3" fill="#1a1a2e"/>
    <circle cx="12" cy="12" r="7.5" fill="none" stroke="#F7931A" strokeWidth="1.5"/>
    <text x="8.5" y="16" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#F7931A">₿</text>
    <text x="24" y="10" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="#F7931A" letterSpacing="0.3">CRYPTO</text>
    <text x="24" y="19" fontFamily="Arial" fontSize="6.5" fill="rgba(247,147,26,0.65)" letterSpacing="0.2">BTC · ETH · USDT</text>
  </svg>
);

const UsdtLogo = () => (
  <svg viewBox="0 0 72 24" xmlns="http://www.w3.org/2000/svg" width="64" height="22">
    <rect width="72" height="24" rx="3" fill="#1a1a2e"/>
    <circle cx="12" cy="12" r="7.5" fill="none" stroke="#26A17B" strokeWidth="1.5"/>
    <text x="8.2" y="16" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#26A17B">₮</text>
    <text x="24" y="10" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="#26A17B" letterSpacing="0.3">TETHER</text>
    <text x="24" y="19" fontFamily="Arial" fontSize="6.5" fill="rgba(38,161,123,0.70)" letterSpacing="0.2">USDT · TRC20 · ERC20</text>
  </svg>
);

const BankTransferLogo = () => (
  <svg viewBox="0 0 84 24" xmlns="http://www.w3.org/2000/svg" width="74" height="22">
    <rect width="84" height="24" rx="3" fill="#1C3F6E"/>
    <polygon points="11,8 3,14 19,14" fill="white"/>
    <rect x="4"  y="15" width="3" height="7" rx="0.5" fill="white"/>
    <rect x="9"  y="15" width="3" height="7" rx="0.5" fill="white"/>
    <rect x="14" y="15" width="3" height="7" rx="0.5" fill="white"/>
    <rect x="2" y="22" width="18" height="1.5" rx="0.5" fill="white"/>
    <text x="25" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9.5" fill="white" letterSpacing="0.3">BANK</text>
    <text x="25" y="22" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="rgba(255,255,255,0.75)" letterSpacing="0.5">TRANSFER</text>
  </svg>
);

const mostUsedLabel: Record<string, string> = { de: "Beliebteste", en: "Most Used", nl: "Meest gebruikt" };

export default function PaymentsAndFaq() {
  const { t, lang } = useLanguage();
  const pay = getExtra(lang).payments;
  const muLabel = mostUsedLabel[lang] ?? mostUsedLabel.en;
  const [activeFaqId, setActiveFaqId] = useState<number | null>(0);

  const toggleFaq = (i: number) => {
    setActiveFaqId(activeFaqId === i ? null : i);
  };

  const paymentMethods = [
    { name: "Bank Transfer", logo: <BankTransferLogo />,  desc: pay.bankWire,               delay: t.payments.direct,  mostUsed: true  },
    { name: "PayPal",        logo: <PaypalLogo />,        desc: t.payments.methodDescs[0],  delay: t.payments.direct,  mostUsed: true  },
    { name: "Visa",          logo: <VisaLogo />,          desc: t.payments.methodDescs[1],  delay: t.payments.direct,  mostUsed: false },
    { name: "Mastercard",    logo: <MastercardLogo />,    desc: t.payments.methodDescs[2],  delay: t.payments.direct,  mostUsed: false },
    { name: "Crypto",        logo: <CryptoLogo />,        desc: "BTC · ETH · USDT",         delay: t.payments.direct,  mostUsed: false },
    { name: "USDT",          logo: <UsdtLogo />,          desc: "TRC20 · ERC20 · Stable",    delay: t.payments.direct,  mostUsed: false },
    { name: "SEPA",          logo: <SepaLogo />,          desc: t.payments.methodDescs[3],  delay: t.payments.days12,  mostUsed: false },
    { name: "Sofort",        logo: <SofortLogo />,        desc: t.payments.methodDescs[4],  delay: t.payments.direct,  mostUsed: false },
    { name: "Klarna",        logo: <KlarnaLogo />,        desc: t.payments.methodDescs[5],  delay: t.payments.direct,  mostUsed: false },
  ];

  return (
    <section id="faq-section" className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-28">

      {/* Payments */}
      <div className="lg:col-span-5 bg-black rounded-[2rem] p-5 sm:p-8 border border-white/10 text-left">
        <span className="serif-display italic font-light text-2xl text-[#facc15]/70 mb-3 block">
          {t.payments.subtitle}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
          {t.payments.heading}
          <br />
          <span className="serif-display italic font-light text-[#facc15] pr-1.5">{t.payments.italic}</span>
        </h2>
        <p className="serif-display italic font-light text-base md:text-lg text-white/60 mt-3 leading-relaxed">
          {t.payments.desc}
        </p>

        <div className="grid grid-cols-1 gap-3 mt-8">
          {paymentMethods.map((method, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-2xl transition-colors border"
              style={method.mostUsed ? {
                background: "linear-gradient(135deg, rgba(226,0,116,0.10) 0%, rgba(226,0,116,0.06) 100%)",
                borderColor: "rgba(226,0,116,0.35)",
                boxShadow: "0 2px 12px rgba(226,0,116,0.08)",
              } : {
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="bg-white/10 shadow-sm h-11 px-3 flex items-center justify-center rounded-xl border border-white/15 shrink-0">
                  {method.logo}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{method.name}</p>
                    {method.mostUsed && (
                      <span
                        className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: "linear-gradient(135deg, #ca8a04, #facc15)", color: "white" }}
                      >
                        {muLabel}
                      </span>
                    )}
                  </div>
                  <p className="serif-display italic font-light text-sm text-white/60">{method.desc}</p>
                </div>
              </div>
              <span className="serif-display italic font-light text-sm text-[#facc15] bg-[#facc15]/10 px-2.5 py-1 rounded-full shrink-0">
                {method.delay}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-white/60">
          <Lock className="w-4 h-4 text-white/50 shrink-0" />
          <span className="serif-display italic font-light text-base">{t.payments.pci}</span>
        </div>
      </div>

      {/* FAQ */}
      <div className="lg:col-span-7 text-left">
        <div className="mb-8">
          <span className="serif-display italic font-light text-2xl text-[#facc15]/70 mb-3 block">
            {t.faq.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-snug">
            {t.faq.heading}
            <br />
            <span className="serif-display italic font-light text-[#facc15] pr-1.5">{t.faq.italic}</span>
          </h2>
        </div>

        <div className="space-y-3.5">
          {t.faq.items.map((faq, i) => {
            const isOpen = activeFaqId === i;
            return (
              <div
                key={i}
                className={`rounded-[1.2rem] border transition-all duration-300 ${
                  isOpen
                    ? "bg-[#1a1a1a] border-white/15 shadow-sm"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-base md:text-xl text-white/80 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className={`p-1.5 rounded-full ${isOpen ? "bg-[#facc15]/10" : "bg-white/5"} transition-colors shrink-0`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-[#facc15]" /> : <Plus className="w-3.5 h-3.5 text-white/40" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="serif-display italic font-light px-5 md:px-6 pb-6 text-base md:text-lg text-white/60 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-[#facc15]/10 rounded-2xl border border-[#facc15]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-base md:text-lg font-bold text-white">{t.faq.supportNote}</p>
            <p className="serif-display italic font-light text-base text-white/60 mt-1">{t.faq.supportDesc}</p>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pay.supportWaText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWaConversion}
            className="whitespace-nowrap px-5 py-2.5 bg-white hover:bg-white/90 text-[#facc15] rounded-full text-sm font-bold transition-colors no-underline"
          >
            {t.faq.supportCta}
          </a>
        </div>
      </div>

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.items.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }) }}
      />
    </section>
  );
}
