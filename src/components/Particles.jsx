// ============================================================
// Particles.jsx — Partículas de fundo (corações e estrelas)
// ============================================================
import { useEffect, useRef } from 'react';

const SYMBOLS = ['❤', '✦', '·', '♡', '✧', '⋆'];

export default function Particles({ count = 28 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove partículas antigas
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.textContent = symbol;

      const size   = 0.5 + Math.random() * 1.2;
      const left   = Math.random() * 100;
      const top    = Math.random() * 100;
      const delay  = Math.random() * 8;
      const dur    = 6 + Math.random() * 8;
      const dx     = (Math.random() - 0.5) * 80;
      const dy     = -40 - Math.random() * 60;
      const opacity = 0.08 + Math.random() * 0.18;

      Object.assign(el.style, {
        position:  'absolute',
        left:      `${left}%`,
        top:       `${top}%`,
        fontSize:  `${size}rem`,
        color:     Math.random() > 0.5 ? 'var(--rose)' : 'var(--lilac)',
        opacity:   String(opacity),
        '--dx':    `${dx}px`,
        '--dy':    `${dy}px`,
        animation: `float ${dur}s ${delay}s ease-in-out infinite`,
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: '1',
      });

      container.appendChild(el);
    }
  }, [count]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
