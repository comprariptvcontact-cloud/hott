import { LangCode } from "./i18n";
import { UiLang } from "./i18nExtra";

/**
 * The words of each customer review. Names, cities, avatars, ratings and dates
 * stay in Testimonials.tsx — only what is actually written by the reviewer is
 * translated, in the same r1…r9 order as the review list.
 */
export interface ReviewCopy {
  role: string;
  highlight: string;
  text: string;
}

const REVIEWS: Record<UiLang, ReviewCopy[]> = {
  nl: [
    {
      role: 'Voetbalfan',
      highlight: 'Bundesliga, Champions League, F1 — glashelder en zonder haperen!',
      text: 'Ik kijk elke Bundesliga-speelronde en alle Champions League-avonden in vlekkeloze kwaliteit. Geen buffering, geen bevriezing. PANDORA IPTV levert elke stream in topkwaliteit zonder geoblocking of VPN. Ik ga nooit meer terug naar mijn oude tv-pakket.',
    },
    {
      role: 'Serieliefhebber',
      highlight: 'Enorme VOD-bibliotheek — ik vind altijd iets nieuws!',
      text: 'De film- en seriecatalogus is ongelooflijk. Ik vond de nieuwste releases, Duitse films en klassiekers allemaal in echte UHD-kwaliteit. Netflix, HBO, Prime Video — alles zit in één abonnement.',
    },
    {
      role: 'Gezinsgebruiker',
      highlight: 'Het hele gezin blij — installatie duurde maar 2 minuten!',
      text: 'Mijn kinderen kijken tekenfilms op de Duitse jeugdzenders en zelf kijk ik graag Engelse series. We gebruiken twee apparaten tegelijk zonder problemen. De support reageerde binnen 5 minuten via WhatsApp. Uitstekende service.',
    },
    {
      role: 'IT-engineer',
      highlight: 'Technisch superieur — ik heb bitrate en latency zelf gemeten',
      text: 'Als softwareontwikkelaar heb ik de bitrate en serverlatency gemeten. Extreem lage ping, uitstekende compressie en een vrijwel verliesvrij beeld. Werkt vlekkeloos op Fire TV, Smart TV en tablet tegelijk.',
    },
    {
      role: 'Sportfan',
      highlight: 'Bundesliga, Premier League, F1 en MMA — allemaal op één plek!',
      text: 'Als sportliefhebber wil ik alles kunnen zien: Champions League, Premier League, Formule 1 en UFC. PANDORA IPTV levert alle streams in eersteklas kwaliteit zonder geoblocking of VPN. Onverslaanbaar.',
    },
    {
      role: 'Student',
      highlight: 'Beste prijs-kwaliteit — ik bespaar ruim €60 per maand',
      text: 'Ik betaalde apart voor Netflix, Disney+, RTL+ en Sky Sport — samen ruim €60 per maand. Nu heb ik alles met één PANDORA IPTV-abonnement voor een fractie van die prijs. Beste beslissing ooit.',
    },
    {
      role: 'Verpleegkundige',
      highlight: 'Werkt ook in het buitenland — ARD gekeken vanuit Spanje!',
      text: 'Ik was op vakantie in Spanje en wilde het Duitse journaal kijken. App geopend en de stream liep meteen — geen IP-beperkingen, geen VPN nodig. Een fantastische dienst die met je meereist door heel Europa.',
    },
    {
      role: 'Ondernemer',
      highlight: 'Het 12-maandenplan was duidelijk de slimste keuze',
      text: 'Ik begon met het proefabonnement van 3 maanden en was zo onder de indruk dat ik meteen ben overgestapt naar 12 maanden. De prijs is eerlijk, de dienst betrouwbaar en de bonusmaanden maken het nog aantrekkelijker. Echt een aanrader.',
    },
    {
      role: 'Lerares',
      highlight: 'Het kinderslot is precies wat ik nodig had!',
      text: "Mijn kinderen kunnen veilig hun eigen programma's kijken en ik weet zeker dat ze niet bij ongepaste content komen. Het aanbod aan kinderzenders is enorm. De activering was direct en de support is altijd vriendelijk. Zeer tevreden.",
    },
  ],
  en: [
    {
      role: 'Football fan',
      highlight: 'Bundesliga, Champions League, F1 — crystal clear and never stuttering!',
      text: 'I watch every Bundesliga matchday and all the Champions League nights in flawless quality. No buffering, no freezing. PANDORA IPTV delivers every stream in top quality without geo-blocking or a VPN. I am never going back to my old TV package.',
    },
    {
      role: 'Series lover',
      highlight: 'Enormous VOD library — I always find something new!',
      text: 'The movie and series catalogue is incredible. I found the latest releases, German films and classics, all in genuine UHD quality. Netflix, HBO, Prime Video — it is all in one subscription.',
    },
    {
      role: 'Family user',
      highlight: 'The whole family is happy — setup took only 2 minutes!',
      text: 'My children watch cartoons on the German kids channels and I like English series myself. We use two devices at the same time without any trouble. Support replied within 5 minutes on WhatsApp. Excellent service.',
    },
    {
      role: 'IT engineer',
      highlight: 'Technically superior — I measured the bitrate and latency myself',
      text: 'As a software developer I measured the bitrate and server latency. Extremely low ping, excellent compression and a virtually lossless picture. Runs flawlessly on Fire TV, smart TV and tablet at the same time.',
    },
    {
      role: 'Sports fan',
      highlight: 'Bundesliga, Premier League, F1 and MMA — all in one place!',
      text: 'As a sports lover I want to see everything: Champions League, Premier League, Formula 1 and UFC. PANDORA IPTV delivers every stream in first-class quality without geo-blocking or a VPN. Unbeatable.',
    },
    {
      role: 'Student',
      highlight: 'Best value for money — I save well over €60 a month',
      text: 'I was paying separately for Netflix, Disney+, RTL+ and Sky Sport — over €60 a month combined. Now I have everything in one PANDORA IPTV subscription for a fraction of that. Best decision ever.',
    },
    {
      role: 'Nurse',
      highlight: 'Works abroad too — I watched ARD from Spain!',
      text: 'I was on holiday in Spain and wanted to watch the German news. I opened the app and the stream started right away — no IP restrictions, no VPN needed. A fantastic service that travels with you across Europe.',
    },
    {
      role: 'Entrepreneur',
      highlight: 'The 12-month plan was clearly the smartest choice',
      text: 'I started with the 3-month trial subscription and was so impressed that I switched to 12 months straight away. The price is fair, the service reliable, and the bonus months make it even more attractive. Highly recommended.',
    },
    {
      role: 'Teacher',
      highlight: 'The parental lock is exactly what I needed!',
      text: 'My children can safely watch their own programmes and I know for sure they cannot reach inappropriate content. The range of kids channels is huge. Activation was instant and support is always friendly. Very satisfied.',
    },
  ],
  fr: [
    {
      role: 'Fan de football',
      highlight: "Bundesliga, Ligue des champions, F1 — d'une netteté parfaite et sans coupure !",
      text: "Je regarde chaque journée de Bundesliga et toutes les soirées de Ligue des champions dans une qualité irréprochable. Aucune mise en mémoire tampon, aucun gel. PANDORA IPTV diffuse chaque flux en très haute qualité, sans blocage géographique ni VPN. Je ne reviendrai jamais à mon ancien bouquet.",
    },
    {
      role: 'Passionnée de séries',
      highlight: 'Bibliothèque VOD énorme — je trouve toujours quelque chose de nouveau !',
      text: "Le catalogue de films et de séries est incroyable. J'y ai trouvé les dernières sorties, des films allemands et des classiques, tous en véritable qualité UHD. Netflix, HBO, Prime Video — tout est dans un seul abonnement.",
    },
    {
      role: 'Utilisateur familial',
      highlight: "Toute la famille est ravie — l'installation a pris seulement 2 minutes !",
      text: "Mes enfants regardent des dessins animés sur les chaînes jeunesse allemandes et moi j'aime les séries anglaises. Nous utilisons deux appareils en même temps sans le moindre problème. Le support a répondu en 5 minutes sur WhatsApp. Service excellent.",
    },
    {
      role: 'Ingénieur informatique',
      highlight: "Techniquement supérieur — j'ai mesuré moi-même le débit et la latence",
      text: "En tant que développeur, j'ai mesuré le débit et la latence des serveurs. Ping extrêmement bas, excellente compression et une image pratiquement sans perte. Fonctionne parfaitement sur Fire TV, TV connectée et tablette en même temps.",
    },
    {
      role: 'Fan de sport',
      highlight: 'Bundesliga, Premier League, F1 et MMA — tout au même endroit !',
      text: "Passionnée de sport, je veux tout pouvoir voir : Ligue des champions, Premier League, Formule 1 et UFC. PANDORA IPTV diffuse tous les flux dans une qualité de premier ordre, sans blocage géographique ni VPN. Imbattable.",
    },
    {
      role: 'Étudiant',
      highlight: "Meilleur rapport qualité-prix — j'économise plus de 60 € par mois",
      text: "Je payais séparément Netflix, Disney+, RTL+ et Sky Sport — plus de 60 € par mois au total. Maintenant j'ai tout avec un seul abonnement PANDORA IPTV pour une fraction de ce prix. La meilleure décision de ma vie.",
    },
    {
      role: 'Infirmière',
      highlight: "Fonctionne aussi à l'étranger — j'ai regardé l'ARD depuis l'Espagne !",
      text: "J'étais en vacances en Espagne et je voulais regarder le journal allemand. J'ai ouvert l'application et le flux a démarré immédiatement — aucune restriction d'IP, aucun VPN nécessaire. Un service fantastique qui vous suit dans toute l'Europe.",
    },
    {
      role: 'Entrepreneur',
      highlight: "L'offre de 12 mois était clairement le choix le plus malin",
      text: "J'ai commencé par l'abonnement d'essai de 3 mois et j'ai été si impressionné que je suis passé aux 12 mois immédiatement. Le prix est juste, le service fiable, et les mois offerts rendent l'offre encore plus intéressante. Je recommande vivement.",
    },
    {
      role: 'Enseignante',
      highlight: "Le contrôle parental est exactement ce qu'il me fallait !",
      text: "Mes enfants peuvent regarder leurs programmes en toute sécurité et je suis certaine qu'ils n'accèdent pas à des contenus inappropriés. Le choix de chaînes jeunesse est immense. L'activation a été immédiate et le support est toujours aimable. Très satisfaite.",
    },
  ],
  de: [
    {
      role: 'Fußballfan',
      highlight: 'Bundesliga, Champions League, F1 — gestochen scharf und ohne Ruckeln!',
      text: 'Ich schaue jeden Bundesliga-Spieltag und alle Champions-League-Abende in makelloser Qualität. Kein Puffern, kein Einfrieren. PANDORA IPTV liefert jeden Stream in Topqualität, ohne Geoblocking und ohne VPN. Zu meinem alten TV-Paket gehe ich nie zurück.',
    },
    {
      role: 'Serienliebhaberin',
      highlight: 'Riesige VOD-Bibliothek — ich finde immer etwas Neues!',
      text: 'Der Film- und Seriekatalog ist unglaublich. Ich habe die neuesten Veröffentlichungen, deutsche Filme und Klassiker gefunden, alle in echter UHD-Qualität. Netflix, HBO, Prime Video — alles in einem Abo.',
    },
    {
      role: 'Familiennutzer',
      highlight: 'Die ganze Familie ist zufrieden — die Einrichtung dauerte nur 2 Minuten!',
      text: 'Meine Kinder schauen Zeichentrickfilme auf den deutschen Kindersendern und ich selbst mag englische Serien. Wir nutzen zwei Geräte gleichzeitig ohne Probleme. Der Support hat innerhalb von 5 Minuten über WhatsApp geantwortet. Ausgezeichneter Service.',
    },
    {
      role: 'IT-Ingenieur',
      highlight: 'Technisch überlegen — ich habe Bitrate und Latenz selbst gemessen',
      text: 'Als Softwareentwickler habe ich Bitrate und Serverlatenz gemessen. Extrem niedriger Ping, hervorragende Komprimierung und ein praktisch verlustfreies Bild. Läuft einwandfrei auf Fire TV, Smart-TV und Tablet gleichzeitig.',
    },
    {
      role: 'Sportfan',
      highlight: 'Bundesliga, Premier League, F1 und MMA — alles an einem Ort!',
      text: 'Als Sportliebhaberin will ich alles sehen können: Champions League, Premier League, Formel 1 und UFC. PANDORA IPTV liefert alle Streams in erstklassiger Qualität, ohne Geoblocking und ohne VPN. Unschlagbar.',
    },
    {
      role: 'Student',
      highlight: 'Bestes Preis-Leistungs-Verhältnis — ich spare über 60 € im Monat',
      text: 'Ich habe getrennt für Netflix, Disney+, RTL+ und Sky Sport bezahlt — zusammen über 60 € im Monat. Jetzt habe ich alles in einem PANDORA IPTV-Abo zu einem Bruchteil des Preises. Die beste Entscheidung überhaupt.',
    },
    {
      role: 'Krankenpflegerin',
      highlight: 'Funktioniert auch im Ausland — ARD aus Spanien geschaut!',
      text: 'Ich war im Urlaub in Spanien und wollte die deutschen Nachrichten sehen. App geöffnet und der Stream lief sofort — keine IP-Beschränkungen, kein VPN nötig. Ein fantastischer Dienst, der in ganz Europa mitreist.',
    },
    {
      role: 'Unternehmer',
      highlight: 'Der 12-Monats-Tarif war eindeutig die klügste Wahl',
      text: 'Ich habe mit dem 3-Monats-Testabo angefangen und war so beeindruckt, dass ich sofort auf 12 Monate gewechselt bin. Der Preis ist fair, der Dienst zuverlässig, und die Bonusmonate machen es noch attraktiver. Klare Empfehlung.',
    },
    {
      role: 'Lehrerin',
      highlight: 'Die Kindersicherung ist genau das, was ich gebraucht habe!',
      text: 'Meine Kinder können sicher ihre eigenen Sendungen schauen und ich weiß genau, dass sie nicht an ungeeignete Inhalte kommen. Das Angebot an Kindersendern ist riesig. Die Aktivierung war sofort da und der Support ist immer freundlich. Sehr zufrieden.',
    },
  ],
  es: [
    {
      role: 'Aficionado al fútbol',
      highlight: 'Bundesliga, Champions League, F1: nítido y sin cortes.',
      text: 'Veo cada jornada de la Bundesliga y todas las noches de Champions con una calidad impecable. Sin almacenamiento en búfer ni congelaciones. PANDORA IPTV ofrece cada emisión en máxima calidad, sin bloqueo geográfico ni VPN. No pienso volver a mi antiguo paquete de televisión.',
    },
    {
      role: 'Amante de las series',
      highlight: 'Biblioteca VOD enorme: siempre encuentro algo nuevo.',
      text: 'El catálogo de películas y series es increíble. Encontré los últimos estrenos, cine alemán y clásicos, todo en auténtica calidad UHD. Netflix, HBO, Prime Video: todo en una sola suscripción.',
    },
    {
      role: 'Usuario familiar',
      highlight: 'Toda la familia contenta: la instalación duró solo 2 minutos.',
      text: 'Mis hijos ven dibujos en los canales infantiles alemanes y a mí me gustan las series inglesas. Usamos dos dispositivos a la vez sin ningún problema. El soporte respondió en 5 minutos por WhatsApp. Servicio excelente.',
    },
    {
      role: 'Ingeniero informático',
      highlight: 'Técnicamente superior: medí yo mismo el bitrate y la latencia.',
      text: 'Como desarrollador de software medí el bitrate y la latencia del servidor. Ping extremadamente bajo, excelente compresión y una imagen prácticamente sin pérdidas. Funciona a la perfección en Fire TV, smart TV y tableta a la vez.',
    },
    {
      role: 'Aficionada al deporte',
      highlight: 'Bundesliga, Premier League, F1 y MMA: todo en un mismo sitio.',
      text: 'Como amante del deporte quiero poder verlo todo: Champions League, Premier League, Fórmula 1 y UFC. PANDORA IPTV ofrece todas las emisiones con una calidad de primera, sin bloqueo geográfico ni VPN. Insuperable.',
    },
    {
      role: 'Estudiante',
      highlight: 'La mejor relación calidad-precio: ahorro más de 60 € al mes.',
      text: 'Pagaba por separado Netflix, Disney+, RTL+ y Sky Sport: más de 60 € al mes en total. Ahora lo tengo todo con una sola suscripción a PANDORA IPTV por una fracción de ese precio. La mejor decisión que he tomado.',
    },
    {
      role: 'Enfermera',
      highlight: 'También funciona en el extranjero: vi la ARD desde España.',
      text: 'Estaba de vacaciones en España y quería ver el telediario alemán. Abrí la aplicación y la emisión arrancó al instante: sin restricciones de IP y sin necesidad de VPN. Un servicio fantástico que te acompaña por toda Europa.',
    },
    {
      role: 'Empresario',
      highlight: 'El plan de 12 meses fue claramente la opción más inteligente.',
      text: 'Empecé con la suscripción de prueba de 3 meses y quedé tan impresionado que pasé a 12 meses de inmediato. El precio es justo, el servicio fiable y los meses de regalo lo hacen aún más atractivo. Muy recomendable.',
    },
    {
      role: 'Profesora',
      highlight: 'El control parental es justo lo que necesitaba.',
      text: 'Mis hijos pueden ver sus programas con seguridad y sé con certeza que no llegan a contenidos inapropiados. La oferta de canales infantiles es enorme. La activación fue inmediata y el soporte siempre es amable. Muy satisfecha.',
    },
  ],
  sv: [
    {
      role: 'Fotbollsfan',
      highlight: 'Bundesliga, Champions League, F1 — knivskarpt och utan hack!',
      text: 'Jag ser varje Bundesliga-omgång och alla Champions League-kvällar i felfri kvalitet. Ingen buffring, inga frysningar. PANDORA IPTV levererar varje sändning i toppkvalitet utan geoblockering eller VPN. Jag går aldrig tillbaka till mitt gamla tv-paket.',
    },
    {
      role: 'Serieälskare',
      highlight: 'Enormt VOD-bibliotek — jag hittar alltid något nytt!',
      text: 'Film- och seriekatalogen är otrolig. Jag hittade de senaste premiärerna, tyska filmer och klassiker, allt i äkta UHD-kvalitet. Netflix, HBO, Prime Video — allt ingår i ett enda abonnemang.',
    },
    {
      role: 'Familjeanvändare',
      highlight: 'Hela familjen är nöjd — installationen tog bara 2 minuter!',
      text: 'Mina barn ser tecknat på de tyska barnkanalerna och själv gillar jag engelska serier. Vi använder två enheter samtidigt utan problem. Supporten svarade inom 5 minuter på WhatsApp. Utmärkt service.',
    },
    {
      role: 'IT-ingenjör',
      highlight: 'Tekniskt överlägset — jag mätte bitrate och latens själv',
      text: 'Som mjukvaruutvecklare mätte jag bitrate och serverlatens. Extremt låg ping, utmärkt komprimering och en nästan förlustfri bild. Fungerar felfritt på Fire TV, smart-TV och surfplatta samtidigt.',
    },
    {
      role: 'Sportfan',
      highlight: 'Bundesliga, Premier League, F1 och MMA — allt på ett ställe!',
      text: 'Som sportälskare vill jag kunna se allt: Champions League, Premier League, Formel 1 och UFC. PANDORA IPTV levererar alla sändningar i förstklassig kvalitet utan geoblockering eller VPN. Oslagbart.',
    },
    {
      role: 'Student',
      highlight: 'Bäst prisvärt — jag sparar över 60 € i månaden',
      text: 'Jag betalade separat för Netflix, Disney+, RTL+ och Sky Sport — tillsammans över 60 € i månaden. Nu har jag allt i ett enda PANDORA IPTV-abonnemang för en bråkdel av priset. Bästa beslutet någonsin.',
    },
    {
      role: 'Sjuksköterska',
      highlight: 'Fungerar även utomlands — såg ARD från Spanien!',
      text: 'Jag var på semester i Spanien och ville se de tyska nyheterna. Jag öppnade appen och sändningen startade direkt — inga IP-begränsningar, inget VPN behövdes. En fantastisk tjänst som följer med genom hela Europa.',
    },
    {
      role: 'Företagare',
      highlight: '12-månaderspaketet var helt klart det smartaste valet',
      text: 'Jag började med provabonnemanget på 3 månader och blev så imponerad att jag bytte till 12 månader direkt. Priset är rimligt, tjänsten pålitlig och bonusmånaderna gör det ännu mer attraktivt. Rekommenderas varmt.',
    },
    {
      role: 'Lärare',
      highlight: 'Barnlåset är precis vad jag behövde!',
      text: 'Mina barn kan tryggt se sina egna program och jag vet säkert att de inte kommer åt olämpligt innehåll. Utbudet av barnkanaler är enormt. Aktiveringen skedde direkt och supporten är alltid trevlig. Mycket nöjd.',
    },
  ],
  no: [
    {
      role: 'Fotballfan',
      highlight: 'Bundesliga, Champions League, F1 — knivskarpt og uten hakking!',
      text: 'Jeg ser hver Bundesliga-runde og alle Champions League-kvelder i feilfri kvalitet. Ingen bufring, ingen frysing. PANDORA IPTV leverer hver sending i toppkvalitet uten geoblokkering eller VPN. Jeg går aldri tilbake til den gamle tv-pakken min.',
    },
    {
      role: 'Serieelsker',
      highlight: 'Enormt VOD-bibliotek — jeg finner alltid noe nytt!',
      text: 'Film- og seriekatalogen er utrolig. Jeg fant de nyeste utgivelsene, tyske filmer og klassikere, alt i ekte UHD-kvalitet. Netflix, HBO, Prime Video — alt ligger i ett abonnement.',
    },
    {
      role: 'Familiebruker',
      highlight: 'Hele familien er fornøyd — installasjonen tok bare 2 minutter!',
      text: 'Barna mine ser tegnefilm på de tyske barnekanalene, og selv liker jeg engelske serier. Vi bruker to enheter samtidig uten problemer. Supporten svarte innen 5 minutter på WhatsApp. Utmerket service.',
    },
    {
      role: 'IT-ingeniør',
      highlight: 'Teknisk overlegent — jeg målte bitrate og latens selv',
      text: 'Som programvareutvikler målte jeg bitrate og serverlatens. Ekstremt lav ping, utmerket komprimering og et nesten tapsfritt bilde. Fungerer feilfritt på Fire TV, smart-TV og nettbrett samtidig.',
    },
    {
      role: 'Sportsfan',
      highlight: 'Bundesliga, Premier League, F1 og MMA — alt på ett sted!',
      text: 'Som sportselsker vil jeg kunne se alt: Champions League, Premier League, Formel 1 og UFC. PANDORA IPTV leverer alle sendinger i førsteklasses kvalitet uten geoblokkering eller VPN. Uslåelig.',
    },
    {
      role: 'Student',
      highlight: 'Best verdi for pengene — jeg sparer godt over 60 € i måneden',
      text: 'Jeg betalte separat for Netflix, Disney+, RTL+ og Sky Sport — til sammen over 60 € i måneden. Nå har jeg alt i ett PANDORA IPTV-abonnement for en brøkdel av prisen. Den beste avgjørelsen jeg har tatt.',
    },
    {
      role: 'Sykepleier',
      highlight: 'Fungerer også i utlandet — så ARD fra Spania!',
      text: 'Jeg var på ferie i Spania og ville se de tyske nyhetene. Jeg åpnet appen og sendingen startet med en gang — ingen IP-begrensninger, ingen VPN nødvendig. En fantastisk tjeneste som blir med deg gjennom hele Europa.',
    },
    {
      role: 'Gründer',
      highlight: '12-månedersplanen var klart det smarteste valget',
      text: 'Jeg startet med prøveabonnementet på 3 måneder og ble så imponert at jeg gikk over til 12 måneder med en gang. Prisen er rettferdig, tjenesten pålitelig, og bonusmånedene gjør det enda mer attraktivt. Anbefales sterkt.',
    },
    {
      role: 'Lærer',
      highlight: 'Barnesikringen er akkurat det jeg trengte!',
      text: 'Barna mine kan trygt se sine egne programmer, og jeg vet sikkert at de ikke kommer til upassende innhold. Utvalget av barnekanaler er enormt. Aktiveringen var umiddelbar og supporten er alltid vennlig. Svært fornøyd.',
    },
  ],
  da: [
    {
      role: 'Fodboldfan',
      highlight: 'Bundesliga, Champions League, F1 — knivskarpt og uden hak!',
      text: 'Jeg ser hver Bundesliga-runde og alle Champions League-aftener i fejlfri kvalitet. Ingen buffering, ingen frysning. PANDORA IPTV leverer hver udsendelse i topkvalitet uden geoblokering eller VPN. Jeg vender aldrig tilbage til min gamle tv-pakke.',
    },
    {
      role: 'Serieelsker',
      highlight: 'Enormt VOD-bibliotek — jeg finder altid noget nyt!',
      text: 'Film- og seriekataloget er utroligt. Jeg fandt de nyeste udgivelser, tyske film og klassikere, alt sammen i ægte UHD-kvalitet. Netflix, HBO, Prime Video — det hele ligger i ét abonnement.',
    },
    {
      role: 'Familiebruger',
      highlight: 'Hele familien er glad — installationen tog kun 2 minutter!',
      text: 'Mine børn ser tegnefilm på de tyske børnekanaler, og selv kan jeg lide engelske serier. Vi bruger to enheder samtidig uden problemer. Supporten svarede inden for 5 minutter på WhatsApp. Fremragende service.',
    },
    {
      role: 'IT-ingeniør',
      highlight: 'Teknisk overlegent — jeg målte selv bitrate og latenstid',
      text: 'Som softwareudvikler målte jeg bitrate og serverlatenstid. Ekstremt lav ping, fremragende komprimering og et praktisk talt tabsfrit billede. Kører fejlfrit på Fire TV, smart-TV og tablet på samme tid.',
    },
    {
      role: 'Sportsfan',
      highlight: 'Bundesliga, Premier League, F1 og MMA — alt sammen ét sted!',
      text: 'Som sportselsker vil jeg kunne se det hele: Champions League, Premier League, Formel 1 og UFC. PANDORA IPTV leverer alle udsendelser i førsteklasses kvalitet uden geoblokering eller VPN. Uovertruffent.',
    },
    {
      role: 'Studerende',
      highlight: 'Bedste værdi for pengene — jeg sparer over 60 € om måneden',
      text: 'Jeg betalte separat for Netflix, Disney+, RTL+ og Sky Sport — tilsammen over 60 € om måneden. Nu har jeg det hele i ét PANDORA IPTV-abonnement for en brøkdel af prisen. Den bedste beslutning nogensinde.',
    },
    {
      role: 'Sygeplejerske',
      highlight: 'Virker også i udlandet — så ARD fra Spanien!',
      text: 'Jeg var på ferie i Spanien og ville se de tyske nyheder. Jeg åbnede appen, og streamen kørte med det samme — ingen IP-begrænsninger, intet VPN nødvendigt. En fantastisk tjeneste, der rejser med dig gennem hele Europa.',
    },
    {
      role: 'Iværksætter',
      highlight: '12-måneders planen var klart det klogeste valg',
      text: 'Jeg startede med prøveabonnementet på 3 måneder og var så imponeret, at jeg skiftede til 12 måneder med det samme. Prisen er rimelig, tjenesten pålidelig, og bonusmånederne gør det endnu mere attraktivt. Kan varmt anbefales.',
    },
    {
      role: 'Lærer',
      highlight: 'Børnesikringen er præcis det, jeg havde brug for!',
      text: 'Mine børn kan trygt se deres egne programmer, og jeg ved med sikkerhed, at de ikke kan nå upassende indhold. Udvalget af børnekanaler er enormt. Aktiveringen var øjeblikkelig, og supporten er altid venlig. Meget tilfreds.',
    },
  ],
  fi: [
    {
      role: 'Jalkapallofani',
      highlight: 'Bundesliiga, Mestarien liiga, F1 — kristallinkirkasta ja nykimättä!',
      text: 'Katson jokaisen Bundesliiga-kierroksen ja kaikki Mestarien liigan illat moitteettomalla laadulla. Ei puskurointia, ei jumittumista. PANDORA IPTV toimittaa jokaisen lähetyksen huippulaadulla ilman aluerajoituksia tai VPN:ää. En palaa enää koskaan vanhaan tv-pakettiini.',
    },
    {
      role: 'Sarjojen ystävä',
      highlight: 'Valtava VOD-kirjasto — löydän aina jotain uutta!',
      text: 'Elokuva- ja sarjavalikoima on uskomaton. Löysin uusimmat julkaisut, saksalaiset elokuvat ja klassikot, kaikki aitona UHD-laatuna. Netflix, HBO, Prime Video — kaikki sisältyy yhteen tilaukseen.',
    },
    {
      role: 'Perhekäyttäjä',
      highlight: 'Koko perhe tyytyväinen — asennus kesti vain 2 minuuttia!',
      text: 'Lapseni katsovat piirrettyjä saksalaisilta lastenkanavilta ja itse pidän englanninkielisistä sarjoista. Käytämme kahta laitetta yhtä aikaa ilman ongelmia. Tuki vastasi 5 minuutissa WhatsAppissa. Erinomaista palvelua.',
    },
    {
      role: 'IT-insinööri',
      highlight: 'Teknisesti ylivoimainen — mittasin bittinopeuden ja viiveen itse',
      text: 'Ohjelmistokehittäjänä mittasin bittinopeuden ja palvelinviiveen. Erittäin matala ping, erinomainen pakkaus ja käytännössä häviötön kuva. Toimii moitteettomasti Fire TV:llä, älytelevisiossa ja tabletilla yhtä aikaa.',
    },
    {
      role: 'Urheilufani',
      highlight: 'Bundesliiga, Valioliiga, F1 ja MMA — kaikki yhdessä paikassa!',
      text: 'Urheilun ystävänä haluan nähdä kaiken: Mestarien liigan, Valioliigan, Formula 1:n ja UFC:n. PANDORA IPTV toimittaa kaikki lähetykset ensiluokkaisella laadulla ilman aluerajoituksia tai VPN:ää. Lyömätöntä.',
    },
    {
      role: 'Opiskelija',
      highlight: 'Paras hinta-laatusuhde — säästän yli 60 € kuukaudessa',
      text: 'Maksoin erikseen Netflixistä, Disney+:sta, RTL+:sta ja Sky Sportista — yhteensä yli 60 € kuukaudessa. Nyt saan kaiken yhdellä PANDORA IPTV -tilauksella murto-osalla siitä hinnasta. Paras päätös ikinä.',
    },
    {
      role: 'Sairaanhoitaja',
      highlight: 'Toimii myös ulkomailla — katsoin ARD:ta Espanjasta!',
      text: 'Olin lomalla Espanjassa ja halusin katsoa saksalaiset uutiset. Avasin sovelluksen ja lähetys alkoi heti — ei IP-rajoituksia, ei VPN:n tarvetta. Loistava palvelu, joka matkustaa mukana koko Euroopassa.',
    },
    {
      role: 'Yrittäjä',
      highlight: '12 kuukauden paketti oli selvästi fiksuin valinta',
      text: 'Aloitin 3 kuukauden kokeilutilauksesta ja vaikutuin niin, että vaihdoin heti 12 kuukauteen. Hinta on reilu, palvelu luotettava ja bonuskuukaudet tekevät siitä vielä houkuttelevamman. Suosittelen lämpimästi.',
    },
    {
      role: 'Opettaja',
      highlight: 'Lapsilukko on juuri sitä, mitä tarvitsin!',
      text: 'Lapseni voivat katsoa omia ohjelmiaan turvallisesti, ja tiedän varmasti, etteivät he pääse sopimattomaan sisältöön. Lastenkanavien valikoima on valtava. Aktivointi tapahtui heti ja tuki on aina ystävällinen. Erittäin tyytyväinen.',
    },
  ],
  ar: [
    {
      role: 'مشجع كرة قدم',
      highlight: 'الدوري الألماني ودوري الأبطال والفورمولا 1 — صورة نقية بلا تقطيع!',
      text: 'أشاهد كل جولة من الدوري الألماني وجميع أمسيات دوري الأبطال بجودة لا تشوبها شائبة. لا تخزين مؤقت ولا تجمّد للصورة. يقدّم PANDORA IPTV كل بث بأعلى جودة دون حظر جغرافي ودون VPN. لن أعود أبداً إلى باقتي التلفزيونية القديمة.',
    },
    {
      role: 'محبّة للمسلسلات',
      highlight: 'مكتبة VOD ضخمة — أجد دائماً شيئاً جديداً!',
      text: 'كتالوج الأفلام والمسلسلات لا يُصدَّق. وجدت أحدث الإصدارات والأفلام الألمانية والكلاسيكيات، جميعها بجودة UHD حقيقية. Netflix وHBO وPrime Video — كل ذلك في اشتراك واحد.',
    },
    {
      role: 'مستخدم عائلي',
      highlight: 'العائلة كلها سعيدة — لم يستغرق التثبيت سوى دقيقتين!',
      text: 'يشاهد أطفالي الرسوم المتحركة على قنوات الأطفال الألمانية، وأنا أفضّل المسلسلات الإنجليزية. نستخدم جهازين في الوقت نفسه دون أي مشكلة. ردّ فريق الدعم خلال 5 دقائق عبر واتساب. خدمة ممتازة.',
    },
    {
      role: 'مهندس تقنية معلومات',
      highlight: 'تفوّق تقني — قِستُ معدل البت وزمن الاستجابة بنفسي',
      text: 'بصفتي مطوّر برمجيات، قِستُ معدل البت وزمن استجابة الخوادم. زمن استجابة منخفض للغاية وضغط ممتاز وصورة شبه خالية من الفقد. يعمل بلا عيوب على Fire TV والتلفزيون الذكي والجهاز اللوحي في آنٍ واحد.',
    },
    {
      role: 'مشجعة رياضية',
      highlight: 'الدوري الألماني والبريميرليغ والفورمولا 1 وفنون القتال المختلطة — كلها في مكان واحد!',
      text: 'كمحبّة للرياضة أريد أن أشاهد كل شيء: دوري الأبطال والبريميرليغ والفورمولا 1 وUFC. يقدّم PANDORA IPTV كل البثوث بجودة من الطراز الأول دون حظر جغرافي ودون VPN. لا يُضاهى.',
    },
    {
      role: 'طالب',
      highlight: 'أفضل قيمة مقابل السعر — أوفّر أكثر من 60 يورو شهرياً',
      text: 'كنت أدفع بشكل منفصل لـ Netflix وDisney+ وRTL+ وSky Sport — أكثر من 60 يورو شهرياً مجتمعة. الآن أحصل على كل شيء باشتراك PANDORA IPTV واحد بجزء بسيط من ذلك السعر. أفضل قرار على الإطلاق.',
    },
    {
      role: 'ممرضة',
      highlight: 'يعمل في الخارج أيضاً — شاهدت ARD من إسبانيا!',
      text: 'كنت في عطلة في إسبانيا وأردت متابعة نشرة الأخبار الألمانية. فتحت التطبيق وبدأ البث فوراً — دون قيود على عنوان IP ودون الحاجة إلى VPN. خدمة رائعة ترافقك في أنحاء أوروبا كلها.',
    },
    {
      role: 'رائد أعمال',
      highlight: 'باقة 12 شهراً كانت بوضوح الخيار الأذكى',
      text: 'بدأت باشتراك تجريبي لثلاثة أشهر، وأُعجبت كثيراً حتى انتقلت فوراً إلى 12 شهراً. السعر عادل والخدمة موثوقة، والأشهر المجانية تجعل العرض أكثر جاذبية. أنصح به بشدة.',
    },
    {
      role: 'معلّمة',
      highlight: 'الرقابة الأبوية هي بالضبط ما كنت أحتاجه!',
      text: 'يستطيع أطفالي مشاهدة برامجهم بأمان، وأنا واثقة من أنهم لا يصلون إلى محتوى غير مناسب. تشكيلة قنوات الأطفال هائلة. كان التفعيل فورياً وفريق الدعم ودود دائماً. راضية جداً.',
    },
  ],
};

/** Review copy for `lang`, falling back to English for a non-offered code. */
export function getReviews(lang: LangCode): ReviewCopy[] {
  return (REVIEWS as Partial<Record<LangCode, ReviewCopy[]>>)[lang] ?? REVIEWS.en;
}
