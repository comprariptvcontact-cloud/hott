import { ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface DeviceCompatibilityProps {
  onPricingClick: () => void;
}

const DEVICES = [
  { id: "samsung",     name: "Samsung",      logo: "/devices/Samsung.png"     },
  { id: "lg",          name: "LG",           logo: "/devices/LG.png"          },
  { id: "android-tv",  name: "Android TV",   logo: "/devices/Android_TV.png"  },
  { id: "apple",       name: "Apple",        logo: "/devices/Apple.png"       },
  { id: "fire-tv",     name: "Fire TV",      logo: "/devices/Fire_TV.png"     },
  { id: "sony",        name: "Sony",         logo: "/devices/Sony.png"        },
  { id: "xbox",        name: "Xbox",         logo: "/devices/Xbox.png"        },
  { id: "playstation", name: "PlayStation",  logo: "/devices/PlayStation.png" },
  { id: "roku",        name: "Roku",         logo: "/devices/Roku.png"        },
  { id: "xiaomi",      name: "Xiaomi",       logo: "/devices/Xiaomi.png"      },
  { id: "android",     name: "Android",      logo: "/devices/Android.png"     },
  { id: "chrome",      name: "Chrome",       logo: "/devices/Chrome.png"      },
  { id: "formuler",    name: "Formuler",     logo: "/devices/Formuler.png"    },
  { id: "huawei",      name: "Huawei",       logo: "/devices/Huawei.png"      },
  { id: "philips",     name: "Philips",      logo: "/devices/Philips.png"     },
  { id: "tcl",         name: "TCL",          logo: "/devices/TCL.png"         },
  { id: "toshiba",     name: "Toshiba",      logo: "/devices/Toshiba.png"     },
  { id: "lenovo",      name: "Lenovo",       logo: "/devices/Lenovo.png"      },
  { id: "sharp",       name: "Sharp",        logo: "/devices/Sharp.png"       },
  { id: "x96",         name: "X96",          logo: "/devices/X96.png"         },
];

function DeviceCard({ d }: { d: typeof DEVICES[0] }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center w-24 h-24 rounded-2xl p-3.5 transition-all shadow-md"
      style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.5)" }}
      title={d.name}
    >
      <img
        src={d.logo}
        alt={d.name}
        className="w-full h-full object-contain"
        onError={e => {
          const el = e.currentTarget;
          el.style.display = "none";
          const p = el.parentElement;
          if (p) p.innerHTML = `<span style="color:white;font-size:9px;font-weight:900;text-align:center;word-break:break-all;line-height:1.2">${d.name}</span>`;
        }}
      />
    </div>
  );
}

export default function DeviceCompatibility({ onPricingClick }: DeviceCompatibilityProps) {
  const { t } = useLanguage();
  const row1 = DEVICES.slice(0, Math.ceil(DEVICES.length / 2));
  const row2 = DEVICES.slice(Math.ceil(DEVICES.length / 2));
  const tripled1 = [...row1, ...row1, ...row1];
  const tripled2 = [...row2, ...row2, ...row2];

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
      <div
        className="rounded-2xl py-14 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #422006 0%, #facc15 40%, #a16207 75%, #422006 100%)",
          boxShadow: "0 20px 60px rgba(250,204,21,0.35)",
        }}
      >
        {/* Decorative glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.05] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

        {/* Finnish cross subtle overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ background: "linear-gradient(to right, transparent 30%, white 30%, white 40%, transparent 40%), linear-gradient(to bottom, transparent 42%, white 42%, white 58%, transparent 58%)" }}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 px-6 md:px-10 relative z-10">
          <div>
            <p className="text-white/60 text-sm font-mono uppercase tracking-widest mb-2">
              {t.devices.heading}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.devices.italic}
            </h2>
            <p className="serif-display italic font-light text-lg text-white/70 mt-2">
              Smart TV · Firestick · Android · iOS · PC · Mac · PlayStation · Xbox
            </p>
          </div>
          <button
            onClick={onPricingClick}
            className="shrink-0 flex items-center gap-2 bg-white text-[#facc15] font-extrabold text-sm px-7 py-3 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-none hover:bg-white/90 transition-all"
          >
            {t.devices.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden -mx-4 md:-mx-6 mb-4 select-none pointer-events-none relative z-10">
          <div className="animate-scroll flex gap-4 px-4">
            {tripled1.map((d, i) => (
              <div key={`${d.id}-r1-${i}`} className="pointer-events-auto">
                <DeviceCard d={d} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden -mx-4 md:-mx-6 relative z-10 select-none pointer-events-none">
          <div className="animate-scroll-reverse flex gap-4 px-4">
            {tripled2.map((d, i) => (
              <div key={`${d.id}-r2-${i}`} className="pointer-events-auto">
                <DeviceCard d={d} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat bar */}
        <div className="relative z-10 mt-10 mx-6 md:mx-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-10 md:gap-16 text-center">
          {[
            { v: "20+", l: t.devices.heading },
            { v: "8K", l: "Ultra HD" },
            { v: "24/7", l: t.devices.cta },
          ].map(({ v, l }) => (
            <div key={v}>
              <p className="text-3xl md:text-4xl font-black text-white leading-none">{v}</p>
              <p className="serif-display italic font-light text-white/65 text-base mt-1">{l}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
