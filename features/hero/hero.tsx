"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookButton from "@/components/shared/book-button";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scene = root.current!.querySelector<HTMLElement>(".lp-scene")!;
        gsap.set(".lp-gl", { z: (i: number) => [110, 70, 140][i] });
        gsap.set(".lp-ring", { rotationX: 68, z: -20 });
        gsap.set(".lp-pole", { z: 50 });

        let ready = false;
        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            onComplete: () => {
              ready = true;
              gsap.to(".lp-gl", {
                y: "+=14",
                duration: 2.4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: 0.4,
              });
            },
          })
          .fromTo(
            ".lp-wi",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.1, stagger: 0.07 },
            0.15,
          )
          .fromTo(
            "[data-hero]",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            0.7,
          )
          .fromTo(
            scene,
            { scale: 0.7, rotationY: -35, rotationX: 15, opacity: 0 },
            {
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              opacity: 1,
              duration: 1.6,
              ease: "expo.out",
            },
            0.2,
          )
          .from(".lp-gl", { opacity: 0, duration: 1, stagger: 0.15 }, 0.9);

        gsap.to(".lp-ring", {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });

        const rx = gsap.quickTo(scene, "rotationX", {
          duration: 0.9,
          ease: "power3",
        });
        const ry = gsap.quickTo(scene, "rotationY", {
          duration: 0.9,
          ease: "power3",
        });
        const el = root.current!;
        const move = (e: PointerEvent) => {
          if (!ready) return;
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 28);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 20);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden bg-black pb-28 pt-32 text-white"
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
          className="relative h-95 sm:h-130"
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
            <div className="lp-pole" />
            {/* ASSUMPTION: sample values. Wire these to live availability once the booking API exists. */}
            <div className="lp-gl" style={{ top: "6%", left: 0 }}>
              <p className="text-xs text-white/60">Next free slot</p>
              <p className="mt-1 font-semibold">Today, 4:30 PM</p>
            </div>
            <div className="lp-gl" style={{ top: "40%", right: 0 }}>
              <p className="text-xs text-white/60">Home service</p>
              <p className="mt-1 font-semibold">Across Owerri</p>
            </div>
            <div className="lp-gl" style={{ bottom: "4%", left: "10%" }}>
              <p className="text-xs text-white/60">Your booking</p>
              <p className="mt-1 font-semibold">Slot locked</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
