// ============================================================
// FinalReward.jsx — Surpresa final (após completar todas missões)
// ============================================================
import { useState } from 'react';
import Confetti  from '../components/Confetti';
import Countdown from '../components/Countdown';
import Particles from '../components/Particles';
import styles    from './FinalReward.module.css';

// ──────────────────────────────────────────────
// 📸 GALERIA — imagens servidas da pasta public
// ──────────────────────────────────────────────
const GALLERY = [
  { src: '/images/part1.jpeg', caption: 'O nosso primeiro encontro ❤️' },
  { src: '/images/part2.jpg', caption: 'Uma aventura juntos ✈️' },
  { src: '/images/part3.jpg', caption: 'Momentos especiais 🌹' },
  { src: '/images/part4.jpg', caption: 'Sorrisos que guardo ✨' },
  { src: '/images/part5.jpg', caption: 'Sítios que visitámos 🗺️' },
  { src: '/images/part6.jpg', caption: 'O nosso dia a dia 🌙' },
];

// ──────────────────────────────────────────────
// 💌 CARTA ROMÂNTICA — personaliza o texto
// ──────────────────────────────────────────────
const LETTER = `Amor,

Há dez meses, a minha vida mudou para sempre. Desde o primeiro dia, soubeste ser exatamente o que eu precisava: a tua calma, o teu sorriso, a tua forma única de me fazer sentir em casa onde quer que estejamos.

Esta quest foi uma pequena forma de te mostrar o quanto cada momento contigo significa para mim. Cada pergunta foi uma memória que guardo no coração.

Obrigado por me deixares fazer parte da tua história. Obrigado pelas gargalhadas, pelos abraços, pelas conversas até tarde e pelos silêncios confortáveis.

Isto é apenas o início. Tenho tantos planos, tantas aventuras e tanto amor para te dar.

Com todo o meu amor, sempre,`;

const SIGNATURE = '✦ Paulo ✦';

export default function FinalReward({ onBack }) {
  const [rewardOpen, setRewardOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <div className={styles.page}>
      <Confetti active />
      <Particles count={30} />

      <div className={styles.container}>
        {/* Botão voltar */}
        <button className={styles.backBtn} onClick={onBack}>← Voltar</button>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroEmoji}>🎉</div>
          <h1 className={styles.heroTitle}>10 Meses Juntos</h1>
          <p className={styles.heroSub}>
            Completaste todas as missões!<br />
            <em>A surpresa final aguarda-te.</em>
          </p>
          <div className={styles.heroDivider}>✦ ✦ ✦</div>
        </section>

        {/* Contador */}
        <section className={styles.section}>
          <Countdown />
        </section>

        {/* Galeria */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📷 Os Nossos Momentos</h2>
          <div className={styles.gallery}>
            {GALLERY.map((photo, i) => (
              <div
                key={i}
                className={styles.photoCard}
                onClick={() => setActivePhoto(photo)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {photo.src ? (
                  <img src={photo.src} alt={photo.caption} className={styles.photoImg} />
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <span>📸</span>
                    <p>Foto {i + 1}</p>
                  </div>
                )}
                <p className={styles.photoCaption}>{photo.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Carta */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💌 Uma Carta Para Ti</h2>
          <div className={styles.letter}>
            <div className={styles.letterContent}>
              {LETTER.split('\n\n').map((para, i) => (
                <p key={i} className={styles.letterPara}>{para}</p>
              ))}
              <p className={styles.letterSignature}>{SIGNATURE}</p>
            </div>
          </div>
        </section>

        {/* Mensagem final */}
        <section className={styles.finalMsg}>
          <div className={styles.finalHeart}>❤️</div>
          <p className={styles.finalText}>
            10 meses contigo ❤️<br />
            Obrigado por todos os momentos.<br />
            <em>Esta é apenas a primeira de muitas aventuras.</em>
          </p>
        </section>

        {/* Botão recompensa */}
        {!rewardOpen ? (
          <button
            className={styles.rewardBtn}
            onClick={() => setRewardOpen(true)}
          >
            🎁 Abrir Recompensa Final ❤️
          </button>
        ) : (
          <div className={styles.rewardBox}>
            <div className={styles.rewardEmoji}>🎊</div>
            <h3 className={styles.rewardTitle}>A tua recompensa</h3>
            <p className={styles.rewardText}>
              {/* ✏️ Escreve aqui a recompensa real! Exemplos:
                  "Um jantar especial a dois ❤️"
                  "Uma viagem surpresa 🗺️"
                  "Um dia inteiro dedicado a ti 💛" */}
              Um jantar especial a dois,<br />
              num sítio que escolhes tu. ❤️<br /><br />
              <em>Porque mereces o melhor.</em>
            </p>
          </div>
        )}
      </div>

      {/* Modal de foto */}
      {activePhoto && (
        <div className={styles.modal} onClick={() => setActivePhoto(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            {activePhoto.src ? (
              <img src={activePhoto.src} alt={activePhoto.caption} className={styles.modalImg} />
            ) : (
              <div className={styles.modalPlaceholder}>📸</div>
            )}
            <p className={styles.modalCaption}>{activePhoto.caption}</p>
            <button className={styles.modalClose} onClick={() => setActivePhoto(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
