"use client";

import { useState } from "react";
import BookButton from "@/components/shared/book-button";
import { Testimonial, TESTIMONIALS } from "@/constant/landing-data";

function Row({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  // Hover pauses via CSS. Touch holds the row still for a moment so it can be read.
  const [held, setHeld] = useState(false);
  // The track slides left by 50%, so it needs two identical halves to loop seamlessly.
  const half = [...items, ...items];
  const all = [...half, ...half];

  return (
    <div
      className={`lp-mq ${reverse ? "lp-rev" : ""} ${held ? "lp-held" : ""}`}
      onTouchStart={() => setHeld(true)}
      onTouchEnd={() => setTimeout(() => setHeld(false), 2500)}
    >
      <div className="lp-track">
        {all.map((t, i) => (
          <figure
            key={i}
            aria-hidden={i >= items.length}
            className="w-[290px] shrink-0 rounded-3xl border border-white/15 bg-white/5 p-6 sm:w-[360px]"
          >
            <span
              className="text-white"
              role="img"
              aria-label="5 out of 5 stars"
            >
              ★★★★★
            </span>
            <blockquote className="mt-3 text-white/90">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-white/60">
              {t.name}, {t.service}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const mid = Math.ceil(TESTIMONIALS.length / 2);
  return (
    <section
      id="testimonials"
      className="lp-sec relative z-40 bg-black pb-24 pt-28 text-white"
    >
      <div className="mx-auto max-w-6xl px-5 text-center">
        <h2 className="lp-display text-4xl sm:text-5xl">
          Clients keep coming back
        </h2>
        <p className="mt-3 text-white/60">
          Hover or touch a row to pause it and read.
        </p>
      </div>
      <div className="mt-12 space-y-4">
        <Row items={TESTIMONIALS.slice(0, mid)} />
        <Row items={TESTIMONIALS.slice(mid)} reverse />
      </div>
      <div className="mt-12 text-center">
        <BookButton variant="light">Join them, book now</BookButton>
      </div>
    </section>
  );
}
