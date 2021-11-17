import { INITIAL_HP } from '@game/constants';
import { Board } from '@game/model/Board';
import { Player } from '@game/model/Player';
import { User } from '@user/model/User';
import { Match } from '../../model/Match';
import { IMatchesRepository, ICreateMatchDTO } from '../IMatchesRepository';

class MatchesRepository implements IMatchesRepository {
  private matches: Match[];

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

  private initializePlayer(user: User): Player {
    const board = new Board();
    return new Player({ board, hp: INITIAL_HP, user });
  }

  create({ users }: ICreateMatchDTO): Match {
    const players: Player[] = [];
    for (let i = 0; i < users.length; i++) {
      players.push(this.initializePlayer(users[i]));
    }
    const match = new Match({ players });
    this.matches.push(match);
    return match;
  }

  list(): Match[] {
    return this.matches;
  }
}

export { MatchesRepository };
