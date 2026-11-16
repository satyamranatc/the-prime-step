"use client";

import { useEffect, useState } from "react";

interface Phrase {
  text: string;
  highlight?: string;
}

const PHRASES: Phrase[] = [
  {
    text: "Every career begins with a single step.",
  },
  {
    text: "The step should be The Prime Step.",
    highlight: "The Prime Step",
  },
];

// Longest phrase reserves the exact height of the headline container so typing never shifts layout or leaves a gap
const LONGEST_PHRASE = "Every career begins with a single step.";

export default function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(PHRASES[0].text.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  const currentPhrase = PHRASES[phraseIndex];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMqChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMqChange);

    const initTimer = setTimeout(() => {
      if (mq.matches) setReducedMotion(true);
      if (document.documentElement.dataset.ready) setPageReady(true);
    }, 0);

    const handleReady = () => setPageReady(true);
    window.addEventListener("pps-ready", handleReady, { once: true });
    const fallbackTimer = setTimeout(() => setPageReady(true), 1600);

    return () => {
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("pps-ready", handleReady);
      clearTimeout(initTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !pageReady) return;

    const fullLen = currentPhrase.text.length;
    let delay = 50;

    if (isPaused) {
      delay = charCount === fullLen ? 3400 : 380;
    } else if (isDeleting) {
      delay = charCount > 0 ? 22 : 10;
    } else {
      delay = charCount < fullLen ? 46 + ((charCount * 7) % 18) : 10;
    }

    const timer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        if (charCount === fullLen) {
          setIsDeleting(true);
        } else {
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setIsDeleting(false);
        }
      } else if (isDeleting) {
        if (charCount > 0) {
          setCharCount((prev) => prev - 1);
        } else {
          setIsPaused(true);
        }
      } else if (charCount < fullLen) {
        setCharCount((prev) => prev + 1);
      } else {
        setIsPaused(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, isPaused, phraseIndex, currentPhrase.text.length, reducedMotion, pageReady]);

  if (reducedMotion) {
    return <span className="block">{PHRASES[0].text}</span>;
  }

  const visibleText = currentPhrase.text.slice(0, charCount);
  let renderedContent: React.ReactNode = visibleText;

  if (currentPhrase.highlight && visibleText.includes("The step should be ")) {
    const prefix = "The step should be ";
    const typedHighlight = visibleText.slice(prefix.length);
    const cleanHighlight = currentPhrase.highlight;
    const highlightPart = typedHighlight.slice(0, cleanHighlight.length);
    const trailingPunctuation = typedHighlight.slice(cleanHighlight.length);

    renderedContent = (
      <>
        <span>{prefix}</span>
        {highlightPart && (
          <span className="text-brand font-bold transition-colors duration-300">
            {highlightPart}
          </span>
        )}
        {trailingPunctuation && <span>{trailingPunctuation}</span>}
      </>
    );
  }

  return (
    <span className="relative block" aria-label={currentPhrase.text}>
      {/* Screen reader full announcement */}
      <span className="sr-only">{currentPhrase.text}</span>

      {/* Invisible ghost text that reserves the exact 2-line height of the final headline */}
      <span aria-hidden="true" className="invisible block select-none pointer-events-none">
        {LONGEST_PHRASE}
      </span>

      {/* Active typed text overlaid at top-left with zero layout gap */}
      <span aria-hidden="true" className="absolute inset-0 block">
        <span>{renderedContent}</span>
        <span
          className={`inline-block w-[3px] sm:w-[4px] h-[0.78em] bg-brand align-[-0.04em] ml-1.5 rounded-full select-none ${
            isPaused ? "animate-caret-blink" : "opacity-100"
          }`}
        />
      </span>
    </span>
  );
}
