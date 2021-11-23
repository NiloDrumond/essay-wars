"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const constants_1 = require("@game/data/constants");
class Board {
    constructor() {
        this.currentY = 0;
        this.yMap = {};
        this.words = [];
        this.attackWordsQueue = [];
    }
    addWord(word) {
        this.words.push(word);
        this.yMap[word.id] = this.currentY;
        this.currentY += 10;
        if (this.currentY === 100)
            this.currentY = 0;
    }
    removeWord(id) {
        const index = this.words.findIndex((w) => w.id === id);
        if (index < 0) {
            // throw new Error('unable to find word to delete');
            console.log('unable to find word to delete');
        }
        const word = this.words.splice(index, 1);
        delete this.yMap[word[0].id];
        return word[0];
    }
    popAttackWord(id) {
        for (let i = 0; i < constants_1.ATTACK_WORD_AVAILABLE; i++) {
            const word = this.attackWordsQueue[i];
            if (word.id === id) {
                this.attackWordsQueue = this.attackWordsQueue.splice(i, 1);
                return word;
            }
        }
        const existing = this.attackWordsQueue.find((w) => w.id === id);
        if (existing) {
            throw new Error('word not available to be poped');
        }
        throw new Error('unable to find word');
    }
    populateAttackWords(words) {
        this.attackWordsQueue = [...this.attackWordsQueue, ...words];
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map