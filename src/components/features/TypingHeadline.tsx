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
    setReducedMotion(mq.matches);

    if (document.documentElement.dataset.ready) {
      setPageReady(true);
    } else {
      const handleReady = () => setPageReady(true);
      window.addEventListener("pps-ready", handleReady, { once: true });
      const fallbackTimer = setTimeout(() => setPageReady(true), 1600);
      return () => {
        window.removeEventListener("pps-ready", handleReady);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || !pageReady) return;

    let timer: NodeJS.Timeout;

    if (isPaused) {
      const isComplete = charCount === currentPhrase.text.length;
      const pauseDuration = isComplete ? 3400 : 380;

      timer = setTimeout(() => {
        setIsPaused(false);
        if (isComplete) {
          setIsDeleting(true);
        } else {
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setIsDeleting(false);
        }
      }, pauseDuration);
    } else if (isDeleting) {
      if (charCount > 0) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 22);
      } else {
        setIsPaused(true);
      }
    } else {
      if (charCount < currentPhrase.text.length) {
        const jitter = Math.floor(Math.random() * 18);
        timer = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 46 + jitter);
      } else {
        setIsPaused(true);
      }
    }

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
