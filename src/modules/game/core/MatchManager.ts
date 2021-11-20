import { io } from '@game/infra/io';
import { MySocket } from '@game/infra/types';
import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { Namespace } from 'socket.io';
import { MatchUtils } from './utils';

interface IMatchManagerConstructorDTO {
  match: Match;
}

class MatchManager {
  public match: Match;
  private nsp: Namespace;

  private startMatch(): void {
    this.match.onGoing = true;
  }

  private handleStartEvent(socket: MySocket): void {
    const player = MatchUtils.getPlayerFromSocket({
      match: this.match,
      socket: socket,
    });
    if (player && player.id === this.match.hostId) {
      const players = Object.values(this.match.players);
      for (let i = 0; i < players.length; i++) {
        if (!players[i].socket) {
          socket.emit('message', {
            isError: true,
            text: 'some players have not connected yet.',
          });
          return;
        }
      }
      this.startMatch();
    }
  }

  private connectPlayer(id: string, socket: MySocket): void {
    const player = MatchUtils.getPlayerFromSocket({
      match: this.match,
      socket: socket,
    });
    if (player) {
      player.socket = socket;
      socket.on('start_match', () => this.handleStartEvent(socket));
    }
  }

  private handleConnection() {
    this.nsp.on('connection', (socket) => {
      const { auth } = socket.handshake;
      if (typeof auth === 'string') {
        this.connectPlayer(auth, socket);
      }
    });
  }

  constructor({ match }: IMatchManagerConstructorDTO) {
    this.match = match;
    this.nsp = io.of(`/match/${match.id}`);
    this.handleConnection();
  }

  public addPlayer(player: Player): void {
    this.match.players[player.id] = player;
  }
}

export { MatchManager };
