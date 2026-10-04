import { PHOTOS } from "@/constant/landing-data";
import Image from "next/image";

const VARIANTS = ["none", "scaleX(-1)", "scale(1.3) translateY(10%)"];

const Head = () => (
  <svg viewBox="0 0 100 120" className="h-full w-full" aria-hidden="true">
    <path d="M8 120C8 96 28 88 50 88s42 8 42 32z" fill="#fff" opacity=".85" />
    <ellipse cx="50" cy="56" rx="23" ry="29" fill="#fff" opacity=".9" />
    <path
      d="M26 52C24 26 38 18 50 18s26 8 24 34c-4-14-12-20-24-20s-20 6-24 20z"
      fill="#000"
      stroke="#fff"
      strokeOpacity=".35"
    />
  </svg>
);

export default function PhotoTile({
  group,
  index,
  tall = false,
}: {
  group: string;
  index: number;
  tall?: boolean;
}) {
  const src = PHOTOS[group]?.[index];
  return (
    <div className={`lp-tile ${tall ? "aspect-4/5" : "aspect-3/4"}`}>
      {src ? (
        <Image
          src={src}
          alt={`${group}, photo ${index + 1}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ transform: VARIANTS[index % 3] }}
          >
            <Head />
          </div>
          <small>Photo slot</small>
        </>
      )}
    </div>
  );
}
