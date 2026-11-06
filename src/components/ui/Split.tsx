import type { ElementType } from "react";

/**
 * Masked word-split headline. `|` forces a line break; `*word*` renders italic teal.
 * Words carry `data-w` so GSAP can reveal them; full text stays available to assistive tech / SEO.
 */
export default function Split({
  text,
  as: Tag = "span",
  className = "",
  dark = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  dark?: boolean;
}) {
  const plain = text.replace(/\*/g, "").replace(/\|/g, " ");
  return (
    <Tag className={className} data-split>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {text.split("|").map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((w, wi) => {
              const em = w.startsWith("*") && w.endsWith("*");
              const word = em ? w.slice(1, -1) : w;
              return (
                <span
                  key={wi}
                  className={`inline-block overflow-hidden pb-[0.38em] align-bottom ${
                    em ? "pr-[0.18em] mr-[0.12em]" : "pr-[0.04em] mr-[0.22em]"
                  }`}
                >
                  <span
                    data-w
                    className={`inline-block will-change-transform ${
                      em ? (dark ? "italic text-pale" : "italic text-brand") : ""
                    }`}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}

