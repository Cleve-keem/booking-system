// All landing-page content lives here so copy changes never touch components.

// ASSUMPTION: the booking stepper lives at /book and reads ?service= to pre-select a service.
export const BOOK_URL = "/book";
export const bookHref = (service?: string) =>
  service ? `${BOOK_URL}?service=${encodeURIComponent(service)}` : BOOK_URL;

// ASSUMPTION: no real photos yet, so tiles render placeholder silhouettes.
// Add files under /public and list them by service name (3 per service) and for 'gallery' (6).
// e.g. { 'Low Fade': ['/img/low-fade-1.jpg', '/img/low-fade-2.jpg', '/img/low-fade-3.jpg'] }
export const PHOTOS: Record<string, string[]> = {};

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

// ASSUMPTION: sample durations. Replace with the barber's real service list (ideally from the DB later).
export interface Service {
  name: string;
  blurb: string;
  duration: string;
}
export const SERVICES: Service[] = [
  {
    name: "Low Fade",
    blurb: "Clean, short and always sharp",
    duration: "30 min",
  },
  {
    name: "Skin Fade",
    blurb: "A seamless zero-to-length blend",
    duration: "40 min",
  },
  {
    name: "Taper & Shape-up",
    blurb: "Crisp lineup and tidy edges",
    duration: "35 min",
  },
  { name: "Waves", blurb: "Brushed, sleek and deep", duration: "45 min" },
  {
    name: "Afro Sculpt",
    blurb: "Volume with precise shape",
    duration: "45 min",
  },
  { name: "Buzz Cut", blurb: "Even and low-maintenance", duration: "20 min" },
  {
    name: "Beard Sculpt",
    blurb: "Lined, blended and defined",
    duration: "25 min",
  },
  { name: "Kids Cut", blurb: "Patient, fun and neat", duration: "30 min" },
];

// ASSUMPTION: sample testimonials. Replace with real ones before launch.
export interface Testimonial {
  name: string;
  service: string;
  quote: string;
}
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chidi O.",
    service: "Low Fade",
    quote: "Cleanest fade I have had. Lines were perfect and he was on time.",
  },
  {
    name: "Emeka A.",
    service: "Home service",
    quote: "He came to my place before my event. Zero stress, sharp result.",
  },
  {
    name: "Tobi K.",
    service: "Skin Fade",
    quote: "Booking took a minute and the reminder saved my day.",
  },
  {
    name: "Ifeanyi N.",
    service: "Waves",
    quote: "Patient with my hair type. My waves have never looked better.",
  },
  {
    name: "David M.",
    service: "Beard Sculpt",
    quote: "Exactly the shape I wanted. I book every two weeks now.",
  },
  {
    name: "Samuel E.",
    service: "Kids Cut",
    quote: "My son sat still and loved it. Neat cut, kind barber.",
  },
  {
    name: "Kelechi U.",
    service: "Taper",
    quote: "Crisp edges that last. Worth every naira.",
  },
  {
    name: "Obinna P.",
    service: "Afro Sculpt",
    quote:
      "Great shape, great vibe. The deposit keeps things fair for everyone.",
  },
];

// Mirrors the rules agreed for home service. Keep in sync with the booking page.
export const HOME_PRICING = {
  insideOwerri: "₦20k to ₦35k",
  outsideOwerri: "from ₦40k",
  baseFee: "₦10k",
};
