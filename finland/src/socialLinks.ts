/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PASTE THE ACCOUNT LINKS HERE.
 *
 *  Each entry below has an empty `url`. Fill one in and that icon immediately
 *  becomes a real, clickable link in the footer. An entry whose `url` is still
 *  empty renders as a dimmed, non-clickable icon — so nothing ever ships as a
 *  dead link, and you can see at a glance which ones are still missing.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export interface SocialLink {
  id: SocialId;
  /** Accessible name — also the tooltip. */
  label: string;
  /** Full https:// URL of the account. Empty = not published yet. */
  url: string;
  /** Brand colour of the button. */
  brand: string;
}

export type SocialId = 'x' | 'reddit' | 'tiktok' | 'facebook' | 'instagram' | 'whatsapp';

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'facebook',  label: 'Facebook',         url: '', brand: '#1877F2' },
  { id: 'instagram', label: 'Instagram',        url: '', brand: '#E1306C' },
  { id: 'tiktok',    label: 'TikTok',           url: '', brand: '#010101' },
  { id: 'x',         label: 'X',                url: '', brand: '#000000' },
  { id: 'reddit',    label: 'Reddit',           url: '', brand: '#FF4500' },
  { id: 'whatsapp',  label: 'WhatsApp-kanaal',  url: '', brand: '#25D366' },
];
