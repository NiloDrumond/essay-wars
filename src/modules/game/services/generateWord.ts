import { words } from '@game/data/words';
import { Word } from '@game/model/Word';

function generateWord(targetId: string): Word {
  const str = words[Math.floor(Math.random() * words.length)];
  const word = new Word({
    targetId,
    word: str,
  });
  return word;
}

export { generateWord };
