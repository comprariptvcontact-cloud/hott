import { useState, memo } from "react";
import { useLanguage } from "../LanguageContext";

interface VideoShowcaseProps {
  onPricingClick: () => void;
}

const videoBadge: Record<string, string> = {
  de: "HOL DIR PANDORA IPTV",
  en: "GET PANDORA IPTV",
  nl: "ONTDEK PANDORA IPTV",
  fr: "DÉCOUVREZ PANDORA IPTV",
  es: "OBTÉN PANDORA IPTV",
  it: "SCOPRI PANDORA IPTV",
  sv: "SKAFFA PANDORA IPTV",
  no: "SKAFF DEG PANDORA IPTV",
  da: "FÅ PANDORA IPTV",
  fi: "HANKI PANDORA IPTV",
  ar: "احصل على PANDORA IPTV",
};

const videoSections: Record<string, { heading: string; headingItalic: string; subtitle: string }> = {
  fi: {
    heading: "Kaikki mitä tarvitset,",
    headingItalic: "yhdessä paikassa.",
    subtitle: "Yli 89 000 live-kanavaa ja 200 000+ VOD — heti kaikilla laitteilla, ilman sopimusta.",
  },
  en: {
    heading: "Everything you need,",
    headingItalic: "in one place.",
    subtitle: "Over 69.000 live channels and 220.000+ VOD — instantly on any device, no contract.",
  },
  fr: {
    heading: "Tout ce dont vous avez besoin,",
    headingItalic: "en un seul endroit.",
    subtitle: "Plus de 89 000 chaînes en direct et 200 000+ VOD — instantanément sur tous vos appareils, sans contrat.",
  },
  da: {
    heading: "Alt hvad du har brug for,",
    headingItalic: "på ét sted.",
    subtitle: "Over 69.000 live-kanaler og 220.000+ VOD — øjeblikkeligt på alle enheder, ingen kontrakt.",
  },
  ar: {
    heading: "كل ما تحتاجه,",
    headingItalic: "في مكان واحد.",
    subtitle: "أكثر من 69.000 قناة مباشرة وأكثر من 220.000 VOD — فوراً على أي جهاز، بدون عقد.",
  },
  nl: {
    heading: "Alles wat je nodig hebt,",
    headingItalic: "op één plek.",
    subtitle: "Meer dan 69.000 live-zenders en 220.000+ VOD — direct op elk apparaat, geen contract.",
  },
  de: {
    heading: "Alles was du brauchst,",
    headingItalic: "an einem Ort.",
    subtitle: "Über 69.000 Live-Kanäle und 220.000+ VOD — sofort auf jedem Gerät, kein Vertrag.",
  },
  es: {
    heading: "Todo lo que necesitas,",
    headingItalic: "en un solo lugar.",
    subtitle: "Más de 69.000 canales en directo y 220.000+ VOD — al instante en cualquier dispositivo, sin contrato.",
  },
  it: {
    heading: "Tutto ciò che ti serve,",
    headingItalic: "in un unico posto.",
    subtitle: "Oltre 69.000 canali live e 220.000+ VOD — immediatamente su qualsiasi dispositivo, senza contratto.",
  },
  sv: {
    heading: "Allt du behöver,",
    headingItalic: "på ett ställe.",
    subtitle: "Över 89 000 livekanaler och 200 000+ VOD — direkt på alla enheter, inget kontrakt.",
  },
  no: {
    heading: "Alt du trenger,",
    headingItalic: "på ett sted.",
    subtitle: "Over 89 000 live-kanaler og 200 000+ VOD — umiddelbart på alle enheter, ingen kontrakt.",
  },
  pl: {
    heading: "Wszystko czego potrzebujesz,",
    headingItalic: "w jednym miejscu.",
    subtitle: "Ponad 89 000 kanałów na żywo i 200 000+ VOD — natychmiast na każdym urządzeniu, bez umowy.",
  },
  pt: {
    heading: "Tudo o que precisas,",
    headingItalic: "num só lugar.",
    subtitle: "Mais de 89 000 canais ao vivo e 200 000+ VOD — instantaneamente em qualquer dispositivo, sem contrato.",
  },
};

function VideoShowcaseInner({ onPricingClick }: VideoShowcaseProps) {
  const { lang } = useLanguage();
  const [videoFailed, setVideoFailed] = useState(false);
  const tx = videoSections[lang] ?? videoSections.en;
  const badge = videoBadge[lang] ?? videoBadge.en;

  return (
    <>
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
        <button
          onClick={onPricingClick}
          className="relative w-full rounded-2xl overflow-hidden block cursor-pointer group"
          style={{ aspectRatio: "16/9" }}
        >
          {!videoFailed ? (
            <video
              src="/serien-und-filme.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900 rounded-2xl" />
          )}

          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 45%, transparent 80%)",
            }}
          />

          <div className="absolute top-0 left-0 px-5 pt-5 sm:px-8 sm:pt-7 md:px-10 md:pt-9 text-left">
            <span className="text-[#facc15] text-xs font-bold uppercase tracking-[0.15em] block mb-2">{badge}</span>
            <h2 className="text-white font-bold tracking-tight leading-[1.05] text-lg sm:text-2xl md:text-4xl lg:text-5xl drop-shadow-lg uppercase">
              {tx.heading}
              <br />
              <span className="text-white/70 font-bold">
                {tx.headingItalic}
              </span>
            </h2>
          </div>
        </button>
      </section>

      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-4 text-center">
        <p className="serif-display italic font-light text-base sm:text-lg md:text-xl text-white/60 leading-relaxed">
          {tx.subtitle}
        </p>
      </div>
    </>
  );
}

const VideoShowcase = memo(VideoShowcaseInner);
export default VideoShowcase;
