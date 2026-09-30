import { ArrowRight } from "lucide-react";
import { BlogPost, getPostText, getPostLang } from "../data/blogPosts";
import { useLanguage } from "../LanguageContext";
import { getBlogText } from "../blogI18n";
import { POST_LANG_FLAGS, SITE_LANG } from "../i18n";

export function formatPostDate(dateISO: string, lang: string) {
  try {
    return new Intl.DateTimeFormat(lang, { day: "numeric", month: "short", year: "numeric" }).format(new Date(dateISO));
  } catch {
    return dateISO;
  }
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const { lang, langPrefix } = useLanguage();
  const displayLang = getPostLang(post, lang);
  const text = getPostText(post, lang);
  const bt = getBlogText(displayLang);
  // Only badge posts that are not in the site language, so the Dutch majority stays clean.
  const flag = displayLang === SITE_LANG ? undefined : POST_LANG_FLAGS[displayLang];

  return (
    <a
      href={`${langPrefix}/blog/${post.slug}`}
      className="group flex flex-col bg-white/10 rounded-2xl overflow-hidden border border-neutral-900/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img
          src={post.image}
          alt={text.title}
          loading="lazy"
          decoding="async"
          width={1200}
          height={675}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.currentTarget.src = "/hero-bg.jpg"; }}
        />
        <span className="absolute top-3 left-3 bg-[#facc15] text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full">
          {post.category}
        </span>
        {post.lang && flag && (
          <img
            src={`https://flagcdn.com/w40/${flag}.png`}
            alt={displayLang}
            loading="lazy"
            decoding="async"
            width={24}
            height={16}
            className="absolute top-3 right-3 w-6 h-4 object-cover rounded-sm shadow"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-extrabold text-white leading-snug line-clamp-2 mb-2">{text.title}</h3>
        <p className="serif-display italic font-light text-[15px] text-white/60 leading-relaxed line-clamp-2 mb-4 flex-grow">
          {text.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-neutral-900/8 text-[11px] font-mono text-white/50">
          <span>{formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}</span>
          <span className="flex items-center gap-1 text-[#facc15] font-bold group-hover:gap-1.5 transition-all">
            {bt.readMore} <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}
