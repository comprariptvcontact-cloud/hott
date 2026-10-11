// SEO keyword landing pages (TODO-1). Single source of truth shared by the SPA
// router (src/App.tsx) and the post-build prerenderer (scripts/prerender.ts) so
// the client-rendered page and the crawlable static HTML can never drift apart.
//
// Each page is a home-style landing (it reuses the Pricing packages) optimized
// for one principal Dutch keyword, with the Netherlands keyword set woven into
// the copy. Served at the root path `/<slug>` to match the domain.com/KEYWORD
// pattern.
//
// PORTING TO ANOTHER NL SITE: change only the five constants below (SITE, BRAND,
// BRAND_SLUG, BRAND_KEYWORD, WA). Every page string is built from them, so the
// rest of this file is copy-paste identical across the Netherlands sites.

const SITE = "https://www.hotiptv.be";
const BRAND = "HotPlayer";
const BRAND_SLUG = "hot-iptv";
const BRAND_KEYWORD = "HotPlayer";
const WA = "https://wa.me/447462229301";

export interface KeywordFaq {
  q: string;
  a: string;
}

export interface KeywordPage {
  /** Root-level path segment, e.g. "iptv-kopen" → https://www.voodiptv.eu/iptv-kopen */
  slug: string;
  /** Principal keyword this page targets. */
  keyword: string;
  /** <title> (kept ≤ ~60 chars where possible). */
  title: string;
  /** Meta description (≤ 160 chars). */
  description: string;
  /** On-page H1. */
  h1: string;
  /** Intro paragraphs rendered above the packages. [label](url) markdown links allowed. */
  lead: string[];
  /** FAQ block (rendered on-page and emitted as FAQPage JSON-LD). */
  faq: KeywordFaq[];
}

const RAW_KEYWORD_PAGES: KeywordPage[] = [
  {
    slug: BRAND_SLUG,
    keyword: BRAND_KEYWORD,
    title: `${BRAND} — Premium IPTV Abonnement Nederland`,
    description:
      `${BRAND} is een premium IPTV-abonnement voor Nederland: 69.000+ live zenders en 220.000+ films & series in tot 4K/8K. Werkt op elk apparaat, met 24/7 support.`,
    h1: `${BRAND} — Premium IPTV voor Nederland`,
    lead: [
      `[${BRAND}](${SITE}/${BRAND_SLUG}) is een premium IPTV-dienst gemaakt voor Nederland — ruim 69.000 live zenders en meer dan 220.000 films en series on demand, in tot 4K en 8K Ultra HD. Zoekt u een betrouwbare [IPTV Nederland](${SITE}/iptv-nederland) aanbieder die zijn zenders ook echt online houdt, dan bent u hier goed.`,
      `Anders dan de anonieme wederverkopers achter de meeste zoekresultaten toont ${BRAND} de pakketten en prijzen open en onderhoudt de catalogus dagelijks. Het is een compleet IPTV-abonnement voor Nederlandse huishoudens — zonder kabelcontract en zonder verborgen kosten.`,
      `## Waarom ${BRAND} de beste keuze is`,
      `Een goede IPTV-aanbieder bewijs je, niet adverteer je. ${BRAND} levert 69.000+ live zenders inclusief Eredivisie, Champions League, Formule 1 en internationale sport, 220.000+ films en series die wekelijks worden bijgewerkt, beeldkwaliteit tot 8K, en inloggegevens die werken in IPTV Smarters Pro, TiviMate en elke Xtream-compatibele speler — zo zit u nooit vast aan één app.`,
      `## ${BRAND} pakketten`,
      `Kies hieronder een pakket en activeer binnen enkele minuten. Elk ${BRAND} abonnement bevat de volledige zender- en VOD-catalogus, een 15 dagen geld-terug-garantie en 24/7 ondersteuning via WhatsApp. Vergelijk de opties, kies uw looptijd en begin vandaag met kijken. Liever eerst vragen? [Stuur ons een bericht op WhatsApp](${WA}).`,
    ],
    faq: [
      {
        q: `Wat is ${BRAND}?`,
        a: `${BRAND} is een premium IPTV-abonnement voor Nederland met 69.000+ live zenders en 220.000+ films en series in tot 4K/8K, te bekijken op Smart TV, Android, Fire TV, MAG en meer.`,
      },
      {
        q: `Werkt ${BRAND} in heel Nederland?`,
        a: `Ja. ${BRAND} werkt in heel Nederland en België op elke internetverbinding, in het Nederlands, Duits en Engels.`,
      },
      {
        q: `Welke apps werken met ${BRAND}?`,
        a: `Uw ${BRAND} login werkt in IPTV Smarters Pro, TiviMate en andere Xtream-compatibele spelers, zodat u vrij uw favoriete IPTV-player kiest.`,
      },
      {
        q: `Is er een garantie?`,
        a: `Ja. Elk ${BRAND} abonnement komt met een 15 dagen geld-terug-garantie en 24/7 ondersteuning via WhatsApp.`,
      },
    ],
  },
  {
    slug: "iptv-kopen",
    keyword: "IPTV kopen",
    title: `IPTV Kopen — Veilig IPTV Abonnement Kopen | ${BRAND}`,
    description:
      `IPTV kopen zonder gedoe? Bij ${BRAND} koopt u een premium IPTV-abonnement: 69.000+ zenders, 220.000+ films in 4K/8K, open prijzen en directe levering. IPTV kopen in Nederland.`,
    h1: "IPTV Kopen — Een Betrouwbaar IPTV Abonnement in Nederland",
    lead: [
      `Wilt u [IPTV kopen](${SITE}/iptv-kopen) in Nederland? Bij [${BRAND}](${SITE}/${BRAND_SLUG}) koopt u een premium IPTV-abonnement met 69.000+ live zenders en 220.000+ films en series in tot 4K/8K. Eén IPTV-abonnement vervangt uw kabelpakket, Netflix, Disney+ en een sportabonnement — tegen één transparante prijs.`,
      `IPTV kopen hoeft niet ingewikkeld te zijn: kies een pakket, reken veilig af en ontvang uw login binnen enkele minuten. Geen contract, geen verborgen kosten en geen apparatuur die u eerst moet aanschaffen.`,
      `## Waar moet u op letten als u IPTV wilt kopen?`,
      `Koop alleen bij een aanbieder die zijn prijzen open toont, de zenderlijst dagelijks onderhoudt, stabiel (buffervrij) blijft op drukke avonden, elke Xtream- of M3U-app toestaat en echt bereikbaar is. [${BRAND}](${SITE}/${BRAND_SLUG}) voldoet aan alle vijf — en met de 15 dagen geld-terug-garantie test u de stream eerst, zodat u vooraf weet wat u koopt. Een jaarabonnement is bovendien voordeliger per maand dan een maandabonnement.`,
      `## IPTV abonnement kopen`,
      `Kies hieronder een pakket en koop uw IPTV-abonnement in enkele minuten — inclusief 15 dagen geld-terug-garantie en 24/7 ondersteuning. Twijfelt u over de looptijd? [Vraag het ons op WhatsApp](${WA}) of bekijk eerst onze [IPTV aanbieders](${SITE}/iptv-aanbieders) vergelijking.`,
    ],
    faq: [
      { q: "Waar kan ik veilig IPTV kopen?", a: `U koopt veilig IPTV bij een aanbieder met open prijzen en een geld-terug-garantie, zoals ${BRAND}. Kies een pakket, reken af en ontvang direct uw login.` },
      { q: "Hoeveel kost het om IPTV te kopen?", a: "De prijzen staan open bij de pakketten; langere looptijden kosten minder per maand. Elk pakket bevat de volledige zender- en VOD-catalogus." },
      { q: "Hoe snel kan ik kijken nadat ik IPTV koop?", a: `Meestal binnen enkele minuten na betaling. U ontvangt een Xtream-login voor IPTV Smarters Pro of TiviMate en kunt direct beginnen.` },
      { q: "Kan ik ook een IPTV kastje of IPTV box kopen?", a: `U hoeft geen hardware te kopen, maar wilt u een IPTV kastje kopen of IPTV box kopen, dan werkt elke Android TV-box of Fire TV Stick met uw ${BRAND} login. Het abonnement zelf is wat u nodig heeft.` },
    ],
  },
  {
    slug: "iptv-nederland",
    keyword: "IPTV Nederland",
    title: `IPTV Nederland — Beste IPTV Abonnement NL | ${BRAND}`,
    description:
      `Op zoek naar het beste IPTV Nederland abonnement? ${BRAND} biedt 69.000+ zenders en 220.000+ films & series in tot 4K/8K, met Nederlandse zenders en 24/7 support.`,
    h1: "IPTV Nederland — Het Beste IPTV Abonnement voor Nederland",
    lead: [
      `Zoekt u het beste [IPTV Nederland](${SITE}/iptv-nederland) abonnement? [${BRAND}](${SITE}/${BRAND_SLUG}) is een premium IPTV-dienst gemaakt voor Nederland — 69.000+ live zenders en 220.000+ films en series on demand, in tot 4K en 8K. Nederlandse, Belgische en internationale zenders, zonder kabelcontract.`,
      `Of u nu IPTV in Amsterdam, Rotterdam of Groningen zoekt, of gewoon een Nederlandse IPTV die niet na een maand verdwijnt: ${BRAND} biedt een onderhouden catalogus en open prijzen in plaats van het giswerk achter de meeste aanbieders.`,
      `## Wat maakt de beste IPTV voor Nederland?`,
      `De beste [IPTV aanbieders](${SITE}/iptv-aanbieders) delen vijf dingen, en ${BRAND} levert ze alle vijf: een echt, dagelijks onderhouden zenderaanbod (69.000+ live zenders, inclusief NPO 1/2/3, RTL, SBS, Ziggo Sport, ESPN en de Eredivisie), een diepe VOD-bibliotheek (220.000+ titels), stabiele, buffervrije streams tot 4K/8K, vrije app-keuze met IPTV Smarters Pro en TiviMate, en echte ondersteuning via WhatsApp.`,
      `## IPTV Nederland pakketten`,
      `Kies hieronder een IPTV-abonnement — alle pakketten bevatten de volledige catalogus, een 15 dagen geld-terug-garantie en 24/7 ondersteuning. Vergelijk looptijden, kies uw pakket en activeer binnen enkele minuten. Eerst vragen? [Stuur een bericht op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "Wat is de beste IPTV voor Nederland?", a: `${BRAND} hoort bij de beste IPTV Nederland opties: 69.000+ zenders, 220.000+ VOD-titels, tot 4K/8K, open prijzen en 24/7 support — dagelijks onderhouden.` },
      { q: "Zijn er Nederlandse zenders?", a: "Ja. De catalogus bevat Nederlandse, Belgische en internationale zenders plus 220.000+ films en series on demand." },
      { q: "Heb ik speciale apparatuur nodig?", a: `Nee. ${BRAND} werkt op Smart TV, Android, Fire TV Stick, telefoon en MAG-boxen via een Xtream-compatibele app.` },
      { q: "Is dit een echte Nederlandse IPTV dienst?", a: `Ja. ${BRAND} is een Nederlandse IPTV voor de Nederland-markt: Nederlandse zenders (NPO, RTL, SBS), nederland IPTV met open prijzen, Nederlandstalige support en snelle levering.` },
    ],
  },
  {
    slug: "iptv-abonnement",
    keyword: "IPTV Abonnement",
    title: `IPTV Abonnement — Plannen & Prijzen | ${BRAND}`,
    description:
      `Een IPTV abonnement dat kabel en streaming-apps vervangt: 69.000+ zenders en 220.000+ films in 4K/8K, één transparante prijs, 15 dagen garantie. IPTV abonnement in NL.`,
    h1: "IPTV Abonnement — Eén Plan, Alles om naar te Kijken",
    lead: [
      `Een [IPTV abonnement](${SITE}/iptv-abonnement) van [${BRAND}](${SITE}/${BRAND_SLUG}) vervangt uw kabelpakket plus meerdere streaming-apps met één transparante prijs — 69.000+ live zenders en 220.000+ films en series in tot 4K/8K.`,
      `Geen contract, geen verborgen kosten en geen apparatuur om aan te schaffen. Betaal voor de looptijd die u wilt, ontvang uw login binnen enkele minuten en kijk in heel Nederland op elk apparaat. Een IPTV met abonnement geeft u bovendien vaste updates in plaats van een eenmalige lijst.`,
      `## Wat zit er in elk abonnement?`,
      `Alle plannen bevatten de volledige zender- en VOD-catalogus, tot 8K-kwaliteit op geschikte content, compatibiliteit met IPTV Smarters Pro / TiviMate, een 15 dagen geld-terug-garantie en 24/7 WhatsApp-ondersteuning.`,
      `## Kies uw IPTV abonnement`,
      `Kies hieronder een looptijd — een jaarabonnement is duidelijk voordeliger per maand dan een maandabonnement. Activeer binnen enkele minuten en test gerust eerst de stream dankzij de 15 dagen geld-terug-garantie. Vragen vooraf? [Stuur ons een bericht op WhatsApp](${WA}) of [koop direct IPTV](${SITE}/iptv-kopen).`,
    ],
    faq: [
      { q: "Hoe werkt een IPTV abonnement?", a: "Kies een plan, betaal en ontvang een Xtream-login per bericht. Voer die in in IPTV Smarters Pro of TiviMate en begin binnen enkele minuten met kijken." },
      { q: "Wat kost een IPTV abonnement in Nederland?", a: "De prijzen staan open bij de pakketten; langere looptijden kosten minder per maand. Elk plan bevat de volledige catalogus." },
      { q: "Zit er een garantie bij?", a: `Ja — een 15 dagen geld-terug-garantie en 24/7 ondersteuning via WhatsApp bij elk ${BRAND} abonnement.` },
      { q: "Welke IPTV abonnementen zijn er?", a: `Er zijn IPTV abonnementen in verschillende looptijden (maand, half jaar, jaar). Een IPTV met abonnement bij ${BRAND} geeft altijd de volledige catalogus; een langere looptijd is voordeliger per maand.` },
    ],
  },
  {
    slug: "iptv-aanbieders",
    keyword: "IPTV Aanbieders",
    title: `IPTV Aanbieders Vergelijken in Nederland | ${BRAND}`,
    description:
      `IPTV aanbieders vergelijken in Nederland? Zo kiest u een betrouwbare aanbieder — en waarom ${BRAND} 69.000+ zenders, 220.000+ VOD en open prijzen levert.`,
    h1: "IPTV Aanbieders in Nederland — Hoe Kiest U een Betrouwbare?",
    lead: [
      `Er zijn honderden [IPTV aanbieders](${SITE}/iptv-aanbieders) die zich op Nederland richten, en de meeste verdwijnen binnen enkele maanden. [${BRAND}](${SITE}/${BRAND_SLUG}) is het soort aanbieder dat u echt kunt meten en bereiken.`,
      `## Wat onderscheidt een echte aanbieder van een wederverkoper?`,
      `Een betrouwbare IPTV aanbieder toont prijzen open, onderhoudt de zenderlijst dagelijks (geen eenmalige set), blijft stabiel op drukke avonden, laat u elke Xtream-app gebruiken en reageert als er iets stuk gaat. Anonieme wederverkopers vallen op de meeste punten af.`,
      `${BRAND} biedt 69.000+ live zenders, 220.000+ VOD-titels, tot 4K/8K-kwaliteit en 24/7 WhatsApp-ondersteuning — open, zodat u het kunt controleren voordat u betaalt. Dankzij de proefperiode via de 15 dagen geld-terug-garantie test u de stream eerst zelf, en de reviews spreken voor zich. Bekijk ook de [beste IPTV](${SITE}/beste-iptv) checklist.`,
      `## Vergelijk de ${BRAND} pakketten`,
      `Bekijk hieronder de plannen en beoordeel ze tegen elke andere aanbieder die u overweegt. 15 dagen geld-terug-garantie inbegrepen. [Vraag ons gerust alles op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "Hoe kies ik een IPTV aanbieder in Nederland?", a: `Let op prijstransparantie, onderhoud van zenders, stabiliteit, vrije app-keuze en echte ondersteuning. ${BRAND} is op alle vijf open te controleren.` },
      { q: "Waarom verdwijnen zoveel IPTV aanbieders?", a: `Anonieme wederverkopers besparen op servers en onderhoud. Een aanbieder met open prijzen, een onderhouden catalogus en echte support — zoals ${BRAND} — is de veiligere keuze.` },
      { q: "Kan ik testen voordat ik beslis?", a: "Ja. Elk plan heeft een 15 dagen geld-terug-garantie, zodat u de kwaliteit risicovrij kunt beoordelen." },
      { q: "Wat zijn de beste IPTV aanbieders in Nederland voor 2025?", a: `De beste IPTV aanbieders en providers van Nederland voor 2025 scoren op prijstransparantie, een onderhouden zenderlijst en echte support. Als IPTV aanbieder voldoet ${BRAND} aan alle punten en u kunt het vooraf controleren.` },
      { q: `Is ${BRAND} een provider of een wederverkoper?`, a: `${BRAND} is een echte IPTV provider met een dagelijks onderhouden catalogus en open prijzen — geen anonieme wederverkoper.` },
    ],
  },
  {
    slug: "iptv-box",
    keyword: "IPTV Box",
    title: `IPTV Box & Kastje — Op Elk Apparaat | ${BRAND}`,
    description:
      `Geen dure IPTV box nodig: ${BRAND} werkt op Fire TV, Android box, Smart TV, MAG en telefoon. 69.000+ zenders en 220.000+ films in 4K/8K. IPTV kastje of uw eigen apparaat.`,
    h1: "IPTV Box in Nederland — Kijk op Elk Apparaat",
    lead: [
      `Zoekt u een [IPTV box](${SITE}/iptv-box) of IPTV kastje in Nederland? Met [${BRAND}](${SITE}/${BRAND_SLUG}) hoeft u geen dure hardware te kopen — uw abonnement draait op de apparaten die u al heeft, van een Fire TV Stick of Android box tot een Smart TV, MAG-box of telefoon.`,
      `Of u nu zocht op "iptv box", "iptv kastje" of "iptv box kopen": de installatie is hetzelfde — installeer een Xtream-compatibele app, voer uw ${BRAND} login in en stream 69.000+ live zenders en 220.000+ films en series in tot 4K/8K.`,
      `## Welk IPTV kastje werkt het beste?`,
      `Een Fire TV Stick 4K, een Apple TV of een voordelige Android TV-box draaien ${BRAND} perfect via IPTV Smarters Pro of TiviMate. Op de Fire TV Stick installeert u de app via de Downloader-app; Kodi en MAG-boxen werken ook via de portal (M3U of Xtream Codes), inclusief EPG-programmagids. U zit nooit vast aan één apparaat — hetzelfde abonnement reist met u mee.`,
      `## IPTV box pakketten`,
      `Kies hieronder een plan en activeer binnen enkele minuten — volledige catalogus, 15 dagen geld-terug-garantie en 24/7 ondersteuning inbegrepen. Niet zeker welk apparaat? [Vraag het ons op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "Moet ik een IPTV box kopen?", a: `Nee. ${BRAND} werkt op Fire TV, Android-boxen, Smart TV's, MAG-boxen en telefoons via een gratis Xtream-compatibele app — een aparte box kopen is niet nodig.` },
      { q: "Wat is het beste IPTV kastje in Nederland?", a: "Een Fire TV Stick 4K of een Android TV-box zijn het makkelijkst. Beide draaien IPTV Smarters Pro of TiviMate met uw login." },
      { q: "Kan ik hetzelfde abonnement op meerdere kastjes gebruiken?", a: "Uw plan dekt het aantal apparaten in uw pakket; extra gelijktijdige verbindingen zijn mogelijk. Vraag op WhatsApp naar de details." },
      { q: "Welke is de beste IPTV box of IPTV kastje om te kopen?", a: "De beste IPTV box kopen is optioneel. Populaire set-top boxen zijn de Formuler Z-serie, de Nvidia Shield, de Xiaomi Mi Box en de X96 Android TV-box. Let op minimaal 2 GB RAM, een Ethernet-poort en H.265/HEVC-ondersteuning; een Fire TV Stick 4K volstaat ook." },
      { q: "Werkt IPTV op een Android box, tv box of wifi box?", a: "Ja. IPTV box android werkt prima, net als een IPTV tv box of IPTV wifi box: installeer IPTV Smarters Pro of TiviMate, log in met Xtream of M3U en kijk met EPG. Een IPTV ontvanger of MAG-box werkt via de portal." },
    ],
  },
  {
    slug: "iptv-totaal",
    keyword: "IPTV Totaal",
    title: `IPTV Totaal — Compleet IPTV Pakket | ${BRAND}`,
    description:
      `IPTV totaal: één compleet pakket met 69.000+ zenders en 220.000+ films & series in 4K/8K. Sport, films, series en internationale zenders bij ${BRAND}.`,
    h1: "IPTV Totaal — Het Complete Pakket voor Nederland",
    lead: [
      `[IPTV totaal](${SITE}/iptv-totaal) betekent alles in één: met [${BRAND}](${SITE}/${BRAND_SLUG}) krijgt u een compleet pakket van 69.000+ live zenders en 220.000+ films en series in tot 4K/8K — sport, films, series, kinder- en internationale zenders in één abonnement.`,
      `Geen losse abonnementen meer voor sport, films en buitenlandse zenders. Eén [IPTV abonnement](${SITE}/iptv-abonnement) vervangt ze allemaal, tegen één open prijs en zonder kabelcontract.`,
      `## Wat zit er in het totaalpakket?`,
      `NPO, RTL, SBS en Ziggo Sport, ESPN met de Eredivisie en Champions League, internationale sport, de nieuwste films en complete series, kinderzenders en documentaires — 220.000+ titels wekelijks bijgewerkt, in tot 8K, met inloggegevens (Xtream of M3U + EPG) die werken in IPTV Smarters Pro en TiviMate.`,
      `## IPTV totaal pakketten`,
      `Kies hieronder uw looptijd en start het complete pakket binnen enkele minuten. 15 dagen geld-terug-garantie en 24/7 ondersteuning inbegrepen. [Stel uw vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "Wat betekent IPTV totaal?", a: `IPTV totaal is één compleet pakket met alle zenders en VOD: bij ${BRAND} zijn dat 69.000+ live zenders en 220.000+ films en series in tot 4K/8K.` },
      { q: "Zit sport in het totaalpakket?", a: "Ja. Eredivisie, Champions League en internationale sport zitten in het pakket, samen met films, series en internationale zenders." },
      { q: "Is het echt alles-in-één?", a: "Ja. Eén abonnement dekt de volledige zender- en VOD-catalogus — geen losse pakketten nodig." },
      { q: "Wat is het verschil tussen IPTV totaal en Totaal TV?", a: `Beide termen staan voor hetzelfde idee: één totaalpakket met alle zenders en VOD. Bij ${BRAND} krijgt u met IPTV totaal / Totaal TV de volledige catalogus in één abonnement.` },
    ],
  },
  {
    slug: "beste-iptv",
    keyword: "Beste IPTV",
    title: `Beste IPTV Nederland — Vergelijk & Kies | ${BRAND}`,
    description:
      `De beste IPTV van Nederland, bewezen in plaats van beloofd: 69.000+ zenders, 220.000+ VOD, tot 4K/8K, open prijzen en 24/7 support. Waarom ${BRAND} opvalt.`,
    h1: "Beste IPTV in Nederland — Bewezen, Niet Beloofd",
    lead: [
      `Elke aanbieder claimt de [beste IPTV](${SITE}/beste-iptv) van Nederland te zijn, dus negeer de slogans en meet het zelf. Op de vijf punten die er echt toe doen, houdt [${BRAND}](${SITE}/${BRAND_SLUG}) stand.`,
      `## De vijf controles`,
      `Zenderonderhoud (69.000+ live zenders, dagelijks onderhouden, inclusief Eredivisie en Champions League), VOD-diepte (220.000+ titels), stabiliteit onder belasting (buffervrije streams tot 4K/8K op drukke avonden), vrije app-keuze (IPTV Smarters Pro, TiviMate, elke Xtream- of M3U-speler, met EPG-programmagids) en echte support (24/7 via WhatsApp met open prijzen).`,
      `De meeste "beste iptv"-lijstjes zakken al op prijstransparantie — als u eerst iemand moet appen om een prijs te zien, verkoopt men u onzekerheid. ${BRAND} toont de pakketten open.`,
      `## Beste IPTV Nederland pakketten`,
      `Vergelijk hieronder de plannen en oordeel zelf. 15 dagen geld-terug-garantie en 24/7 ondersteuning bij elk ${BRAND} abonnement. [Stuur ons een bericht op WhatsApp](${WA}) met elke vraag.`,
    ],
    faq: [
      { q: "Wat maakt de beste IPTV in Nederland?", a: `Dagelijks onderhouden zenders, een diepe VOD-bibliotheek, stabiliteit, vrije app-keuze en echte support met open prijzen — ${BRAND} levert alle vijf.` },
      { q: `Is ${BRAND} de beste IPTV voor Nederland?`, a: `${BRAND} is gebouwd om de vijf meetbare controles te doorstaan: 69.000+ zenders, 220.000+ VOD, tot 4K/8K, open prijzen en 24/7 support.` },
      { q: "Hoe controleer ik de kwaliteit?", a: "Start een plan, test een live wedstrijd in beweging en de VOD-catalogus, en gebruik de 15 dagen geld-terug-garantie als het niet bevalt." },
      { q: "Wat is de beste IPTV voor Nederland?", a: `De beste IPTV voor Nederland is er een die u kunt meten: ${BRAND} biedt 69.000+ zenders met Nederlandse kanalen, 220.000+ VOD, buffervrije 4K/8K, open prijzen en een proefperiode.` },
      { q: "Welke is de beste IPTV player of beste IPTV app?", a: "De beste IPTV player en beste IPTV app hangen af van uw apparaat: TiviMate en IPTV Smarters Pro zijn favoriet op Android TV, Smart IPTV op Samsung/LG en GSE of Perfect Player op oudere toestellen — allemaal werken ze met uw login." },
    ],
  },
  {
    slug: "iptv-smarters-pro",
    keyword: "IPTV Smarters Pro",
    title: `IPTV Smarters Pro Instellen in Nederland | ${BRAND}`,
    description:
      `IPTV Smarters Pro gebruiken met ${BRAND}: stapsgewijze installatie, 69.000+ zenders en 220.000+ films & series in tot 4K/8K op elk apparaat in Nederland.`,
    h1: "IPTV Smarters Pro met " + BRAND + " — Eenvoudig Instellen",
    lead: [
      `[IPTV Smarters Pro](${SITE}/iptv-smarters-pro) is een van de populairste IPTV-spelers in Nederland, en werkt perfect met [${BRAND}](${SITE}/${BRAND_SLUG}). Uw abonnement is Xtream-compatibel, dus het instellen duurt een paar minuten.`,
      `## Zo stelt u IPTV Smarters Pro in`,
      `Installeer IPTV Smarters Pro (of TiviMate) op uw Fire TV, Android-box, Smart TV of telefoon, kies "Login with Xtream Codes API" (of laad de M3U-playlist-URL), en voer de gebruikersnaam, het wachtwoord en de server-URL uit uw ${BRAND} abonnement in. Klaar — 69.000+ zenders en 220.000+ VOD laden direct. Voeg de EPG-URL toe voor een volledige programmagids.`,
      `Op een Fire TV Stick staat de app niet in de store; installeer hem eenvoudig via de gratis Downloader-app. Op Android TV-boxen en Kodi gebruikt u dezelfde Xtream- of M3U-login. Zo kijkt u buffervrij met een nette EPG op elk apparaat.`,
      `Omdat uw login standaard Xtream is, zit u nooit vast aan één app: verandert IPTV Smarters Pro ooit, dan werken dezelfde gegevens in TiviMate en andere spelers.`,
      `## Krijg uw IPTV Smarters Pro login`,
      `Kies hieronder een plan en ontvang uw Xtream-login binnen enkele minuten. Hulp nodig bij het instellen? [Stuur ons een bericht op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "Is IPTV Smarters Pro gratis?", a: `De app is gratis; u heeft een abonnement zoals ${BRAND} nodig dat de zenders en VOD levert via een Xtream-login.` },
      { q: "Hoe log ik in op IPTV Smarters Pro?", a: `Kies 'Login with Xtream Codes API' en voer de gebruikersnaam, het wachtwoord en de server-URL uit uw ${BRAND} abonnement in.` },
      { q: "Werkt het op Fire TV en Android?", a: `Ja. IPTV Smarters Pro draait op Fire TV, Android, Smart TV en telefoons, allemaal compatibel met ${BRAND}.` },
      { q: "Welke andere IPTV spelers kan ik gebruiken?", a: "Naast IPTV Smarters Pro werken TiviMate, Smart IPTV (Samsung/LG), GSE Smart IPTV, OTT Navigator, Perfect Player en de meeste IPTV stream players op Android. Een IPTV player op Android of een smart player — allemaal via Xtream of M3U met EPG." },
      { q: "Werkt een IPTV player android en Kodi?", a: "Ja. Een IPTV player android zoals IPTV Smarters Pro of TiviMate, een IPTV app android, en Kodi met de PVR IPTV Simple Client werken allemaal met dezelfde M3U- of Xtream-login." },
    ],
  },
  {
    slug: "goedkope-iptv",
    keyword: "Goedkope IPTV",
    title: `Goedkope IPTV — Voordelig IPTV Abonnement | ${BRAND}`,
    description:
      `Goedkope IPTV zonder in te leveren op kwaliteit: ${BRAND} biedt 69.000+ zenders en 220.000+ films in 4K/8K vanaf een lage maandprijs, met open tarieven en garantie.`,
    h1: "Goedkope IPTV — Voordelig, Zonder in te Leveren op Kwaliteit",
    lead: [
      `Zoekt u [goedkope IPTV](${SITE}/goedkope-iptv) in Nederland? Met [${BRAND}](${SITE}/${BRAND_SLUG}) betaalt u een lage maandprijs en krijgt u toch 69.000+ live zenders en 220.000+ films en series in tot 4K/8K. Goedkoop IPTV hoeft niet onbetrouwbaar te betekenen.`,
      `Eén voordelig [IPTV abonnement](${SITE}/iptv-abonnement) vervangt uw kabelpakket plus meerdere streaming-apps — dat scheelt al snel tientallen euro's per maand, zonder contract en zonder verborgen kosten.`,
      `## Goedkoop én betrouwbaar — hoe dan?`,
      `De prijs per maand daalt bij een langere looptijd, terwijl u dezelfde volledige catalogus, dezelfde 4K/8K-kwaliteit en dezelfde 24/7 support houdt. Zo krijgt u goedkope IPTV zonder de risico's van anonieme wederverkopers.`,
      `## Goedkope IPTV pakketten`,
      `Vergelijk hieronder de looptijden — hoe langer het plan, hoe lager de maandprijs. 15 dagen geld-terug-garantie inbegrepen. [Vraag naar de beste prijs op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "Is goedkope IPTV betrouwbaar?", a: `Dat kan, mits de aanbieder open prijzen en een garantie biedt. ${BRAND} levert een lage maandprijs met een dagelijks onderhouden catalogus en 24/7 support.` },
      { q: "Hoe wordt IPTV goedkoper?", a: "Langere looptijden kosten minder per maand. U houdt dezelfde volledige zender- en VOD-catalogus en dezelfde kwaliteit." },
      { q: "Zit er een garantie bij de voordelige plannen?", a: "Ja. Elk plan, ook het voordeligste, komt met een 15 dagen geld-terug-garantie." },
    ],
  },
  {
    slug: "4k-iptv",
    keyword: "4K IPTV",
    title: `4K IPTV — Ultra HD Streams in Nederland | ${BRAND}`,
    description:
      `4K IPTV met ${BRAND}: 69.000+ zenders en 220.000+ films & series in 4K en tot 8K Ultra HD, stabiel op elke snelle verbinding. Kijk 4K IPTV in heel Nederland.`,
    h1: "4K IPTV — Ultra HD Zenders en Films in Nederland",
    lead: [
      `[4K IPTV](${SITE}/4k-iptv) van [${BRAND}](${SITE}/${BRAND_SLUG}) brengt scherpe Ultra HD naar uw scherm — 69.000+ live zenders en 220.000+ films en series, met content in 4K en tot 8K. Op een snelle verbinding kijkt u sport en films in volle resolutie.`,
      `Niet elke IPTV levert echt 4K: het vraagt stabiele servers en voldoende bandbreedte. ${BRAND} houdt de streams stabiel, ook op drukke wedstrijdavonden.`,
      `## Wat heb ik nodig voor 4K IPTV?`,
      `Een 4K-scherm (Smart TV, Fire TV Stick 4K of Apple TV 4K), een internetverbinding vanaf ongeveer 25 Mbps en een Xtream-speler zoals IPTV Smarters Pro of TiviMate. Uw ${BRAND} login doet de rest, zodat u IPTV 4K zonder haperen kijkt.`,
      `## 4K IPTV pakketten`,
      `Kies hieronder een plan en kijk binnen enkele minuten in Ultra HD. 15 dagen geld-terug-garantie en 24/7 ondersteuning inbegrepen. [Vraag naar 4K op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Levert ${BRAND} echt 4K?`, a: `Ja. Een deel van de zenders en veel VOD-titels zijn in 4K en tot 8K beschikbaar, zolang uw scherm en verbinding het ondersteunen.` },
      { q: "Welke snelheid heb ik nodig voor 4K IPTV?", a: "Voor stabiele 4K-streams is ongeveer 25 Mbps aanbevolen. Voor HD volstaat minder." },
      { q: "Werkt 4K op een Fire TV Stick?", a: "Ja, op een Fire TV Stick 4K of een vergelijkbaar 4K-apparaat met IPTV Smarters Pro of TiviMate." },
      { q: "Welke codec gebruikt 4K en 8K IPTV?", a: "4K en 8K IPTV gebruiken meestal H.265 (HEVC) voor efficiënte, buffervrije streams; oudere content gebruikt H.264. De meeste moderne Smart TV's, boxen en sticks ondersteunen beide." },
    ],
  },
  // ---- German keyword pages (DE rollout) ----
  // ── 1 ── iptv abo / iptv-abonnement / iptv 12 monate ──────────────────────
  {
    slug: "iptv-12-monate",
    keyword: "IPTV Abo 12 Monate",
    title: `IPTV Abo 12 Monate — IPTV-Abonnement | ${BRAND}`,
    description:
      "IPTV Abo für 12 Monate: 69.000+ Sender und 220.000+ Filme & Serien in 4K. Das günstige IPTV-Abonnement von Deutschland mit 15 Tagen Geld-zurück-Garantie.",
    h1: "IPTV Abo für 12 Monate — Dein IPTV-Abonnement für Deutschland",
    lead: [
      `Ein [IPTV Abo](${SITE}/iptv-12-monate) für 12 Monate ist die günstigste Art, Live-Fernsehen und Video-on-Demand über das Internet zu streamen. Mit dem Jahresabo von ${BRAND} erhältst du über 69.000 Live-Sender und mehr als 220.000 Filme und Serien als VOD — in Full HD, 4K und bis zu 8K UHD. Statt zwölf Monate einzeln zu zahlen, sicherst du dir mit dem IPTV-Abonnement den besten Preis pro Monat.`,
      `Wer „iptv abo kaufen" sucht, vergleicht meist Monatsabo und Jahresabo. Ein 12-Monats-IPTV-Abonnement rechnet sich klar: ein fester, transparenter Preis, keine versteckten Kosten und permanente Updates der Sender- und VOD-Liste. ${BRAND} nennt seine Pakete und Preise offen und hält den Katalog täglich aktuell — anders als die anonymen Wiederverkäufer hinter vielen Billigangeboten.`,
      `## Was bringt ein IPTV Abo für 12 Monate?`,
      `Ein gutes IPTV-Abonnement ersetzt Kabel, Satellit und mehrere Streaming-Dienste in einem. Du bekommst deutsche Sender wie ARD, ZDF, RTL, Sat.1 und ProSieben, dazu internationale Programme, Sport mit Sky- und DAZN-Kanälen, sowie eine Mediathek mit 220.000+ Filmen und Serien. Alles läuft stabil und pufferfrei — für HD reichen rund 16 Mbit/s, für 4K etwa 25 Mbit/s Bandbreite.`,
      `## IPTV-Abonnement: Preise & Pakete`,
      `Wähle unten dein Paket und aktiviere es in wenigen Minuten. Jedes IPTV Abo von ${BRAND} enthält den vollständigen Sender- und VOD-Katalog, läuft auf Smart TV, Amazon Fire TV Stick, Android-Box, MAG und Apple TV und funktioniert mit IPTV Smarters Pro, TiviMate sowie jedem Xtream-Codes- oder M3U-kompatiblen Player. Dazu 15 Tage Geld-zurück-Garantie und 24/7 Support. Du willst zuerst fragen? [Schreib uns auf WhatsApp](${WA}).`,
    ],
    faq: [
      {
        q: "Was kostet ein IPTV Abo für 12 Monate?",
        a: `Das 12-Monats-IPTV-Abonnement von ${BRAND} ist deutlich günstiger als zwölf einzelne Monate. Den genauen Preis pro Paket (1 oder 2 Geräte) findest du in der Preisübersicht oben — mit transparentem Festpreis und ohne versteckte Kosten.`,
      },
      {
        q: "Was ist im IPTV-Abonnement enthalten?",
        a: "Enthalten sind 69.000+ Live-Sender, 220.000+ Filme & Serien als VOD, Bildqualität bis 4K/8K, permanente Updates sowie Zugang per IPTV Smarters Pro, TiviMate und anderen Xtream-/M3U-Playern.",
      },
      {
        q: "Lohnt sich ein Jahresabo oder lieber ein Monatsabo?",
        a: "Ein 12-Monats-Abo hat den niedrigsten Preis pro Monat und muss nur einmal eingerichtet werden. Wer erst testen möchte, startet mit einem kürzeren Paket und profitiert von der 15-tägigen Geld-zurück-Garantie.",
      },
      {
        q: "Gibt es eine Geld-zurück-Garantie?",
        a: `Ja. Jedes IPTV Abo von ${BRAND} kommt mit 15 Tagen Geld-zurück-Garantie und 24/7 Support per WhatsApp.`,
      },
    ],
  },

  // ── 2 ── bester iptv anbieter / iptv anbieter liste / vergleich ───────────
  {
    slug: "welcher-iptv-anbieter-ist-der-beste",
    keyword: "bester IPTV Anbieter",
    title: `Bester IPTV Anbieter — IPTV Anbieter Liste | ${BRAND}`,
    description:
      "Welcher IPTV Anbieter ist der beste? IPTV Anbieter Liste & Vergleich: Woran du einen seriösen IPTV-Anbieter erkennst — 69.000+ Sender, 4K, Geld-zurück-Garantie.",
    h1: "Welcher IPTV Anbieter ist der beste? Liste & Vergleich",
    lead: [
      `Die Frage „welcher ist der [beste IPTV Anbieter](${SITE}/welcher-iptv-anbieter-ist-der-beste)?" lässt sich nicht mit Werbung beantworten, sondern nur mit nachprüfbaren Kriterien. Dieser Ratgeber zeigt dir eine ehrliche IPTV Anbieter Liste und erklärt, woran du einen seriösen IPTV-Anbieter erkennst — damit du nicht auf unseriöse Billigangebote hereinfällst.`,
      `Viele Suchen nach „bester iptv-anbieter" landen bei anonymen Wiederverkäufern ohne Impressum, ohne klare Preise und ohne Kündigungsregeln. Seriosität erkennst du an transparenten Preisen, einem echten, gepflegten Sender- und VOD-Katalog, einer Geld-zurück-Garantie und erreichbarem Support. ${BRAND} erfüllt diese Punkte und nennt Pakete und Preise offen.`,
      `## IPTV Anbieter Vergleich: 6 Kriterien`,
      `Ein guter IPTV-Anbieter wird gemessen, nicht beworben. Achte im IPTV Anbieter Vergleich auf: (1) Stabilität zur Primetime — teste während eines Live-Spiels am Abend, nicht nur nachmittags; (2) Testphase ohne Kreditkarte; (3) tatsächlich verfügbare deutsche Sender (ARD, ZDF, RTL, Sat.1, Sky, DAZN); (4) Bildqualität bis 4K/8K und pufferfreies Streaming; (5) App-Freiheit mit IPTV Smarters Pro, TiviMate und Xtream-Codes/M3U; (6) transparente Preise, Impressum, Geld-zurück-Garantie und 24/7 Support.`,
      `## Warum ${BRAND} ein seriöser IPTV-Anbieter ist`,
      `${BRAND} liefert 69.000+ Live-Sender inklusive Bundesliga- und Champions-League-Kanälen, 220.000+ Filme und Serien als VOD mit wöchentlichen Updates, Bildqualität bis 8K, Zugang per IPTV Smarters Pro und TiviMate auf Fire TV, Android, Apple TV und Smart TV sowie 15 Tage Geld-zurück-Garantie. Vergleiche die Pakete unten und entscheide selbst. Fragen? [Schreib uns auf WhatsApp](${WA}).`,
    ],
    faq: [
      {
        q: "Welcher IPTV Anbieter ist der beste?",
        a: `Der beste IPTV-Anbieter ist der, der zur Primetime stabil läuft, deutsche Sender wirklich enthält, transparent abrechnet und eine Geld-zurück-Garantie bietet. ${BRAND} erfüllt diese Kriterien mit 69.000+ Sendern, 4K/8K und 24/7 Support.`,
      },
      {
        q: "Woran erkenne ich einen seriösen IPTV-Anbieter?",
        a: "An transparenten Preisen und Impressum, einem echten und täglich gepflegten Senderkatalog, einer Testphase bzw. Geld-zurück-Garantie, erreichbarem Support und stabilen Streams auch bei Live-Sport am Abend.",
      },
      {
        q: "Gibt es eine echte IPTV Anbieter Liste zum Vergleichen?",
        a: "Verlasse dich nicht auf Werbe- oder Affiliate-Ranglisten. Vergleiche Anbieter selbst anhand der 6 Kriterien oben und nutze eine kostenlose Testphase bzw. die Geld-zurück-Garantie, um die Qualität zur Hauptsendezeit zu prüfen.",
      },
      {
        q: "Welche Geräte und Apps werden unterstützt?",
        a: `Dein ${BRAND}-Zugang funktioniert mit IPTV Smarters Pro, TiviMate und jedem Xtream-Codes-/M3U-Player auf Smart TV, Amazon Fire TV Stick, Android-Box, MAG und Apple TV.`,
      },
    ],
  },

  // ── 3 ── iptv bundesliga ──────────────────────────────────────────────────
  {
    slug: "iptv-bundesliga",
    keyword: "IPTV Bundesliga",
    title: `IPTV Bundesliga — Fußball live streamen | ${BRAND}`,
    description:
      `IPTV Bundesliga: Fußball, Sky- und DAZN-Sender, Konferenz & Champions League in 4K live streamen. 69.000+ Sender auf Smart TV, Fire TV & Co. — mit ${BRAND}.`,
    h1: "IPTV Bundesliga — Fußball live in 4K streamen",
    lead: [
      `Du willst die [IPTV Bundesliga](${SITE}/iptv-bundesliga) live sehen, ohne mehrere Abos zu kombinieren? Mit ${BRAND} streamst du Fußball, die Samstagskonferenz, Einzelspiele und die UEFA Champions League über ein einziges IPTV-Abonnement — in Full HD und 4K, auf jedem Gerät.`,
      `Die Bundesliga ist in Deutschland auf mehrere Anbieter verteilt (u. a. Sky und DAZN). ${BRAND} bündelt die relevanten Sport- und Fußball-Sender zusammen mit 69.000+ Live-Sendern und 220.000+ Filmen und Serien — so verpasst du weder Bundesliga noch Champions League, DFB-Pokal oder internationale Ligen.`,
      `## Bundesliga per IPTV: Das brauchst du`,
      `Für ruckelfreies Fußball-Streaming in HD solltest du rund 16 Mbit/s, für 4K etwa 25 Mbit/s Bandbreite haben. ${BRAND} liefert stabile Server auch zur Primetime, wenn alle gleichzeitig das Abendspiel sehen. Der Zugang läuft über IPTV Smarters Pro, TiviMate oder jeden Xtream-Codes-/M3U-Player auf Amazon Fire TV Stick, Smart TV, Android-Box, MAG und Apple TV — mit EPG-Programmführer für alle Spiele.`,
      `## Alle Spiele in einem IPTV-Abo`,
      `Statt Sky, DAZN und Streaming-Dienste einzeln zu zahlen, bekommst du mit ${BRAND} Live-Sport, Bundesliga-Konferenz, Champions League und die großen europäischen Ligen in einem Paket. Wähle unten dein IPTV-Abonnement, aktiviere in Minuten und sieh das nächste Spiel live. Fragen zum Sport-Angebot? [Schreib uns auf WhatsApp](${WA}).`,
    ],
    faq: [
      {
        q: "Kann ich die Bundesliga per IPTV streamen?",
        a: `Ja. Mit ${BRAND} streamst du Bundesliga-Spiele, die Samstagskonferenz und die Champions League über ein IPTV-Abonnement in Full HD und 4K — auf Smart TV, Fire TV, Android und Apple TV.`,
      },
      {
        q: "Welche Internetgeschwindigkeit brauche ich für Fußball in 4K?",
        a: `Für HD-Streams werden rund 16 Mbit/s empfohlen, für 4K etwa 25 Mbit/s. Bei mehreren gleichzeitigen Streams entsprechend mehr. ${BRAND} liefert stabile, pufferfreie Server auch zur Primetime.`,
      },
      {
        q: "Brauche ich für die Bundesliga mehrere Abos?",
        a: `Nein. ${BRAND} bündelt die relevanten Sport- und Fußball-Sender mit 69.000+ Live-Kanälen in einem IPTV-Abo, sodass du Bundesliga, Champions League und weitere Ligen ohne mehrere Einzelabos siehst.`,
      },
      {
        q: "Auf welchen Geräten läuft die IPTV Bundesliga?",
        a: "Auf Amazon Fire TV Stick, Smart TV, Android-Box, MAG und Apple TV — über IPTV Smarters Pro, TiviMate oder jeden Xtream-Codes-/M3U-kompatiblen Player mit EPG-Programmführer.",
      },
    ],
  },
  // ---- NL keyword pages batch 2 (17 keywords) ----
  {
    slug: "iptv-kastje",
    keyword: `IPTV kastje`,
    title: `IPTV kastje kopen — welke box is het beste? | ${BRAND}`,
    description: `IPTV kastje nodig? Firestick 4K, Formuler, MAG of Android TV-box — zo kies je het juiste IPTV kastje voor ${BRAND} met IPTV Smarters Pro, TiviMate en 4K.`,
    h1: `IPTV kastje: welke box kies je?`,
    lead: [
      `Een [IPTV kastje](${SITE}/iptv-kastje) is het apparaat waarop je ${BRAND} afspeelt op je tv. De hardware zelf is gewoon legaal te koop; wat telt is een betrouwbaar abonnement met een geldige catalogus. Hieronder vergelijken we de populairste kastjes en apps.`,
      `## Welk IPTV kastje is het beste?`,
      `De Amazon Fire TV Stick 4K (Max) is voor de meeste mensen de makkelijkste keuze: goedkoop, snel en geschikt voor IPTV Smarters Pro en TiviMate in 4K HDR. Wie meer wil, kiest een Formuler (Z11) met EPG, opname en multi-screen, een MAG-box voor een portal-opstelling zonder apps, of een krachtige Nvidia Shield. Een Android TV-box is de voordeligste bekabelde optie — kies minstens 2–4 GB RAM.`,
      `Tip: gebruik waar mogelijk een bekabelde ethernetverbinding in plaats van wifi — dat streamt stabieler, zeker in 4K en tijdens de avondpiek. ${BRAND} werkt op elk van deze kastjes met je Xtream-Codes- of M3U-gegevens. [Vraag het ons op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Welk IPTV kastje heb ik nodig?`, a: `Een Fire TV Stick 4K is voor de meesten voldoende. Voor extra functies (EPG, opname, multi-screen) kies je een Formuler, MAG of Nvidia Shield. Een Android TV-box met 2–4 GB RAM werkt ook prima.` },
      { q: `Is een IPTV kastje legaal?`, a: `Ja, de hardware (Firestick, Formuler, MAG, Android-box) is gewoon legaal te koop. Belangrijk is dat je een betrouwbaar abonnement met een geldige catalogus gebruikt.` },
      { q: `Wifi of kabel voor mijn IPTV kastje?`, a: `Een bekabelde ethernetverbinding is stabieler dan wifi, vooral bij 4K en tijdens drukke uren. Voor HD is ~16 Mbit/s genoeg, voor 4K ~25 Mbit/s.` },
    ],
  },
  {
    slug: "iptv-dark",
    keyword: `IPTV Dark`,
    title: `IPTV Dark — alternatief & vergelijking | ${BRAND}`,
    description: `Op zoek naar IPTV Dark? Vergelijk het eerlijk met ${BRAND}: 69.000+ zenders, 220.000+ films & series in 4K, 15 dagen geld-terug en 24/7 support.`,
    h1: `IPTV Dark vergelijken met een betrouwbaar alternatief`,
    lead: [
      `Veel mensen zoeken naar "IPTV Dark" of [dark iptv](${SITE}/dark-iptv) als IPTV-abonnement. Voor je kiest, loont het om aanbieders te vergelijken op wat echt telt: een actuele zenderlijst, stabiele servers en een eerlijke garantie. ${BRAND} is zo'n betrouwbaar alternatief.`,
      `## Waarop let je bij een Dark-IPTV-alternatief?`,
      `Kijk naar stabiliteit tijdens de avondpiek, een proefperiode of geld-terug-garantie, de werkelijk beschikbare Nederlandse zenders, beeldkwaliteit tot 4K/8K en app-vrijheid met IPTV Smarters Pro en TiviMate. ${BRAND} biedt 69.000+ zenders, 220.000+ films & series als VOD en 15 dagen geld-terug.`,
      `Vergelijk de pakketten hieronder en beslis zelf. Twijfel je? [Stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is IPTV Dark?`, a: `IPTV Dark is een merknaam die mensen tegenkomen bij het zoeken naar een IPTV-abonnement. Vergelijk altijd op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Is er een betrouwbaar alternatief voor IPTV Dark?`, a: `Ja. ${BRAND} biedt 69.000+ zenders, 220.000+ VOD in tot 4K/8K, werkt met IPTV Smarters Pro en TiviMate en geeft 15 dagen geld-terug-garantie.` },
      { q: `Op welke apparaten werkt het?`, a: `Op Smart TV, Amazon Fire TV Stick, Android-box, MAG en Apple TV via IPTV Smarters Pro, TiviMate of elke Xtream-/M3U-speler.` },
    ],
  },
  {
    slug: "dark-iptv",
    keyword: `Dark IPTV`,
    title: `Dark IPTV — zo kies je een betrouwbaar abonnement | ${BRAND}`,
    description: `Dark IPTV zoeken? Lees waarop je let bij een IPTV-abonnement en waarom ${BRAND} een betrouwbaar alternatief is: 69.000+ zenders, 4K, 15 dagen garantie.`,
    h1: `Dark IPTV: waarop letten bij je keuze`,
    lead: [
      `"Dark IPTV" is een veelgezochte term voor wie een [IPTV-abonnement](${SITE}/iptv-abonnement) wil. Laat je niet leiden door reclame maar door controleerbare criteria — dan voorkom je onbetrouwbare koopjes.`,
      `## Een betrouwbaar IPTV-abonnement herkennen`,
      `Een goede aanbieder valt op door transparante prijzen, een echte en dagelijks onderhouden zenderlijst, een proefperiode of geld-terug-garantie en bereikbare support. ${BRAND} voldoet hieraan met 69.000+ zenders, 220.000+ VOD in 4K en 24/7 hulp via WhatsApp.`,
      `Bekijk de pakketten hieronder of [vraag advies op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Is Dark IPTV betrouwbaar?`, a: `Beoordeel elke aanbieder op dezelfde punten: actuele zenderlijst, stabiliteit tijdens de piek, beeldkwaliteit en een echte geld-terug-garantie in plaats van op de merknaam.` },
      { q: `Wat biedt een goed alternatief?`, a: `${BRAND} biedt 69.000+ live zenders, 220.000+ films & series, tot 4K/8K beeld, app-vrijheid en 15 dagen geld-terug.` },
      { q: `Hoeveel snelheid heb ik nodig?`, a: `Voor HD ongeveer 16 Mbit/s, voor 4K ongeveer 25 Mbit/s. Een bekabelde verbinding streamt het stabielst.` },
    ],
  },
  {
    slug: "hot-iptv",
    keyword: `HOT IPTV`,
    title: `HOT IPTV — alternatief & vergelijking | ${BRAND}`,
    description: `Zoek je HOT IPTV? Vergelijk het met ${BRAND}: 69.000+ zenders, 220.000+ VOD in 4K, werkt met IPTV Smarters Pro & TiviMate, 15 dagen geld-terug.`,
    h1: `HOT IPTV vergelijken met ${BRAND}`,
    lead: [
      `"HOT IPTV" is een van de merknamen die opduiken bij het zoeken naar een IPTV-dienst. Vergelijk voor je kiest op zenderaanbod, stabiliteit en garantie — zo weet je zeker dat je een betrouwbare dienst neemt.`,
      `## Waarom ${BRAND} een sterk alternatief is`,
      `${BRAND} levert 69.000+ live zenders inclusief Nederlandse zenders en sport, 220.000+ films & series als VOD, beeld tot 4K/8K en app-vrijheid met IPTV Smarters Pro en TiviMate op Fire TV, Android, Apple TV en Smart TV — met 15 dagen geld-terug.`,
      `Vergelijk de pakketten of [stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is HOT IPTV?`, a: `Een merknaam die mensen tegenkomen bij het zoeken naar een IPTV-abonnement. Beoordeel aanbieders altijd op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Wat maakt een goed alternatief?`, a: `${BRAND} biedt 69.000+ zenders, 220.000+ VOD in tot 4K/8K, app-vrijheid en 15 dagen geld-terug-garantie.` },
      { q: `Werkt het op mijn tv?`, a: `Ja, op Smart TV, Fire TV Stick, Android-box, MAG en Apple TV via IPTV Smarters Pro, TiviMate of een Xtream-/M3U-speler.` },
    ],
  },
  {
    slug: "hakuna-iptv",
    keyword: `Hakuna IPTV`,
    title: `Hakuna IPTV — alternatief & vergelijking | ${BRAND}`,
    description: `Op zoek naar Hakuna IPTV? Vergelijk eerlijk met ${BRAND}: 69.000+ zenders, 220.000+ films & series in 4K, 15 dagen geld-terug en 24/7 support.`,
    h1: `Hakuna IPTV vergelijken`,
    lead: [
      `Zoek je "Hakuna IPTV" als [IPTV-abonnement](${SITE}/iptv-abonnement)? Vergelijk aanbieders op controleerbare punten in plaats van op reclame. ${BRAND} is een betrouwbaar alternatief met open prijzen.`,
      `## Vergelijken op wat telt`,
      `Let op stabiliteit in de avonduren, een proefperiode of geld-terug-garantie, echt beschikbare Nederlandse zenders, beeld tot 4K/8K en app-vrijheid. ${BRAND} biedt dit alles plus 24/7 support via WhatsApp.`,
      `Kies hieronder je pakket of [vraag advies op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is Hakuna IPTV?`, a: `Een merknaam die opduikt bij het zoeken naar IPTV. Beoordeel elke dienst op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Is er een betrouwbaar alternatief?`, a: `Ja. ${BRAND} biedt 69.000+ zenders, 220.000+ VOD in tot 4K/8K, app-vrijheid en 15 dagen geld-terug.` },
      { q: `Hoe snel is de activatie?`, a: `Meestal binnen enkele minuten na je bestelling ontvang je je inloggegevens voor IPTV Smarters Pro, TiviMate of een andere speler.` },
    ],
  },
  {
    slug: "nero-iptv",
    keyword: `Nero IPTV`,
    title: `Nero IPTV — alternatief & vergelijking | ${BRAND}`,
    description: `Zoek je Nero IPTV? Vergelijk met ${BRAND}: 69.000+ zenders, 220.000+ VOD in 4K, IPTV Smarters Pro & TiviMate, 15 dagen geld-terug-garantie.`,
    h1: `Nero IPTV vergelijken met een betrouwbaar alternatief`,
    lead: [
      `"Nero IPTV" is een merknaam die veel mensen intypen op zoek naar een IPTV-dienst. Vergelijk voor je kiest op zenderaanbod, stabiliteit en garantie.`,
      `## Waarom kiezen voor ${BRAND}?`,
      `${BRAND} biedt 69.000+ live zenders, 220.000+ films & series als VOD, beeld tot 4K/8K, app-vrijheid met IPTV Smarters Pro en TiviMate en 15 dagen geld-terug — met open, transparante prijzen.`,
      `Bekijk de pakketten of [stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is Nero IPTV?`, a: `Een merknaam die mensen tegenkomen bij het zoeken naar IPTV. Vergelijk aanbieders op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Wat biedt ${BRAND} als alternatief?`, a: `69.000+ zenders, 220.000+ VOD in tot 4K/8K, app-vrijheid en 15 dagen geld-terug-garantie.` },
      { q: `Op welke apparaten werkt het?`, a: `Op Smart TV, Fire TV Stick, Android-box, MAG en Apple TV via IPTV Smarters Pro, TiviMate of een Xtream-/M3U-speler.` },
    ],
  },
  {
    slug: "iptv-mate",
    keyword: `IPTV Mate`,
    title: `IPTV Mate — alternatief & vergelijking | ${BRAND}`,
    description: `Op zoek naar IPTV Mate? Vergelijk met ${BRAND}: 69.000+ zenders, 220.000+ films & series in 4K, werkt met IPTV Smarters Pro, 15 dagen geld-terug.`,
    h1: `IPTV Mate vergelijken`,
    lead: [
      `"IPTV Mate" wordt vaak gezocht als IPTV-abonnement of als speler. Vergelijk aanbieders op controleerbare criteria zodat je een betrouwbare dienst kiest.`,
      `## ${BRAND} als betrouwbaar alternatief`,
      `${BRAND} levert 69.000+ zenders, 220.000+ VOD in tot 4K/8K, app-vrijheid met IPTV Smarters Pro en TiviMate en 15 dagen geld-terug. Je login werkt in elke Xtream-Codes- of M3U-speler.`,
      `Kies je pakket hieronder of [vraag het op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is IPTV Mate?`, a: `Een naam die opduikt als IPTV-abonnement of speler. Beoordeel diensten op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Werkt mijn login in meerdere apps?`, a: `Ja. Je ${BRAND}-login werkt in IPTV Smarters Pro, TiviMate en elke Xtream-/M3U-compatibele speler.` },
      { q: `Is er een garantie?`, a: `Ja, 15 dagen geld-terug-garantie en 24/7 support via WhatsApp.` },
    ],
  },
  {
    slug: "amiko-iptv",
    keyword: `Amiko IPTV`,
    title: `Amiko IPTV — alternatief & vergelijking | ${BRAND}`,
    description: `Zoek je Amiko IPTV? Vergelijk met ${BRAND}: 69.000+ zenders, 220.000+ VOD in 4K, IPTV Smarters Pro & TiviMate en 15 dagen geld-terug-garantie.`,
    h1: `Amiko IPTV vergelijken`,
    lead: [
      `"Amiko IPTV" verwijst zowel naar Amiko-ontvangers als naar IPTV-diensten. Zoek je een abonnement, vergelijk dan op zenderaanbod, stabiliteit en garantie.`,
      `## Waarom ${BRAND}?`,
      `${BRAND} biedt 69.000+ live zenders, 220.000+ films & series, beeld tot 4K/8K en werkt op Amiko-, MAG-, Android- en Fire TV-apparaten via IPTV Smarters Pro of TiviMate — met 15 dagen geld-terug.`,
      `Bekijk de pakketten of [stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Werkt het op een Amiko-ontvanger?`, a: `Ja, via een compatibele IPTV-speler (Xtream-Codes/M3U) of een MAG-/Android-opstelling. Een Fire TV Stick is het eenvoudigste alternatief.` },
      { q: `Wat biedt het alternatief?`, a: `${BRAND} biedt 69.000+ zenders, 220.000+ VOD in tot 4K/8K en 15 dagen geld-terug.` },
      { q: `Hoe snel kan ik kijken?`, a: `Na bestelling ontvang je je gegevens meestal binnen enkele minuten.` },
    ],
  },
  {
    slug: "iptv-amiko",
    keyword: `IPTV Amiko`,
    title: `IPTV Amiko — zo stel je het in | ${BRAND}`,
    description: `IPTV op een Amiko-apparaat? Lees hoe je ${BRAND} instelt met Xtream-Codes of M3U, plus een betrouwbaar alternatief met 69.000+ zenders in 4K.`,
    h1: `IPTV Amiko instellen`,
    lead: [
      `Wie "IPTV Amiko" zoekt, wil meestal IPTV kijken op een Amiko-ontvanger of een vergelijkbaar apparaat. Dat kan met een betrouwbaar abonnement en de juiste speler.`,
      `## IPTV instellen op Amiko en alternatieven`,
      `Gebruik je Xtream-Codes-login of M3U-playlist in een compatibele speler. Werkt dat niet vlot, dan is een Amazon Fire TV Stick met IPTV Smarters Pro of TiviMate de makkelijkste route. ${BRAND} werkt met al deze opties en levert 69.000+ zenders en 220.000+ VOD in tot 4K.`,
      `Hulp nodig bij de installatie? [Schrijf ons op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Hoe stel ik IPTV in op Amiko?`, a: `Voer je Xtream-Codes-gegevens of M3U-playlist in de IPTV-speler in. Een Fire TV Stick met IPTV Smarters Pro is het eenvoudigste alternatief.` },
      { q: `Wat als mijn apparaat geen apps ondersteunt?`, a: `Gebruik een MAG-portal of sluit een Fire TV Stick aan op de HDMI-poort van je tv.` },
      { q: `Wat biedt ${BRAND}?`, a: `69.000+ zenders, 220.000+ VOD in tot 4K/8K en 15 dagen geld-terug-garantie.` },
    ],
  },
  {
    slug: "iptv-climb",
    keyword: `IPTV Climb`,
    title: `IPTV Climb — alternatief & vergelijking | ${BRAND}`,
    description: `Op zoek naar IPTV Climb? Vergelijk met ${BRAND}: 69.000+ zenders, 220.000+ films & series in 4K, 15 dagen geld-terug en 24/7 support.`,
    h1: `IPTV Climb vergelijken`,
    lead: [
      `"IPTV Climb" is een merknaam die mensen intypen op zoek naar een IPTV-abonnement. Vergelijk voor je kiest op zenderaanbod, stabiliteit en garantie.`,
      `## ${BRAND} als betrouwbaar alternatief`,
      `${BRAND} biedt 69.000+ zenders, 220.000+ VOD in tot 4K/8K, app-vrijheid met IPTV Smarters Pro en TiviMate en 15 dagen geld-terug-garantie met open prijzen.`,
      `Bekijk de pakketten of [stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is IPTV Climb?`, a: `Een merknaam die opduikt bij het zoeken naar IPTV. Beoordeel diensten op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Wat biedt ${BRAND}?`, a: `69.000+ zenders, 220.000+ VOD in tot 4K/8K, app-vrijheid en 15 dagen geld-terug.` },
      { q: `Werkt het in heel Nederland?`, a: `Ja, op elke stabiele internetverbinding; voor 4K is ongeveer 25 Mbit/s aanbevolen.` },
    ],
  },
  {
    slug: "iptv-pandora",
    keyword: `IPTV Pandora`,
    title: `IPTV Pandora — alternatief & vergelijking | ${BRAND}`,
    description: `Zoek je IPTV Pandora of Pandora IPTV? Vergelijk met ${BRAND}: 69.000+ zenders, 220.000+ VOD in 4K, IPTV Smarters Pro & TiviMate, 15 dagen geld-terug.`,
    h1: `IPTV Pandora vergelijken`,
    lead: [
      `"IPTV Pandora" (of Pandora IPTV) is een veelgezochte merknaam. Vergelijk aanbieders op controleerbare criteria in plaats van op reclame.`,
      `## Waarom ${BRAND}?`,
      `${BRAND} levert 69.000+ live zenders, 220.000+ films & series, beeld tot 4K/8K, app-vrijheid met IPTV Smarters Pro en TiviMate en 15 dagen geld-terug — met transparante prijzen en 24/7 support.`,
      `Bekijk de pakketten of [stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is IPTV Pandora?`, a: `Een merknaam die mensen tegenkomen bij het zoeken naar IPTV. Beoordeel diensten op zenderlijst, stabiliteit, beeldkwaliteit en garantie.` },
      { q: `Wat biedt het alternatief?`, a: `${BRAND} biedt 69.000+ zenders, 220.000+ VOD in tot 4K/8K en 15 dagen geld-terug.` },
      { q: `Op welke apparaten werkt het?`, a: `Op Smart TV, Fire TV Stick, Android-box, MAG en Apple TV via IPTV Smarters Pro, TiviMate of een Xtream-/M3U-speler.` },
    ],
  },
  {
    slug: "net-iptv",
    keyword: `Net IPTV`,
    title: `Net IPTV instellen op Smart TV | ${BRAND}`,
    description: `Net IPTV op je Smart TV? Zo activeer je de app via netiptv.eu met je MAC-adres en M3U-playlist — plus ${BRAND} met 69.000+ zenders in 4K.`,
    h1: `Net IPTV instellen op je Smart TV`,
    lead: [
      `Net IPTV is een populaire speler voor LG (webOS), Samsung, Android TV en Fire TV. Je laadt er je playlist van ${BRAND} in en kijkt direct.`,
      `## Net IPTV activeren`,
      `Installeer Net IPTV uit de appstore van je tv, noteer het MAC-adres dat de app toont, ga naar netiptv.eu/upload en koppel daar je M3U-playlist. Daarna verschijnen de zenders in de app. Werkt de app niet op jouw toestel, sluit dan een Fire TV Stick aan met IPTV Smarters Pro.`,
      `Je ${BRAND}-abonnement geeft 69.000+ zenders en 220.000+ VOD in tot 4K. [Hulp nodig? WhatsApp ons](${WA}).`,
    ],
    faq: [
      { q: `Hoe activeer ik Net IPTV?`, a: `Open de app, noteer het MAC-adres, ga naar netiptv.eu/upload en koppel je M3U-playlist. De zenders verschijnen daarna in de app.` },
      { q: `Op welke tv's werkt Net IPTV?`, a: `Op LG webOS, Samsung Smart TV, Android TV en Fire TV. Is de app niet beschikbaar, gebruik dan een Fire TV Stick met IPTV Smarters Pro.` },
      { q: `Wat heb ik van ${BRAND} nodig?`, a: `Je M3U-playlist of Xtream-Codes-login; die krijg je na je bestelling meestal binnen enkele minuten.` },
    ],
  },
  {
    slug: "set-iptv",
    keyword: `Set IPTV`,
    title: `Set IPTV instellen op Smart TV | ${BRAND}`,
    description: `Set IPTV op je Smart TV activeren? Koppel je M3U-playlist van ${BRAND} via de Set IPTV-site en MAC-adres. 69.000+ zenders en 220.000+ VOD in 4K.`,
    h1: `Set IPTV instellen`,
    lead: [
      `Set IPTV is een veelgebruikte speler voor Samsung- en LG-tv's. Je koppelt je playlist van ${BRAND} en speelt alle zenders direct af.`,
      `## Set IPTV activeren`,
      `Installeer Set IPTV uit de LG Content Store of Samsung Apps, noteer het MAC-adres uit de app en upload je M3U-playlist op de bijbehorende website. Daarna synchroniseren de zenders automatisch. Als de app ontbreekt, is een Fire TV Stick met IPTV Smarters Pro het makkelijkste alternatief.`,
      `${BRAND} levert 69.000+ zenders en 220.000+ VOD in tot 4K. [Vraag hulp op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Hoe werkt Set IPTV?`, a: `Je noteert het MAC-adres uit de app, uploadt je M3U-playlist op de Set IPTV-website en de zenders verschijnen in de app.` },
      { q: `Op welke tv's werkt Set IPTV?`, a: `Vooral op Samsung (Tizen) en LG (webOS). Werkt het niet, gebruik dan een Fire TV Stick met IPTV Smarters Pro.` },
      { q: `Is er een garantie?`, a: `Ja, 15 dagen geld-terug-garantie en 24/7 support via WhatsApp.` },
    ],
  },
  {
    slug: "ss-iptv-abonnement",
    keyword: `abonnement SS IPTV`,
    title: `SS IPTV abonnement instellen | ${BRAND}`,
    description: `SS IPTV met een abonnement gebruiken? Koppel je M3U-playlist van ${BRAND} via setsysteme.com en je MAC-adres. 69.000+ zenders, 220.000+ VOD in 4K.`,
    h1: `SS IPTV abonnement instellen`,
    lead: [
      `SS IPTV is een gratis speler voor Smart TV's; je combineert hem met een betaald [IPTV abonnement](${SITE}/iptv-abonnement) zoals ${BRAND} voor de zenders en VOD.`,
      `## SS IPTV koppelen aan je abonnement`,
      `Installeer SS IPTV uit de LG Content Store of Samsung Apps, open het instellingenmenu en noteer de verbindingscode of het MAC-adres. Ga naar setsysteme.com, voer de code in en koppel je M3U-playlist van ${BRAND}. De zenders laden daarna in de app.`,
      `Zo krijg je met SS IPTV + ${BRAND} toegang tot 69.000+ zenders en 220.000+ VOD in tot 4K. [Hulp nodig? WhatsApp ons](${WA}).`,
    ],
    faq: [
      { q: `Werkt SS IPTV zonder abonnement?`, a: `SS IPTV is alleen de speler; je hebt een IPTV-abonnement nodig voor de zenders en VOD, zoals dat van ${BRAND}.` },
      { q: `Hoe koppel ik mijn abonnement aan SS IPTV?`, a: `Via setsysteme.com voer je de code/MAC uit de app in en koppel je je M3U-playlist. De zenders verschijnen daarna automatisch.` },
      { q: `Op welke tv's werkt SS IPTV?`, a: `Vooral op LG (webOS) en Samsung (Tizen). Als alternatief werkt een Fire TV Stick met IPTV Smarters Pro.` },
    ],
  },
  {
    slug: "beste-iptv-app",
    keyword: `beste IPTV app`,
    title: `Beste IPTV app 2026 — Smarters, TiviMate & meer | ${BRAND}`,
    description: `Wat is de beste IPTV app? Vergelijk IPTV Smarters Pro, TiviMate, Set IPTV en Net IPTV voor Smart TV, Fire TV en Android — werkt met ${BRAND} in 4K.`,
    h1: `De beste IPTV app kiezen`,
    lead: [
      `De [beste IPTV app](${SITE}/beste-iptv-app) hangt af van je apparaat. Je ${BRAND}-login werkt in alle populaire spelers, dus je zit nooit vast aan één app.`,
      `## IPTV Smarters Pro, TiviMate, Set IPTV en Net IPTV`,
      `IPTV Smarters Pro is de allround-favoriet (Fire TV, Android, iOS, Smart TV) met EPG en VOD-interface. TiviMate is geliefd op Fire TV en Android TV om zijn snelle gids en opnamefuncties (Premium). Voor Samsung/LG zonder Android zijn Set IPTV, Net IPTV en SS IPTV geschikte webOS/Tizen-opties. Allemaal werken ze met je Xtream-Codes-login of M3U-playlist.`,
      `Tip: een bekabelde verbinding geeft de stabielste beeldkwaliteit. [Vraag welke app bij jouw tv past](${WA}).`,
    ],
    faq: [
      { q: `Wat is de beste IPTV app?`, a: `Voor Fire TV/Android is IPTV Smarters Pro of TiviMate ideaal; voor Samsung/LG zijn Set IPTV, Net IPTV of SS IPTV geschikt. Alle werken met je Xtream-/M3U-gegevens.` },
      { q: `Is TiviMate gratis?`, a: `TiviMate heeft een gratis versie; functies als opnames en meerdere playlists zitten in TiviMate Premium.` },
      { q: `Werkt elke app met ${BRAND}?`, a: `Ja. Je ${BRAND}-login werkt in IPTV Smarters Pro, TiviMate, Set IPTV, Net IPTV en elke Xtream-/M3U-speler.` },
    ],
  },
  {
    slug: "beste-iptv-provider",
    keyword: `beste IPTV provider`,
    title: `Beste IPTV provider Nederland — vergelijking | ${BRAND}`,
    description: `Wat is de beste IPTV provider in Nederland? Zo herken je een betrouwbare aanbieder: zenderlijst, stabiliteit, geld-terug. ${BRAND}: 69.000+ zenders, 4K.`,
    h1: `De beste IPTV provider herkennen`,
    lead: [
      `De vraag naar de [beste IPTV provider](${SITE}/beste-iptv-provider) beantwoord je niet met reclame maar met controleerbare criteria. Zo kies je een betrouwbare aanbieder.`,
      `## 6 punten om op te letten`,
      `(1) Stabiliteit tijdens de avondpiek — test tijdens een live wedstrijd; (2) een proefperiode of geld-terug-garantie; (3) echt beschikbare Nederlandse zenders (NPO, RTL, SBS, Ziggo Sport, ESPN); (4) beeld tot 4K/8K en buffervrij streamen; (5) app-vrijheid met IPTV Smarters Pro en TiviMate; (6) een herkenbare bedrijfsnaam, transparante prijzen en bereikbare support.`,
      `${BRAND} voldoet aan deze punten met 69.000+ zenders, 220.000+ VOD en 15 dagen geld-terug. [Stel je vraag op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Wat is de beste IPTV provider?`, a: `De provider die tijdens de piek stabiel blijft, Nederlandse zenders echt bevat, transparant afrekent en een geld-terug-garantie biedt. ${BRAND} voldoet hieraan.` },
      { q: `Hoe herken ik een betrouwbare provider?`, a: `Aan transparante prijzen, een herkenbare bedrijfsnaam, een proefperiode/garantie, bereikbare support en stabiele streams tijdens drukke uren.` },
      { q: `Kan ik eerst testen?`, a: `Gebruik een kort pakket of de 15 dagen geld-terug-garantie om de kwaliteit tijdens de avondpiek te beoordelen.` },
    ],
  },
  {
    slug: "iptv-test",
    keyword: `IPTV test`,
    title: `IPTV test — zo beoordeel je een aanbieder | ${BRAND}`,
    description: `IPTV test doen? Zo controleer je stabiliteit, zenderlijst en 4K-kwaliteit voor je kiest. ${BRAND}: 69.000+ zenders, 220.000+ VOD, 15 dagen geld-terug.`,
    h1: `IPTV test: zo beoordeel je de kwaliteit`,
    lead: [
      `Een [IPTV test](${SITE}/iptv-test) laat je in de praktijk zien of een dienst stabiel is en of de zenderlijst klopt. Beoordeel altijd op je eigen netwerk en apparaten.`,
      `## Waarop let je bij een IPTV test?`,
      `Test tijdens de avondpiek (19–23 uur), wanneer servers het drukst zijn. Controleer de breedte van de zenders (NL, sport, nieuws, kids), de VOD-bibliotheek, EPG en catch-up, en de beeldkwaliteit in 4K op je tv. Let ook op de omschakeltijd tussen zenders.`,
      `Bij ${BRAND} beoordeel je dit risicoarm dankzij de 15 dagen geld-terug-garantie. [Vraag naar een test op WhatsApp](${WA}).`,
    ],
    faq: [
      { q: `Hoe test ik een IPTV-dienst?`, a: `Test tijdens de avondpiek op je eigen netwerk, controleer zenderbreedte, VOD, EPG/catch-up en 4K-kwaliteit, en gebruik een geld-terug-garantie om risicoarm te beoordelen.` },
      { q: `Is een gratis IPTV test betrouwbaar?`, a: `Gratis diensten zijn vaak onbetrouwbaar of onveilig. Beoordeel liever een betaald abonnement met geld-terug-garantie.` },
      { q: `Hoeveel snelheid heb ik nodig?`, a: `Voor HD ongeveer 16 Mbit/s, voor 4K ongeveer 25 Mbit/s. Een bekabelde verbinding is het stabielst.` },
    ],
  },
];

// Dedupe by slug (first occurrence wins). On sites whose brand keyword IS one of
// the generic slugs (e.g. iptv-kopen.net → BRAND_SLUG "iptv-kopen"), the brand
// entry above collapses the later generic duplicate into a single strong page,
// so the prerenderer never double-writes a dir or lists a sitemap <loc> twice.
export const KEYWORD_PAGES: KeywordPage[] = RAW_KEYWORD_PAGES.filter(
  (p, i, a) => a.findIndex((x) => x.slug === p.slug) === i
);

export function getKeywordPage(slug: string): KeywordPage | undefined {
  return KEYWORD_PAGES.find((p) => p.slug === slug);
}
