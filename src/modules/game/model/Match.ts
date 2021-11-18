import { Player } from './Player';
import { v4 } from 'uuid';

interface IMatchConstructorDTO {
  players: Player[];
  hostId: string;
  code: string;
}

class Match {
  id: string;
  hostId: string;
  code: string;
  onGoing: boolean;
  players: Player[];

  constructor({ players, hostId, code }: IMatchConstructorDTO) {
    this.id = v4();
    this.code = code;
    this.onGoing = false;
    this.players = players;
    this.hostId = hostId;
  }
}

export { Match };
