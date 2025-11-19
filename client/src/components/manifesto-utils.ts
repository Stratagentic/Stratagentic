const manifestoTexts: string[] = [
  "Built for those who imagine better.",
  "No endless decks. No recommendations that gather dust. No six-month roadmaps that never see execution. Just working systems. Real implementations. Actions that run quietly in the background while you move forward.",
  "What took ten hours now takes one. Ideas become prototypes, prototypes become results - fast, because the world won't wait. Each project is an exploration: how to make work lighter, decisions sharper, growth inevitable.",
  "It's not about being big. It's about adapting to progress."
];

interface WordSegment {
  text: string;
  isSpace: boolean;
}

// 2. Process Paragraphs (Run only once on import)
export const PROCESSED_MANIFESTO: WordSegment[][] = manifestoTexts.map(text =>
  text.split(/(\s+)/).map(segment => ({
    text: segment,
    isSpace: /^\s+$/.test(segment)
  }))
);

// 3. Calculate All Word Indices (Run only once on import)
export const WORD_INDICES: number[] = [];
let globalIndex = 0;

PROCESSED_MANIFESTO.forEach(paragraph => {
  paragraph.forEach(word => {
    if (!word.isSpace) {
      WORD_INDICES.push(globalIndex);
    }
    globalIndex++;
  });
});
