import { SOCIAL_LINKS, SocialId } from "../socialLinks";
import { useLanguage } from "../LanguageContext";
import { getExtra } from "../i18nExtra";

/**
 * The brand glyphs, drawn white on the button's own brand colour. Reddit is the
 * one mark with cut-outs, so it takes the background colour to punch the eyes
 * and the smile back out of the white face.
 */
function Glyph({ id, bg }: { id: SocialId; bg: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" };

  switch (id) {
    case "facebook":
      return (
        <svg {...common} fill="#fff" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
        </svg>
      );

    case "instagram":
      return (
        <svg {...common} fill="none" aria-hidden="true">
          <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" stroke="#fff" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="2" />
          <circle cx="17.4" cy="6.6" r="1.35" fill="#fff" />
        </svg>
      );

    case "tiktok":
      return (
        <svg {...common} fill="none" aria-hidden="true">
          <path
            d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004C16.362 1.333 16.4 1 16.4 1h-3.797v14.073c0 .189 0 .376-.008.561 0 .022-.002.042-.003.065v.017a3.22 3.22 0 01-1.615 2.516 3.164 3.164 0 01-1.574.42c-1.75 0-3.168-1.427-3.168-3.188 0-1.762 1.418-3.189 3.168-3.189.332 0 .65.052.95.147l.005-3.87a7.018 7.018 0 00-4.947 2.055A7.126 7.126 0 003.9 15.504c0 1.898.733 3.687 2.066 5.035A6.964 6.964 0 0011 22.564a6.964 6.964 0 005.034-2.025 7.12 7.12 0 002.066-5.035V8.418a9.196 9.196 0 005.4 1.739V6.37c-1.079 0-3.393-.71-4.179-4.808z"
            fill="#fff"
          />
        </svg>
      );

    case "x":
      return (
        <svg {...common} fill="#fff" aria-hidden="true">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
        </svg>
      );

    case "reddit":
      return (
        <svg {...common} fill="none" aria-hidden="true">
          {/* Ears, head and antenna in white… */}
          <circle cx="3.4" cy="12.6" r="3.1" fill="#fff" />
          <circle cx="20.6" cy="12.6" r="3.1" fill="#fff" />
          <ellipse cx="12" cy="14.2" rx="9.5" ry="6.7" fill="#fff" />
          <path d="M12 7.8 15.3 3.9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16.5" cy="3" r="2.1" fill="#fff" />
          {/* …eyes and smile punched back out in the button colour. */}
          <circle cx="8.5" cy="13.5" r="1.7" fill={bg} />
          <circle cx="15.5" cy="13.5" r="1.7" fill={bg} />
          <path d="M8.3 17.3q3.7 2.5 7.4 0" stroke={bg} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg {...common} fill="#fff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      );
  }
}

/**
 * Footer social row. An account whose URL has not been filled in yet in
 * `socialLinks.ts` is shown dimmed and non-clickable rather than linking
 * somewhere wrong.
 */
export default function SocialLinks() {
  const { lang } = useLanguage();
  const sx = getExtra(lang).social;

  return (
    <div className="pt-1">
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/60 mb-3">
        {sx.follow}
      </p>
      <ul className="flex flex-wrap items-center gap-2.5 list-none p-0 m-0">
        {SOCIAL_LINKS.map(({ id, label, url, brand }) => {
          const glyph = <Glyph id={id} bg={brand} />;
          return (
            <li key={id}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:brightness-110 active:scale-95"
                  style={{ background: brand, border: "1px solid rgba(255,255,255,0.14)" }}
                >
                  {glyph}
                </a>
              ) : (
                <span
                  aria-hidden="true"
                  title={`${label} — ${sx.linkNotSet ?? "link not configured"}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center opacity-30 cursor-default"
                  style={{ background: brand, border: "1px solid rgba(255,255,255,0.14)" }}
                >
                  {glyph}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
