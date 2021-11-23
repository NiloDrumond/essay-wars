import { CODE_RETRIES } from '@game/data/constants';
import { MatchManager } from '@game/core/MatchManager';
import { Player } from '@game/model/Player';
import { generateCode } from '@game/services/generateCode';
import { Match } from '../../model/Match';
import {
  IMatchesRepository,
  ICreateMatchDTO,
  IJoinMatchDTO,
  IMatchResponseDTO,
} from '../IMatchesRepository';

class MatchesRepository implements IMatchesRepository {
  private matches: MatchManager[];

  private static INSTANCE: MatchesRepository;

  constructor() {
    this.matches = [];
  }

  public static getInstance(): MatchesRepository {
    if (!MatchesRepository.INSTANCE) {
      MatchesRepository.INSTANCE = new MatchesRepository();
    }
    return MatchesRepository.INSTANCE;
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

  create({ user }: ICreateMatchDTO): IMatchResponseDTO {
    const player = new Player({ user });
    const code = this.getCode();
    const match = new Match({ host: player, code });
    const matchManager = new MatchManager({
      match,
    });
    this.matches.push(matchManager);
    return { player, match: { id: match.id, code: match.code } };
  }

  join({ code, user }: IJoinMatchDTO): IMatchResponseDTO {
    const matchManager = this.findByCode(code);
    if (!matchManager) {
      throw new Error('unable to find match');
    }
    const player = new Player({ user });
    matchManager.addPlayer(player);
    return {
      player,
      match: { id: matchManager.match.id, code: matchManager.match.code },
    };
  }

  list(): MatchManager[] {
    return this.matches;
  }
}

export { MatchesRepository };
