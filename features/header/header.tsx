"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV } from "@/constant/landing-data";
import BookButton from "@/components/shared/book-button";


gsap.registerPlugin(useGSAP);

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Drops in once on load. Skipped entirely when the visitor prefers reduced motion.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { y: -120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      data-hero
      className="fixed inset-x-0 z-50 mx-auto w-[min(92%,980px)]"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
    >
      <nav
        aria-label="Main"
        className="flex items-center justify-between rounded-full bg-white/90 py-2 pl-5 pr-2 text-black shadow-2xl ring-1 ring-black/5 backdrop-blur-xl"
      >
        <a href="#home" className="lp-display text-xl font-bold">
          Dammy<span className="opacity-50">Cuts</span>
        </a>
        <ul className="hidden gap-1 text-sm font-medium md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-4 py-2 hover:bg-black/5"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <BookButton size="sm">Book now</BookButton>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 md:hidden"
          >
            <span className="block h-0.5 w-5 bg-black shadow-[0_6px_0_#000,0_-6px_0_#000]" />
          </button>
        </div>
      </nav>
      {open && (
        <div className="mt-2 rounded-3xl bg-white p-3 text-black shadow-2xl ring-1 ring-black/5 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 hover:bg-black/5"
            >
              {n.label}
            </a>
          ))}
          <BookButton className="mt-2 w-full">Book now</BookButton>
        </div>
      )}
    </header>
  );
}
