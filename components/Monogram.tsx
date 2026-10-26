type MonogramProps = {
  className?: string;
  /** Accessible name; pass "" when the monogram sits next to the brand name. */
  title?: string;
};

/**
 * The interlocking "SS" mark from the launch poster: two serif S
 * glyphs, the second dropped and nudged right so they overlap.
 */
export function Monogram({ className, title = "Sand & Silk" }: MonogramProps) {
  const decorative = title === "";
  return (
    <svg
      className={className}
      viewBox="0 0 64 80"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
    >
      <g
        fill="currentColor"
        fontFamily="var(--font-serif)"
        fontSize="60"
        fontWeight="400"
        textAnchor="middle"
      >
        <text x="28" y="47">S</text>
        <text x="36" y="69">S</text>
      </g>
    </svg>
  );
}
