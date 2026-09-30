const EU_CHANNELS = [
  { id: "bbc1",     name: "BBC One",       sub: "BBC One HD",        logo: "/logos/bbc.svg",       bg: "#BB1919" },
  { id: "itv",      name: "ITV",           sub: "ITV HD",            logo: "/logos/itv.svg",       bg: "#006540" },
  { id: "tf1",      name: "TF1",           sub: "TF1 HD",            logo: "/logos/tf1.svg",       bg: "#003F87" },
  { id: "skynews",  name: "Sky News",      sub: "Sky News HD",       logo: "/logos/skynews.svg",   bg: "#DA0000" },
  { id: "skysport", name: "Sky Sports",    sub: "Sky Sports HD",     logo: "/logos/sky.svg",       bg: "#0072C6" },
  { id: "dazn",     name: "DAZN",          sub: "DAZN EU",           logo: "/logos/dazn-real.svg", bg: "#111111" },
  { id: "beIN",     name: "beIN Sports",   sub: "beIN Sports 1",     logo: "/logos/bein.svg",      bg: "#8B0000" },
  { id: "viaplay",  name: "Viaplay",       sub: "Viaplay EU",        logo: "/logos/viaplay-real.svg", bg: "#111111" },
  { id: "canalp",   name: "Canal+",        sub: "Canal+ HD",         logo: "/logos/canal.svg",     bg: "#001A50" },
  { id: "euro1",    name: "Eurosport 1",   sub: "Eurosport 1 HD",    logo: "/logos/eurosport.svg", bg: "#FF6600" },
  { id: "espn",     name: "ESPN",          sub: "ESPN HD",           logo: "/logos/espn.svg",      bg: "#CC0000" },
  { id: "disco",    name: "Discovery+",    sub: "Discovery+ EU",     logo: "/logos/discovery.svg", bg: "#0070C0" },
  { id: "hbo",      name: "HBO Max",       sub: "HBO Max EU",        logo: "/logos/hbomax-real.svg",    bg: "#ffffff" },
  { id: "disney",   name: "Disney+",       sub: "Disney+ EU",        logo: "/logos/disneyplus.png",    bg: "#000B8C" },
  { id: "prime",    name: "Prime Video",   sub: "Amazon Prime",      logo: "/logos/primevideo.svg", bg: "#ffffff" },
  { id: "netflix",  name: "Netflix",       sub: "Netflix EU",        logo: "/logos/netflix.svg",   bg: "#141414" },
  { id: "natgeo",   name: "Nat Geo",       sub: "Nat Geo HD",        logo: "/logos/natgeo.svg",    bg: "#000000" },
  { id: "cnn",      name: "CNN Int'l",     sub: "CNN HD",            logo: "/logos/cnn-real.svg",  bg: "#ffffff" },
  { id: "paramount",name: "Paramount+",    sub: "Paramount+ EU",     logo: "/logos/paramount.svg", bg: "#0064FF" },
  { id: "france24", name: "France 24",     sub: "France 24 HD",      logo: "/logos/france24.png",  bg: "#F50000" },
];

interface ChannelScrollStripProps {
  onPricingClick: () => void;
}

export default function ChannelScrollStrip({ onPricingClick }: ChannelScrollStripProps) {
  const doubled = [...EU_CHANNELS, ...EU_CHANNELS, ...EU_CHANNELS];

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-3">
      <div className="overflow-hidden">
        <div className="animate-scroll flex gap-2.5 px-2">
          {doubled.map((ch, i) => (
            <button
              onClick={onPricingClick}
              key={`${ch.id}-${i}`}
              className="shrink-0 flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl px-3.5 py-2.5 transition-all duration-200 cursor-pointer"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden shrink-0 p-1"
                style={{ backgroundColor: ch.bg }}
              >
                <img
                  src={ch.logo}
                  alt={ch.name}
                  className="w-full h-full object-contain"
                  onError={e => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.style.backgroundColor = ch.bg;
                      parent.innerHTML = `<span style="color:white;font-size:8px;font-weight:900;text-align:center;line-height:1.1;word-break:break-all">${ch.name}</span>`;
                    }
                  }}
                />
              </div>
              <span className="text-white text-[13px] font-bold whitespace-nowrap">{ch.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
