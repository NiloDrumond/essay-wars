import { generateWord } from '@game/services/generateWord';
import { Word } from './Word';

class Board {
  words: Word[];
  private currentY = 0;
  yMap: Record<string, number> = {};
  attackWordsQueue: Word[];

  constructor() {
    this.words = [];
    this.attackWordsQueue = [];
  }

  public addWord(word: Word): void {
    this.words.push(word);
    this.yMap[word.id] = this.currentY;
    this.currentY += 10;
    if (this.currentY === 100) this.currentY = 0;
  }

  public removeWord(id: string): Word {
    const index = this.words.findIndex((w) => w.id === id);
    if (index < 0) {
      // throw new Error('unable to find word to delete');
      console.log('unable to find word to delete');
    }
    const word = this.words.splice(index, 1);
    delete this.yMap[word[0].id];
    return word[0];
  }

  public popAttackWord(id: string): Word {
    for (let i = 0; i < this.attackWordsQueue.length; i++) {
      const word = this.attackWordsQueue[i];
      if (word.id === id) {
        this.attackWordsQueue[i] = new Word({
          targetId: '',
          word: generateWord(),
        });
        return word;
      }
    }
    throw new Error('unable to find word');
  }

  public populateAttackWords(words: Word[]): void {
    this.attackWordsQueue = [...this.attackWordsQueue, ...words];
  }
}

export { Board };
