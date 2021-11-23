import { Word } from './Word';
declare class Board {
    words: Word[];
    private currentY;
    yMap: Record<string, number>;
    attackWordsQueue: Word[];
    constructor();
    addWord(word: Word): void;
    removeWord(id: string): Word;
    popAttackWord(id: string): Word;
    populateAttackWords(words: Word[]): void;
}
export { Board };
