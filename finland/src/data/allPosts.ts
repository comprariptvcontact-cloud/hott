import { BlogPost } from "./blogPosts";
import { NL_KW_BLOG_POSTS } from "./nlKeywordBlogPosts";
import { NL_KW_BLOG_POSTS3 } from "./nlKeywordBlogPosts3";
import { NL_KW_BLOG_POSTS2 } from "./nlKeywordBlogPosts2";
import { PRINCIPAL_POSTS } from "./principalPosts";
import { DE_KW_BLOG_POSTS } from "./deKeywordBlogPosts";
import { DE_KW_BLOG_POSTS3 } from "./deKeywordBlogPosts3";
import { DE_KW_BLOG_POSTS2 } from "./deKeywordBlogPosts2";
import { SEO_BLOG_POSTS } from "./seoBlogPosts";
import { DE_OFFER_POSTS } from "./deOfferPost";

export const ALL_POSTS: BlogPost[] = [
  ...NL_KW_BLOG_POSTS, ...NL_KW_BLOG_POSTS3, ...NL_KW_BLOG_POSTS2,...PRINCIPAL_POSTS, ...DE_KW_BLOG_POSTS, ...DE_KW_BLOG_POSTS3, ...DE_KW_BLOG_POSTS2, ...DE_OFFER_POSTS, ...SEO_BLOG_POSTS].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}
