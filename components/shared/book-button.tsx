import { bookHref } from "@/constant/landing-data";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** Pre-selects a service on the booking page. */
  service?: string;
  className?: string;
  tabIndex?: number;
}

/** Every "Book" call to action on the page goes through here, so the destination changes in one place. */
export default function BookButton({
  children,
  variant = "dark",
  size = "md",
  service,
  className = "",
  tabIndex,
}: Props) {
  const v = variant === "light" ? "lp-btn-w" : "lp-btn-k";
  const s = size === "sm" ? "lp-btn-sm" : size === "lg" ? "lp-btn-lg" : "";
  return (
    <Link
      href={bookHref(service)}
      tabIndex={tabIndex}
      className={`lp-btn ${v} ${s} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
