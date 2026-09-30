import React from "react";
import { ALL_CHANNELS } from "../types";
import { Radio } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { getExtra } from "../i18nExtra";

type Ch = { id: string; name: string; logo: string; bg: string };

// Real logos from WorldVectorLogo + Wikimedia. Each logo box uses brand colour
// so both white-on-transparent and coloured logos are always visible.

const EU_BROADCAST: Ch[] = [
  // German channels lead the strip — this is a Germany-facing site.
  { id: "ard",       name: "Das Erste",     logo: "/logos/ard.png",       bg: "#0C4DA2" },
  { id: "zdfeu",     name: "ZDF",           logo: "/logos/zdf.svg",       bg: "#002B7F" },
  { id: "rtl",       name: "RTL",           logo: "/logos/rtl.png",       bg: "#E4001B" },
  { id: "pro7eu",    name: "ProSieben",     logo: "/logos/pro7.svg",      bg: "#E40046" },
  { id: "sat1eu",    name: "SAT.1",         logo: "/logos/sat1.svg",      bg: "#E30B17" },
  { id: "voxeu",     name: "VOX",           logo: "/logos/vox.svg",       bg: "#007A4D" },
  { id: "bbc",       name: "BBC One",       logo: "/logos/bbc.svg",       bg: "#BB1919" },
  { id: "itv",       name: "ITV",           logo: "/logos/itv.svg",       bg: "#006540" },
  { id: "tf1",       name: "TF1",           logo: "/logos/tf1.svg",       bg: "#003F87" },
  { id: "skynews",   name: "Sky News",      logo: "/logos/skynews.svg",   bg: "#DA0000" },
  { id: "france24",  name: "France 24",     logo: "/logos/france24.png",  bg: "#F50000" },
  { id: "arte",      name: "ARTE",          logo: "/logos/arte.svg",      bg: "#006699" },
  { id: "cnn",       name: "CNN Int'l",     logo: "/logos/cnn.svg",       bg: "#CC0000" },
  { id: "bloomberg", name: "Bloomberg",     logo: "/logos/bloomberg.svg", bg: "#1A1A1A" },
  { id: "cnbc",      name: "CNBC",          logo: "/logos/cnbc.svg",      bg: "#003087" },
  { id: "natgeo",    name: "Nat Geo",       logo: "/logos/natgeo.svg",    bg: "#000000" },
  { id: "history",   name: "History",       logo: "/logos/history.svg",   bg: "#1A1A1A" },
  { id: "cartoon",   name: "Cartoon Ntwk",  logo: "/logos/cartoon.svg",   bg: "#000000" },
  { id: "fox",       name: "FOX",           logo: "/logos/fox.svg",       bg: "#003087" },
  { id: "abc",       name: "ABC",           logo: "/logos/abc.svg",       bg: "#000000" },
  { id: "nbc",       name: "NBC",           logo: "/logos/nbc.svg",       bg: "#00428C" },
  { id: "tnt",       name: "TNT Sports",    logo: "/logos/tnt.svg",       bg: "#000000" },
  { id: "discovery", name: "Discovery",     logo: "/logos/discovery.svg", bg: "#0070C0" },
  { id: "bein",      name: "beIN Sports",   logo: "/logos/bein.svg",      bg: "#8B0000" },
  { id: "espn",      name: "ESPN",          logo: "/logos/espn.svg",      bg: "#CC0000" },
  { id: "euro1",     name: "Eurosport",     logo: "/logos/eurosport.svg", bg: "#FF6600" },
];

const WORLDWIDE_STREAMING: Ch[] = [
  { id: "netflix",   name: "Netflix",       logo: "/logos/netflix.svg",     bg: "#141414" },
  { id: "disney",    name: "Disney+",       logo: "/logos/disney.svg",      bg: "#000B8C" },
  { id: "hbo",       name: "HBO Max",       logo: "/logos/hbomax.svg",      bg: "#000000" },
  { id: "prime",     name: "Prime Video",   logo: "/logos/primevideo.svg",  bg: "#00A8E1" },
  { id: "appletv",   name: "Apple TV+",     logo: "/logos/appletv.svg",     bg: "#000000" },
  { id: "paramount", name: "Paramount+",    logo: "/logos/paramount.svg",   bg: "#0064FF" },
  { id: "hulu",      name: "Hulu",          logo: "/logos/hulu.svg",        bg: "#1CE783" },
  { id: "dazn",      name: "DAZN",          logo: "/logos/dazn.svg",        bg: "#111111" },
  { id: "canal",     name: "Canal+",        logo: "/logos/canal.svg",       bg: "#001A50" },
  { id: "sky",       name: "Sky",           logo: "/logos/sky.svg",         bg: "#0072C6" },
  { id: "rtlplus",   name: "RTL+",          logo: "/logos/rtlplus.svg",     bg: "#CC0001" },
  { id: "wow",       name: "WOW",           logo: "/logos/wow.png",         bg: "#00B3B3" },
  { id: "pro7",      name: "ProSieben",     logo: "/logos/pro7.svg",        bg: "#E40046" },
  { id: "sat1",      name: "SAT.1",         logo: "/logos/sat1.svg",        bg: "#E30B17" },
  { id: "kabel1",    name: "Kabel Eins",    logo: "/logos/kabel1.svg",      bg: "#004B8D" },
  { id: "rtl2",      name: "RTL 2",         logo: "/logos/rtl2.svg",        bg: "#E40046" },
  { id: "vox",       name: "VOX",           logo: "/logos/vox.svg",         bg: "#007A4D" },
  { id: "crunch",    name: "Crunchyroll",   logo: "/logos/crunch.svg",      bg: "#F47521" },
  { id: "sport1",    name: "Sport1",        logo: "/logos/sport1.svg",      bg: "#E4001B" },
];

const WORLDWIDE_BROAD: Ch[] = [
  { id: "cnn2",      name: "CNN Int'l",     logo: "/logos/cnn.svg",         bg: "#CC0000" },
  { id: "bbc2",      name: "BBC One",       logo: "/logos/bbc.svg",         bg: "#BB1919" },
  { id: "sky2",      name: "Sky Sports",    logo: "/logos/sky.svg",         bg: "#0072C6" },
  { id: "bein2",     name: "beIN Sports",   logo: "/logos/bein.svg",        bg: "#8B0000" },
  { id: "espn2",     name: "ESPN",          logo: "/logos/espn.svg",        bg: "#CC0000" },
  { id: "dazn2",     name: "DAZN",          logo: "/logos/dazn.svg",        bg: "#111111" },
  { id: "disco2",    name: "Discovery",     logo: "/logos/discovery.svg",   bg: "#0070C0" },
  { id: "nat2",      name: "Nat Geo",       logo: "/logos/natgeo.svg",      bg: "#000000" },
  { id: "hist2",     name: "History",       logo: "/logos/history.svg",     bg: "#1A1A1A" },
  { id: "tnt2",      name: "TNT Sports",    logo: "/logos/tnt.svg",         bg: "#000000" },
  { id: "nbc2",      name: "NBC",           logo: "/logos/nbc.svg",         bg: "#00428C" },
  { id: "abc2",      name: "ABC",           logo: "/logos/abc.svg",         bg: "#000000" },
  { id: "fox2",      name: "FOX",           logo: "/logos/fox.svg",         bg: "#003087" },
  { id: "bloom2",    name: "Bloomberg",     logo: "/logos/bloomberg.svg",   bg: "#1A1A1A" },
  { id: "cnbc2",     name: "CNBC",          logo: "/logos/cnbc.svg",        bg: "#003087" },
  { id: "f242",      name: "France 24",     logo: "/logos/france24.png",    bg: "#F50000" },
  { id: "arte2",     name: "ARTE",          logo: "/logos/arte.svg",        bg: "#006699" },
  { id: "zdf",       name: "ZDF",           logo: "/logos/zdf.svg",         bg: "#002B7F" },
  { id: "ndr",       name: "NDR",           logo: "/logos/ndr.svg",         bg: "#003580" },
  { id: "wdr",       name: "WDR",           logo: "/logos/wdr.svg",         bg: "#003580" },
];

const PPV_VIP: Ch[] = [
  { id: "ppv-sky",    name: "Sky Sports",      logo: "/logos/sky.svg",        bg: "#0072C6" },
  { id: "ppv-bein",   name: "beIN PPV",        logo: "/logos/bein.svg",       bg: "#8B0000" },
  { id: "ppv-dazn",   name: "DAZN PPV",        logo: "/logos/dazn.svg",       bg: "#111111" },
  { id: "ppv-canal",  name: "Canal+ Sport",    logo: "/logos/canal.svg",      bg: "#001A50" },
  { id: "ppv-tnt",    name: "TNT Sports",      logo: "/logos/tnt.svg",        bg: "#000000" },
  { id: "ppv-espn",   name: "ESPN+",           logo: "/logos/espn.svg",       bg: "#CC0000" },
  { id: "ppv-sport1", name: "Sport1+",         logo: "/logos/sport1.svg",     bg: "#E4001B" },
  { id: "ppv-fox",    name: "Fox Sports",      logo: "/logos/fox.svg",        bg: "#003087" },
  { id: "ppv-skyde",  name: "Sky DE",          logo: "/logos/skyde.svg",      bg: "#0072C6" },
  { id: "ppv-euro",   name: "Eurosport PPV",   logo: "/logos/eurosport.svg",  bg: "#FF6600" },
  { id: "ppv-para",   name: "Paramount+ PPV",  logo: "/logos/paramount.svg",  bg: "#0064FF" },
  { id: "ppv-hbo",    name: "HBO Max",         logo: "/logos/hbomax.svg",     bg: "#000000" },
  { id: "ppv-prime",  name: "Prime Video",     logo: "/logos/primevideo.svg", bg: "#00A8E1" },
  { id: "ppv-rtl",    name: "RTL+ Sport",      logo: "/logos/rtlplus.svg",    bg: "#CC0001" },
  { id: "ppv-disco",  name: "Discovery Sport", logo: "/logos/discovery.svg",  bg: "#0070C0" },
];

const ChannelCard: React.FC<{ ch: Ch }> = ({ ch }) => (
  <div className="shrink-0 flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-3.5 py-2.5 shadow-sm min-w-[130px]">
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 p-1.5 bg-white/10"
      style={{ border: `2.5px solid ${ch.bg}` }}
    >
      <img
        src={ch.logo}
        alt={ch.name}
        className="w-full h-full object-contain"
        onError={e => {
          const el = e.currentTarget;
          el.style.display = "none";
          const p = el.parentElement;
          if (p) p.innerHTML = `<span style="color:${ch.bg};font-size:7px;font-weight:900;text-align:center;line-height:1.1">${ch.name}</span>`;
        }}
      />
    </div>
    <span className="text-white text-[13px] font-bold whitespace-nowrap">{ch.name}</span>
  </div>
);

export default function ChannelStripe() {
  const { lang } = useLanguage();
  const cx = getExtra(lang).channels;
  const t1 = [...EU_BROADCAST,        ...EU_BROADCAST,        ...EU_BROADCAST];
  const t2 = [...WORLDWIDE_STREAMING, ...WORLDWIDE_STREAMING, ...WORLDWIDE_STREAMING];
  const t3 = [...WORLDWIDE_BROAD,     ...WORLDWIDE_BROAD,     ...WORLDWIDE_BROAD];
  const t4 = [...PPV_VIP,             ...PPV_VIP,             ...PPV_VIP];

  return (
    <section id="channels-section" className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4 scroll-mt-28">
      <div className="text-white rounded-2xl py-8 px-4 md:px-6 relative overflow-hidden shadow-lg"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)", border: "1px solid rgba(226,0,116,0.18)" }}>

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
              <Radio className="w-3 h-3 text-white/60 animate-pulse" />
              <span className="text-[9px] font-black font-mono uppercase tracking-widest text-white/70">{cx.badge}</span>
            </div>
            <h2 className="text-lg font-extrabold tracking-tight text-white">{cx.catalogue}</h2>
          </div>
          <span className="hidden sm:block text-[9px] font-mono text-white/40 border border-white/10 bg-black/10 px-2.5 py-1 rounded-full">
            {ALL_CHANNELS.length} {cx.listed}
          </span>
        </div>

        <div className="relative z-10 mb-3 px-1">
          <div className="flex items-end gap-3">
            <span className="text-base">🌍</span>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-none">
              {cx.eu} <span className="serif-display italic font-light text-white/85">{cx.euItalic}</span>
            </h3>
          </div>
        </div>
        <div className="overflow-hidden -mx-4 md:-mx-6 mb-6 select-none pointer-events-none">
          <div className="animate-scroll flex gap-3 px-4">
            {t1.map((ch, i) => <ChannelCard key={`r1-${ch.id}-${i}`} ch={ch} />)}
          </div>
        </div>

        <div className="relative z-10 my-7 px-1">
          <div className="h-px bg-white/10 mb-6" />
          <div className="flex items-end gap-3">
            <span className="text-base">🌐</span>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-none">
              {cx.world} <span className="serif-display italic font-light text-white/85">{cx.worldItalic}</span>
            </h3>
          </div>
        </div>
        <div className="overflow-hidden -mx-4 md:-mx-6 mb-3 select-none pointer-events-none">
          <div className="animate-scroll-reverse flex gap-3 px-4">
            {t2.map((ch, i) => <ChannelCard key={`r2-${ch.id}-${i}`} ch={ch} />)}
          </div>
        </div>
        <div className="overflow-hidden -mx-4 md:-mx-6 mb-6 select-none pointer-events-none">
          <div className="animate-scroll flex gap-3 px-4">
            {t3.map((ch, i) => <ChannelCard key={`r3-${ch.id}-${i}`} ch={ch} />)}
          </div>
        </div>

        <div className="relative z-10 my-7 px-1">
          <div className="h-px bg-white/10 mb-6" />
          <div className="flex items-end gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#facc15]/15 border border-[#facc15]/30 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-pulse"></span>
              <span className="text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#facc15]">VIP</span>
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-none">
              {cx.ppv} <span className="serif-display italic font-light text-white/85">{cx.ppvItalic}</span>
            </h3>
          </div>
        </div>
        <div className="overflow-hidden -mx-4 md:-mx-6 select-none pointer-events-none">
          <div className="animate-scroll-reverse flex gap-3 px-4">
            {t4.map((ch, i) => <ChannelCard key={`r4-${ch.id}-${i}`} ch={ch} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
