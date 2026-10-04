"use client";

import { SERVICES } from "@/constant/landing-data";
import { useState } from "react";
import BookButton from "@/components/shared/book-button";
import PhotoTile from "../phototile";

const ROW_SIZE = 4;
const ROWS = Array.from(
  { length: Math.ceil(SERVICES.length / ROW_SIZE) },
  (_, r) => SERVICES.slice(r * ROW_SIZE, (r + 1) * ROW_SIZE),
);

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="lp-sec relative z-20 bg-black px-5 pb-24 pt-28 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="lp-display text-4xl sm:text-5xl">Pick your style</h2>
            <p className="mt-3 max-w-md text-white/60">
              Hover or tap a style to see it up close, then book it in one
              click.
            </p>
          </div>
          <BookButton variant="light">Book now</BookButton>
        </div>

        <div className="mt-12">
          {ROWS.map((row, r) => (
            <div key={r} className="lp-row">
              {row.map((s) => {
                const isOpen = open === s.name;
                return (
                  <div
                    key={s.name}
                    className={`lp-card ${isOpen ? "lp-open" : ""}`}
                  >
                    <article className="lp-cd">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : s.name)}
                        className="block w-full text-left"
                      >
                        <span className="block text-sm opacity-60">
                          {s.duration}
                        </span>
                        <h3 className="lp-display mt-5 text-2xl">{s.name}</h3>
                        <p className="mt-1 text-sm opacity-70">{s.blurb}</p>
                        <span className="lp-hint mt-5 block text-sm opacity-50">
                          Hover or tap to see the style
                        </span>
                      </button>
                      <div className="lp-more">
                        <div className="lp-more-in">
                          <div className="pt-4">
                            <div className="grid grid-cols-3 gap-2">
                              {[0, 1, 2].map((k) => (
                                <PhotoTile key={k} group={s.name} index={k} />
                              ))}
                            </div>
                            <BookButton
                              service={s.name}
                              tabIndex={isOpen ? 0 : -1}
                              className="mt-4 w-full"
                            >
                              Book {s.name}
                            </BookButton>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useState } from "react";
// import BookButton from "@/components/shared/book-button";
// import { SERVICES } from "@/constant/landing-data";
// import PhotoTile from "../phototile";

// export default function Services() {
//   // Hover opens a card on desktop (CSS). Click/tap toggles it for touch and keyboard users.
//   const [open, setOpen] = useState<number | null>(null);

//   return (
//     <section
//       id="services"
//       className="lp-sec relative z-20 bg-black px-5 pb-24 pt-28 text-white"
//     >
//       <div className="mx-auto max-w-6xl">
//         <div className="flex flex-wrap items-end justify-between gap-6">
//           <div>
//             <h2 className="lp-display text-4xl sm:text-5xl">Pick your style</h2>
//             <p className="mt-3 max-w-md text-white/60">
//               Hover or tap a style to see it up close, then book it in one
//               click.
//             </p>
//           </div>
//           <BookButton variant="light">Book now</BookButton>
//         </div>

//         <div className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {SERVICES.map((s, i) => {
//             const isOpen = open === i;
//             return (
//               <div
//                 key={s.name}
//                 className={`lp-card ${isOpen ? "lp-open" : ""}`}
//               >
//                 <article className="lp-cd">
//                   <button
//                     type="button"
//                     aria-expanded={isOpen}
//                     onClick={() => setOpen(isOpen ? null : i)}
//                     className="block w-full text-left"
//                   >
//                     <span className="block text-sm opacity-60">
//                       {s.duration}
//                     </span>
//                     <h3 className="lp-display mt-5 text-2xl">{s.name}</h3>
//                     <p className="mt-1 text-sm opacity-70">{s.blurb}</p>
//                     <span className="lp-hint mt-5 block text-sm opacity-50">
//                       Hover or tap to see the style
//                     </span>
//                   </button>
//                   <div className="lp-more">
//                     <div className="lp-more-in">
//                       <div className="pt-4">
//                         <div className="grid grid-cols-3 gap-2">
//                           {[0, 1, 2].map((k) => (
//                             <PhotoTile key={k} group={s.name} index={k} />
//                           ))}
//                         </div>
//                         {/* tabIndex keeps the hidden link out of the tab order until the card is open */}
//                         <BookButton
//                           service={s.name}
//                           tabIndex={isOpen ? 0 : -1}
//                           className="mt-4 w-full"
//                         >
//                           Book {s.name}
//                         </BookButton>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
