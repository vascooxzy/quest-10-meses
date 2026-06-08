// ============================================================
// QuestPage.jsx — Ecrã de missão diária
// Mostra: pergunta → raspadinha → celebração → calendário
// ============================================================
import { useState, useEffect } from 'react';
import Question   from '../components/Question';
import ScratchCard from '../components/ScratchCard';
import Confetti   from '../components/Confetti';
import Particles  from '../components/Particles';
import styles     from './QuestPage.module.css';

const STORAGE_KEY  = 'quest10meses_progress';
const FAILURES_KEY = 'quest10meses_failures';

export default function QuestPage({ quest, onBack, onComplete }) {
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  });

  const [failures, setFailures] = useState(() => {
    try { return JSON.parse(localStorage.getItem(FAILURES_KEY)) || {}; }
    catch { return {}; }
  });

  const dayData     = progress[quest.day] || {};
  const isCompleted = !!dayData.completed;
  const hasFailed   = !!failures[quest.day];

  // Fases: 'question' | 'scratch' | 'celebrate' | 'done'
  const [phase, setPhase] = useState(() => isCompleted ? 'done' : 'question');

  const handleFail = () => {
    const updated = { ...failures, [quest.day]: true };
    setFailures(updated);
    localStorage.setItem(FAILURES_KEY, JSON.stringify(updated));
  };

  const handleCorrect = () => setPhase('scratch');

  const handleScratched = () => {
    // Guarda progresso
    const updated = {
      ...progress,
      [quest.day]: { completed: true, completedAt: new Date().toISOString() },
    };
    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Mostra celebração
    setPhase('celebrate');
    if (onComplete) onComplete(quest.day);
  };

  // Após 4 segundos na celebração, volta ao calendário automaticamente
  useEffect(() => {
    if (phase !== 'celebrate') return;
    const t = setTimeout(() => onBack(), 4000);
    return () => clearTimeout(t);
  }, [phase, onBack]);

  return (
    <div className={styles.page}>
      {phase === 'celebrate' && <Confetti active />}
      <Particles count={14} />

      <div className={styles.container}>

        {/* Botão de voltar (não aparece na celebração) */}
        {phase !== 'celebrate' && (
          <button className={styles.backBtn} onClick={onBack}>← Voltar</button>
        )}

        {/* Cabeçalho */}
        {phase !== 'celebrate' && (
          <header className={styles.header}>
            <div className={styles.dayBadge}>
              <span className={styles.dayNum}>{quest.day}</span>
              <span className={styles.dayLbl}>Jun</span>
            </div>
            <div className={styles.headerText}>
              <p className={styles.missionLabel}>Missão do Dia</p>
              <h2 className={styles.missionTitle}>{quest.title}</h2>
            </div>
          </header>
        )}

        {/* Card principal */}
        <div className={phase === 'celebrate' ? styles.cardCelebrate : styles.card}>

          {/* PERGUNTA */}
          {phase === 'question' && (
            <Question
              quest={quest}
              onCorrect={handleCorrect}
              onFail={handleFail}
              alreadyFailed={hasFailed}
            />
          )}

          {/* RASPADINHA */}
          {phase === 'scratch' && (
            <ScratchCard quest={quest} onFullyRevealed={handleScratched} />
          )}

          {/* CELEBRAÇÃO — imagem/vídeo em destaque */}
          {phase === 'celebrate' && (
            <div className={styles.celebrate}>
              <div className={styles.celebrateEmojis}>🎉 ❤️ 🎉</div>
              <h2 className={styles.celebrateTitle}>{quest.title}</h2>

              <div className={styles.celebrateMedia}>
                {quest.video ? (
                  <video
                    src={quest.video}
                    autoPlay loop playsInline
                    className={styles.celebrateVideo}
                  />
                ) : quest.image ? (
                  <img
                    src={quest.image}
                    alt={`Surpresa dia ${quest.day}`}
                    className={styles.celebrateImg}
                  />
                ) : (
                  <div className={styles.celebrateEmoji}>{quest.emoji}</div>
                )}
              </div>

              <p className={styles.celebrateMsg}>{quest.successMessage}</p>
              <p className={styles.celebrateHint}>A voltar ao calendário...</p>

              <button className={styles.celebrateBtn} onClick={onBack}>
                ← Voltar ao Calendário
              </button>
            </div>
          )}

          {/* JÁ COMPLETADO (ao reabrir) */}
          {phase === 'done' && (
            <div className={styles.doneMsg}>
              <div className={styles.doneIcon}>✅</div>
              <h3 className={styles.doneTitle}>Já completaste a missão de hoje ❤️</h3>
              <p className={styles.doneSub}>{quest.successMessage}</p>
              <p className={styles.doneDate}>
                Concluído em {new Date(dayData.completedAt || Date.now()).toLocaleDateString('pt-PT', {
                  day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}