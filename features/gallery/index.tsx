import BookButton from "@/components/shared/book-button";
import PhotoTile from "../phototile";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="lp-sec relative z-30 bg-white px-5 pb-24 pt-28 text-black"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="lp-display text-4xl sm:text-5xl">
            Fresh off the chair
          </h2>
          <BookButton>Book the look you like</BookButton>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <PhotoTile key={i} group="gallery" index={i} tall />
          ))}
        </div>
      </div>
    </section>
  );
}
