"use client";

import { Fragment, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookButton from "@/components/shared/book-button";

gsap.registerPlugin(useGSAP);

const ClipperScene = dynamic(() => import("./clipper-scene"), { ssr: false });

function SplitWords({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {line.split(" ").map((w, wi) => (
            <Fragment key={wi}>
              <span className="lp-w">
                <span className="lp-wi">{w}</span>
              </span>{" "}
            </Fragment>
          ))}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = (sel: string) =>
          gsap.utils.toArray<HTMLElement>(sel, root.current);
        const words = q(".lp-wi");
        const intro = q("[data-hero]");
        const scene = q(".lp-scene");
        const glass = q(".lp-gl");
        const rings = q(".lp-ring");

        if (glass.length)
          gsap.set(glass, { z: (i: number) => [110, 70, 140][i] });
        if (rings.length) gsap.set(rings, { rotationX: 68, z: -20 });

        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => {
            if (glass.length)
              gsap.to(glass, {
                y: "+=14",
                duration: 2.4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: 0.4,
              });
          },
        });
        if (words.length)
          tl.fromTo(
            words,
            { yPercent: 115 },
            { yPercent: 0, duration: 1.1, stagger: 0.07 },
            0.15,
          );
        if (intro.length)
          tl.fromTo(
            intro,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            0.7,
          );
        if (scene.length)
          tl.fromTo(
            scene,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out" },
            0.2,
          );
        if (glass.length)
          tl.from(glass, { opacity: 0, duration: 1, stagger: 0.15 }, 0.9);

        if (rings.length)
          gsap.to(rings, {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: "none",
          });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-100svh items-center overflow-hidden bg-black pb-28 pt-32 text-white"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 lg:grid-cols-2">
        <div>
          <p
            data-hero
            className="inline-flex rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/80"
          >
            At the shop or at your door in Owerri
          </p>
          <h1 className="lp-display mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Sharp cuts. <br /> Booked in a minute.
          </h1>
          <p data-hero className="mt-6 max-w-md text-lg text-white/70">
            Walk in to the shop or have the barber come to you. Pick a time, pay
            a small deposit, and your chair is locked in.
          </p>
          <div data-hero className="mt-8 flex flex-wrap gap-3">
            <BookButton variant="light">Book your cut</BookButton>
            <a
              href="#services"
              className="lp-btn border border-white/30 text-white hover:bg-white/10"
            >
              See the styles
            </a>
          </div>
          <p data-hero className="mt-8 max-w-md text-sm text-white/50">
            We text you a reminder before every visit, and you can reschedule
            any time.
          </p>
        </div>

        <div
          className="relative h-105 sm:h-135"
          style={{ perspective: "1200px" }}
        >
          <div
            data-scene
            className="lp-scene absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="lp-ring"
              style={{ width: 430, height: 430, maxWidth: "100%" }}
            />
            <div
              className="lp-ring"
              style={{ width: 310, height: 310, borderStyle: "dashed" }}
            />
            <ClipperScene />
            {/* ASSUMPTION: sample values. Wire these to live availability once the booking API exists. */}
            <div className="lp-gl" style={{ top: "6%", left: 0 }}>
              <p className="text-xs text-white/60">Next free slot</p>
              <p className="mt-1 font-semibold">Today, 4:30 PM</p>
            </div>
            <div className="lp-gl" style={{ top: "40%", right: 0 }}>
              <p className="text-xs text-white/60">Home service</p>
              <p className="mt-1 font-semibold">Across Owerri</p>
            </div>
            <div className="lp-gl" style={{ bottom: "8%", left: "10%" }}>
              <p className="text-xs text-white/60">Your booking</p>
              <p className="mt-1 font-semibold">Slot locked</p>
            </div>
          </div>
          <p className="absolute inset-x-0 bottom-0 text-center text-sm text-white/50">
            Drag to spin the clipper
          </p>
        </div>
      </div>
    </section>
  );
}
