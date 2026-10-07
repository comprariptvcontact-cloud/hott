import { LangCode } from "../i18n";

export interface BlogPostText {
  title: string;
  excerpt: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  image: string;
  dateISO: string;
  minutes: number;
  /** Fixed display language for single-language SEO landing posts. When set, the post always
   *  renders in this language regardless of the site-wide language switcher. */
  lang?: LangCode;
  content: Partial<Record<LangCode, BlogPostText>>;
}

export function getPostLang(post: BlogPost, siteLang: LangCode): LangCode {
  return post.lang ?? siteLang;
}

export function getPostText(post: BlogPost, lang: LangCode): BlogPostText {
  const effectiveLang = getPostLang(post, lang);
  return post.content[effectiveLang] ?? post.content.en ?? Object.values(post.content)[0]!;
}

// A legacy BLOG_POSTS array predating the IPTV MATE / German-market pivot
// (Finland-targeted copy, Finnish translations, old brand in slugs)
// used to live here — removed. See the sibling deBlogPostsNN.ts /
// enBlogPostsNN.ts files for current content.
