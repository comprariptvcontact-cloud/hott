import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";
import { getPostText, getPostLang } from "../data/blogPosts";
import { ALL_POSTS, getPostBySlug } from "../data/allPosts";
import { useLanguage } from "../LanguageContext";
import { getBlogText } from "../blogI18n";
import BlogPostCard, { formatPostDate } from "./BlogPostCard";
import RichText from "./RichText";

interface BlogPostProps {
  slug: string;
  onPricingClick: () => void;
}

export default function BlogPost({ slug, onPricingClick }: BlogPostProps) {
  const { lang, langPrefix } = useLanguage();
  const post = getPostBySlug(slug);
  const displayLang = post ? getPostLang(post, lang) : lang;
  const bt = getBlogText(displayLang);
  const text = post ? getPostText(post, lang) : null;

  useEffect(() => {
    document.title = text ? `${text.title} — NERO IPTV` : `${bt.notFoundTitle} — NERO IPTV`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", text ? text.excerpt : bt.notFoundDesc);
  }, [text, bt.notFoundTitle, bt.notFoundDesc]);

  if (!post || !text) {
    return (
      <section className="px-4 md:px-8 max-w-2xl mx-auto w-full py-24 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-3">{bt.notFoundTitle}</h1>
        <p className="serif-display italic font-light text-lg text-white/60 mb-8">{bt.notFoundDesc}</p>
        <a href={`${langPrefix}/blog`} className="inline-flex items-center gap-2 text-[#facc15] font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> {bt.backToBlog}
        </a>
      </section>
    );
  }

  const sameLang = ALL_POSTS.filter(p => p.slug !== post.slug && getPostLang(p, lang) === displayLang);
  const otherLang = ALL_POSTS.filter(p => p.slug !== post.slug && getPostLang(p, lang) !== displayLang);
  const related = [...sameLang, ...otherLang].slice(0, 3);

  return (
    <article className="px-4 md:px-8 max-w-5xl mx-auto w-full py-10">
      <div className="max-w-3xl mx-auto">
        <a href={`${langPrefix}/blog`} className="flex items-center gap-2 text-[#facc15] font-bold text-sm hover:underline mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> {bt.backToBlog}
        </a>

        <span className="block w-fit bg-[#facc15] text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full mb-4">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          {text.title}
        </h1>

        <p className="text-sm font-mono text-white/50 mb-8">
          {formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden mb-10 bg-neutral-100 aspect-[16/9]">
        <img
          src={post.image}
          alt={text.title}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src = "/hero-bg.jpg"; }}
        />
      </div>

      <div className="max-w-3xl mx-auto space-y-6 mb-12">
        {text.body.map((paragraph, i) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={i} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white !mt-12 !mb-2">
                <RichText text={paragraph.slice(3)} />
              </h2>
            );
          }
          return (
            <p key={i} className="text-lg leading-relaxed text-white/70">
              <RichText text={paragraph} />
            </p>
          );
        })}
      </div>

      <div
        className="rounded-2xl px-6 py-10 text-center text-white mb-14"
        style={{ background: "linear-gradient(135deg, #ca8a04 0%, #facc15 100%)" }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-5">{bt.ctaHeading}</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onPricingClick}
            className="inline-flex items-center gap-2 bg-white text-[#facc15] font-black px-6 py-3 rounded-full hover:bg-white/90 transition-all"
          >
            {bt.ctaButton} <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://www.instagram.com/nero-iptv/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
          >
            <Instagram className="w-4 h-4" /> @NERO IPTV
          </a>
        </div>
        <p className="text-white/50 text-xs mt-4 font-mono">
          <span className="hover:text-white transition-colors">
            NERO IPTV
          </span>
        </p>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="text-2xl font-extrabold text-white mb-5">{bt.related}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p => (
              <div key={p.slug}>
                <BlogPostCard post={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
