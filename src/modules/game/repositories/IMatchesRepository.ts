import { MatchManager } from '@game/core/MatchManager';
import { User } from '@user/model/User';

interface ICreateMatchDTO {
  users: User[];
}

interface IMatchesRepository {
  list(): MatchManager[];
  create(data: ICreateMatchDTO): MatchManager;
}

export { ICreateMatchDTO, IMatchesRepository };
