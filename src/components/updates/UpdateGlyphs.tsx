/**
 * Status glyphs for the update toasts.
 *
 * Cake& does not export its toast status icons, and the Figma update frames use
 * the filled Motorola glyphs rather than the outlined lucide set Cake& picks by
 * default. The path data below is the exact geometry exported from Figma
 * (24×24, nodes 2725:28254 info, 2754:29356 error, 2754:29596 check_circle and
 * 2754:29549 download); the baked export colors are replaced with
 * `currentColor` so the semantic Cake& token on the wrapper drives the fill.
 */

type UpdateIconProps = {
  className?: string;
};

function Glyph({ className, d }: UpdateIconProps & { d: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={d} fill="currentColor" />
    </svg>
  );
}

export function InfoGlyph(props: UpdateIconProps) {
  return (
    <Glyph
      {...props}
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM13 7V9H11V7H13ZM13 17V10H11V17H13Z"
    />
  );
}

export function ErrorGlyph(props: UpdateIconProps) {
  return (
    <Glyph
      {...props}
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM11 17V15H13V17H11ZM11 7L11 14H13L13 7H11Z"
    />
  );
}

export function CheckCircleGlyph(props: UpdateIconProps) {
  return (
    <Glyph
      {...props}
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.2459 7.91486L10.8425 13.3183L8.02138 10.4972L6.60716 11.9114L10.1354 15.4396C10.5259 15.8301 11.1591 15.8301 11.5496 15.4396L17.6601 9.32907L16.2459 7.91486Z"
    />
  );
}

export function DownloadGlyph(props: UpdateIconProps) {
  return (
    <Glyph
      {...props}
      d="M13.5 2.09H10.5L10.3507 2.09548C9.31596 2.17182 8.50011 3.03551 8.5 4.08979L8.49936 8.257L7.7571 8.25736C5.97541 8.25759 5.08331 10.4117 6.34315 11.6716L10.5858 15.9142C11.3668 16.6953 12.6332 16.6953 13.4142 15.9142L17.6569 11.6716L17.7625 11.5582C18.8634 10.2869 17.9722 8.25759 16.2429 8.25736L15.4984 8.257L15.5 4.09021C15.5001 2.98556 14.6047 2.09 13.5 2.09ZM4 17V15H2V17C2 18.6347 3.22874 20 4.8 20H19.2C20.7713 20 22 18.6347 22 17V15H20V17C20 17.5744 19.617 18 19.2 18H4.8C4.38304 18 4 17.5744 4 17Z"
    />
  );
}
