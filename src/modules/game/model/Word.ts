import { v4 } from 'uuid';

interface IWordConstructorDTO {
  word: string;
}

class Word {
  word: string;
  id: string;
  position: number;

  constructor({ word }: IWordConstructorDTO) {
    this.id = v4();
    this.word = word;
    this.position = 0;
  }
}

export { Word };
