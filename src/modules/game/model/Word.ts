import { v4 } from 'uuid';

interface IWordConstructorDTO {
  word: string;
  targetId: string;
}

class Word {
  word: string;
  id: string;
  targetId: string;
  position: number;

  constructor({ word, targetId }: IWordConstructorDTO) {
    this.id = v4();
    this.word = word;
    this.targetId = targetId;
    this.position = 0;
  }
}

export { Word };
