"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
const uuid_1 = require("uuid");
class Word {
    constructor({ word, targetId }) {
        this.id = (0, uuid_1.v4)();
        this.word = word;
        this.targetId = targetId;
        this.position = 0;
        this.createdAt = new Date();
    }
}
exports.Word = Word;
//# sourceMappingURL=Word.js.map