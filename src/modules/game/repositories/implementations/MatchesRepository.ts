import { CODE_RETRIES, INITIAL_HP } from '@game/constants';
import { MatchManager } from '@game/core/MatchManager';
import { io } from '@game/infra/io';
import { Board } from '@game/model/Board';
import { Player } from '@game/model/Player';
import { generateCode } from '@game/services/generateCode';
import { User } from '@user/model/User';
import { Socket } from 'socket.io';
import { Match } from '../../model/Match';
import { IMatchesRepository, ICreateMatchDTO } from '../IMatchesRepository';

type OnPlayerConnection = (id: string, socket: Socket) => void;

class MatchesRepository implements IMatchesRepository {
  private matches: MatchManager[];

  private playerConnectionObservers: OnPlayerConnection[] = [];
  private static INSTANCE: MatchesRepository;

  constructor() {
    this.matches = [];
    io.on('connection', (socket) => {
      const { auth } = socket.handshake;
      if (typeof auth === 'string') {
        for (let i = 0; i < this.playerConnectionObservers.length; i++) {
          this.playerConnectionObservers[i](auth, socket);
        }
      }
    });
  }

  public static getInstance(): MatchesRepository {
    if (!MatchesRepository.INSTANCE) {
      MatchesRepository.INSTANCE = new MatchesRepository();
    }
    return MatchesRepository.INSTANCE;
  }

  private initializePlayer(user: User): Player {
    return new Player({ user });
  }

  private subPlayerConnection(
    callback: (id: string, socket: Socket) => void,
  ): void {
    this.playerConnectionObservers.push(callback);
  }

  findByCode(code: string): MatchManager | undefined {
    return this.matches.find((m) => m.match.code === code);
  }

  private generateCode(): string {
    for (let i = 0; i < CODE_RETRIES; i++) {
      const code = generateCode();
      const existing = this.findByCode(code);
      if (!existing) {
        return code;
      }
    }
    throw new Error('Unable to generate lobby code');
  }

  create({ users }: ICreateMatchDTO): MatchManager {
    const players: Player[] = [];
    for (let i = 0; i < users.length; i++) {
      players.push(this.initializePlayer(users[i]));
    }
    const code = generateCode();
    const match = new Match({ players, hostId: players[0].id, code });
    const matchManager = new MatchManager({
      match,
      subPlayerConnection: this.subPlayerConnection,
    });
    this.matches.push(matchManager);
    return matchManager;
  }

  list(): MatchManager[] {
    return this.matches;
  }
}

export { MatchesRepository };
