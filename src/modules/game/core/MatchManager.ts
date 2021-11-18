import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { Socket } from 'socket.io';

interface IMatchManagerConstructorDTO {
  match: Match;
  subPlayerConnection: (callback: (id: string, socket: Socket) => void) => void;
}

class MatchManager {
  public match: Match;

  private onPlayerConnection(id: string, socket: Socket): void {
    for (let i = 0; i < this.match.players.length; i++) {
      const player = this.match.players[i];
      if (id === player.id) {
        player.socket = socket;
      }
    }
  }

  constructor({ match, subPlayerConnection }: IMatchManagerConstructorDTO) {
    this.match = match;
    subPlayerConnection(this.onPlayerConnection);
  }

  public connectPlayer(player: Player): void {
    this.match.players.push(player);
  }
}

export { MatchManager };
