"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWord = void 0;
const words_1 = require("@game/data/words");
function generateWord() {
    return words_1.words[Math.floor(Math.random() * words_1.words.length)];
}
exports.generateWord = generateWord;
//# sourceMappingURL=generateWord.js.map