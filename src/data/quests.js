// ============================================================
// quests.js — Dados das missões da Quest dos 10 Meses
// Edita aqui as perguntas, respostas e imagens de cada dia.
// As respostas são insensíveis a maiúsculas/minúsculas e
// espaços extras são ignorados na validação.
// ============================================================

export const QUESTS = [
  {
    day: 8,
    title: "O Início",
    question: "Onde foi o nosso primeiro encontro?",
    answer: "Alta Vila",
    hint: "Um lugar com muita história e sabor...",
    image: "/images/part1.jpeg",
    color: "#e8a4c8",
    emoji: "🌹",
    successMessage: "Que memória linda... ❤️",
  },
  {
    day: 9,
    title: "A Primeira Vez",
    question: "Qual foi o primeiro filme que vimos juntos?",
    answer: "Lilo & Stitch",
    hint: "Aquele dia especial no cinema...",
    image: "/images/part2.jpg",
    color: "#c4a8e8",
    emoji: "🎬",
    successMessage: "Esse dia foi mágico! 🌙",
  },
  {
    day: 10,
    title: "Os Sabores",
    question: "Qual é o prato favorito que já fizemos juntos?",
    answer: "Strogonoff",
    hint: "Mmm... que cheirinho tinha aquela cozinha...",
    image: "/images/part3.jpg",
    color: "#f0b8a0",
    emoji: "🍝",
    successMessage: "Tenho saudades desse momento! 😋",
  },
  {
    day: 11,
    title: "Os Lugares",
    question: "Qual foi a nossa viagem favorita juntos?",
    answer: "Porto",
    hint: "Aquele lugar que ficou no coração...",
    image: "/images/part4.jpg",
    color: "#a8d4e8",
    emoji: "✈️",
    successMessage: "Tenho de te levar lá outra vez! 🗺️",
  },
  {
    day: 12,
    title: "Os Sorrisos",
    question: "Qual é a música que mais associas a nós?",
    answer: "Purple Rain",
    hint: "Aquela que sempre nos faz sorrir...",
    image: "/images/part5.jpg",
    color: "#b8e8a8",
    emoji: "🎵",
    successMessage: "Sempre que ouvir essa música, penso em ti! 🎶",
  },
  {
    day: 13,
    title: "Os Detalhes",
    question: "Qual é o teu momento favorito do dia comigo?",
    answer: null, // Resposta livre, validação aceita qualquer resposta não vazia
    hint: "Aquele momento pequeno mas especial...",
    image: "/images/part6.jpg",
    color: "#e8d4a8",
    emoji: "✨",
    successMessage: "Esses momentos são preciosos! 💛",
  },
  {
    day: 14,
    title: "A Surpresa",
    question: "Quantos meses estamos juntos?",
    answer: "10",
    hint: "Este número é muito especial para nós...",
    image: null,
    video: "/videos/surpresa.mp4",  // ← coloca o vídeo em /public/videos/
    color: "#e8a4a4",
    emoji: "❤️",
    successMessage: "10 meses incríveis! 🎉",
},
];

// Dias disponíveis (8 a 14 de junho de 2025)
export const START_DAY = 8;
export const END_DAY = 14;
export const QUEST_MONTH = 5; // Junho = índice 5 (0-indexed)
export const QUEST_YEAR = 2025;

// Retorna o quest do dia especificado (1-31)
export function getQuestByDay(day) {
  return QUESTS.find((q) => q.day === day) || null;
}

// Retorna o dia atual (para teste podes alterar esta função)
export function getCurrentDay() {
  const now = new Date();
  // Para desenvolvimento/teste, descomenta a linha abaixo e muda o dia:
  // return 10;
  if (now.getMonth() === QUEST_MONTH && now.getFullYear() === QUEST_YEAR) {
    return now.getDate();
  }
  // Fora do período, retorna null
  return now.getDate(); // Retorna sempre para desenvolvimento
}
