const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders paragraph text containing markdown-style [label](url) links as real anchors. */
export default function RichText({ text }: { text: string }) {
  const parts: (string | { label: string; href: string })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push({ label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <a
            key={i}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#facc15] font-bold hover:underline"
          >
            {part.label}
          </a>
        )
      )}
    </>
  );
}
