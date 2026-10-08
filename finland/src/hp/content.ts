// HotPlayer — content for the landing page, served at www.hotiptv.be.
// Three languages: Dutch (nl, default), German (de), English (en).

export type HpLang = "nl" | "de" | "en";

export const HP_LANGS: { code: HpLang; label: string }[] = [
  { code: "nl", label: "NL" },
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
];

export const HP_DEFAULT_LANG: HpLang = "nl";

export function isHpLang(s: string): s is HpLang {
  return s === "nl" || s === "de" || s === "en";
}

/** Platforms shown in the "Available in" grid, with their logo images (served from /public). */
export const PLATFORMS: { name: string; img: string }[] = [
  { name: "Samsung Smart TV", img: "/system/samsung.png" },
  { name: "LG webOS", img: "/system/lg.png" },
  { name: "Android TV", img: "/system/android.png" },
  { name: "Fire TV Stick", img: "/system/firestick.png" },
  { name: "VIDAA", img: "/system/vidaa.png" },
  { name: "Roku", img: "/system/roku.png" },
  { name: "Microsoft Store", img: "/system/microsoft.png" },
  { name: "App Store", img: "/system/app-store.png" },
  { name: "Whale TV", img: "/system/whaletv.png" },
  { name: "Titan OS", img: "/system/titanos.png" },
];

export interface HpContent {
  nav: {
    reseller: string;
    contact: string;
    home: string;
    upload: string;
    activation: string;
    features: string;
    pricing: string;
    faq: string;
    blog: string;
    terms: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    brand: string;
    intro: string;
    storeNote: string;
    note: string;
  };
  platforms: {
    heading: string;
  };
  disclaimer: {
    heading: string;
    p1: string;
    p2: string;
    bullets: string[];
  };
  features: {
    heading: string;
    sub: string;
    items: { title: string; desc: string }[];
  };
  trial: {
    heading: string;
    sub: string;
  };
  stats: { value: string; label: string }[];
  characteristics: {
    heading: string;
    sub: string;
  };
  pricing: {
    heading: string;
    sub: string;
    popular: string;
    deviceOne: string;
    deviceTwo: string;
    monthWord: string;
    monthsWord: string;
    freeWord: string;
    deviceWord: string;
    devicesWord: string;
    moreWord: string;
    perMonth: string;
    cta: string;
    waIntro: string;
    trust: { title: string; desc: string }[];
  };
  reseller: {
    heading: string;
    sub: string;
    cta: string;
  };
  faq: {
    heading: string;
    items: { q: string; a: string }[];
  };
  footer: {
    copyright: string;
    terms: string;
    privacy: string;
  };
  seo: {
    metaDescription: string;
    heading: string;
    body: string[];
  };
}

export const HP_CONTENT: Record<HpLang, HpContent> = {
  en: {
    nav: {
      reseller: "Reseller",
      contact: "Contact-Us",
      home: "Home",
      upload: "Upload List",
      activation: "Activation",
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      blog: "Blog",
      terms: "Terms",
    },
    hero: {
      eyebrow: "MEDIA PLAYER, NO CHANNELS INCLUDED",
      titleLead: "Your best Media Player",
      brand: "HotPlayer",
      intro:
        "Experience the ultimate entertainment with HotPlayer, your go-to Hot IPTV player for enjoying playlists and watching your favorite content. Step into the forefront of media player innovation with HotPlayer, a leader in entertainment solutions.",
      storeNote:
        "Download HotPlayer now from the Roku Store, LG TV Store, Samsung TV Store, and Google Play Store, and dive into a new era of entertainment!",
      note:
        "No channels are included in the application. HotPlayer app is not responsible for the content uploaded to it.",
    },
    platforms: { heading: "AVAILABLE IN" },
    disclaimer: {
      heading: "DISCLAIMER",
      p1:
        "We have identified unauthorized websites replicating our platform and unlawfully using our name and content to market IPTV subscriptions and packages. These sites are not affiliated with us, and we do not endorse or recognize any transactions made through them.",
      p2:
        "Our company operates solely as a media player application. We do not provide or sell IPTV subscriptions, channels, or content of any kind.",
      bullets: [
        "HotPlayer does not provide or solicit any audiovisual content to the users.",
        "HotPlayer maintains absolutely no connections with any third-party providers.",
        "Users are required to supply their own content.",
        "We do not engage in the sale of IPTV subscriptions or Channel Packages.",
      ],
    },
    features: {
      heading: "Features",
      sub: "The latest version of HotPlayer comes with a lot of stunning features :",
      items: [
        { title: "Simple interface", desc: "An easy and intuitive interface for the user." },
        { title: "Favorite list", desc: "Create a favorite list where you can save your preferred Channels." },
        { title: "Navigate", desc: "Switch between channels by their numbers using your remote." },
        { title: "Search", desc: "Search for your channel/movie/series by a keyword." },
        { title: "Sort channels", desc: "Sort your Channels alphabetically A-Z / Z-A." },
        { title: "Parental Controls", desc: "Lock / Hide content with PIN." },
        { title: "Multi List", desc: "You can upload up to 3 Lists and switch between them." },
        { title: "Lock Mac", desc: "Avoid your playlist being reset by somebody else." },
      ],
    },
    trial: { heading: "Ready to dive in?", sub: "Start your free 30 day trial today." },
    stats: [
      { value: "69,000+", label: "Live channels" },
      { value: "220,000+", label: "Movies & series" },
      { value: "8K·4K·UHD", label: "Streaming quality" },
      { value: "99.9%", label: "Server uptime" },
    ],
    characteristics: {
      heading: "Everything included in every plan",
      sub: "Each HotPlayer activation unlocks the full premium experience — no hidden extras.",
    },
    pricing: {
      heading: "Pricing plans",
      sub: "One-time activation per period. No contracts, no auto-renewal.",
      popular: "MOST POPULAR",
      deviceOne: "1 Device",
      deviceTwo: "2 Devices",
      monthWord: "month",
      monthsWord: "months",
      freeWord: "FREE",
      deviceWord: "device",
      devicesWord: "devices",
      moreWord: "more",
      perMonth: "/ month",
      cta: "Order via WhatsApp",
      waIntro: "Hello, I would like to order the HotPlayer plan",
      trust: [
        { title: "100% Money-Back", desc: "Full refund within 15 days, no questions asked." },
        { title: "Instant Activation", desc: "Credentials delivered in minutes via WhatsApp." },
        { title: "WhatsApp Support", desc: "24/7 direct support — we reply fast." },
      ],
    },
    reseller: {
      heading: "Do you want to become a Reseller ?",
      sub: "Discover our packs with exceptional discounts !",
      cta: "Discover our packs",
    },
    faq: {
      heading: "Frequently asked questions",
      items: [
        {
          q: "Where can I download HotPlayer from ?",
          a: "Our application is available to download on Samsung Tizen TV store and Play Store.",
        },
        {
          q: "Does HotPlayer contain channels and from where can I get a playlist ?",
          a: "No, HotPlayer is a pure MEDIA PLAYER where you can run your Playlist. In that way, we provide a player with no content of channels. In addition, application developers are not responsible for the content uploaded to HotPlayer.",
        },
        {
          q: "Is the app fee paid monthly ?",
          a: "HotPlayer can be activated after a one-time fee of 162 MAD (~14.99 EUR) for each TV/device, or 65 MAD (~5.99 EUR) for 1 year. You don't need to pay any future fee as we mentioned on our website.",
        },
        {
          q: "How can i Lock my TV's MAC address ?",
          a: "You can lock your MAC address in application settings by using the Lock MAC button to avoid your playlist being reset by somebody else or if you shared your MAC address with some third party.",
        },
        {
          q: "What happens if I upload a wrong M3U List / LINK ?",
          a: "If you download a non-working list, the app will warn you by a message that will appear on your TV.",
        },
      ],
    },
    footer: {
      copyright: "© 2021 / 2026 HotPlayer. Developed and published by STE DIGI VIBES. All rights reserved.",
      terms: "Terms of online sale",
      privacy: "Privacy policy",
    },
    seo: {
      metaDescription:
        "HotPlayer is the best Hot IPTV media player for Smart TV, Firestick, Roku & Android. Play your own M3U playlists or Xtream Codes in up to 8K. Activate now.",
      heading: "Why HotPlayer is the best Hot IPTV player",
      body: [
        "HotPlayer is a Hot IPTV media player built for Smart TV, Firestick, Android TV, Roku, Samsung and LG. It plays your own M3U playlists and Xtream Codes — no channels are included with the app.",
        "As a lightweight Hot IPTV player, HotPlayer gives you a fast, simple interface with favorites, search, parental controls, multi-list support and MAC lock, so your playlist streams smoothly in up to 8K on any screen.",
        "Activate HotPlayer once and turn any device into a premium Hot IPTV player — upload your list, press play, and enjoy your media across Europe.",
      ],
    },
  },

  nl: {
    nav: {
      reseller: "Reseller",
      contact: "Contact",
      home: "Home",
      upload: "Lijst uploaden",
      activation: "Activatie",
      features: "Functies",
      pricing: "Prijzen",
      faq: "FAQ",
      blog: "Blog",
      terms: "Voorwaarden",
    },
    hero: {
      eyebrow: "MEDIASPELER, GEEN ZENDERS INBEGREPEN",
      titleLead: "Jouw beste mediaspeler",
      brand: "HotPlayer",
      intro:
        "Beleef ultiem entertainment met HotPlayer, jouw favoriete Hot IPTV speler om afspeellijsten te spelen en je favoriete content te bekijken. Stap in de voorhoede van mediaspeler-innovatie met HotPlayer, een leider in entertainmentoplossingen.",
      storeNote:
        "Download HotPlayer nu uit de Roku Store, LG TV Store, Samsung TV Store en Google Play Store en duik in een nieuw tijdperk van entertainment!",
      note:
        "Er zijn geen zenders inbegrepen in de applicatie. De HotPlayer-app is niet verantwoordelijk voor de content die wordt geüpload.",
    },
    platforms: { heading: "BESCHIKBAAR OP" },
    disclaimer: {
      heading: "DISCLAIMER",
      p1:
        "Wij hebben niet-geautoriseerde websites geïdentificeerd die ons platform nabootsen en onrechtmatig onze naam en content gebruiken om IPTV-abonnementen en -pakketten te verkopen. Deze sites zijn niet aan ons gelieerd en wij onderschrijven of erkennen geen enkele transactie die via hen wordt gedaan.",
      p2:
        "Ons bedrijf opereert uitsluitend als een mediaspeler-applicatie. Wij leveren of verkopen geen IPTV-abonnementen, zenders of content van welke aard dan ook.",
      bullets: [
        "HotPlayer levert of werft geen audiovisuele content aan gebruikers.",
        "HotPlayer onderhoudt absoluut geen verbindingen met externe aanbieders.",
        "Gebruikers moeten zelf hun eigen content aanleveren.",
        "Wij houden ons niet bezig met de verkoop van IPTV-abonnementen of zenderpakketten.",
      ],
    },
    features: {
      heading: "Functies",
      sub: "De nieuwste versie van HotPlayer zit boordevol verbluffende functies:",
      items: [
        { title: "Eenvoudige interface", desc: "Een makkelijke en intuïtieve interface voor de gebruiker." },
        { title: "Favorietenlijst", desc: "Maak een favorietenlijst om je voorkeurskanalen op te slaan." },
        { title: "Navigeren", desc: "Wissel van kanaal op nummer met je afstandsbediening." },
        { title: "Zoeken", desc: "Zoek je kanaal/film/serie op met een trefwoord." },
        { title: "Kanalen sorteren", desc: "Sorteer je kanalen alfabetisch A-Z / Z-A." },
        { title: "Ouderlijk toezicht", desc: "Vergrendel / verberg content met een pincode." },
        { title: "Multi-lijst", desc: "Je kunt tot 3 lijsten uploaden en ertussen wisselen." },
        { title: "MAC vergrendelen", desc: "Voorkom dat je afspeellijst door iemand anders wordt gereset." },
      ],
    },
    trial: { heading: "Klaar om te beginnen?", sub: "Start vandaag nog je gratis proefperiode van 30 dagen." },
    stats: [
      { value: "69.000+", label: "Live zenders" },
      { value: "220.000+", label: "Films & series" },
      { value: "8K·4K·UHD", label: "Streamingkwaliteit" },
      { value: "99,9%", label: "Server-uptime" },
    ],
    characteristics: {
      heading: "Alles inbegrepen in elk pakket",
      sub: "Elke HotPlayer-activering ontgrendelt de volledige premium-ervaring — geen verborgen extra's.",
    },
    pricing: {
      heading: "Prijsplannen",
      sub: "Eenmalige activering per periode. Geen contracten, geen automatische verlenging.",
      popular: "MEEST GEKOZEN",
      deviceOne: "1 apparaat",
      deviceTwo: "2 apparaten",
      monthWord: "maand",
      monthsWord: "maanden",
      freeWord: "GRATIS",
      deviceWord: "apparaat",
      devicesWord: "apparaten",
      moreWord: "meer",
      perMonth: "/ maand",
      cta: "Bestel via WhatsApp",
      waIntro: "Hallo, ik wil graag het HotPlayer-pakket bestellen",
      trust: [
        { title: "100% terugbetaling", desc: "Volledige terugbetaling binnen 15 dagen." },
        { title: "Directe activering", desc: "Inloggegevens binnen enkele minuten via WhatsApp." },
        { title: "WhatsApp-support", desc: "24/7 directe ondersteuning — we reageren snel." },
      ],
    },
    reseller: {
      heading: "Wil je reseller worden ?",
      sub: "Ontdek onze pakketten met uitzonderlijke kortingen !",
      cta: "Ontdek onze pakketten",
    },
    faq: {
      heading: "Veelgestelde vragen",
      items: [
        {
          q: "Waar kan ik HotPlayer downloaden ?",
          a: "Onze applicatie is te downloaden in de Samsung Tizen TV-store en de Play Store.",
        },
        {
          q: "Bevat HotPlayer zenders en waar krijg ik een afspeellijst ?",
          a: "Nee, HotPlayer is een pure MEDIASPELER waarmee je je afspeellijst kunt afspelen. Zo bieden we een speler zonder zenderinhoud. Bovendien zijn de ontwikkelaars niet verantwoordelijk voor de content die naar HotPlayer wordt geüpload.",
        },
        {
          q: "Wordt de app maandelijks betaald ?",
          a: "HotPlayer kan geactiveerd worden na een eenmalige betaling van 162 MAD (~14,99 EUR) per tv/apparaat, of 65 MAD (~5,99 EUR) voor 1 jaar. Je hoeft geen toekomstige kosten te betalen, zoals vermeld op onze website.",
        },
        {
          q: "Hoe vergrendel ik het MAC-adres van mijn tv ?",
          a: "Je kunt je MAC-adres vergrendelen in de app-instellingen met de knop Lock MAC, zodat je afspeellijst niet door iemand anders wordt gereset of als je je MAC-adres met een derde partij hebt gedeeld.",
        },
        {
          q: "Wat gebeurt er als ik een verkeerde M3U-lijst / LINK upload ?",
          a: "Als je een niet-werkende lijst downloadt, waarschuwt de app je met een melding die op je tv verschijnt.",
        },
      ],
    },
    footer: {
      copyright: "© 2021 / 2026 HotPlayer. Ontwikkeld en uitgegeven door STE DIGI VIBES. Alle rechten voorbehouden.",
      terms: "Algemene verkoopvoorwaarden",
      privacy: "Privacybeleid",
    },
    seo: {
      metaDescription:
        "HotPlayer is de beste Hot IPTV mediaspeler voor smart-tv, Firestick & Android. Speel je eigen M3U-afspeellijsten of Xtream Codes af in tot wel 8K. Nu activeren.",
      heading: "Waarom HotPlayer de beste Hot IPTV speler is",
      body: [
        "HotPlayer is een Hot IPTV mediaspeler voor smart-tv, Firestick, Android TV, Roku, Samsung en LG. De app speelt je eigen M3U-afspeellijsten en Xtream Codes af — er zijn geen zenders inbegrepen.",
        "Als lichte Hot IPTV speler biedt HotPlayer een snelle, eenvoudige interface met favorieten, zoeken, ouderlijk toezicht, multi-lijst en MAC-vergrendeling, zodat je afspeellijst vloeiend in tot wel 8K op elk scherm speelt.",
        "Activeer HotPlayer één keer en maak van elk apparaat een premium Hot IPTV speler — upload je lijst, druk op play en geniet van je media in heel Europa.",
      ],
    },
  },

  de: {
    nav: {
      reseller: "Reseller",
      contact: "Kontakt",
      home: "Home",
      upload: "Liste hochladen",
      activation: "Aktivierung",
      features: "Funktionen",
      pricing: "Preise",
      faq: "FAQ",
      blog: "Blog",
      terms: "AGB",
    },
    hero: {
      eyebrow: "MEDIAPLAYER, KEINE SENDER ENTHALTEN",
      titleLead: "Dein bester Mediaplayer",
      brand: "HotPlayer",
      intro:
        "Erlebe ultimative Unterhaltung mit HotPlayer, deinem Hot IPTV Player der Wahl, um Playlists abzuspielen und deine Lieblingsinhalte anzusehen. Steige ein in die Spitze der Mediaplayer-Innovation mit HotPlayer, einem führenden Anbieter von Entertainment-Lösungen.",
      storeNote:
        "Lade HotPlayer jetzt aus dem Roku Store, LG TV Store, Samsung TV Store und Google Play Store und tauche ein in eine neue Ära der Unterhaltung!",
      note:
        "In der Anwendung sind keine Sender enthalten. Die HotPlayer-App ist nicht verantwortlich für die hochgeladenen Inhalte.",
    },
    platforms: { heading: "VERFÜGBAR AUF" },
    disclaimer: {
      heading: "DISCLAIMER",
      p1:
        "Wir haben nicht autorisierte Websites identifiziert, die unsere Plattform nachahmen und unseren Namen und unsere Inhalte unrechtmäßig nutzen, um IPTV-Abonnements und -Pakete zu vermarkten. Diese Seiten sind nicht mit uns verbunden, und wir befürworten oder anerkennen keine über sie getätigten Transaktionen.",
      p2:
        "Unser Unternehmen agiert ausschließlich als Mediaplayer-Anwendung. Wir stellen keine IPTV-Abonnements, Sender oder Inhalte jeglicher Art bereit oder verkaufen sie.",
      bullets: [
        "HotPlayer stellt den Nutzern keine audiovisuellen Inhalte bereit oder wirbt für solche.",
        "HotPlayer unterhält absolut keine Verbindungen zu Drittanbietern.",
        "Nutzer müssen ihre eigenen Inhalte selbst bereitstellen.",
        "Wir beteiligen uns nicht am Verkauf von IPTV-Abonnements oder Sender-Paketen.",
      ],
    },
    features: {
      heading: "Funktionen",
      sub: "Die neueste Version von HotPlayer bietet eine Vielzahl beeindruckender Funktionen:",
      items: [
        { title: "Einfache Oberfläche", desc: "Eine einfache und intuitive Oberfläche für den Nutzer." },
        { title: "Favoritenliste", desc: "Erstelle eine Favoritenliste, um deine bevorzugten Kanäle zu speichern." },
        { title: "Navigieren", desc: "Wechsle Kanäle per Nummer mit deiner Fernbedienung." },
        { title: "Suche", desc: "Suche deinen Kanal/Film/deine Serie per Stichwort." },
        { title: "Kanäle sortieren", desc: "Sortiere deine Kanäle alphabetisch A-Z / Z-A." },
        { title: "Kindersicherung", desc: "Sperre / verstecke Inhalte mit einer PIN." },
        { title: "Multi-Liste", desc: "Du kannst bis zu 3 Listen hochladen und zwischen ihnen wechseln." },
        { title: "MAC sperren", desc: "Verhindere, dass deine Playlist von jemand anderem zurückgesetzt wird." },
      ],
    },
    trial: { heading: "Bereit loszulegen?", sub: "Starte noch heute deine kostenlose 30-Tage-Testphase." },
    stats: [
      { value: "69.000+", label: "Live-Sender" },
      { value: "220.000+", label: "Filme & Serien" },
      { value: "8K·4K·UHD", label: "Streaming-Qualität" },
      { value: "99,9%", label: "Server-Verfügbarkeit" },
    ],
    characteristics: {
      heading: "In jedem Paket enthalten",
      sub: "Jede HotPlayer-Aktivierung schaltet das volle Premium-Erlebnis frei — ohne versteckte Extras.",
    },
    pricing: {
      heading: "Preispläne",
      sub: "Einmalige Aktivierung pro Zeitraum. Keine Verträge, keine automatische Verlängerung.",
      popular: "AM BELIEBTESTEN",
      deviceOne: "1 Gerät",
      deviceTwo: "2 Geräte",
      monthWord: "Monat",
      monthsWord: "Monate",
      freeWord: "GRATIS",
      deviceWord: "Gerät",
      devicesWord: "Geräte",
      moreWord: "mehr",
      perMonth: "/ Monat",
      cta: "Per WhatsApp bestellen",
      waIntro: "Hallo, ich möchte den HotPlayer-Plan bestellen",
      trust: [
        { title: "100% Geld-zurück", desc: "Volle Rückerstattung innerhalb von 15 Tagen." },
        { title: "Sofortige Aktivierung", desc: "Zugangsdaten in Minuten via WhatsApp." },
        { title: "WhatsApp-Support", desc: "24/7 Direktsupport — wir antworten schnell." },
      ],
    },
    reseller: {
      heading: "Möchtest du Reseller werden ?",
      sub: "Entdecke unsere Pakete mit außergewöhnlichen Rabatten !",
      cta: "Entdecke unsere Pakete",
    },
    faq: {
      heading: "Häufig gestellte Fragen",
      items: [
        {
          q: "Wo kann ich HotPlayer herunterladen ?",
          a: "Unsere Anwendung ist im Samsung Tizen TV-Store und im Play Store zum Download verfügbar.",
        },
        {
          q: "Enthält HotPlayer Sender und wo bekomme ich eine Playlist ?",
          a: "Nein, HotPlayer ist ein reiner MEDIAPLAYER, mit dem du deine Playlist abspielen kannst. So bieten wir einen Player ohne Senderinhalte. Zudem sind die App-Entwickler nicht verantwortlich für die zu HotPlayer hochgeladenen Inhalte.",
        },
        {
          q: "Wird die App monatlich bezahlt ?",
          a: "HotPlayer kann nach einer einmaligen Gebühr von 162 MAD (~14,99 EUR) pro TV/Gerät oder 65 MAD (~5,99 EUR) für 1 Jahr aktiviert werden. Du musst keine zukünftigen Gebühren zahlen, wie auf unserer Website erwähnt.",
        },
        {
          q: "Wie sperre ich die MAC-Adresse meines TVs ?",
          a: "Du kannst deine MAC-Adresse in den App-Einstellungen über die Schaltfläche Lock MAC sperren, damit deine Playlist nicht von jemand anderem zurückgesetzt wird oder falls du deine MAC-Adresse mit einem Dritten geteilt hast.",
        },
        {
          q: "Was passiert, wenn ich eine falsche M3U-Liste / einen falschen LINK hochlade ?",
          a: "Wenn du eine nicht funktionierende Liste herunterlädst, warnt dich die App mit einer Meldung, die auf deinem TV erscheint.",
        },
      ],
    },
    footer: {
      copyright: "© 2021 / 2026 HotPlayer. Entwickelt und veröffentlicht von STE DIGI VIBES. Alle Rechte vorbehalten.",
      terms: "Allgemeine Verkaufsbedingungen",
      privacy: "Datenschutzerklärung",
    },
    seo: {
      metaDescription:
        "HotPlayer ist der beste Hot IPTV Mediaplayer für Smart-TV, Firestick & Android. Spiele deine eigenen M3U-Playlists oder Xtream Codes in bis zu 8K. Jetzt aktivieren.",
      heading: "Warum HotPlayer der beste Hot IPTV Player ist",
      body: [
        "HotPlayer ist ein Hot IPTV Mediaplayer für Smart-TV, Firestick, Android TV, Roku, Samsung und LG. Die App spielt deine eigenen M3U-Playlists und Xtream Codes ab — es sind keine Sender enthalten.",
        "Als schlanker Hot IPTV Player bietet HotPlayer eine schnelle, einfache Oberfläche mit Favoriten, Suche, Kindersicherung, Multi-Liste und MAC-Sperre, damit deine Playlist flüssig in bis zu 8K auf jedem Bildschirm läuft.",
        "Aktiviere HotPlayer einmal und mache aus jedem Gerät einen Premium Hot IPTV Player — lade deine Liste hoch, drücke Play und genieße deine Medien in ganz Europa.",
      ],
    },
  },
};
