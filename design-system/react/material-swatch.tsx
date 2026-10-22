/** Source-layer specimen. Use readable cb-overlay recipes for text surfaces. */
export function GlassSwatch({ size }: { size: 'small' | 'medium' | 'large' }) {
  return (
    <div
      className="cb-glass-swatch glass-size-sample"
      data-glass-size={size}
      aria-hidden="true"
    >
      <span className="cb-glass-fill cb-glass-fill-first" />
      <span className="cb-glass-fill cb-glass-fill-second" />
      <span className="cb-glass-fill cb-glass-fill-third" />
      <span className="cb-glass-highlight" />
    </div>
  );
}
