import { Star, BadgeCheck } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { getExtra } from "../i18nExtra";
import { getReviews } from "../reviewsText";

const DISPLAY_REVIEW_COUNT = 300;

const EU_REVIEWS = [
  { id: "r1", name: "Thomas M.", location: "Hamburg", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2025-05-15", verified: true },
  { id: "r2", name: "Sophie L.", location: "Frankfurt", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2025-04-15", verified: true },
  { id: "r3", name: "Marco B.", location: "München", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2025-03-15", verified: true },
  { id: "r4", name: "Jens W.", location: "Stuttgart", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2025-02-15", verified: true },
  { id: "r5", name: "Anja G.", location: "Köln", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2025-01-15", verified: true },
  { id: "r6", name: "Kevin D.", location: "Leipzig", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2024-12-15", verified: true },
  { id: "r7", name: "Martina K.", location: "Düsseldorf", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2024-11-15", verified: true },
  { id: "r8", name: "David P.", location: "Dresden", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80", ratingValue: 5, dateISO: "2024-10-15", verified: true },
  { id: "r9", name: "Isabelle R.", location: "Berlin", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80", ratingValue: 4, dateISO: "2024-09-15", verified: false },
];

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const rx = getExtra(lang).reviews;
  const copy = getReviews(lang);
  const monthYear = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(new Date(iso));
    } catch {
      return iso.slice(0, 7);
    }
  };
  const avgRating = "4.9";

  return (
    <section id="reviews-section" className="py-16 md:py-24 px-4 md:px-8 w-full scroll-mt-28" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#facc15] mb-3">
            {t.testimonials.subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {t.testimonials.heading}{" "}
            <span className="text-white/80">{t.testimonials.italic}</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-4 max-w-2xl mx-auto">
            {t.testimonials.desc}
          </p>
        </div>

        {/* Aggregate rating */}
        <div className="flex items-center justify-center gap-6 mb-14">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black text-white">{avgRating}</span>
            <div className="flex items-center gap-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
              ))}
            </div>
            <span className="text-xs text-white/40 mt-1">{DISPLAY_REVIEW_COUNT} {rx.count}</span>
          </div>
          <div className="h-14 w-px bg-white/10" />
          <div className="flex flex-col gap-1.5">
            {([
              { star: 5, pct: 91 },
              { star: 4, pct: 7 },
              { star: 3, pct: 2 },
            ] as const).map(({ star, pct }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-white/40 w-3">{star}</span>
                <Star className="w-3 h-3 fill-[#facc15] text-[#facc15]" />
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-[#facc15]" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-white/30">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EU_REVIEWS.map((review, ri) => (
            <div key={review.id}
              className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:border-white/15 transition-all duration-300">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.ratingValue ? "fill-[#facc15] text-[#facc15]" : "fill-white/10 text-white/10"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-white/30">{monthYear(review.dateISO)}</span>
                </div>
                <p className="text-sm font-bold text-white mb-1.5">"{copy[ri].highlight}"</p>
                <p className="text-sm text-white/50 leading-relaxed">{copy[ri].text}</p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/8">
                <div className="flex items-center gap-2.5">
                  <img src={review.avatar} alt={review.name} referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                    onError={e => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const p = el.parentElement;
                      if (p) p.innerHTML = `<div style="width:36px;height:36px;border-radius:50%;background:#facc15;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:13px;flex-shrink:0">${review.name[0]}</div>` + p.innerHTML;
                    }} />
                  <div>
                    <p className="text-sm font-bold text-white leading-none">{review.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{copy[ri].role} · {review.location}</p>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 shrink-0">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#facc15]" />
                    <span className="text-[10px] font-bold text-[#facc15] uppercase tracking-wide">{rx.verified}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03]">
            <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
            <span className="text-sm font-bold text-white">{t.testimonials.rate}</span>
          </div>
        </div>

        {/* AggregateRating structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "PANDORA IPTV",
            description: "Premium IPTV subscription for Europe — 69,000+ live channels, 220,000+ movies & series in up to 8K.",
            brand: { "@type": "Brand", name: "PANDORA IPTV" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avgRating,
              bestRating: "5",
              worstRating: "1",
              ratingCount: DISPLAY_REVIEW_COUNT,
            },
          }) }}
        />
      </div>
    </section>
  );
}
