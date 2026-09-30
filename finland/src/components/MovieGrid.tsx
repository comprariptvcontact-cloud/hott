import { useState } from "react";
import { Play, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const movieTexts: Record<string, { heading: string; headingItalic: string; exploreAll: string; films: string; series: string; footer: string; subscribeNow: string; freeLabel: string }> = {
  nl: { heading: "Films & Series.", headingItalic: "8K Kwaliteit.", exploreAll: "Alles verkennen", films: "Films", series: "Series", footer: "Dagelijks bijgewerkt · 220.000+ titels beschikbaar", subscribeNow: "Nu abonneren", freeLabel: "GRATIS & ZONDER LOGIN:" },
  de: { heading: "Filme & Serien.", headingItalic: "8K Qualität.", exploreAll: "Alle ansehen", films: "Filme", series: "Serien", footer: "Täglich aktualisiert · 220.000+ Titel verfügbar", subscribeNow: "Jetzt abonnieren", freeLabel: "KOSTENLOS & OHNE LOGIN:" },
  fr: { heading: "Films & Séries.", headingItalic: "Qualité 8K.", exploreAll: "Tout explorer", films: "Films", series: "Séries", footer: "Mis à jour quotidiennement · 200 000+ titres disponibles", subscribeNow: "S'abonner", freeLabel: "GRATUIT & SANS CONNEXION :" },
  es: { heading: "Películas & Series.", headingItalic: "Calidad 8K.", exploreAll: "Ver todo", films: "Películas", series: "Series", footer: "Actualizado diariamente · 220.000+ títulos disponibles", subscribeNow: "Suscribirse", freeLabel: "GRATIS Y SIN REGISTRO:" },
  it: { heading: "Film & Serie.", headingItalic: "Qualità 8K.", exploreAll: "Esplora tutto", films: "Film", series: "Serie", footer: "Aggiornato ogni giorno · 220.000+ titoli disponibili", subscribeNow: "Abbonati ora", freeLabel: "GRATUITO E SENZA LOGIN:" },
  sv: { heading: 'Filmer & serier.', headingItalic: '8K-kvalitet.', exploreAll: 'Utforska allt', films: 'Filmer', series: 'Serier', footer: 'Uppdateras dagligen · 220.000+ titlar tillgängliga', subscribeNow: 'Prenumerera nu', freeLabel: 'GRATIS & UTAN INLOGGNING:' },
  no: { heading: 'Filmer & serier.', headingItalic: '8K-kvalitet.', exploreAll: 'Utforsk alt', films: 'Filmer', series: 'Serier', footer: 'Oppdateres daglig · 220.000+ titler tilgjengelig', subscribeNow: 'Abonner nå', freeLabel: 'GRATIS & UTEN INNLOGGING:' },
  da: { heading: 'Film & serier.', headingItalic: '8K-kvalitet.', exploreAll: 'Udforsk alt', films: 'Film', series: 'Serier', footer: 'Opdateres dagligt · 220.000+ titler tilgængelige', subscribeNow: 'Abonner nu', freeLabel: 'GRATIS & UDEN LOGIN:' },
  fi: { heading: 'Elokuvat & sarjat.', headingItalic: '8K-laatu.', exploreAll: 'Selaa kaikkia', films: 'Elokuvat', series: 'Sarjat', footer: 'Päivitetään päivittäin · 220.000+ nimikettä saatavilla', subscribeNow: 'Tilaa nyt', freeLabel: 'ILMAINEN & ILMAN KIRJAUTUMISTA:' },
  ar: { heading: 'أفلام ومسلسلات.', headingItalic: 'جودة 8K.', exploreAll: 'استكشف الكل', films: 'أفلام', series: 'مسلسلات', footer: 'يُحدَّث يومياً · أكثر من 220.000 عنوان متاح', subscribeNow: 'اشترك الآن', freeLabel: ':مجاني وبدون تسجيل' },
};
const defaultMovieText = { heading: "Movies & Series.", headingItalic: "8K Quality.", exploreAll: "Explore All", films: "Films", series: "Series", footer: "Updated daily · 220.000+ titles available", subscribeNow: "Subscribe Now", freeLabel: "FREE & NO LOGIN:" };

interface MovieGridProps {
  onPricingClick: () => void;
}

const TMDB = "https://image.tmdb.org/t/p/w300";

interface MovieItem {
  id: string;
  title: string;
  year: string;
  rating: string;
  badge?: string;
  image: string;
  genre: string;
}

// ── Row 1: Hollywood Blockbusters ─────────────────────────────────────────────
const BLOCKBUSTERS: MovieItem[] = [
  { id: "b1",  title: "Dune: Part Two",               year: "2024", rating: "8.5", badge: "8K",  image: "/movies/dune_part_two_ver2_xxlg.jpg",                       genre: "Sci-Fi"    },
  { id: "b2",  title: "Oppenheimer",                   year: "2023", rating: "8.8", badge: "8K",  image: "/movies/oppenheimer_xlg.jpg",                               genre: "Drama"     },
  { id: "b3",  title: "John Wick 4",                   year: "2023", rating: "7.7", badge: "8K",  image: "/movies/john_wick_chapter_four_xxlg.jpg",                   genre: "Action"    },
  { id: "b4",  title: "Thunderbolts",                  year: "2025", rating: "7.6", badge: "NEW", image: "/movies/thunderbolts_xxlg.jpg",                             genre: "Action"    },
  { id: "b5",  title: "Superman",                      year: "2025", rating: "8.0", badge: "NEW", image: "/movies/superman_ver27_xxlg.jpg",                           genre: "Action"    },
  { id: "b6",  title: "Mission: Impossible",           year: "2025", rating: "8.1", badge: "NEW", image: "/movies/mission_impossible__the_final_reckoning_xlg.jpg",   genre: "Thriller"  },
  { id: "b7",  title: "Sinners",                       year: "2025", rating: "7.9", badge: "NEW", image: "/movies/sinners_xxlg.jpg",                                  genre: "Horror"    },
  { id: "b8",  title: "Captain America",               year: "2025", rating: "7.3", badge: "8K",  image: "/movies/captain_america_brave_new_world_xxlg.jpg",          genre: "Action"    },
  { id: "b9",  title: "Jurassic World: Rebirth",       year: "2025", rating: "7.1", badge: "NEW", image: "/movies/jurassic_world_rebirth_xxlg.jpg",                   genre: "Adventure" },
  { id: "b10", title: "How to Train Your Dragon",      year: "2025", rating: "7.8", badge: "NEW", image: "/movies/how_to_train_your_dragon_xxlg.jpg",                 genre: "Animation" },
  { id: "b11", title: "Fantastic Four",                year: "2025", rating: "7.5", badge: "NEW", image: "/movies/fantastic_four_ver4.jpg",                           genre: "Action"    },
  { id: "b12", title: "Hunger Games: Sunrise",         year: "2025", rating: "7.6", badge: "NEW", image: "/movies/hunger_games_sunrise_on_the_reaping_xxlg.jpg",      genre: "Adventure" },
  { id: "b13", title: "28 Years Later",                year: "2025", rating: "7.4", badge: "NEW", image: "/movies/twenty_eight_years_later_ver6_xxlg.jpg",            genre: "Horror"    },
  { id: "b14", title: "Killers of the Flower Moon",    year: "2023", rating: "7.6", badge: "8K",  image: "/movies/killers_of_the_flower_moon_xxlg.jpg",              genre: "Drama"     },
  { id: "b15", title: "Masters of the Universe",       year: "2025", rating: "7.2", badge: "NEW", image: "/movies/masters_of_the_universe_xxlg.jpg",                 genre: "Action"    },
  { id: "b16", title: "Lilo & Stitch",                 year: "2025", rating: "7.0", badge: "NEW", image: "/movies/lilo_and_stitch_xlg.jpg",                          genre: "Family"    },
  { id: "b17", title: "Project Hail Mary",             year: "2025", rating: "8.2", badge: "NEW", image: "/movies/project_hail_mary_xxlg.jpg",                       genre: "Sci-Fi"    },
  { id: "b18", title: "Running Man",                   year: "2025", rating: "7.1", badge: "NEW", image: "/movies/running_man_xxlg.jpg",                             genre: "Action"    },
  { id: "b19", title: "Avengers: Doomsday",            year: "2026", rating: "9.1", badge: "NEW", image: `${TMDB}/8HkIe2i4ScpCkcX9SzZ9IPasqWV.jpg`,                genre: "Action"    },
  { id: "b20", title: "Spider-Man: Brand New Day",     year: "2026", rating: "8.7", badge: "NEW", image: `${TMDB}/yyB2VJEW3an2xCdcYCPQhn9QERR.jpg`,                genre: "Action"    },
  { id: "b21", title: "The Batman Part II",            year: "2026", rating: "8.5", badge: "NEW", image: `${TMDB}/qv4YTyxvaujP79a5XZJ6F4G8Nyi.jpg`,                genre: "Crime"     },
  { id: "b22", title: "Toy Story 5",                   year: "2026", rating: "8.3", badge: "NEW", image: `${TMDB}/pxG26JdyuiDvJbSoucknaFiLeZD.jpg`,                genre: "Animation" },
  { id: "b23", title: "Mandalorian & Grogu",           year: "2026", rating: "8.6", badge: "NEW", image: `${TMDB}/5Vi8dSauVwH1HOsiZceDMbRr1Ca.jpg`,                genre: "Sci-Fi"    },
  { id: "b24", title: "Fast X: Part 2",                year: "2026", rating: "7.5", badge: "NEW", image: `${TMDB}/zP19YO60jwEsfKd5Qf1UvA5uJu8.jpg`,                genre: "Action"    },
  { id: "b25", title: "Wicked: Part Two",              year: "2026", rating: "8.4", badge: "NEW", image: `${TMDB}/si9tolnefLSUKaqQEGz1bWArOaL.jpg`,                genre: "Musical"   },
  { id: "b26", title: "Black Panther 3",               year: "2026", rating: "8.1", badge: "NEW", image: `${TMDB}/sv1xJUazXeYqALzczSZ3O6nkH75.jpg`,                genre: "Action"    },
  { id: "b27", title: "Gladiator II",                  year: "2024", rating: "7.5", badge: "8K",  image: `${TMDB}/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg`,                genre: "Action"    },
  { id: "b28", title: "Wicked",                        year: "2024", rating: "7.8", badge: "8K",  image: `${TMDB}/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg`,                genre: "Musical"   },
];

// ── Row 2: Top International Series ───────────────────────────────────────────
const INTL_SERIES: MovieItem[] = [
  { id: "s1",  title: "House of the Dragon",    year: "2024", rating: "8.4", badge: "8K",  image: `${TMDB}/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg`, genre: "Fantasy"  },
  { id: "s2",  title: "The Last of Us",         year: "2023", rating: "8.8", badge: "8K",  image: `${TMDB}/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg`, genre: "Drama"    },
  { id: "s3",  title: "Stranger Things",        year: "2022", rating: "8.7", badge: "HD",  image: `${TMDB}/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg`, genre: "Sci-Fi"   },
  { id: "s4",  title: "Wednesday",              year: "2022", rating: "8.1", badge: "HD",  image: `${TMDB}/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg`, genre: "Comedy"   },
  { id: "s5",  title: "Breaking Bad",           year: "2013", rating: "9.5", badge: "8K",  image: `${TMDB}/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg`, genre: "Thriller" },
  { id: "s6",  title: "Squid Game",             year: "2021", rating: "8.0", badge: "8K",  image: `${TMDB}/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg`, genre: "Thriller" },
  { id: "s7",  title: "Game of Thrones",        year: "2019", rating: "9.2", badge: "8K",  image: `${TMDB}/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg`, genre: "Fantasy"  },
  { id: "s8",  title: "Succession",             year: "2023", rating: "8.9", badge: "8K",  image: `${TMDB}/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg`, genre: "Drama"    },
  { id: "s9",  title: "The Bear",               year: "2024", rating: "8.6", badge: "HD",  image: `${TMDB}/4fVddnbhcmzRZE14NJY03GKS6Fn.jpg`, genre: "Drama"    },
  { id: "s10", title: "Peaky Blinders",         year: "2022", rating: "8.8", badge: "8K",  image: `${TMDB}/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg`, genre: "Crime"    },
  { id: "s11", title: "Money Heist",            year: "2021", rating: "8.3", badge: "8K",  image: `${TMDB}/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg`, genre: "Thriller" },
  { id: "s12", title: "Ozark",                  year: "2022", rating: "8.4", badge: "8K",  image: `${TMDB}/pCGyPVrI9Fzw6rE1Pvi4BIXF6ET.jpg`, genre: "Drama"    },
  { id: "s13", title: "The Crown",              year: "2023", rating: "8.2", badge: "HD",  image: `${TMDB}/1M876KPjulVwppEpldhdc8V4o68.jpg`, genre: "Drama"    },
  { id: "s14", title: "Ted Lasso",              year: "2023", rating: "8.8", badge: "HD",  image: `${TMDB}/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg`, genre: "Comedy"   },
  { id: "s15", title: "Severance",              year: "2022", rating: "8.7", badge: "HD",  image: `${TMDB}/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg`, genre: "Thriller" },
  { id: "s16", title: "Andor",                  year: "2022", rating: "8.4", badge: "8K",  image: `${TMDB}/khZqmwHQicTYoS7Flreb9EddFZC.jpg`, genre: "Sci-Fi"   },
  { id: "s17", title: "Daredevil: Born Again",  year: "2025", rating: "8.5", badge: "NEW", image: `${TMDB}/AkE7OR1Khpk5OH0d7ZJfcP5Do9b.jpg`, genre: "Action"   },
  { id: "s18", title: "The Last of Us S2",      year: "2025", rating: "9.0", badge: "NEW", image: `${TMDB}/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg`, genre: "Drama"    },
  { id: "s19", title: "Alien: Earth",           year: "2025", rating: "7.9", badge: "NEW", image: `${TMDB}/9yBVqNruk6Ykrwc32qskP3eRjV.jpg`,  genre: "Sci-Fi"   },
  { id: "s20", title: "Stranger Things S5",     year: "2025", rating: "9.1", badge: "NEW", image: `${TMDB}/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg`, genre: "Sci-Fi"   },
  { id: "s21", title: "Squid Game S3",          year: "2025", rating: "8.3", badge: "NEW", image: `${TMDB}/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg`, genre: "Thriller" },
  { id: "s22", title: "House of Dragon S3",     year: "2026", rating: "8.7", badge: "NEW", image: `${TMDB}/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg`, genre: "Fantasy"  },
  { id: "s23", title: "White Lotus S3",         year: "2025", rating: "8.5", badge: "NEW", image: `${TMDB}/vYI9YTqYWqbv1QXfkVHW03xqJQQ.jpg`, genre: "Drama"    },
  { id: "s24", title: "The Penguin",            year: "2024", rating: "8.4", badge: "NEW", image: `${TMDB}/jbNKMPRz2CKFkFHn8RX2AMijl7e.jpg`, genre: "Crime"    },
  { id: "s25", title: "Andor S2",               year: "2025", rating: "8.8", badge: "NEW", image: `${TMDB}/khZqmwHQicTYoS7Flreb9EddFZC.jpg`, genre: "Sci-Fi"   },
  { id: "s26", title: "Agatha All Along",        year: "2024", rating: "7.6", badge: "NEW", image: `${TMDB}/2LDfmx1FQcYPLsPOmxUkAJaP7Ew.jpg`, genre: "Fantasy"  },
];

// ── Row 3: European & International Favourites ─────────────────────────────────
const EU_FAVOURITES: MovieItem[] = [
  { id: "d1",  title: "Dark",                  year: "2020", rating: "8.8", badge: "8K",  image: `${TMDB}/1DLjjvSWMYo17B7wuz6YikB96hH.jpg`, genre: "Sci-Fi"   },
  { id: "d2",  title: "Bordertown",            year: "2021", rating: "8.1", badge: "HD",  image: `${TMDB}/jYShWyYllx9DhOS6d92mN2yVsbA.jpg`, genre: "Crime"    },
  { id: "d3",  title: "The Bridge (Broen)",    year: "2018", rating: "8.6", badge: "8K",  image: `${TMDB}/xg7U76h1DNtwa0eBOIbFdiM80DR.jpg`, genre: "Crime"    },
  { id: "d4",  title: "Deadwind",              year: "2022", rating: "7.5", badge: "HD",  image: `${TMDB}/g8HVazVTozhRyc9NcshHokPn3LY.jpg`, genre: "Crime"    },
  { id: "d5",  title: "Occupied (Okkupert)",   year: "2020", rating: "7.8", badge: "HD",  image: `${TMDB}/wOeA0fPtZfNfljUUMFdgl8Lt9La.jpg`, genre: "Thriller" },
  { id: "d6",  title: "1899",                  year: "2022", rating: "7.7", badge: "HD",  image: `${TMDB}/gZleGu1MQVBArH2dlpZ9CGi0hhy.jpg`, genre: "Mystery"  },
  { id: "d7",  title: "Borgen",                year: "2022", rating: "8.3", badge: "HD",  image: `${TMDB}/stcpHqW4U4W3WxklqEEFVhctr4Y.jpg`, genre: "Drama"    },
  { id: "d8",  title: "Young Wallander",       year: "2022", rating: "7.4", badge: "HD",  image: `${TMDB}/r3cUaeLUGT8c0YIR8qCDDH2iJSU.jpg`, genre: "Crime"    },
  { id: "d9",  title: "Money Heist",           year: "2021", rating: "8.3", badge: "8K",  image: `${TMDB}/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg`, genre: "Thriller" },
  { id: "d10", title: "Peaky Blinders",        year: "2022", rating: "8.8", badge: "8K",  image: `${TMDB}/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg`, genre: "Crime"    },
  { id: "d11", title: "Fauda",                 year: "2022", rating: "8.2", badge: "HD",  image: `${TMDB}/qFHzECDLfBHkfNtMpHJPXqSLGFu.jpg`, genre: "Thriller" },
  { id: "d12", title: "Squid Game S2",         year: "2024", rating: "7.9", badge: "NEW", image: `${TMDB}/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg`, genre: "Thriller" },
  { id: "d13", title: "Succession",            year: "2023", rating: "8.9", badge: "8K",  image: `${TMDB}/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg`, genre: "Drama"    },
  { id: "d14", title: "Breaking Bad",          year: "2013", rating: "9.5", badge: "8K",  image: `${TMDB}/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg`, genre: "Thriller" },
  { id: "d15", title: "Stranger Things S4",    year: "2022", rating: "8.7", badge: "HD",  image: `${TMDB}/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg`, genre: "Sci-Fi"   },
  { id: "d16", title: "Wednesday S2",          year: "2025", rating: "8.2", badge: "NEW", image: `${TMDB}/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg`, genre: "Comedy"   },
];

// ── Row 4: 2026 Most Anticipated ──────────────────────────────────────────────
const HIGHLIGHTS_2026: MovieItem[] = [
  { id: "h1",  title: "Avengers: Doomsday",       year: "2026", rating: "9.1", badge: "NEW", image: `${TMDB}/8HkIe2i4ScpCkcX9SzZ9IPasqWV.jpg`, genre: "Action"    },
  { id: "h2",  title: "Spider-Man: Brand New Day", year: "2026", rating: "8.7", badge: "NEW", image: `${TMDB}/yyB2VJEW3an2xCdcYCPQhn9QERR.jpg`, genre: "Action"    },
  { id: "h3",  title: "The Batman Part II",        year: "2026", rating: "8.5", badge: "NEW", image: `${TMDB}/qv4YTyxvaujP79a5XZJ6F4G8Nyi.jpg`, genre: "Crime"     },
  { id: "h4",  title: "Mandalorian & Grogu",       year: "2026", rating: "8.6", badge: "NEW", image: `${TMDB}/5Vi8dSauVwH1HOsiZceDMbRr1Ca.jpg`, genre: "Sci-Fi"    },
  { id: "h5",  title: "Toy Story 5",               year: "2026", rating: "8.3", badge: "NEW", image: `${TMDB}/pxG26JdyuiDvJbSoucknaFiLeZD.jpg`, genre: "Animation" },
  { id: "h6",  title: "Wicked: Part Two",          year: "2026", rating: "8.4", badge: "NEW", image: `${TMDB}/si9tolnefLSUKaqQEGz1bWArOaL.jpg`, genre: "Musical"   },
  { id: "h7",  title: "Fast X: Part 2",            year: "2026", rating: "7.5", badge: "NEW", image: `${TMDB}/zP19YO60jwEsfKd5Qf1UvA5uJu8.jpg`, genre: "Action"    },
  { id: "h8",  title: "Black Panther 3",           year: "2026", rating: "8.1", badge: "NEW", image: `${TMDB}/sv1xJUazXeYqALzczSZ3O6nkH75.jpg`, genre: "Action"    },
  { id: "h9",  title: "House of Dragon S3",        year: "2026", rating: "8.7", badge: "NEW", image: `${TMDB}/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg`, genre: "Fantasy"   },
  { id: "h10", title: "Stranger Things S5",        year: "2025", rating: "9.1", badge: "NEW", image: `${TMDB}/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg`, genre: "Sci-Fi"    },
  { id: "h11", title: "Daredevil: Born Again S2",  year: "2026", rating: "8.6", badge: "NEW", image: `${TMDB}/AkE7OR1Khpk5OH0d7ZJfcP5Do9b.jpg`, genre: "Action"    },
  { id: "h12", title: "Squid Game S3",             year: "2025", rating: "8.3", badge: "NEW", image: `${TMDB}/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg`, genre: "Thriller"  },
];

// ── Poster Card ────────────────────────────────────────────────────────────────
function PosterCard({ m, onClick }: { m: MovieItem; onClick: () => void }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) return null;

  return (
    <button
      onClick={onClick}
      className="shrink-0 group relative rounded-xl overflow-hidden cursor-pointer"
      style={{ width: "110px" }}
    >
      <div className="aspect-[2/3] relative overflow-hidden rounded-xl bg-white/5">
        <img
          src={m.image}
          alt={m.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgFailed(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Hover play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40">
            <Play className="w-4 h-4 fill-white text-white translate-x-px" />
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-1.5 left-1.5">
          {m.badge && (
            <span className="bg-[#facc15] text-white text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none">
              {m.badge}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
          <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
          <span className="text-[7px] font-bold text-white font-mono">{m.rating}</span>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-white text-[9px] font-bold leading-tight line-clamp-2">{m.title}</p>
          <p className="text-white/45 text-[7px] font-mono mt-0.5">{m.year} · {m.genre}</p>
        </div>
      </div>
    </button>
  );
}

// ── Scroll Row ─────────────────────────────────────────────────────────────────
function ScrollRow({ items, label, reverse, onClick }: {
  items: MovieItem[];
  label: string;
  reverse?: boolean;
  onClick: () => void;
}) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="mb-5">
      <p className="serif-display italic font-light text-xl text-white/80 mb-2.5 px-1">{label}</p>
      <div className="overflow-hidden -mx-4 md:-mx-6 select-none pointer-events-none">
        <div className={`${reverse ? "animate-scroll-reverse" : "animate-scroll"} flex gap-2.5 px-4`}>
          {tripled.map((m, i) => (
            <div key={`${m.id}-${i}`} className="pointer-events-auto">
              <PosterCard m={m} onClick={onClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MovieGrid({ onPricingClick }: MovieGridProps) {
  const { lang } = useLanguage();
  const mt = movieTexts[lang] ?? defaultMovieText;

  return (
    <section id="movies-section" className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4 scroll-mt-28">
      <div
        className="rounded-2xl overflow-hidden relative text-white"
        style={{ background: "linear-gradient(145deg, #1a1a1a 0%, #111 60%, #0a0a0a 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-black/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 pt-6 pb-5">

          {/* Header — green-label style */}
          <div className="flex items-center justify-between mb-6 px-4 md:px-6">
            <div>
              <span className="text-[#facc15] text-xs font-bold uppercase tracking-[0.15em] block mb-2">{mt.freeLabel}</span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight uppercase">
                {mt.heading}{" "}
                <span className="text-white/70">{mt.headingItalic}</span>
              </h2>
            </div>
            <button onClick={onPricingClick}
              className="hidden sm:flex items-center gap-1.5 border border-white/20 hover:border-white/40 text-white text-xs font-medium px-5 py-2.5 rounded-sm transition-all whitespace-nowrap">
              {mt.exploreAll} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Row 1 — Films */}
          <ScrollRow items={[...HIGHLIGHTS_2026, ...BLOCKBUSTERS]} label={mt.films} onClick={onPricingClick} />

          {/* Row 2 — Series */}
          <ScrollRow items={[...INTL_SERIES, ...EU_FAVOURITES]} label={mt.series} reverse onClick={onPricingClick} />

          {/* Footer CTA */}
          <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between px-4 md:px-6">
            <p className="text-[9px] font-mono text-white/25">{mt.footer}</p>
            <button onClick={onPricingClick}
              className="flex items-center gap-1.5 bg-white text-[#facc15] text-[10px] font-black px-3.5 py-1.5 rounded-full hover:bg-white/90 transition-all shadow-sm">
              <span>{mt.subscribeNow}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
