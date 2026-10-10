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
