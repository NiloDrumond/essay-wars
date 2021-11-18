import { CODE_RETRIES } from '@game/constants';
import { MatchManager } from '@game/core/MatchManager';
import { io } from '@game/infra/io';
import { Player } from '@game/model/Player';
import { generateCode } from '@game/services/generateCode';
import { Socket } from 'socket.io';
import { Match } from '../../model/Match';
import {
  IMatchesRepository,
  ICreateMatchDTO,
  IJoinMatchDTO,
} from '../IMatchesRepository';

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

  private subPlayerConnection(
    callback: (id: string, socket: Socket) => void,
  ): void {
    this.playerConnectionObservers.push(callback);
  }

  findByCode(code: string): MatchManager | undefined {
    return this.matches.find((m) => m.match.code === code);
  }

  private getCode(): string {
    for (let i = 0; i < CODE_RETRIES; i++) {
      const code = generateCode();
      const existing = this.findByCode(code);
      if (!existing) {
        return code;
      }
    }
    throw new Error('Unable to generate lobby code');
  }

  create({ user }: ICreateMatchDTO): Player {
    const player = new Player({ user });
    const code = this.getCode();
    const match = new Match({ host: player, code });
    const matchManager = new MatchManager({
      match,
      subPlayerConnection: this.subPlayerConnection,
    });
    this.matches.push(matchManager);
    return player;
  }

  join({ code, user }: IJoinMatchDTO): Player {
    const match = this.findByCode(code);
    if (!match) {
      throw new Error('unable to find match');
    }
    const player = new Player({ user });
    match.connectPlayer(player);
    return player;
  }

  list(): MatchManager[] {
    return this.matches;
  }
}

export { MatchesRepository };
