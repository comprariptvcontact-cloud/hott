export interface MovieItem {
  id: string;
  title: string;
  category: "movies" | "shows" | "sports" | "documentaries";
  rating: string;
  year: string;
  genre: string;
  duration: string;
  image: string;
  badge?: string;
  quality: "8K UHD" | "1080p Full HD";
}

export interface ChannelItem {
  id: string;
  name: string;
  category: "Sports" | "Entertainment" | "Movies" | "News" | "Kids" | "Local";
  country: string;
  logoColor: string;
  logoText: string;
}

/** WhatsApp contact number in wa.me form (international, no + or spaces). */
export const WA_NUMBER = "447462229301";

export interface PricingPlan {
  id: string;
  durationMonths: number;
  freeMonths?: number;
  name: string;
  price: number;
  originalPrice: number;
  discountPct?: number;
  popular: boolean;
  savings: string;
  devices: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  ratingValue: number;
  highlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const INITIAL_MOVIES: MovieItem[] = [
  {
    id: "m1",
    title: "Dune: Part Two",
    category: "movies",
    rating: "9.1",
    year: "2024",
    genre: "Sci-Fi / Abenteuer",
    duration: "2 Std. 46 Min.",
    image: "/movies/dune_part_two_ver2_xxlg.jpg",
    quality: "8K UHD",
  },
  {
    id: "m9",
    title: "Oppenheimer",
    category: "movies",
    rating: "8.8",
    year: "2023",
    genre: "Biopic / Drama",
    duration: "3 Std.",
    image: "/movies/oppenheimer_xlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m17",
    title: "John Wick: Kapitel 4",
    category: "movies",
    rating: "7.7",
    year: "2023",
    genre: "Action / Thriller",
    duration: "2 Std. 49 Min.",
    image: "/movies/john_wick_chapter_four_xxlg.jpg",
    badge: "8K",
    quality: "8K UHD",
  },
  {
    id: "m18",
    title: "Killers of the Flower Moon",
    category: "movies",
    rating: "7.7",
    year: "2023",
    genre: "Krimi / Drama / Geschichte",
    duration: "3 Std. 26 Min.",
    image: "/movies/killers_of_the_flower_moon_xxlg.jpg",
    quality: "8K UHD",
  },
  {
    id: "m19",
    title: "Napoleon",
    category: "movies",
    rating: "6.5",
    year: "2023",
    genre: "Historisches Epos / Drama",
    duration: "2 Std. 38 Min.",
    image: "/movies/napoleon.jpg",
    quality: "8K UHD",
  },
  {
    id: "m20",
    title: "Mission: Impossible – Dead Reckoning",
    category: "movies",
    rating: "7.7",
    year: "2023",
    genre: "Action / Spionage",
    duration: "2 Std. 43 Min.",
    image: "/movies/mission_impossible__dead_reckoning_part_one_ver5_xxlg.jpg",
    quality: "8K UHD",
  },
  {
    id: "m21",
    title: "Mission: Impossible – The Final Reckoning",
    category: "movies",
    rating: "8.0",
    year: "2025",
    genre: "Action / Spionage / Thriller",
    duration: "2 Std. 49 Min.",
    image: "/movies/mission_impossible__the_final_reckoning_xlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m22",
    title: "Aquaman: Das Verlorene Königreich",
    category: "movies",
    rating: "6.5",
    year: "2023",
    genre: "Action / DC / Superheld",
    duration: "2 Std. 4 Min.",
    image: "/movies/aquaman_and_the_lost_kingdom.jpg",
    quality: "8K UHD",
  },
  {
    id: "m23",
    title: "The Marvels",
    category: "movies",
    rating: "6.0",
    year: "2023",
    genre: "Action / Marvel / Superheld",
    duration: "1 Std. 45 Min.",
    image: "/movies/marvels_xxlg.jpg",
    quality: "8K UHD",
  },
  {
    id: "m24",
    title: "Captain America: Brave New World",
    category: "movies",
    rating: "6.3",
    year: "2025",
    genre: "Action / Marvel / Superheld",
    duration: "1 Std. 58 Min.",
    image: "/movies/captain_america_brave_new_world_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m25",
    title: "Thunderbolts*",
    category: "movies",
    rating: "7.4",
    year: "2025",
    genre: "Action / Marvel / Superheld",
    duration: "2 Std. 7 Min.",
    image: "/movies/thunderbolts_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m26",
    title: "Superman",
    category: "movies",
    rating: "7.5",
    year: "2025",
    genre: "Action / DC / Superheld",
    duration: "2 Std. 9 Min.",
    image: "/movies/superman_ver27_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m27",
    title: "Supergirl: Woman of Tomorrow",
    category: "movies",
    rating: "7.0",
    year: "2026",
    genre: "Action / DC / Superheld",
    duration: "Demnächst",
    image: "/movies/supergirl_xxlg.jpg",
    badge: "Bald",
    quality: "8K UHD",
  },
  {
    id: "m28",
    title: "The Fantastic Four: First Steps",
    category: "movies",
    rating: "7.8",
    year: "2025",
    genre: "Action / Marvel / Abenteuer",
    duration: "2 Std. 5 Min.",
    image: "/movies/fantastic_four_ver4.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m29",
    title: "Sinners",
    category: "movies",
    rating: "7.8",
    year: "2025",
    genre: "Horror / Drama / Thriller",
    duration: "2 Std. 18 Min.",
    image: "/movies/sinners_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m30",
    title: "How to Train Your Dragon",
    category: "movies",
    rating: "8.0",
    year: "2025",
    genre: "Abenteuer / Animation / Familie",
    duration: "1 Std. 55 Min.",
    image: "/movies/how_to_train_your_dragon_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m31",
    title: "Lilo & Stitch",
    category: "movies",
    rating: "7.0",
    year: "2025",
    genre: "Familienfilm / Abenteuer",
    duration: "1 Std. 48 Min.",
    image: "/movies/lilo_and_stitch_xlg.jpg",
    badge: "NEU",
    quality: "1080p Full HD",
  },
  {
    id: "m32",
    title: "Jurassic World: Rebirth",
    category: "movies",
    rating: "7.2",
    year: "2025",
    genre: "Action / Abenteuer / Sci-Fi",
    duration: "2 Std. 9 Min.",
    image: "/movies/jurassic_world_rebirth_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m33",
    title: "Snow White",
    category: "movies",
    rating: "4.3",
    year: "2025",
    genre: "Fantasy / Musical / Familie",
    duration: "1 Std. 49 Min.",
    image: "/movies/snow_white_xxlg.jpg",
    quality: "1080p Full HD",
  },
  {
    id: "m34",
    title: "The Hunger Games: Sunrise on the Reaping",
    category: "movies",
    rating: "7.5",
    year: "2026",
    genre: "Science-Fiction / Action / Drama",
    duration: "2 Std. 40 Min.",
    image: "/movies/hunger_games_sunrise_on_the_reaping_xxlg.jpg",
    badge: "2026",
    quality: "8K UHD",
  },
  {
    id: "m35",
    title: "Project Hail Mary",
    category: "movies",
    rating: "8.3",
    year: "2025",
    genre: "Science-Fiction / Drama",
    duration: "2 Std. 30 Min.",
    image: "/movies/project_hail_mary_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m36",
    title: "Masters of the Universe",
    category: "movies",
    rating: "7.0",
    year: "2026",
    genre: "Action / Fantasy / Abenteuer",
    duration: "Demnächst",
    image: "/movies/masters_of_the_universe_xxlg.jpg",
    badge: "Bald",
    quality: "8K UHD",
  },
  {
    id: "m37",
    title: "The Running Man",
    category: "movies",
    rating: "7.0",
    year: "2025",
    genre: "Action / Sci-Fi / Thriller",
    duration: "2 Std. 20 Min.",
    image: "/movies/running_man_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m38",
    title: "28 Years Later",
    category: "movies",
    rating: "7.8",
    year: "2025",
    genre: "Horror / Science-Fiction",
    duration: "1 Std. 55 Min.",
    image: "/movies/twenty_eight_years_later_ver6_xxlg.jpg",
    badge: "NEU",
    quality: "8K UHD",
  },
  {
    id: "m39",
    title: "Odyssey",
    category: "movies",
    rating: "7.5",
    year: "2026",
    genre: "Science-Fiction / Abenteuer",
    duration: "Demnächst",
    image: "/movies/odyssey_xxlg.jpg",
    badge: "Bald",
    quality: "8K UHD",
  },
];

export const ALL_CHANNELS: ChannelItem[] = [
  // --- GERMANY (DE) ---
  { id: "de1", name: "Sky Sport Bundesliga HD", category: "Sports", country: "DE", logoColor: "from-red-600 to-red-800", logoText: "SkyB" },
  { id: "de2", name: "DAZN 1 Bar HD", category: "Sports", country: "DE", logoColor: "from-amber-500 to-black", logoText: "DAZN1" },
  { id: "de3", name: "DAZN 2 Bar HD", category: "Sports", country: "DE", logoColor: "from-amber-600 to-zinc-900", logoText: "DAZN2" },
  { id: "de4", name: "Sky Sport Premier League HD", category: "Sports", country: "DE", logoColor: "from-red-600 to-neutral-900", logoText: "SkyPL" },
  { id: "de5", name: "Sky Sport F1 HD", category: "Sports", country: "DE", logoColor: "from-red-500 to-neutral-950", logoText: "SkyF1" },
  { id: "de6", name: "ZDF HD", category: "Local", country: "DE", logoColor: "from-orange-500 to-neutral-800", logoText: "ZDF" },
  { id: "de7", name: "Das Erste HD (ARD)", category: "Local", country: "DE", logoColor: "from-blue-600 to-neutral-900", logoText: "ARD" },
  { id: "de8", name: "ProSieben HD", category: "Entertainment", country: "DE", logoColor: "from-red-600 to-red-900", logoText: "Pro7" },
  { id: "de9", name: "RTL UHD", category: "Entertainment", country: "DE", logoColor: "from-red-500 via-yellow-400 to-blue-500", logoText: "RTL" },
  { id: "de10", name: "Sat.1 HD", category: "Entertainment", country: "DE", logoColor: "from-blue-500 to-pink-500", logoText: "SAT1" },
  { id: "de11", name: "WELT HD", category: "News", country: "DE", logoColor: "from-[#0F1E36] to-neutral-900", logoText: "WELT" },
  { id: "de12", name: "n-tv HD", category: "News", country: "DE", logoColor: "from-red-600 to-slate-905", logoText: "n-tv" },
  { id: "de13", name: "KiKa HD", category: "Kids", country: "DE", logoColor: "from-green-400 to-teal-500", logoText: "KiKa" },
  { id: "de14", name: "Sky Cinema Premieren HD", category: "Movies", country: "DE", logoColor: "from-sky-700 to-indigo-950", logoText: "SkyM" },
  { id: "de15", name: "ServusTV Deutschland", category: "Local", country: "DE", logoColor: "from-blue-700 to-cyan-800", logoText: "Servus" },
  { id: "de16", name: "Super RTL HD", category: "Kids", country: "DE", logoColor: "from-orange-500 to-orange-700", logoText: "SRTL" },
  { id: "de17", name: "Eurosport 1 Deutschland", category: "Sports", country: "DE", logoColor: "from-blue-800 to-red-600", logoText: "EuroS" },
  { id: "de18", name: "WDR Fernsehen Köln", category: "Local", country: "DE", logoColor: "from-blue-500 to-sky-700", logoText: "WDR" },

  // --- UNITED STATES (US) ---
  { id: "us1", name: "HBO Premium East HD", category: "Movies", country: "US", logoColor: "from-slate-800 to-black", logoText: "HBO" },
  { id: "us2", name: "HBO Comedy HD", category: "Movies", country: "US", logoColor: "from-slate-700 to-slate-900", logoText: "HBO.C" },
  { id: "us3", name: "Showtime East HD", category: "Movies", country: "US", logoColor: "from-red-700 to-black", logoText: "SHOW" },
  { id: "us4", name: "Starz Kids & Family HD", category: "Kids", country: "US", logoColor: "from-indigo-600 to-indigo-900", logoText: "STARZ" },
  { id: "us5", name: "Cinemax East HD", category: "Movies", country: "US", logoColor: "from-neutral-800 to-neutral-950", logoText: "MAX" },
  { id: "us6", name: "ESPN UHD", category: "Sports", country: "US", logoColor: "from-red-600 to-red-700", logoText: "ESPN" },
  { id: "us7", name: "ESPN 2 HD", category: "Sports", country: "US", logoColor: "from-red-600 to-zinc-900", logoText: "ESPN2" },
  { id: "us8", name: "Fox Sports 1 (FS1) HD", category: "Sports", country: "US", logoColor: "from-blue-800 to-neutral-900", logoText: "FS1" },
  { id: "us9", name: "Fox Sports 2 (FS2) HD", category: "Sports", country: "US", logoColor: "from-blue-700 to-slate-900", logoText: "FS2" },
  { id: "us10", name: "CBS Sports Network HD", category: "Sports", country: "US", logoColor: "from-blue-900 to-blue-950", logoText: "CBSSN" },
  { id: "us11", name: "Tennis Channel HD", category: "Sports", country: "US", logoColor: "from-green-600 to-emerald-900", logoText: "TENNIS" },
  { id: "us12", name: "CNN International HD", category: "News", country: "US", logoColor: "from-red-700 to-stone-900", logoText: "CNN" },
  { id: "us13", name: "MSNBC Live HD", category: "News", country: "US", logoColor: "from-blue-700 to-slate-800", logoText: "MSNBC" },
  { id: "us14", name: "FOX News Channel HD", category: "News", country: "US", logoColor: "from-blue-900 to-orange-600", logoText: "FOXN" },
  { id: "us15", name: "ABC Network Local HD", category: "Local", country: "US", logoColor: "from-neutral-900 to-black", logoText: "ABC" },
  { id: "us16", name: "CBS East HD", category: "Local", country: "US", logoColor: "from-sky-600 to-neutral-900", logoText: "CBS" },
  { id: "us17", name: "NBC East HD", category: "Local", country: "US", logoColor: "from-purple-600 to-blue-900", logoText: "NBC" },
  { id: "us18", name: "FOX East HD", category: "Local", country: "US", logoColor: "from-blue-900 to-black", logoText: "FOX" },
  { id: "us19", name: "AMC Marvel Premium", category: "Entertainment", country: "US", logoColor: "from-zinc-700 to-black", logoText: "AMC" },
  { id: "us20", name: "FX Network HD", category: "Entertainment", country: "US", logoColor: "from-teal-900 to-black", logoText: "FX" },

  // --- UNITED KINGDOM (UK) ---
  { id: "uk1", name: "BBC One HD", category: "Local", country: "UK", logoColor: "from-red-600 to-red-700", logoText: "BBC1" },
  { id: "uk2", name: "BBC Two HD", category: "Local", country: "UK", logoColor: "from-teal-600 to-neutral-900", logoText: "BBC2" },
  { id: "uk3", name: "ITV1 HD", category: "Local", country: "UK", logoColor: "from-blue-500 to-indigo-700", logoText: "ITV1" },
  { id: "uk4", name: "Channel 4 HD", category: "Local", country: "UK", logoColor: "from-pink-600 to-neutral-800", logoText: "CH4" },
  { id: "uk5", name: "Sky Atlantic HD", category: "Entertainment", country: "UK", logoColor: "from-sky-800 to-slate-900", logoText: "SkyAt" },
  { id: "uk6", name: "Sky Max HD", category: "Entertainment", country: "UK", logoColor: "from-orange-600 to-neutral-900", logoText: "SkyMax" },
  { id: "uk7", name: "Sky Cinema Premiere HD", category: "Movies", country: "UK", logoColor: "from-rose-600 to-purple-900", logoText: "SkyCP" },
  { id: "uk8", name: "Sky Cinema Action HD", category: "Movies", country: "UK", logoColor: "from-red-700 to-neutral-950", logoText: "SkyCA" },
  { id: "uk9", name: "Sky Sports Main Event Ultra HD", category: "Sports", country: "UK", logoColor: "from-red-600 to-black", logoText: "SkyS.ME" },
  { id: "uk10", name: "Sky Sports Premier League HD", category: "Sports", country: "UK", logoColor: "from-red-600 to-neutral-900", logoText: "SkyS.PL" },
  { id: "uk11", name: "Sky Sports Football HD", category: "Sports", country: "UK", logoColor: "from-emerald-600 to-black", logoText: "SkyS.FB" },
  { id: "uk12", name: "Sky Sports F1 HD", category: "Sports", country: "UK", logoColor: "from-cyan-700 to-blue-900", logoText: "SkyS.F1" },
  { id: "uk13", name: "TNT Sports 1 Ultra HD", category: "Sports", country: "UK", logoColor: "from-purple-700 to-black", logoText: "TNT1" },
  { id: "uk14", name: "TNT Sports 2 HD", category: "Sports", country: "UK", logoColor: "from-purple-600 to-zinc-900", logoText: "TNT2" },
  { id: "uk15", name: "Sky News HD", category: "News", country: "UK", logoColor: "from-red-600 to-blue-800", logoText: "SkyN" },

  // --- FRANCE (FR) ---
  { id: "fr1", name: "TF1 HD France", category: "Local", country: "FR", logoColor: "from-blue-600 to-blue-800", logoText: "TF1" },
  { id: "fr2", name: "France 2 HD", category: "Local", country: "FR", logoColor: "from-red-600 to-neutral-900", logoText: "FR2" },
  { id: "fr3", name: "France 3 HD", category: "Local", country: "FR", logoColor: "from-blue-500 to-blue-700", logoText: "FR3" },
  { id: "fr4", name: "Canal+ France HD", category: "Entertainment", country: "FR", logoColor: "from-neutral-800 to-black", logoText: "C+" },
  { id: "fr5", name: "Canal+ Sport France HD", category: "Sports", country: "FR", logoColor: "from-zinc-700 to-zinc-950", logoText: "C+.S" },
  { id: "fr6", name: "M6 HD France", category: "Entertainment", country: "FR", logoColor: "from-yellow-500 to-orange-600", logoText: "M6" },
  { id: "fr7", name: "beIN Sports 1 France HD", category: "Sports", country: "FR", logoColor: "from-purple-800 to-neutral-900", logoText: "beIN1" },
  { id: "fr8", name: "beIN Sports 2 France HD", category: "Sports", country: "FR", logoColor: "from-purple-700 to-indigo-950", logoText: "beIN2" },
  { id: "fr9", name: "beIN Sports 3 France HD", category: "Sports", country: "FR", logoColor: "from-purple-600 to-black", logoText: "beIN3" },
  { id: "fr10", name: "RMC Sport 1 HD", category: "Sports", country: "FR", logoColor: "from-red-700 to-yellow-600", logoText: "RMC1" },

  // --- ESPAÑA (ES) ---
  { id: "es1", name: "La 1 HD España", category: "Local", country: "ES", logoColor: "from-blue-500 to-[#102C57]", logoText: "La1" },
  { id: "es2", name: "Antena 3 HD", category: "Entertainment", country: "ES", logoColor: "from-orange-500 to-orange-700", logoText: "A3" },
  { id: "es3", name: "Telecinco HD", category: "Entertainment", country: "ES", logoColor: "from-blue-600 to-indigo-900", logoText: "T5" },
  { id: "es4", name: "Movistar+ El Partidazo HD", category: "Sports", country: "ES", logoColor: "from-cyan-600 to-black", logoText: "M.Part" },
  { id: "es5", name: "Movistar+ LaLiga HD", category: "Sports", country: "ES", logoColor: "from-teal-600 to-slate-900", logoText: "M.Liga" },
  { id: "es6", name: "Movistar+ Liga de Campeones HD", category: "Sports", country: "ES", logoColor: "from-blue-800 to-cyan-900", logoText: "M.LCh" },
  { id: "es7", name: "DAZN LaLiga 1 HD", category: "Sports", country: "ES", logoColor: "from-amber-500 to-neutral-950", logoText: "DAZN.L" },

  // --- ITALIA (IT) ---
  { id: "it1", name: "Rai 1 HD Italia", category: "Local", country: "IT", logoColor: "from-blue-700 to-blue-900", logoText: "Rai1" },
  { id: "it2", name: "Canale 5 HD", category: "Entertainment", country: "IT", logoColor: "from-orange-500 to-blue-950", logoText: "C5" },
  { id: "it3", name: "Italia 1 HD", category: "Entertainment", country: "IT", logoColor: "from-blue-500 to-blue-700", logoText: "I1" },
  { id: "it4", name: "Sky Sport Uno Italia HD", category: "Sports", country: "IT", logoColor: "from-red-600 to-slate-900", logoText: "SkyS.U" },
  { id: "it5", name: "Sky Sport Calcio Italia HD", category: "Sports", country: "IT", logoColor: "from-emerald-700 to-black", logoText: "SkyS.C" },
  { id: "it6", name: "DAZN 1 Italia HD", category: "Sports", country: "IT", logoColor: "from-amber-600 to-black", logoText: "DAZN.I" },

  // --- TÜRKIYE (TR) ---
  { id: "tr1", name: "TRT 1 Ultra HD Türkiye", category: "Local", country: "TR", logoColor: "from-red-700 to-neutral-900", logoText: "TRT1" },
  { id: "tr2", name: "beIN Sports 1 TR HD", category: "Sports", country: "TR", logoColor: "from-[#F36C21] to-black", logoText: "beIN1.T" },
  { id: "tr3", name: "beIN Sports 2 TR HD", category: "Sports", country: "TR", logoColor: "from-[#F36C21] to-zinc-900", logoText: "beIN2.T" },
  { id: "tr4", name: "ATV HD Türkiye", category: "Entertainment", country: "TR", logoColor: "from-orange-600 to-red-800", logoText: "ATV" },
  { id: "tr5", name: "Show TV HD", category: "Entertainment", country: "TR", logoColor: "from-purple-500 to-[#F20F79]", logoText: "SHOW" },
  { id: "tr6", name: "Kanal D HD", category: "Entertainment", country: "TR", logoColor: "from-blue-700 to-cyan-600", logoText: "KanalD" },
  { id: "tr7", name: "TV8 TR HD", category: "Entertainment", country: "TR", logoColor: "from-red-600 to-yellow-500", logoText: "TV8" },

  // --- ARABIC (AR) ---
  { id: "ar1", name: "beIN Sports 1 Arabic HD", category: "Sports", country: "AR", logoColor: "from-purple-800 to-black", logoText: "beIN.A1" },
  { id: "ar2", name: "beIN Sports Premium 1 HD", category: "Sports", country: "AR", logoColor: "from-purple-750 to-indigo-950", logoText: "beIN.P1" },
  { id: "ar3", name: "SSC Sport 1 KSA HD", category: "Sports", country: "AR", logoColor: "from-green-700 to-zinc-950", logoText: "SSC1" },
  { id: "ar4", name: "SSC Sport 5 KSA Ultimate", category: "Sports", country: "AR", logoColor: "from-green-600 to-neutral-900", logoText: "SSC5" },
  { id: "ar5", name: "MBC 1 HD Arabic", category: "Entertainment", country: "AR", logoColor: "from-[#11698E] to-[#19456B]", logoText: "MBC1" },
  { id: "ar6", name: "MBC Max Movies HD", category: "Movies", country: "AR", logoColor: "from-purple-600 to-slate-900", logoText: "MBC.M" },
  { id: "ar7", name: "Al Jazeera Arabic News HD", category: "News", country: "AR", logoColor: "from-[#8B7E66] to-black", logoText: "AJA" },
  { id: "ar8", name: "Al Arabiya News HD", category: "News", country: "AR", logoColor: "from-blue-600 to-purple-800", logoText: "Arabiya" }
];


export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  // ── 1 Device ──────────────────────────────────────────────────────────────
  {
    id: "p1b",
    durationMonths: 3,
    name: "Starter",
    price: 34.99,
    originalPrice: 54.99,
    popular: false,
    savings: "Proefpakket",
    devices: 1,
  },
  {
    id: "p1c",
    durationMonths: 6,
    name: "Standard",
    price: 49.99,
    originalPrice: 79.99,
    popular: false,
    savings: "Beste prijs",
    devices: 1,
  },
  {
    id: "p1d",
    durationMonths: 12,
    freeMonths: 3,
    name: "Premium",
    price: 74.99,
    originalPrice: 119.99,
    popular: true,
    savings: "WEEKDEAL",
    devices: 1,
  },
  {
    id: "p1e",
    durationMonths: 24,
    freeMonths: 6,
    name: "Ultra",
    price: 134.99,
    originalPrice: 219.99,
    popular: false,
    savings: "WEEKDEAL",
    devices: 1,
  },
  // ── 2 Devices ─────────────────────────────────────────────────────────────
  {
    id: "p2b",
    durationMonths: 3,
    name: "Duo Starter",
    price: 49.99,
    originalPrice: 89.99,
    popular: false,
    savings: "Proefpakket",
    devices: 2,
  },
  {
    id: "p2c",
    durationMonths: 6,
    name: "Duo Standard",
    price: 74.99,
    originalPrice: 129.99,
    popular: false,
    savings: "Beste prijs",
    devices: 2,
  },
  {
    id: "p2d",
    durationMonths: 12,
    freeMonths: 3,
    name: "Duo Premium",
    price: 134.99,
    originalPrice: 219.99,
    popular: true,
    savings: "WEEKDEAL",
    devices: 2,
  },
  {
    id: "p2e",
    durationMonths: 24,
    freeMonths: 6,
    name: "Duo Ultra",
    price: 229.99,
    originalPrice: 399.99,
    popular: false,
    savings: "WEEKDEAL",
    devices: 2,
  }
];

