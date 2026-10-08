import * as React from "react";
import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  XCircle,
  MonitorSmartphone,
  CreditCard,
  FileText,
  Gift,
  Megaphone,
  Wrench,
  Headphones,
  RefreshCw,
  Clock,
  Languages,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { ALL_POSTS, getPostBySlug } from "../data/allPosts";
import { BlogPost, getPostText, getPostLang } from "../data/blogPosts";
import { getBlogText } from "../blogI18n";
import { getTerms } from "../termsText";
import { POST_LANG_FLAGS } from "../i18n";
import type { LangCode } from "../i18n";
import { WA_NUMBER } from "../types";
import type { HpLang } from "./content";

const ORANGE = "#f7941d";
const AMBER = "#f5a623";
const AMBER_D = "#c2740a";

/** Swap the old IPTV brand for HotPlayer in reused copy. */
const hp = (s: string) => s.replace(/IPTV\s*MATE/gi, "HotPlayer");

function formatPostDate(dateISO: string, lang: string) {
  try {
    return new Intl.DateTimeFormat(lang, { day: "numeric", month: "short", year: "numeric" }).format(new Date(dateISO));
  } catch {
    return dateISO;
  }
}

/** Renders [label](url) markdown links as orange anchors. */
function RichTextHot({ text }: { text: string }) {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | { label: string; href: string })[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  pattern.lastIndex = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ label: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: ORANGE }}>
            {p.label}
          </a>
        )
      )}
    </>
  );
}

type Nav = (to: string) => void;

function ILink({ to, navigate, className, children }: { to: string; navigate: Nav; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

/* ------------------------------- blog card -------------------------------- */

function PostCard({ post, lang, langPrefix, navigate }: { post: BlogPost; lang: HpLang; langPrefix: string; navigate: Nav }) {
  const displayLang = getPostLang(post, lang as LangCode);
  const text = getPostText(post, lang as LangCode);
  const bt = getBlogText(displayLang);
  const flag = post.lang && displayLang !== lang ? POST_LANG_FLAGS[displayLang] : undefined;

  return (
    <ILink
      to={`${langPrefix}/blog/${post.slug}`}
      navigate={navigate}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img
          src={post.image}
          alt={text.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
        />
        <span className="absolute top-3 left-3 text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: ORANGE }}>
          {post.category}
        </span>
        {flag && (
          <img src={`https://flagcdn.com/w40/${flag}.png`} alt={displayLang} loading="lazy" className="absolute top-3 right-3 w-6 h-4 object-cover rounded-sm shadow" />
        )}
      </div>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-extrabold text-[#1f2a44] leading-snug line-clamp-2 mb-2">{text.title}</h3>
        <p className="text-[15px] text-neutral-500 leading-relaxed line-clamp-2 mb-4 flex-grow">{text.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200 text-[11px] font-medium text-neutral-400">
          <span>{formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}</span>
          <span className="flex items-center gap-1 font-bold group-hover:gap-1.5 transition-all" style={{ color: ORANGE }}>
            {bt.readMore} <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </ILink>
  );
}

/* ------------------------------- blog grid -------------------------------- */

export function BlogGridView({ lang, langPrefix, navigate }: { lang: HpLang; langPrefix: string; navigate: Nav }) {
  const bt = getBlogText(lang as LangCode);
  const [featured, ...rest] = ALL_POSTS;

  useEffect(() => {
    document.title = `${hp(bt.pageTag)} — HotPlayer`;
  }, [bt.pageTag]);

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-10 md:py-14">
      {/* hero banner */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-10 px-6 py-12 md:px-12 md:py-16 bg-gradient-to-r from-[#f7f7f8] via-[#faf3e3] to-[#fdeccf]">
        <div className="relative z-10 max-w-[620px]">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-orange-200 bg-orange-100/60">
            <Sparkles className="w-3.5 h-3.5" style={{ color: ORANGE }} />
            <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: AMBER_D }}>{hp(bt.pageTag)}</span>
          </span>
          <h1 className="mt-4 text-[2.1rem] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1f2a44] leading-[1.05]">
            {bt.heading} <span style={{ color: ORANGE }}>{bt.headingItalic}</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-neutral-500 max-w-md leading-relaxed">{hp(bt.subheading)}</p>
        </div>
      </div>

      {/* featured */}
      {featured && <FeaturedCard post={featured} lang={lang} langPrefix={langPrefix} navigate={navigate} />}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <div key={post.slug} className="deferred-card">
              <PostCard post={post} lang={lang} langPrefix={langPrefix} navigate={navigate} />
            </div>
          ))}
        </div>
      )}

      {ALL_POSTS.length === 0 && <p className="text-center text-neutral-400 text-lg py-16">{bt.notFoundDesc}</p>}
    </section>
  );
}

function FeaturedCard({ post, lang, langPrefix, navigate }: { post: BlogPost; lang: HpLang; langPrefix: string; navigate: Nav }) {
  const displayLang = getPostLang(post, lang as LangCode);
  const bt = getBlogText(displayLang);
  const text = getPostText(post, lang as LangCode);
  return (
    <ILink
      to={`${langPrefix}/blog/${post.slug}`}
      navigate={navigate}
      className="group grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-2xl transition-shadow duration-300 mb-8 no-underline"
    >
      <div className="relative aspect-video md:aspect-auto overflow-hidden bg-neutral-100">
        <img src={post.image} alt={text.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: ORANGE }}>{bt.featured}</span>
          <span className="text-neutral-400 text-[10px] font-black uppercase tracking-wide">{post.category}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2a44] leading-snug mb-3">{text.title}</h2>
        <p className="text-base text-neutral-500 leading-relaxed mb-6 line-clamp-3">{text.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-neutral-400">{formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}</span>
          <span className="flex items-center gap-1.5 font-bold text-sm group-hover:gap-2.5 transition-all" style={{ color: ORANGE }}>{bt.readMore} <ArrowRight className="w-4 h-4" /></span>
        </div>
      </div>
    </ILink>
  );
}

/* ------------------------------- blog post -------------------------------- */

export function BlogPostView({ slug, lang, langPrefix, navigate, onPricing }: { slug: string; lang: HpLang; langPrefix: string; navigate: Nav; onPricing: () => void }) {
  const post = getPostBySlug(slug);
  const displayLang = post ? getPostLang(post, lang as LangCode) : (lang as LangCode);
  const bt = getBlogText(displayLang);
  const text = post ? getPostText(post, lang as LangCode) : null;

  useEffect(() => {
    document.title = text ? `${text.title} — HotPlayer` : `${bt.notFoundTitle} — HotPlayer`;
  }, [text, bt.notFoundTitle]);

  if (!post || !text) {
    return (
      <section className="px-4 md:px-8 max-w-2xl mx-auto w-full py-24 text-center">
        <h1 className="text-3xl font-extrabold text-[#1f2a44] mb-3">{bt.notFoundTitle}</h1>
        <p className="text-lg text-neutral-500 mb-8">{bt.notFoundDesc}</p>
        <ILink to={`${langPrefix}/blog`} navigate={navigate} className="inline-flex items-center gap-2 font-bold no-underline" >
          <span style={{ color: ORANGE }} className="inline-flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> {bt.backToBlog}</span>
        </ILink>
      </section>
    );
  }

  const sameLang = ALL_POSTS.filter((p) => p.slug !== post.slug && getPostLang(p, lang as LangCode) === displayLang);
  const otherLang = ALL_POSTS.filter((p) => p.slug !== post.slug && getPostLang(p, lang as LangCode) !== displayLang);
  const related = [...sameLang, ...otherLang].slice(0, 3);

  return (
    <article className="px-4 md:px-8 max-w-5xl mx-auto w-full py-10">
      <div className="max-w-3xl mx-auto">
        <ILink to={`${langPrefix}/blog`} navigate={navigate} className="flex items-center gap-2 font-bold text-sm mb-6 w-fit no-underline" >
          <span style={{ color: ORANGE }} className="inline-flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> {bt.backToBlog}</span>
        </ILink>

        <span className="block w-fit text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full mb-4" style={{ backgroundColor: ORANGE }}>
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1f2a44] leading-tight mb-4">{text.title}</h1>
        <p className="text-sm font-medium text-neutral-400 mb-8">{formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}</p>
      </div>

      <div className="rounded-2xl overflow-hidden mb-10 bg-neutral-100 aspect-[16/9]">
        <img src={post.image} alt={text.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
      </div>

      <div className="max-w-3xl mx-auto space-y-6 mb-12">
        {text.body.map((paragraph, i) =>
          paragraph.startsWith("## ") ? (
            <h2 key={i} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1f2a44] !mt-12 !mb-2">
              <RichTextHot text={paragraph.slice(3)} />
            </h2>
          ) : (
            <p key={i} className="text-lg leading-relaxed text-neutral-600">
              <RichTextHot text={paragraph} />
            </p>
          )
        )}
      </div>

      <div className="rounded-2xl px-6 py-10 text-center text-white mb-14" style={{ background: `linear-gradient(135deg, ${AMBER_D} 0%, ${ORANGE} 60%, ${AMBER} 100%)` }}>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-5">{hp(bt.ctaHeading)}</h2>
        <button onClick={onPricing} className="inline-flex items-center gap-2 bg-white font-black px-6 py-3 rounded-full hover:bg-white/90 transition-all" style={{ color: AMBER_D }}>
          {bt.ctaButton} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="text-2xl font-extrabold text-[#1f2a44] mb-5">{bt.related}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <div key={p.slug}>
                <PostCard post={p} lang={lang} langPrefix={langPrefix} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

/* --------------------------------- terms ---------------------------------- */

const SECTION_ICONS = [
  ShieldCheck, XCircle, MonitorSmartphone, CreditCard, FileText, Gift, Megaphone,
  Wrench, Headphones, RefreshCw, Clock, Languages, AlertTriangle, CheckCircle2,
];

export function TermsView({ lang }: { lang: HpLang }) {
  const tt = getTerms(lang as LangCode);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(hp(tt.waText))}`;

  useEffect(() => {
    document.title = `${tt.title1} ${tt.title2} — HotPlayer`;
  }, [tt.title1, tt.title2]);

  return (
    <section className="px-4 md:px-8 max-w-4xl mx-auto w-full py-8 md:py-12">
      {/* hero */}
      <div className="relative rounded-3xl overflow-hidden mb-10 px-6 py-12 md:px-12 md:py-16 text-center bg-gradient-to-r from-[#f7f7f8] via-[#faf3e3] to-[#fdeccf]">
        <div className="relative z-10">
          <img src="/logoBlackPlayer.svg" alt="HotPlayer" className="h-9 w-auto mx-auto mb-6" />
          <span className="block text-lg md:text-xl text-neutral-500 mb-2">{tt.eyebrow}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#1f2a44] mb-4">
            {tt.title1}<br className="hidden md:block" /> {tt.title2}
          </h1>
          <p className="text-base md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">{hp(tt.intro)}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {tt.chips.map((chip) => (
              <span key={chip} className="px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-neutral-600 bg-white border border-neutral-200">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 md:p-6 mb-10" style={{ background: "rgba(247,148,29,0.07)", border: "1px solid rgba(247,148,29,0.25)" }}>
        <p className="text-[15px] font-bold text-[#1f2a44] leading-relaxed">{hp(tt.summary)}</p>
      </div>

      <div className="space-y-6">
        {tt.sections.map(({ title, body }, si) => {
          const Icon = SECTION_ICONS[si] ?? FileText;
          return (
            <div key={title} className="rounded-2xl p-5 md:p-7 bg-white border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center" style={{ background: "rgba(247,148,29,0.1)", border: "1px solid rgba(247,148,29,0.25)" }}>
                  <Icon style={{ color: ORANGE, width: 18, height: 18 }} />
                </span>
                <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-[#1f2a44]">{title}</h2>
              </div>
              <ul className="space-y-2.5">
                {body.map((line, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-600">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: ORANGE }} />
                    <span>{hp(line)}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl p-6 md:p-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${AMBER_D} 0%, ${ORANGE} 60%, ${AMBER} 100%)` }}>
        <h2 className="text-xl md:text-2xl font-extrabold mb-2">{hp(tt.ctaHeading)}</h2>
        <p className="text-lg text-white/90 mb-6">{hp(tt.ctaText)}</p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider no-underline bg-white transition-all hover:opacity-90" style={{ color: AMBER_D }}>
          {tt.ctaButton}
        </a>
      </div>

      <p className="text-sm text-neutral-500 mt-8 leading-relaxed">{hp(tt.updated)}</p>
    </section>
  );
}
