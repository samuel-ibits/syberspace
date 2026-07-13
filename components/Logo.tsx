export default function Logo({ width = 160, height = 36 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoScreenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="logoGlowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Monitor shell */}
      <rect x="2" y="2" width="40" height="28" rx="3.5" stroke="url(#logoScreenGrad)" strokeWidth="2" fill="none"/>
      {/* Screen fill */}
      <rect x="4" y="4" width="36" height="24" rx="2" fill="url(#logoGlowGrad)" opacity="0.4"/>
      {/* Stand neck */}
      <rect x="19" y="30" width="6" height="5" rx="1" fill="url(#logoScreenGrad)"/>
      {/* Stand base */}
      <rect x="13" y="35" width="18" height="3" rx="1.5" fill="url(#logoScreenGrad)"/>

      {/* Chart line */}
      <polyline
        points="8,22 13,17 18,19 23,13 28,15 33,10 38,12"
        stroke="url(#logoScreenGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#logoGlow)"
      />
      {/* Chart dots */}
      <circle cx="8"  cy="22" r="1.5" fill="#00d4ff"/>
      <circle cx="18" cy="19" r="1.5" fill="#5b8fff"/>
      <circle cx="23" cy="13" r="1.5" fill="#7c3aed"/>
      <circle cx="33" cy="10" r="1.5" fill="#00d4ff"/>
      <circle cx="38" cy="12" r="1.5" fill="#00d4ff" filter="url(#logoGlow)"/>

      {/* Wordmark — "Syber" uses CSS var so it's visible in both themes */}
      <text
        x="52" y="30"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="22" fontWeight="700" letterSpacing="-0.5"
        fill="var(--text-primary)"
      >Syber</text>
      <text
        x="113" y="30"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="22" fontWeight="700" letterSpacing="-0.5"
        fill="url(#logoScreenGrad)"
      >space</text>
    </svg>
  );
}
