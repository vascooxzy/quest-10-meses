// ============================================================
// Countdown.jsx — Contador de tempo juntos
// ============================================================
import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

// Data do início do relacionamento — altera aqui!
const START_DATE = new Date('2024-08-14T00:00:00');

function calcTime() {
  const now   = new Date();
  const diff  = now - START_DATE;

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const totalDays    = Math.floor(totalHours / 24);

  const months = Math.floor(totalDays / 30.44);
  const days   = Math.floor(totalDays % 30.44);
  const hours  = totalHours % 24;
  const mins   = totalMinutes % 60;
  const secs   = totalSeconds % 60;

  return { months, days, hours, mins, secs, totalDays };
}

export default function Countdown() {
  const [time, setTime] = useState(calcTime());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Meses',    value: time.months },
    { label: 'Dias',     value: time.days },
    { label: 'Horas',    value: time.hours },
    { label: 'Minutos',  value: time.mins },
    { label: 'Segundos', value: time.secs },
  ];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>⏳ Tempo Juntos</h3>
      <p className={styles.sub}>Cada segundo é precioso ❤️</p>

      <div className={styles.units}>
        {units.map(({ label, value }) => (
          <div key={label} className={styles.unit}>
            <span className={styles.value}>
              {String(value).padStart(2, '0')}
            </span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>

      <p className={styles.totalDays}>
        {time.totalDays.toLocaleString('pt-PT')} dias incríveis juntos
      </p>
    </div>
  );
}
