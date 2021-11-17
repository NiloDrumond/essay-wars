import { Player } from './Player';
import { v4 } from 'uuid';

interface IMatchConstructorDTO {
  players: Player[];
}

class Match {
  id: string;
  players: Player[];

  constructor({ players }: IMatchConstructorDTO) {
    this.id = v4();
    this.players = players;
  }
}

export { Match };
