"use client";

import { useEffect, useState, useRef } from "react";

interface Phrase {
  text: string;
  // Substring inside `text` to style with brand teal highlight
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

    // Wait until hero curtain split has completely finished
    if (document.documentElement.dataset.ready) {
      setPageReady(true);
    } else {
      const handleReady = () => setPageReady(true);
      window.addEventListener("pps-ready", handleReady, { once: true });
      // Fallback in case pps-ready doesn't fire
      const fallbackTimer = setTimeout(() => setPageReady(true), 3000);
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
      // Dignified unhurried pause on completed sentence (~3.4s); snappy pause when empty (~400ms)
      const isComplete = charCount === currentPhrase.text.length;
      const pauseDuration = isComplete ? 3400 : 420;

      timer = setTimeout(() => {
        setIsPaused(false);
        if (isComplete) {
          setIsDeleting(true);
        } else {
          // Switch to next phrase and start typing
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setIsDeleting(false);
        }
      }, pauseDuration);
    } else if (isDeleting) {
      // Deleting characters quickly and smoothly (~24ms per character)
      if (charCount > 0) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 24);
      } else {
        // Fully erased, pause momentarily before typing next phrase
        setIsPaused(true);
      }
    } else {
      // Typing characters forward with natural, organic cadence (45ms - 65ms)
      if (charCount < currentPhrase.text.length) {
        const jitter = Math.floor(Math.random() * 20);
        timer = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 50 + jitter);
      } else {
        // Finished typing entire sentence, pause for reading
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, isPaused, phraseIndex, currentPhrase.text.length, reducedMotion, pageReady]);

  // If user prefers reduced motion, display first phrase statically
  if (reducedMotion) {
    return (
      <span className="inline">
        {PHRASES[0].text}
      </span>
    );
  }

  // Render current typed substring with optional brand highlight
  const visibleText = currentPhrase.text.slice(0, charCount);

  let renderedContent: React.ReactNode = visibleText;

  if (currentPhrase.highlight && visibleText.includes("The step should be ")) {
    const prefix = "The step should be ";
    const typedHighlight = visibleText.slice(prefix.length);

    // If highlight text includes trailing punctuation
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
    <span className="inline relative">
      {/* Screen reader full announcement */}
      <span className="sr-only">
        {currentPhrase.text}
      </span>

      {/* Visual dynamic typing output */}
      <span aria-hidden="true" className="inline">
        {renderedContent}
      </span>

      {/* Sleek Apple-style typing caret */}
      <span
        aria-hidden="true"
        className={`inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.82em] bg-brand align-[-0.04em] ml-1 sm:ml-1.5 rounded-full select-none ${
          isPaused ? "animate-caret-blink" : "opacity-100"
        }`}
      />
    </span>
  );
}
