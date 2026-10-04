import { HOME_PRICING } from "@/constant/landing-data";
import BookButton from "./shared/book-button";

export default function BookCta() {
  return (
    <section
      id="book"
      className="lp-sec relative z-50 bg-white px-5 pb-28 pt-24"
    >
      <div className="lp-rv relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-black p-10 text-center text-white sm:p-16">
        <div
          className="lp-ring"
          style={{ width: 520, height: 520, top: -300 }}
          aria-hidden="true"
        />
        <h2 className="lp-display relative text-4xl sm:text-6xl">
          Your chair is waiting.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/70">
          Secure your slot in under a minute. Pay a small deposit and we handle
          the reminders.
        </p>
        <ul className="relative mx-auto mt-8 grid max-w-2xl gap-3 text-sm sm:grid-cols-2">
          <li className="rounded-2xl border border-white/20 px-4 py-3">
            At the shop: a deposit secures your slot
          </li>
          <li className="rounded-2xl border border-white/20 px-4 py-3">
            Home visit inside Owerri: {HOME_PRICING.insideOwerri}
          </li>
          <li className="rounded-2xl border border-white/20 px-4 py-3">
            Home visit outside Owerri: {HOME_PRICING.outsideOwerri}
          </li>
          <li className="rounded-2xl border border-white/20 px-4 py-3">
            A {HOME_PRICING.baseFee} base payment secures your home visit
          </li>
        </ul>
        <BookButton variant="light" size="lg" className="relative mt-10">
          Book now
        </BookButton>
      </div>
    </section>
  );
}
