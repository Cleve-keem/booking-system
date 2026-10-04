"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Page-wide scroll choreography: smooth scroll, reveals, service-card entrance, stat counters, parallax.
 * Renders nothing. Everything lives inside gsap.matchMedia, so visitors who prefer reduced motion get
 * native scrolling and a fully visible static page (landing.css un-hides the start states for them).
 */
export default function MotionProvider() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
      const lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // In-page links (#about, #services, ...) glide instead of jumping.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
          'a[href^="#"]',
        );
        const id = a?.getAttribute("href");
        const target =
          id && id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -70 });
        }
      };
      document.addEventListener("click", onClick);

      // Once an element has animated in, hand control back to CSS (needed so card hover transforms work).
      const settle = (els: Element[]) =>
        els.forEach((el) => {
          el.classList.add("lp-in");
          gsap.set(el, { clearProps: "transform,opacity" });
        });

      ScrollTrigger.batch(".lp-rv", {
        start: "top 92%",
        once: true,
        onEnter: (b) =>
          gsap.to(b, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            onComplete: () => settle(b),
          }),
      });

      ScrollTrigger.batch(".lp-card", {
        start: "top 94%",
        once: true,
        onEnter: (b) =>
          gsap.to(b, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            onComplete: () => settle(b),
          }),
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: Number(el.dataset.count),
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent =
                  Math.round(o.v).toLocaleString("en-US") +
                  (el.dataset.suffix ?? "");
              },
            }),
        });
      });

      gsap.to(".lp-par", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: "#about", scrub: true },
      });

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  });

  return null;
}
