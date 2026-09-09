// gsap helpers for scroll + component entrance animations.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals children with a subtle fade + rise the first time they scroll into
 * view. Returns a ref to attach to the wrapping element.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  y?: number;
  delay?: number;
}) {
  const ref = useRef<T>(null);
  const { y = 30, delay = 0 } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = { opacity: 0, y };
    const to = { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out" };

    const tween = gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, delay]);

  return ref;
}

/**
 * Parallax-ish subtle scale/glow for hero media on mount (no scroll needed).
 */
export function useMountedIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, scale: 0.96, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1, delay, ease: "power2.out" });
  }, [delay]);

  return ref;
}

/**
 * Slides a horizontal strip (live pulse ticker) continuously.
 */
export function useTickerScroll(containerRef: React.RefObject<HTMLElement | null>, speed = 40) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: el.scrollWidth / speed, // duration scales with content width
      ease: "none",
    });

    return () => {
      tween.kill();
    };
  }, [containerRef, speed]);
}