import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './ScratchCard.module.css';

const SCRATCH_RADIUS = 30;
const REVEAL_THRESHOLD = 5;

export default function ScratchCard({ quest, onFullyRevealed }) {
  const canvasRef  = useRef(null);
  const isDrawing  = useRef(false);
  const [pct,      setPct]      = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [size,     setSize]     = useState({ w: 0, h: 0 });

  // Mede o container e define o tamanho do canvas em pixels reais
  const containerRef = useRef(null);
  useEffect(() => {
    if (revealed) return;
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };
    measure();
    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [revealed]);

  // Desenha a camada dourada sempre que o tamanho é definido
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0) return;
    const ctx = canvas.getContext('2d');
    const W = size.w, H = size.h;
    ctx.clearRect(0, 0, W, H);

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,   '#c8906a');
    grad.addColorStop(0.3, '#e8c080');
    grad.addColorStop(0.6, '#d4a060');
    grad.addColorStop(1,   '#b87840');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(80,40,10,0.65)';
    ctx.font = `bold ${W * 0.07}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Raspa aqui ✦', W / 2, H / 2);
    ctx.font = `${W * 0.042}px serif`;
    ctx.fillText('Usa o dedo ou o rato', W / 2, H / 2 + W * 0.09);
  }, [size]);

  const calcPct = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0) return;
    const ctx  = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, size.w, size.h).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) transparent++;
    }
    const p = Math.round((transparent / (size.w * size.h)) * 100);
    setPct(p);
    if (p >= REVEAL_THRESHOLD && !revealed) {
      setRevealed(true);
      ctx.clearRect(0, 0, size.w, size.h);
      if (onFullyRevealed) onFullyRevealed();
    }
  }, [revealed, onFullyRevealed, size]);

  const scratch = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0) return;
    const rect = canvas.getBoundingClientRect();
    const cx = (clientX - rect.left) * (size.w / rect.width);
    const cy = (clientY - rect.top)  * (size.h / rect.height);
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, SCRATCH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, [size]);

  const onMouseDown = (e) => { isDrawing.current = true;  scratch(e.clientX, e.clientY); };
  const onMouseMove = (e) => { if (!isDrawing.current) return; scratch(e.clientX, e.clientY); calcPct(); };
  const onMouseUp   = ()  => { isDrawing.current = false; calcPct(); };
  const onTouchStart = (e) => { e.preventDefault(); isDrawing.current = true;  scratch(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchMove  = (e) => { e.preventDefault(); if (!isDrawing.current) return; scratch(e.touches[0].clientX, e.touches[0].clientY); calcPct(); };
  const onTouchEnd   = ()  => { isDrawing.current = false; calcPct(); };

  const revealAll = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, size.w, size.h);
    setRevealed(true);
    setPct(100);
    if (onFullyRevealed) onFullyRevealed();
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>🎁 Raspadinha do Dia {quest.day}</h3>
      <p className={styles.subtitle}>Raspa para revelar a tua surpresa!</p>

      <div className={styles.cardContainer} ref={containerRef}>
        {/* Conteúdo por baixo */}
        <div className={styles.revealLayer}>
          {quest.video ? (
            <video src={quest.video} autoPlay loop playsInline controls
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : quest.image ? (
            <img src={quest.image} alt={`Surpresa dia ${quest.day}`} className={styles.revealImg} />
          ) : (
            <DefaultReveal quest={quest} />
          )}
        </div>

        {/* Canvas com dimensões explícitas em px */}
        {!revealed && size.w > 0 && (
          <canvas
            ref={canvasRef}
            width={size.w}
            height={size.h}
            className={styles.canvas}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        )}

        {!revealed && pct > 0 && (
          <div className={styles.pctBadge}>{pct}%</div>
        )}
      </div>

      {!revealed && pct >= 1 && (
        <button className={styles.revealBtn} onClick={revealAll}>✦ Revelar Tudo</button>
      )}

      {revealed && (
        <div className={styles.revealedMsg}>
          <span>🎉</span>
          <p>{quest.successMessage}</p>
        </div>
      )}
    </div>
  );
}

function DefaultReveal({ quest }) {
  return (
    <div className={styles.defaultReveal} style={{ '--day-color': quest.color }}>
      <div className={styles.defaultEmoji}>{quest.emoji}</div>
      <h3 className={styles.defaultTitle}>{quest.title}</h3>
      <p className={styles.defaultMsg}>{quest.successMessage}</p>
      <div className={styles.defaultDeco}>✦ Dia {quest.day} ✦</div>
    </div>
  );
}