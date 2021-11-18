import { Player } from './Player';
import { v4 } from 'uuid';

interface IMatchConstructorDTO {
  host: Player;
  code: string;
}

class Match {
  id: string;
  hostId: string;
  code: string;
  onGoing: boolean;
  players: Player[];

  constructor({ host, code }: IMatchConstructorDTO) {
    this.id = v4();
    this.code = code;
    this.onGoing = false;
    this.players = [host];
    this.hostId = host.id;
  }
}

export { Match };
