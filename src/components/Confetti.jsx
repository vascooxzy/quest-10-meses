// ============================================================
// Confetti.jsx — Efeito de confetes para a surpresa final
// ============================================================
import { useEffect, useRef } from 'react';

const COLORS = ['#f0a0c0', '#c4a8e8', '#d4af70', '#80d0f0', '#f0d080', '#a0e8a0'];
const SHAPES = ['circle', 'rect', 'triangle'];

export default function Confetti({ active = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    const count = 80;

    for (let i = 0; i < count; i++) {
      const el    = document.createElement('div');
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const size  = 6 + Math.random() * 10;
      const left  = Math.random() * 100;
      const delay = Math.random() * 3;
      const dur   = 3 + Math.random() * 4;

      Object.assign(el.style, {
        position:  'fixed',
        left:      `${left}%`,
        top:       '-20px',
        width:     `${size}px`,
        height:    shape === 'rect' ? `${size * 0.5}px` : `${size}px`,
        background: color,
        borderRadius: shape === 'circle' ? '50%' : shape === 'rect' ? '2px' : '0',
        clipPath:  shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
        animation: `confettiFall ${dur}s ${delay}s ease-in forwards`,
        zIndex:    '9999',
        pointerEvents: 'none',
      });

      container.appendChild(el);
    }

    // Limpa após as animações
    const timer = setTimeout(() => {
      if (container) container.innerHTML = '';
    }, 10000);

    return () => clearTimeout(timer);
  }, [active]);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
}
