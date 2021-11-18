import { INITIAL_HP } from '@game/constants';
import { User } from '@user/model/User';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { Board } from './Board';

interface IPlayerConstructorDTO {
  user: User;
}

class Player {
  id: string;
  user: User;
  hp: number;
  board: Board;
  created_at: Date;
  socket?: Socket;

  constructor({ user }: IPlayerConstructorDTO) {
    this.id = v4();
    this.created_at = new Date();
    this.user = user;
    this.hp = INITIAL_HP;
    this.board = new Board();
    this.socket = undefined;
  }

  public reset(): void {
    this.hp = INITIAL_HP;
    this.board = new Board();
  }
}

export { Player };
