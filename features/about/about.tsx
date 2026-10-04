import BookButton from "@/components/shared/book-button";

const STATS = [
  { to: 8, suffix: "+", label: "Years behind the chair" },
  { to: 5000, suffix: "+", label: "Cuts delivered" },
  { to: 25, suffix: "+", label: "Styles mastered" },
];

export default function About() {
  return (
    <section
      id="about"
      className="lp-sec relative z-10 bg-white px-5 pb-24 pt-28 text-black"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div className="lp-frame lp-rv mx-auto w-full max-w-md">
          <div>
            <div className="lp-par grid aspect-4/5 place-items-center bg-black">
              <svg
                viewBox="0 0 200 200"
                className="w-3/5"
                fill="none"
                stroke="#fff"
                strokeWidth="5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="60" cy="150" r="22" />
                <circle cx="140" cy="150" r="22" />
                <path d="M72 132L150 30M128 132L50 30" />
              </svg>
            </div>
          </div>
        </div>
        <div className="lp-rv">
          <h2 className="lp-display text-4xl leading-tight sm:text-5xl">
            Old-school craft. Modern convenience.
          </h2>
          <p className="lp-dc mt-6 leading-relaxed text-black/70">
            Every cut starts with a conversation and ends with a mirror check.
            Crown Cuts pairs the patience of a classic barbershop with a booking
            system that respects your time, whether you sit in the chair at the
            shop or invite the barber to your door.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-black/15 py-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="lp-display text-4xl"
                  data-count={s.to}
                  data-suffix={s.suffix}
                >
                  {s.to.toLocaleString("en-US")}
                  {s.suffix}
                </p>
                <p className="text-sm text-black/60">{s.label}</p>
              </div>
            ))}
          </div>
          <BookButton className="mt-8">Book your chair</BookButton>
        </div>
      </div>
    </section>
  );
}
