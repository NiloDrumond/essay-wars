import { generateWord } from '@game/services/generateWord';
import { Word } from './Word';

class Board {
  words: Word[];
  private currentY = 0;
  yMap: Record<string, number> = {};
  attackWords: Word[];

  constructor() {
    this.words = [];
    this.attackWords = [
      new Word({
        targetId: '',
        word: generateWord(),
      }),
      new Word({
        targetId: '',
        word: generateWord(),
      }),
      new Word({
        targetId: '',
        word: generateWord(),
      }),
    ];
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
    for (let i = 0; i < this.attackWords.length; i++) {
      const word = this.attackWords[i];
      if (word.id === id) {
        this.attackWords[i] = new Word({
          targetId: '',
          word: generateWord(),
        });
        return word;
      }
    }
    throw new Error('unable to find word');
  }

  public populateAttackWords(words: Word[]): void {
    this.attackWords = [...this.attackWords, ...words];
  }
}

export { Board };
