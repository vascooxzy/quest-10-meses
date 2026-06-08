// ============================================================
// Home.jsx — Ecrã principal com grelha de missões
// ============================================================
import { useState, useEffect } from 'react';
import { QUESTS, getCurrentDay, START_DAY, END_DAY } from '../data/quests';
import ProgressBar from '../components/ProgressBar';
import DayCard     from '../components/DayCard';
import Particles   from '../components/Particles';
import styles      from './Home.module.css';

// Chaves do LocalStorage
const STORAGE_KEY = 'quest10meses_progress';

export default function Home({ onOpenQuest }) {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  // Sincroniza com localStorage quando o progresso muda
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const currentDay = getCurrentDay();
  const completed  = QUESTS.filter(q => progress[q.day]?.completed).length;

  // Determina o estado de cada cartão
  const getStatus = (quest) => {
    if (progress[quest.day]?.completed) return 'completed';
    if (quest.day === currentDay) return 'today';
    if (quest.day < currentDay)   return 'available'; // passados não completados
    return 'locked';
  };

  return (
    <div className={styles.page}>
      <Particles count={22} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.heartDeco}>❤</div>
          <h1 className={styles.title}>Quest dos<br />10 Meses</h1>
          <p className={styles.subtitle}>
            Uma aventura especial para celebrar o nosso amor,<br />
            <em>um dia de cada vez.</em>
          </p>

          {/* Barra de progresso */}
          <div className={styles.progressWrapper}>
            <ProgressBar completed={completed} total={QUESTS.length} />
          </div>

          {/* Período */}
          <div className={styles.period}>
            <span>8 — 14 de Junho</span>
          </div>
        </header>

        {/* Grelha de missões */}
        <section className={styles.grid}>
          {QUESTS.map(quest => (
            <DayCard
              key={quest.day}
              quest={quest}
              status={getStatus(quest)}
              onClick={() => onOpenQuest(quest.day, progress)}
            />
          ))}
        </section>

        {/* Rodapé */}
        <footer className={styles.footer}>
          <p>✦ Feito com amor ✦</p>
        </footer>
      </div>
    </div>
  );
}
