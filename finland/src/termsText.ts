import { LangCode } from "./i18n";
import { UiLang } from "./i18nExtra";

/**
 * The /agb page. Terms.tsx keeps the icons and the layout; every word of
 * the fourteen sections lives here, in the same order, so the page follows the
 * language switcher. The Dutch text is the authoritative version — the
 * translations are there so a visitor can read the terms in their own language.
 */
export interface TermsText {
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string;
  chips: [string, string, string, string];
  summary: string;
  sections: { title: string; body: string[] }[];
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  waText: string;
  updated: string;
}

const TERMS: Record<UiLang, TermsText> = {
  nl: {
    eyebrow: 'Klantbescherming',
    title1: 'Voorwaarden &',
    title2: 'klantbescherming',
    intro: 'Wij zijn volledig transparant over wat u wel en niet van uw NERO IPTV-abonnement mag verwachten. Lees dit vóór uw bestelling — zo weet u precies waar u aan toe bent.',
    chips: ['15 dagen garantie', '24/7 support', 'Wekelijks onderhoud', 'Vaste prijzen'],
    summary: 'Kort samengevat: 15 dagen geld terug als het abonnement écht niet werkt (alle zenders én alle films), 24/7 support, permanente updates en wekelijks onderhoud. Bestellen en betalen gaat via WhatsApp; de app-speler is niet inbegrepen. Voor elke klant die u aanbrengt krijgt u gratis maanden.',
    sections: [
      {
        title: '1. Terugbetalingsgarantie — 15 dagen',
        body: [
          'U heeft recht op een volledige terugbetaling binnen 15 dagen na activatie van uw abonnement, uitsluitend wanneer het abonnement zelf aantoonbaar niet werkt.',
          '"Niet werkend" betekent: ALLE zenders werken niet én ALLE films en series werken niet — niet één zender, niet één film, niet één categorie.',
          'De storing moet aan het abonnement (onze servers/lijn) liggen, niet aan uw app, uw apparaat, uw internetverbinding of uw netwerkinstellingen.',
        ],
      },
      {
        title: '2. Wanneer geldt de terugbetaling NIET?',
        body: [
          'Wanneer het probleem bij de applicatie, het apparaat, de smart-tv, de box, de router of de internetverbinding ligt.',
          'Wanneer slechts een deel van het aanbod niet werkt (bijvoorbeeld één zender, één wedstrijd, één film of één categorie).',
          'Wanneer u het abonnement simpelweg niet leuk vindt, van gedachten verandert of een andere aanbieder verkiest. Smaak of voorkeur is geen technische storing.',
          'Wanneer u weigert mee te werken aan de diagnose (screenshot, testen op een tweede apparaat, testen op een ander netwerk).',
          'Wanneer de inloggegevens zijn gedeeld met derden of op meer apparaten zijn gebruikt dan uw abonnement toestaat.',
          'Wij zijn niet verantwoordelijk voor problemen die buiten het abonnement liggen.',
        ],
      },
      {
        title: '3. De app is niet inbegrepen',
        body: [
          'Wij leveren uitsluitend het abonnement (de lijn en de inloggegevens) — niet de applicatie.',
          'De speler/app koopt of activeert u zelf. Sommige apps zijn gratis, andere vragen een kleine eenmalige vergoeding aan de ontwikkelaar. Die kosten staan los van uw abonnement bij ons.',
          'Ons abonnement is compatibel met vrijwel alle IPTV-spelers, waaronder: HotPlayer, IBO Player (en IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi en elke andere speler met Xtream Codes- of M3U-ondersteuning.',
          'Onze support helpt u kosteloos bij het installeren en instellen van de app van uw keuze.',
        ],
      },
      {
        title: '4. Betaling en bestelproces',
        body: [
          'Het volledige bestelproces verloopt via WhatsApp. U neemt contact op met onze support en zij begeleiden u stap voor stap.',
          'Betaling gebeurt hoofdzakelijk via bankoverschrijving — deze methode is altijd beschikbaar.',
          'Andere betaalmethoden zijn niet permanent beschikbaar. Onze support laat u weten welke opties op dat moment openstaan.',
          'Onze prijzen zijn redelijk en vast: geen verborgen kosten, geen automatische verlenging, geen contract dat stilzwijgend doorloopt.',
        ],
      },
      {
        title: '5. Factuur en contract na betaling',
        body: [
          'Na ontvangst van uw betaling sturen wij u een factuur/contract toe — als tekstbericht of als PDF-bestand.',
          'Daarin staan alle gegevens van uw abonnement: startdatum, einddatum, looptijd inclusief gratis maanden, aantal apparaten, betaald bedrag en uw inloggegevens.',
          'Bewaar dit document. Het geldt als uw bewijs bij elke vraag over verlenging, ondersteuning of terugbetaling.',
        ],
      },
      {
        title: '6. Breng een klant aan — krijg gratis maanden',
        body: [
          'Verwijst u iemand naar ons door en sluit die persoon een abonnement af, dan belonen wij u met gratis maanden op uw eigen abonnement.',
          'Koopt uw aangebrachte klant het pakket van 12 + 3 maanden? Dan ontvangt u 1 maand gratis.',
          'Koopt hij of zij het pakket van 24 + 6 maanden? Dan ontvangt u 2 maanden gratis.',
          'Dit geldt voor zowel abonnementen met 1 apparaat als met 2 apparaten, en er is geen limiet: elke nieuwe klant die u aanbrengt telt mee.',
          'Laat de nieuwe klant uw naam of nummer noemen bij de bestelling, of meld het zelf via WhatsApp.',
        ],
      },
      {
        title: '7. Maandelijkse promoties & ons WhatsApp-kanaal',
        body: [
          'Elke maand draaien wij promoties en tijdelijke aanbiedingen op verschillende pakketten.',
          'Volg ons op social media — en vooral op ons WhatsApp-kanaal — om deze acties als eerste te zien.',
          'Op het WhatsApp-kanaal melden wij ook alle updates, geplande onderhoudswerkzaamheden en storingsherstel, zodat u altijd weet wat er speelt.',
          'Abonneren op het kanaal is gratis en volledig vrijblijvend.',
        ],
      },
      {
        title: '8. Storing of verbindingsfout?',
        body: [
          'Krijgt u een verbindingsfout of hapert de server? Geen paniek — neem gewoon contact op met de support.',
          'Onderhoud en herstel gebeuren wekelijks, dus problemen worden snel en structureel opgelost.',
          'In de meeste gevallen helpt de support u direct verder met een andere server of een aangepaste instelling, zonder dat u iets hoeft te doen.',
        ],
      },
      {
        title: '9. 24/7 klantenservice',
        body: [
          'Onze support is 24 uur per dag, 7 dagen per week bereikbaar via WhatsApp.',
          'Voordat er sprake kan zijn van terugbetaling, krijgt u altijd eerst technische ondersteuning: wij testen de lijn, controleren de server en helpen bij de installatie.',
          'In veruit de meeste gevallen is een probleem binnen enkele minuten opgelost door een andere app, een andere server of een correcte instelling.',
        ],
      },
      {
        title: '10. Permanente updates',
        body: [
          'Het zenderaanbod en de servers worden permanent onderhouden en bijgewerkt, zonder extra kosten voor u.',
          'De VOD-bibliotheek (films en series) wordt per kwartaal bijgewerkt — vier updates per jaar.',
          'Nieuwe zenders, nieuwe categorieën en verbeteringen aan de streamkwaliteit worden automatisch aan uw bestaande abonnement toegevoegd.',
        ],
      },
      {
        title: '11. Films op aanvraag',
        body: [
          'Ontbreekt er een film of serie in de bibliotheek? U kunt deze bij ons aanvragen via WhatsApp.',
          'Aanvragen worden meegenomen in de eerstvolgende kwartaalupdate. Er geldt dus een wachttijd tot de volgende update-cyclus.',
          'Wij doen ons uiterste best, maar kunnen niet garanderen dat elke aangevraagde titel beschikbaar komt.',
        ],
      },
      {
        title: '12. Duitse audio en ondertiteling',
        body: [
          'Niet alle films en series zijn beschikbaar met Duitse audio (nasynchronisatie).',
          'Een groot deel van de internationale content wordt aangeboden in de originele taal (meestal Engels), afhankelijk van de bron.',
          'Duitse ondertiteling is voor veel titels beschikbaar, maar niet voor de volledige catalogus.',
          'Alle Duitse zenders en de Duitse content worden uiteraard in het Duits uitgezonden.',
          'Het ontbreken van Duitse audio of ondertiteling bij een individuele titel is geen technische storing en geeft geen recht op terugbetaling.',
        ],
      },
      {
        title: '13. Uw verantwoordelijkheid',
        body: [
          'Een stabiele internetverbinding van minimaal 25 Mbps (aanbevolen 50 Mbps of meer voor 4K/8K) is vereist.',
          'U bent zelf verantwoordelijk voor uw apparatuur, uw app en uw netwerk.',
          'Het delen van uw inloggegevens leidt tot directe blokkering zonder terugbetaling.',
          'De dienst is uitsluitend bestemd voor privégebruik in de huiselijke kring.',
        ],
      },
      {
        title: '14. Hoe vraagt u een terugbetaling aan?',
        body: [
          'Neem binnen 15 dagen na activatie contact op via WhatsApp.',
          'Vermeld uw bestelnummer, het gebruikte apparaat en de app die u gebruikt.',
          'Voeg een korte video of screenshot toe waarop te zien is dat geen enkele zender en geen enkele film speelt.',
          'Na bevestiging door onze technische dienst wordt het bedrag binnen 5 tot 10 werkdagen teruggestort op dezelfde betaalmethode.',
        ],
      },
    ],
    ctaHeading: 'Nog vragen?',
    ctaText: 'Onze klantenservice is 24/7 bereikbaar en antwoordt meestal binnen enkele minuten. Bestellen, betalen en installeren doen wij samen met u via WhatsApp.',
    ctaButton: 'Contact via WhatsApp',
    waText: 'Hallo, ik heb een vraag over de voorwaarden en de terugbetaling.',
    updated: 'Laatst bijgewerkt: september 2026. Door een abonnement af te sluiten verklaart u akkoord te gaan met bovenstaande voorwaarden.',
  },
  en: {
    eyebrow: 'Customer protection',
    title1: 'Terms &',
    title2: 'customer protection',
    intro: 'We are completely transparent about what you may and may not expect from your NERO IPTV subscription. Read this before you order — that way you know exactly where you stand.',
    chips: ['15-day guarantee', '24/7 support', 'Weekly maintenance', 'Fixed prices'],
    summary: 'In short: 15 days money back if the subscription genuinely does not work (all channels and all movies), 24/7 support, permanent updates and weekly maintenance. Ordering and paying happen over WhatsApp; the player app is not included. For every customer you refer you receive free months.',
    sections: [
      {
        title: '1. Money-back guarantee — 15 days',
        body: [
          'You are entitled to a full refund within 15 days of activating your subscription, but only where the subscription itself demonstrably does not work.',
          '"Not working" means: NO channel works and NO movie or series works — not a single channel, not a single film, not a single category.',
          'The fault must lie with the subscription (our servers/line), not with your app, your device, your internet connection or your network settings.',
        ],
      },
      {
        title: '2. When does the refund NOT apply?',
        body: [
          'When the problem lies with the application, the device, the smart TV, the box, the router or the internet connection.',
          'When only part of the offering fails (for example one channel, one match, one film or one category).',
          'When you simply do not like the subscription, change your mind or prefer another provider. Taste or preference is not a technical fault.',
          'When you refuse to cooperate with the diagnosis (screenshot, testing on a second device, testing on another network).',
          'When the login details have been shared with third parties or used on more devices than your subscription allows.',
          'We are not responsible for problems that lie outside the subscription.',
        ],
      },
      {
        title: '3. The app is not included',
        body: [
          'We supply the subscription only (the line and the login details) — not the application.',
          'You buy or activate the player/app yourself. Some apps are free, others ask a small one-off fee payable to the developer. Those costs are separate from your subscription with us.',
          'Our subscription works with virtually every IPTV player, including: HotPlayer, IBO Player (and IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi and any other player that supports Xtream Codes or M3U.',
          'Our support helps you install and configure the app of your choice free of charge.',
        ],
      },
      {
        title: '4. Payment and ordering',
        body: [
          'The entire ordering process runs over WhatsApp. You contact our support and they guide you step by step.',
          'Payment is made mainly by bank transfer — that method is always available.',
          'Other payment methods are not permanently available. Our support will tell you which options are open at that moment.',
          'Our prices are fair and fixed: no hidden costs, no automatic renewal, no contract that quietly rolls on.',
        ],
      },
      {
        title: '5. Invoice and contract after payment',
        body: [
          'Once we have received your payment we send you an invoice/contract — as a text message or as a PDF file.',
          'It states every detail of your subscription: start date, end date, term including free months, number of devices, amount paid and your login details.',
          'Keep this document. It serves as your proof for any question about renewal, support or a refund.',
        ],
      },
      {
        title: '6. Refer a customer — get free months',
        body: [
          'If you refer someone to us and that person takes out a subscription, we reward you with free months on your own subscription.',
          'Does the customer you referred buy the 12 + 3 month package? Then you receive 1 free month.',
          'Do they buy the 24 + 6 month package? Then you receive 2 free months.',
          'This applies to both 1-device and 2-device subscriptions, and there is no limit: every new customer you bring in counts.',
          'Have the new customer mention your name or number when ordering, or report it yourself over WhatsApp.',
        ],
      },
      {
        title: '7. Monthly promotions & our WhatsApp channel',
        body: [
          'Every month we run promotions and limited-time offers on various packages.',
          'Follow us on social media — and above all on our WhatsApp channel — to see these deals first.',
          'On the WhatsApp channel we also announce every update, planned maintenance window and fault repair, so you always know what is going on.',
          'Subscribing to the channel is free and entirely without obligation.',
        ],
      },
      {
        title: '8. Outage or connection error?',
        body: [
          'Getting a connection error, or is the server stuttering? No panic — just contact support.',
          'Maintenance and repairs happen weekly, so problems are resolved quickly and structurally.',
          'In most cases support gets you going again straight away with a different server or an adjusted setting, without you having to do anything.',
        ],
      },
      {
        title: '9. 24/7 customer service',
        body: [
          'Our support is reachable 24 hours a day, 7 days a week over WhatsApp.',
          'Before a refund can be considered, you always receive technical support first: we test the line, check the server and help with the installation.',
          'In the vast majority of cases a problem is solved within minutes by a different app, a different server or a correct setting.',
        ],
      },
      {
        title: '10. Permanent updates',
        body: [
          'The channel line-up and the servers are permanently maintained and updated, at no extra cost to you.',
          'The VOD library (movies and series) is updated quarterly — four updates a year.',
          'New channels, new categories and stream-quality improvements are added to your existing subscription automatically.',
        ],
      },
      {
        title: '11. Movies on request',
        body: [
          'Is a film or series missing from the library? You can request it from us over WhatsApp.',
          'Requests are included in the next quarterly update, so there is a wait until the following update cycle.',
          'We do our utmost, but we cannot guarantee that every requested title becomes available.',
        ],
      },
      {
        title: '12. German audio and subtitles',
        body: [
          'Not every film and series is available with German audio (dubbing).',
          'A large part of the international content is offered in the original language (usually English), depending on the source.',
          'German subtitles are available for many titles, but not for the entire catalogue.',
          'All German channels and the German content are of course broadcast in German.',
          'The absence of German audio or subtitles on an individual title is not a technical fault and gives no right to a refund.',
        ],
      },
      {
        title: '13. Your responsibility',
        body: [
          'A stable internet connection of at least 25 Mbps is required (50 Mbps or more recommended for 4K/8K).',
          'You are responsible for your own equipment, your app and your network.',
          'Sharing your login details leads to immediate blocking without a refund.',
          'The service is intended solely for private use within the household.',
        ],
      },
      {
        title: '14. How do you request a refund?',
        body: [
          'Contact us over WhatsApp within 15 days of activation.',
          'State your order number, the device used and the app you are using.',
          'Add a short video or screenshot showing that no channel and no film plays.',
          'After confirmation by our technical team the amount is refunded to the same payment method within 5 to 10 working days.',
        ],
      },
    ],
    ctaHeading: 'Still have questions?',
    ctaText: 'Our customer service is available 24/7 and usually answers within minutes. We handle ordering, payment and installation together with you over WhatsApp.',
    ctaButton: 'Contact us on WhatsApp',
    waText: 'Hello, I have a question about the terms and the refund.',
    updated: 'Last updated: September 2026. By taking out a subscription you declare that you agree to the terms above.',
  },
  fr: {
    eyebrow: 'Protection du client',
    title1: 'Conditions &',
    title2: 'protection du client',
    intro: "Nous sommes totalement transparents sur ce que vous pouvez et ne pouvez pas attendre de votre abonnement NERO IPTV. Lisez ceci avant de commander — vous saurez ainsi exactement à quoi vous en tenir.",
    chips: ['Garantie 15 jours', 'Support 24h/24', 'Maintenance hebdomadaire', 'Prix fixes'],
    summary: "En résumé : remboursement sous 15 jours si l'abonnement ne fonctionne réellement pas (toutes les chaînes et tous les films), support 24h/24 et 7j/7, mises à jour permanentes et maintenance hebdomadaire. La commande et le paiement se font via WhatsApp ; l'application de lecture n'est pas incluse. Pour chaque client que vous parrainez, vous recevez des mois offerts.",
    sections: [
      {
        title: '1. Garantie de remboursement — 15 jours',
        body: [
          "Vous avez droit à un remboursement intégral dans les 15 jours suivant l'activation de votre abonnement, uniquement lorsque l'abonnement lui-même ne fonctionne manifestement pas.",
          "« Ne fonctionne pas » signifie : AUCUNE chaîne ne fonctionne ET aucun film ni aucune série ne fonctionne — pas une seule chaîne, pas un seul film, pas une seule catégorie.",
          "La panne doit provenir de l'abonnement (nos serveurs / notre ligne), et non de votre application, de votre appareil, de votre connexion internet ou de vos paramètres réseau.",
        ],
      },
      {
        title: "2. Quand le remboursement ne s'applique-t-il PAS ?",
        body: [
          "Lorsque le problème vient de l'application, de l'appareil, du téléviseur connecté, du boîtier, du routeur ou de la connexion internet.",
          "Lorsque seule une partie de l'offre ne fonctionne pas (par exemple une chaîne, un match, un film ou une catégorie).",
          "Lorsque l'abonnement ne vous plaît tout simplement pas, que vous changez d'avis ou que vous préférez un autre fournisseur. Le goût ou la préférence n'est pas une panne technique.",
          "Lorsque vous refusez de coopérer au diagnostic (capture d'écran, test sur un deuxième appareil, test sur un autre réseau).",
          "Lorsque les identifiants ont été partagés avec des tiers ou utilisés sur plus d'appareils que votre abonnement ne l'autorise.",
          "Nous ne sommes pas responsables des problèmes extérieurs à l'abonnement.",
        ],
      },
      {
        title: "3. L'application n'est pas incluse",
        body: [
          "Nous fournissons uniquement l'abonnement (la ligne et les identifiants) — pas l'application.",
          "Vous achetez ou activez vous-même le lecteur / l'application. Certaines applications sont gratuites, d'autres demandent une petite contribution unique au développeur. Ces frais sont indépendants de votre abonnement chez nous.",
          "Notre abonnement est compatible avec pratiquement tous les lecteurs IPTV, dont : HotPlayer, IBO Player (et IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi et tout autre lecteur prenant en charge Xtream Codes ou M3U.",
          "Notre support vous aide gratuitement à installer et à configurer l'application de votre choix.",
        ],
      },
      {
        title: '4. Paiement et processus de commande',
        body: [
          "L'ensemble du processus de commande se déroule via WhatsApp. Vous contactez notre support, qui vous accompagne étape par étape.",
          "Le paiement se fait principalement par virement bancaire — cette méthode est toujours disponible.",
          "Les autres moyens de paiement ne sont pas disponibles en permanence. Notre support vous indiquera les options ouvertes à ce moment-là.",
          "Nos prix sont raisonnables et fixes : pas de frais cachés, pas de reconduction automatique, pas de contrat qui se poursuit tacitement.",
        ],
      },
      {
        title: '5. Facture et contrat après paiement',
        body: [
          "Dès réception de votre paiement, nous vous envoyons une facture / un contrat — par message texte ou sous forme de fichier PDF.",
          "Y figurent toutes les données de votre abonnement : date de début, date de fin, durée y compris les mois offerts, nombre d'appareils, montant payé et vos identifiants.",
          "Conservez ce document. Il fait office de preuve pour toute question de renouvellement, d'assistance ou de remboursement.",
        ],
      },
      {
        title: '6. Parrainez un client — recevez des mois offerts',
        body: [
          "Si vous nous recommandez quelqu'un et que cette personne souscrit un abonnement, nous vous récompensons par des mois offerts sur votre propre abonnement.",
          "Le client que vous avez parrainé achète le pack de 12 + 3 mois ? Vous recevez alors 1 mois offert.",
          "Il ou elle achète le pack de 24 + 6 mois ? Vous recevez alors 2 mois offerts.",
          "Cela vaut aussi bien pour les abonnements 1 appareil que 2 appareils, et il n'y a aucune limite : chaque nouveau client que vous amenez compte.",
          "Faites mentionner votre nom ou votre numéro par le nouveau client lors de la commande, ou signalez-le vous-même via WhatsApp.",
        ],
      },
      {
        title: '7. Promotions mensuelles & notre canal WhatsApp',
        body: [
          "Chaque mois, nous proposons des promotions et des offres temporaires sur différents packs.",
          "Suivez-nous sur les réseaux sociaux — et surtout sur notre canal WhatsApp — pour découvrir ces offres en premier.",
          "Sur le canal WhatsApp, nous annonçons également toutes les mises à jour, les maintenances planifiées et les réparations, afin que vous sachiez toujours ce qui se passe.",
          "L'abonnement au canal est gratuit et totalement sans engagement.",
        ],
      },
      {
        title: '8. Panne ou erreur de connexion ?',
        body: [
          "Vous obtenez une erreur de connexion ou le serveur saccade ? Pas de panique — contactez simplement le support.",
          "La maintenance et les réparations ont lieu chaque semaine : les problèmes sont donc résolus rapidement et durablement.",
          "Dans la plupart des cas, le support vous dépanne immédiatement avec un autre serveur ou un réglage adapté, sans que vous ayez quoi que ce soit à faire.",
        ],
      },
      {
        title: '9. Service client 24h/24 et 7j/7',
        body: [
          "Notre support est joignable 24 heures sur 24, 7 jours sur 7 via WhatsApp.",
          "Avant qu'un remboursement puisse être envisagé, vous bénéficiez toujours d'abord d'une assistance technique : nous testons la ligne, vérifions le serveur et aidons à l'installation.",
          "Dans la grande majorité des cas, un problème se règle en quelques minutes grâce à une autre application, un autre serveur ou un réglage correct.",
        ],
      },
      {
        title: '10. Mises à jour permanentes',
        body: [
          "L'offre de chaînes et les serveurs sont entretenus et mis à jour en permanence, sans frais supplémentaires pour vous.",
          "La bibliothèque VOD (films et séries) est mise à jour chaque trimestre — quatre mises à jour par an.",
          "Les nouvelles chaînes, les nouvelles catégories et les améliorations de la qualité de diffusion sont ajoutées automatiquement à votre abonnement existant.",
        ],
      },
      {
        title: '11. Films sur demande',
        body: [
          "Un film ou une série manque dans la bibliothèque ? Vous pouvez nous en faire la demande via WhatsApp.",
          "Les demandes sont intégrées à la prochaine mise à jour trimestrielle. Il faut donc attendre le cycle de mise à jour suivant.",
          "Nous faisons de notre mieux, mais nous ne pouvons pas garantir que chaque titre demandé sera disponible.",
        ],
      },
      {
        title: '12. Audio et sous-titres allemands',
        body: [
          "Tous les films et séries ne sont pas disponibles avec un audio allemand (doublage).",
          "Une grande partie du contenu international est proposée en version originale (le plus souvent en anglais), selon la source.",
          "Les sous-titres allemands sont disponibles pour de nombreux titres, mais pas pour l'ensemble du catalogue.",
          "Toutes les chaînes allemandes et le contenu allemand sont bien entendu diffusés en allemand.",
          "L'absence d'audio ou de sous-titres allemands sur un titre isolé n'est pas une panne technique et n'ouvre aucun droit à remboursement.",
        ],
      },
      {
        title: '13. Votre responsabilité',
        body: [
          "Une connexion internet stable d'au moins 25 Mbit/s est requise (50 Mbit/s ou plus recommandés pour la 4K/8K).",
          "Vous êtes vous-même responsable de votre matériel, de votre application et de votre réseau.",
          "Le partage de vos identifiants entraîne un blocage immédiat sans remboursement.",
          "Le service est destiné exclusivement à un usage privé, dans le cercle familial.",
        ],
      },
      {
        title: '14. Comment demander un remboursement ?',
        body: [
          "Contactez-nous via WhatsApp dans les 15 jours suivant l'activation.",
          "Indiquez votre numéro de commande, l'appareil utilisé et l'application dont vous vous servez.",
          "Joignez une courte vidéo ou une capture d'écran montrant qu'aucune chaîne et aucun film ne se lancent.",
          "Après confirmation par notre service technique, le montant est remboursé sur le même moyen de paiement sous 5 à 10 jours ouvrés.",
        ],
      },
    ],
    ctaHeading: "D'autres questions ?",
    ctaText: "Notre service client est joignable 24h/24 et 7j/7 et répond généralement en quelques minutes. La commande, le paiement et l'installation, nous les faisons avec vous via WhatsApp.",
    ctaButton: 'Contact via WhatsApp',
    waText: 'Bonjour, j’ai une question sur les conditions et le remboursement.',
    updated: "Dernière mise à jour : septembre 2026. En souscrivant un abonnement, vous déclarez accepter les conditions ci-dessus.",
  },
  de: {
    eyebrow: 'Kundenschutz',
    title1: 'AGB &',
    title2: 'Kundenschutz',
    intro: 'Wir sind vollkommen transparent darüber, was Sie von Ihrem NERO IPTV-Abo erwarten dürfen und was nicht. Lesen Sie dies vor Ihrer Bestellung — so wissen Sie genau, woran Sie sind.',
    chips: ['15 Tage Garantie', '24/7 Support', 'Wöchentliche Wartung', 'Feste Preise'],
    summary: 'Kurz gefasst: 15 Tage Geld zurück, wenn das Abo wirklich nicht funktioniert (alle Sender und alle Filme), 24/7 Support, permanente Updates und wöchentliche Wartung. Bestellung und Zahlung laufen über WhatsApp; die Player-App ist nicht enthalten. Für jeden Kunden, den Sie werben, erhalten Sie Gratismonate.',
    sections: [
      {
        title: '1. Geld-zurück-Garantie — 15 Tage',
        body: [
          'Sie haben innerhalb von 15 Tagen nach Aktivierung Ihres Abos Anspruch auf eine vollständige Rückerstattung, allerdings nur dann, wenn das Abo selbst nachweislich nicht funktioniert.',
          '„Funktioniert nicht" bedeutet: KEIN Sender funktioniert UND keine Filme und Serien funktionieren — nicht ein einzelner Sender, nicht ein einzelner Film, nicht eine einzelne Kategorie.',
          'Die Störung muss beim Abo liegen (unsere Server/Leitung), nicht bei Ihrer App, Ihrem Gerät, Ihrer Internetverbindung oder Ihren Netzwerkeinstellungen.',
        ],
      },
      {
        title: '2. Wann gilt die Rückerstattung NICHT?',
        body: [
          'Wenn das Problem bei der Anwendung, dem Gerät, dem Smart-TV, der Box, dem Router oder der Internetverbindung liegt.',
          'Wenn nur ein Teil des Angebots nicht funktioniert (zum Beispiel ein Sender, ein Spiel, ein Film oder eine Kategorie).',
          'Wenn Ihnen das Abo schlicht nicht gefällt, Sie es sich anders überlegen oder einen anderen Anbieter bevorzugen. Geschmack oder Vorliebe ist keine technische Störung.',
          'Wenn Sie sich weigern, bei der Diagnose mitzuwirken (Screenshot, Test auf einem zweiten Gerät, Test in einem anderen Netz).',
          'Wenn die Zugangsdaten an Dritte weitergegeben oder auf mehr Geräten genutzt wurden, als Ihr Abo erlaubt.',
          'Für Probleme, die außerhalb des Abos liegen, sind wir nicht verantwortlich.',
        ],
      },
      {
        title: '3. Die App ist nicht enthalten',
        body: [
          'Wir liefern ausschließlich das Abo (die Leitung und die Zugangsdaten) — nicht die Anwendung.',
          'Den Player bzw. die App kaufen oder aktivieren Sie selbst. Manche Apps sind kostenlos, andere verlangen eine kleine einmalige Gebühr an den Entwickler. Diese Kosten sind unabhängig von Ihrem Abo bei uns.',
          'Unser Abo ist mit praktisch allen IPTV-Playern kompatibel, darunter: HotPlayer, IBO Player (und IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi und jeder andere Player mit Xtream-Codes- oder M3U-Unterstützung.',
          'Unser Support hilft Ihnen kostenlos bei Installation und Einrichtung der App Ihrer Wahl.',
        ],
      },
      {
        title: '4. Zahlung und Bestellablauf',
        body: [
          'Der gesamte Bestellablauf läuft über WhatsApp. Sie kontaktieren unseren Support und dieser begleitet Sie Schritt für Schritt.',
          'Bezahlt wird hauptsächlich per Banküberweisung — diese Methode ist immer verfügbar.',
          'Andere Zahlungsarten sind nicht dauerhaft verfügbar. Unser Support teilt Ihnen mit, welche Optionen gerade offen stehen.',
          'Unsere Preise sind fair und fest: keine versteckten Kosten, keine automatische Verlängerung, kein Vertrag, der stillschweigend weiterläuft.',
        ],
      },
      {
        title: '5. Rechnung und Vertrag nach der Zahlung',
        body: [
          'Nach Eingang Ihrer Zahlung senden wir Ihnen eine Rechnung bzw. einen Vertrag zu — als Textnachricht oder als PDF-Datei.',
          'Darin stehen alle Daten Ihres Abos: Startdatum, Enddatum, Laufzeit inklusive Gratismonaten, Anzahl der Geräte, gezahlter Betrag und Ihre Zugangsdaten.',
          'Bewahren Sie dieses Dokument auf. Es gilt als Ihr Nachweis bei jeder Frage zu Verlängerung, Support oder Rückerstattung.',
        ],
      },
      {
        title: '6. Kunden werben — Gratismonate erhalten',
        body: [
          'Wenn Sie jemanden an uns weiterempfehlen und diese Person ein Abo abschließt, belohnen wir Sie mit Gratismonaten auf Ihr eigenes Abo.',
          'Kauft Ihr geworbener Kunde das Paket mit 12 + 3 Monaten? Dann erhalten Sie 1 Gratismonat.',
          'Kauft er oder sie das Paket mit 24 + 6 Monaten? Dann erhalten Sie 2 Gratismonate.',
          'Das gilt für Abos mit 1 Gerät ebenso wie für Abos mit 2 Geräten, und es gibt keine Obergrenze: jeder neue Kunde, den Sie werben, zählt.',
          'Lassen Sie den neuen Kunden bei der Bestellung Ihren Namen oder Ihre Nummer nennen, oder melden Sie es selbst über WhatsApp.',
        ],
      },
      {
        title: '7. Monatliche Aktionen & unser WhatsApp-Kanal',
        body: [
          'Jeden Monat gibt es bei uns Aktionen und zeitlich begrenzte Angebote auf verschiedene Pakete.',
          'Folgen Sie uns in den sozialen Medien — und vor allem auf unserem WhatsApp-Kanal — um diese Aktionen als Erste zu sehen.',
          'Im WhatsApp-Kanal melden wir außerdem alle Updates, geplante Wartungsarbeiten und Störungsbehebungen, damit Sie immer wissen, was los ist.',
          'Das Abonnieren des Kanals ist kostenlos und völlig unverbindlich.',
        ],
      },
      {
        title: '8. Störung oder Verbindungsfehler?',
        body: [
          'Sie erhalten einen Verbindungsfehler oder der Server ruckelt? Keine Panik — wenden Sie sich einfach an den Support.',
          'Wartung und Reparaturen finden wöchentlich statt, Probleme werden also schnell und dauerhaft gelöst.',
          'In den meisten Fällen hilft Ihnen der Support sofort mit einem anderen Server oder einer angepassten Einstellung weiter, ohne dass Sie etwas tun müssen.',
        ],
      },
      {
        title: '9. Kundenservice rund um die Uhr',
        body: [
          'Unser Support ist 24 Stunden am Tag, 7 Tage die Woche über WhatsApp erreichbar.',
          'Bevor es überhaupt um eine Rückerstattung gehen kann, erhalten Sie immer zuerst technische Unterstützung: Wir testen die Leitung, prüfen den Server und helfen bei der Installation.',
          'In der überwiegenden Mehrzahl der Fälle ist ein Problem innerhalb weniger Minuten durch eine andere App, einen anderen Server oder eine korrekte Einstellung gelöst.',
        ],
      },
      {
        title: '10. Permanente Updates',
        body: [
          'Das Senderangebot und die Server werden permanent gewartet und aktualisiert, ohne Zusatzkosten für Sie.',
          'Die VOD-Bibliothek (Filme und Serien) wird quartalsweise aktualisiert — vier Updates pro Jahr.',
          'Neue Sender, neue Kategorien und Verbesserungen der Streamqualität werden Ihrem bestehenden Abo automatisch hinzugefügt.',
        ],
      },
      {
        title: '11. Filme auf Anfrage',
        body: [
          'Fehlt ein Film oder eine Serie in der Bibliothek? Sie können ihn bzw. sie über WhatsApp bei uns anfragen.',
          'Anfragen werden im nächsten Quartalsupdate berücksichtigt. Es gilt also eine Wartezeit bis zum nächsten Update-Zyklus.',
          'Wir geben unser Bestes, können aber nicht garantieren, dass jeder angefragte Titel verfügbar wird.',
        ],
      },
      {
        title: '12. Deutscher Ton und Untertitel',
        body: [
          'Nicht alle Filme und Serien sind mit deutschem Ton (Synchronisation) verfügbar.',
          'Ein großer Teil der internationalen Inhalte wird je nach Quelle in der Originalsprache angeboten (meist Englisch).',
          'Deutsche Untertitel gibt es für viele Titel, aber nicht für den gesamten Katalog.',
          'Alle deutschen Sender und die deutschen Inhalte werden selbstverständlich auf Deutsch ausgestrahlt.',
          'Das Fehlen von deutschem Ton oder Untertiteln bei einem einzelnen Titel ist keine technische Störung und begründet keinen Anspruch auf Rückerstattung.',
        ],
      },
      {
        title: '13. Ihre Verantwortung',
        body: [
          'Erforderlich ist eine stabile Internetverbindung von mindestens 25 Mbit/s (empfohlen 50 Mbit/s oder mehr für 4K/8K).',
          'Für Ihre Geräte, Ihre App und Ihr Netzwerk sind Sie selbst verantwortlich.',
          'Das Teilen Ihrer Zugangsdaten führt zur sofortigen Sperrung ohne Rückerstattung.',
          'Der Dienst ist ausschließlich für den privaten Gebrauch im häuslichen Kreis bestimmt.',
        ],
      },
      {
        title: '14. Wie beantragen Sie eine Rückerstattung?',
        body: [
          'Melden Sie sich innerhalb von 15 Tagen nach der Aktivierung über WhatsApp.',
          'Nennen Sie Ihre Bestellnummer, das verwendete Gerät und die App, die Sie nutzen.',
          'Fügen Sie ein kurzes Video oder einen Screenshot bei, auf dem zu sehen ist, dass kein einziger Sender und kein einziger Film läuft.',
          'Nach Bestätigung durch unseren technischen Dienst wird der Betrag innerhalb von 5 bis 10 Werktagen auf dieselbe Zahlungsmethode zurückerstattet.',
        ],
      },
    ],
    ctaHeading: 'Noch Fragen?',
    ctaText: 'Unser Kundenservice ist rund um die Uhr erreichbar und antwortet meist innerhalb weniger Minuten. Bestellung, Zahlung und Installation erledigen wir gemeinsam mit Ihnen über WhatsApp.',
    ctaButton: 'Kontakt über WhatsApp',
    waText: 'Hallo, ich habe eine Frage zu den AGB und zur Rückerstattung.',
    updated: 'Zuletzt aktualisiert: September 2026. Mit dem Abschluss eines Abos erklären Sie sich mit den obenstehenden Bedingungen einverstanden.',
  },
  es: {
    eyebrow: 'Protección del cliente',
    title1: 'Condiciones y',
    title2: 'protección del cliente',
    intro: 'Somos totalmente transparentes sobre lo que puede y no puede esperar de su suscripción a NERO IPTV. Lea esto antes de hacer el pedido: así sabrá exactamente a qué atenerse.',
    chips: ['Garantía de 15 días', 'Soporte 24/7', 'Mantenimiento semanal', 'Precios fijos'],
    summary: 'En resumen: devolución del dinero en 15 días si la suscripción realmente no funciona (todos los canales y todas las películas), soporte 24/7, actualizaciones permanentes y mantenimiento semanal. El pedido y el pago se realizan por WhatsApp; la aplicación reproductora no está incluida. Por cada cliente que nos recomiende recibirá meses gratis.',
    sections: [
      {
        title: '1. Garantía de devolución: 15 días',
        body: [
          'Tiene derecho a un reembolso íntegro en los 15 días siguientes a la activación de su suscripción, únicamente cuando la propia suscripción demuestre no funcionar.',
          '«No funciona» significa: NINGÚN canal funciona Y ninguna película ni serie funciona; no un solo canal, no una sola película, no una sola categoría.',
          'La avería debe estar en la suscripción (nuestros servidores o nuestra línea), no en su aplicación, su dispositivo, su conexión a internet o su configuración de red.',
        ],
      },
      {
        title: '2. ¿Cuándo NO se aplica la devolución?',
        body: [
          'Cuando el problema está en la aplicación, el dispositivo, la smart TV, el descodificador, el router o la conexión a internet.',
          'Cuando solo falla una parte de la oferta (por ejemplo un canal, un partido, una película o una categoría).',
          'Cuando sencillamente la suscripción no le gusta, cambia de opinión o prefiere otro proveedor. El gusto o la preferencia no son una avería técnica.',
          'Cuando se niega a colaborar en el diagnóstico (captura de pantalla, prueba en un segundo dispositivo, prueba en otra red).',
          'Cuando los datos de acceso se han compartido con terceros o se han usado en más dispositivos de los que permite su suscripción.',
          'No somos responsables de problemas ajenos a la suscripción.',
        ],
      },
      {
        title: '3. La aplicación no está incluida',
        body: [
          'Suministramos únicamente la suscripción (la línea y los datos de acceso), no la aplicación.',
          'El reproductor o la aplicación los compra o activa usted mismo. Algunas aplicaciones son gratuitas y otras piden una pequeña cuota única al desarrollador. Esos costes son independientes de su suscripción con nosotros.',
          'Nuestra suscripción es compatible con prácticamente todos los reproductores IPTV, entre ellos: HotPlayer, IBO Player (e IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi y cualquier otro reproductor con soporte de Xtream Codes o M3U.',
          'Nuestro soporte le ayuda gratuitamente a instalar y configurar la aplicación que elija.',
        ],
      },
      {
        title: '4. Pago y proceso de pedido',
        body: [
          'Todo el proceso de pedido se realiza por WhatsApp. Usted contacta con nuestro soporte y este le guía paso a paso.',
          'El pago se efectúa principalmente por transferencia bancaria: ese método está siempre disponible.',
          'Otros métodos de pago no están disponibles de forma permanente. Nuestro soporte le indicará qué opciones están abiertas en ese momento.',
          'Nuestros precios son razonables y fijos: sin costes ocultos, sin renovación automática, sin contratos que se prorroguen tácitamente.',
        ],
      },
      {
        title: '5. Factura y contrato tras el pago',
        body: [
          'Una vez recibido su pago le enviamos una factura o contrato, como mensaje de texto o como archivo PDF.',
          'En él figuran todos los datos de su suscripción: fecha de inicio, fecha de fin, duración incluidos los meses gratis, número de dispositivos, importe pagado y sus datos de acceso.',
          'Conserve este documento. Sirve como prueba ante cualquier consulta sobre renovación, soporte o devolución.',
        ],
      },
      {
        title: '6. Recomiende a un cliente y consiga meses gratis',
        body: [
          'Si nos recomienda a alguien y esa persona contrata una suscripción, le recompensamos con meses gratis en su propia suscripción.',
          '¿El cliente que ha recomendado compra el paquete de 12 + 3 meses? Entonces recibe 1 mes gratis.',
          '¿Compra el paquete de 24 + 6 meses? Entonces recibe 2 meses gratis.',
          'Esto se aplica tanto a las suscripciones de 1 dispositivo como a las de 2, y no hay límite: cada nuevo cliente que traiga cuenta.',
          'Pida al nuevo cliente que mencione su nombre o su número al hacer el pedido, o comuníquelo usted mismo por WhatsApp.',
        ],
      },
      {
        title: '7. Promociones mensuales y nuestro canal de WhatsApp',
        body: [
          'Cada mes lanzamos promociones y ofertas temporales en distintos paquetes.',
          'Síganos en las redes sociales, y sobre todo en nuestro canal de WhatsApp, para ver estas ofertas antes que nadie.',
          'En el canal de WhatsApp anunciamos también todas las actualizaciones, los mantenimientos programados y las reparaciones, para que siempre sepa qué está ocurriendo.',
          'Suscribirse al canal es gratuito y sin ningún compromiso.',
        ],
      },
      {
        title: '8. ¿Avería o error de conexión?',
        body: [
          '¿Recibe un error de conexión o el servidor se entrecorta? Sin pánico: contacte simplemente con el soporte.',
          'El mantenimiento y las reparaciones se realizan semanalmente, así que los problemas se resuelven rápido y de forma estructural.',
          'En la mayoría de los casos el soporte le soluciona el problema al instante con otro servidor o un ajuste distinto, sin que usted tenga que hacer nada.',
        ],
      },
      {
        title: '9. Atención al cliente 24/7',
        body: [
          'Nuestro soporte está disponible las 24 horas del día, los 7 días de la semana por WhatsApp.',
          'Antes de que pueda hablarse de una devolución, siempre recibe primero asistencia técnica: probamos la línea, comprobamos el servidor y ayudamos con la instalación.',
          'En la gran mayoría de los casos el problema se resuelve en minutos con otra aplicación, otro servidor o un ajuste correcto.',
        ],
      },
      {
        title: '10. Actualizaciones permanentes',
        body: [
          'La oferta de canales y los servidores se mantienen y actualizan de forma permanente, sin coste adicional para usted.',
          'La biblioteca VOD (películas y series) se actualiza cada trimestre: cuatro actualizaciones al año.',
          'Los canales nuevos, las categorías nuevas y las mejoras en la calidad de emisión se añaden automáticamente a su suscripción existente.',
        ],
      },
      {
        title: '11. Películas a petición',
        body: [
          '¿Falta una película o una serie en la biblioteca? Puede solicitárnosla por WhatsApp.',
          'Las solicitudes se incorporan en la siguiente actualización trimestral, por lo que hay que esperar al próximo ciclo de actualización.',
          'Hacemos todo lo posible, pero no podemos garantizar que cada título solicitado llegue a estar disponible.',
        ],
      },
      {
        title: '12. Audio y subtítulos en alemán',
        body: [
          'No todas las películas y series están disponibles con audio en alemán (doblaje).',
          'Buena parte del contenido internacional se ofrece en el idioma original (normalmente inglés), según la fuente.',
          'Hay subtítulos en alemán para muchos títulos, pero no para todo el catálogo.',
          'Todos los canales alemanes y el contenido alemán se emiten, naturalmente, en alemán.',
          'La ausencia de audio o subtítulos en alemán en un título concreto no es una avería técnica y no da derecho a devolución.',
        ],
      },
      {
        title: '13. Su responsabilidad',
        body: [
          'Se requiere una conexión a internet estable de al menos 25 Mbps (se recomiendan 50 Mbps o más para 4K/8K).',
          'Usted es responsable de sus equipos, su aplicación y su red.',
          'Compartir sus datos de acceso conlleva el bloqueo inmediato sin devolución.',
          'El servicio está destinado exclusivamente al uso privado en el ámbito doméstico.',
        ],
      },
      {
        title: '14. ¿Cómo se solicita una devolución?',
        body: [
          'Póngase en contacto por WhatsApp dentro de los 15 días siguientes a la activación.',
          'Indique su número de pedido, el dispositivo utilizado y la aplicación que usa.',
          'Adjunte un vídeo corto o una captura de pantalla en la que se vea que no se reproduce ningún canal ni ninguna película.',
          'Tras la confirmación de nuestro servicio técnico, el importe se devuelve al mismo método de pago en un plazo de 5 a 10 días laborables.',
        ],
      },
    ],
    ctaHeading: '¿Le queda alguna duda?',
    ctaText: 'Nuestra atención al cliente está disponible 24/7 y suele responder en cuestión de minutos. El pedido, el pago y la instalación los hacemos junto a usted por WhatsApp.',
    ctaButton: 'Contactar por WhatsApp',
    waText: 'Hola, tengo una pregunta sobre las condiciones y la devolución.',
    updated: 'Última actualización: septiembre de 2026. Al contratar una suscripción declara aceptar las condiciones anteriores.',
  },
  sv: {
    eyebrow: 'Kundskydd',
    title1: 'Villkor &',
    title2: 'kundskydd',
    intro: 'Vi är helt transparenta med vad du kan och inte kan förvänta dig av ditt NERO IPTV-abonnemang. Läs detta innan du beställer — då vet du exakt vad som gäller.',
    chips: ['15 dagars garanti', 'Support dygnet runt', 'Veckovis underhåll', 'Fasta priser'],
    summary: 'Kort sagt: pengarna tillbaka inom 15 dagar om abonnemanget verkligen inte fungerar (alla kanaler och alla filmer), support dygnet runt, permanenta uppdateringar och veckovis underhåll. Beställning och betalning sker via WhatsApp; spelarappen ingår inte. För varje kund du värvar får du gratismånader.',
    sections: [
      {
        title: '1. Pengarna-tillbaka-garanti — 15 dagar',
        body: [
          'Du har rätt till full återbetalning inom 15 dagar efter att abonnemanget aktiverats, men endast när abonnemanget i sig bevisligen inte fungerar.',
          '”Fungerar inte” betyder: INGEN kanal fungerar OCH inga filmer eller serier fungerar — inte en enda kanal, inte en enda film, inte en enda kategori.',
          'Felet måste ligga hos abonnemanget (våra servrar/vår linje), inte hos din app, din enhet, din internetuppkoppling eller dina nätverksinställningar.',
        ],
      },
      {
        title: '2. När gäller återbetalningen INTE?',
        body: [
          'När problemet ligger hos applikationen, enheten, smart-TV:n, boxen, routern eller internetuppkopplingen.',
          'När bara en del av utbudet inte fungerar (till exempel en kanal, en match, en film eller en kategori).',
          'När du helt enkelt inte gillar abonnemanget, ångrar dig eller föredrar en annan leverantör. Smak eller preferens är inte ett tekniskt fel.',
          'När du vägrar medverka i felsökningen (skärmbild, test på en andra enhet, test på ett annat nätverk).',
          'När inloggningsuppgifterna har delats med tredje part eller använts på fler enheter än abonnemanget tillåter.',
          'Vi ansvarar inte för problem som ligger utanför abonnemanget.',
        ],
      },
      {
        title: '3. Appen ingår inte',
        body: [
          'Vi levererar enbart abonnemanget (linjen och inloggningsuppgifterna) — inte applikationen.',
          'Spelaren/appen köper eller aktiverar du själv. Vissa appar är gratis, andra tar ut en liten engångsavgift till utvecklaren. Den kostnaden är skild från ditt abonnemang hos oss.',
          'Vårt abonnemang fungerar med praktiskt taget alla IPTV-spelare, bland andra: HotPlayer, IBO Player (och IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi och varje annan spelare med stöd för Xtream Codes eller M3U.',
          'Vår support hjälper dig kostnadsfritt att installera och ställa in den app du väljer.',
        ],
      },
      {
        title: '4. Betalning och beställning',
        body: [
          'Hela beställningsprocessen sker via WhatsApp. Du kontaktar vår support som guidar dig steg för steg.',
          'Betalning sker huvudsakligen med banköverföring — den metoden är alltid tillgänglig.',
          'Andra betalsätt är inte permanent tillgängliga. Vår support berättar vilka alternativ som är öppna för tillfället.',
          'Våra priser är rimliga och fasta: inga dolda avgifter, ingen automatisk förnyelse, inget avtal som tyst löper vidare.',
        ],
      },
      {
        title: '5. Faktura och avtal efter betalning',
        body: [
          'När vi mottagit din betalning skickar vi en faktura/ett avtal — som textmeddelande eller som PDF-fil.',
          'Där står alla uppgifter om ditt abonnemang: startdatum, slutdatum, löptid inklusive gratismånader, antal enheter, betalt belopp och dina inloggningsuppgifter.',
          'Spara dokumentet. Det gäller som ditt bevis vid varje fråga om förlängning, support eller återbetalning.',
        ],
      },
      {
        title: '6. Värva en kund — få gratismånader',
        body: [
          'Om du rekommenderar oss till någon och den personen tecknar ett abonnemang belönar vi dig med gratismånader på ditt eget abonnemang.',
          'Köper kunden du värvat paketet med 12 + 3 månader? Då får du 1 månad gratis.',
          'Köper han eller hon paketet med 24 + 6 månader? Då får du 2 månader gratis.',
          'Detta gäller både abonnemang med 1 enhet och med 2 enheter, och det finns ingen gräns: varje ny kund du värvar räknas.',
          'Låt den nya kunden nämna ditt namn eller nummer vid beställningen, eller meddela det själv via WhatsApp.',
        ],
      },
      {
        title: '7. Månatliga kampanjer & vår WhatsApp-kanal',
        body: [
          'Varje månad kör vi kampanjer och tidsbegränsade erbjudanden på olika paket.',
          'Följ oss på sociala medier — och framför allt på vår WhatsApp-kanal — för att se erbjudandena först.',
          'På WhatsApp-kanalen meddelar vi även alla uppdateringar, planerat underhåll och åtgärdade fel, så att du alltid vet vad som händer.',
          'Att prenumerera på kanalen är gratis och helt utan förpliktelser.',
        ],
      },
      {
        title: '8. Störning eller anslutningsfel?',
        body: [
          'Får du ett anslutningsfel eller hackar servern? Ingen panik — kontakta bara supporten.',
          'Underhåll och reparationer sker varje vecka, så problem löses snabbt och strukturellt.',
          'I de flesta fall hjälper supporten dig vidare direkt med en annan server eller en justerad inställning, utan att du behöver göra något.',
        ],
      },
      {
        title: '9. Kundtjänst dygnet runt',
        body: [
          'Vår support nås dygnet runt, alla dagar i veckan, via WhatsApp.',
          'Innan det kan bli tal om återbetalning får du alltid teknisk hjälp först: vi testar linjen, kontrollerar servern och hjälper till med installationen.',
          'I de allra flesta fall är problemet löst inom några minuter med en annan app, en annan server eller en korrekt inställning.',
        ],
      },
      {
        title: '10. Permanenta uppdateringar',
        body: [
          'Kanalutbudet och servrarna underhålls och uppdateras löpande, utan extra kostnad för dig.',
          'VOD-biblioteket (filmer och serier) uppdateras kvartalsvis — fyra uppdateringar per år.',
          'Nya kanaler, nya kategorier och förbättringar av strömkvaliteten läggs automatiskt till ditt befintliga abonnemang.',
        ],
      },
      {
        title: '11. Filmer på begäran',
        body: [
          'Saknas en film eller serie i biblioteket? Du kan begära den av oss via WhatsApp.',
          'Önskemål tas med i nästa kvartalsuppdatering. Det innebär alltså en väntetid till nästa uppdateringscykel.',
          'Vi gör vårt yttersta, men kan inte garantera att varje efterfrågad titel blir tillgänglig.',
        ],
      },
      {
        title: '12. Tyskt ljud och undertexter',
        body: [
          'Alla filmer och serier finns inte med tyskt ljud (dubbning).',
          'En stor del av det internationella innehållet erbjuds på originalspråket (oftast engelska), beroende på källan.',
          'Tyska undertexter finns för många titlar, men inte för hela katalogen.',
          'Alla tyska kanaler och det tyska innehållet sänds naturligtvis på tyska.',
          'Att tyskt ljud eller undertexter saknas på en enskild titel är inte ett tekniskt fel och ger ingen rätt till återbetalning.',
        ],
      },
      {
        title: '13. Ditt ansvar',
        body: [
          'En stabil internetuppkoppling på minst 25 Mbit/s krävs (50 Mbit/s eller mer rekommenderas för 4K/8K).',
          'Du ansvarar själv för din utrustning, din app och ditt nätverk.',
          'Att dela dina inloggningsuppgifter leder till omedelbar spärr utan återbetalning.',
          'Tjänsten är uteslutande avsedd för privat bruk i hemmet.',
        ],
      },
      {
        title: '14. Hur ansöker du om återbetalning?',
        body: [
          'Kontakta oss via WhatsApp inom 15 dagar efter aktiveringen.',
          'Ange ditt ordernummer, vilken enhet du använt och vilken app du använder.',
          'Bifoga en kort video eller skärmbild som visar att ingen kanal och ingen film spelas upp.',
          'Efter bekräftelse från vår tekniska avdelning återbetalas beloppet till samma betalsätt inom 5 till 10 arbetsdagar.',
        ],
      },
    ],
    ctaHeading: 'Fler frågor?',
    ctaText: 'Vår kundtjänst nås dygnet runt och svarar oftast inom några minuter. Beställning, betalning och installation gör vi tillsammans med dig via WhatsApp.',
    ctaButton: 'Kontakt via WhatsApp',
    waText: 'Hej, jag har en fråga om villkoren och återbetalningen.',
    updated: 'Senast uppdaterad: september 2026. Genom att teckna ett abonnemang förklarar du att du godtar villkoren ovan.',
  },
  no: {
    eyebrow: 'Kundebeskyttelse',
    title1: 'Vilkår &',
    title2: 'kundebeskyttelse',
    intro: 'Vi er helt åpne om hva du kan og ikke kan forvente av NERO IPTV-abonnementet ditt. Les dette før du bestiller — da vet du nøyaktig hva som gjelder.',
    chips: ['15 dagers garanti', 'Support døgnet rundt', 'Ukentlig vedlikehold', 'Faste priser'],
    summary: 'Kort fortalt: pengene tilbake innen 15 dager hvis abonnementet virkelig ikke fungerer (alle kanaler og alle filmer), support døgnet rundt, permanente oppdateringer og ukentlig vedlikehold. Bestilling og betaling skjer via WhatsApp; spilleren er ikke inkludert. For hver kunde du verver får du gratismåneder.',
    sections: [
      {
        title: '1. Pengene-tilbake-garanti — 15 dager',
        body: [
          'Du har rett på full refusjon innen 15 dager etter at abonnementet er aktivert, men bare når abonnementet selv beviselig ikke fungerer.',
          '«Fungerer ikke» betyr: INGEN kanaler fungerer OG ingen filmer eller serier fungerer — ikke én kanal, ikke én film, ikke én kategori.',
          'Feilen må ligge hos abonnementet (våre servere/vår linje), ikke hos appen din, enheten din, internettforbindelsen din eller nettverksinnstillingene dine.',
        ],
      },
      {
        title: '2. Når gjelder refusjonen IKKE?',
        body: [
          'Når problemet ligger hos applikasjonen, enheten, smart-TV-en, boksen, ruteren eller internettforbindelsen.',
          'Når bare deler av tilbudet ikke fungerer (for eksempel én kanal, én kamp, én film eller én kategori).',
          'Når du rett og slett ikke liker abonnementet, ombestemmer deg eller foretrekker en annen leverandør. Smak eller preferanse er ikke en teknisk feil.',
          'Når du nekter å medvirke i feilsøkingen (skjermbilde, test på en annen enhet, test på et annet nettverk).',
          'Når innloggingsopplysningene er delt med tredjeparter eller brukt på flere enheter enn abonnementet tillater.',
          'Vi er ikke ansvarlige for problemer som ligger utenfor abonnementet.',
        ],
      },
      {
        title: '3. Appen er ikke inkludert',
        body: [
          'Vi leverer bare abonnementet (linjen og innloggingsopplysningene) — ikke applikasjonen.',
          'Spilleren/appen kjøper eller aktiverer du selv. Noen apper er gratis, andre krever et lite engangsbeløp til utvikleren. Den kostnaden er uavhengig av abonnementet ditt hos oss.',
          'Abonnementet vårt er kompatibelt med praktisk talt alle IPTV-spillere, blant annet: HotPlayer, IBO Player (og IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi og enhver annen spiller med støtte for Xtream Codes eller M3U.',
          'Supporten vår hjelper deg gratis med å installere og sette opp appen du velger.',
        ],
      },
      {
        title: '4. Betaling og bestillingsprosess',
        body: [
          'Hele bestillingsprosessen går via WhatsApp. Du kontakter supporten vår, som veileder deg steg for steg.',
          'Betaling skjer hovedsakelig med bankoverføring — den metoden er alltid tilgjengelig.',
          'Andre betalingsmåter er ikke permanent tilgjengelige. Supporten forteller deg hvilke alternativer som er åpne der og da.',
          'Prisene våre er rimelige og faste: ingen skjulte kostnader, ingen automatisk fornyelse, ingen avtale som stilltiende løper videre.',
        ],
      },
      {
        title: '5. Faktura og avtale etter betaling',
        body: [
          'Når betalingen din er mottatt, sender vi deg en faktura/avtale — som tekstmelding eller som PDF-fil.',
          'Der står alle opplysningene om abonnementet ditt: startdato, sluttdato, løpetid inkludert gratismåneder, antall enheter, betalt beløp og innloggingsopplysningene dine.',
          'Ta vare på dokumentet. Det gjelder som ditt bevis ved ethvert spørsmål om fornyelse, støtte eller refusjon.',
        ],
      },
      {
        title: '6. Verv en kunde — få gratismåneder',
        body: [
          'Hvis du anbefaler oss til noen og den personen tegner et abonnement, belønner vi deg med gratismåneder på ditt eget abonnement.',
          'Kjøper kunden du vervet pakken med 12 + 3 måneder? Da får du 1 måned gratis.',
          'Kjøper han eller hun pakken med 24 + 6 måneder? Da får du 2 måneder gratis.',
          'Dette gjelder både abonnementer med 1 enhet og med 2 enheter, og det er ingen grense: hver nye kunde du verver teller.',
          'La den nye kunden nevne navnet eller nummeret ditt ved bestillingen, eller meld fra selv via WhatsApp.',
        ],
      },
      {
        title: '7. Månedlige kampanjer & WhatsApp-kanalen vår',
        body: [
          'Hver måned kjører vi kampanjer og tidsbegrensede tilbud på ulike pakker.',
          'Følg oss i sosiale medier — og fremfor alt på WhatsApp-kanalen vår — for å se tilbudene først.',
          'På WhatsApp-kanalen melder vi også fra om alle oppdateringer, planlagt vedlikehold og utbedring av feil, slik at du alltid vet hva som skjer.',
          'Å abonnere på kanalen er gratis og helt uforpliktende.',
        ],
      },
      {
        title: '8. Driftsfeil eller tilkoblingsfeil?',
        body: [
          'Får du en tilkoblingsfeil, eller hakker serveren? Ingen panikk — bare ta kontakt med supporten.',
          'Vedlikehold og utbedring skjer ukentlig, så problemer løses raskt og strukturelt.',
          'I de fleste tilfeller hjelper supporten deg videre med en gang, med en annen server eller en justert innstilling, uten at du trenger å gjøre noe.',
        ],
      },
      {
        title: '9. Kundeservice døgnet rundt',
        body: [
          'Supporten vår er tilgjengelig 24 timer i døgnet, 7 dager i uken via WhatsApp.',
          'Før det kan bli snakk om refusjon, får du alltid teknisk hjelp først: vi tester linjen, kontrollerer serveren og hjelper med installasjonen.',
          'I de aller fleste tilfellene er problemet løst i løpet av minutter med en annen app, en annen server eller en riktig innstilling.',
        ],
      },
      {
        title: '10. Permanente oppdateringer',
        body: [
          'Kanaltilbudet og serverne vedlikeholdes og oppdateres løpende, uten ekstra kostnad for deg.',
          'VOD-biblioteket (filmer og serier) oppdateres kvartalsvis — fire oppdateringer i året.',
          'Nye kanaler, nye kategorier og forbedringer av strømkvaliteten legges automatisk til det eksisterende abonnementet ditt.',
        ],
      },
      {
        title: '11. Filmer på forespørsel',
        body: [
          'Mangler en film eller serie i biblioteket? Du kan be om den via WhatsApp.',
          'Forespørsler tas med i neste kvartalsoppdatering. Det er altså en ventetid frem til neste oppdateringssyklus.',
          'Vi gjør vårt ytterste, men kan ikke garantere at hver etterspurte tittel blir tilgjengelig.',
        ],
      },
      {
        title: '12. Tysk lyd og teksting',
        body: [
          'Ikke alle filmer og serier er tilgjengelige med tysk lyd (dubbing).',
          'En stor del av det internasjonale innholdet tilbys på originalspråket (som regel engelsk), avhengig av kilden.',
          'Tysk teksting finnes for mange titler, men ikke for hele katalogen.',
          'Alle tyske kanaler og det tyske innholdet sendes selvsagt på tysk.',
          'At tysk lyd eller teksting mangler på en enkelt tittel er ikke en teknisk feil og gir ingen rett til refusjon.',
        ],
      },
      {
        title: '13. Ditt ansvar',
        body: [
          'Det kreves en stabil internettforbindelse på minst 25 Mbps (50 Mbps eller mer anbefales for 4K/8K).',
          'Du er selv ansvarlig for utstyret ditt, appen din og nettverket ditt.',
          'Deling av innloggingsopplysningene dine fører til umiddelbar sperring uten refusjon.',
          'Tjenesten er utelukkende ment for privat bruk i hjemmet.',
        ],
      },
      {
        title: '14. Hvordan søker du om refusjon?',
        body: [
          'Ta kontakt via WhatsApp innen 15 dager etter aktiveringen.',
          'Oppgi ordrenummeret ditt, hvilken enhet du brukte og hvilken app du bruker.',
          'Legg ved en kort video eller et skjermbilde som viser at ingen kanal og ingen film spilles av.',
          'Etter bekreftelse fra den tekniske avdelingen vår refunderes beløpet til samme betalingsmåte innen 5 til 10 virkedager.',
        ],
      },
    ],
    ctaHeading: 'Flere spørsmål?',
    ctaText: 'Kundeservicen vår er tilgjengelig døgnet rundt og svarer som regel i løpet av minutter. Bestilling, betaling og installasjon gjør vi sammen med deg via WhatsApp.',
    ctaButton: 'Kontakt via WhatsApp',
    waText: 'Hei, jeg har et spørsmål om vilkårene og refusjonen.',
    updated: 'Sist oppdatert: september 2026. Ved å tegne et abonnement erklærer du at du godtar vilkårene ovenfor.',
  },
  da: {
    eyebrow: 'Kundebeskyttelse',
    title1: 'Vilkår &',
    title2: 'kundebeskyttelse',
    intro: 'Vi er fuldstændig åbne om, hvad du kan og ikke kan forvente af dit NERO IPTV-abonnement. Læs dette, før du bestiller — så ved du præcis, hvad du går ind til.',
    chips: ['15 dages garanti', 'Support døgnet rundt', 'Ugentlig vedligeholdelse', 'Faste priser'],
    summary: 'Kort fortalt: pengene tilbage inden for 15 dage, hvis abonnementet reelt ikke virker (alle kanaler og alle film), support døgnet rundt, permanente opdateringer og ugentlig vedligeholdelse. Bestilling og betaling foregår via WhatsApp; afspiller-appen er ikke inkluderet. For hver kunde, du henviser, får du gratis måneder.',
    sections: [
      {
        title: '1. Pengene-tilbage-garanti — 15 dage',
        body: [
          'Du har ret til fuld refusion inden for 15 dage efter aktiveringen af dit abonnement, men kun når abonnementet selv beviseligt ikke virker.',
          '»Virker ikke« betyder: INGEN kanaler virker OG ingen film eller serier virker — ikke én kanal, ikke én film, ikke én kategori.',
          'Fejlen skal ligge hos abonnementet (vores servere/linje), ikke hos din app, din enhed, din internetforbindelse eller dine netværksindstillinger.',
        ],
      },
      {
        title: '2. Hvornår gælder refusionen IKKE?',
        body: [
          'Når problemet ligger hos applikationen, enheden, smart-TV\'et, boksen, routeren eller internetforbindelsen.',
          'Når kun en del af udbuddet ikke virker (for eksempel én kanal, én kamp, én film eller én kategori).',
          'Når du ganske enkelt ikke kan lide abonnementet, fortryder eller foretrækker en anden udbyder. Smag eller præference er ikke en teknisk fejl.',
          'Når du nægter at medvirke til fejlsøgningen (skærmbillede, test på en anden enhed, test på et andet netværk).',
          'Når loginoplysningerne er delt med tredjepart eller brugt på flere enheder, end dit abonnement tillader.',
          'Vi er ikke ansvarlige for problemer, der ligger uden for abonnementet.',
        ],
      },
      {
        title: '3. Appen er ikke inkluderet',
        body: [
          'Vi leverer udelukkende abonnementet (linjen og loginoplysningerne) — ikke applikationen.',
          'Afspilleren/appen køber eller aktiverer du selv. Nogle apps er gratis, andre kræver et lille engangsbeløb til udvikleren. Den udgift er uafhængig af dit abonnement hos os.',
          'Vores abonnement er kompatibelt med stort set alle IPTV-afspillere, blandt andre: HotPlayer, IBO Player (og IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi og enhver anden afspiller med understøttelse af Xtream Codes eller M3U.',
          'Vores support hjælper dig gratis med at installere og indstille den app, du vælger.',
        ],
      },
      {
        title: '4. Betaling og bestillingsproces',
        body: [
          'Hele bestillingsprocessen foregår via WhatsApp. Du kontakter vores support, som guider dig trin for trin.',
          'Betaling sker hovedsagelig via bankoverførsel — den metode er altid tilgængelig.',
          'Andre betalingsmetoder er ikke permanent tilgængelige. Vores support fortæller dig, hvilke muligheder der er åbne på det tidspunkt.',
          'Vores priser er rimelige og faste: ingen skjulte omkostninger, ingen automatisk fornyelse, ingen aftale, der stiltiende fortsætter.',
        ],
      },
      {
        title: '5. Faktura og aftale efter betaling',
        body: [
          'Når vi har modtaget din betaling, sender vi dig en faktura/aftale — som tekstbesked eller som PDF-fil.',
          'Deri står alle oplysninger om dit abonnement: startdato, slutdato, løbetid inklusive gratis måneder, antal enheder, betalt beløb og dine loginoplysninger.',
          'Gem dette dokument. Det gælder som dit bevis ved ethvert spørgsmål om forlængelse, support eller refusion.',
        ],
      },
      {
        title: '6. Henvis en kunde — få gratis måneder',
        body: [
          'Hvis du anbefaler os til nogen, og den person tegner et abonnement, belønner vi dig med gratis måneder på dit eget abonnement.',
          'Køber den kunde, du har henvist, pakken med 12 + 3 måneder? Så får du 1 måned gratis.',
          'Køber han eller hun pakken med 24 + 6 måneder? Så får du 2 måneder gratis.',
          'Dette gælder både abonnementer med 1 enhed og med 2 enheder, og der er ingen grænse: hver ny kunde, du henviser, tæller med.',
          'Lad den nye kunde nævne dit navn eller nummer ved bestillingen, eller meld det selv via WhatsApp.',
        ],
      },
      {
        title: '7. Månedlige kampagner & vores WhatsApp-kanal',
        body: [
          'Hver måned kører vi kampagner og tidsbegrænsede tilbud på forskellige pakker.',
          'Følg os på de sociale medier — og især på vores WhatsApp-kanal — for at se tilbuddene først.',
          'På WhatsApp-kanalen melder vi også alle opdateringer, planlagt vedligeholdelse og fejlretning, så du altid ved, hvad der sker.',
          'Det er gratis og helt uforpligtende at abonnere på kanalen.',
        ],
      },
      {
        title: '8. Driftsfejl eller forbindelsesfejl?',
        body: [
          'Får du en forbindelsesfejl, eller hakker serveren? Ingen panik — kontakt blot supporten.',
          'Vedligeholdelse og udbedring sker ugentligt, så problemer løses hurtigt og strukturelt.',
          'I de fleste tilfælde hjælper supporten dig videre med det samme med en anden server eller en tilpasset indstilling, uden at du skal gøre noget.',
        ],
      },
      {
        title: '9. Kundeservice døgnet rundt',
        body: [
          'Vores support kan kontaktes 24 timer i døgnet, 7 dage om ugen via WhatsApp.',
          'Før der overhovedet kan blive tale om refusion, får du altid teknisk hjælp først: vi tester linjen, kontrollerer serveren og hjælper med installationen.',
          'I langt de fleste tilfælde er et problem løst inden for få minutter med en anden app, en anden server eller en korrekt indstilling.',
        ],
      },
      {
        title: '10. Permanente opdateringer',
        body: [
          'Kanaludbuddet og serverne vedligeholdes og opdateres løbende uden ekstra omkostninger for dig.',
          'VOD-biblioteket (film og serier) opdateres kvartalsvis — fire opdateringer om året.',
          'Nye kanaler, nye kategorier og forbedringer af streamkvaliteten føjes automatisk til dit eksisterende abonnement.',
        ],
      },
      {
        title: '11. Film efter ønske',
        body: [
          'Mangler der en film eller serie i biblioteket? Du kan bede om den via WhatsApp.',
          'Ønsker tages med i den næste kvartalsopdatering. Der er altså ventetid indtil næste opdateringscyklus.',
          'Vi gør vores yderste, men kan ikke garantere, at hver ønsket titel bliver tilgængelig.',
        ],
      },
      {
        title: '12. Tysk lyd og undertekster',
        body: [
          'Ikke alle film og serier er tilgængelige med tysk lyd (eftersynkronisering).',
          'En stor del af det internationale indhold tilbydes på originalsproget (som regel engelsk), afhængigt af kilden.',
          'Tyske undertekster findes til mange titler, men ikke til hele kataloget.',
          'Alle tyske kanaler og det tyske indhold sendes naturligvis på tysk.',
          'At der mangler tysk lyd eller undertekster på en enkelt titel er ikke en teknisk fejl og giver ikke ret til refusion.',
        ],
      },
      {
        title: '13. Dit ansvar',
        body: [
          'Der kræves en stabil internetforbindelse på mindst 25 Mbps (50 Mbps eller mere anbefales til 4K/8K).',
          'Du er selv ansvarlig for dit udstyr, din app og dit netværk.',
          'Deling af dine loginoplysninger fører til øjeblikkelig blokering uden refusion.',
          'Tjenesten er udelukkende beregnet til privat brug i hjemmet.',
        ],
      },
      {
        title: '14. Hvordan søger du om refusion?',
        body: [
          'Kontakt os via WhatsApp inden for 15 dage efter aktiveringen.',
          'Oplys dit ordrenummer, den anvendte enhed og den app, du bruger.',
          'Vedhæft en kort video eller et skærmbillede, hvor det kan ses, at ingen kanal og ingen film afspilles.',
          'Efter bekræftelse fra vores tekniske afdeling refunderes beløbet til samme betalingsmetode inden for 5 til 10 hverdage.',
        ],
      },
    ],
    ctaHeading: 'Flere spørgsmål?',
    ctaText: 'Vores kundeservice kan kontaktes døgnet rundt og svarer som regel inden for få minutter. Bestilling, betaling og installation klarer vi sammen med dig via WhatsApp.',
    ctaButton: 'Kontakt via WhatsApp',
    waText: 'Hej, jeg har et spørgsmål om vilkårene og refusionen.',
    updated: 'Sidst opdateret: september 2026. Ved at tegne et abonnement erklærer du dig indforstået med ovenstående vilkår.',
  },
  fi: {
    eyebrow: 'Asiakassuoja',
    title1: 'Ehdot &',
    title2: 'asiakassuoja',
    intro: 'Kerromme täysin avoimesti, mitä voit ja mitä et voi odottaa NERO IPTV -tilaukseltasi. Lue tämä ennen tilaamista — silloin tiedät tarkalleen, mistä on kyse.',
    chips: ['15 päivän takuu', 'Tuki ympäri vuorokauden', 'Viikoittainen huolto', 'Kiinteät hinnat'],
    summary: 'Lyhyesti: rahat takaisin 15 päivän kuluessa, jos tilaus ei todella toimi (kaikki kanavat ja kaikki elokuvat), tuki ympäri vuorokauden, jatkuvat päivitykset ja viikoittainen huolto. Tilaaminen ja maksaminen tapahtuvat WhatsAppissa; toisto-ohjelma ei sisälly. Jokaisesta suosittelemastasi asiakkaasta saat ilmaisia kuukausia.',
    sections: [
      {
        title: '1. Rahat takaisin -takuu — 15 päivää',
        body: [
          'Sinulla on oikeus täyteen hyvitykseen 15 päivän kuluessa tilauksen aktivoinnista, mutta vain silloin, kun itse tilaus todistettavasti ei toimi.',
          '”Ei toimi” tarkoittaa: YKSIKÄÄN kanava ei toimi EIKÄ yksikään elokuva tai sarja toimi — ei yksi kanava, ei yksi elokuva, ei yksi kategoria.',
          'Vian on oltava tilauksessa (palvelimissamme tai linjassamme), ei sovelluksessasi, laitteessasi, internetyhteydessäsi tai verkkoasetuksissasi.',
        ],
      },
      {
        title: '2. Milloin hyvitys EI ole voimassa?',
        body: [
          'Kun ongelma on sovelluksessa, laitteessa, älytelevisiossa, digiboksissa, reitittimessä tai internetyhteydessä.',
          'Kun vain osa tarjonnasta ei toimi (esimerkiksi yksi kanava, yksi ottelu, yksi elokuva tai yksi kategoria).',
          'Kun tilaus ei yksinkertaisesti miellytä sinua, muutat mieltäsi tai suosit toista palveluntarjoajaa. Maku tai mieltymys ei ole tekninen vika.',
          'Kun kieltäydyt osallistumasta vianmääritykseen (kuvakaappaus, testaus toisella laitteella, testaus toisessa verkossa).',
          'Kun kirjautumistiedot on jaettu kolmansille osapuolille tai niitä on käytetty useammalla laitteella kuin tilauksesi sallii.',
          'Emme vastaa ongelmista, jotka ovat tilauksen ulkopuolella.',
        ],
      },
      {
        title: '3. Sovellus ei sisälly',
        body: [
          'Toimitamme ainoastaan tilauksen (linjan ja kirjautumistiedot) — emme sovellusta.',
          'Toisto-ohjelman tai sovelluksen ostat tai aktivoit itse. Osa sovelluksista on ilmaisia, osa perii pienen kertamaksun kehittäjälle. Nämä kulut ovat erillisiä meillä olevasta tilauksestasi.',
          'Tilauksemme on yhteensopiva käytännössä kaikkien IPTV-soittimien kanssa, muun muassa: HotPlayer, IBO Player (ja IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi ja mikä tahansa muu soitin, joka tukee Xtream Codesia tai M3U:ta.',
          'Tukemme auttaa sinua maksutta valitsemasi sovelluksen asennuksessa ja asetuksissa.',
        ],
      },
      {
        title: '4. Maksaminen ja tilausprosessi',
        body: [
          'Koko tilausprosessi hoidetaan WhatsAppin kautta. Otat yhteyttä tukeemme, ja he opastavat sinua vaihe vaiheelta.',
          'Maksu tapahtuu pääasiassa tilisiirrolla — tämä tapa on aina käytettävissä.',
          'Muut maksutavat eivät ole pysyvästi käytettävissä. Tukemme kertoo, mitkä vaihtoehdot ovat sillä hetkellä auki.',
          'Hintamme ovat kohtuulliset ja kiinteät: ei piilokuluja, ei automaattista uusiutumista, ei hiljaisesti jatkuvaa sopimusta.',
        ],
      },
      {
        title: '5. Lasku ja sopimus maksun jälkeen',
        body: [
          'Kun maksusi on saapunut, lähetämme sinulle laskun tai sopimuksen — tekstiviestinä tai PDF-tiedostona.',
          'Siinä ovat kaikki tilauksesi tiedot: alkamispäivä, päättymispäivä, kesto ilmaiskuukaudet mukaan lukien, laitteiden määrä, maksettu summa ja kirjautumistietosi.',
          'Säilytä tämä asiakirja. Se toimii todisteenasi kaikissa uusimista, tukea tai hyvitystä koskevissa kysymyksissä.',
        ],
      },
      {
        title: '6. Suosittele asiakasta — saat ilmaisia kuukausia',
        body: [
          'Jos suosittelet meitä jollekin ja tämä henkilö tekee tilauksen, palkitsemme sinut ilmaisilla kuukausilla omaan tilaukseesi.',
          'Ostaako suosittelemasi asiakas 12 + 3 kuukauden paketin? Silloin saat 1 kuukauden ilmaiseksi.',
          'Ostaako hän 24 + 6 kuukauden paketin? Silloin saat 2 kuukautta ilmaiseksi.',
          'Tämä koskee sekä yhden että kahden laitteen tilauksia, eikä rajaa ole: jokainen tuomasi uusi asiakas lasketaan mukaan.',
          'Pyydä uutta asiakasta mainitsemaan nimesi tai numerosi tilauksen yhteydessä, tai ilmoita siitä itse WhatsAppissa.',
        ],
      },
      {
        title: '7. Kuukausittaiset kampanjat & WhatsApp-kanavamme',
        body: [
          'Joka kuukausi tarjoamme kampanjoita ja määräaikaisia etuja eri paketeille.',
          'Seuraa meitä sosiaalisessa mediassa — ja ennen kaikkea WhatsApp-kanavallamme — niin näet tarjoukset ensimmäisenä.',
          'WhatsApp-kanavalla ilmoitamme myös kaikista päivityksistä, suunnitelluista huoltotöistä ja vikojen korjauksista, jotta tiedät aina, mitä on tekeillä.',
          'Kanavan tilaaminen on ilmaista ja täysin sitoumuksetonta.',
        ],
      },
      {
        title: '8. Häiriö tai yhteysvirhe?',
        body: [
          'Saatko yhteysvirheen tai pätkiikö palvelin? Ei hätää — ota vain yhteyttä tukeen.',
          'Huolto ja korjaukset tehdään viikoittain, joten ongelmat ratkeavat nopeasti ja pysyvästi.',
          'Useimmissa tapauksissa tuki auttaa sinut heti eteenpäin toisella palvelimella tai muutetulla asetuksella ilman, että sinun tarvitsee tehdä mitään.',
        ],
      },
      {
        title: '9. Asiakaspalvelu ympäri vuorokauden',
        body: [
          'Tukemme on tavoitettavissa 24 tuntia vuorokaudessa, 7 päivänä viikossa WhatsAppin kautta.',
          'Ennen kuin hyvityksestä voidaan edes puhua, saat aina ensin teknistä tukea: testaamme linjan, tarkistamme palvelimen ja autamme asennuksessa.',
          'Ylivoimaisesti useimmissa tapauksissa ongelma ratkeaa muutamassa minuutissa toisella sovelluksella, toisella palvelimella tai oikealla asetuksella.',
        ],
      },
      {
        title: '10. Jatkuvat päivitykset',
        body: [
          'Kanavatarjontaa ja palvelimia ylläpidetään ja päivitetään jatkuvasti ilman lisäkuluja sinulle.',
          'VOD-kirjasto (elokuvat ja sarjat) päivitetään neljännesvuosittain — neljä päivitystä vuodessa.',
          'Uudet kanavat, uudet kategoriat ja lähetyslaadun parannukset lisätään automaattisesti nykyiseen tilaukseesi.',
        ],
      },
      {
        title: '11. Elokuvat pyynnöstä',
        body: [
          'Puuttuuko kirjastosta elokuva tai sarja? Voit pyytää sitä meiltä WhatsAppin kautta.',
          'Pyynnöt otetaan mukaan seuraavaan neljännesvuosipäivitykseen, joten odotusaikaa on seuraavaan päivityskierrokseen asti.',
          'Teemme parhaamme, mutta emme voi taata, että jokainen pyydetty nimike tulee saataville.',
        ],
      },
      {
        title: '12. Saksankielinen ääni ja tekstitys',
        body: [
          'Kaikkia elokuvia ja sarjoja ei ole saatavilla saksankielisellä äänellä (dubbaus).',
          'Suuri osa kansainvälisestä sisällöstä tarjotaan alkuperäiskielellä (yleensä englanniksi) lähteestä riippuen.',
          'Saksankielinen tekstitys on saatavilla monille nimikkeille, mutta ei koko luetteloon.',
          'Kaikki saksalaiset kanavat ja saksalainen sisältö lähetetään luonnollisesti saksaksi.',
          'Saksankielisen äänen tai tekstityksen puuttuminen yksittäisestä nimikkeestä ei ole tekninen vika eikä oikeuta hyvitykseen.',
        ],
      },
      {
        title: '13. Sinun vastuusi',
        body: [
          'Vaaditaan vakaa internetyhteys, vähintään 25 Mbit/s (4K/8K:lle suositellaan 50 Mbit/s tai enemmän).',
          'Vastaat itse laitteistostasi, sovelluksestasi ja verkostasi.',
          'Kirjautumistietojen jakaminen johtaa välittömään sulkemiseen ilman hyvitystä.',
          'Palvelu on tarkoitettu yksinomaan yksityiseen käyttöön kotitaloudessa.',
        ],
      },
      {
        title: '14. Miten hyvitystä haetaan?',
        body: [
          'Ota yhteyttä WhatsAppin kautta 15 päivän kuluessa aktivoinnista.',
          'Ilmoita tilausnumerosi, käyttämäsi laite ja käyttämäsi sovellus.',
          'Liitä mukaan lyhyt video tai kuvakaappaus, josta näkyy, ettei yksikään kanava eikä yksikään elokuva toistu.',
          'Kun tekninen osastomme on vahvistanut asian, summa palautetaan samalle maksutavalle 5–10 arkipäivän kuluessa.',
        ],
      },
    ],
    ctaHeading: 'Vielä kysyttävää?',
    ctaText: 'Asiakaspalvelumme on tavoitettavissa ympäri vuorokauden ja vastaa yleensä muutamassa minuutissa. Tilaamisen, maksamisen ja asennuksen hoidamme yhdessä kanssasi WhatsAppissa.',
    ctaButton: 'Ota yhteyttä WhatsAppissa',
    waText: 'Hei, minulla on kysymys ehdoista ja hyvityksestä.',
    updated: 'Viimeksi päivitetty: syyskuu 2026. Tekemällä tilauksen ilmoitat hyväksyväsi yllä olevat ehdot.',
  },
  ar: {
    eyebrow: 'حماية العميل',
    title1: 'الشروط و',
    title2: 'حماية العميل',
    intro: 'نحن شفافون تماماً بشأن ما يمكنك وما لا يمكنك توقّعه من اشتراك NERO IPTV. اقرأ هذا قبل الطلب — لتعرف بالضبط ما الذي تحصل عليه.',
    chips: ['ضمان 15 يوماً', 'دعم على مدار الساعة', 'صيانة أسبوعية', 'أسعار ثابتة'],
    summary: 'باختصار: استرداد المال خلال 15 يوماً إذا كان الاشتراك لا يعمل فعلاً (كل القنوات وكل الأفلام)، ودعم على مدار الساعة، وتحديثات دائمة، وصيانة أسبوعية. يتم الطلب والدفع عبر واتساب؛ تطبيق المشغّل غير مشمول. وعن كل عميل تُحيله إلينا تحصل على أشهر مجانية.',
    sections: [
      {
        title: '1. ضمان استرداد المال — 15 يوماً',
        body: [
          'يحق لك استرداد كامل خلال 15 يوماً من تفعيل اشتراكك، وذلك فقط عندما يثبت أن الاشتراك نفسه لا يعمل.',
          '«لا يعمل» تعني: لا تعمل أي قناة ولا يعمل أي فيلم أو مسلسل — وليس قناة واحدة، ولا فيلماً واحداً، ولا فئة واحدة.',
          'يجب أن يكون العطل في الاشتراك (خوادمنا أو خطنا)، لا في تطبيقك أو جهازك أو اتصالك بالإنترنت أو إعدادات شبكتك.',
        ],
      },
      {
        title: '2. متى لا ينطبق الاسترداد؟',
        body: [
          'عندما تكون المشكلة في التطبيق أو الجهاز أو التلفزيون الذكي أو جهاز الاستقبال أو الراوتر أو الاتصال بالإنترنت.',
          'عندما لا يعمل جزء فقط من المحتوى (مثل قناة واحدة أو مباراة واحدة أو فيلم واحد أو فئة واحدة).',
          'عندما لا يعجبك الاشتراك ببساطة، أو تغيّر رأيك، أو تفضّل مزوّداً آخر. الذوق أو التفضيل ليس عطلاً تقنياً.',
          'عندما ترفض التعاون في التشخيص (لقطة شاشة، اختبار على جهاز ثانٍ، اختبار على شبكة أخرى).',
          'عندما تكون بيانات الدخول قد شورِكت مع أطراف أخرى أو استُخدمت على أجهزة أكثر مما يسمح به اشتراكك.',
          'لسنا مسؤولين عن المشكلات التي تقع خارج نطاق الاشتراك.',
        ],
      },
      {
        title: '3. التطبيق غير مشمول',
        body: [
          'نحن نوفّر الاشتراك فقط (الخط وبيانات الدخول) — لا التطبيق.',
          'أما المشغّل أو التطبيق فتشتريه أو تفعّله بنفسك. بعض التطبيقات مجانية، وبعضها يطلب رسماً بسيطاً لمرة واحدة يُدفع للمطوّر. وهذه التكلفة منفصلة عن اشتراكك لدينا.',
          'اشتراكنا متوافق مع جميع مشغّلات IPTV تقريباً، ومنها: HotPlayer وIBO Player (وIBO Pro) وIPTV Smarters / Smarters Pro وTiviMate وFlix IPTV وDuplex Play وNet IPTV وXCIPTV وTelevizo وKodi، وأي مشغّل آخر يدعم Xtream Codes أو M3U.',
          'يساعدك دعمنا مجاناً في تثبيت التطبيق الذي تختاره وضبط إعداداته.',
        ],
      },
      {
        title: '4. الدفع وعملية الطلب',
        body: [
          'تتم عملية الطلب بالكامل عبر واتساب. تتواصل مع فريق الدعم لدينا وهم يرشدونك خطوة بخطوة.',
          'يتم الدفع بشكل أساسي عبر التحويل البنكي — وهذه الطريقة متاحة دائماً.',
          'طرق الدفع الأخرى ليست متاحة بشكل دائم. وسيخبرك فريق الدعم بالخيارات المتاحة في تلك اللحظة.',
          'أسعارنا معقولة وثابتة: لا رسوم خفية، ولا تجديد تلقائي، ولا عقد يستمر ضمنياً.',
        ],
      },
      {
        title: '5. الفاتورة والعقد بعد الدفع',
        body: [
          'بعد استلام دفعتك نرسل إليك فاتورة أو عقداً — كرسالة نصية أو كملف PDF.',
          'ويتضمّن كل بيانات اشتراكك: تاريخ البدء وتاريخ الانتهاء والمدة شاملةً الأشهر المجانية وعدد الأجهزة والمبلغ المدفوع وبيانات الدخول الخاصة بك.',
          'احتفظ بهذا المستند. فهو دليلك عند أي استفسار بخصوص التجديد أو الدعم أو الاسترداد.',
        ],
      },
      {
        title: '6. أحِل عميلاً واحصل على أشهر مجانية',
        body: [
          'إذا رشّحتنا لشخص ما واشترك ذلك الشخص لدينا، نكافئك بأشهر مجانية تُضاف إلى اشتراكك أنت.',
          'هل اشترى العميل الذي أحلته باقة 12 + 3 أشهر؟ عندئذٍ تحصل على شهر مجاني واحد.',
          'وهل اشترى باقة 24 + 6 أشهر؟ عندئذٍ تحصل على شهرين مجاناً.',
          'ينطبق هذا على اشتراكات الجهاز الواحد والجهازين معاً، ولا يوجد حد أقصى: كل عميل جديد تُحضره يُحتسب.',
          'اطلب من العميل الجديد ذكر اسمك أو رقمك عند الطلب، أو أبلغنا بنفسك عبر واتساب.',
        ],
      },
      {
        title: '7. عروض شهرية وقناتنا على واتساب',
        body: [
          'في كل شهر نطرح عروضاً ترويجية وعروضاً مؤقتة على باقات مختلفة.',
          'تابعنا على وسائل التواصل الاجتماعي — وقبل كل شيء على قناتنا في واتساب — لتكون أول من يرى هذه العروض.',
          'وعلى قناة واتساب نعلن أيضاً كل التحديثات وأعمال الصيانة المجدولة وإصلاح الأعطال، لتبقى دائماً على اطلاع.',
          'الاشتراك في القناة مجاني ودون أي التزام.',
        ],
      },
      {
        title: '8. عطل أو خطأ في الاتصال؟',
        body: [
          'هل ظهر لك خطأ في الاتصال أو تقطّع الخادم؟ لا داعي للقلق — تواصل ببساطة مع الدعم.',
          'تتم الصيانة والإصلاحات أسبوعياً، لذا تُحلّ المشكلات بسرعة وبشكل جذري.',
          'في معظم الحالات يساعدك الدعم فوراً بخادم آخر أو بإعداد معدّل، دون أن تضطر إلى فعل أي شيء.',
        ],
      },
      {
        title: '9. خدمة عملاء على مدار الساعة',
        body: [
          'يمكن الوصول إلى دعمنا 24 ساعة في اليوم، 7 أيام في الأسبوع عبر واتساب.',
          'وقبل أن يكون هناك حديث عن أي استرداد، تحصل دائماً على دعم تقني أولاً: نختبر الخط ونتحقق من الخادم ونساعد في التثبيت.',
          'وفي الغالبية العظمى من الحالات تُحلّ المشكلة خلال دقائق عبر تطبيق آخر أو خادم آخر أو إعداد صحيح.',
        ],
      },
      {
        title: '10. تحديثات دائمة',
        body: [
          'تُصان باقة القنوات والخوادم وتُحدَّث باستمرار، دون أي تكلفة إضافية عليك.',
          'وتُحدَّث مكتبة VOD (الأفلام والمسلسلات) كل ثلاثة أشهر — أربعة تحديثات في السنة.',
          'وتُضاف القنوات الجديدة والفئات الجديدة وتحسينات جودة البث تلقائياً إلى اشتراكك الحالي.',
        ],
      },
      {
        title: '11. أفلام عند الطلب',
        body: [
          'هل ينقص المكتبة فيلم أو مسلسل؟ يمكنك طلبه منا عبر واتساب.',
          'تُدرَج الطلبات في التحديث الفصلي التالي، أي أن هناك فترة انتظار حتى دورة التحديث القادمة.',
          'نبذل قصارى جهدنا، لكننا لا نستطيع ضمان توفّر كل عنوان مطلوب.',
        ],
      },
      {
        title: '12. الصوت والترجمة بالألمانية',
        body: [
          'ليست كل الأفلام والمسلسلات متاحة بصوت ألماني (دبلجة).',
          'يُقدَّم جزء كبير من المحتوى الدولي بلغته الأصلية (الإنجليزية غالباً)، حسب المصدر.',
          'الترجمة الألمانية متاحة لكثير من العناوين، لكن ليس للكتالوج بأكمله.',
          'أما جميع القنوات الألمانية والمحتوى الألماني فتُبثّ بالألمانية بطبيعة الحال.',
          'وغياب الصوت أو الترجمة الألمانية في عنوان بعينه ليس عطلاً تقنياً ولا يمنح حق الاسترداد.',
        ],
      },
      {
        title: '13. مسؤوليتك',
        body: [
          'يلزم اتصال إنترنت مستقر بسرعة 25 ميغابت/ث على الأقل (يُنصح بـ 50 ميغابت/ث أو أكثر لدقة 4K/8K).',
          'أنت مسؤول عن أجهزتك وتطبيقك وشبكتك.',
          'مشاركة بيانات الدخول تؤدي إلى الحظر الفوري دون استرداد.',
          'الخدمة مخصّصة حصراً للاستخدام الخاص داخل نطاق الأسرة.',
        ],
      },
      {
        title: '14. كيف تطلب الاسترداد؟',
        body: [
          'تواصل معنا عبر واتساب خلال 15 يوماً من التفعيل.',
          'اذكر رقم طلبك والجهاز المستخدم والتطبيق الذي تستعمله.',
          'أرفق مقطع فيديو قصيراً أو لقطة شاشة يظهر فيها أنه لا تعمل أي قناة ولا يعمل أي فيلم.',
          'وبعد تأكيد قسمنا التقني يُعاد المبلغ إلى وسيلة الدفع نفسها خلال 5 إلى 10 أيام عمل.',
        ],
      },
    ],
    ctaHeading: 'هل لديك أسئلة أخرى؟',
    ctaText: 'خدمة العملاء لدينا متاحة على مدار الساعة وترد عادةً خلال دقائق. ونتولّى معك الطلب والدفع والتثبيت عبر واتساب.',
    ctaButton: 'تواصل عبر واتساب',
    waText: 'مرحباً، لدي سؤال بخصوص الشروط والاسترداد.',
    updated: 'آخر تحديث: سبتمبر 2026. باشتراكك فإنك تُقرّ بموافقتك على الشروط الواردة أعلاه.',
  },
};

/** Terms copy for `lang`, falling back to English for a non-offered code. */
export function getTerms(lang: LangCode): TermsText {
  return (TERMS as Partial<Record<LangCode, TermsText>>)[lang] ?? TERMS.en;
}
