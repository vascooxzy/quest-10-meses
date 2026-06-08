// ============================================================
// DayCard.jsx — Cartão de cada missão na grelha principal
// Estados: locked | available | completed | today
// ============================================================
import styles from './DayCard.module.css';

export default function DayCard({ quest, status, onClick }) {
  // status: 'locked' | 'available' | 'completed' | 'today'

  const stateClass = {
    locked:    styles.locked,
    available: styles.available,
    completed: styles.completed,
    today:     styles.today,
  }[status] || styles.locked;

  const icons = {
    locked:    '🔒',
    available: '⭐',
    completed: '✅',
    today:     '❤️',
  };

  const labels = {
    locked:    'Bloqueado',
    available: 'Disponível',
    completed: 'Concluído',
    today:     'Hoje!',
  };

  const isClickable = status === 'today' || status === 'available' || status === 'completed';

  return (
    <div
      className={`${styles.card} ${stateClass}`}
      onClick={isClickable ? onClick : undefined}
      style={isClickable ? { cursor: 'pointer' } : {}}
    >
      {/* Badge de estado */}
      <div className={styles.badge}>{icons[status]}</div>

      {/* Número do dia */}
      <div className={styles.dayNum}>
        <span className={styles.dayLabel}>Jun</span>
        <span className={styles.dayValue}>{quest.day}</span>
      </div>

      {/* Título */}
      <p className={styles.title}>{quest.title}</p>

      {/* Label de estado */}
      <span className={styles.statusLabel}>{labels[status]}</span>

      {/* Brilho ao hover para os disponíveis */}
      {isClickable && <div className={styles.glow} />}
    </div>
  );
}
