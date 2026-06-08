// ============================================================
// ProgressBar.jsx — Barra de progresso animada
// ============================================================
import styles from './ProgressBar.module.css';

export default function ProgressBar({ completed, total }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.labels}>
        <span className={styles.label}>Missões concluídas</span>
        <span className={styles.count}>{completed} / {total}</span>
      </div>

      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%` }}
        />
        {/* Brilho animado */}
        <div
          className={styles.shimmer}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className={styles.pct}>{pct}% completo</div>
    </div>
  );
}
