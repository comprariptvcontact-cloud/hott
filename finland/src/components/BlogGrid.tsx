import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BlogPost, getPostText, getPostLang } from "../data/blogPosts";
import { ALL_POSTS } from "../data/allPosts";
import { useLanguage } from "../LanguageContext";
import { getBlogText } from "../blogI18n";
import BlogPostCard, { formatPostDate } from "./BlogPostCard";

function FeaturedPost({ post }: { post: BlogPost }) {
  const { lang, langPrefix } = useLanguage();
  const displayLang = getPostLang(post, lang);
  const bt = getBlogText(displayLang);
  const text = getPostText(post, lang);

  return (
    <a
      href={`${langPrefix}/blog/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden bg-[#111] border border-white/10 hover:shadow-2xl transition-shadow duration-300 mb-8"
    >
      <div className="relative aspect-video md:aspect-auto overflow-hidden">
        {/* The featured post sits at the top of the grid, so it stays eager —
            it is the one card image worth fetching before the viewport reaches
            it. Every other card lazy-loads (see BlogPostCard). */}
        <img
          src={post.image}
          alt={text.title}
          decoding="async"
          width={1200}
          height={675}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.currentTarget.src = "/hero-bg.jpg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111] via-transparent to-transparent opacity-70 md:opacity-40" />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#facc15] text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full">
            {bt.featured}
          </span>
          <span className="text-white/40 text-[10px] font-black uppercase tracking-wide">{post.category}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors">
          {text.title}
        </h2>
        <p className="serif-display italic font-light text-base text-white/55 leading-relaxed mb-6 line-clamp-3">
          {text.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-white/35">
            {formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}
          </span>
          <span className="flex items-center gap-1.5 text-white font-bold text-sm group-hover:gap-2.5 transition-all">
            {bt.readMore} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function BlogGrid() {
  const { lang, langPrefix } = useLanguage();
  const bt = getBlogText(lang);
  const [featured, ...rest] = ALL_POSTS;

  useEffect(() => {
    document.title = `${bt.pageTag} — NERO IPTV`;
  }, [bt.pageTag]);

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">

      {/* Hero banner — gradient */}
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[400px] sm:min-h-[380px] md:min-h-[420px] flex flex-col mb-10" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d0d 40%, #1a0011 100%)" }}>
        <div className="absolute top-0 right-0 w-[60%] h-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 30%, #facc15 0%, transparent 70%)" }} />

        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col justify-center h-full flex-1 gap-4 max-w-[560px]">
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/70">{bt.pageTag}</span>
          </div>
          <h1 className="text-[2.1rem] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            {bt.heading}{" "}
            <span className="serif-display italic font-light text-white/85">{bt.headingItalic}</span>
          </h1>
          <p className="serif-display italic font-light text-base sm:text-lg text-white/55 max-w-md leading-relaxed">
            {bt.subheading}
          </p>
        </div>
      </div>

      {featured && <FeaturedPost post={featured} />}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <div key={post.slug} className="deferred-card">
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {ALL_POSTS.length === 0 && (
        <p className="text-center text-white/40 text-lg py-16">{bt.notFoundDesc}</p>
      )}
    </section>
  );
}
