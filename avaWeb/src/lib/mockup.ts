/**
 * Generates a self-contained SVG "screen" for a project as a data URI, so the
 * staggered-grid bento has imagery with zero network requests or asset files.
 */
export function projectImage({
  name,
  hue,
  kind,
}: {
  name: string;
  hue: number;
  kind: string;
}): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 28% 15%)"/>
      <stop offset="1" stop-color="#0b0b0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="28%" cy="18%" r="70%">
      <stop offset="0" stop-color="hsl(${hue} 60% 58%)" stop-opacity="0.4"/>
      <stop offset="1" stop-color="hsl(${hue} 60% 58%)" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="640" height="440" fill="url(#bg)"/>
  <rect width="640" height="440" fill="url(#glow)"/>
  <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
    <line x1="0" y1="110" x2="640" y2="110"/>
    <line x1="0" y1="220" x2="640" y2="220"/>
    <line x1="0" y1="330" x2="640" y2="330"/>
    <line x1="160" y1="0" x2="160" y2="440"/>
    <line x1="320" y1="0" x2="320" y2="440"/>
    <line x1="480" y1="0" x2="480" y2="440"/>
  </g>
  <text x="44" y="80" font-family="ui-monospace, monospace" font-size="15" letter-spacing="3" fill="rgba(255,255,255,0.55)">${kind.toUpperCase()}</text>
  <text x="42" y="250" font-family="Geist Variable, system-ui, sans-serif" font-size="58" font-weight="700" fill="#ffffff">${name}</text>
  <polyline points="44,360 120,338 196,348 272,300 348,318 424,268 500,288 576,238" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
