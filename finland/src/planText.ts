import { LangCode } from "./i18n";
import { UiLang } from "./i18nExtra";
import { PricingPlan } from "./types";

/**
 * Plan copy. `SUBSCRIPTION_PLANS` in types.ts keeps the numbers (price, months,
 * devices); every word on a pricing card comes from here so the cards follow the
 * language switcher instead of staying Dutch.
 */
export interface PlanText {
  /** The 19 lines every plan shows, in order. */
  common: string[];
  tryOut: string;
  twoDevices: string;
  bestSeller: string;
  freeDeal: (free: number, total: number) => string;
  savings: { test: string; trial: string; best: string; weekdeal: string };
}

const PLAN_TEXT: Record<UiLang, PlanText> = {
  nl: {
    common: [
      '69.000+ live zenders',
      '220.000+ films & series',
      'Alle Duitse content',
      'Netflix · HBO · Disney+ & meer',
      '8K | 4K | UHD kwaliteit',
      'Anti-freeze technologie',
      'Snelle & stabiele servers',
      'Premium films, series & live tv',
      'PPV / EPG beschikbaar',
      'Geavanceerd kinderslot',
      'Klantenservice met voorrang',
      'Wereldwijde toegang (geen IP-lock)',
      'Permanente updates',
      "Catch-up tv — gemiste programma's terugkijken",
      '99,9% server-uptime',
      'VPN inbegrepen — geen geoblokkades',
      '15 dagen terugbetalingsgarantie (zie voorwaarden)',
      'Vloeiend 8K-ready afspelen op elk apparaat',
      'Time-Shift — live uitzendingen terugspoelen',
    ],
    tryOut: 'Ideaal om onze service te testen!',
    twoDevices: '2 Gelijktijdige verbindingen',
    bestSeller: 'Best verkocht — de favoriet van Duitsland!',
    freeDeal: (free, total) => `+ ${free} MAANDEN GRATIS = ${total} maanden totaal — weekaanbieding!`,
    savings: { test: 'Om te testen', trial: 'Proefpakket', best: 'Beste prijs', weekdeal: 'WEEKDEAL' },
  },
  en: {
    common: [
      '69,000+ live channels',
      '220,000+ movies & series',
      'All German content',
      'Netflix · HBO · Disney+ & more',
      '8K | 4K | UHD quality',
      'Anti-freeze technology',
      'Fast & stable servers',
      'Premium movies, series & live TV',
      'PPV / EPG available',
      'Advanced parental controls',
      'Priority customer support',
      'Worldwide access (no IP lock)',
      'Permanent updates',
      'Catch-up TV — rewatch what you missed',
      '99.9% server uptime',
      'VPN included — no geo-blocking',
      '15-day money-back guarantee (see terms)',
      'Smooth 8K-ready playback on any device',
      'Time-Shift — rewind live broadcasts',
    ],
    tryOut: 'Perfect for trying our service out!',
    twoDevices: '2 simultaneous connections',
    bestSeller: 'Best seller — the favourite in Germany!',
    freeDeal: (free, total) => `+ ${free} MONTHS FREE = ${total} months in total — weekly deal!`,
    savings: { test: 'For testing', trial: 'Trial pack', best: 'Best price', weekdeal: 'WEEKLY DEAL' },
  },
  fr: {
    common: [
      '69 000+ chaînes en direct',
      '220 000+ films & séries',
      'Tout le contenu allemand',
      'Netflix · HBO · Disney+ & plus',
      'Qualité 8K | 4K | UHD',
      'Technologie anti-freeze',
      'Serveurs rapides & stables',
      'Films, séries & TV en direct premium',
      'PPV / EPG disponibles',
      'Contrôle parental avancé',
      'Support client prioritaire',
      'Accès mondial (sans verrouillage IP)',
      'Mises à jour permanentes',
      'Replay — revoir ce que vous avez manqué',
      'Disponibilité serveur de 99,9 %',
      'VPN inclus — aucun blocage géographique',
      'Garantie de remboursement de 15 jours (voir conditions)',
      'Lecture fluide compatible 8K sur tous les appareils',
      'Time-Shift — revenir en arrière sur le direct',
    ],
    tryOut: 'Idéal pour tester notre service !',
    twoDevices: '2 connexions simultanées',
    bestSeller: "Best-seller — le préféré d'Allemagne !",
    freeDeal: (free, total) => `+ ${free} MOIS OFFERTS = ${total} mois au total — offre de la semaine !`,
    savings: { test: 'Pour tester', trial: "Pack d'essai", best: 'Meilleur prix', weekdeal: 'OFFRE SEMAINE' },
  },
  de: {
    common: [
      '69.000+ Live-Sender',
      '220.000+ Filme & Serien',
      'Alle deutschen Inhalte',
      'Netflix · HBO · Disney+ & mehr',
      '8K | 4K | UHD Qualität',
      'Anti-Freeze-Technologie',
      'Schnelle & stabile Server',
      'Premium-Filme, Serien & Live-TV',
      'PPV / EPG verfügbar',
      'Erweiterte Kindersicherung',
      'Kundenservice mit Vorrang',
      'Weltweiter Zugriff (kein IP-Lock)',
      'Permanente Updates',
      'Catch-up-TV — Verpasstes nachholen',
      '99,9 % Server-Verfügbarkeit',
      'VPN inklusive — keine Geoblockaden',
      '15 Tage Geld-zurück-Garantie (siehe AGB)',
      'Flüssige 8K-fähige Wiedergabe auf jedem Gerät',
      'Time-Shift — Live-Sendungen zurückspulen',
    ],
    tryOut: 'Ideal, um unseren Dienst zu testen!',
    twoDevices: '2 gleichzeitige Verbindungen',
    bestSeller: 'Bestseller — der Favorit in Deutschland!',
    freeDeal: (free, total) => `+ ${free} MONATE GRATIS = ${total} Monate insgesamt — Wochenangebot!`,
    savings: { test: 'Zum Testen', trial: 'Testpaket', best: 'Bester Preis', weekdeal: 'WOCHENDEAL' },
  },
  es: {
    common: [
      '69.000+ canales en directo',
      '220.000+ películas y series',
      'Todo el contenido alemán',
      'Netflix · HBO · Disney+ y más',
      'Calidad 8K | 4K | UHD',
      'Tecnología anticongelación',
      'Servidores rápidos y estables',
      'Películas, series y TV en directo premium',
      'PPV / EPG disponibles',
      'Control parental avanzado',
      'Atención al cliente prioritaria',
      'Acceso mundial (sin bloqueo de IP)',
      'Actualizaciones permanentes',
      'Catch-up TV: vuelve a ver lo que te perdiste',
      '99,9 % de disponibilidad del servidor',
      'VPN incluida: sin bloqueos geográficos',
      'Garantía de devolución de 15 días (ver condiciones)',
      'Reproducción fluida lista para 8K en cualquier dispositivo',
      'Time-Shift: rebobina las emisiones en directo',
    ],
    tryOut: '¡Ideal para probar nuestro servicio!',
    twoDevices: '2 conexiones simultáneas',
    bestSeller: '¡El más vendido, el favorito de Alemania!',
    freeDeal: (free, total) => `+ ${free} MESES GRATIS = ${total} meses en total — ¡oferta de la semana!`,
    savings: { test: 'Para probar', trial: 'Pack de prueba', best: 'Mejor precio', weekdeal: 'OFERTA SEMANAL' },
  },
  sv: {
    common: [
      '69 000+ livekanaler',
      '220 000+ filmer & serier',
      'Allt tyskt innehåll',
      'Netflix · HBO · Disney+ & mer',
      '8K | 4K | UHD-kvalitet',
      'Anti-freeze-teknik',
      'Snabba & stabila servrar',
      'Premiumfilmer, serier & live-TV',
      'PPV / EPG tillgängligt',
      'Avancerat barnlås',
      'Prioriterad kundtjänst',
      'Global åtkomst (ingen IP-låsning)',
      'Permanenta uppdateringar',
      'Catch-up-TV — se om det du missat',
      '99,9 % serverdrifttid',
      'VPN ingår — inga geoblockeringar',
      '15 dagars pengarna-tillbaka-garanti (se villkor)',
      'Mjuk 8K-redo uppspelning på alla enheter',
      'Time-Shift — spola tillbaka livesändningar',
    ],
    tryOut: 'Perfekt för att testa vår tjänst!',
    twoDevices: '2 samtidiga anslutningar',
    bestSeller: 'Mest såld — favoriten i Tyskland!',
    freeDeal: (free, total) => `+ ${free} MÅNADER GRATIS = ${total} månader totalt — veckans erbjudande!`,
    savings: { test: 'För att testa', trial: 'Testpaket', best: 'Bästa priset', weekdeal: 'VECKANS DEAL' },
  },
  no: {
    common: [
      '69 000+ direktekanaler',
      '220 000+ filmer & serier',
      'Alt tysk innhold',
      'Netflix · HBO · Disney+ & mer',
      '8K | 4K | UHD-kvalitet',
      'Anti-freeze-teknologi',
      'Raske & stabile servere',
      'Premiumfilmer, serier & direkte-TV',
      'PPV / EPG tilgjengelig',
      'Avansert barnesikring',
      'Prioritert kundeservice',
      'Global tilgang (ingen IP-lås)',
      'Permanente oppdateringer',
      'Catch-up-TV — se det du gikk glipp av',
      '99,9 % serveroppetid',
      'VPN inkludert — ingen geoblokkering',
      '15 dagers pengene-tilbake-garanti (se vilkår)',
      'Jevn 8K-klar avspilling på alle enheter',
      'Time-Shift — spol tilbake direktesendinger',
    ],
    tryOut: 'Perfekt for å teste tjenesten vår!',
    twoDevices: '2 samtidige tilkoblinger',
    bestSeller: 'Mest solgt — favoritten i Tyskland!',
    freeDeal: (free, total) => `+ ${free} MÅNEDER GRATIS = ${total} måneder totalt — ukens tilbud!`,
    savings: { test: 'For å teste', trial: 'Testpakke', best: 'Beste pris', weekdeal: 'UKENS DEAL' },
  },
  da: {
    common: [
      '69.000+ livekanaler',
      '220.000+ film & serier',
      'Alt tysk indhold',
      'Netflix · HBO · Disney+ & mere',
      '8K | 4K | UHD-kvalitet',
      'Anti-freeze-teknologi',
      'Hurtige & stabile servere',
      'Premiumfilm, serier & live-TV',
      'PPV / EPG tilgængeligt',
      'Avanceret børnesikring',
      'Prioriteret kundeservice',
      'Global adgang (ingen IP-lås)',
      'Permanente opdateringer',
      'Catch-up-TV — se det, du gik glip af',
      '99,9 % serveroppetid',
      'VPN inkluderet — ingen geoblokering',
      '15 dages pengene-tilbage-garanti (se vilkår)',
      'Jævn 8K-klar afspilning på alle enheder',
      'Time-Shift — spol live-udsendelser tilbage',
    ],
    tryOut: 'Perfekt til at teste vores tjeneste!',
    twoDevices: '2 samtidige forbindelser',
    bestSeller: 'Mest solgte — favoritten i Tyskland!',
    freeDeal: (free, total) => `+ ${free} MÅNEDER GRATIS = ${total} måneder i alt — ugens tilbud!`,
    savings: { test: 'Til at teste', trial: 'Testpakke', best: 'Bedste pris', weekdeal: 'UGENS DEAL' },
  },
  fi: {
    common: [
      '69 000+ live-kanavaa',
      '220 000+ elokuvaa & sarjaa',
      'Kaikki saksalainen sisältö',
      'Netflix · HBO · Disney+ & muut',
      '8K | 4K | UHD-laatu',
      'Anti-freeze-teknologia',
      'Nopeat & vakaat palvelimet',
      'Premium-elokuvat, sarjat & live-tv',
      'PPV / EPG saatavilla',
      'Kehittynyt lapsilukko',
      'Etusijalla oleva asiakaspalvelu',
      'Maailmanlaajuinen käyttö (ei IP-lukitusta)',
      'Jatkuvat päivitykset',
      'Catch-up-tv — katso missaamasi ohjelmat',
      '99,9 %:n palvelinkäytettävyys',
      'VPN mukana — ei aluerajoituksia',
      '15 päivän rahat takaisin -takuu (katso ehdot)',
      'Sujuva 8K-valmis toisto kaikilla laitteilla',
      'Time-Shift — kelaa live-lähetyksiä taaksepäin',
    ],
    tryOut: 'Täydellinen tapa kokeilla palveluamme!',
    twoDevices: '2 samanaikaista yhteyttä',
    bestSeller: 'Myydyin — Saksan suosikki!',
    freeDeal: (free, total) => `+ ${free} KUUKAUTTA ILMAISEKSI = yhteensä ${total} kuukautta — viikon tarjous!`,
    savings: { test: 'Kokeiluun', trial: 'Kokeilupaketti', best: 'Paras hinta', weekdeal: 'VIIKON DIILI' },
  },
  ar: {
    common: [
      'أكثر من 69,000 قناة مباشرة',
      'أكثر من 220,000 فيلم ومسلسل',
      'كل المحتوى الألماني',
      'Netflix · HBO · Disney+ وغيرها',
      'جودة 8K | 4K | UHD',
      'تقنية منع التقطيع',
      'خوادم سريعة ومستقرة',
      'أفلام ومسلسلات وبث مباشر مميّز',
      'PPV / EPG متاح',
      'رقابة أبوية متقدمة',
      'خدمة عملاء ذات أولوية',
      'وصول عالمي (بدون قفل IP)',
      'تحديثات دائمة',
      'إعادة المشاهدة — شاهد ما فاتك',
      'جاهزية الخادم 99.9%',
      'VPN مشمول — بدون حظر جغرافي',
      'ضمان استرداد المال خلال 15 يوماً (راجع الشروط)',
      'تشغيل سلس جاهز لدقة 8K على أي جهاز',
      'Time-Shift — أعد البث المباشر إلى الوراء',
    ],
    tryOut: 'مثالي لتجربة خدمتنا!',
    twoDevices: 'اتصالان متزامنان',
    bestSeller: 'الأكثر مبيعاً — المفضّل في ألمانيا!',
    freeDeal: (free, total) => `+ ${free} أشهر مجاناً = ${total} شهراً إجمالاً — عرض الأسبوع!`,
    savings: { test: 'للتجربة', trial: 'باقة تجريبية', best: 'أفضل سعر', weekdeal: 'عرض الأسبوع' },
  },
};

/** Plan copy for `lang`, falling back to English for a non-offered code. */
export function getPlanText(lang: LangCode): PlanText {
  return (PLAN_TEXT as Partial<Record<LangCode, PlanText>>)[lang] ?? PLAN_TEXT.en;
}

/**
 * The feature list for one plan, in the same order the hardcoded Dutch arrays in
 * types.ts used: trial line, best-seller line, free-months line, dual-device
 * line, then the shared list.
 */
export function planFeatures(plan: PricingPlan, pt: PlanText): string[] {
  const lines: string[] = [];
  if (plan.durationMonths === 3) lines.push(pt.tryOut);
  if (plan.popular) lines.push(pt.bestSeller);
  if (plan.freeMonths) lines.push(pt.freeDeal(plan.freeMonths, plan.durationMonths + plan.freeMonths));
  if (plan.devices === 2) lines.push(pt.twoDevices);
  return [...lines, ...pt.common];
}

/** The savings badge for one plan — keyed off its length, as the data was. */
export function planSavings(plan: PricingPlan, pt: PlanText): string {
  if (plan.durationMonths === 3) return pt.savings.test;
  if (plan.durationMonths === 6) return pt.savings.best;
  return pt.savings.weekdeal;
}
