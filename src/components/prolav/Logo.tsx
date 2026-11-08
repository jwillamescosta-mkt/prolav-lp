// Wordmark provisório. Troque este componente pelo logo vetorizado oficial.
export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 32" className={className} role="img" aria-label="PROLAV">
      <circle cx="14" cy="16" r="11" fill="none" stroke="var(--cyan)" strokeWidth="2.5" />
      <circle cx="14" cy="16" r="4" fill="var(--sky)" />
      <text x="32" y="23" fill="currentColor" fontFamily="var(--font-display)" fontWeight="800" fontSize="21" letterSpacing="1.5">
        PROLAV
      </text>
    </svg>
  );
}
