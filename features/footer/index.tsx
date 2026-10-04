import BookButton from '@/components/shared/book-button';
import { NAV } from '@/constant/landing-data';

export default function Footer() {
  return (
    <footer className="lp-sec relative z-60 bg-black px-5 pb-24 pt-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="lp-display text-3xl">Dammy<span className="opacity-50">Cuts</span></p>
          <p className="mt-3 max-w-sm text-white/60">Classic barbering with modern booking, at the shop or at your door.</p>
          <BookButton variant="light" className="mt-6">Book now</BookButton>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm text-white/50">Explore</p>
          <ul className="mt-4 space-y-2 text-white/80">
            {NAV.slice(1).map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-white">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        {/* ASSUMPTION: placeholder contact details */}
        <div>
          <p className="text-sm text-white/50">Visit</p>
          <ul className="mt-4 space-y-2 text-white/80">
            <li>Shop address, Owerri</li>
            <li>Mon to Sat, 9am to 7pm</li>
            <li>+234 000 000 0000</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-white/15 pt-6 text-sm text-white/40">
        © {new Date().getFullYear()} Crown Cuts. All rights reserved.
      </p>
    </footer>
  );
}