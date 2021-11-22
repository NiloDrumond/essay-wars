import { Word } from '@game/model/Word';

function generateWord(targetId: string): Word {
  const word = new Word({
    targetId,
    word: `teste${Math.floor(Math.random() * 100)}`,
  });
  return word;
}

export { generateWord };
