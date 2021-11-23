import { words } from '@game/data/words';

function generateWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

export { generateWord };
