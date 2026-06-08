// ============================================================
// App.jsx — Componente raiz com navegação entre ecrãs
//
// Ecrãs:
//   'home'        → Grelha principal de missões
//   'quest'       → Missão do dia (pergunta + raspadinha)
//   'finalReward' → Surpresa final (após completar tudo)
// ============================================================
import { useState, useEffect } from 'react';
import Home        from './pages/Home';
import QuestPage   from './pages/QuestPage';
import FinalReward from './pages/FinalReward';
import { QUESTS, getQuestByDay } from './data/quests';

const STORAGE_KEY = 'quest10meses_progress';

export default function App() {
  // Ecrã atual: 'home' | 'quest' | 'finalReward'
  const [screen, setScreen] = useState('home');

  // Quest atualmente aberta
  const [activeQuest, setActiveQuest] = useState(null);

  // Verifica se todas as missões estão concluídas
  const checkAllCompleted = () => {
    try {
      const progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return QUESTS.every(q => progress[q.day]?.completed);
    } catch {
      return false;
    }
  };

  // Abre uma missão específica
  const handleOpenQuest = (day, progress) => {
    const quest = getQuestByDay(day);
    if (!quest) return;

    // Se todas concluídas e é o dia 14, vai direto para recompensa final
    if (checkAllCompleted() && day === 14) {
      setScreen('finalReward');
      return;
    }

    setActiveQuest(quest);
    setScreen('quest');
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quando uma missão é concluída
  const handleQuestComplete = (day) => {
    // Verifica se era a última
    setTimeout(() => {
      if (checkAllCompleted()) {
        setScreen('finalReward');
      }
    }, 1500);
  };

  // Volta ao ecrã principal
  const handleBack = () => {
    setScreen('home');
    setActiveQuest(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {screen === 'home' && (
        <Home onOpenQuest={handleOpenQuest} />
      )}

      {screen === 'quest' && activeQuest && (
        <QuestPage
          quest={activeQuest}
          onBack={handleBack}
          onComplete={handleQuestComplete}
        />
      )}

      {screen === 'finalReward' && (
        <FinalReward onBack={handleBack} />
      )}
    </>
  );
}
