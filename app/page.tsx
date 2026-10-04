import BookCta from "@/components/book-cta";
import MotionProvider from "@/components/motion-provider";
import About from "@/features/about/about";
import FloatingBook from "@/features/bookings";
import Footer from "@/features/footer";
import Gallery from "@/features/gallery";
import Header from "@/features/header/header";
import Hero from "@/features/hero";
import Services from "@/features/services";
import Testimonials from "@/features/testimonials";

export default function Page() {
  return (
    <>
      <MotionProvider />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <BookCta />
      </main>
      <Footer />
      <FloatingBook />
    </>
  );
}
