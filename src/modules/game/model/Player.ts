import { User } from '@user/model/User';
import { v4 } from 'uuid';
import { Board } from './Board';

interface IPlayerConstructorDTO {
  user: User;
  hp: number;
  board: Board;
}

class Player {
  id: string;
  user: User;
  hp: number;
  board: Board;
  created_at: Date;

  constructor({ user, hp, board }: IPlayerConstructorDTO) {
    this.id = v4();
    this.created_at = new Date();
    this.user = user;
    this.hp = hp;
    this.board = board;
  }
}

export { Player };
