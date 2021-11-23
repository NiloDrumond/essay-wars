interface IWordConstructorDTO {
    word: string;
    targetId: string;
}
declare class Word {
    word: string;
    id: string;
    createdAt: Date;
    targetId: string;
    position: number;
    constructor({ word, targetId }: IWordConstructorDTO);
}
export { Word };
