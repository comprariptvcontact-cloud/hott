import { memo, type FC } from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const TMDB = "https://image.tmdb.org/t/p/w300";

interface ContentRowsProps {
  onPricingClick: () => void;
}

interface ContentItem {
  id: string;
  title: string;
  image: string;
}

const HIGHLIGHTS: ContentItem[] = [
  { id: "h1", title: "Dune: Part Two", image: "/movies/dune_part_two_ver2_xxlg.jpg" },
  { id: "h2", title: "Oppenheimer", image: "/movies/oppenheimer_xlg.jpg" },
  { id: "h3", title: "Thunderbolts", image: "/movies/thunderbolts_xxlg.jpg" },
  { id: "h4", title: "Superman", image: "/movies/superman_ver27_xxlg.jpg" },
  { id: "h5", title: "Mission: Impossible", image: "/movies/mission_impossible__the_final_reckoning_xlg.jpg" },
  { id: "h6", title: "Sinners", image: "/movies/sinners_xxlg.jpg" },
];

interface PromoCard {
  id: string;
  labelKey: string;
  titleKey: string;
  gradient: string;
  image: string;
}

const HOL_DIR_CARDS: PromoCard[] = [
  { id: "hd1", labelKey: "", titleKey: "subscribe", gradient: "linear-gradient(135deg, #1c1500 0%, #facc15 100%)", image: "/movies/sinners_xxlg.jpg" },
  { id: "hd2", labelKey: "moviesIncl", titleKey: "iptvPlus", gradient: "linear-gradient(135deg, #0d0d2b 0%, #422006 100%)", image: "/movies/superman_ver27_xxlg.jpg" },
  { id: "hd3", labelKey: "highlightsIncl", titleKey: "sport", gradient: "linear-gradient(135deg, #001a00 0%, #004d00 80%)", image: "/movies/jurassic_world_rebirth_xxlg.jpg" },
  { id: "hd4", labelKey: "concertsIncl", titleKey: "music", gradient: "linear-gradient(135deg, #1a0033 0%, #6600cc 100%)", image: "/movies/napoleon.jpg" },
  { id: "hd5", labelKey: "channelsIncl", titleKey: "freeTV", gradient: "linear-gradient(135deg, #0d1a33 0%, #003380 100%)", image: "/movies/twenty_eight_years_later_ver6_xxlg.jpg" },
  { id: "hd6", labelKey: "integrated", titleKey: "streaming", gradient: "linear-gradient(135deg, #1a1a1a 0%, #422006 100%)", image: "/movies/odyssey_xxlg.jpg" },
];

const SERIEN: ContentItem[] = [
  { id: "sr1", title: "House of the Dragon", image: `${TMDB}/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg` },
  { id: "sr2", title: "The Last of Us", image: `${TMDB}/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg` },
  { id: "sr3", title: "Wednesday", image: `${TMDB}/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg` },
  { id: "sr4", title: "Squid Game", image: `${TMDB}/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg` },
  { id: "sr5", title: "Stranger Things", image: `${TMDB}/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg` },
  { id: "sr6", title: "The Bear", image: `${TMDB}/4fVddnbhcmzRZE14NJY03GKS6Fn.jpg` },
];

const FILME: ContentItem[] = [
  { id: "f1", title: "Captain America", image: "/movies/captain_america_brave_new_world_xxlg.jpg" },
  { id: "f2", title: "John Wick: Kapitel 4", image: "/movies/john_wick_chapter_four_xxlg.jpg" },
  { id: "f3", title: "Killers of the Flower Moon", image: "/movies/killers_of_the_flower_moon_xxlg.jpg" },
  { id: "f4", title: "Jurassic World: Rebirth", image: "/movies/jurassic_world_rebirth_xxlg.jpg" },
  { id: "f5", title: "How to Train Your Dragon", image: "/movies/how_to_train_your_dragon_xxlg.jpg" },
  { id: "f6", title: "Fantastic Four", image: "/movies/fantastic_four_ver4.jpg" },
];

const TV_CONTENT: ContentItem[] = [
  { id: "tv1", title: "Breaking Bad", image: `${TMDB}/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg` },
  { id: "tv2", title: "Game of Thrones", image: `${TMDB}/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg` },
  { id: "tv3", title: "Succession", image: `${TMDB}/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg` },
  { id: "tv4", title: "Peaky Blinders", image: `${TMDB}/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg` },
  { id: "tv5", title: "Money Heist", image: `${TMDB}/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg` },
  { id: "tv6", title: "Ozark", image: `${TMDB}/pCGyPVrI9Fzw6rE1Pvi4BIXF6ET.jpg` },
];

const KIDS: ContentItem[] = [
  { id: "k1", title: "Lilo & Stitch", image: "/movies/lilo_and_stitch_xlg.jpg" },
  { id: "k2", title: "How to Train Your Dragon", image: "/movies/how_to_train_your_dragon_xxlg.jpg" },
  { id: "k3", title: "Project Hail Mary", image: "/movies/project_hail_mary_xxlg.jpg" },
  { id: "k4", title: "Masters of the Universe", image: "/movies/masters_of_the_universe_xxlg.jpg" },
  { id: "k5", title: "Hunger Games: Sunrise", image: "/movies/hunger_games_sunrise_on_the_reaping_xxlg.jpg" },
  { id: "k6", title: "Running Man", image: "/movies/running_man_xxlg.jpg" },
];

interface ContentRowText {
  freeLabel: string;
  getIt: string;
  seriesHighlights: string;
  euFilms: string;
  promoLabels: Record<string, string>;
  promoTitles: Record<string, string>;
}

const contentTexts: Record<string, ContentRowText> = {
  de: {
    freeLabel: "KOSTENLOS & OHNE LOGIN:",
    getIt: "HOL DIR",
    seriesHighlights: "SERIEN-HIGHLIGHTS",
    euFilms: "DEUTSCHE UND EUROPÄISCHE FILME UND SERIEN",
    promoLabels: {
      moviesIncl: "FILME & SERIEN INKLUSIVE:",
      highlightsIncl: "HIGHLIGHTS INKLUSIVE:",
      concertsIncl: "KONZERTE INKLUSIVE:",
      channelsIncl: "ÜBER 160 SENDER INKLUSIVE:",
      integrated: "VOLL INTEGRIERT:",
    },
    promoTitles: {
      subscribe: "PANDORA IPTV BUCHEN",
      iptvPlus: "PANDORA IPTV+",
      sport: "PANDORA IPTV SPORT",
      music: "PANDORA IPTV MUSIK",
      freeTV: "IM FREE-TV SEHEN",
      streaming: "STREAMING-DIENSTE",
    },
  },
  en: {
    freeLabel: "FREE & NO LOGIN:",
    getIt: "GET",
    seriesHighlights: "SERIES HIGHLIGHTS",
    euFilms: "EUROPEAN MOVIES AND SERIES",
    promoLabels: {
      moviesIncl: "MOVIES & SERIES INCLUDED:",
      highlightsIncl: "HIGHLIGHTS INCLUDED:",
      concertsIncl: "CONCERTS INCLUDED:",
      channelsIncl: "160+ CHANNELS INCLUDED:",
      integrated: "FULLY INTEGRATED:",
    },
    promoTitles: {
      subscribe: "SUBSCRIBE TO PANDORA IPTV",
      iptvPlus: "PANDORA IPTV+",
      sport: "PANDORA IPTV SPORT",
      music: "PANDORA IPTV MUSIC",
      freeTV: "WATCH FREE TV",
      streaming: "STREAMING SERVICES",
    },
  },
  nl: {
    freeLabel: "GRATIS & ZONDER LOGIN:",
    getIt: "ONTDEK",
    seriesHighlights: "SERIE-HIGHLIGHTS",
    euFilms: "EUROPESE FILMS EN SERIES",
    promoLabels: {
      moviesIncl: "FILMS & SERIES INCLUSIEF:",
      highlightsIncl: "HIGHLIGHTS INCLUSIEF:",
      concertsIncl: "CONCERTEN INCLUSIEF:",
      channelsIncl: "160+ ZENDERS INCLUSIEF:",
      integrated: "VOLLEDIG GEÏNTEGREERD:",
    },
    promoTitles: {
      subscribe: "ABONNEER OP PANDORA IPTV",
      iptvPlus: "PANDORA IPTV+",
      sport: "PANDORA IPTV SPORT",
      music: "PANDORA IPTV MUZIEK",
      freeTV: "GRATIS TV KIJKEN",
      streaming: "STREAMINGDIENSTEN",
    },
  },
};

const ContentCard: FC<{ item: ContentItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <button onClick={onClick} className="shrink-0 w-[200px] sm:w-[240px] group cursor-pointer text-left">
      <div className="relative rounded-lg overflow-hidden bg-neutral-800" style={{ aspectRatio: "2/3" }}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={e => {
            const el = e.currentTarget;
            el.style.display = "none";
            const p = el.parentElement;
            if (p) {
              p.style.background = "linear-gradient(135deg, #1a1a1a 0%, #333 100%)";
              p.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:rgba(255,255,255,0.4);font-size:13px;font-weight:700;text-align:center;padding:12px">${item.title}</div>`;
            }
          }}
        />
      </div>
    </button>
  );
}

const PromoBanner: FC<{ card: PromoCard; ct: ContentRowText; onClick: () => void }> = ({ card, ct, onClick }) => {
  const label = card.labelKey ? (ct.promoLabels[card.labelKey] ?? card.labelKey) : "";
  const title = ct.promoTitles[card.titleKey] ?? card.titleKey;

  return (
    <button onClick={onClick} className="shrink-0 w-[260px] sm:w-[280px] group cursor-pointer text-left">
      <div
        className="relative aspect-video rounded-lg overflow-hidden flex flex-col justify-end p-5"
        style={{ background: card.gradient }}
      >
        <img
          src={card.image}
          alt={title || "PANDORA IPTV content"}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
        <div className="relative z-10">
          {label && <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>}
          <p className="text-white font-bold text-base uppercase leading-tight">{title}</p>
        </div>
      </div>
    </button>
  );
}

interface RowProps {
  labelColor?: "green" | "accent" | "white";
  label?: string;
  title: string;
  titleColor?: "white" | "accent";
  items?: ContentItem[];
  promoCards?: PromoCard[];
  ct?: ContentRowText;
  hasArrow?: boolean;
  onClick: () => void;
}

function ContentRow({ labelColor = "green", label, title, titleColor = "white", items, promoCards, ct, hasArrow = false, onClick }: RowProps) {
  const colorClass = labelColor === "green" ? "text-[#63c132]" : labelColor === "accent" ? "text-[#facc15]" : "text-white";
  const titleClass = titleColor === "accent" ? "text-[#facc15]" : "text-white";

  return (
    <div className="mb-8">
      <button onClick={onClick} className="flex items-center gap-1.5 mb-3 px-4 md:px-8 max-w-[1600px] mx-auto cursor-pointer hover:opacity-80 transition-opacity">
        {label && <span className={`${colorClass} text-sm font-bold uppercase tracking-wide`}>{label}</span>}
        {title && <span className={`${titleClass} text-sm font-bold uppercase tracking-wide`}>{title}</span>}
        {hasArrow && <ChevronRight className="w-4 h-4 text-white/60 ml-1" />}
      </button>
      <div className="overflow-x-auto scrollbar-hide px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="flex gap-3 pb-2" style={{ minWidth: "max-content" }}>
          {items && items.map(item => <ContentCard key={item.id} item={item} onClick={onClick} />)}
          {promoCards && ct && promoCards.map(card => <PromoBanner key={card.id} card={card} ct={ct} onClick={onClick} />)}
        </div>
      </div>
    </div>
  );
}

function ContentRowsInner({ onPricingClick }: ContentRowsProps) {
  const { lang } = useLanguage();
  const ct = contentTexts[lang] ?? contentTexts.en;

  return (
    <section className="py-6 w-full" style={{ background: "#000" }}>
      <ContentRow
        labelColor="green"
        label={ct.freeLabel}
        title="HIGHLIGHTS"
        items={HIGHLIGHTS}
        onClick={onPricingClick}
      />
      <ContentRow
        labelColor="white"
        label={ct.getIt}
        title="PANDORA IPTV"
        titleColor="accent"
        promoCards={HOL_DIR_CARDS}
        ct={ct}
        onClick={onPricingClick}
      />
      <ContentRow
        labelColor="accent"
        label="PANDORA IPTV+:"
        title={ct.seriesHighlights}
        items={SERIEN}
        hasArrow
        onClick={onPricingClick}
      />
      <ContentRow
        labelColor="green"
        label={ct.freeLabel}
        title="TV"
        items={TV_CONTENT}
        onClick={onPricingClick}
      />
      <ContentRow
        labelColor="white"
        label=""
        title={ct.euFilms}
        items={FILME}
        hasArrow
        onClick={onPricingClick}
      />
      <ContentRow
        labelColor="green"
        label={ct.freeLabel}
        title="KIDS"
        items={KIDS}
        onClick={onPricingClick}
      />
    </section>
  );
}

const ContentRows = memo(ContentRowsInner);
export default ContentRows;
