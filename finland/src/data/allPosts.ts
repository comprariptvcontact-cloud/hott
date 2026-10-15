import { BlogPost } from "./blogPosts";
import { PRINCIPAL_POSTS } from "./principalPosts";
import { DE_KW_BLOG_POSTS } from "./deKeywordBlogPosts";
import { SEO_BLOG_POSTS } from "./seoBlogPosts";
import { DE_OFFER_POSTS } from "./deOfferPost";

export const ALL_POSTS: BlogPost[] = [...PRINCIPAL_POSTS, ...DE_KW_BLOG_POSTS, ...DE_OFFER_POSTS, ...SEO_BLOG_POSTS].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}
