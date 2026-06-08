// ============================================================
// Question.jsx — Componente de pergunta com validação
// ============================================================
import { useState } from 'react';
import styles from './Question.module.css';

export default function Question({ quest, onCorrect, alreadyFailed }) {
  const [input,    setInput]    = useState('');
  const [status,   setStatus]   = useState(alreadyFailed ? 'failed' : 'idle');
  // idle | checking | correct | wrong | failed

  // Normaliza string para comparação
  const normalize = (str) =>
    (str || '').trim().toLowerCase()
       .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const validate = () => {
    if (!input.trim() || status === 'checking') return;
    setStatus('checking');

    setTimeout(() => {
      // FIX: Se answer é null, qualquer resposta não vazia é aceite (resposta livre)
      const isCorrect = quest.answer === null
        ? input.trim().length > 0
        : normalize(input) === normalize(quest.answer);

      if (isCorrect) {
        setStatus('correct');
        setTimeout(() => onCorrect(), 1200);
      } else {
        setStatus('wrong');
      }
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') validate();
  };

  return (
    <div className={styles.wrapper}>
      {/* Emoji do dia */}
      <div className={styles.emoji}>{quest.emoji}</div>

      {/* Pergunta */}
      <h2 className={styles.question}>{quest.question}</h2>

      {/* Dica */}
      <p className={styles.hint}>{quest.hint}</p>

      {/* Estado: falhou hoje */}
      {status === 'failed' && (
        <div className={styles.failedBanner}>
          <span>🔒</span>
          <div>
            <strong>Tentativa falhada!</strong>
            <p>Volta amanhã para tentar de novo.</p>
          </div>
        </div>
      )}

      {/* Estado: correto */}
      {status === 'correct' && (
        <div className={styles.successBanner}>
          <span>✨</span>
          <div>
            <strong>Correto!</strong>
            <p>{quest.successMessage}</p>
          </div>
        </div>
      )}

      {/* Formulário (só visível se não falhou nem acertou) */}
      {status !== 'failed' && status !== 'correct' && (
        <div className={styles.form}>
          <div className={`${styles.inputWrapper} ${status === 'wrong' ? styles.shake : ''}`}>
            <input
              type="text"
              className={styles.input}
              placeholder={quest.answer === null ? 'Escreve o que quiseres...' : 'A tua resposta...'}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (status === 'wrong') setStatus('idle');
              }}
              onKeyDown={handleKey}
              disabled={status === 'checking'}
              autoComplete="off"
            />
          </div>

          {status === 'wrong' && (
            <p className={styles.wrongMsg}>❌ Resposta incorreta. Tenta outra vez!</p>
          )}

          <button
            className={`${styles.btn} ${status === 'checking' ? styles.loading : ''}`}
            onClick={validate}
            disabled={status === 'checking' || !input.trim()}
          >
            {status === 'checking' ? (
              <span className={styles.spinner} />
            ) : (
              '✦ Validar Resposta'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
